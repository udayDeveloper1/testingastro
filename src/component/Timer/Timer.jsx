
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const CountdownTimer = forwardRef(({
  minutes,
  seconds,
  setTime,
  isSocketConnected,
  freeChatComplete,
  is_freechat_count,
  onApiCall,  // Add the callback prop
}, ref) => {
  const timerRef = useRef(null)
  const isPaused = useRef(false)
  const isCompleted = useRef(false)
  useImperativeHandle(ref, () => ({
    pauseTimer: () => {
      isPaused.current = true
    },
    resumeTimer: () => {
      isPaused.current = false
    },
  }))

  useEffect(() => {
    if (!isSocketConnected) {
      clearInterval(timerRef.current)
      return
    }
    isCompleted.current = false

    timerRef.current = setInterval(() => {
      if (isPaused.current) return

      if (is_freechat_count > 0) {
        setTime(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            onApiCall()
            return { minutes: prev.minutes - 1, seconds: 59 }
          } else {
            clearInterval(timerRef.current)
            if (!isCompleted.current) {
              isCompleted.current = true 
              freeChatComplete()
            }
            return prev
          }
        })
      } else {
        setTime(prev => {
          const newSeconds = prev.seconds + 1
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60)
          if (prev.seconds === 1) onApiCall()
          return {
            minutes: newMinutes,
            seconds: newSeconds % 60
          }
        })
      }
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [isSocketConnected, is_freechat_count, onApiCall, setTime, freeChatComplete])

  const formatTime = val => (val < 10 ? `0${val}` : val)

  return (
    <p className='font-semibold mb-0 text-end'>
      {formatTime(minutes)}:{formatTime(seconds)}
    </p>
  )
})
export default React.memo(CountdownTimer)
