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
import { signinSchema } from "@/schema/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NextLink from "next/link";

const SignIn = () => {
  const signupForm = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/sign-in`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      // switch (userdetail.data.role) {
      //   case "admin":
      //     router.push("/d");
      //     break;
      //   default:
      //     router.push("/u");
      //     break;
      // }
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
        <CardTitle>Login To Your Account</CardTitle>
        <CardDescription>Please login.</CardDescription>
      </CardHeader>
      <Form {...signupForm}>
        <form action="" onSubmit={signupForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <NextLink
                      href={"/resest-password"}
                      className="hover:text-primary hover:underline"
                    >
                      forgot password
                    </NextLink>
                  </div>
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
              disabled={signupForm.formState.isSubmitting}
              isLoading={signupForm.formState.isSubmitting}
              loadingText="loading..."
            >
              Sign in
            </Button>
          </CardFooter>
          <CardFooter className="justify-center flex-col">
            <p>
              Not Have an account{" "}
              <NextLink
                href={"/sign-up"}
                className="hover:text-primary hover:underline"
              >
                sign up
              </NextLink>{" "}
              now.
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignIn;
