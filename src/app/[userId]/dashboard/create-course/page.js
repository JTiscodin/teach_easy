"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ThumbnailUploader from "@/components/Dashboard/Create-Course/ThumbnailUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const courseSchema = z.object({
  title: z.string().min(6, "title should be minimum 6 characters"),
  description: z.string(),
  price: z.coerce
    .number({
      invalid_type_error: "Price should be number",
    })
    .positive()
    .lte(10000),
  thumbnail: z.any(),
  content: z.array().optional(),
});

export default function CreateCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(courseSchema) });
  const auth = useContext(AuthContext);
  const [thumbnail, setThumbnail] = useState();
  //Redirecting to home page when user is not a tutor
  if (!auth.isTutor) {
    redirect(`/${auth.userId}/dashboard`);
  }

  const onSubmit = (data) => {
    console.log(data);
    console.log("submitted");
    axios
      .post("http://localhost:3000/api/check", data)
      .then((res) => console.log(res));
  };

  const getThumbnail = (data) => {
    if (data) {
      setThumbnail(data);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center ">Create a new Course </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-screen flex justify-around items-center">
          <ThumbnailUploader getThumbnail={getThumbnail} />
          {thumbnail && (
            <input
              {...register("thumbnail")}
              className="hidden"
              value={thumbnail}
            />
          )}
          <Card className="flex flex-col items-center gap-7 p-5 w-[30vw]">
            <CardContent className="w-[30vw]">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title")}
                  placeholder="title"
                  id="title"
                  type="text"
                />
                {errors.title && (
                  <Alert variant="destructive" className="w-[20vw] border-none">
                    <AlertDescription>{errors.title.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Type your description"
                  id="description"
                />
                {errors.description && (
                  <Alert variant="destructive" className="w-[20vw] border-none">
                    <AlertDescription>
                      {errors.description.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                {/*TODO:  Use ruppes icon here */}
                <Input
                  {...register("price")}
                  placeholder="Set Price in INR"
                  id="price"
                />
                {errors.price && (
                  <Alert variant="destructive" className="w-[20vw] border-none">
                    <AlertDescription>{errors.price.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit">Create Course</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
