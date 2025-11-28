export interface FoodItem {
  id: string;
  name_th: string;
  name_en: string;
  description_th: string;
  calories_kcal: number;
  protein_g: number;
  fat_g: number;
  carb_g: number;
  sugar_g: number;
  fiber_g: number;
  caffeine_level: 'none' | 'low' | 'medium' | 'high';
  health_score: number;
  type_tag: 'healthy' | 'normal' | 'high_calorie' | 'low_carb' | 'high_protein';
}

export interface FoodCategories {
  main_dish: FoodItem[];
  snack: FoodItem[];
  drink: FoodItem[];
}

export interface FoodDatabaseResponse {
  version: string;
  categories: FoodCategories;
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight_kg: number;
  height_cm: number;
  goal: 'weight_loss' | 'maintain' | 'muscle_gain';
  has_diabetes: boolean;
  has_hypertension: boolean;
  sensitive_to_caffeine: boolean;
}

export interface AlternativeItem {
  from_category: 'main_dish' | 'snack' | 'drink';
  name_th: string;
  reason_th: string;
}

export interface AnalysisResponse {
  summary_th: string;
  evaluation_th: string;
  risk_factors_th: string[];
  advice_th: string;
  health_score_overall: number;
  suggested_alternatives: AlternativeItem[];
}

export interface UICopy {
  buttons: {
    spin_now: string;
    spin_all: string;
    save_meal: string;
    see_stats: string;
  };
  messages: {
    daily_success: string[];
    low_sugar_reward: string[];
    high_caffeine_warning: string[];
  };
}