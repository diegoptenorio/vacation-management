// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/app/"],
  testMatch: ["**/test.ts", "**/test.tsx"],
  modulePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = createJestConfig(customJestConfig);