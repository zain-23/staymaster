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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { roomBookingSchema } from "@/schema/roombooking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BookingForm = ({ roomId }: { roomId: string }) => {
  const [countDays, setCountDays] = useState<number>(0);
  const bookingForm = useForm<z.infer<typeof roomBookingSchema>>({
    resolver: zodResolver(roomBookingSchema),
    defaultValues: {
      checkedInDate: "",
      checkedOutDate: "",
      roomId: roomId,
      days: countDays,
    },
  });
  const router = useRouter();
  const checkedInDate = bookingForm.watch("checkedInDate");
  const checkedOutDate = bookingForm.watch("checkedOutDate");
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof roomBookingSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/booked-room`,
        {
          roomId,
          checkedOut: values.checkedOutDate,
          checkedIn: values.checkedInDate,
          days: countDays,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: response.data.message,
        variant: "default",
      });
      router.push(response.data.data);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    const calculateDays = () => {
      const inDate = new Date(checkedInDate);
      const outDate = new Date(checkedOutDate);

      if (inDate < outDate) {
        const difference = Number(outDate.getDate()) - Number(inDate.getDate());
        setCountDays(difference);
      }
    };
    calculateDays();
  }, [checkedInDate, checkedOutDate]);
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Booking Form</CardTitle>
      </CardHeader>
      <Form {...bookingForm}>
        <form onSubmit={bookingForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={bookingForm.control}
              name="checkedInDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Checked In Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      className="p-2 text-lg"
                      // value={field.value ? field.value.slice(0, 16) : ""}
                      onChange={(e) => {
                        const dateTime = new Date(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={bookingForm.control}
              name="checkedOutDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Checked Out Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      className="p-2 text-lg"
                      // value={field.value ? field.value.slice(0, 16) : ""}
                      onChange={(e) => {
                        const dateTime = new Date(e.target.value);
                        // console.log(dateTime, e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={bookingForm.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many days you stayed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="p-2 text-lg"
                      disabled
                      value={countDays}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={bookingForm.formState.isSubmitting}
              isLoading={bookingForm.formState.isSubmitting}
              loadingText="Loading..."
            >
              Booked
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default BookingForm;
