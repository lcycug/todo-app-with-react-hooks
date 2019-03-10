module.exports =
  process.env.NODE_PATH === "production"
    ? require("./prod_keys")
    : require("./dev_keys");
