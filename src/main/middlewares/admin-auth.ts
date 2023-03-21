import { adpatMiddleware } from "../adapters/express/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export const adminAuth = adpatMiddleware(makeAuthMiddleware('admin'))