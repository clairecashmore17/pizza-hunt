const { Schema, model } = require("mongoose");

//creating our model schema
const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [],
});

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export our Pizza Model
module.exports = Pizza;
