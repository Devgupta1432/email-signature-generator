export interface Template {
  id: number;
  name: string;
  category: 'STATIC' | 'ANIMATED';
  isPro: boolean;
  content: string;
  previewImage?: string;
  createdAt: string;
}

export interface Signature {
  id: number;
  templateId: number;
  contentJson: string;
  signatureName: string;
  createdAt: string;
  updatedAt: string;
}