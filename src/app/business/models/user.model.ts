export class User {
  id: any;
  name: any;
  email: any;
  password: any;
  role: any;
  token: string;

  constructor(id: any, name: any, email: any, password: any, role: any, token: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }
}
