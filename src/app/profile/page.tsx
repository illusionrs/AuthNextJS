"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")
    const logout = async ()=>{
        try {

            await axios.get("/api/user/logout")
            toast.success("Logout success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
            
        }
    }
    const getUserDetails =async () => {
        const res:any = await axios.get("/api/user/me")
        console.log("USR: ", res)
        setData(res.data.data._id)
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-400">{ data === "" ? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
      onClick={logout}
       className="border border-solid border-white bg-black rounded-lg p-2 m-2 text-pretty text-white">
        Logout
       </button>

       <button
      onClick={getUserDetails}
       className="border border-solid border-white bg-orange-400 rounded-lg p-2 m-2 text-pretty text-white">
        get User
       </button>
    </div>
  );
}
