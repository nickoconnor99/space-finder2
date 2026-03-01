import type { Config } from "@jest/types";

const baseTestDir = "<rootDir>/space-finder2V4/tests";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [`${baseTestDir}/**/*.test.ts`],
};

export default config;
