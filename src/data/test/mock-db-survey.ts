import { SurveyModel } from "@/domain/models/survey"
import { mockSurveyModel, mockSurveysModel } from "@/domain/test"
import { AddSurveyRepository } from "../protocols/db/survey/add-survey-repository"
import { LoadSurveyByIdRepository } from "../protocols/db/survey/load-survey-by-id-repository"
import { LoadSurveysRepository } from "../protocols/db/survey/load-surveys-repository"
import { AddSurveyParams } from "../usecases/survey/add-survey/db-add-survey-protocols"

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository{
        async add(surveyData: AddSurveyParams): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(mockSurveyModel()))
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}



export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll(): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(mockSurveysModel()))
        }
    }
    return new LoadSurveysRepositoryStub()
}
