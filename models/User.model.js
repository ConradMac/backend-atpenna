const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            trim: true,
        },
        firstName: {
            type: String,
            required: [true, "First name is required."],
            trim: true,
        },
        address: {
            type: String,
            required: [true, "Address is required."],
            trim: true,
        },
        zipcode: {
            type: String,
            required: [true, "Zipcode is required."],
            trim: true,
        },
        city: {
            type: String,
            required: [true, "City is required."],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is required."],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        current_status: {
            type: String,
            enum: ["busy", "available"],
            default: "busy",
        },
        // slug: {
        //     type: String,
        //     unique: true,
        //     lowercase: true,
        //     trim: true,
        // },

        // utilisé pour les login logout :)
        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User",
        },
        // relation avec le user connected
        prestation: [
            {
                type: Schema.Types.ObjectId,
                ref: "Prestation",
            },
        ],
        techno: [
            {
                type: Schema.Types.ObjectId,
                ref: "Techno",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
