import {IPerson} from '../interface/person.interface';

export class LoginModel implements IPerson {
  email: string;
  password: string;
}
