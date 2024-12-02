export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  result: T;
}

export interface WidgetData {
  models: WidgetModel[];
}

export interface WidgetModel {
  modelId: number;
  modelImageUrl: string;
  fittings: Fitting[];
}

export interface Fitting {
  fittingId: number;
  fittingImageUrl: string;
  itemImageUrl: string;
}

export interface TryOnResult {
  resultImageUrl: string;
}
