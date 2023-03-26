import { badRequest } from "./components/bad-request";
import { notFound } from "./components/not-found";
import { serverError } from "./components/server-error";
import { unauthorized } from "./components/unauthorized";
import { loginPath } from "./paths/login-path";
import { accountSchema } from "./schemas/account-schema";
import { errorSchema } from "./schemas/error-schema";
import { loginParamsSchema } from "./schemas/login-params-schema";

export default {
    openapi: '3.0.0',
    info: {
        title: 'Clean node api',
        description: 'Api do curso do mango para realizar enquetes entre programadores',
        version: '1.0.0'
    },
    license: {
        name: 'ISC',
        url: 'https://opensource.org/license/isc-license-txt/'
    },
    servers: [{
        url: '/api'
    }],
    tags: [{
        name: 'Login'
    }],
    paths: {
        '/login': loginPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamsSchema,
        error: errorSchema
    },
    components: {
        badRequest: badRequest,
        serverError: serverError,
        unauthorized: unauthorized,
        notFound: notFound
    }
}