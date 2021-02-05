// 서비스로 보내고 받을 class/interface를 export. movie의 구성.
// 대체로 데이터베이스의 Model을 작성.
// ValidationPipe의 transformer 옵션이 적용될 기준
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[]; // 문자열들로 구성된 배열
}
