export interface AppSpec {
  id: string;
  productId: string;
  pages: Array<{ id: string; type: string }>;
  entities: any[];
  flows: any[];
}

