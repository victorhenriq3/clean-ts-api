import { Decrypter } from "@/data/protocols/criptography/decrypter"
import { Encrypter } from "@/data/protocols/criptography/encrypter"
import { HashCompare } from "@/data/protocols/criptography/hash-compare"
import { Hasher } from "@/data/protocols/criptography/hasher"

export const mockHasher = (): Hasher => {
    class HasherStub implements Hasher{
        async hash(value: string): Promise<string>{
            return Promise.resolve('hashed_password')
        }
    }

    return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
    class DecryptedStub implements Decrypter{
        async decrypt(value: string): Promise<string> {
            return Promise.resolve('any_value')
        }
    }
    return new DecryptedStub()
}

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string>{
            return Promise.resolve('any_token')
        }
    }

    return new EncrypterStub()
}

export const mockHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare{
        async compare(value: string, hash: string): Promise<boolean>{
            return Promise.resolve(true)
        }
    }
    return new HashCompareStub()
}
