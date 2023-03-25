import { AddSurvey, AddSurveyParams } from "../controllers/survey/add-survey/add-survey-controller-protocols"

export const mockAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
       async add(data: AddSurveyParams): Promise<void> {
            return Promise.resolve()
        }            
    }
    return new AddSurveyStub()
}