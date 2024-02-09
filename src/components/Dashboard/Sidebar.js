"use client";

import { Button } from "../ui/button";
import { useContext } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Sidebar({ children }) {
  const auth = useContext(AuthContext);
  const { userId } = useParams();
  const buttons = [
    {
      text: "Home",
      to: `/${userId}/dashboard`,
    },
    {
      text: auth.isTutor ? "Make Courses" : "Courses",
      to: auth.isTutor ? `/${userId}/dashboard/create-course` : "",
    },
    {
      text: "My Courses",
      to: "",
    },
    {
      text: "Profile",
      to: "",
    },
  ];

  return (
    <div className="min-h-screen fixed flex items-center justify-center flex-col w-[15vw] bg-white shadow-xl rounded-xl">
      {buttons.map((e, i) => {
        return (
          <Link key={i} href={e.to}>
            <Button className="w-[8vw] my-2">{e.text}</Button>
          </Link>
        );
      })}
      {children}
    </div>
  );
}
