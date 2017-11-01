#!/usr/bin/env ./node_modules/.bin/babel-node
require("babel-core").transform("code", {
  presets: ["env"]
});

require('./client')