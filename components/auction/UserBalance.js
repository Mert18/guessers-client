import React from 'react'

const UserBalance = ({userBalance}) => {
  return (
    <div className="p-2">
      <div className="flex flex-col justify-center items-center p-2">
        <p className="text-xs">Your Balance</p>
        <h2 className="text-2xl">${Math.round(userBalance.balance)}</h2>
      </div>
    </div>
  )
}

export default UserBalance