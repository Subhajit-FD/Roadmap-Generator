const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()



app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [
        "https://roadmap-generator-frontend.vercel.app",
        "http://localhost:5173",
        process.env.CORS_ORIGIN
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
const paymentRouter = require("./routes/payment.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)



module.exports = app