import { LoadSurveysController, LoadSurveys } from './load-survey-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { mockSurveysModel, throwError } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'


type SutTypes = {
    sut: LoadSurveysController
    loadSurveysStub: LoadSurveys
}


const makeSut = (): SutTypes => {
    const loadSurveysStub = mockLoadSurveys()
    const sut = new LoadSurveysController(loadSurveysStub)

    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveys', async () => {
        const {sut, loadSurveysStub} = makeSut()
        const loadSpy = jest.spyOn(loadSurveysStub, 'load')
       
        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    })

    test('Should return 200 on success', async () => {
        const {sut} = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(mockSurveysModel()))
    })

    test('Should return 500 if loadSurveys fails', async () => {
        const {sut, loadSurveysStub} = makeSut()
        jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 if loadSurveys return empty', async () => {
        const {sut, loadSurveysStub} = makeSut()
        jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve([])))
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    })
})