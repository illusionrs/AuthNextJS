import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {sendMail} from '@/helpers/mailer'
connect()


export async function POST(request:NextRequest) {

    try {

        const reqBody = await request.json()
        const { username, email, password} = reqBody
        // check user exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User Exists"}, {status: 400})
        }
        // has password
        const salt:any =  bcryptjs.genSaltSync(10)

        const hashedPasword =  bcryptjs.hashSync(password,salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPasword
        })

        const savedUser = await newUser.save()
        const id = await savedUser._id
        const hashedToken = bcryptjs.hashSync(id.toString(),salt)
        await User.findByIdAndUpdate(id.toString(), 
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        const verify = "VERIFY"
        console.log("TOKEN: ", hashedToken)
        await sendMail({email, verify,hashedToken})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


        
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status: 500})
    }
    
}