const mongoose = require("mongoose");
const User = require("../../model/schema/user");
const CoinsRequest = require("../../model/schema/coinsRequest")
const add = async (req, res) => {

  console.log(req.body);
  const { userId, } = req.body;

    try {
      const user = await User.findOne({_id:userId});

      const {username,role,email,coins} = user;
      const newCoinsRequest = new CoinsRequest({
        userId,
        role,
        email,
        coins,
        userName:username,
        requestStatus:"pending",

      });
        await newCoinsRequest.save();
        res.status(200).json({ message: "Successfully Saved", data: newCoinsRequest });
     
    } catch (error) {
      console.log(error,"error")
    }
};

const get = async (req, res) => {
  try {
    // Extract and parse query parameters
    const { requestStatus, page = 1, pageSize = 10,userId } = req.query;

    // Initialize an empty array to build filters
    const filters = [];

    // Add approvalStatus to the filters if provided
    if (requestStatus) {
      filters.push({ requestStatus: { $regex: new RegExp(`^${requestStatus.trim()}$`, 'i') } });
    }
    if (userId) {
      filters.push({ userId: userId.trim() });
    }

    // Combine filters into a single query object
    const query = { $and: filters.length ? filters : [{}] }; // Default to an empty query if no filters


    // Pagination calculation
    const skip = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
    const limit = parseInt(pageSize, 10);

    // Execute the query with pagination
    const ReturnData = await CoinsRequest.find(query).skip(skip).limit(limit);

    // Get total count for pagination
    const totalRecords = await CoinsRequest.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Send the response
    res.status(200).json({
      requests: ReturnData,
      currentPage: parseInt(page, 10),
      totalPages: totalPages,
      totalRequests: totalRecords,
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const responseFromAdmin = async (req, res) => {
  try {
    const {isApproved, objectId,coins,userId } =
    req.body;

    if(isApproved){
      console.log("it is called")
      console.log(coins,"coins")
      console.log(userId)
      await User.findOneAndUpdate({ _id: userId}, 
        { $inc: { coins: coins } })
    }
   
     const response =  await CoinsRequest.findByIdAndUpdate( { _id: objectId }, 
      { $set: { requestStatus: isApproved?"Approved":"Rejected" } })
    res.status(200).json({status:isApproved?true:false,message:"Status updated successfully"})
  } catch (error) {
    console.log(error)
  }
};

const coinNotes = async(req,res)=>{
  try{
   const {note,objectId,} = req.body;

   
  const newData = await CoinsRequest.findByIdAndUpdate(
    objectId,  // Find the document by its ID
    { $push: { requestNotes: note } },  // Use $push to add the new note to the "notes" array
    { new: true },  // Option to return the updated document
  );
  res.status(200).json({message:"Success",data:newData})
  }catch(error){
    res.status(400).json({message:"Error",error:error}) 
  }
}




module.exports = { add, get, responseFromAdmin,coinNotes};
