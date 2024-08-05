export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  testTimeout: 10000,
  moduleFileExtensions: ["js", "jsx", "mjs"],
};
