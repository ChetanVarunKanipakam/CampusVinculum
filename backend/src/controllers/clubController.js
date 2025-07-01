import clubModel from "../models/club.model.js";
import RoomUser from "../utils/socket.js";
import User from "../models/user.model.js";
import clubMembershipModel from "../models/clubMembership.model.js";
import mongoose from "mongoose";
//add club

export const getClubByName = async (req, res) => {
  const { name } = req.params;

  try {
    const club = await clubModel.findOne({ name });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  } catch (error) {
    console.error('Error fetching club by name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addClub = async (req, res) => {
  try {
    const { name, description, adminID } = req.body;
    const roomName = name.trim();


    const existingClub = await clubModel.findOne({ name: roomName });
    if (existingClub) {
      return res.status(400).json({ message: 'A club with this name already exists.' });
    }

    
    const existingRoom = await RoomUser.findOne({ room: roomName });
    if (existingRoom) {
      return res.status(400).json({ message: 'A room with this name already exists.' });
    }

    const user = await User.findById(adminID).populate('departmentID', 'name');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const newClub = new clubModel({
      name: name.trim(),
      description,
      createdDate: new Date(),
      adminID,
    });

    const savedClub = await newClub.save();


    await RoomUser.insertOne(
      { room: savedClub.name, username: user.email },
      { upsert: true }
    );


    const newMembership = new clubMembershipModel({
      clubID: savedClub._id,
      userID: user.email,
      role: "FacultyCoordinator",
      joinDate: new Date()
    });
    await newMembership.save();

    res.status(201).json(savedClub);

  } catch (error) {
    console.error('Error adding club:', error);
    res.status(500).json({ message: 'Server error while adding club.' });
  }
};


export const getNormalRoomsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Get all rooms user has joined
    const allRooms = await RoomUser.find({ username }).select('room -_id');
    const userRooms = allRooms.map(entry => entry.room);

    // Get all club names
    const allClubs = await clubModel.find().select('name -_id');
    const clubNamesSet = new Set(allClubs.map(club => club.name.trim()));

    // Filter out club rooms (i.e. those matching a club name)
    const normalRooms = userRooms.filter(room => !clubNamesSet.has(room.trim()));

    res.status(200).json({ normalRooms });

  } catch (error) {
    console.error('Error fetching normal rooms:', error);
    res.status(500).json({ message: 'Server error while fetching normal rooms.' });
  }
};

// ✅ Get Club Rooms by Username directly from ClubModel
export const getClubRoomsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Get memberships of the user
    const memberships = await clubMembershipModel.find({ userID: username }).select('clubID');

    const clubIds = memberships.map(m => m.clubID);
    if (clubIds.length === 0) {
      return res.status(200).json({ clubs: [] });
    }

    // Fetch club details
    const clubs = await clubModel.find({ _id: { $in: clubIds } });
    res.status(200).json({ clubs });

  } catch (error) {
    console.error('Error fetching clubs by username:', error);
    res.status(500).json({ message: 'Server error while fetching clubs.' });
  }
};

// ✅ Get All Clubs
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await clubModel.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Error retrieving clubs:', error);
    res.status(500).json({ message: 'Server error while retrieving clubs.' });
  }
};
