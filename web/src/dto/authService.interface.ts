import { AccessTokenDto } from "./accessToken.dto";
import { AuthCredentialsDto } from "./auth-credentials.dto";
export interface IAuthService {
  register(authCredentialsDto: AuthCredentialsDto): Promise<void>;
  login(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<AccessTokenDto | undefined>;
}
