import { Queue, Worker, QueueScheduler } from "bullmq";
import redisConfig from "../../config/redis";
import * as jobs from "../jobs";

const queues = Object.values(jobs).map( job => ({
  bull: new Queue(job.queueName, redisConfig),
  name: job.queueName,
  jobName: job.name,
  handle: job.handle,
  options: job.options
}));

export default {
  queues,
  add(name, data, options) {
    const queue = this.queues.find(queue => queue.name === name );
    return queue.bull.add(queue.jobName, data, options || queue.options);
  },
  process() {
    this.queues.forEach( queue => {
      const worker = new Worker(queue.bull.name, queue.handle, redisConfig);
      
      worker.on("completed", (job, result) => {
        console.log("Job completed!", job.data);
        console.log(job.data);
      });

      worker.on("failed", (job, err) => {
        console.log("Job failed!", job.queueName, job.data);
        console.log(err);
        this.repeatJob(job);
      });
    });
  },
  repeatJob(job) {
    const opts = job.opts;
    opts.priority = 1;
    this.add(job.queue.name, job.data, opts);
  }
}