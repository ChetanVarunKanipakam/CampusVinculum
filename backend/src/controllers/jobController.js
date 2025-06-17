import jobPostingModel from "../models/jobPosting.model";

//create jobposting
export const createJobPosting=async (req,res)=>{
    try{
    const {title,description,postedBy,companyName,location,applicationDeadline}=req.body;
    const newJobPosting=new new jobPostingModel({
        title,description,postedBy,companyName,location,applicationDeadline
    });
    const savedJob=await newJobPosting.save();
    res.status(201).json(savedJob);
}
catch(err)
{
    res.status(500).json({error:"failed to create job posting",details: err.message});
}
};

//delete post
export const deletePosting=async(req,res)=>{
    try{
    const{jobId}=req.params;
    const deleteJob=await jobPostingModel.findByIdAndDelete(jobId);
    if(!deleteJob){
        return res.status(404).json({error:"job posting not found"});
    }
    res.status(200).json({message:"job posting deleted successfully"});
}
    catch (err) {
    res.status(500).json({ error: 'Failed to delete job posting', details: err.message });
  }
};
export const updateJobPosting=async(req,res)=>{
    try{
        const {jobId}=req.params;
        const updates=req.body;
    const updatedJob = await jobPostingModel.findByIdAndUpdate(
      jobId,
      { ...updates },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job posting', details: err.message });
  }
}