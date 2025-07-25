const mongoose = require("mongoose");

const dba = {
  conn: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  },
};

module.exports = dba;
