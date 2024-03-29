
import { MissingParamError } from "@/presentation/errors"
import { RequiredFieldValidation } from "./required-filed-validation"

const makeSut = ():RequiredFieldValidation => {
    return new RequiredFieldValidation('field')
}

describe('Required Field Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({ name: 'any_name' })
        expect(error).toEqual(new MissingParamError('field'))
    })

    test('Should not return if validation success', () => {
        const sut = makeSut()
        const error = sut.validate({ field: 'any_name' })
        expect(error).toBeFalsy()
    })
})