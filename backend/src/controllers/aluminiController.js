import aluminiModel from "../models/alumini.model.js";
//Get all Alumini
export const getAllAlumini =async(req,res)=>{
    try{
        const alumini=await aluminiModel.find().populate('userID');
        res.status(200).json(alumini);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
};
//get alumini by id
export const getAluminiById = async (req, res) => {
  try {
    const alumini = await aluminiModel.findById(req.params.id).populate('userID');
    if (!alumini) {
      return res.status(404).json({ message: 'Alumini not found' });
    }
    res.status(200).json(alumini);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//add alumini
export const addAlumini = async (req, res) => {
  const { userID, graduationYear, currentPosition, company, linkedInProfile } = req.body;

  const newAlumini = new aluminiModel({
    userID,
    graduationYear,
    currentPosition,
    company,
    linkedInProfile
  });

  try {
    const savedAlumini = await newAlumini.save();
    res.status(201).json(savedAlumini);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

