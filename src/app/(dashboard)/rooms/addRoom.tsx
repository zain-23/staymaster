"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useMyRoomContext } from "@/context/roomContext";
import { roomSchema } from "@/schema/room.schema";
import { Room_Status, Room_Type } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddRoom = () => {
  const [roomType, setRoomType] = useState<Room_Type[] | null>();
  const { onSubmit } = useMyRoomContext();
  const { toast } = useToast();

  const roomForm = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomType: "",
      status: "",
    },
  });

  useEffect(() => {
    fetchRoomCategory();
  }, []);

  const fetchRoomCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/get-rooms-category`,
        {
          withCredentials: true,
        }
      );
      setRoomType(data.data);
    } catch (error) {
      toast({
        title: "Error fetching room type",
        variant: "destructive",
      });
    }
  };

  const status = [
    "Available",
    "Booked",
    "Pending",
    "Confirmed",
    "Checked In",
    "Checked Out",
    "Cancelled",
    "Maitenance",
  ] as const;
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Add Rooms</CardTitle>
      </CardHeader>
      <Form {...roomForm}>
        <form action="" onSubmit={roomForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={roomForm.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="room number"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roomForm.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomType?.map((t: Room_Type, idx) => (
                        <SelectItem key={idx} value={t._id}>
                          {t.roomType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roomForm.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((s, idx) => (
                        <SelectItem key={idx} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={roomForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="$1000.00"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>This is your private.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={roomForm.formState.isSubmitting}
              isLoading={roomForm.formState.isSubmitting}
              loadingText="loading..."
            >
              Add
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddRoom;
