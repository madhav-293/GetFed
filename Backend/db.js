const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Madhav1:Madhav@cluster.nt2dzgi.mongodb.net/GetFed?retryWrites=true&w=majority";
async function mongoDB() {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find().toArray();
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const category = await foodCategory.find().toArray();

    global.food_items = data;
    global.foodCategory = category;
    // console.log(global.food_items);
  } catch (err) {
    console.log(err);
  }
}
module.exports = mongoDB;
