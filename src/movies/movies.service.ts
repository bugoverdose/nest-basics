import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = []; // movies는 Movie들의 배열. 초기값은 빈 배열.

  getAll(): Movie[] {
    // Movie들의 배열을 반환.
    return this.movies; // fake db. 실제로는 데이터베이스에 대한 query.
  }

  getOne(id: number): Movie {
    // number타입의 id를 인자로 받고, Movie 하나를 반환.
    const movie = this.movies.find((movie) => movie.id === id); // transformer 덕분에 별도의 데이터타입 변환 불필요 // 원래는 +id 혹은 parseInt(id)로 문자열=>숫자.
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`); // Nest 자체 예외처리 기능.
    } // { "statusCode": 404, "message": "Movie with ID 113 not found.", "error": "Not Found" }
    return movie;
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    }); // 배열.push로 배열 끝에 해당 데이터 추가.
  }

  deleteMovie(id: number): void {
    // number 타입의 id를 인자로 받고, boolean을 반환.
    this.getOne(id); // getOne으로 해당 id의 영화 존재여부 사전체크 & 에러처리.
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData }); // 기존 movie + 업데이트된 정보로 새로 생성.
  }
}

// updateData & Body의 유효성 검사
