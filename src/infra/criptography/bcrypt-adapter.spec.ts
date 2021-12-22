import bcrypt from 'bcrypt'
import { BcrytpAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('sould call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcrytpAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('sould return a hash on success', async () => {
    const salt = 12
    const sut = new BcrytpAdapter(salt)

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
