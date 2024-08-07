import React from 'react'
import ComponentTitle from '../common/ComponentTitle'
import EventCard from '../events/EventCard'
import { t } from 'i18next'

const RoomCompletedEvents = ({completedEvents, roomUser}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <ComponentTitle text={t("completedEvents")} />
      <div className="w-1/2">
        {completedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            roomUser={roomUser}
          />
        ))}
      </div>
    </div>
  )
}

export default RoomCompletedEvents