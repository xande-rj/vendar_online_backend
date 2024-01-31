import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { authorizationToLoginPaylod } from "src/util/base64-to-string";

export const User = createParamDecorator(
  (ctx: ExecutionContext) =>{
    const {authorization}= ctx.switchToHttp().getRequest().headers
    const LoginPaylod = authorizationToLoginPaylod(authorization)

    return LoginPaylod?.id
  }
    
);