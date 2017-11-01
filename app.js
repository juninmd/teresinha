#!/usr/bin/env babel-node
require("babel-core").transform("code", {
  presets: ["env"]
});
require('./client')