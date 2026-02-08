import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";


const app = express();

app.use(cors(

    {
        origin: "http://localhost:8000",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


import userRouter from "./routes/user.js";
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.use("/api/v1/user", userRouter);

export default app;