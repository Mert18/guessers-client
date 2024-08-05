import React from 'react'

const ComponentWithHeader = ({name, children}) => {
  return (
    <div className='flex flex-col justify-center items-start my-2 text-text'>
      <span className="font-bold text-xs">{name}</span>
      {children}
    </div>
  )
}

export default ComponentWithHeader