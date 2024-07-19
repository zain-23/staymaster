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
import { useToast } from "@/components/ui/use-toast";
import { SignupSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUp = () => {
  const signupForm = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/sign-up`,
        data
      );
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Please create your account.</CardDescription>
      </CardHeader>
      <Form {...signupForm}>
        <form action="" onSubmit={signupForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@profle.xyz" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is your private.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              size={"lg"}
              isLoading={signupForm.formState.isSubmitting}
              loadingText="Loading..."
              disabled={signupForm.formState.isSubmitting}
            >
              Sign up
            </Button>
          </CardFooter>
          <CardFooter className="justify-center">
            <p>
              Have an account{" "}
              <NextLink
                href={"/sign-in"}
                className="hover:text-primary hover:underline"
              >
                sign in
              </NextLink>{" "}
              now.
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignUp;
