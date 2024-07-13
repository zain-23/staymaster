import AddRoom from "./addRoom";
import RoomStats from "./roomStats";
import ShowRoom from "./showRoom";

const Rooms = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <RoomStats />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ShowRoom />
        <AddRoom />
      </div>
    </>
  );
};

export default Rooms;
