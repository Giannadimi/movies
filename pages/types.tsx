export interface IForm {
  username: string;
  email: string;
  password: string;
}

export interface IMovie {
  name_movie: string;
  description: string;
  rating: number;
  photo_url: string;
  date_created: Date | null;
}

export interface IRow extends IMovie {
  id: number;
}
