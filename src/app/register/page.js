"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

import { fakeStudentData } from "@/lib/fakeData";

const signUpSchema = z
  .object({
    username: z
      .string({
        required_error: "username is required",
      })
      .min(3, "Username should be minimum 3 characters"),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, "Password must be at least 8 charaters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Please Enter a valid email" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function Register() {
  const auth = useContext(AuthContext);

  const [role, setRole] = useState("student");

  const [isLoginMode, setisLoginMode] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(isLoginMode ? loginSchema : signUpSchema),
  });

  const changeRole = (data) => {
    setRole(data);
  };

  const changeMode = (e) => {
    e.preventDefault();
    setisLoginMode((prev) => !prev);
  };

  const onSubmit = async (data) => {
    let found = fakeStudentData.find(
      (e) => e.email === data.email && e.password === data.password
    );
    if (isLoginMode) {
      if (!found) {
        //TODO: Handle the invalid credentials case here

        console.log("Invalid credentials");
        return;
      }
      auth.login(found.id, role);
    } else {
      //TODO: Checking if the users already exists

      if (!found) {
        fakeStudentData.push(data);
      } else {
        console.log("User already exists");
      }
    }

    reset();
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className=" w-[30vw] ">
          <CardHeader>
            <CardTitle>{isLoginMode ? "Login" : "Signup"}</CardTitle>
            <CardDescription>
              {isLoginMode ? "New to platform ?" : "Already have an account ?"}
              <Button variant="link" className="w-12" onClick={changeMode}>
                {isLoginMode ? " signup " : "login"}
              </Button>
              instead
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {!isLoginMode && (
              <>
                <Input
                  type="text"
                  {...register("username")}
                  placeholder="Name"
                  className=" my-2 w-[20vw] "
                />
                {errors.username && (
                  <Alert variant="destructive" className="w-[20vw] border-none">
                    <AlertDescription>
                      {errors.username.message}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
            <Input
              type="email"
              {...register("email")}
              placeholder="email"
              className="  w-[20vw]"
            />
            {errors.email && (
              <Alert variant="destructive" className="w-[20vw] border-none">
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
            <Input
              type="password"
              placeholder="password"
              className=" my-2 w-[20vw]"
              {...register("password")}
            />
            {errors.password && (
              <Alert variant="destructive" className="w-[20vw] border-none">
                <AlertDescription>{errors.password.message}</AlertDescription>
              </Alert>
            )}
            {!isLoginMode && (
              <>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="  w-[20vw]"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Alert variant="destructive" className="w-[20vw] border-none">
                    <AlertDescription>
                      {errors.confirmPassword.message}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
            <Select onValueChange={changeRole} defaultValue="student">
              <SelectTrigger className="w-[20vw] my-2">
                <SelectValue placeholder="Register as " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="tutor">Tutor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              <ReloadIcon
                className={` ${
                  isSubmitting ? "visible animate-spin" : " hidden"
                }  m-2`}
              />
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
