import { Injectable, Inject } from '@nestjs/common';
import { AKI_KEY, REGION, SECRET } from '../../tokens/tokens';
import * as ses from 'node-ses';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  cc: string;
  bcc: string[];
  altText?: string;
}

@Injectable()
export class SesService {
  private readonly ses;
  constructor(
    @Inject(AKI_KEY) private readonly apiKey,
    @Inject(REGION) private readonly region,
    @Inject(SECRET) private readonly secret,
  ) {
    this.ses = ses.createClient({
      key: apiKey,
      amazon: `https://email.${region}.amazonaws.com`,
      secret,
    });
  }

  public sendEmail(emailOptions: EmailOptions): Promise<boolean> {
    const email = { ...emailOptions, message: emailOptions.html };
    delete email.html;
    if (!email.message) {
      delete email.message;
    }
    delete email.html;
    return new Promise((resolve, reject) => {
      this.ses.sendEmail(email, (err, data, res)=> {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

}
