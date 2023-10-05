import { Injectable, Inject, Optional } from '@nestjs/common';
import * as ses from 'node-ses';
import { SES_CONFIG_OPTIONS, SesOptions } from '../../ses.interface';

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
  private readonly ses: ses.Client;
  constructor(
    @Inject(SES_CONFIG_OPTIONS) options: SesOptions,
  ) {
    this.ses = ses.createClient({
      key: options.apiKey,
      amazon: `https://email.${options.region}.amazonaws.com`,
      secret: options.secret,
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
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}
