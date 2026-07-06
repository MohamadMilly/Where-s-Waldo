export type User = {
  id: number;
  name: string;
  scores?: Score[];
  [key: string]: any;
};
export type Score = {
  id: number;
  user?: User;
  duration: number;
  won: boolean;
  [key: string]: any;
};

export type Scene = {
  id: number;
  name: string;
  imageURL: string;
  slug: string;
  characters?: Character[];
  [key: string]: any;
};

export type Session = {
  id: number;
  sessionId: string;
  startTime: Date;
  endTime?: Date | null;
  completed: boolean;
};

export type SceneUniqueField = "id" | "slug";

export type SceneUniqueIdentifier = {
  id?: number;
  slug?: string;
};

export type Character = {
  id: number;
  name: string;
  coords: number[];
  [key: string]: any;
};

export type verifyCoordsRequestBody = {
  sessionToken: string;
  characterId: number;
  coords: number[];
};

export type EndSessionResponse = {
  session: Session;
};

export type VerifyCoordsResponse = {
  isValid: boolean;
  character: Character | null;
};

export type CreateUserRequestBody = {
  name: string;
};

export type CreateUserResponse = {
  token: string;
  user: User;
};

export type CreateScoreRequestBody = {
  sessionId: string;
  characters: Character[];
};

export type CreateScoreResponse = {
  hasWon: boolean;
  score: Score;
};
