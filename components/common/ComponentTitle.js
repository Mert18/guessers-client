import Image from 'next/image'
import React from 'react'

const ComponentTitle = ({text, icon}) => {
  return (
    <div className='flex justify-start items-center'>
    {icon && <Image className="mr-1" src={icon} width={15} height={15} alt='door' />}
    <h1 className='text-xs text-text uppercase my-2 font-bold'>{text}</h1>
    </div>
  )
}

export default ComponentTitle