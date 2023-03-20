import { Router } from "express";
import { adpatMiddleware } from "../adapters/express/express-middleware-adapter";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default (router: Router):void => { 
    const adminAuth = adpatMiddleware(makeAuthMiddleware('admin'))
    router.post('/surveys', adminAuth, adpatRoute(makeAddSurveyController()))
}