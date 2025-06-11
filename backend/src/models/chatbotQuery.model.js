import mongoose from 'mongoose';

const chatbotQuerySchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  queryText: String,
  responseText: String,
  queryDate: Date
});

export default mongoose.model('ChatbotQuery', chatbotQuerySchema);
