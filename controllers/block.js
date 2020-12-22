const User = require("../models/User");

exports.postBlocks = (req, res) => {
  const { _id } = req.user;
  const { blocks } = req.body;
  User.findByIdAndUpdate(_id, { blocks }, { new: true })
    .then((user) => {
      return res.json({
        message: "blocks updated successfully",
        result: user.blocks,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong!",
      });
    });
};

exports.getAllBlocks = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      return res.json({
        message: "blocks retrieved successfully",
        result: user.blocks,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
