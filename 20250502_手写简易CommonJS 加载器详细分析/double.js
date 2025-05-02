const { add } = require("./add.js");

const double = (a, b) => 2 * add(a, b);

// exports.double = double;

module.exports = {
  double,
};
