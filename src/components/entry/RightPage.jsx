import React, { useState } from 'react'

function RightPage({
  rightPhoto, onRightPhoto,
  rightCaption, setRightCaption,
  caption, setCaption,
  stickers, onRemoveSticker, onUpdateStickerPos,
  saving, saved, onSave,
  month, year, onMonthChange,
  userName, pageTint
}) {
  const MONTH_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN',
    'JUL','AUG','SEP','OCT','NOV','DEC']
  const LINE_HEIGHT = 32

  const handlePhotoClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      if (e.target.files[0]) onRightPhoto(e.target.files[0])
    }
    input.click()
  }

  const handleCaptionChange = (val) => {
    const words = val.trim().split(/\s+/)
    if (words.length <= 6 || val.length < (rightCaption || '').length) {
      setRightCaption(val)
    }
  }

  const sealName = userName || 'NAME'
  const nameParts = sealName.toUpperCase().split(' ')
  const sealLine1 = nameParts[0] || ''
  const sealLine2 = nameParts.slice(1).join(' ') || ''

  return (
    <div style={{
      flex: 1,
      background: pageTint || '#f7f4ee',
      borderRadius: '0 8px 8px 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* top strip — month tabs */}
      <div style={{
        padding: '10px 20px 8px 20px',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        display: 'flex', justifyContent: 'flex-end',
        alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {MONTH_SHORT.map((m, i) => (
            <span key={m} onClick={() => onMonthChange(i, year)} style={{
              fontFamily: 'Patrick Hand, cursive', fontSize: '9px',
              letterSpacing: '0.06em',
              color: i === month ? '#2c2c2c' : '#b0a898',
              borderBottom: i === month ? '1.5px solid #2c2c2c' : '1.5px solid transparent',
              paddingBottom: '1px', cursor: 'pointer',
            }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

      {/* main content */}
      <div style={{
        flex: 1, padding: '16px 24px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '8px',
        overflow: 'hidden', minHeight: 0,
        position: 'relative',
      }}>

        {/* horizontal polaroid */}
        <div style={{ position: 'relative', width: '72%', flexShrink: 0, marginTop: '12px' }}>
          <div style={{
            position: 'absolute', top: '-11px', left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '80px', height: '20px',
            background: 'repeating-linear-gradient(90deg, rgba(210,185,160,0.65) 0px, rgba(210,185,160,0.65) 10px, rgba(225,205,180,0.65) 10px, rgba(225,205,180,0.65) 20px)',
            zIndex: 10, borderRadius: '1px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }} />
          <div style={{
            position: 'absolute', top: '-11px', left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '80px', height: '20px',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)',
            backgroundSize: '10px 10px',
            backgroundPosition: '5px 5px',
            zIndex: 11, borderRadius: '1px',
          }} />

          <div onClick={handlePhotoClick} style={{
            background: '#fff',
            padding: '6px 6px 0 6px',
            boxShadow: '2px 3px 12px rgba(0,0,0,0.13)',
            transform: 'rotate(1deg)',
            cursor: 'pointer',
          }}>
            {rightPhoto ? (
              <img src={rightPhoto} alt="" style={{
                width: '100%', height: '155px',
                objectFit: 'cover', display: 'block',
              }} />
            ) : (
              <div style={{
                width: '100%', height: '155px',
                background: '#ede9e2',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column', gap: '8px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#c0b8ae" strokeWidth="1.2"/>
                  <circle cx="12" cy="12" r="3.5" stroke="#c0b8ae" strokeWidth="1.1"/>
                  <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#c0b8ae" strokeWidth="1.1"/>
                </svg>
                <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '10px', color: '#c0b8ae' }}>
                  tap to add photo
                </span>
              </div>
            )}
            <div style={{ padding: '6px 8px 8px 8px', minHeight: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                value={rightCaption || ''}
                onChange={e => handleCaptionChange(e.target.value)}
                placeholder="caption..."
                onClick={e => e.stopPropagation()}
                style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '0.9rem', color: '#7a6a5a',
                  background: 'transparent', border: 'none',
                  outline: 'none', width: '100%',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
        </div>

        {/* ruled notes area */}
        <div style={{
          flex: 1, width: '100%',
          position: 'relative', overflow: 'hidden', minHeight: 0,
        }}>
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
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="notes..."
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

      {/* wax seal */}
      <svg style={{
        position: 'absolute', bottom: '20px', right: '24px',
        width: '56px', height: '56px', cursor: 'pointer',
      }} viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="26" fill="#2c2c2c" opacity="0.85"/>
        <circle cx="28" cy="28" r="21" fill="none"
          stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2.5 2"/>
        <text x="28" y="14" textAnchor="middle"
          fontFamily="serif" fontSize="5" fill="rgba(255,255,255,0.4)">✦</text>
        <text x="28" y="46" textAnchor="middle"
          fontFamily="serif" fontSize="5" fill="rgba(255,255,255,0.4)">✦</text>
        <text x="28" y={sealLine2 ? '26' : '30'} textAnchor="middle"
          fontFamily="Cormorant, serif" fontSize="7.5"
          fill="white" fontWeight="600" letterSpacing="1.5">
          {sealLine1}
        </text>
        {sealLine2 && (
          <text x="28" y="36" textAnchor="middle"
            fontFamily="Cormorant, serif" fontSize="7.5"
            fill="white" fontWeight="600" letterSpacing="1.5">
            {sealLine2}
          </text>
        )}
      </svg>

      {/* save */}
      <button onClick={onSave} style={{
        position: 'absolute', bottom: '22px', left: '20px',
        fontFamily: 'Patrick Hand, cursive', fontSize: '11px',
        color: saved ? '#6a9070' : '#a0998e',
        background: 'rgba(0,0,0,0.04)',
        border: '0.5px solid rgba(0,0,0,0.12)',
        borderRadius: '4px', padding: '5px 14px',
        cursor: 'pointer', transition: 'color 0.3s',
      }}>
        {saving ? 'saving...' : saved ? 'saved ✦' : 'save entry'}
      </button>
    </div>
  )
}

export default RightPage