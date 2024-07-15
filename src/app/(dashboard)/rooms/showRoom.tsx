"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyRoomContext } from "@/context/roomContext";
import { formateDate, formatePrice } from "@/lib/utils";
import { Room } from "@/types/types";

const ShowRoom = () => {
  const { rooms, nextPage, prevPage } = useMyRoomContext();
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="grid gap-2">
          <CardTitle>Rooms</CardTitle>
          <CardDescription>Recent rooms from your store.</CardDescription>
        </div>
        <Input className="w-72 h-10" placeholder="Enter your room id" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms?.docs.map((r: Room, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger>{r.roomCategory.roomType}</SheetTrigger>
                    <SheetContent className="w-full">
                      <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </TableCell>
                <TableCell>{r.roomNumber}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>{formateDate(r.createdAt)}</TableCell>
                <TableCell className="text-right">
                  {formatePrice(r.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="space-x-2">
          <Button disabled={!rooms?.hasPrevPage} onClick={prevPage}>Previous</Button>
          <Button disabled={!rooms?.hasNextPage} onClick={nextPage}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShowRoom;
