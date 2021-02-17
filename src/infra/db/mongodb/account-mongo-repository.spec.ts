import { AccountMongoRepository } from './account-mongo-repository'
import { mockAddAccountParams } from './../../../domain/test/mock-account'
import { Collection } from 'mongodb'
import { MongoHelper } from './mongo-helper'
import env from '../../../main/config/env'

const makeSut = (): AccountMongoRepository => {
  const sut = new AccountMongoRepository()
  return sut
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('loadByEmail()', () => {
    test('should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadAccountByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
    })

    test('should return null on fails', async () => {
      const sut = makeSut()
      const account = await sut.loadAccountByEmail('unregistered_email')
      expect(account).toBeFalsy()
    })
  })
})
