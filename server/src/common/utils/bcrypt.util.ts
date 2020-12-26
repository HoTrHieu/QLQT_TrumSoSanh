const bcrypt = require('bcryptjs');

export class BcryptUtil {
  static hash(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(text, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }

  static compare(text: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(text, hash, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
}
