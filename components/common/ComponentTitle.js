import Image from 'next/image'
import React from 'react'

const ComponentTitle = ({text, icon}) => {
  return (
    <div className='flex justify-start items-center'>
    {icon && <Image className="mr-1" src={icon} width={20} height={20} alt='door' />}
    <h1 className='font-light text-sm text-text uppercase my-2'>{text}</h1>
    </div>
  )
}

export default ComponentTitle