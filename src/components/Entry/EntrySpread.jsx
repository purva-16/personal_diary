import { useState } from 'react'
import LeftPage from './LeftPage'
import RightPage from './RightPage'
import { saveEntry, updateEntry } from '../../db/diary'
import StickerTray from './StickerTray'
import { DraggableSticker } from './DraggableSticker'

function EntrySpread({ entry, onBack }) {

  const [title, setTitle] = useState(entry.title || '')
  const [body, setBody] = useState(entry.body || '')
  const [caption, setCaption] = useState(entry.caption || '')
  const [leftPhoto, setLeftPhoto] = useState(entry.leftPhoto || null)
  const [rightPhoto, setRightPhoto] = useState(entry.rightPhoto || null)
  const [leftCaption, setLeftCaption] = useState(entry.leftCaption || '')
const [rightCaption, setRightCaption] = useState(entry.rightCaption || '')
  const [stickers, setStickers] = useState(entry.stickers || [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const userName = localStorage.getItem('diaryUserName') || 'NAME'
  const [pageTint, setPageTint] = useState(entry.pageTint || '#f7f4ee')


  const toBase64 = (file) => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })

  const handleLeftPhoto = async (file) => {
    const b64 = await toBase64(file)
    setLeftPhoto(b64)
  }

  const handleRightPhoto = async (file) => {
    const b64 = await toBase64(file)
    setRightPhoto(b64)
  }

  const handleAddSticker = (src) => {
  setStickers(prev => [...prev, { src, pos: { x: 80, y: 80 } }])
}

const handleUpdateStickerPos = (idx, x, y) => {
  setStickers(prev => prev.map((s, i) => 
    i === idx ? { ...s, pos: { x, y } } : s
  ))
}

  const handleRemoveSticker = (idx) => {
    setStickers(prev => prev.filter((_, i) => i !== idx))
  }

  

  const handleSave = async () => {
    setSaving(true)
      const data = {
      title, body, caption, leftCaption, rightCaption,
      leftPhoto, rightPhoto, stickers, pageTint,
      date: entry.date
}
    
    if (entry.id) {
      await updateEntry(entry.id, data)
    } else {
      await saveEntry(data)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // format date
  const dateObj = new Date(entry.date + 'T00:00:00')
  const day = dateObj.getDate()
  const suffix = ['th','st','nd','rd'][
    day % 10 < 4 && ~~(day % 100 / 10) !== 1 ? day % 10 : 0
  ]
  const monthName = dateObj.toLocaleDateString('en-GB', { month: 'long' })
  const weekday = dateObj.toLocaleDateString('en-GB', { weekday: 'long' })
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{
              position: 'relative',
              display: 'flex',
              width: '92vw',
              maxWidth: '1200px',
              height: '88vh',
              maxHeight: '800px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.10)',
              borderRadius: '4px 8px 8px 4px',
              overflow: 'visible',
            }}>


            {/* stickers layer */}
          {stickers.map((sticker, idx) => (
            <DraggableSticker
              key={idx}
              sticker={sticker}
              onRemove={() => handleRemoveSticker(idx)}
              onDragEnd={(newPos) => handleUpdateStickerPos(idx, newPos.x, newPos.y)}
            />
          ))}


    <LeftPage
        day={day}
        suffix={suffix}
        monthName={monthName}
        weekday={weekday}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        leftPhoto={leftPhoto}
        onLeftPhoto={handleLeftPhoto}
        onBack={onBack}
        month={month}
        year={year}
        onMonthChange={onBack}
        leftCaption={leftCaption}
        setLeftCaption={setLeftCaption}
        pageTint={pageTint}
        setPageTint={setPageTint}
        pageNum={`${String(month + 1).padStart(2,'0')} · ${day}`}
      />

      {/* spine */}
      <div style={{
        width: '10px', flexShrink: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.07), rgba(0,0,0,0.01))',
      }} />

      <RightPage
        rightPhoto={rightPhoto}
        onRightPhoto={handleRightPhoto}
        caption={caption}
        setCaption={setCaption}
        stickers={stickers}
        onAddSticker={handleAddSticker}
        onRemoveSticker={handleRemoveSticker}
        saving={saving}
        saved={saved}
        onSave={handleSave}
        month={month}
        year={year}
        onMonthChange={onBack}
        rightCaption={rightCaption}
        setRightCaption={setRightCaption}
        userName={userName}
        pageTint={pageTint}
        setPageTint={setPageTint}
        onUpdateStickerPos={handleUpdateStickerPos}
      />

    </div>

    <StickerTray onAddSticker={handleAddSticker} />

  </div>
)
}

export default EntrySpread