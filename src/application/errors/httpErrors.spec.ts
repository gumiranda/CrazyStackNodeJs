import {
  UnauthorizedError,
  ForbiddenError,
  ServerError,
  MissingParamError,
  InvalidParamError,
  EmailInUseError,
  AccessDeniedError,
  AuthenticationError,
} from "./httpErrors";

describe("HttpErrors", () => {
  describe("UnauthorizedError", () => {
    it("should set message to 'Unauthorized'", () => {
      const error = new UnauthorizedError();
      expect(error.message).toBe("Unauthorized");
    });
    it("should set name to 'UnauthorizedError'", () => {
      const error = new UnauthorizedError();
      expect(error.name).toBe("UnauthorizedError");
    });
    it("should be instance of Error", () => {
      expect(new UnauthorizedError()).toBeInstanceOf(Error);
    });
  });
  describe("ForbiddenError", () => {
    it("should set message from error object", () => {
      const error = new ForbiddenError({ message: "Custom forbidden" });
      expect(error.message).toBe("Custom forbidden");
    });
    it("should set message to 'Forbidden' when error has no message", () => {
      const error = new ForbiddenError({});
      expect(error.message).toBe("Forbidden");
    });
    it("should set message to 'Forbidden' when error is null", () => {
      const error = new ForbiddenError(null);
      expect(error.message).toBe("Forbidden");
    });
    it("should set stack from error object", () => {
      const stack = "Error: test\n    at Test";
      const error = new ForbiddenError({ stack });
      expect(error.stack).toBe(stack);
    });
    it("should set name to 'ForbiddenError'", () => {
      expect(new ForbiddenError(null).name).toBe("ForbiddenError");
    });
    it("should be instance of Error", () => {
      expect(new ForbiddenError(null)).toBeInstanceOf(Error);
    });
  });
  describe("ServerError", () => {
    it("should set message to 'Internal Server Error'", () => {
      const error = new ServerError(null);
      expect(error.message).toBe("Internal Server Error");
    });
    it("should set stack from error object", () => {
      const stack = "Error: test\n    at Test";
      const error = new ServerError({ stack });
      expect(error.stack).toBe(stack);
    });
    it("should set name to 'ServerError'", () => {
      expect(new ServerError(null).name).toBe("ServerError");
    });
    it("should be instance of Error", () => {
      expect(new ServerError(null)).toBeInstanceOf(Error);
    });
  });
  describe("MissingParamError", () => {
    it("should set message with param name", () => {
      const error = new MissingParamError("field");
      expect(error.message).toBe("Missing param: field");
    });
    it("should set mensagem property", () => {
      const error = new MissingParamError("field");
      expect(error.mensagem).toBe("Missing param: field");
    });
    it("should set name to 'MissingParamError'", () => {
      expect(new MissingParamError("field").name).toBe("MissingParamError");
    });
    it("should be instance of Error", () => {
      expect(new MissingParamError("field")).toBeInstanceOf(Error);
    });
  });
  describe("InvalidParamError", () => {
    it("should set message with param name", () => {
      const error = new InvalidParamError("email");
      expect(error.message).toBe("Invalid param: email");
    });
    it("should set mensagem property", () => {
      const error = new InvalidParamError("email");
      expect(error.mensagem).toBe("Invalid param: email");
    });
    it("should set name to 'InvalidParamError'", () => {
      expect(new InvalidParamError("email").name).toBe("InvalidParamError");
    });
    it("should be instance of Error", () => {
      expect(new InvalidParamError("email")).toBeInstanceOf(Error);
    });
  });
  describe("EmailInUseError", () => {
    it("should set message", () => {
      const error = new EmailInUseError();
      expect(error.message).toBe("The received email is already in use");
    });
    it("should set mensagem property", () => {
      const error = new EmailInUseError();
      expect(error.mensagem).toBe("The received email is already in use");
    });
    it("should set name to 'EmailInUseError'", () => {
      expect(new EmailInUseError().name).toBe("EmailInUseError");
    });
    it("should be instance of Error", () => {
      expect(new EmailInUseError()).toBeInstanceOf(Error);
    });
  });
  describe("AccessDeniedError", () => {
    it("should set message to 'Access denied'", () => {
      const error = new AccessDeniedError();
      expect(error.message).toBe("Access denied");
    });
    it("should set name to 'AccessDeniedError'", () => {
      expect(new AccessDeniedError().name).toBe("AccessDeniedError");
    });
    it("should be instance of Error", () => {
      expect(new AccessDeniedError()).toBeInstanceOf(Error);
    });
  });
  describe("AuthenticationError", () => {
    it("should set message to 'Authentication failed'", () => {
      const error = new AuthenticationError();
      expect(error.message).toBe("Authentication failed");
    });
    it("should set name to 'AuthenticationError'", () => {
      expect(new AuthenticationError().name).toBe("AuthenticationError");
    });
    it("should be instance of Error", () => {
      expect(new AuthenticationError()).toBeInstanceOf(Error);
    });
  });
});
