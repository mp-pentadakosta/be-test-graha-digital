import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadData } from './dto/jwt.payload.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PUBLIC_KEY || '',
    });
  }

  async validate(payload: JwtPayloadData) {
    const type: JwtPayloadData = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phoneNumber: payload.phoneNumber,
    };

    return {
      id: type.id,
      role: type.role,
    };
  }
}
