import React from 'react'
import PrimaryButton from './common/button/PrimaryButton'

const Modal = ({title, handleCloseModal, children}) => {
  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 border border-background3 w-1/3 shadow-lg rounded-md bg-background">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-text">{title}</h3>
          <div className="mt-2 px-7 py-3">
            {children}
          </div>
          <div className="flex justify-center mt-4">
            <PrimaryButton
              text="Close"
              onClick={() => handleCloseModal()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal