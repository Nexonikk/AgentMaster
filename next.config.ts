import dotenv from "dotenv";
dotenv.config();

const nextConfig = {
  //...
  env: {
    RETELL_API_KEY: process.env.RETELL_API_KEY,
  },
};

export default nextConfig;
