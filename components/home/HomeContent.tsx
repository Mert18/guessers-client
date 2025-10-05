"use client";
import { useEffect, useState } from "react";
import { listSelfGuessPapers } from "@/api/guesspaper";
import { listSelfRooms, listPublicRooms } from "@/api/room";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import { IRoomUser, IRoomBasic } from "@/types/IRoom.model";
import PublicRoomsList from "./PublicRoomsList";
import SelfGuessPapersList from "./SelfGuessPapersList";
import SelfRoomsList from "./SelfRoomsList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InvitesList from "./InvitesList";
import PublicGames from "./PublicGames";

const HomeContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selfRooms, setSelfRooms] = useState<IRoomUser[]>([]);
  const [selfRoomsPaging, setSelfRoomsPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });
  const [selfRoomsLoading, setSelfRoomsLoading] = useState<boolean>(false);

  const [publicRooms, setPublicRooms] = useState<IRoomBasic[]>([]);
  const [publicRoomsPaging, setPublicRoomsPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });
  const [publicRoomsLoading, setPublicRoomsLoading] = useState<boolean>(false);

  const [selfGuessPapers, setSelfGuessPapers] = useState<IGuessPaper[]>([]);
  const [selfGuessPapersLoading, setSelfGuessPapersLoading] =
    useState<boolean>(false);
  const [selfGuessPapersPaging, setSelfGuessPapersPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const [invitesVisible, setInvitesVisible] = useState<boolean>(false);

  const fetchSelfRooms = async () => {
    setSelfRoomsLoading(true);
    try {
      const response = await listSelfRooms(publicRoomsPaging);
      if (!response.data.content || response.data.content === undefined) return;
      if (selfRooms.length !== 0) return;
      setSelfRooms([...selfRooms, ...response.data.content]);
      setSelfRoomsPaging((prevState) => ({
        ...prevState,
        totalPages: response?.data?.page?.totalPages,
        totalElements: response?.data?.page?.totalElements,
      }));
    } finally {
      setSelfRoomsLoading(false);
    }
  };

  const fetchPublicRooms = async () => {
    setPublicRoomsLoading(true);
    try {
      const response = await listPublicRooms(publicRoomsPaging);
      if (!response.data.rooms || response.data.rooms === undefined) return;
      if (publicRooms.length !== 0) return;
      setPublicRooms([...publicRooms, ...response.data.rooms.content]);
      setPublicRoomsPaging({
        page: response.data.rooms.page.number,
        size: response.data.rooms.page.size,
        totalPages: response.data.rooms.page.totalPages,
        totalElements: response.data.rooms.page.totalElements,
      });
    } finally {
      setPublicRoomsLoading(false);
    }
  };

  const fetchSelfGuessPapers = async () => {
    setSelfGuessPapersLoading(true);
    try {
      const response = await listSelfGuessPapers(selfGuessPapersPaging);
      if (response.data.content === undefined) return;
      if (selfGuessPapers.length !== 0) return;
      setSelfGuessPapers([...selfGuessPapers, ...response.data.content]);
      setSelfGuessPapersPaging({
        page: response.data.page.number,
        size: response.data.page.size,
        totalPages: response.data.page.totalPages,
        totalElements: response.data.page.totalElements,
      });
    } finally {
      setSelfGuessPapersLoading(false);
    }
  };

  useEffect(() => {
    if (status != "loading" && (!session || status === "unauthenticated")) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    if (!session || status === "unauthenticated") {
      return;
    }
    fetchPublicRooms();
    fetchSelfRooms();
    fetchSelfGuessPapers();
  }, [session]);

  useEffect(() => {
    if (!session || status === "unauthenticated") {
      return;
    }
    fetchSelfRooms();
  }, [selfRoomsPaging.page]);

  useEffect(() => {
    if (!session || status === "unauthenticated") {
      return;
    }
    fetchPublicRooms();
  }, [publicRoomsPaging.page]);

  useEffect(() => {
    if (!session || status === "unauthenticated") {
      return;
    }
    fetchSelfRooms();
  }, [selfGuessPapersPaging.page]);
  return (
    <div className="w-full">
      <div className="text-gray-400 mt-4">Play public games</div>
      <PublicGames />

      <div className="text-gray-400 mt-4">
        or create a room to guess things with your friends.
      </div>
      <SelfRoomsList
        selfRooms={selfRooms}
        paging={selfRoomsPaging}
        setPaging={setSelfRoomsPaging}
        loading={selfRoomsLoading}
      />

      {invitesVisible && <InvitesList setInvitesVisible={setInvitesVisible} />}

      <PublicRoomsList
        publicRooms={publicRooms}
        paging={publicRoomsPaging}
        setPaging={setPublicRoomsPaging}
        loading={publicRoomsLoading}
      />

      <SelfGuessPapersList
        selfGuessPapers={selfGuessPapers}
        paging={selfGuessPapersPaging}
        setPaging={setSelfGuessPapersPaging}
        loading={selfGuessPapersLoading}
      />
    </div>
  );
};

export default HomeContent;
