const { Schema, model } = require("mongoose");

const documentSchema = new Schema(
    {
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
        upload: {
            type: String,
            required: [true, "Upload is required."],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        sending_date: {
            type: Date,
            default: Date.now, // Utiliser la date actuelle comme valeur par défaut. vue en cours
        },
    },
    {
        timestamps: true,
    }
);

const Document = model("Document", documentSchema);

module.exports = Document;
