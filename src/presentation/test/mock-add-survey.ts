import { AddSurvey, AddSurveyParams } from "../controllers/survey/add-survey/add-survey-controller-protocols"

export const mockAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
       async add(data: AddSurveyParams): Promise<void> {
            return new Promise(resolve => resolve())
        }            
    }
    return new AddSurveyStub()
}