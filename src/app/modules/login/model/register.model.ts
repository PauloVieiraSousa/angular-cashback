import {IPerson} from '../interface/person.interface';

export class RegisterModel implements IPerson {
  fullname: string;
  cpf: string;
  email: string;
  password: string;
}
