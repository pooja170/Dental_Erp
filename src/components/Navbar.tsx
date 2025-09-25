import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Button from "./Button"; // Assuming Button component is in the same directory

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left side - Logo / Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-gray-800">
            Excel Report Writer
          </h1>
        </div>

        {/* Right side - Profile / Auth */}
        <div className="flex items-center space-x-3">
          {status === "authenticated" && (
            <>
              <span className="text-gray-600 text-sm">{session.user?.name || "User"}</span>
              <img
                src={session.user?.image || "https://i.pravatar.cc/40"}
                alt="Profile"
                className="h-9 w-9 rounded-full border"
              />
              <Button onClick={() => signOut({ callbackUrl: '/' })} variant="secondary">
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;