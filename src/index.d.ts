export interface Promt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  variables: {
    name: string;
    type: string;
    description: string;
  }[];
  tags: string[];
  metadata: {
    author: string;
    creation_date: string;
    source: string;
  };
  model: any;
}

export interface Prompts {
  version: string;
  generator: string;
  prompts: Promt[];
}
