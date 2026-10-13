'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL_STEPS = 5

// ── CLOUDINARY CDN HELPER ──────────────────────────────────────────────────
const cdn = (filename: string) => 
  `https://res.cloudinary.com/dpswydgko/image/upload/f_auto,q_auto/thehappytale/${filename}`

// ── TALE DATA ──────────────────────────────────────────────────────────────
const TALES = [
  {
    id: 'dinosaur',
    name: 'Dinosaur Tale',
    emoji: '🦖',
    tagline: 'Roars, fossils, explorers and prehistoric adventures.',
    img: cdn('dinasour-tale.jpg'),
    color: 'linear-gradient(135deg,#E87563,#F5C95C)',
    look: ['Jungle-inspired decor', 'Giant dinosaur props', 'Fossil-inspired details', 'Dino eggs', 'Personalised name signage', 'Themed cake table'],
    adventure: ['Fossil Hunt', 'Dinosaur Egg Hunt', 'Fossil Dig', 'Dinosaur Challenge', 'Dinosaur Movement Games'],
    details: ['Custom dinosaur cake', 'Themed desserts', 'Dinosaur invitations', 'Dinosaur return gifts', 'Themed food presentation', 'Photography & film'],
  },
  {
    id: 'space',
    name: 'Space Tale',
    emoji: '🚀',
    tagline: 'Blast off into a celebration beyond the stars.',
    img: cdn('space-tale.jpg'),
    color: 'linear-gradient(135deg,#AFCBE8,#174A86)',
    look: ['Galaxy decor & starscape', 'Rocket ships & planets', 'Astronaut details', 'Cosmic balloon arches', 'Mission control signage', 'Star-themed cake table'],
    adventure: ['Moon Mission Hunt', 'Build-a-Rocket Activity', 'Star Gazer Challenge', 'Astronaut Training', 'Space Quiz'],
    details: ['Galaxy cake', 'Planet-themed desserts', 'Mission invitations', 'Space return gifts', 'Cosmic food presentation', 'Photography & film'],
  },
  {
    id: 'fairytale',
    name: 'Fairytale',
    emoji: '🧚',
    tagline: 'Enchanted details, magical moments and a little wonder.',
    img: cdn('fairy-tale.jpg'),
    color: 'linear-gradient(135deg,#DFA3B0,#E9B83F)',
    look: ['Enchanted forest decor', 'Flower walls & fairy lights', 'Princess-themed details', 'Magical archways', 'Personalised story boards', 'Fairytale cake table'],
    adventure: ['Fairy Treasure Hunt', 'Wand Making Workshop', 'Crown Decorating', 'Story Telling Circle', 'Magical Dance'],
    details: ['Enchanted cake', 'Magical desserts', 'Storybook invitations', 'Fairy return gifts', 'Whimsical food display', 'Photography & film'],
  },
  {
    id: 'racing',
    name: 'Racing Tale',
    emoji: '🏎️',
    tagline: 'Fast cars, checkered flags and high-energy fun.',
    img: cdn('racecar-tale.jpg'),
    color: 'linear-gradient(135deg,#F5C95C,#E87563)',
    look: ['Checkered flag decor', 'Racing pit stop setup', 'Podium display', 'Tyre & trophy props', 'Custom race numbers', 'Racing cake table'],
    adventure: ['Mini Racing Challenges', 'Pit Stop Relay', 'Checkered Flag Hunt', 'Race Car Building', 'Speed Quiz'],
    details: ['Racing cake', 'Pit stop snacks', 'Race invitations', 'Trophy return gifts', 'Race-themed food display', 'Photography & film'],
  },
  {
    id: 'safari',
    name: 'Safari Tale',
    emoji: '🦁',
    tagline: 'Wild adventures, curious creatures and jungle discoveries.',
    img: cdn('safari-tale.jpg'),
    color: 'linear-gradient(135deg,#E9B83F,#A9BDA7)',
    look: ['Jungle foliage & safari decor', 'Animal props & binoculars', 'Explorer tent setup', 'Animal print details', 'Safari signage', 'Jungle cake table'],
    adventure: ['Animal Safari Hunt', 'Explorer Expedition', 'Animal Matching Game', 'Jungle Relay Race', 'Wildlife Quiz'],
    details: ['Jungle cake', 'Safari-themed treats', 'Explorer invitations', 'Animal return gifts', 'Jungle food display', 'Photography & film'],
  },
  {
    id: 'science',
    name: 'Science Tale',
    emoji: '🔬',
    tagline: 'Experiments, discoveries and seriously fun science.',
    img: cdn('science-tale.jpg'),
    color: 'linear-gradient(135deg,#AFCBE8,#A9BDA7)',
    look: ['Lab-inspired decor', 'Test tubes & beakers', 'Discovery station setup', 'Science board displays', 'Professor signage', 'Science cake table'],
    adventure: ['Slime Lab', 'Volcano Experiment', 'Little Scientists Challenge', 'Mystery Substance Test', 'Science Quiz'],
    details: ['Lab cake', 'Colourful edible experiments', 'Science invitations', 'Discovery return gifts', 'Lab food presentation', 'Photography & film'],
  },
  {
    id: 'art',
    name: 'Art Tale',
    emoji: '🎨',
    tagline: 'Create, colour, explore and make something wonderful.',
    img: cdn('art-tale.jpg'),
    color: 'linear-gradient(135deg,#DFA3B0,#AFCBE8)',
    look: ['Studio-inspired decor', 'Easels & canvas displays', 'Colour splash details', 'Artist name signage', 'Gallery wall setup', 'Art cake table'],
    adventure: ['Canvas Painting', 'Creative Studio', 'Colour Challenge', 'Art Treasure Hunt', 'Mini Gallery Show'],
    details: ['Palette cake', 'Colourful treats', 'Art studio invitations', 'Creative return gifts', 'Artistic food display', 'Photography & film'],
  },
  {
    id: 'gameday',
    name: 'Game Day Tale',
    emoji: '🎮',
    tagline: "Challenges, competition and games they'll talk about afterwards.",
    img: cdn('game-tale.jpg'),
    color: 'linear-gradient(135deg,#E87563,#174A86)',
    look: ['Gaming-inspired decor', 'Score board displays', 'Champion podium setup', 'Player name details', 'Trophy wall display', 'Gaming cake table'],
    adventure: ['Tournament Challenges', 'Team Competitions', 'Mystery Mission', 'Obstacle Course', 'Champion Quiz'],
    details: ['Gaming cake', 'Energy-themed treats', 'Player invitations', 'Trophy return gifts', 'Gaming food display', 'Photography & film'],
  },
]

const ACTIVITIES = [
  { name: 'Fossil Hunt', desc: 'Dig, discover and uncover prehistoric surprises.', img: cdn('fossil-hunt.jpg') },
  { name: 'Little Scientists', desc: 'Safe, exciting experiments designed for curious minds.', video: '/D041ABD0-DF2C-4D74-ABF8-1FB2D4A58831.MP4' },
  { name: 'Creative Studio', desc: 'Painting, crafting and hands-on making.', img: cdn('creative-studio.jpg') },
  { name: 'Treasure Hunt', desc: 'Clues, challenges and a final surprise.', img: cdn('treasure-hunt.jpg') },
  { name: 'Slime Lab', desc: 'A colourful hands-on activity children can create themselves.', img: cdn('slime-bar.jpg') },
  { name: 'Character Adventures', desc: 'Meet, play and interact with their favourite characters.', img: cdn('charchter-adventure.jpg') },
  { name: 'Magic & Interactive Fun', desc: 'Entertainment designed around their age and interests.', img: cdn('magic-and-interactive-fun.jpg') },
  { name: 'Mini Racing', desc: 'Challenges, races and team competitions.', img: cdn('mini-racing.jpg') },
  { name: 'Mystery Challenge', desc: 'Age-appropriate puzzles and missions for older children.', img: cdn('mystery-challenge.jpg') },
  { name: 'Little Bakers', desc: 'Decorate cupcakes, cookies or mini treats themselves.', img: cdn('kids-cupcake.jpg') },
]

const SERVICES = [
  { title: 'Decor & Styling', desc: 'Beautiful setups and immersive party worlds.' },
  { title: 'Food & Catering', desc: 'Thoughtfully planned food for little guests and grown-ups.' },
  { title: 'Cakes & Sweets', desc: 'Custom cakes and dessert moments designed around the Tale.' },
  { title: 'Games & Activities', desc: 'Age-appropriate experiences that keep them engaged.' },
  { title: 'Entertainment', desc: 'Characters, performers, magic, music and interactive experiences.' },
  { title: 'Return Gifts', desc: 'Thoughtful takeaways children will actually love.' },
  { title: 'Invitations', desc: 'Beautiful invitations that introduce the Tale.' },
  { title: 'Photography & Film', desc: 'Capture the moments worth remembering.' },
]

const GALLERY_ITEMS = [
  { type: 'video', src: '/067815D9-F97B-4D25-B88F-661997C3D847.MP4', tall: true },
  { type: 'image', src: cdn('theme1.jpg'), tall: false },
  { type: 'image', src: cdn('dinasour-tale.jpg'), tall: false },
  { type: 'video', src: '/162DA336-2F56-478E-A44B-A728F9115FE8.MP4', tall: true },
  { type: 'image', src: cdn('art-tale.jpg'), tall: false },
  { type: 'image', src: cdn('fairy-tale.jpg'), tall: false },
  { type: 'video', src: '/D041ABD0-DF2C-4D74-ABF8-1FB2D4A58831.MP4', tall: true },
  { type: 'image', src: cdn('theme2.jpg'), tall: false },
  { type: 'image', src: cdn('safari-tale.jpg'), tall: false },
  { type: 'image', src: cdn('science-tale.jpg'), tall: false },
  { type: 'image', src: cdn('space-tale.jpg'), tall: false },
  { type: 'image', src: cdn('racecar-tale.jpg'), tall: false },
]

// ── COMPONENT ──────────────────────────────────────────────────────────────
export default function Home() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [loaded, setLoaded] = useState(false)
  const [activeTale, setActiveTale] = useState<typeof TALES[0] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 2000); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Anchor scroll
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLAnchorElement
      if (t.tagName === 'A' && t.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        document.getElementById(t.getAttribute('href')!.slice(1))?.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Scroll-lock: save position, lock body, restore on close
  const scrollLockRef = useRef(0)
  useEffect(() => {
    const shouldLock = !!(activeTale || mobileOpen)
    if (shouldLock) {
      scrollLockRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollLockRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo({ top: scrollLockRef.current, behavior: 'instant' })
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [activeTale, mobileOpen])

  // ESC key closes menu or modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setActiveTale(null) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleNext = () => { if (step < TOTAL_STEPS) setStep(s => s + 1) }
  const handlePrev = () => { if (step > 1) setStep(s => s - 1) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    // Attach uploaded files
    uploadedFiles.forEach(file => data.append('files', file))

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: data, // multipart/form-data — no Content-Type header needed
      })

      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setSubmitting(false)
    }
  }
  const handleFiles = (files: FileList | null) => { if (files) setUploadedFiles(p => [...p, ...Array.from(files)]) }
  const progress = (step / TOTAL_STEPS) * 100

  const closeModal = useCallback(() => setActiveTale(null), [])

  return (
    <>
      {/* ── LOADER ── */}
      <div className={`page-loader${loaded ? ' loader-done' : ''}`}>
        <div className="loader-logo">The Happy Tale</div>
        <div className="loader-tagline">Kids' Celebrations &amp; Experiences</div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
      </div>

      {/* ── NAV ── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo">The Happy Tale</a>
          <div className="nav-menu">
            <a href="#hero" className="nav-link">Home</a>
            <a href="#process" className="nav-link">How It Works</a>
            <a href="#tales" className="nav-link">Tales</a>
            <a href="#services" className="nav-link">Services</a>
          </div>
          <a href="#contact" className="nav-cta"><span>Create Their Tale ✨</span></a>
          <button className={`nav-toggle${mobileOpen ? ' active' : ''}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div className={`mob-overlay${mobileOpen ? ' mob-overlay--open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation">

        {/* Zone 1: Header — absolutely pinned top */}
        <div className="mob-zone-top">
          <span className="mob-logo">The Happy Tale</span>
          <button className="mob-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Zone 2: Nav — absolutely centred in middle */}
        <div className="mob-zone-mid">
          {[
            ['#hero',     'Home'],
            ['#process',  'How It Works'],
            ['#tales',    'Tales'],
            ['#services', 'Services'],
          ].map(([href, label], i) => (
            <a
              key={href}
              href={href}
              className="mob-link"
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 80}ms` : '0ms' }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Zone 3: Footer — absolutely pinned bottom */}
        <div className="mob-zone-bot">
          <div className="mob-socials">
            <a href="https://instagram.com" className="mob-social">Instagram</a>
            <a href="https://whatsapp.com" className="mob-social">WhatsApp</a>
            <a href="mailto:hello@thehappytale.com" className="mob-social">Email</a>
          </div>
          <a href="#contact" className="mob-cta" onClick={() => setMobileOpen(false)}>
            Create Their Tale ✨
          </a>
        </div>

      </div>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=85" alt="Children's celebration" loading="eager" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">Kids' Celebrations &amp; Experiences</p>
            <h1 className="hero-title">
              <span className="hero-line"><span>Every</span></span>
              <span className="hero-line"><span className="gold">Celebration</span></span>
              <span className="hero-line"><span>Tells a Story.</span></span>
            </h1>
            <p className="hero-sub">From the first idea to the final photograph, we create celebrations entirely around what they love.</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary"><span>Create Their Tale ✨</span></a>
              <a href="#tales" className="btn btn-ghost">Explore the Tales</a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Discover</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-eyebrow">How It Works</p>
            <h2 className="section-title">You Dream It.<br /><span className="gold">We Handle It.</span></h2>
            <p className="section-lead">Planning a children's celebration shouldn't mean coordinating ten different vendors, chasing deliveries and wondering if it will all come together.</p>
          </div>
          <div className="process-track">
            {[
              { n:'01', title:'Tell Us', desc:'Tell us about them, the celebration and what they love.' },
              { n:'02', title:'Imagine', desc:'We explore the ideas and possibilities.' },
              { n:'03', title:'Curate', desc:'We bring together decor, food, cake, activities, entertainment and every detail.' },
              { n:'04', title:'Propose', desc:'You receive a personalised celebration proposal.' },
              { n:'05', title:'Create', desc:'Our team coordinates and brings everything to life.' },
              { n:'06', title:'Celebrate', desc:'You enjoy the day. We handle the rest.' },
            ].map((s, i) => (
              <div className="process-step reveal" key={s.n} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="process-num">{s.n}</div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
                {i < 5 && <div className="process-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALES ── */}
      <section id="tales" className="tales">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-eyebrow">The Tales</p>
            <h2 className="section-title">What's Their<br /><span className="gold">World?</span></h2>
            <p className="section-lead">Beautiful worlds designed entirely around what they love.</p>
          </div>
          <div className="tales-grid">
            {TALES.map((tale, i) => (
              <div
                className="tale-card reveal-scale"
                key={tale.id}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                onClick={() => setActiveTale(tale)}
              >
                <div className="tale-card-img">
                  <img src={tale.img} alt={tale.name} loading="lazy" />
                  <div className="tale-card-overlay" />
                </div>
                <div className="tale-card-body">
                  <h3 className="tale-card-name">{tale.name}</h3>
                  <p className="tale-card-desc">{tale.tagline}</p>
                  <span className="tale-card-cta">Explore Tale →</span>
                </div>
              </div>
            ))}
            <div className="tale-card tale-card-custom reveal-scale" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <div className="tale-card-body tale-card-body-custom">
                <div className="tale-custom-spark">✨</div>
                <h3>Something Completely Theirs</h3>
                <p>Have something completely different in mind? Tell us. We'll create it around them.</p>
                <span className="tale-card-cta">Create a Custom Tale →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TALE MODAL ── */}
      {activeTale && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="modal-hero-img">
              <img src={activeTale.img} alt={activeTale.name} />
              <div className="modal-hero-overlay">
                <h2 className="modal-hero-title">{activeTale.name}</h2>
                <p className="modal-hero-tagline">{activeTale.tagline}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h4 className="modal-section-title">The Look</h4>
                <ul className="modal-list">
                  {activeTale.look.map(l => <li key={l}>{l}</li>)}
                </ul>
              </div>
              <div className="modal-section">
                <h4 className="modal-section-title">The Adventure</h4>
                <ul className="modal-list">
                  {activeTale.adventure.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div className="modal-section">
                <h4 className="modal-section-title">The Little Details</h4>
                <ul className="modal-list">
                  {activeTale.details.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
              <div className="modal-custom-note">
                <p className="modal-custom-label">And we can make it even more theirs.</p>
                <p className="modal-custom-text">Every Tale is customised around the child's age, interests, venue and imagination.</p>
              </div>
              <a href="#contact" className="btn btn-primary modal-cta" onClick={closeModal}>
                <span>Make This Their Tale ✨</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── ACTIVITIES ── */}
      <section id="activities" className="activities">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-eyebrow">Activities</p>
            <h2 className="section-title">More Than a Party.</h2>
            <p className="section-lead">Because the best celebrations give them something to remember.</p>
          </div>
          <div className="activities-grid">
            {ACTIVITIES.map((a, i) => (
              <div className="activity-card reveal" key={a.name} style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                <div className="activity-img">
                  {'video' in a ? (
                    <video src={a.video} autoPlay loop muted playsInline preload="metadata" />
                  ) : (
                    <img src={a.img} alt={a.name} loading="lazy" />
                  )}
                </div>
                <div className="activity-body">
                  <h4>{a.name}</h4>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGES ── */}
      <section className="ages">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-eyebrow">Age Groups</p>
            <h2 className="section-title">Made for Their Age.<br /><span className="gold">Made for Their World.</span></h2>
          </div>
          <div className="ages-grid">
            {[
              {
                label: 'Little Explorers', range: '3–5 Years',
                desc: 'Sensory play, bubbles, puppets, simple crafts, storytelling and movement games.',
                img: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=700&q=80',
              },
              {
                label: 'Curious Adventurers', range: '5–7 Years',
                desc: 'Treasure hunts, science experiments, art activities, characters and interactive games.',
                img: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=700&q=80',
              },
              {
                label: 'Big Kids', range: '8–12 Years',
                desc: 'Mystery hunts, escape-style challenges, STEM activities, gaming, competitions and DIY experiences.',
                img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=700&q=80',
              },
            ].map((ag, i) => (
              <div className="age-card reveal" key={ag.label} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="age-img"><img src={ag.img} alt={ag.label} loading="lazy" /></div>
                <div className="age-body">
                  <span className="age-range">{ag.range}</span>
                  <h3>{ag.label}</h3>
                  <p>{ag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-header reveal">
            <div className="services-headline">
              <p className="section-eyebrow">Services</p>
              <h2 className="section-title">
                You Dream It.
                <br />
                <span className="gold">We Handle It.</span>
              </h2>
            </div>
            <div className="services-subtext">
              <p className="services-lead">One team. Every detail. Instead of chasing ten different vendors, you make one call — and we bring the whole celebration together.</p>
              <div className="services-tags">
                {['Decor', 'Catering', 'Cake', 'Activities', 'Entertainment', 'Gifts', 'Invitations', 'Photography'].map(t => (
                  <span className="services-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card reveal" key={s.title} style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                <div className="service-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARENT PROMISE ── */}
      <section className="promise">
        <div className="promise-img-col">
          <img src={cdn('Gemini_Generated_Image_jplq77jplq77jplq.png')} alt="A child's celebration moment" loading="lazy" />
        </div>
        <div className="promise-text-col">
          <div className="reveal-left">
            <p className="section-eyebrow">The Promise</p>
            <h2 className="section-title">Made for Little Ones.<br /><span className="gold">Designed for Big Ones.</span></h2>
            <p className="promise-lead">Your job is to celebrate them.<br />Ours is to make everything else feel effortless.</p>
            <div className="promise-points">
              {[
                { title: 'One Point of Contact', desc: 'No chasing multiple vendors.' },
                { title: 'One Curated Experience', desc: 'Everything designed around their world.' },
                { title: 'One Team', desc: 'From planning to setup to celebration day.' },
                { title: 'Less to Organise', desc: 'More time to actually enjoy the day.' },
              ].map(p => (
                <div className="promise-point" key={p.title}>
                  <div className="promise-check">✓</div>
                  <div>
                    <strong>{p.title}</strong>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn btn-promise"><span>Create Their Tale ✨</span></a>
          </div>
        </div>
      </section>

      {/* ── NO TWO TALES ── */}
      <section className="notwo">
        <div className="container">
          <div className="notwo-grid">
            <div className="notwo-collage reveal-left">
              <img className="notwo-img notwo-img-a" src={cdn('fairy-tale.jpg')} alt="" loading="lazy" />
              <img className="notwo-img notwo-img-b" src={cdn('art-tale.jpg')} alt="" loading="lazy" />
              <img className="notwo-img notwo-img-c" src={cdn('dinasour-tale.jpg')} alt="" loading="lazy" />
            </div>
            <div className="notwo-text reveal-right">
              <p className="section-eyebrow">Every Celebration Is Unique</p>
              <h2 className="section-title">No Two Tales<br /><span className="gold">Are the Same.</span></h2>
              <div className="notwo-lines">
                <p>Maybe they dream about dinosaurs.</p>
                <p>Maybe they spend every weekend drawing.</p>
                <p>Maybe they are obsessed with racing, space, magic or football.</p>
              </div>
              <p className="notwo-coda">Tell us what makes them happy, and we'll build the celebration around it.</p>
              <a href="#contact" className="btn btn-primary"><span>Create Their Tale ✨</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-eyebrow">Our Work</p>
            <h2 className="section-title">Tales We've Told.</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <div className={`gallery-item${item.tall ? ' tall' : ''} reveal-scale`} key={i} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={item.src} alt="Celebration moment" loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="form-header reveal">
            <p className="section-eyebrow">Let's Begin</p>
            <h2 className="form-title">Create Their Tale.</h2>
            <p className="form-subtitle">Tell us a little. We'll take care of the rest.</p>
          </div>

          {submitted ? (
            <div className="form-success">
              <div className="success-content">
                <div className="success-star">✨</div>
                <h3>Your Tale Has Begun.</h3>
                <p>We'll be in touch soon to start creating something wonderful.</p>
              </div>
            </div>
          ) : (
            <div className="reveal">
              <div className="form-progress">
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                <span className="progress-text">Step {step} of {TOTAL_STEPS}</span>
              </div>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="form-step">
                    <h3 className="step-title">Who is the celebration for?</h3>
                    <div className="form-group">
                      <label className="form-label">Child's Name *</label>
                      <input type="text" className="form-input" name="childName" placeholder="Their name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Age *</label>
                      <input type="number" className="form-input" name="childAge" min="0" max="18" placeholder="How old are they turning?" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender (optional)</label>
                      <div className="radio-group">
                        {['Boy', 'Girl', 'Prefer not to say'].map(g => (
                          <label className="radio-option" key={g}><input type="radio" name="gender" value={g} /><span>{g}</span></label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="form-step">
                    <h3 className="step-title">Tell us about the celebration.</h3>
                    <div className="form-group">
                      <label className="form-label">Celebration Type *</label>
                      <div className="radio-group">
                        {['Birthday', 'Baby Celebration', 'Graduation', "Kids' Gathering", 'Other'].map(t => (
                          <label className="radio-option" key={t}><input type="radio" name="celebrationType" value={t} required /><span>{t}</span></label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input type="date" className="form-input" name="date" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">City / Area *</label>
                        <input type="text" className="form-input" name="city" placeholder="e.g. Mohali" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Approx. Guests *</label>
                        <input type="number" className="form-input" name="guests" min="1" placeholder="How many?" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Venue *</label>
                      <select className="form-select" name="venue" required>
                        <option value="">Select venue type</option>
                        {['Home', 'School', 'Restaurant', 'Outdoor', 'Other'].map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="form-step">
                    <h3 className="step-title">What do they love? ✨</h3>
                    <div className="form-group">
                      <label className="form-label">Favourite Characters</label>
                      <input type="text" className="form-input" name="characters" placeholder="e.g. Spider-Man, Bluey, Dinosaurs…" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Favourite Colours</label>
                      <input type="text" className="form-input" name="colours" placeholder="e.g. Blue, Rainbow, Pink…" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Favourite Hobbies / Interests</label>
                      <input type="text" className="form-input" name="hobbies" placeholder="e.g. Drawing, Dancing, Football…" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tell us about their world…</label>
                      <textarea className="form-textarea" name="world" rows={5} placeholder="Share everything that makes them smile — their interests, ideas, and what they love most." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Upload Inspiration (optional)</label>
                      <div
                        className="file-drop"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
                      >
                        <span className="file-drop-icon">📸</span>
                        <p>Upload photos, Pinterest or Instagram screenshots</p>
                        <span>click to browse or drag &amp; drop</span>
                        <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="file-list">
                          {uploadedFiles.map(f => (
                            <div className="file-item" key={f.name}>
                              <span>📄 {f.name}</span>
                              <button type="button" onClick={() => setUploadedFiles(p => p.filter(x => x.name !== f.name))}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="form-step">
                    <h3 className="step-title">What would you like us to handle?</h3>
                    <div className="checkbox-grid">
                      {['Decor & Styling', 'Food & Catering', 'Cakes & Sweets', 'Games & Activities', 'Entertainment', 'Return Gifts', 'Invitations', 'Photography & Film', 'Something Custom'].map(s => (
                        <label className="checkbox-option" key={s}>
                          <input type="checkbox" name="services" value={s} />
                          <span>{s}</span>
                        </label>
                      ))}
                      <label className="checkbox-option everything">
                        <input type="checkbox" name="services" value="everything" />
                        <span>I want you to handle everything ✨</span>
                      </label>
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className="form-step">
                    <h3 className="step-title">About you.</h3>
                    <div className="form-group">
                      <label className="form-label">Parent / Host Name *</label>
                      <input type="text" className="form-input" name="parentName" placeholder="Your name" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Phone *</label>
                        <input type="tel" className="form-input" name="phone" placeholder="+91 00000 00000" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input type="email" className="form-input" name="email" placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp *</label>
                      <div className="radio-group">
                        <label className="radio-option"><input type="radio" name="whatsapp" value="yes" required /><span>Yes, WhatsApp preferred</span></label>
                        <label className="radio-option"><input type="radio" name="whatsapp" value="no" /><span>No preference</span></label>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-nav">
                  {step > 1 ? <button type="button" className="btn-back" onClick={handlePrev}>← Back</button> : <span />}
                  {step < TOTAL_STEPS
                    ? <button type="button" className="btn-forward" onClick={handleNext}>Next →</button>
                    : <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
                        <span>{submitting ? 'Sending...' : 'Send My Tale ✨'}</span>
                      </button>
                  }
                </div>
                {submitError && (
                  <p style={{ color: '#E87563', fontSize: '0.875rem', textAlign: 'center', marginTop: '1rem' }}>
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">The Happy Tale</div>
            <p>Every celebration tells a story.<br />We create the tale.</p>
          </div>
          <div className="footer-links-col">
            <h4>Explore</h4>
            <a href="#process">How It Works</a>
            <a href="#tales">The Tales</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="footer-links-col">
            <h4>Connect</h4>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://whatsapp.com">WhatsApp</a>
            <a href="mailto:hello@thehappytale.com">Email Us</a>
          </div>
          <div className="footer-links-col">
            <h4>Location</h4>
            <p>Mohali / Chandigarh Tricity</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} The Happy Tale. All rights reserved.</p>
          <p>Every celebration tells a story. ✨</p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <a href="#contact" className="sticky-cta">Create Their Tale ✨</a>
    </>
  )
}
