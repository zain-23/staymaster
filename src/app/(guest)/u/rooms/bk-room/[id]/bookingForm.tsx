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
import { useForm } from "react-hook-form";
import { z } from "zod";

const BookingForm = ({ roomId }: { roomId: string }) => {
  const bookingForm = useForm<z.infer<typeof roomBookingSchema>>({
    resolver: zodResolver(roomBookingSchema),
    defaultValues: {
      checkedInDate: "",
      checkedOutDate: "",
      roomId: roomId,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof roomBookingSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/booked-room`,
        {
          roomId,
          checkedOut: values.checkedOutDate,
          checkedIn: values.checkedInDate,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: response.data.message,
        variant: "default",
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
                      value={field.value ? field.value.slice(0, 16) : ""}
                      onChange={(e) => {
                        const dateTime = new Date(e.target.value).toISOString();
                        field.onChange(dateTime);
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
                      value={field.value ? field.value.slice(0, 16) : ""}
                      onChange={(e) => {
                        const dateTime = new Date(e.target.value).toISOString();
                        field.onChange(dateTime);
                      }}
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
