import dotenv from "dotenv";
import express from "express";
import blogPostRoute from "./routes/v1/blog-post";
import mongoConnect from "./mongo";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5009;

mongoConnect();

app.use("/api/v1/blog-post", blogPostRoute);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
