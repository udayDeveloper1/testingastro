import { memo, useEffect, useState } from 'react'
import commonBanner from '/banner/defaultBanner.svg'

function CommonBanner({ backgroundImage = '', text, highlight }) {
  const [difference, setDifference] = useState(0)

  // Function to calculate margin and padding difference
  const calculateDifference = () => {
    const aa = document.querySelector('.customBanner')
    const bb = document.querySelector('.customBanner .container')
    if (aa && bb) {
      const aaStyles = window.getComputedStyle(aa)
      const bbStyles = window.getComputedStyle(bb)
      const aaMarginLeft = parseInt(aaStyles.marginLeft, 10)
      const bbMarginLeft = parseInt(bbStyles.marginLeft, 10)
      const aaPaddingLeft = parseInt(aaStyles.paddingLeft, 10)
      const bbPaddingLeft = parseInt(bbStyles.paddingLeft, 10)
      const marginLeftDifference = aaMarginLeft - bbMarginLeft
      const paddingLeftDifference = aaPaddingLeft - bbPaddingLeft
      setDifference(marginLeftDifference + paddingLeftDifference)
    }
  }

  useEffect(() => {
    calculateDifference()
    window.addEventListener('resize', calculateDifference)
    return () => {
      window.removeEventListener('resize', calculateDifference)
    }
  }, [])

  return (
    <div className='w-full customBanner min-h-[100px] flex items-center justify-center '
      style={{
        backgroundImage: `url(${commonBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='container h-full flex items-center justify-center'>
        <h2 className='newBannerH2 justify-center flex mb-0 new_body_color text-center '>
          {text} {highlight} <span className='commonBannerSpan'></span>
        </h2>
      </div>
    </div>
  )
}

export default memo(CommonBanner)
