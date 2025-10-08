
import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.get("/peliculas", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      resource_type: "video",
      max_results: 10
    });

    const videos = result.resources.map(v => ({
      url: v.secure_url,
   
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
