import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  permission: {
    type: Array,
    required: true,
  },
});

const permissionModel = mongoose.model("roles", permissionSchema);
export default permissionModel;
