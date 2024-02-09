"use client";

import CourseList from "@/components/Course/CourseList";
import Navbar from "@/components/Dashboard/NavBar";
import { fakeCourseData } from "@/lib/fakeData";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { redirect } from "next/navigation";


export default function Dashboard() {
  const auth = useContext(AuthContext);
  if(!auth.isLoggedIn){
    redirect("/register")
  }
  return (
    <div className=" w-full flex flex-col">
      <Navbar />
      {/* Rendering Courses */}
      <div>
        <CourseList courses={fakeCourseData} />
      </div>
    </div>
  );
}
