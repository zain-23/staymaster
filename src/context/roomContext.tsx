"use client";
import { useToast } from "@/components/ui/use-toast";
import { roomSchema } from "@/schema/room.schema";
import { Room, Room_Stats } from "@/types/types";
import axios, { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

interface MyContextState {
  onSubmit: (data: z.infer<typeof roomSchema>) => Promise<void>;
  rooms: Room[];
  roomStats: Room_Stats[];
  availableRoom: Room[];
}

const MyContext = createContext<MyContextState | undefined>(undefined);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState<Room[] | []>([]);
  const [roomStats, setRoomStats] = useState<Room_Stats[] | []>([]);
  const [availableRoom, setAvailableRoom] = useState<Room[] | []>([]);

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
    const getAllRooms = async () => {
      try {
        const rooms = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/get-all-rooms`,
          {
            withCredentials: true,
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
      console.log("run");
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
    getAllRooms();
    getRoomStats();
    getAvailableRoom();
  }, [roomId]);
  return (
    <MyContext.Provider value={{ onSubmit, rooms, roomStats, availableRoom }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyRoomContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("Something went wrong in context api");
  }
  return context;
};

export { RoomContextProvider, useMyRoomContext };
