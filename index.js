const mongoose = require("mongoose");

// connect with mongodb bu mongoose

mongoose
  .connect("mongodb://localhost:27017/my-devTeam")
  .then(() => console.log("Mongodb successfully connected !"))
  .catch((err) => console.log("Sorry database is not connected"));

//  define the shape of mongoose schema

const schemaShape = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  name: {
    type: String,
    required: [true, "Name is must required !"],
  },
  age: {
    type: Number,
    min: 20,
    max: 32,
    required: [true, "Age is must required !"],
  },
  gender: { type: String, required: [true, "Gender is must required !"] },
  dob: {
    type: Date,
    validate: {
      validator: (value) => value > new Date("1 January 1990"),
      message: "Date of birth cross the boundery !",
    },
  },
  division: { type: String, required: [true, "Division is must required !"] },
  skill: {
    type: Array,
    of: String,
    validate: {
      validator: (value) => value.length > 0,
      message: "must one skill required !",
    },
  },
  result: [
    {
      name: String,
      score: { type: Number, min: 10, max: 100 },
    },
  ],
  father: {
    type: String,
    required: [true, "Father name is required !"],
  },
  mother: {
    type: String,
    required: [true, "Mother name is required !"],
  },
});

// define mongoose model

const People = mongoose.model("candidate", schemaShape);

// create and insert data into database

async function createData() {
  try {
    let data = await People.create({
      name: "Lokman Ali",
      age: 27,
      gender: "Male",
      dob: new Date("1 Jun 1996"),
      division: "Dhaka",
      skill: ["C++", "C#", "Java"],
      result: [{ name: "ICT", score: 50 }],
      father: "Kalam Islam",
      mother: "Amena begum",
    });
    console.log(data);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }
}

// read data from database

async function readData() {
  let userData = await People.find()
    .limit(2)
    .select({ name: 1, dob: 1, father: 1, mother: 1 });
  console.log(userData);
}

// update data from database

async function updateData(id, Division) {
  let userData = await People.updateOne(
    { _id: id },
    { $set: { division: Division } }
  );
  console.log(userData);
}

// delete data from database

async function deleteData(id) {
  const studentData = await Student.deleteOne({ _id: id });
  console.log(studentData);
}
