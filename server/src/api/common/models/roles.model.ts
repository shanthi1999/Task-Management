import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role: {
    type: Array,
    required: true,
  },
});

const rolesModel = mongoose.model("roles", roleSchema);
export default rolesModel;
