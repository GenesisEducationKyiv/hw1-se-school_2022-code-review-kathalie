// import type { Config } from "@jest/types";
// export default async (): Promise<Config.InitialOptions> => {
//     return {
//         preset: "ts-jest",
//         displayName: {
//             name: "Rate API",
//             color: "greenBright",
//         },
//         verbose: true,
//         testEnvironment: "node",
//         detectOpenHandles: true,
//         collectCoverage: true,
//         forceExit: true,
//
//         //moduleDirectories: ['node-modules', '<rootDir>/'],
//     };
// };

export default {
    preset: "ts-jest",
    moduleDirectories: ['node-modules', '<rootDir>/'],
}