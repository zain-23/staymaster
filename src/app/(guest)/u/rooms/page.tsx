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
import { formatePrice } from "@/lib/utils";
import { Room } from "@/types/types";
import React from "react";

const dynamic = "force-dynamic";

const AvailableRoom = async () => {
  const response = await fetch(
    "http://localhost:3000/api/rooms/get-available-rooms",
    {
      cache: "no-cache",
    }
  );
  const {
    data,
  }: {
    data: Room[];
  } = await response.json();
  return (
    <div className="grid grid-cols-4 gap-6 items-start">
      {data.map((r, idx) => (
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
