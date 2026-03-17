import { useState } from 'react'
import BookCover from './components/Book/BookCover'
import BookSpread from './components/Book/BookSpread'
import CalendarSpread from './components/Calendar/CalendarSpread'
import EntrySpread from './components/entry/EntrySpread'


// think of this like your main MVC controller
// it holds the current "view state" and passes it down to components
function App() {

  // which screen are we on?
  // 'cover' → closed book
  // 'calendar' → open book showing calendar spread
  // 'entry' → open book showing a specific entry
  const [view, setView] = useState('cover')

  // which entry are we looking at? (null if on cover or calendar)
  const [activeEntry, setActiveEntry] = useState(null)

  // which month are we viewing on the calendar?
  const [activeMonth, setActiveMonth] = useState(() => {
    const now = new Date()
    return { month: now.getMonth(), year: now.getFullYear() }
  })

  // called when user clicks the book cover to open it
  const handleOpenBook = () => {
    setView('calendar')
  }

  // called when user clicks a date on the calendar
  const handleSelectDate = (entry) => {
    setActiveEntry(entry)
    setView('entry')
  }

  // called when user wants to go back to calendar
  const handleBackToCalendar = () => {
    setActiveEntry(null)
    setView('calendar')
  }

  return (
    <div className="min-h-screen flex items-center justify-center"
  style={{
    background: '#e8ede8',
    backgroundImage: `radial-gradient(circle, rgba(180,190,180,0.4) 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
  }}>

      {view === 'cover' && (
        <BookCover onOpen={handleOpenBook} />
      )}

      {view === 'calendar' && (
        <CalendarSpread
        month={activeMonth.month}
        year={activeMonth.year}
        onSelectDate={handleSelectDate}
        onMonthChange={(month, year) => setActiveMonth({ month, year })}
        />
      )}

      {view === 'entry' && (
        <EntrySpread
          entry={activeEntry}
          onBack={handleBackToCalendar}
        />
      )}

    </div>
  )
}

export default App