import mongoose from "mongoose";
import app from "./app";
import myConfig from "./myConfig";

async function main() {
  try {
    await mongoose.connect(myConfig.DBURL as string);

    app.listen(myConfig.port, () => {
      console.log(`Sports booking server running on port ${myConfig.port}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error);
  }
}

main();
