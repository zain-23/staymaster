"use client";
import { useToast } from "@/components/ui/use-toast";
import { roomSchema } from "@/schema/room.schema";
import { All_Room, Room, Room_Stats } from "@/types/types";
import axios, { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

interface MyContextState {
  onSubmit: (data: z.infer<typeof roomSchema>) => Promise<void>;
  rooms: All_Room | undefined;
  roomStats: Room_Stats[];
  availableRoom: Room[];
  nextPage: () => void;
  prevPage: () => void;
}

const MyContext = createContext<MyContextState | undefined>(undefined);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState<All_Room | undefined>();
  const [roomStats, setRoomStats] = useState<Room_Stats[] | []>([]);
  const [availableRoom, setAvailableRoom] = useState<Room[] | []>([]);
  const [roomPage, setRoomPage] = useState<number>(1);

  // Go to next page
  const nextPage = () => {
    if (rooms?.hasNextPage) {
      setRoomPage((prev) => prev + 1);
    }
  };
  // Go to previous page
  const prevPage = () => {
    if (rooms?.hasPrevPage) {
      setRoomPage((prev) => prev - 1);
    }
  };

  // Add Room function
  const onSubmit = async (data: z.infer<typeof roomSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/add-room`,
        {
          roomNumber: data.roomNumber,
          roomType: data.roomType,
          price: data.price,
          status: data.status,
        },
        {
          withCredentials: true,
        }
      );
      setRoomId(response.data.data._id);
      toast({
        title: response.data.message,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };

  // Fetch all rooms
  useEffect(() => {
    const getRoomStats = async () => {
      try {
        const rooms = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/get-rooms-stats`,
          {
            withCredentials: true,
          }
        );
        setRoomStats(rooms.data.data);
      } catch (error) {
        toast({
          title: "Something went wrong while fetching room stats",
          variant: "destructive",
        });
      }
    };
    const getAvailableRoom = async () => {
      try {
        const rooms = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/get-available-rooms`,
          {
            withCredentials: true,
          }
        );
        setAvailableRoom(rooms.data.data);
      } catch (error) {
        toast({
          title: "Something went wrong while fetching available room",
          variant: "destructive",
        });
      }
    };
    getRoomStats();
    getAvailableRoom();
  }, []);

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const rooms = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/get-all-rooms`,
          {
            withCredentials: true,
            params: {
              page: roomPage,
            },
          }
        );
        setRooms(rooms.data.data);
      } catch (error) {
        toast({
          title: "Something went wrong while fetching all room",
          variant: "destructive",
        });
      }
    };
    getAllRooms();
  }, [roomId, roomPage]);
  return (
    <MyContext.Provider
      value={{ onSubmit, rooms, roomStats, availableRoom, nextPage, prevPage }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyRoomContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("Something went wrong in room context api");
  }
  return context;
};

export { RoomContextProvider, useMyRoomContext };
