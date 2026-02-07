import cookieParser from "cookie-parser";
import express from "express";
import coars from "cors";

import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

export default app;