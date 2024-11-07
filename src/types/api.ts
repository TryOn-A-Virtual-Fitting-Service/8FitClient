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
    itemImageUrl: string;
    modelImageUrl: string;
  }