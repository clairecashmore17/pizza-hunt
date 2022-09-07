const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//creating our model schema
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
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
  return this.comments.length;
});

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export our Pizza Model
module.exports = Pizza;
