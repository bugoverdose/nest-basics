import { IsNumber, IsOptional, IsString } from 'class-validator';

// 사용자들이 전송 가능한 데이터 지정.
export class CreateMovieDto {
  @IsString() // 문자열 validation 데코레이터.
  readonly title: string;

  @IsNumber() // 숫자 validation 데코레이터.
  readonly year: number;

  @IsOptional() // 아래의 field를 선택사항으로 지정.
  @IsString({ each: true }) // each 옵션: 배열의 각 요소가 문자열인지 체크
  readonly genres: string[];
}
