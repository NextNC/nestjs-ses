import { Injectable, Inject } from '@nestjs/common';
import { AKI_KEY, REGION, SECRET } from '../../tokens/tokens';
import * as ses from 'node-ses';

export interface SesEmailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  html?: string;
  cc?: string;
  bcc?: string[];
  text?: string;
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

  public sendEmail(emailOptions: SesEmailOptions): Promise<boolean> {
    const email = {
      ...emailOptions,
      message: emailOptions.html,
      altText: emailOptions.text,
    };
    delete email.html;
    delete email.text;
    if (!email.message) {
      delete email.message;
    }
    if (!email.text) {
      delete email.text;
    }
    delete email.html;
    return new Promise((resolve, reject) => {
      this.ses.sendEmail(email, (err, data, res) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log('res',res);
        console.log('data',data);

        return resolve(res);
      });
    });
  }
}
