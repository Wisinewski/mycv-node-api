import { HashComparer } from '../protocols/criptography/hash-comparer'

export class HashComparerSpy implements HashComparer {
  plainText: string
  digest: string
  result: boolean = true
  async compare (plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText
    this.digest = digest
    return this.result
  }
}
