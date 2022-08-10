import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import Queue from "./Queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
  queues: Queue.queues.map( queue => new BullMQAdapter(queue.bull)),
  serverAdapter: serverAdapter
});

export default serverAdapter;