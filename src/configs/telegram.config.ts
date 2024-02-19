import { ConfigService } from '@nestjs/config';
import { TelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): TelegramOptions => {
    const token = configService.get('TELEGRAM_TOKEN')

    if (!token) {
        throw new Error('Token not found');
    }

    return {
        chatId: configService.get('TELEGRAM_CHAT_ID'),
        botToken: token
    };
};