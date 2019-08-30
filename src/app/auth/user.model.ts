export class User {

  public nombre: string;
  public email: string;
  public uid: string;

  constructor( userObj: UserObj ) {

    this.nombre = userObj && userObj.nombre || null;
    this.email = userObj && userObj.email || null;
    this.uid = userObj && userObj.uid || null;
  }
}

interface UserObj {
  nombre: string;
  email: string;
  uid: string;
}
