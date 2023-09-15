export interface IForm {
  username: string;
  email: string;
  password: string;
}

export interface IMovie {
  id?: number;
  name_movie: string;
  description: string;
  rating: number | null;
  photo_url: string;
  date_created: Date | null | string;
}

export interface IRow extends IMovie {
  id: number;
}
