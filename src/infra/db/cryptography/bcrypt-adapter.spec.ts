import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  }
}))

type SutTypes = {
  sut: BcryptAdapter
}

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter()
  return {
    sut
  }
}

describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
    test('should call compare with correct values', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('should return true if compare succeeds', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })
  })
})
