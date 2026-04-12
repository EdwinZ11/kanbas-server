import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function UsersDao() {
  const createUser = async (user) => {
    const { _id, ...userWithoutId } = user;
    const newUser = { ...userWithoutId, _id: uuidv4() };
    return await model.create(newUser);
  };

  const findAllUsers = async () => {
    return await model.find();
  };

  const findUserById = async (userId) => {
    return await model.findById(userId);
  };

  const findUserByUsername = async (username) => {
    return await model.findOne({ username });
  };

  const findUserByCredentials = async (username, password) => {
    return await model.findOne({ username, password });
  };

  const findUsersByRole = async (role) => {
    return await model.find({ role });
  };

  const findUsersByPartialName = async (partialName) => {
    const regex = new RegExp(partialName, "i");
    return await model.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ],
    });
  };

  const updateUser = async (userId, user) => {
    return await model.updateOne({ _id: userId }, { $set: user });
  };

  const deleteUser = async (userId) => {
    return await model.findByIdAndDelete(userId);
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser,
  };
}