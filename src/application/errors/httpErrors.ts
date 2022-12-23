export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError extends Error {
  constructor(error: any) {
    super(error?.message ?? "Forbidden");
    this.name = "ForbiddenError";
    this.stack = error?.stack;
  }
}
export class ServerError extends Error {
  constructor(error: any) {
    super("Internal Server Error");
    this.name = "ServerError";
    this.stack = error?.stack;
  }
}
export class MissingParamError extends Error {
  mensagem: string;
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.mensagem = `Missing param: ${paramName}`;
    this.name = "MissingParamError";
  }
}
export class InvalidParamError extends Error {
  mensagem: string;
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.mensagem = `Invalid param: ${paramName}`;
    this.name = "InvalidParamError";
  }
}
export class EmailInUseError extends Error {
  mensagem: string;
  constructor() {
    super("The received email is already in use");
    this.mensagem = "The received email is already in use";
    this.name = "EmailInUseError";
  }
}
export class AccessDeniedError extends Error {
  constructor() {
    super("Access denied");
    this.name = "AccessDeniedError";
  }
}
export class AuthenticationError extends Error {
  constructor() {
    super("Authentication failed");
    this.name = "AuthenticationError";
  }
}
