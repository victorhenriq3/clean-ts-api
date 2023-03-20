import { Router } from "express";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";

export default (router: Router):void => { 
    router.post('/surveys', adpatRoute(makeAddSurveyController()))
}