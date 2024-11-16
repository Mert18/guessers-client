"use client"
import { listSelfGuessPapers } from "@/api/guesspaper";
import { listPublicRooms, listSelfRooms } from "@/api/room";
import PublicRoomsList from "@/components/home/PublicRoomsList";
import SelfGuessPapersList from "@/components/home/SelfGuessPapersList";
import SelfRoomsList from "@/components/home/SelfRoomsList";
import { useEffect, useState } from "react";

const Home = () => {
  const [selfRooms, setSelfRooms] = useState([]);
  const [selfRoomsPaging, setSelfRoomsPaging] = useState({ page: 0, size: 5 });
  const [selfRoomsLoading, setSelfRoomsLoading] = useState(false);

  const [publicRooms, setPublicRooms] = useState([]);
  const [publicRoomsPaging, setPublicRoomsPaging] = useState({ page: 0, size: 5, totalPages: 0, totalElements: 0 });
  const [publicRoomsLoading, setPublicRoomsLoading] = useState(false);

  const [selfGuessPapers, setSelfGuessPapers] = useState([]);
  const [selfGuessPapersLoading, setSelfGuessPapersLoading] = useState(false);
  const [selfGuessPapersPaging, setSelfGuessPapersPaging] = useState({ page: 0, size: 5 });

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
    } catch (error) {
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
    } catch (error) {
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

    } catch (error) {
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
