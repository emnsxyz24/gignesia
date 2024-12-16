import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import routes from "./src/routes/index.js";
import swaggerDocs from "./src/config/swagger.js";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);
app.use("/uploads", express.static("public/uploads"));
console.log('Uploads directory path:', path.join(__dirname, '..', 'public', 'uploads'));

swaggerDocs(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
