"use client"
import { listSelfGuessPapers } from "@/api/guesspaper";
import { listPublicRooms, listSelfRooms } from "@/api/room";
import PublicRoomsList from "@/components/home/PublicRoomsList";
import SelfGuessPapersList from "@/components/home/SelfGuessPapersList";
import SelfRoomsList from "@/components/home/SelfRoomsList";
import { IPaging } from "@/types/IRequest.model";
import { IRoomUser } from "@/types/IRoom.model";
import { useEffect, useState } from "react";

const Home = () => {
  const [selfRooms, setSelfRooms] = useState<IRoomUser[]>([]);
  const [selfRoomsPaging, setSelfRoomsPaging] = useState<IPaging>({ page: 0, size: 5, totalPages: 0, totalElements: 0 });
  const [selfRoomsLoading, setSelfRoomsLoading] = useState<boolean>(false);

  const [publicRooms, setPublicRooms] = useState<IRoomUser[]>([]);
  const [publicRoomsPaging, setPublicRoomsPaging] = useState<IPaging>({ page: 0, size: 5, totalPages: 0, totalElements: 0 });
  const [publicRoomsLoading, setPublicRoomsLoading] = useState<boolean>(false);

  const [selfGuessPapers, setSelfGuessPapers] = useState<IRoomUser[]>([]);
  const [selfGuessPapersLoading, setSelfGuessPapersLoading] = useState<boolean>(false);
  const [selfGuessPapersPaging, setSelfGuessPapersPaging] = useState<IPaging>({ page: 0, size: 5, totalPages: 0, totalElements: 0 });

  const fetchSelfRooms = async () => {
    setSelfRoomsLoading(true);
    try {
      const response = await listSelfRooms(selfRoomsPaging);
      setSelfRooms(response.data.content);
      setSelfRoomsPaging((prevState) => ({
        ...prevState,
        totalPages: response.data.page.totalPages,
        totalElements: response.data.page.totalElements,
      }));
    } finally {
      setSelfRoomsLoading(false);
    }
  };
  
  const fetchPublicRooms = async () => {
    setPublicRoomsLoading(true);
    try {
      const response = await listPublicRooms(publicRoomsPaging);
      if(response.data.rooms?.content === undefined) return;
      setPublicRooms(response.data.rooms?.content);
      setPublicRoomsPaging({
        page: response.data.page.number,
        size: response.data.page.size,
        totalPages: response.data.page.totalPages,
        totalElements: response.data.page.totalElements,
      });
    } finally {
      setPublicRoomsLoading(false);
    }
  }

  const fetchSelfGuessPapers = async () => {
    setSelfGuessPapersLoading(true);
    try {
      const response = await listSelfGuessPapers(selfGuessPapersPaging);
      if (response.data.content === undefined) return;
      setSelfGuessPapers(response.data.content);

    } finally {
      setSelfGuessPapersLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicRooms();
    fetchSelfRooms();
    fetchSelfGuessPapers();
  }, [])

  useEffect(() => {
    fetchSelfRooms();
  }, [selfRoomsPaging.page])

  useEffect(() => {
    fetchPublicRooms();
  }, [publicRoomsPaging.page])

  useEffect(() => {
    fetchSelfRooms();
  }, [selfGuessPapersPaging.page])

  return (
    <div className="w-full">
      <SelfRoomsList selfRooms={selfRooms} paging={selfRoomsPaging} setPaging={setSelfRoomsPaging} loading={selfRoomsLoading}  />

      <PublicRoomsList publicRooms={publicRooms} paging={publicRoomsPaging} setPaging={setPublicRoomsPaging} loading={publicRoomsLoading} />

      <SelfGuessPapersList selfGuessPapers={selfGuessPapers} paging={selfGuessPapersPaging} setPaging={setSelfGuessPapersPaging} loading={selfGuessPapersLoading} />
    </div>
  );
};

export default Home;
