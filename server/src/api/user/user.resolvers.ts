import UserModel from "./user.model";
import { User } from "./user.types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
dotenv.config();

const userResolvers = {
  Query: {
    getUserInfo: async (_, { ...args }): Promise<User> => {
      let email = args.email;
      return (
        await UserModel.aggregate([
          {
            $match: { email },
          },
          {
            $lookup: {
              from: "role-permissions",
              localField: "role",
              foreignField: "role_id",
              as: "rolePermissions",
            },
          },
          {
            $unwind: "$rolePermissions",
          },
          {
            $lookup: {
              from: "permissions",
              localField: "rolePermissions.permission_id",
              foreignField: "_id",
              as: "rolePermissionsDetails",
            },
          },
          {
            $lookup: {
              from: "roles",
              localField: "rolePermissions.role_id",
              foreignField: "_id",
              as: "roleDetails",
            },
          },
          {
            $unwind: "$rolePermissionsDetails",
          },
          {
            $unwind: "$roleDetails",
          },
          {
            $group: {
              _id: "$_id",
              firstName: { $first: "$firstName" },
              lastName: { $first: "$lastName" },
              email: { $first: "$email" },
              DOB: { $first: "$DOB" },
              phoneNumber: { $first: "$phoneNumber" },
              roles: { $addToSet: "$roleDetails.role" },
              location: { $first: "$location" },
              permissions: { $addToSet: "$rolePermissionsDetails.permission" },
            },
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
              DOB: 1,
              phoneNumber: 1,
              roles: 1,
              permissions: 1,
              location: 1,
            },
          },
        ])
      )[0] as User;
    },
  },
  Mutation: {
    createNewUser: async (_, { ...args }) => {
      let userObject = JSON.parse(JSON.stringify(args)).userInput;
      if (
        userObject?.password?.trim() === "" ||
        userObject?.confirmPassword?.trim() === ""
      ) {
        throw new Error("Password and Confirm Password cannot be empty");
      }

      if (
        userObject?.password?.trim() !== userObject?.confirmPassword?.trim()
      ) {
        throw new Error("Password and Confirm password is not matched");
      }

      if (userObject?.role) {
        userObject["role"] = [userObject["role"]];
      }

      let saltRounds = await bcrypt.genSalt(
        Number(process.env.SALT_ROUND) as number
      );
      userObject["password"] = await bcrypt.hash(
        userObject["password"],
        saltRounds
      );
      const newUser = await new UserModel(userObject).save();
      return newUser;
    },
    updateUser: async (_, { ...args }) => {
      let userObject = JSON.parse(JSON.stringify(args)).userInput;
      let email = userObject["email"];
      if (email === null || !email) {
        throw new Error("Missing required parameter - email");
      }

      if (userObject["password"]) {
        const userInfo = await UserModel.findOne({ email }).lean().exec();

        if (!userInfo) {
          throw new Error("Invalid email provided");
        }
        let isOldPasswordMatch = await bcrypt.compare(
          userObject.password,
          userInfo.password
        );
        if (!isOldPasswordMatch) {
          throw new Error("Old password is not matched");
        }

        let saltRounds = await bcrypt.genSalt(
          Number(process.env.SALT_ROUND) as number
        );
        userObject["password"] = await bcrypt.hash(
          userObject["password"],
          saltRounds
        );
      }

      const updatedUserInfo = await UserModel.findOneAndUpdate(
        { email },
        { ...userObject },
        { new: true }
      );
      return updatedUserInfo;
    },
  },
};

export default userResolvers;
