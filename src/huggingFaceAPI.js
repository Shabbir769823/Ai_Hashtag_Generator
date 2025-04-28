import axios from "axios";

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-summarize-news";
const HUGGINGFACE_API_TOKEN = "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";

export const generateHashtagsFromHuggingFace = async (keyword) => {
  try {
    const response = await fetch("/generate-hashtags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });

    const data = await response.json();
    const generatedText = data[0]?.generated_text;

    const cleanedHashtags = cleanGeneratedText(generatedText);
    
    return cleanedHashtags;
  } catch (error) {
    console.error("Error generating hashtags:", error);
    throw new Error("Failed to generate hashtags");
  }
};

const cleanGeneratedText = (generatedText) => {
  const regex = /\b[\w']+\b/g; 
  const words = generatedText.match(regex);
  
  const uniqueWords = [...new Set(words)];

  // Create valid hashtags (with # and separated properly)
  const hashtags = uniqueWords.map(word => `#${word.toLowerCase()}`);

  return hashtags;
};
