import chatbotQuery from '../models/chatbotQuery.model.js';
import generateres from '../utils/chatbotapi.js';

export const addQuery= async (req,res)=>{
    const {userId,query}=req.body;
    const response=generateres(query);
    
}