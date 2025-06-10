import chatbotQueryModel from '../models/chatbotQuery.model.js';
import generateres from '../utils/chatbotapi.js';

export const addQuery= async (req,res)=>{
    try{
    const {query}=req.body;
    const response=await generateres(query);
    const chatbot=new chatbotQueryModel({
        queryText:query,
        responseText:response,
        queryDate:new Date()
    })
    const savedchatbot= await chatbot.save();
    res.status(200).json(savedchatbot);
    }catch(error){
        res.status(500).json({message:"Failed to generate response",error:error.message});
    }

}