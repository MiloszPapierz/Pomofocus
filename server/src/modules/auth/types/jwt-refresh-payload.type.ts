import { JwtPayload } from './jwt-payload.type';

export type JwtPayloadRefresh = {
  refresh_token: string;
} & JwtPayload;
