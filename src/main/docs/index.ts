import { badRequest } from "./components/bad-request";
import { forbidden } from "./components/forbidden";
import { notFound } from "./components/not-found";
import { serverError } from "./components/server-error";
import { unauthorized } from "./components/unauthorized";
import { loginPath } from "./paths/login-path";
import { signupPath } from "./paths/singup-path";
import { surveyPath } from "./paths/surveys-path";
import { accountSchema } from "./schemas/account-schema";
import { addSurveyParamsSchema } from "./schemas/add-survey-params-schema";
import { apiKeyAuthSchema } from "./schemas/api-key-auth-schema";
import { errorSchema } from "./schemas/error-schema";
import { loginParamsSchema } from "./schemas/login-params-schema";
import { signupParamsSchema } from "./schemas/singup-params-schema";
import { surveyAnswerSchema } from "./schemas/survey-answer-schema";
import { surveySchema } from "./schemas/survey-schema";
import { surveysSchema } from "./schemas/surveys-schema";

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
    }, {
        name: 'Enquete',
    }],
    paths: {
        '/login': loginPath,
        '/surveys': surveyPath,
        '/signup': signupPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamsSchema,
        error: errorSchema,
        survey: surveySchema,
        surveys: surveysSchema,
        surveyAnswer: surveyAnswerSchema,
        signupSchemas: signupParamsSchema,
        addSurveyParams: addSurveyParamsSchema
    },
    components: {
        securitySchemes: {
            apiKeyAuth: apiKeyAuthSchema
        },
        badRequest: badRequest,
        serverError: serverError,
        unauthorized: unauthorized,
        notFound: notFound,
        forbidden: forbidden
    }
}