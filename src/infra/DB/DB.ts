import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME || "database_1",
  username: process.env.DB_USER || "user_1",
  password: process.env.DB_PASSWORD || "password_1",
  port: parseInt(process.env.DB_PORT!) || 3307,
  host: process.env.DB_HOST || "localhost",
  logging: false,
  define: {
    timestamps: false,
  },
});

sequelize.authenticate().then(() => {
  console.log("Connected to MySQL database");
});

export default sequelize;
