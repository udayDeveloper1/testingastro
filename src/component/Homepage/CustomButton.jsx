import { Loader } from 'lucide-react'; // Importing Lucide Icons
import React from 'react';

const CustomButton = ({
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
      className={`customButtonDiv ${parentClassName} `}
      style={{ ...styleinline }}
    >
      <button
        className={`${className} px-3   rounded-[10px] transition duration-300 cursor-pointer customBtnColor w-full`}
        {...props}
      >
        {/* shadow-[0_3px_8px_rgba(0,0,0,0.24)] */}
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

export default React.memo(CustomButton)
