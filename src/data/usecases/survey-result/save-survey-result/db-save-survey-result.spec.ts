import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { mockSaveSurveyResultParams, mockSurveyResultModel, throwError } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test/mock-db-survey-result'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepository = mockSaveSurveyResultRepository()
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
        const surveyResultData = mockSaveSurveyResultParams()
        await sut.save(surveyResultData)
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const {sut, saveSurveyResultRepository} = makeSut()
        jest.spyOn(saveSurveyResultRepository, 'save')
            .mockImplementationOnce(throwError)
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return a SurveyResult on success', async () => {
        const {sut } = makeSut()
        const surveyResult = await sut.save(mockSaveSurveyResultParams())
        expect(surveyResult).toEqual(mockSurveyResultModel())
    })
})