import { mockAccountModel } from "@/domain/test"
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { AccountModel, AddAccountParams, LoadAccountByEmailRepository } from "../usecases/account/add-account/db-add-account-protocols"
import { LoadAccountByTokenRepository } from "../protocols/db/account/load-account-by-token-repository"
import { UpdateAccessTokenRepository } from "../protocols/db/account/update-access-token-repository"

export const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository{
        async add (accountData: AddAccountParams): Promise<AccountModel>{
            return new Promise(resolve => resolve(mockAccountModel()))
        }
    }

    return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository{
        async loadByEmail(email: string): Promise<AccountModel>{
            return new Promise(resolve => resolve(mockAccountModel()))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}


export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository{
        loadByToken(token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccountModel()))
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken (id: string, token: string): Promise<void>{
            return new Promise(resolve => resolve())
        }
    }

    return new UpdateAccessTokenRepositoryStub()
}
