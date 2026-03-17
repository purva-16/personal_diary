function BookCover({ onOpen }) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onOpen}>

      {/* ribbon peeking out bottom */}
      <div style={{
        position: 'absolute',
        bottom: '-18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '8px',
        height: '28px',
        background: 'linear-gradient(to bottom, #8b1a1a, #c0392b)',
        borderRadius: '0 0 3px 3px',
        zIndex: 0,
      }} />

      {/* main cover */}
      <div
        style={{
          width: '360px',
          height: '480px',
          background: 'linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 100%)',
          borderRadius: '4px 16px 16px 4px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35), 4px 0 12px rgba(0,0,0,0.2), inset -1px 0 0 rgba(255,255,255,0.03)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px) rotate(-0.5deg)'
          e.currentTarget.style.boxShadow = '0 32px 70px rgba(0,0,0,0.38), 4px 0 12px rgba(0,0,0,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'
          e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.35), 4px 0 12px rgba(0,0,0,0.2)'
        }}
      >
        {/* spine */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '28px',
          background: 'linear-gradient(to right, #111, #222, #1a1a1a)',
          borderRight: '0.5px solid rgba(255,255,255,0.04)',
        }}>
          {/* spine dots */}
          {[80, 160, 240, 320, 400].map(top => (
            <div key={top} style={{
              position: 'absolute', top,
              left: '50%', transform: 'translateX(-50%)',
              width: '3px', height: '3px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }} />
          ))}
        </div>

        {/* subtle texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)',
          pointerEvents: 'none',
        }} />

        {/* corner decoration top right */}
        <div style={{
          position: 'absolute', top: '28px', right: '28px',
          width: '40px', height: '40px',
          border: '0.5px solid rgba(255,255,255,0.08)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '34px', right: '34px',
          width: '28px', height: '28px',
          border: '0.5px solid rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />

        {/* corner decoration bottom left */}
        <div style={{
          position: 'absolute', bottom: '28px', left: '48px',
          width: '32px', height: '32px',
          border: '0.5px solid rgba(255,255,255,0.06)',
          borderRadius: '50%',
        }} />

        {/* content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '8px', paddingLeft: '28px',
        }}>
          {/* top sparkle */}
          <p style={{
            fontFamily: 'Cormorant, serif', fontSize: '11px',
            letterSpacing: '0.4em', color: 'rgba(255,255,255,0.25)',
            marginBottom: '8px',
          }}>
            ✦ ✦ ✦
          </p>

          <p style={{
            fontFamily: 'Patrick Hand, cursive',
            fontSize: '0.65rem', letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
          }}>
            my
          </p>

          <h1 style={{
            fontFamily: 'Cormorant, serif',
            fontSize: '3.2rem', fontWeight: '600',
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            DAILY
          </h1>

          <div style={{
            width: '48px', height: '0.5px',
            background: 'rgba(255,255,255,0.15)',
            margin: '8px 0',
          }} />

          <p style={{
            fontFamily: 'Cormorant, serif',
            fontSize: '0.7rem', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
          }}>
            click to open
          </p>

          {/* bottom sparkle */}
          <p style={{
            fontFamily: 'Cormorant, serif', fontSize: '11px',
            letterSpacing: '0.4em', color: 'rgba(255,255,255,0.12)',
            marginTop: '12px',
          }}>
            ✦
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookCover