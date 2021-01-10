import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
});

const user = mongoose.model("User", UserSchema);

export { user as default };