"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Room } from "@/types/types";
import { formateDate, formatePrice } from "@/lib/utils";
import { useMyRoomContext } from "@/context/roomContext";

const ShowRoom = () => {
  const { rooms } = useMyRoomContext();
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Rooms</CardTitle>
          <CardDescription>Recent rooms from your store.</CardDescription>
        </div>
        <Link
          href="#"
          className={buttonVariants({
            variant: "ghost",
            className: "ml-auto gap-1",
          })}
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((r: Room, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{r.roomCategory.roomType}</TableCell>
                <TableCell>{r.roomNumber}</TableCell>
                <TableCell>{r.roomStatus.status}</TableCell>
                <TableCell>{formateDate(r.createdAt)}</TableCell>
                <TableCell className="text-right">
                  {formatePrice(r.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShowRoom;
