import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
{
  location: {
    type: String,
    required: true,
  },
  latitude: {
  type: Number,
  default: 0,
},

longitude: {
  type: Number,
  default: 0,
},

  pollutionType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  volunteerEmail: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "Pending",
  },
},
{
  timestamps: true,
}
);

const Report =
mongoose.models.Report ||
mongoose.model("Report", reportSchema);

export default Report;