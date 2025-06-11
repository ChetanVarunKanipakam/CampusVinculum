import clubModel from "../models/club.model.js";
//add club
export const addClub=async(req,res)=>{
    try{
        const{name,description,adminID}=req.body;
        const newClub=new clubModel({
            name,description,createdDate: new Date(),
            adminID,
        });
        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
     } catch (error) {
    console.error('Error adding club:', error);
    res.status(500).json({ message: 'Server error while adding club.' });
  }
    
};
//get all clubs
export const getAllClubs=async(req,res)=>{
    try{
        const clubs=await clubModel.find();
        res.status(200).json(clubs);
    }
    catch (error) {
    console.error('Error retrieving clubs:', error);
    res.status(500).json({ message: 'Server error while retrieving clubs.' });
  }
};