import { SurveyResultModel } from "../models/survey-result"
import { SaveSurveyResultParams } from "../usecases/survey-result/save-survey-result"

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
})

export const mockSurveyResultModel = ():SurveyResultModel => Object.assign({}, mockSaveSurveyResultParams(), {
    id: 'any_id'
})
