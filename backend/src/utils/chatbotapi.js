export default async function generateres(query){
    try{
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyA5JRNp12VEE_PeKjyCUDb5dZIUSMSuyz0");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        
        const result = await model.generateContent([query]);
        const analysis = result.response.text();
        return  analysis;
      } catch(error) {
        console.error("Error summarizing the text:", error);
        throw error;
      }
}