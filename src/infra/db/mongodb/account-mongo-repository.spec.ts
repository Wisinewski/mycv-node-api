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

  describe('updateAccessToken()', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount._id.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
})
