"use client";
import Link from "next/link";
import React, {  } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  });
  const router = useRouter()
  const onLogin = async () => {
     try {
         const response = await axios.post("/api/user/login", user)
         console.log("Login Success ", response.data)
         toast.success("Login Success")
         router.push(`/profile`)
     } catch (error:any) {
      console.log("Login Failed: ", error.message)
      toast.error(error.message)
     }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center ">Login</h1>
      <hr />
      
      <label htmlFor="email" className=" ml-2 mt-2"> Email</label>
      <input
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="border border-solid border-black rounded-lg p-2 m-2 text-pretty text-gray-700"

      />

      <label htmlFor="email" className="ml-2 mt-2"> Password</label>
      <input
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="border border-solid border-black rounded-lg p-2 m-2 text-pretty text-gray-700"

      />
      <button
      onClick={onLogin}
      className="border border-solid border-white bg-black rounded-lg p-2 m-2 text-pretty text-white"

      >
        Login
      </button>
      <Link href="/signup" >Visit signup</Link>

    </div>
  );
}
