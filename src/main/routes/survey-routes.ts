import { Router } from "express";
import { adpatMiddleware } from "../adapters/express/express-middleware-adapter";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";
import { makeLoadSurveysController } from "../factories/controllers/survey/load-surveys/load-surveys-controller-factory";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default (router: Router):void => { 
    const adminAuth = adpatMiddleware(makeAuthMiddleware('admin'))
    const auth = adpatMiddleware(makeAuthMiddleware())
    router.post('/surveys', adminAuth, adpatRoute(makeAddSurveyController()))
    router.get('/surveys', auth, adpatRoute(makeLoadSurveysController()))
}