"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyRoomContext } from "@/context/roomContext";
import { DollarSign, Users } from "lucide-react";
import React from "react";

const RoomStats = () => {
  const { roomStats } = useMyRoomContext();
  return (
    <>
      {/* <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
        </CardContent>
      </Card> */}
      {roomStats.map((stats, idx) => (
        <Card x-chunk={`dashboard-01-chunk-${idx}`} key={idx}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stats._id}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.count} Rooms</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default RoomStats;
