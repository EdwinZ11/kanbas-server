import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = async (courseId) => {
    return model.find({ course: courseId });
  };

  const findAssignmentById = async (assignmentId) => {
    return model.findById(assignmentId);
  };

  const createAssignment = async (assignment) => {
    const { _id, ...assignmentWithoutId } = assignment;
    const newAssignment = {
      ...assignmentWithoutId,
      _id: uuidv4(),
    };
    return model.create(newAssignment);
  };

  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    return model.findById(assignmentId);
  };

  const deleteAssignment = async (assignmentId) => {
    return model.deleteOne({ _id: assignmentId });
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}