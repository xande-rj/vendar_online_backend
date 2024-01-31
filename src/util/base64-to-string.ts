import { LoginPayloads } from "src/auth/dtos/LoginPayloads.dtos";

export const authorizationToLoginPaylod = (authorization :string):LoginPayloads |undefined =>{
    const authorizationSplit = authorization.split('.')

    if(authorizationSplit.length<3||!authorizationSplit[1]){
        return undefined
    }

    return JSON.parse(Buffer.from(authorizationSplit[1],'base64').toString('ascii'),)
}