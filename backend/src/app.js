const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = [
    process.env.CORS_ORIGIN,
    "http://localhost:5173",
].filter(Boolean);

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
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