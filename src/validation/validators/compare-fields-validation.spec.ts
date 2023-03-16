import { InvalidParamError } from "../../presentation/errors"
import { CompareFieldsValidation } from "./compare-fields-validation"

const makeSut = ():CompareFieldsValidation => {
    return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation', () => {
    test('Should return a iNVALIDParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({ 
            field: 'any_value',
            fieldToCompare: 'wrong_value'
         })
        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    })

    test('Should not return if validation success', () => {
        const sut = makeSut()
        const error = sut.validate({ 
            field: 'any_name',
            fieldToCompare: 'any_name',
         })
        expect(error).toBeFalsy()
    })
})