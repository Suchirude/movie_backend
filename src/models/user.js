import bcrypt from "bcrypt";

export class user {
  static users = [];

  static async create({ username, password }) {
    const existing = user.users.find(u => u.username === username);
    if (existing) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { username, passwordHash };
    user.users.push(newUser);
    return { username };
  }

  static async authenticate({ username, password }) {
    const newUser = user.users.find(u => u.username === username);
    if (!newUser) throw new Error("Invalid username or password");

    const match = await bcrypt.compare(password, newUser.passwordHash);
    if (!match) throw new Error("Invalid username or password");

    return { username: newUser.username };
  }
}
