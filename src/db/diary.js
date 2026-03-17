import Dexie from 'dexie'

// this is our local database — lives in your browser's IndexedDB
export const db = new Dexie('myDiary')

// define the structure of our database
// version 1 — we can add versions later if we change the structure
db.version(1).stores({
  entries: '++id, date, title, body, mood, leftPhoto, rightPhoto, stickers, createdAt'
})

// helper — save a new entry
export const saveEntry = async (entry) => {
  return await db.entries.add({
    ...entry,
    createdAt: new Date().toISOString()
  })
}

// helper — update an existing entry
export const updateEntry = async (id, changes) => {
  return await db.entries.update(id, changes)
}

// helper — get all entries, newest first
export const getAllEntries = async () => {
  return await db.entries.orderBy('date').reverse().toArray()
}

// helper — get one specific entry by id
export const getEntry = async (id) => {
  return await db.entries.get(id)
}

// helper — get entry by date (for calendar)
export const getEntryByDate = async (date) => {
  return await db.entries.where('date').equals(date).first()
}

// helper — delete an entry
export const deleteEntry = async (id) => {
  return await db.entries.delete(id)
}

// helper — export all entries as JSON (your backup feature)
export const exportDiary = async () => {
  const entries = await getAllEntries()
  const json = JSON.stringify(entries, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `my-diary-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// helper — import entries from JSON backup
export const importDiary = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const entries = JSON.parse(e.target.result)
        // clear existing and reload from backup
        await db.entries.clear()
        await db.entries.bulkAdd(entries)
        resolve(entries.length)
      } catch (err) {
        reject(err)
      }
    }
    reader.readAsText(file)
  })
}