import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  private readonly secret: string = process.env.JWT_SECRET;
  private readonly field: string = 'reuna_INST_Request@!';

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return { name: 'fulano', email: '123@gmail.com' };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.sign(payload),
    };
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }

  sign(payload: any) {
    return this.jwtService.sign(payload);
  }

  encode(): String {
    const hash = createHmac('sha256', this.secret).update(this.field).digest('hex');
    return this.sign({ hash: hash });
  }

  decode(token: string): Boolean {
    try {
      const decode: any = this.verify(token);
      return (
        decode.hash === createHmac('sha256', this.secret).update(this.field).digest('hex')
      );
    } catch (err) {
      return false;
    }
  }
}
