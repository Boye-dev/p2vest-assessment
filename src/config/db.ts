import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
export const connectDb = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    // await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
