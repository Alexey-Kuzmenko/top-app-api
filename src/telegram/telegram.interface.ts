import { ModuleMetadata } from '@nestjs/common'

export interface TelegramOptions {
    chatId: string
    botToken: string
}

export interface TelegramModuleOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<TelegramOptions> | TelegramOptions;
    inject?: any[];
}