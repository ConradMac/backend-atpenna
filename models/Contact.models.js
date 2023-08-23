const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is required."],
            trim: true,
        },

        subject: {
            type: String,
            required: [true, "Subject is required."],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required."],
            trim: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
