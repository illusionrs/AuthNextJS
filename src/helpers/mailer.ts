import nodemailer from 'nodemailer'



export const sendMail = async({email, emailType, hashedToken}:any) => {
    
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "",
          pass: ""
        }
      });

      console.log("TOKEN FROM MAIL: ", hashedToken, `href=${process.env.DOMAIN}/verifyEmail?token=${hashedToken}`)

    await transport.sendMail({
        from: "rajeev@gmail.com",
        to:email,
        subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
        html: `<p> Click <a href=${process.env.DOMAIN}/verifyEmail?token=${hashedToken}>here</a> to verify identity</p>`
    })  
}

  