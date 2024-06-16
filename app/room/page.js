'use client'
import { getUserRooms } from '@/api/room';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const NoRoom = () => {
  const router = useRouter();

  useEffect(() => {
    getUserRooms().then((res) => {
      if(res.data.rooms.length > 0) {
        router.push("/room/" + res.data.rooms[0].id);
      }
    });
  }, [router]);

  return (
    <div>Please select a Room.</div>
  )
}

export default NoRoom