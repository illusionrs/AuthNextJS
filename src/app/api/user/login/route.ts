import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()


export async function POST(request:NextRequest) {

    try {

        const reqBody = await request.json()
        const { email, password} = reqBody

        // check user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})
        }
        // has password
        const validPassword = bcryptjs.compareSync(password, user.password)
        
        if(!validPassword){
            return NextResponse.json({
                message: "Invalid Crednetials",
            },{status: 401 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token data
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
    
}