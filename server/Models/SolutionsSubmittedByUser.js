const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({

    coderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    problemId  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problems",
    },
    verdict : {
        type : String,
        enum : ["accepted","wrong answer"],
    },
    submitted_at : {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("SolutionsSubmittedByUser",SolutionSchema);
