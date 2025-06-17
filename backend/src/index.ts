import dotenv from "dotenv";
dotenv.config();
import createApp from "./app";
import { connectToDb } from "./db.collections";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectToDb();
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err: any) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
