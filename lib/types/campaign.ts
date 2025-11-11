export interface Campaign {
  id: string;
  name: string;
  industry: string;
  audience: string;
  tone: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
