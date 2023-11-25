export type MovieType = {
  adult: false;
  backdrop_path: string;
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: 985.16;
  release_date?: string;
  first_air_date?: string;
  video: false;
  vote_average: number;
  vote_count: number;
  origin_country?: number[];
};

export type Data = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};
