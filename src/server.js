import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";
import BullBoard from "./app/lib/BullBoard";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/users", UserController.store);
app.use("/admin/queues", BullBoard.getRouter());

app.listen(port, () => {
  console.log(`Server running on the ${port}`);
});