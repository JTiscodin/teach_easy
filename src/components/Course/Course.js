import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { fakeCourseData } from "@/lib/fakeData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Course({title, description, src}) {

  const auth = useContext(AuthContext)
  return (
    <Card className="w-[25vw] m-8 overflow-hidden hover:scale-105 duration-150 cursor-pointer">
      <CardContent className="p-0">
        <img
          alt="course"
          src="https://picsum.photos/200"
          className=" object-cover h-48 w-96"
        />
      </CardContent>
      <CardContent className="text-center my-2 space-y-3">
        <CardTitle >{title} </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="my-4 flex items-baseline justify-around">
        {!auth.isTutor &&<Button>Buy Now</Button>}
        <Button >View More</Button>
      </CardFooter>
    </Card>
  );
}
