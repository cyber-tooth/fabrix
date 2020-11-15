export class User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: User.RoleEnum;
  constructor() {
  }

}

// tslint:disable-next-line:no-namespace
export namespace User {
  export enum RoleEnum {
    admin = <any> 'admin',
    user = <any> 'user',
  }
}
