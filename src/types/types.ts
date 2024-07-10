export type Room_Status = {
  _id: string;
  status: string;
};
export type Room_Type = {
  _id: string;
  roomType: string;
  description: string;
};
export type Room = {
  _id: string;
  roomNumber: number;
  price: number;
  roomCategory: Room_Type;
  roomStatus: Room_Status;
  createdAt: string;
};
export type Room_Stats = {
  _id: string;
  count: number;
};
