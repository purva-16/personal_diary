const stickerModules = import.meta.glob('../../assets/stickers/*.png', { eager: true })
const STICKERS = Object.values(stickerModules).map(m => m.default)

function StickerTray({ onAddSticker }) {
  return (
    <div style={{
      width: '92vw',
      maxWidth: '1200px',
      marginTop: '10px',
      background: 'rgba(255,255,255,0.5)',
      borderRadius: '8px',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(0,0,0,0.15) transparent',
    }}>
      <span style={{
        fontFamily: 'Patrick Hand, cursive',
        fontSize: '10px', color: 'rgba(0,0,0,0.3)',
        flexShrink: 0, letterSpacing: '0.05em',
      }}>
        stickers
      </span>
      <div style={{
        width: '0.5px', height: '24px',
        background: 'rgba(0,0,0,0.1)', flexShrink: 0,
      }} />
      {STICKERS.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          onClick={() => onAddSticker(src)}
          style={{
            height: '44px',
            width: 'auto',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'transform 0.15s',
            borderRadius: '4px',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      ))}
    </div>
  )
}

export default StickerTray