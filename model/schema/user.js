const mongoose = require("mongoose");

// create login schema
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    role: { type: String, default: "user" },
    emailsent: { type: Number, default: 0 },
    textsent: { type: Number, default: 0 },
    leadsCreated: { type: Number, default: 0 },
    contactsCreated: { type: Number, default: 0 },
    propertiesCreated: { type: Number, default: 0 },
    tasksCreated: { type: Number, default: 0 },
    outboundcall: { type: Number, default: 0 },
    phoneNumber: { type: Number },
    firstName: String,
    lastName: String,
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    roles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "RoleAccess",
        required: true,
      },
    ],
    nationality: {
      type: String,
    },
    dob: {
      type: Date,
    },
    educationDegree: {
      type: String,
    },
    passportNum: {
      type: String,
    },
    uaeIdNum: {
      type: String,
    },
    dubaiHomeAddress: {
      type: String,
    },
    drivingLicense: {
      type: String,
    },
    countryHomeAddress: {
      type: String,
    },
    countryPhoneNum: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    coins:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user, "User");
