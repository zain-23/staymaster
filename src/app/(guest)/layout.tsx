import LogoutScreen from "@/components/logoutScreen";
import ProfileMenu from "@/components/profileMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserContextProvider } from "@/context/userContext";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <LogoutScreen />
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/u/rooms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Rooms
            </Link>
            <Link
              href="/u/my-bookings"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              My Bookings
            </Link>
            <Link
              href="/application"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Career
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <ProfileMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </UserContextProvider>
  );
};

export default GuestLayout;
