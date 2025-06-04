module.exports = {
  spec_dir: "spec",
  spec_files: [
    "**/*[sS]pec.ts"
  ],
  helpers: [
    "helpers/**/*.ts"
  ],
  require: ["ts-node/register"],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
    forbidDuplicateNames: true
  }
};
