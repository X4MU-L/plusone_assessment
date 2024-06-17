class ServerError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message.replace(/"/g, ""));
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export { ServerError };
