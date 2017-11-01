#!/usr/bin/env ./node_modules/.bin/babel-node
require("./node_modules/babel-core").transform("code", {
  presets: ["env"],
  plugins: ["shebang"]
});
require('./client')