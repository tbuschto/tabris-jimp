import {Listeners} from 'tabris';

export abstract class WorkerExt<Incoming, Outgoing> {

  onMessage: Listeners<{target: WorkerExt<Incoming, Outgoing>, data: Readonly<Incoming>}>
    = new Listeners(this, 'message');

  private requestQueue: Promise<unknown> = Promise.resolve();

  constructor(
    private self: Worker
  ) {
    this.self.onmessage = this.handleMessage.bind(this);
    this.self.onerror = () => this.log(new Error('Worker Internal Error'));
    this.self.onmessageerror = () => this.log(new Error('Worker Message Error'));
  }

  protected abstract log(msg: string | Error): void;

  /**
   * Post a message that expects a response.
   * One one request can be active at any given time.
   */
  protected async postAsync<Result>(
    message: Outgoing,
    getResult: (message: Incoming) => Result
  ): Promise<Exclude<Result, undefined | null | false>> {
    let result: Result | false = null;
    const promise = this.requestQueue.then(async () => {
      while (result == null || result === false) {
        const ev = await this.onMessage.promise();
        result = getResult(ev.data);
      }
    });
    this.post(message);
    this.requestQueue = promise.catch(() => null);
    await promise;
    return result as Exclude<Result, undefined | null | false>;
  }

  /**
   * Post a message with no defined response
   */
  protected post(message: Outgoing) {
    this.self.postMessage(message);
  }

  private async handleMessage({data}: MessageEvent) {
    try {
      console.log('handle', data);
      await this.onMessage.triggerAsync({data});
    } catch (ex) {
      this.log(ex);
    }
  }

}
