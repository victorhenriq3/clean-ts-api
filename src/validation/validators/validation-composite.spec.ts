
import { MissingParamError } from "@/presentation/errors"
import { Validation } from "@/presentation/protocols/validation"
import { mockValidation } from "../test"
import { ValidationComposite } from "./validation-composite"

type SutTypes = {
    sut: ValidationComposite
    validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
    const validationStubs = [
        mockValidation(), 
        mockValidation()
    ]
    const sut = new ValidationComposite(validationStubs)

    return {
        sut,
        validationStubs
    }
}

describe('ValidationComposite', () => {
    test('Should return an error if validation fails', () => {
        const {sut, validationStubs} = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
        const error = sut.validate({field: 'any_value'})
        expect(error).toEqual(new MissingParamError('field'))
    })
    
    test('Should return the first error mor than one validation fails', () => {
        const {sut, validationStubs} = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
        const error = sut.validate({field: 'any_value'})
        expect(error).toEqual(new Error())
    })
    
    test('Should not return if validation succeeds', () => {
        const {sut} = makeSut()
        const error = sut.validate({field: 'any_value'})
        expect(error).toBeFalsy()
    })
})