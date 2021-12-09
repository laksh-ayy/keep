export interface INote {
  id?: string;
  title?: string;
  body?: string;
  label?: string;
}

export interface ICreateNote {
  title: string | undefined;
  body: string | undefined;
  label: string | undefined;
}
