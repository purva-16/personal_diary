const PAGE_TINTS = [
  { name: 'warm white', value: '#f7f4ee' },
  { name: 'sage', value: '#d6e8d8' },
  { name: 'butter', value: '#f7f4e0' },
  { name: 'sky', value: '#daeaf5' },
]

function LeftPage({
  day, suffix, monthName, weekday,
  title, setTitle, body, setBody,
  leftPhoto, onLeftPhoto,
  leftCaption, setLeftCaption,
  onBack, month, year, onMonthChange,
  pageTint, setPageTint,
}) {
  const LINE_HEIGHT = 32

  const handlePhotoClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      if (e.target.files[0]) onLeftPhoto(e.target.files[0])
    }
    input.click()
  }

  return (
    <div style={{
      flex: 1,
      background: pageTint || PAGE_TINTS[0].value,
      borderRadius: '4px 0 0 4px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* top strip */}
      <div style={{
        padding: '10px 20px 8px 20px',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          fontFamily: 'Patrick Hand, cursive', fontSize: '11px',
          color: '#a0998e', background: 'none', border: 'none',
          cursor: 'pointer',
        }}>
          ← back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{
            fontFamily: 'Cormorant, serif', fontSize: '1.1rem',
            fontWeight: '400', letterSpacing: '0.35em',
            color: '#2c2c2c', margin: 0,
          }}>
            DAILY
          </h1>
          <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.2)' }}>✦</span>
        </div>

        {/* page tint picker */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {PAGE_TINTS.map((t) => (
            <div
              key={t.name}
              onClick={() => setPageTint(t.value)}
              title={t.name}
              style={{
                width: '11px', height: '11px',
                borderRadius: '50%',
                background: t.value,
                border: pageTint === t.value
                  ? '1.5px solid rgba(0,0,0,0.4)'
                  : '1.5px solid rgba(0,0,0,0.15)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

      {/* space at top */}
      <div style={{ height: '16px', flexShrink: 0 }} />

      {/* date */}
      <div style={{
        padding: '8px 24px 12px 24px',
        display: 'flex', alignItems: 'baseline', gap: '10px',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Libre Baskerville, serif',
          fontSize: '3rem', fontWeight: '700',
          color: '#2c2c2c', lineHeight: 1,
        }}>
          {day}{suffix}
        </span>
        <span style={{
          fontFamily: 'Libre Baskerville, serif',
          fontSize: '1.3rem', fontWeight: '400',
          color: '#2c2c2c',
        }}>
          {monthName}
        </span>
        <span style={{
          fontFamily: 'Libre Baskerville, serif',
          fontSize: '0.8rem', fontStyle: 'italic',
          color: '#a0998e',
        }}>
          {weekday}
        </span>
        <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.15)', marginLeft: '2px' }}>✦</span>
      </div>

      {/* content — polaroid + writing side by side */}
      <div style={{
        flex: 1, padding: '0 24px 16px 24px',
        display: 'flex', gap: '18px',
        overflow: 'hidden', minHeight: 0,
      }}>

        {/* vertical polaroid */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', marginTop: '14px' }}>
            {/* washi tape */}
            <div style={{
              position: 'absolute', top: '-10px', left: '50%',
              transform: 'translateX(-50%) rotate(-6deg)',
              width: '55px', height: '16px',
              background: 'repeating-linear-gradient(90deg, rgba(180,210,190,0.7) 0px, rgba(180,210,190,0.7) 8px, rgba(160,195,172,0.7) 8px, rgba(160,195,172,0.7) 16px)',
              zIndex: 10, borderRadius: '1px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            }} />
            <div style={{
              position: 'absolute', top: '-10px', left: '50%',
              transform: 'translateX(-50%) rotate(-6deg)',
              width: '55px', height: '16px',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '6px 6px',
              zIndex: 11, borderRadius: '1px',
            }} />
            <div
              onClick={handlePhotoClick}
              style={{
                width: '110px',
                background: '#fff',
                padding: '6px 6px 0 6px',
                boxShadow: '2px 3px 10px rgba(0,0,0,0.13)',
                transform: 'rotate(-2deg)',
                cursor: 'pointer',
              }}
            >
              {leftPhoto ? (
                <img src={leftPhoto} alt="" style={{
                  width: '100%', height: '140px',
                  objectFit: 'cover', display: 'block',
                }} />
              ) : (
                <div style={{
                  width: '100%', height: '140px',
                  background: '#ede9e2',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column', gap: '6px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="13" rx="2" stroke="#c0b8ae" strokeWidth="1.2"/>
                    <circle cx="10" cy="10.5" r="3" stroke="#c0b8ae" strokeWidth="1.1"/>
                    <path d="M7 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#c0b8ae" strokeWidth="1.1"/>
                  </svg>
                  <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '9px', color: '#c0b8ae' }}>
                    add photo
                  </span>
                </div>
              )}
              <div style={{ padding: '4px 3px 6px 3px', textAlign: 'center' }}>
                <input
                  value={leftCaption}
                  onChange={e => {
                    if (!e.target.value.includes(' ')) setLeftCaption(e.target.value)
                  }}
                  placeholder="word"
                  maxLength={20}
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '0.8rem', color: '#7a6a5a',
                    background: 'transparent', border: 'none',
                    outline: 'none', width: '100%',
                    textAlign: 'center',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* title + ruled body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="title..."
            style={{
              fontFamily: 'Fascinate, cursive',
              fontSize: '1.4rem', fontWeight: '400',
              color: '#2c2c2c', background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.13)',
              outline: 'none', width: '100%',
              paddingBottom: '4px',
            }}
          />

          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent ${LINE_HEIGHT - 1}px,
                rgba(180,160,130,0.15) ${LINE_HEIGHT - 1}px,
                rgba(180,160,130,0.15) ${LINE_HEIGHT}px
              )`,
              backgroundSize: `100% ${LINE_HEIGHT}px`,
              pointerEvents: 'none',
            }} />
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="write about your day..."
              style={{
                fontFamily: 'Patrick Hand, cursive',
                fontSize: '1rem', color: '#3d2b1a',
                background: 'transparent',
                border: 'none', outline: 'none',
                resize: 'none',
                width: '100%', height: '100%',
                lineHeight: `${LINE_HEIGHT}px`,
                paddingTop: '4px',
                overflow: 'hidden',
              }}
            />
          </div>
        </div>
      </div>

      {/* page number */}
      <div style={{
        position: 'absolute', bottom: '10px', left: '24px',
        fontFamily: 'Cormorant, serif', fontSize: '10px',
        color: 'rgba(0,0,0,0.2)', letterSpacing: '0.1em',
        zIndex: 5,
      }}>
        {String(month + 1).padStart(2, '0')} · {day}
      </div>

    </div>
  )
}

export default LeftPage