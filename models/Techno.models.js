const { Schema, model } = require("mongoose");

const technoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Image URL is required."],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required."],
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "Subject is required."],
            trim: true,
        },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        // },
    },
    {
        timestamps: true,
    }
);

const Techno = model("Techno", technoSchema);

module.exports = Techno;
