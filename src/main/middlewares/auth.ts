import { adpatMiddleware } from "../adapters/express/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export const auth = adpatMiddleware(makeAuthMiddleware())