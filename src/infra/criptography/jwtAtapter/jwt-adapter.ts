import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { Encrypter } from "@/data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter, Decrypter {
    private readonly secret: string
    constructor(secret: string){
        this.secret = secret
    }
    async encrypt(value: string): Promise<string> {
        const accessToken = await jwt.sign({id: value}, this.secret)
        return accessToken
    }

    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret)
        return value
    }
}