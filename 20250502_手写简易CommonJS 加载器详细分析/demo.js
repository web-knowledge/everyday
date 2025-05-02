const customRequire = require("./custom-require.js");
const { double } = customRequire("./double.js");

console.log(double(1, 2));
