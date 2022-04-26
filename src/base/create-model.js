import mongoose from "mongoose";
export const createModel = (modelName, modelFieldDeclare) => {
  mongoose.model(modelName, modelFieldDeclare);
};
