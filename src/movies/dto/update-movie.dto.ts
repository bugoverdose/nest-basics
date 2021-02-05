import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
// 인자: CreateMovieDto를 base 타입으로 사용
// CreateMovieDto와 동일. 다만 모든 항목들이 선택사항임.
