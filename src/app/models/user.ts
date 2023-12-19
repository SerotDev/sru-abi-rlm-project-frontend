export interface User {
    username: String,
    password: String,
  }
  
  
  export class UserReg implements User {
  
    email: string;
    username: String;
    password: String;
  
    constructor(
      username: string,
      email: string,
      password: string,
    ) {
      this.username = username;
      this.password = password;
      this.email = email;
    }
  }
  
  export class UserDTO implements User {
  
    email: string;
    username: String;
    password: String;
    role: {
      id: number,
      name: string
    }
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(
      username: string,
      email: string,
      password: string,
      role: {
        id: number,
        name: string
      },
      createdAt: Date,
      updatedAt: Date,
  
    ) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.role = role;
      createdAt = new Date();
      updatedAt = new Date();
    }
  
  }