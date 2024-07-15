import { notFound } from "next/navigation";
import React from "react";
import BookingForm from "./bookingForm";

interface Props {
  params: {
    id: string;
  };
}

const BookedRoom = ({ params }: Props) => {
  const { id } = params;
  if (!id) notFound();
  return (
    <div>
      <BookingForm roomId={id}/>
    </div>
  );
};

export default BookedRoom;
