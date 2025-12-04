export default async function generateres(query){
    try{
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyCoHKnznyEZ2IxuXfG5_UByeX-e9q4a7Sw");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent([query]);
        const analysis = result.response.text();
        return  analysis;
      } catch(error) {
        console.error("Error summarizing the text:", error);
        throw error;
      }
}