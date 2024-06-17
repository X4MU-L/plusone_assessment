import dotenv from "dotenv";
import express from "express";
import blogPostRoute from "./routes/v1/blog-post";
import mongoConnect from "./mongo";
import cors, { CorsOptions } from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5009;

mongoConnect();

const allowedOrigins = ["http://localhost:3001"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "HEAD,POST",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/blog-post", blogPostRoute);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
