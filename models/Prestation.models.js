const { Schema, model } = require("mongoose");

const prestationSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: 1,
        max: 500,
    },
    // slug: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    // },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Prestation = model("Prestation", prestationSchema);

module.exports = Prestation;
