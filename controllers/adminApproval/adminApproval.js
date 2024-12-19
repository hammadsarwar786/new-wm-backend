const mongoose = require("mongoose");
const AdminApproval = require("../../model/schema/adminApproval");
const { Lead } = require("../../model/schema/lead");
const res = require("express/lib/response");
const add = async (req, res) => {
  // console.log(req.body);
  // const { leadName, leadId, agentName, agentId, mangerName, managerId } =
  //   req.body;
  // const newApproval = new AdminApproval({
  //   leadName,
  //   leadId,
  //   agentName,
  //   agentId,
  //   mangerName,
  //   managerId,
  //   approvalStatus:"pending"
  // });
  // try {
  //   await newApproval.save();
  //   console.log("Approval Data saved", newApproval);
  //   res.status(200).json({ message: "Successfully Saved", data: newApproval });
  // } catch (error) {
  //   console.log(error);
  // }
  console.log(req.body);
  const { leadId, agentName, agentId, mangerName, managerId } = req.body;

  try {
    const lead = await Lead.findOne({ _id: leadId }).lean();

    const {
      leadPhoneNumber,
      leadEmail,
      nationality,
      interest,
      leadName,
      leadStatus,
      createdDate
    } = lead;
    const newApproval = new AdminApproval({
      leadName: leadName,
      leadId,
      agentName,
      agentId,
      mangerName,
      managerId,
      leadPhoneNumber: leadPhoneNumber,
      leadEmail: leadEmail,
      nationality: nationality,
      interest: interest,
      approvalStatus: "pending",
      leadStatus: leadStatus,
      createdDate
    });
    console.log(newApproval, "lead data");
    await newApproval.save();
    console.log("Approval Data saved", newApproval);
    res.status(200).json({ message: "Successfully Saved", data: newApproval });
  } catch (error) {
    console.log(error, "error");
  }
};
// const get = async (req, res) => {
//   try {

//     const ReturnData= await AdminApproval.find({})
//      res.status(200).json(ReturnData);
//   } catch (error) {
//     console.log(error)
//   }
// };
// const get = async (req, res) => {
//   try {
//     // Extract query parameters
//     const { approvalStatus, page = 1, pageSize = 10 } = req.query;

//     // Build the query object
//     const query = {};
//     if (approvalStatus) {
//       query.approvalStatus = approvalStatus;
//     }
//     console.log(approvalStatus)

//     // Calculate skip and limit values for pagination
//     const skip = (page - 1) * pageSize;
//     const limit = parseInt(pageSize, 10);

//     // Find the data with filtering and pagination
//     const ReturnData = await AdminApproval.find(query).skip(skip).limit(limit);

//     // Get the total count of documents that match the query
//     const totalRecords = await AdminApproval.countDocuments(query);

//     // Send the response with the data and pagination info
//     res.status(200).json({
//       approvals: ReturnData,
//       currentPage: page,
//       totalPages: Math.ceil(totalRecords / pageSize),
//       totalApprovals:totalRecords,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const get = async (req, res) => {
  try {
    // Extract and parse query parameters
    const {
      approvalStatus,
      page = 1,
      pageSize = 10,
      agentId,
      managerId,
    } = req.query;
    console.log(managerId, agentId, "user id");

    // Initialize an empty array to build filters
    const filters = [];

    // Add approvalStatus to the filters if provided
    if (approvalStatus) {
      filters.push({
        approvalStatus: {
          $regex: new RegExp(`^${approvalStatus.trim()}$`, "i"),
        },
      });
    }

    if (agentId) {
      filters.push({ agentId: agentId.trim() });
    }
    if (managerId) {
      filters.push({ managerId: managerId.trim() });
    }
    // Combine filters into a single query object
    const query = { $and: filters.length ? filters : [{}] }; // Default to an empty query if no filters

    // Log the constructed query for debugging
    console.log("Constructed Query:", query);

    // Pagination calculation
    const skip = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
    const limit = parseInt(pageSize, 10);

    // Execute the query with pagination
    const ReturnData = await AdminApproval.find(query).skip(skip).limit(limit);
    console.log("Returned Data:", ReturnData);

    // Get total count for pagination
    const totalRecords = await AdminApproval.countDocuments(query);
    console.log("Total Records Matching Query:", totalRecords);

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Send the response
    res.status(200).json({
      approvals: ReturnData,
      currentPage: parseInt(page, 10),
      totalPages: totalPages,
      totalApprovals: totalRecords,
    });
  } catch (error) {
    console.error("Error fetching approvals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const responseFromAdmin = async (req, res) => {
  try {
    const { isManger, isApproved, objectId } = req.body;

    const response = await AdminApproval.findByIdAndUpdate(
      { _id: objectId },
      { $set: { approvalStatus: isApproved ? "Accepted" : "Rejected" } }
    );
    res.status(200).json({
      status: isApproved ? true : false,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRequest = async (req, res) => {
  try {
    const requestId = req?.body?.id;
    await AdminApproval.deleteOne({ _id: requestId });
    return res
      .status(200)
      .json({ status: true, message: "Request is deleted successfully!" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "there is an error occure",
      detial: error,
    });
  }
};

module.exports = { add, get, responseFromAdmin, deleteRequest };
