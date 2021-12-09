import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { AccessTokenDto } from "../dto/accessToken.dto";
import { loginEndPoint, registerEndPoint } from "../endpoints";
import { IAuthService } from "../dto/authService.interface";
import axios from "axios";

export class AuthService implements IAuthService {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    try {
      await axios({
        method: "post",
        url: registerEndPoint,
        headers: {
          accepts: "application/json",
        },
        data: {
          username,
          password,
        },
      });
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }

  async login(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<AccessTokenDto | undefined> {
    const { username, password } = authCredentialsDto;
    try {
      const res = await axios({
        method: "post",
        url: loginEndPoint,
        headers: {
          accepts: "application/json",
        },
        data: {
          username,
          password,
        },
      });
      localStorage.setItem("token", res.data.accesstoken);
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }
}
