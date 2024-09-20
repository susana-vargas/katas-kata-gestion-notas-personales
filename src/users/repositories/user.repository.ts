export class UserRepository {
  private id: string;
  private name: string;
  private password: string;

  constructor(id: string, name: string, password: string) {
    this.setId(id);
    this.setName(name);
    this.setPassword(password);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPassword() {
    return this.password;
  }

  private setId(id: string): void {
    this.id = id;
  }

  private setName(name: string) {
    this.name = name;
  }

  private setPassword(password: string) {
    this.password = password;
  }
}
