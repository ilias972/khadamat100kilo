import { PartialType } from '@nestjs/mapped-types';
import { CreateProServiceDto } from './create-pro-service.dto';

export class UpdateProServiceDto extends PartialType(CreateProServiceDto) {}
