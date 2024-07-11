"use client";
import { useUserContext } from "@/context/userContext";
import { Loader2 } from "lucide-react";

const LogoutScreen = () => {
  const { logoutLoading } = useUserContext();
  return (
    <>
      {logoutLoading ? (
        <div className="w-full h-screen bg-black/50 absolute top-0 left-0 z-10 flex justify-center items-center text-3xl gap-2">
          <Loader2 className="w-12 h-12 animate-spin" /> Logging Out
        </div>
      ) : null}
    </>
  );
};

export default LogoutScreen;
