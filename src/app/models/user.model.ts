export class User {


  static fromFirebase(fuser: any): User {
    return new User(fuser.uid, fuser.name, fuser.email);
  }
  /**
   * Creates an instance of User.
   * @param {(string | undefined)} uid
   * @param {string} name
   * @param {(string | undefined | null)} email
   * @memberof User
   */
  constructor(
    public uid: string | undefined,
    public name: string,
    public email: string | undefined | null
  ) {}
}
