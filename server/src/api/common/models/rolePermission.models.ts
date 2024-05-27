import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Types.ObjectId,
    ref: "roles",
  },
  permission_id: {
    type: mongoose.Types.ObjectId,
    ref: "permissions",
  },
});

const rolePermissionsModel = mongoose.model(
  "role-permissions",
  rolePermissionSchema
);

export default rolePermissionsModel;
