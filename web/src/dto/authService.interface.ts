import { IAccessToken } from "./accessToken.interface";
import { IAuthCredentials } from "./auth-credentials.interfcae";
export interface IAuthService {
  register(authCredentialsDto: IAuthCredentials): Promise<void>;
  login(
    authCredentialsDto: IAuthCredentials
  ): Promise<IAccessToken | undefined>;
}
