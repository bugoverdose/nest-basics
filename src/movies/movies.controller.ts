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

@Controller('movies') // Router. url의 entry point는 '/movies' 라우트.
export class MoviesController {
  @Get() // Router 내 개별 route. '/movies'
  getAll() {
    return 'This will return all movies';
  }

  @Get('search') // '/movies/search?year=2020  // searchingYear: 2020
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after year ${searchingYear}`;
  } // search를 :id의 값으로 인식하지 않도록 위에 위치시켜야 함.

  // 원칙: If you want something, You have to ask for it. => 파라미터를 원하면 @Param으로 요청해야 함.
  // @Param 데코레이터를 통해 id 파라미터를 요청. movieID로 받아서 사용.
  // @Get과 @Param의 파라미터는 동일해야 함. 받은 값은 다른 변수명으로 사용 가능.
  @Get(':id') // '/movies/:id'
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post() // '/movies'
  createMovie(@Body() movieData) {
    return movieData;
  }

  @Patch(':id') // '/movies/:id'
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  } // @Patch : 리소스의 일부분만 업데이트해줌. 특정 영화의 일부 정보만 수정.
  // @Put : 모든 리소스를 업데이트. 사용 지양하기.

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }
}
