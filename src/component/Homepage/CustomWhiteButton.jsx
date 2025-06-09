import { Loader } from 'lucide-react'
import React from 'react'

const CustomWhiteButton = ({
  children,
  className = '',
  icon: Icon,
  loading,
  parentClassName = '',
  styleinline = {},
  ...props
}) => {
  return (
    <div
      className={`customWhiteButtonDiv ${parentClassName}`}
      style={{ ...styleinline }}
    >
      <button
        className={`flex items-center justify-center gap-2 px-3 rounded-[10px] transition duration-300 cursor-pointer customWhiteBtnColor w-full ${className}`}
        {...props}
      >
        {loading ? (
          <Loader className='animate-spin w-5 h-5' />
        ) : (
          Icon && <Icon className='w-5 h-5' />
        )}
        {children}
      </button>
    </div>
  )
}

export default React.memo(CustomWhiteButton)
