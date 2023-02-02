const asyncHandler = require("express-async-handler");


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).redirect('http://localhost:3000/');
  })

  module.exports = logoutUser