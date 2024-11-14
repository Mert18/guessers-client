import React from 'react'

const ComponentTitle = ({text, icon}) => {
  return (
    <div className='flex justify-start items-center'>
    <h1 className='text-xs text-text uppercase my-2 font-bold'>{text}</h1>
    </div>
  )
}

export default ComponentTitle