import { throwError } from './../../../domain/test/test-helper'
import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'encrypted_value'
  }
}))

type SutTypes = {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return {
    sut
  }
}

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('should call sign with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
    })

    test('should throw if sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_value')
      expect(promise).rejects.toThrow()
    })

    test('should return a token on sign success ', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt('any_value')
      expect(accessToken).toBe('encrypted_value')
    })
  })
})
