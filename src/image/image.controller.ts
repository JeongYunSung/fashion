import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

interface Test {
  key: string;
}

interface BlobResponse {
  mime: string;
  value: any;
}

@Controller('image')
export class ImageController {
  @Post()
  async hello(@Body() test: Test, @Res() res: Response) {
    const file = await this.toFile(test.key);
    res.status(200).contentType(file.mime).write(file.value);
    return res.end(null);
  }

  async toFile(base_data): Promise<BlobResponse> {
    const arr = base_data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const value = Buffer.from(arr[1], 'base64');

    return {
      mime,
      value,
    };
  }
}
