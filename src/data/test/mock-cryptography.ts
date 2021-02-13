import { Encrypter } from './../protocols/criptography/encrypter'
import { HashComparer } from '../protocols/criptography/hash-comparer'

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  result: boolean = true
  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string
  result: string = 'encrypted_plaintext'
  encrypt (plaintext: string): string {
    this.plaintext = plaintext
    return this.result
  }
}
