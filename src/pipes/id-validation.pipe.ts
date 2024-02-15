import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type != 'query') {
            return value
        }

        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException('Wrong Id type!')
        }

        return value
    }
}