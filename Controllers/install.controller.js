// import the installation model
const Installation = require("../Services/install.service");

// create a function for installation
const install = async (req, res, next) => {
  // call the install service to create the database
  const instalMessage = await Installation.install();

  if (instalMessage.status === 200) {
    res.status(200).json({
      message: instalMessage,
    });
  } else {
    res.status(500).json({
      message: instalMessage,
    });
  }
};

module.exports = {
  install
};
