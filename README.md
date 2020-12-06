<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS SES (AWS emails)</h3>
<a href="https://www.npmjs.com/package/@nextnm/nestjs-ses"><img src="https://img.shields.io/npm/v/@nextnm/nestjs-ses.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/@nextnm/nestjs-ses"><img src="https://img.shields.io/npm/l/@nextnm/nestjs-ses.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/@nextnm/nestjs-ses"><img src="https://img.shields.io/npm/dm/@nextnm/nestjs-ses.svg" alt="NPM Downloads" /></a>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [node-ses](https://www.npmjs.com/package/node-ses).
It only comtemplates the send email functionality, but later it will be added more. Just ping me or open pull request and contribute :)

### Installation

```bash
npm install @nextnm/nestjs-ses
```

### Usage

#### Importing module

```typescript
import { SesModule } from '@nextnm/nestjs-ses';
@Module({
  imports: [
    SesModule.forRoot({
      SECRET: '<YOUR SECRET>',
      AKI_KEY: '<YOUR AKI_KEY>',
      REGION: 'eu-west-1',
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Interfaces

```typescript
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  replyTo?: string;
  cc: string;
  bcc: string[];
  altText?: string;
}
```

#### Calling Send Method

```typescript
import { SesService } from '@nextnm/nestjs-ses';
import { SesEmailOptions } from '@nextnm/nestjs-ses'

@Injectable()
export class YourService {
  constructor(private sesService: SesService) {
    const options: SesEmailOptions = {
      from:'',
      to:'',
      subject:'',
      html:'',
      replyTo:'',
      cc:'',
      bcc:'',
      altText:'',
    };

    await this.sesService.sendEmail(options);
  }
```

<!-- ## Change Log

See [Changelog](CHANGELOG.md) for more information. -->

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Notes

This project is not endorsed by or affiliated with [AWS](https://aws.amazon.com).

## Author

**Nuno Carvalhão [Site](https://nunocarvalhao.com)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
