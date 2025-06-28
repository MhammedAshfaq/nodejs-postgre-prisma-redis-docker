import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import { setupSwagger } from "./swagger";
import { rateLimit } from "./middleware/rateLimit.middleware";
import { getCache, setCache } from "./cache/cache.service";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
setupSwagger(app);
app.use(rateLimit(60,10));

// Health check
app.get("/", async (_, res) => {
  res.send("Ok");
});
// Redis check
app.get("/redis", async (_, res) => {
  await setCache("test", "hello redis");
  const val = await getCache("test");
  res.send(val);
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
