import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

class ProcessVideoDto {
    youtubeUrl: string;
    instructions: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('process-video')
    async processVideo(@Body() dto: ProcessVideoDto) {
        const result = await this.appService.processVideoFromYouTube(
            dto.youtubeUrl,
            dto.instructions
        );
        return { result };
    }
}
