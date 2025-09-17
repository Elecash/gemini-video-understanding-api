import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';

@Injectable()
export class AppService {
    private genAI: GoogleGenAI;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY not defined in environment variables');
        }
        this.genAI = new GoogleGenAI({ apiKey });
    }

    async processVideoFromYouTube(youtubeUrl: string, instructions: string): Promise<any> {
        try {
            const parts = [createPartFromUri(youtubeUrl, 'video/*'), instructions];

            const userContent = createUserContent(parts);

            const response = await this.genAI.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userContent
            });

            const textResult = response?.text;

            return {
                status: 'ok',
                youtubeUrl,
                instructions,
                response: textResult
            };
        } catch (error) {
            console.error('Error processing video:', error);
            throw new InternalServerErrorException('Error processing video');
        }
    }
}
