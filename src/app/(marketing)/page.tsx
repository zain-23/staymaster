import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const MarketingHomePage = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to StayMaster - Experience Luxury Like Never Before
          </CardTitle>
          <CardDescription>
            Discover a world of elegance and comfort at Staymaster, where
            exceptional service meets exquisite design. Our hotel offers a
            serene retreat from the hustle and bustle, with luxurious rooms,
            top-notch amenities, and personalized experiences tailored just for
            you. Whether you're here for business, leisure, or a special
            occasion, we ensure every moment of your stay is nothing short of
            perfect. Book your stay with us and embark on an unforgettable
            journey.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            className={buttonVariants({
              size: "lg",
            })}
            href={"/sign-in"}
          >
            Book now
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default MarketingHomePage;
