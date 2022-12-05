
const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    ,
    isAvailable: {
        type: Boolean,
        default: true
    }

});



ticketSchema.methods.belongsTo = function(user) {
    return this.user._id.toString() === user._id.toString();
};

ticketSchema.methods.buy = async function(user) {
    this.user = user;
    await this.save();
};

    




module.exports = mongoose.model("ticket", ticketSchema);
