const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/professional", require("./routes/professional.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resouces Not Found" })
})


mongoose.connection.once("open", () => {
    console.log("MONGO CONNCETED")
    app.listen(process.env.PORT, console.log("Server Running 🏃‍♀️"))
})