import { mockSurveyResultModel } from "@/domain/test"
import { SaveSurveyResultRepository } from "../protocols/db/survey-result/save-survey-result"
import { SaveSurveyResultParams, SurveyResultModel } from "../usecases/survey-result/save-survey-result/db-save-survey-result-protocols"

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository{
        async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(mockSurveyResultModel()))
        }

    }
    return new SaveSurveyResultRepositoryStub()
}