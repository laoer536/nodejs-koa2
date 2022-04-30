const { Schema, model } = require("mongoose");

const CompletedSchema = new Schema(
  {
    name: { type: String, required: true },
    sex: { type: Number, enum: [0, 1], required: true },
    phone: { type: String, required: true },
  },
  { collection: "users", versionKey: false, timestamps: true }
);

export const UserForm = model("UserForm", CompletedSchema);
