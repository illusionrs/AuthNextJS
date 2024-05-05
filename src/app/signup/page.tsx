"use client";
import Link from "next/link";
import React, {  } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter()

  const onSignup = async () => {
     try {
       const response = await axios.post("/api/user/signup", user)
       console.log(response)
       router.push("/login")
     } catch (error:any) {
        toast.error(error)
     }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center ">Sign up</h1>
      <hr />
      <label htmlFor="userName" className="ml-2 mt-2"> Username</label>
      <input
        id="userName"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="border border-solid border-black rounded-lg p-2 m-2 text-pretty text-gray-700"
      />
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
      onClick={onSignup}
      className="border border-solid border-white bg-black rounded-lg p-2 m-2 text-pretty text-white"

      >
        Signup
      </button>
      <Link href="/login" >Visit Login</Link>

    </div>
  );
}
