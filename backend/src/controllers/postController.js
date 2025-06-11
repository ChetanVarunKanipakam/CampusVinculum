import postModel from "../models/post.model.js";
//create new post
export const createPost=async(req,res)=>{
    try{
        const{threadID,content,postedBy}=req.body;
        const newPost=new Post({threadID,content,postedBy,postedDare:new Date(),modifiedDate: new Date()   
        });
        //const savedPost=await newPost.save();
        res.status(200).json({message:"Post created successfully"});
    }
    catch(err){
        res.status(500).json({error: 'Error creating Post',details:'err.message'});
    }
};
//update post by id
export const updatePost=async (req,res)=>{
    try{
    const {threadID}=req.params;
    const {content}=req.body;
    const updatedPost=await Post.findByIdAndUpdate(
        postId,{content,modifiedData: new Data()},{new: true}
    );
    if(!updatedPost)
    {
        return res.status(404).json({error:"Post not found"});
    }
    res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(500).json({err:"Error updating post",details:err.message});
    }
};
//delete post by id
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting post', details: err.message });
  }
};