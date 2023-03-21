import { Router } from "express";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";
import { makeLoadSurveysController } from "../factories/controllers/survey/load-surveys/load-surveys-controller-factory";
import { adminAuth, auth } from "../middlewares";

export default (router: Router):void => { 
    router.post('/surveys', adminAuth, adpatRoute(makeAddSurveyController()))
    router.get('/surveys', auth, adpatRoute(makeLoadSurveysController()))
}