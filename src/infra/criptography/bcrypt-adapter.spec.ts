import bcrypt from 'bcrypt'
import { BcrytpAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcrytpAdapter => {
  return new BcrytpAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('sould call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = makeSut()
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('sould return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
