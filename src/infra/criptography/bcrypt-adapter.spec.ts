import bcrypt from 'bcrypt'
import { BcrytpAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('sould call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcrytpAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
