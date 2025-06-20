// Required at top of file
import { ObjectId } from 'mongoose'; // or from 'mongodb' if you're not using Mongoose for ObjectId
import chatbotQueryModel from '../models/chatbotQuery.model.js';
import generateres from '../utils/chatbotapi.js';

export const addQuery = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("Received query:", query);

    const response = await generateres(query);

    const chatbot = new chatbotQueryModel({
      
      queryText: query,
      responseText: response,
      queryDate: new Date()
    });

    const savedchatbot = await chatbot.save();
    res.status(200).json(savedchatbot);
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ message: "Failed to generate response", error: error.message });
  }
};
