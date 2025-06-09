import React, { useMemo } from 'react'

const CommonHeadingSecond = ({ heading, content }) => {
  const renderedContent = useMemo(() => {
    if (!Array.isArray(content)) return null
    return content.map((paragraph, index) => (
      <p key={index} className='commonQuesPSecond mb-0'>
        {paragraph}
      </p>
    ))
  }, [content])

  return (
    <div className='flex flex-col gap-3 md:gap-5'>
      {heading && <h2 className='commonQuesH2Second'>{heading}</h2>}
      <div className='flex flex-col gap-7 md:gap-10'>{renderedContent}</div>
    </div>
  )
}

export default React.memo(CommonHeadingSecond)
