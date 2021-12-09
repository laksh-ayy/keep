import { IAuthCredentials } from "../dto/auth-credentials.interfcae";
import { IAccessToken } from "../dto/accessToken.interface";
import { loginEndPoint, registerEndPoint } from "../endpoints";
import { IAuthService } from "../dto/authService.interface";
import axios from "axios";

export class AuthService implements IAuthService {
  async register(authCredentialsDto: IAuthCredentials): Promise<void> {
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
    authCredentialsDto: IAuthCredentials
  ): Promise<IAccessToken | undefined> {
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
