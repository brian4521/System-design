import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"

dotenv.config()

const port=process.env.PORT || 5000

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).json({message:`This is ${process.env.ser_name}`})
})

app.use("/auth",proxy("http://auth-service:3001"))
app.use("/order",proxy("http://order-service:3002"))
app.use("/product",proxy("http://product-service:3003"))

app.listen(port,()=>{
    console.log(`server started ${port}`)
})