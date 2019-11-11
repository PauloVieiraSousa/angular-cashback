import {ILogin} from '../interface/login.interface';

export class Login implements ILogin {
  email: string;
  password: string;
}
