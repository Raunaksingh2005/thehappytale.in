export default function TestImages() {
  const images = [
    '/dinasour-tale.jpg',
    '/space-tale.jpg',
    '/fairy-tale.jpg',
    '/art-tale.jpg',
    '/Gemini_Generated_Image_jplq77jplq77jplq.jpg',
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
      <h1 style={{ color: '#000' }}>Image Loading Test</h1>
      <p style={{ color: '#666' }}>If you see images below, they are loading correctly:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {images.map((src) => (
          <div key={src} style={{ border: '2px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: '#000', marginBottom: '0.5rem', fontSize: '14px' }}>{src}</p>
            <img 
              src={src} 
              alt={src}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onLoad={() => console.log(`✅ Loaded: ${src}`)}
              onError={() => console.log(`❌ Failed: ${src}`)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2 style={{ color: '#000' }}>Debugging Info:</h2>
        <ul style={{ color: '#333' }}>
          <li>If images show: ✅ Everything works!</li>
          <li>If you see broken image icons: ❌ Files missing or path wrong</li>
          <li>If nothing loads: ❌ Check browser console for errors</li>
        </ul>
        <p style={{ color: '#666', marginTop: '1rem' }}>
          Open DevTools (F12) → Console tab to see load status
        </p>
      </div>
    </div>
  );
}
