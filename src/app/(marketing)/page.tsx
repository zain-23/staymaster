import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const MarketingHomePage = () => {
  return (
    <section className="h-[800px] flex justify-center items-center">
      <div className="max-w-5xl flex flex-col gap-y-4 items-center mx-auto">
        <h1 className="text-5xl leading-tight text-center">Welcome to <span className="bg-primary">StayMaster</span> - Experience Luxury Like Never Before</h1>
        <p className="text-center text-muted-foreground">
          Discover a world of elegance and comfort at Staymaster, where
          exceptional service meets exquisite design. Our hotel offers a serene
          retreat from the hustle and bustle, with luxurious rooms, top-notch
          amenities, and personalized experiences tailored just for you. Whether
          you're here for business, leisure, or a special occasion, we ensure
          every moment of your stay is nothing short of perfect. Book your stay
          with us and embark on an unforgettable journey.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
          })}
          href={"/sign-in"}
        >
          Book now
        </Link>
      </div>
    </section>
  );
};

export default MarketingHomePage;
