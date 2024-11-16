import React from 'react'

interface IComponentWithHeaderProps {
  name: string;
  children: React.ReactNode;
}

const ComponentWithHeader = ({name, children}: IComponentWithHeaderProps) => {
  return (
    <div className='flex flex-col justify-center items-start my-2 text-text w-full'>
      <span className="font-bold text-2xs">{name}</span>
      {children}
    </div>
  )
}

export default ComponentWithHeader