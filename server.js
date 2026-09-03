import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question,
    });

    const answer = response.text;

    res.json({
      answer,
    });
  } catch (error){
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
