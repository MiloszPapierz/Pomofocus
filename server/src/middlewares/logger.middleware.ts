import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    this.logger.log(`INCOMING REQUEST ${method} ${originalUrl} from -  ${ip}`);

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `OUTGOING RESPONSE ${method} ${statusCode} ${originalUrl}`,
      );
    });

    next();
  }
}
