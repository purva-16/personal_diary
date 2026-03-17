// the open book wrapper — two pages side by side
// children get rendered inside, we'll fill left/right pages properly later
function BookSpread({ children }) {
  return (
    <div style={{
      display: 'flex',
      width: '90vw',
      maxWidth: '1100px',
      minHeight: '680px',
      boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.10)',
      borderRadius: '4px 8px 8px 4px',
    }}>

      {/* left page */}
      <div style={{
        flex: 1,
        background: '#f7f4ee',
        borderRadius: '4px 0 0 4px',
        padding: '40px',
        position: 'relative',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        backgroundImage: `
          radial-gradient(circle, #c8c4bc 0.8px, transparent 0.8px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0',
      }}>
        {children}
      </div>

      {/* spine shadow */}
      <div style={{
        width: '12px',
        background: 'linear-gradient(to right, rgba(0,0,0,0.08), rgba(0,0,0,0.02))',
        flexShrink: 0,
      }} />

      {/* right page */}
      <div style={{
        flex: 1,
        background: '#f7f4ee',
        borderRadius: '0 8px 8px 0',
        padding: '40px',
        position: 'relative',
        backgroundImage: `
          radial-gradient(circle, #c8c4bc 0.8px, transparent 0.8px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0',
      }}>
      </div>

    </div>
  )
}

export default BookSpread