const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//creating our model schema
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      // the required field can be set to true for auto message, or set to true by puttin gin your own message!
      required: "You must provide a pizza name!",
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //using a getter to tranform our data by defulat every time it is queried
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  //This tells the schema that it is allowed to use virtuals and getters
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export our Pizza Model
module.exports = Pizza;
