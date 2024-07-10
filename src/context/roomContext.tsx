"use client";
import { useToast } from "@/components/ui/use-toast";
import { roomSchema } from "@/schema/room.schema";
import { Room } from "@/types/types";
import axios, { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

interface MyContextState {
  onSubmit: (data: z.infer<typeof roomSchema>) => Promise<void>;
  rooms: Room[];
}

const MyContext = createContext<MyContextState | undefined>(undefined);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState<Room[] | []>([]);

  // Add Room function
  const onSubmit = async (data: z.infer<typeof roomSchema>) => {
    try {
      const response = await axios.post("/api/rooms/add-room", {
        roomNumber: data.roomNumber,
        roomType: data.roomType,
        price: data.price,
        status: data.status,
      });
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
      const rooms = await axios.get("/api/rooms/get-rooms");
      setRooms(rooms.data.data);
    };
    getAllRooms();
  }, [roomId]);
  return (
    <MyContext.Provider value={{ onSubmit, rooms }}>
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
