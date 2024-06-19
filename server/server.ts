import dotenv from "dotenv";
import express from "express";
import blogPostRoute from "./routes/v1/blog-post";
import usersRoute from "./routes/v1/users";
import authRoute from "./routes/v1/auth";
import mongoConnect from "./mongo";
import cors, { CorsOptions } from "cors";

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5009;

(async function () {
  await mongoConnect();
})();

const allowedOrigins = [
  "https://plusone-assessment.vercel.app", // for production
  "http://localhost:5173", // for development
];

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
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", usersRoute);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
