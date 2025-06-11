import aluminiModel from "../models/alumini.model.js";
import jwt from 'jsonwebtoken';
//Get all Alumini
export const getAllAlumini =async(req,res)=>{
    try{
        const alumini=await Alumini.find().populate('userID');
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
    const alumini = await Alumini.findById(req.params.id).populate('userID');
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

  const newAlumini = new Alumini({
    userID,
    graduationYear,
    currentPosition,
    company,
    linkedInProfile
  });

  try {
    const savedAlumini = await newAlumni.save();
    res.status(201).json(savedAlumini);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

