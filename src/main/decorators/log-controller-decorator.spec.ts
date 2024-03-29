import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository"
import { mockLogErrorRepository } from "@/data/test"
import { mockAccountModel } from "@/domain/test"
import { serverError, ok } from "@/presentation/helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"
import { LogControllerDecorator } from "./log-controller-decorator"

const makeServerError = (): HttpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
}

const makeFakeRequest = ():HttpRequest => ({
    body: {
          email: 'any_email@mail.com',
          name: 'any_name',
          password: 'any_password',
          passwordConfirmation: 'any_password'
    }
})

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            return Promise.resolve(ok(mockAccountModel()))
        }
    }
    return new ControllerStub()
}

type SutTypes =  {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
    
    const controllerStub = makeController()
    const logErrorRepositoryStub = mockLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

    return {
        sut, 
        controllerStub,
        logErrorRepositoryStub
    }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const {sut, controllerStub} = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(makeFakeRequest())
        expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
    })

    test('Should return the same result of the controller', async () => {
        const {sut} = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(mockAccountModel()))
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const {sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(makeServerError()))
        await sut.handle(makeFakeRequest())
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})  