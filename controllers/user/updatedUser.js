const User = require("../../model/schema/user");


const getTree = async (req, res) => {
    try {
      // Fetch all users, populating their roles
      const allUsers = await User.find({ deleted: false }).populate("roles");
  
      // Filter out managers
      const managers = allUsers.filter(
        (user) => user.roles.length && user.roles[0]?.roleName === "Manager"
      );
  
      // Map managers with their agents
      const tree = managers.map((manager) => {
        const agents = allUsers.filter(
          (user) => user.parent?.toString() === manager._id.toString()
        );
  
        return {
          ...manager.toObject(), // Convert Mongoose document to plain object
          agents, // Add agents array directly into manager object
        };
      });
  
      // Send the tree as the response
      res.status(200).json(tree);
    } catch (error) {
      console.error("Error fetching user tree:", error.message);
      res.status(400).json({ error: "Failed to fetch user tree" });
    }
  };
  
  
  
  
  

  module.exports = {getTree};