import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import {DbLoadSurveys} from './db-load-surveys'
import MockDate from 'mockdate'
import { mockSurveysModel, throwError } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'


type SutTypes = {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = ():SutTypes => {
    const loadSurveysRepositoryStub = mockLoadSurveysRepository()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

    return {
        sut,
        loadSurveysRepositoryStub
    }
}


describe('DbLoadSurveys', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveysRepository', async () => {
        const {sut, loadSurveysRepositoryStub} = makeSut()
        const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return a list of Surveys on success', async () => {
        const {sut, loadSurveysRepositoryStub} = makeSut()
        const surveys = await sut.load()
        expect(surveys).toEqual(mockSurveysModel())
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const {sut, loadSurveysRepositoryStub} = makeSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
            .mockImplementationOnce(throwError)
        const promise = sut.load()
        await expect(promise).rejects.toThrow()
    })
})