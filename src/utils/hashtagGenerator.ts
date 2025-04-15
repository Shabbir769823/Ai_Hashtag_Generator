
// API configuration
const API_ENDPOINT = "https://api.hashtaggenerator.app/v1/generate";

interface HashtagCategory {
  name: string;
  tags: string[];
}

interface GenerateResponse {
  hashtags: string[];
  trending: string[];
  niche: string[];
  error?: string;
}

// Sample hashtag pool organized by categories (for fallback)
const hashtagPool: HashtagCategory[] = [
  {
    name: "Popular",
    tags: ["love", "instagood", "photooftheday", "fashion", "beautiful", "happy", "cute", "like4like", "followme", "picoftheday", "follow", "nature", "travel", "style", "photography", "instadaily", "selfie"]
  },
  {
    name: "Business",
    tags: ["business", "entrepreneur", "success", "motivation", "marketing", "smallbusiness", "startup", "entrepreneurship", "mindset", "hustle", "inspiration", "leadership", "goals", "money", "work", "branding"]
  },
  {
    name: "Lifestyle",
    tags: ["lifestyle", "life", "healthy", "fitness", "health", "wellness", "motivation", "workout", "inspiration", "gym", "fit", "love", "healthylifestyle", "training", "nutrition", "weightloss"]
  },
  {
    name: "Travel",
    tags: ["travel", "travelgram", "instatravel", "travelphotography", "wanderlust", "adventure", "traveling", "nature", "photography", "explore", "vacation", "trip", "travelblogger", "tourism", "holiday", "beach"]
  },
  {
    name: "Food",
    tags: ["food", "foodporn", "foodie", "instafood", "delicious", "yummy", "foodphotography", "homemade", "healthyfood", "dinner", "foodstagram", "foodblogger", "lunch", "tasty", "cooking", "restaurant"]
  },
  {
    name: "Tech",
    tags: ["technology", "tech", "innovation", "digital", "programming", "coding", "developer", "software", "ai", "artificialintelligence", "data", "machinelearning", "computer", "blockchain", "iot", "cybersecurity"]
  },
  {
    name: "Art",
    tags: ["art", "artist", "drawing", "illustration", "design", "artwork", "sketch", "digitalart", "painting", "creative", "artistsoninstagram", "draw", "arte", "instaart", "graphicdesign", "contemporaryart"]
  }
];

// Helper function to get random items from an array (for fallback)
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate hashtags using an API key if provided, otherwise fall back to local generation
export async function generateHashtags(topic: string, apiKey?: string, count: number = 30): Promise<string[]> {
  if (!topic) return [];
  
  // If API key is provided, use external API
  if (apiKey && apiKey.trim()) {
    try {
      console.log(`Generating hashtags via API for topic: ${topic}`);
      
      // Call to the external API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-API-Version': '1.0'
        },
        body: JSON.stringify({
          topic,
          count,
          include_trending: true,
          language: 'en'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      const data: GenerateResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Combine all hashtags from the API response
      let allTags = [...data.hashtags];
      
      // Add trending and niche tags if available
      if (data.trending) allTags = [...allTags, ...data.trending];
      if (data.niche) allTags = [...allTags, ...data.niche];
      
      // Format the hashtags with # if they don't already have it
      const formattedHashtags = allTags.map(tag => 
        tag.startsWith('#') ? tag : `#${tag}`
      );
      
      // Remove duplicates and limit to requested count
      return [...new Set(formattedHashtags)].slice(0, count);
    } catch (error) {
      console.error('Error fetching hashtags from API:', error);
      // Fall back to local generation if API call fails
      return generateLocalHashtags(topic, count);
    }
  }
  
  // If no API key, use local generation
  return generateLocalHashtags(topic, count);
}

// Local generation logic (fallback implementation)
function generateLocalHashtags(topic: string, count: number = 30): string[] {
  const topicLower = topic.toLowerCase().trim();
  const words = topicLower.split(/\s+/);
  
  let result: string[] = [];
  
  // Add the main topic as a hashtag
  result.push(topicLower.replace(/\s+/g, ''));
  
  // Add variations of the topic
  words.forEach(word => {
    if (word.length > 2) {
      result.push(word);
    }
  });
  
  // Generate compound hashtags with the topic
  if (words.length === 1 && words[0].length > 3) {
    const compoundVariations = ["love", "life", "lover", "addict", "fan", "world", "daily", "gram", "goals", "nation", "community", "style"];
    compoundVariations.forEach(variation => {
      result.push(`${words[0]}${variation}`);
    });
  }
  
  // Find the most relevant category based on the topic
  let relevantCategory: HashtagCategory | null = null;
  for (const category of hashtagPool) {
    if (category.tags.some(tag => topicLower.includes(tag) || tag.includes(topicLower))) {
      relevantCategory = category;
      break;
    }
  }
  
  // Add hashtags from the relevant category or from random categories
  if (relevantCategory) {
    result = [...result, ...getRandomItems(relevantCategory.tags, 15)];
  }
  
  // Add some general popular hashtags
  const popularTags = hashtagPool[0].tags;
  result = [...result, ...getRandomItems(popularTags, 10)];
  
  // Ensure all hashtags start with #
  const formattedResult = result.map(tag => tag.startsWith('#') ? tag : `#${tag}`);
  
  // Remove duplicates, trim to requested count, and return
  return [...new Set(formattedResult)].slice(0, count);
}
