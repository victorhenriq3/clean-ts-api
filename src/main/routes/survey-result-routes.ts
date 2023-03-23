import { Router } from "express";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeSaveSurveyResultController } from "../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory";
import { auth } from "../middlewares";

export default (router: Router):void => { 
    router.put('/surveys/:surveyId/results', auth, adpatRoute(makeSaveSurveyResultController()))
}