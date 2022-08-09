import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";
import { setQueues, BullAdapter, router } from "bull-board";
import Queue from "./app/lib/Queue";

const app = express();
const port = process.env.PORT;

setQueues(Queue.queues.map(
  queue => new BullAdapter(queue.bull)
));

app.use(express.json());

app.post("/users", UserController.store);
app.use("/admin/queues", router);

app.listen(port, () => {
  console.log(`Server running on the ${port}`)
});