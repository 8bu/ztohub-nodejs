import * as dotenv from "dotenv";

dotenv.config();
// let path;
// switch (process.env.NODE_ENV) {
//   case "test":
//     path = `${__dirname}/../../.env.test`;
//     break;
//   case "production":
//     path = `${__dirname}/../../.env.production`;
//     break;
//   default:
//     path = `${__dirname}/../../.env.development`;
// }
dotenv.config({ path: `${__dirname}/../../../.env` });

export const dbURL = process.env.dbURL;
export const secret = process.env.jsecret;
export const whiteList = process.env.whiteList.split(",");
export const LOG_LEVEL = process.env.LOG_LEVEL;
