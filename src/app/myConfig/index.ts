import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  DBURL: process.env.DBURL,
  NODE_ENV: process.env.NODE_ENV,
  SALT_ROUND: process.env.BC_SALT,
  JWT_ACCESS_SECRET: process.env.JWT_ACC_SECRET,
  JWT_ACCESS_DURATION: process.env.JWT_ACC_DURATION,
};
