module.exports = {
    collectCoverageFrom: ["src/*/**.ts", "!src/**?(/*)index.ts?(x)"],
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    testMatch: ["**/?(*.)+(spec|test).+(ts)"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
};
