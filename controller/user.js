import UserDisplay from "../models/userModels.js";

//function for finding all users
export const getUser = async (req, res) => {
  UserDisplay.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

export const postUser = async (req, res) => {
  try {
    //extract info from reques
    const user = req.body;
    //check if user exists
    const userCheck = await UserDisplay.findOne({ email: user.email })
      .select("email")
      .lean();
    if (userCheck) {
      console.log("User already exists");
    } else {
      console.log("User Created");
      //pass infro through the model
      const newUser = new UserDisplay(user);
      //save into database
      await newUser.save();
    }
    res.json(user);
  } catch (error) {
    console.log("error in user controller.js", error);
  }
};
