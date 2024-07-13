"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyRoomContext } from "@/context/roomContext";
import { formatePrice } from "@/lib/utils";
import { Room } from "@/types/types";
import React from "react";

const AvailableRoom = () => {
  const { availableRoom } = useMyRoomContext();
  return (
    <div className="grid grid-cols-4 gap-6 items-start">
      {availableRoom.map((r, idx) => (
        <Card key={idx}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{r.roomCategory.roomType}</CardTitle>
              <Badge className="bg-green-600 hover:bg-green-700">
                {r.roomStatus.status}
              </Badge>
            </div>
            <CardDescription>{r.roomCategory.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-xl">{formatePrice(r.price)}</CardContent>
          <CardFooter>
            <Button>Book now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AvailableRoom;
