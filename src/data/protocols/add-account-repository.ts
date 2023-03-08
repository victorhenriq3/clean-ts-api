import { AddAccountModel } from "../../domain/usacases/add-account";
import { AccountModel } from "../../domain/models/account"

export interface AddAccountRepository{
    add (accountData: AddAccountModel): Promise<AccountModel>
}