import { useState, useEffect } from 'react'
import { getAllEntries, exportDiary, importDiary } from '../../db/diary'

const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December']
const MONTH_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN',
  'JUL','AUG','SEP','OCT','NOV','DEC']
const DAYS_LEFT = ['MON','TUE','WED']
const DAYS_RIGHT = ['THU','FRI','SAT','SUN']
const MINI_DAYS = ['M','T','W','T','F','S','S']

function CalendarSpread({ month, year, onSelectDate, onMonthChange }) {
  const [entries, setEntries] = useState([])

  useEffect(() => { getAllEntries().then(setEntries) }, [month, year])

  const entryMap = {}
  entries.forEach(e => { entryMap[e.date] = e })

  const firstDayRaw = new Date(year, month, 1).getDay()
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const rows = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))

  const toDateStr = (day) => {
    const m = String(month + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${year}-${m}-${d}`
  }

  const todayStr = new Date().toISOString().split('T')[0]

  const handleDayClick = (day) => {
    if (!day) return
    const dateStr = toDateStr(day)
    const existing = entryMap[dateStr]
    onSelectDate(existing || {
      id: null, date: dateStr, title: '',
      body: '', mood: null,
      leftPhoto: null, rightPhoto: null, stickers: [],
    })
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    importDiary(file).then(() => getAllEntries().then(setEntries))
  }

  // mini calendar — next month
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const nextFirstRaw = new Date(nextYear, nextMonth, 1).getDay()
  const nextFirst = nextFirstRaw === 0 ? 6 : nextFirstRaw - 1
  const nextDays = new Date(nextYear, nextMonth + 1, 0).getDate()
  const miniCells = []
  for (let i = 0; i < nextFirst; i++) miniCells.push(null)
  for (let d = 1; d <= nextDays; d++) miniCells.push(d)
  while (miniCells.length % 7 !== 0) miniCells.push(null)

  const HEADER_HEIGHT = 130
  const GAP = 3

  const pageStyle = {
    background: '#f7f4ee',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  // day cell style — shared between left and right
  const DayCellComponent = ({ day, isToday, entry, onClick }) => {
    if (!day) return (
      <div style={{
        background: 'rgba(0,0,0,0.015)',
        border: '0.5px solid rgba(0,0,0,0.05)',
        borderRadius: '3px',
      }} />
    )
    const hasPhoto = entry?.rightPhoto || entry?.leftPhoto
    return (
      <div onClick={onClick} style={{
        position: 'relative',
        background: hasPhoto ? 'transparent' : 'rgba(255,255,255,0.5)',
        border: isToday ? '1.5px solid #2c2c2c' : '0.5px solid rgba(0,0,0,0.1)',
        borderRadius: '3px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
        onMouseEnter={e => { if (!isToday) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)' }}
        onMouseLeave={e => { if (!isToday) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
      >
        {hasPhoto && (
          <img src={entry.rightPhoto || entry.leftPhoto} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.85,
          }} />
        )}
        <span style={{
          position: 'absolute', top: '4px', left: '5px',
          fontFamily: 'Patrick Hand, cursive', fontSize: '11px',
          color: hasPhoto ? '#fff' : '#5a5248',
          fontWeight: isToday ? '600' : '400',
          textShadow: hasPhoto ? '0 1px 3px rgba(0,0,0,0.4)' : 'none',
          zIndex: 2, lineHeight: 1,
        }}>
          {day}
        </span>
        {entry && !hasPhoto && entry.title && (
          <span style={{
            position: 'absolute', bottom: '4px', left: '5px', right: '5px',
            fontFamily: 'Patrick Hand, cursive', fontSize: '9px',
            color: '#8a8078', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1,
          }}>
            {entry.title}
          </span>
        )}
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      width: '92vw',
      maxWidth: '1200px',
      height: '88vh',
      maxHeight: '800px',
      boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.10)',
      borderRadius: '4px 8px 8px 4px',
      overflow: 'hidden',
    }}>

      {/* ── LEFT PAGE ── */}
      <div style={{
        ...pageStyle,
        flex: 1,
        borderRadius: '4px 0 0 4px',
        borderRight: '1px solid rgba(0,0,0,0.07)',
        padding: '24px 20px 16px 28px',
      }}>

        {/* header */}
        <div style={{ height: HEADER_HEIGHT, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '4rem', fontWeight: '600',
              color: '#2c2c2c', lineHeight: 1,
            }}>
              {String(month + 1).padStart(2, '0')}
            </h1>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'Cormorant, serif', fontSize: '0.9rem', color: '#2c2c2c', letterSpacing: '0.08em' }}>
                {MONTHS[month]}
              </p>
              <p style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.7rem', color: '#a0998e' }}>
                {year}
              </p>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '4px' }}>
                {['← prev', 'next →'].map((label, i) => (
                  <button key={label} onClick={() => {
                    const d = new Date(year, month + (i === 0 ? -1 : 1), 1)
                    onMonthChange(d.getMonth(), d.getFullYear())
                  }} style={{
                    fontFamily: 'Patrick Hand, cursive', fontSize: '10px',
                    color: '#a0998e', background: 'none', border: 'none', cursor: 'pointer',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
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

        {/* day headers row — empty strip + MON TUE WED */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 1fr 1fr',
          gap: GAP,
          marginBottom: GAP,
        }}>
          <div /> {/* empty above mini calendar strip */}
          {DAYS_LEFT.map(d => (
            <div key={d} style={{
              fontFamily: 'Patrick Hand, cursive', fontSize: '9px',
              letterSpacing: '0.06em', color: '#b0a898', textAlign: 'center',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* grid rows — mini strip + MON TUE WED */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: GAP }}>
          {rows.map((row, rowIdx) => {
            return (
              <div key={rowIdx} style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 1fr 1fr',
                gap: GAP,
                flex: 1,
              }}>
                {/* mini calendar strip cell */}
                <div />
                {/* MON TUE WED cells */}
                {row.slice(0, 3).map((day, colIdx) => (
                  <DayCellComponent
                    key={colIdx}
                    day={day}
                    isToday={day ? toDateStr(day) === todayStr : false}
                    entry={day ? entryMap[toDateStr(day)] : null}
                    onClick={() => handleDayClick(day)}
                  />
                ))}
              </div>
            )
          })}
        </div>

        <p style={{
          fontFamily: 'Patrick Hand, cursive', fontSize: '10px',
          color: '#c0b8ae', marginTop: '8px',
        }}>
          click any date to write ✦
        </p>
      </div>

      {/* ── SPINE ── */}
      <div style={{
        width: '10px', flexShrink: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.07), rgba(0,0,0,0.01))',
      }} />

      {/* ── RIGHT PAGE ── */}
      <div style={{
        ...pageStyle,
        flex: 1,
        borderRadius: '0 8px 8px 0',
        padding: '24px 28px 16px 20px',
      }}>

        {/* header — same fixed height */}
        <div style={{ height: HEADER_HEIGHT, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h1 style={{
              fontFamily: 'Cormorant, serif', fontSize: '1.5rem',
              fontWeight: '400', letterSpacing: '0.35em', color: '#2c2c2c',
            }}>
              DAILY
            </h1>
            <p style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.7rem', color: '#a0998e' }}>
              {MONTHS[month]} {year}
            </p>
          </div>
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)', margin: '10px 0 0' }} />
        </div>

        {/* day headers THU FRI SAT SUN */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: GAP, marginBottom: GAP,
        }}>
          {DAYS_RIGHT.map(d => (
            <div key={d} style={{
              fontFamily: 'Patrick Hand, cursive', fontSize: '9px',
              letterSpacing: '0.06em', color: '#b0a898', textAlign: 'center',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* THU FRI SAT SUN grid */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: GAP }}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: GAP, flex: 1,
            }}>
              {row.slice(3).map((day, colIdx) => (
                <DayCellComponent
                  key={colIdx}
                  day={day}
                  isToday={day ? toDateStr(day) === todayStr : false}
                  entry={day ? entryMap[toDateStr(day)] : null}
                  onClick={() => handleDayClick(day)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* export / import */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button onClick={exportDiary} style={{
            fontFamily: 'Patrick Hand, cursive', fontSize: '10px',
            color: '#a0998e', background: 'rgba(0,0,0,0.04)',
            border: '0.5px solid rgba(0,0,0,0.12)',
            borderRadius: '4px', padding: '4px 10px', cursor: 'pointer',
          }}>
            export backup ↓
          </button>
          <label style={{
            fontFamily: 'Patrick Hand, cursive', fontSize: '10px',
            color: '#a0998e', background: 'rgba(0,0,0,0.04)',
            border: '0.5px solid rgba(0,0,0,0.12)',
            borderRadius: '4px', padding: '4px 10px', cursor: 'pointer',
          }}>
            import backup ↑
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  )
}

export default CalendarSpread