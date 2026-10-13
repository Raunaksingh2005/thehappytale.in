import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // ── Extract text fields ──────────────────────────
    const childName       = formData.get('childName') as string
    const childAge        = formData.get('childAge') as string
    const gender          = formData.get('gender') as string
    const celebrationType = formData.get('celebrationType') as string
    const date            = formData.get('date') as string
    const city            = formData.get('city') as string
    const guests          = formData.get('guests') as string
    const venue           = formData.get('venue') as string
    const characters      = formData.get('characters') as string
    const colours         = formData.get('colours') as string
    const hobbies         = formData.get('hobbies') as string
    const world           = formData.get('world') as string
    const services        = formData.getAll('services') as string[]
    const parentName      = formData.get('parentName') as string
    const phone           = formData.get('phone') as string
    const email           = formData.get('email') as string
    const whatsapp        = formData.get('whatsapp') as string

    // ── Upload inspiration files to Supabase Storage ─
    const files = formData.getAll('files') as File[]
    const uploadedUrls: string[] = []

    for (const file of files) {
      if (!file || file.size === 0) continue

      const ext      = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer   = Buffer.from(await file.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from('inspiration')
        .upload(filename, buffer, { contentType: file.type })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      const { data: urlData } = supabase.storage
        .from('inspiration')
        .getPublicUrl(filename)

      if (urlData?.publicUrl) {
        uploadedUrls.push(urlData.publicUrl)
      }
    }

    // ── Save to Supabase database ────────────────────
    const { error: dbError } = await supabase
      .from('tale_submissions')
      .insert([{
        child_name:        childName,
        child_age:         childAge,
        gender,
        celebration_type:  celebrationType,
        celebration_date:  date,
        city,
        guests,
        venue,
        characters,
        colours,
        hobbies,
        world,
        services,
        inspiration_urls:  uploadedUrls,
        parent_name:       parentName,
        phone,
        email,
        whatsapp,
        submitted_at:      new Date().toISOString(),
      }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // ── Send email notification ──────────────────────
    const serviceList = services.length ? services.join(', ') : 'Not specified'

    const filesHtml = uploadedUrls.length
      ? `<h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">Inspiration Uploads</h2>
         <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;">
           ${uploadedUrls.map(url => `
             <a href="${url}" target="_blank" style="display:block;">
               <img src="${url}" alt="Inspiration" style="width:120px;height:90px;object-fit:cover;border-radius:8px;border:1px solid rgba(23,74,134,0.1);" />
             </a>
           `).join('')}
         </div>`
      : ''

    await resend.emails.send({
      from:    'The Happy Tale <onboarding@resend.dev>',
      to:      process.env.NOTIFICATION_EMAIL!,
      subject: `✨ New Tale Request — ${childName}'s ${celebrationType}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#174A86;">
          <div style="background:#174A86;padding:32px;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="color:#E9B83F;margin:0;font-size:24px;">✨ New Tale Request</h1>
            <p style="color:rgba(255,248,238,0.8);margin:8px 0 0;font-size:14px;">The Happy Tale</p>
          </div>
          <div style="background:#FFF8EE;padding:32px;border-radius:0 0 12px 12px;border:1px solid rgba(23,74,134,0.1);">

            <h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">The Child</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;width:40%;">Name</td><td style="padding:6px 0;font-weight:600;">${childName || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Age</td><td style="padding:6px 0;font-weight:600;">${childAge || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Gender</td><td style="padding:6px 0;font-weight:600;">${gender || '—'}</td></tr>
            </table>

            <h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">The Celebration</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;width:40%;">Type</td><td style="padding:6px 0;font-weight:600;">${celebrationType || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Date</td><td style="padding:6px 0;font-weight:600;">${date || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">City / Area</td><td style="padding:6px 0;font-weight:600;">${city || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Venue</td><td style="padding:6px 0;font-weight:600;">${venue || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Guests</td><td style="padding:6px 0;font-weight:600;">${guests || '—'}</td></tr>
            </table>

            <h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">Their World</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;width:40%;">Characters</td><td style="padding:6px 0;font-weight:600;">${characters || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Colours</td><td style="padding:6px 0;font-weight:600;">${colours || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Hobbies</td><td style="padding:6px 0;font-weight:600;">${hobbies || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;vertical-align:top;">About Them</td><td style="padding:6px 0;font-weight:600;">${world || '—'}</td></tr>
            </table>

            <h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">Services Requested</h2>
            <p style="margin:0 0 24px;font-weight:600;">${serviceList}</p>

            ${filesHtml}

            <h2 style="color:#174A86;font-size:18px;margin:0 0 16px;border-bottom:2px solid #E9B83F;padding-bottom:8px;">Parent / Host</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;width:40%;">Name</td><td style="padding:6px 0;font-weight:600;">${parentName || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Phone</td><td style="padding:6px 0;font-weight:600;">${phone || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">Email</td><td style="padding:6px 0;font-weight:600;">${email || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:rgba(23,74,134,0.6);font-size:13px;">WhatsApp</td><td style="padding:6px 0;font-weight:600;">${whatsapp === 'yes' ? '✅ Yes' : 'No preference'}</td></tr>
            </table>

            <div style="text-align:center;padding:20px;background:rgba(233,184,63,0.1);border-radius:8px;border:1px solid rgba(233,184,63,0.3);">
              <p style="margin:0;font-size:13px;color:rgba(23,74,134,0.6);">Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
