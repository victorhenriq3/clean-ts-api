import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { throwError } from '@/domain/test'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
})

const makeFakeSurveyResult = ():SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), {
    id: 'any_id'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository{
        async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(makeFakeSurveyResult()))
        }

    }
    return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepository = makeSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepository)

    return {
        sut,
        saveSurveyResultRepository
    }
}

describe('DbSaveSurveyResult UseCase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const {sut, saveSurveyResultRepository} = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultRepository, 'save')
        const surveyResultData = makeFakeSurveyResultData()
        await sut.save(surveyResultData)
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const {sut, saveSurveyResultRepository} = makeSut()
        jest.spyOn(saveSurveyResultRepository, 'save')
            .mockImplementationOnce(throwError)
        const promise = sut.save(makeFakeSurveyResultData())
        await expect(promise).rejects.toThrow()
    })

    test('Should return a SurveyResult on success', async () => {
        const {sut } = makeSut()
        const surveyResult = await sut.save(makeFakeSurveyResultData())
        expect(surveyResult).toEqual(makeFakeSurveyResult())
    })
})