import { Activity, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddRoom from "./addRoom";
import ShowRoom from "./showRoom";
import { Room_Stats } from "@/types/types";

const dynamic = "force-dynamic";

const Rooms = async () => {
  const response = await fetch(
    "https://staymaster.vercel.app/api/rooms/get-rooms-stats",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const {
    data,
  }: {
    data: Room_Stats[];
  } = await response.json();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        {data.map((stats, idx) => (
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
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ShowRoom />
        <AddRoom />
      </div>
    </>
  );
};

export default Rooms;
