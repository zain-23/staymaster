"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-500">{error.message}</CardTitle>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Error;
