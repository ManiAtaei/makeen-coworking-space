import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
  }

export default function Container ({children} : ContainerProps) {
  return (
    <div className='mx-auto max-w-[1440px] px-4 lg:px-20 '>
        {children}
    </div>
  )
}
