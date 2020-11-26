export class User {
  id: string;
  firstName: string;
  lastName: string;
  firmenname: string;
  email: string;
  password: string;
  confirmPassword: string
  acceptTerms: boolean
  role: User.RoleEnum;


  constructor( firstName: string, lastName: string, firmenname: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.firmenname = firmenname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.acceptTerms = acceptTerms;
  }
}

// tslint:disable-next-line:no-namespace
export namespace User {
  export enum RoleEnum {
    admin = <any>'admin',
    user = <any>'user',
    superAdmin = <any>'superAdmin',
  }
}
