export class User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string
  acceptTerms: boolean
  role: User.RoleEnum;


  constructor(title: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
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
  }
}
