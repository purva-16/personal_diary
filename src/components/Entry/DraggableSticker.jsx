import React, { useState } from 'react'

export function DraggableSticker({ sticker, onRemove, onDragEnd }) {
  const [pos, setPos] = useState(sticker.pos || { x: 100, y: 100 })
  const [size, setSize] = useState(sticker.size || 64)
  const [rotation, setRotation] = useState(sticker.rotation || 0)
  const [dragging, setDragging] = useState(false)
  const startRef = React.useRef(null)

  // drag
  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    }
  }

  React.useEffect(() => {
    if (!dragging) return
    const handleMouseMove = (e) => {
      const dx = e.clientX - startRef.current.mouseX
      const dy = e.clientY - startRef.current.mouseY
      setPos({
        x: startRef.current.posX + dx,
        y: startRef.current.posY + dy,
      })
    }
    const handleMouseUp = (e) => {
      setDragging(false)
      const dx = e.clientX - startRef.current.mouseX
      const dy = e.clientY - startRef.current.mouseY
      onDragEnd({
        x: startRef.current.posX + dx,
        y: startRef.current.posY + dy,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  // scroll to resize
  const handleWheel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSize(prev => Math.min(200, Math.max(24, prev - e.deltaY * 0.1)))
  }

  // right click drag to rotate
  const handleContextMenu = (e) => e.preventDefault()

  const handleRightMouseDown = (e) => {
    if (e.button !== 2) return
    e.preventDefault()
    e.stopPropagation()
    startRef.current = {
      ...startRef.current,
      rotating: true,
      startX: e.clientX,
      startRotation: rotation,
    }
  }

  React.useEffect(() => {
    const handleRightMouseMove = (e) => {
      if (!startRef.current?.rotating) return
      const dx = e.clientX - startRef.current.startX
      setRotation(startRef.current.startRotation + dx * 0.5)
    }
    const handleRightMouseUp = () => {
      if (startRef.current) startRef.current.rotating = false
    }
    window.addEventListener('mousemove', handleRightMouseMove)
    window.addEventListener('mouseup', handleRightMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleRightMouseMove)
      window.removeEventListener('mouseup', handleRightMouseUp)
    }
  }, [])

  return (
        <div
        onMouseDown={(e) => {
            if (e.button === 0) handleMouseDown(e)
            if (e.button === 2) handleRightMouseDown(e)
        }}
        onDoubleClick={onRemove}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
      title="drag · scroll to resize · right-drag to rotate · double click to remove"
      style={{
        position: 'absolute',
        left: pos.x, top: pos.y,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 20,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src={sticker.src}
        alt=""
        style={{
          height: `${size}px`,
          width: 'auto',
          display: 'block',
          filter: dragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
        }}
      />
    </div>
  )
}

export default DraggableSticker