export class User {
  constructor(
    public email: string,
    public username: string,
    public localId: string,
    private _token: string, 
    private expiresIn: Date,
    public registered: boolean
    ) {};

    get token() {
      if(!this.expiresIn || new Date() > this.expiresIn) {
        return null;
      }
      return this._token
    }
}