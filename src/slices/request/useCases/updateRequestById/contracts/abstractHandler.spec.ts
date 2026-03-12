import { AbstractHandler } from "./abstractHandler";

class ConcreteHandler extends AbstractHandler {
  public handledRequest: any = null;
  override async handle(request: any): Promise<any> {
    this.handledRequest = request;
    return super.handle(request);
  }
}

class FinalHandler extends AbstractHandler {
  override async handle(request: any): Promise<any> {
    return { handled: true, request };
  }
}

describe("AbstractHandler", () => {
  it("should return null when no next handler is set", async () => {
    const handler = new ConcreteHandler();
    const result = await handler.handle({ data: "test" });
    expect(result).toBeNull();
  });

  it("should delegate to next handler when setNext is called", async () => {
    const handler = new ConcreteHandler();
    const finalHandler = new FinalHandler();
    handler.setNext(finalHandler);
    const result = await handler.handle({ data: "test" });
    expect(result).toEqual({ handled: true, request: { data: "test" } });
  });

  it("should return the next handler from setNext", () => {
    const handler = new ConcreteHandler();
    const nextHandler = new ConcreteHandler();
    const result = handler.setNext(nextHandler);
    expect(result).toBe(nextHandler);
  });

  it("should chain multiple handlers", async () => {
    const handler1 = new ConcreteHandler();
    const handler2 = new ConcreteHandler();
    const finalHandler = new FinalHandler();
    handler1.setNext(handler2);
    handler2.setNext(finalHandler);
    const result = await handler1.handle({ data: "test" });
    expect(result).toEqual({ handled: true, request: { data: "test" } });
    expect(handler1.handledRequest).toEqual({ data: "test" });
    expect(handler2.handledRequest).toEqual({ data: "test" });
  });

  it("should allow chaining setNext calls", () => {
    const handler1 = new ConcreteHandler();
    const handler2 = new ConcreteHandler();
    const handler3 = new FinalHandler();
    handler1.setNext(handler2).setNext(handler3);
  });
});
