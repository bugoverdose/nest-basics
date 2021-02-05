import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // Router. url의 entry point는 '/movies' 라우트.
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // Controller의 constructor에 MoviesService 추가 => moviesService라는 명칭으로 클래스 내부에서 서비스의 함수들 접근 가능해짐.

  @Get() // Router 내 개별 route. '/movies'
  getAll(): Movie[] {
    // Movie의 배열을 반환.
    return this.moviesService.getAll();
  }

  @Get('search') // '/movies/search?year=2020  // searchingYear: 2020
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after year ${searchingYear}`;
  } // search를 :id의 값으로 인식하지 않도록 위에 위치시켜야 함.

  // 원칙: If you want something, You have to ask for it. => 파라미터를 원하면 @Param으로 요청해야 함.
  // @Param 데코레이터를 통해 id 파라미터를 요청. movieID로 받아서 사용.
  // @Get과 @Param의 파라미터는 동일해야 함. 받은 값은 다른 변수명으로 사용 가능.
  @Get(':id') // '/movies/:id'
  getOne(@Param('id') movieId: number): Movie {
    // Param으로 들어오는 id값을 movieId라는 이름으로 사용. Movie를 반환.
    // Param으로 들어오는 값은 url이기 때문에 기본적으로 string 타입이지만 transform 옵션 덕분에 number 타입으로 자동변환됨.
    return this.moviesService.getOne(movieId);
  }

  @Post() // '/movies'
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.createMovie(movieData);
  }

  @Patch(':id') // '/movies/:id'
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(movieId, updateData);
  } // @Patch : 리소스의 일부분만 업데이트해줌. 특정 영화의 일부 정보만 수정.
  // @Put : 모든 리소스를 업데이트. 사용 지양하기.

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }
}
