import { FoodCategories, UserProfile, UICopy } from './types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  age: 25,
  gender: 'female',
  weight_kg: 60,
  height_cm: 165,
  goal: 'weight_loss',
  has_diabetes: false,
  has_hypertension: false,
  sensitive_to_caffeine: false,
};

export const DEFAULT_UI_COPY: UICopy = {
  buttons: {
    spin_now: "สุ่มเมนูเลย!",
    spin_all: "สุ่มทั้งหมด",
    save_meal: "บันทึกมื้อนี้",
    see_stats: "ดูสถิติ",
  },
  messages: {
    daily_success: ["เยี่ยมมาก! ทำได้ดีแล้ว"],
    low_sugar_reward: ["ลดน้ำตาล เพื่อสุขภาพที่ดี"],
    high_caffeine_warning: ["ระวังนอนไม่หลับนะ"],
  }
};

export const MOCK_DATABASE: FoodCategories = {
  main_dish: [
    {
      id: "m1",
      name_th: "ข้าวมันไก่ตอน (อกลอกหนัง)",
      name_en: "Hainanese Chicken Rice (Skinless Breast)",
      description_th: "ข้าวมันหุงด้วยน้ำซุปไก่ เสิร์ฟพร้อมอกไก่ต้มไม่เอาหนัง",
      calories_kcal: 500,
      protein_g: 28,
      fat_g: 15,
      carb_g: 60,
      sugar_g: 2,
      fiber_g: 1,
      caffeine_level: "none",
      health_score: 7,
      type_tag: "normal"
    },
    {
      id: "m2",
      name_th: "สุกี้น้ำไก่",
      name_en: "Chicken Suki Soup",
      description_th: "สุกี้รสกลมกล่อม ใส่ผักบุ้ง ผักกาดขาว และเนื้อไก่",
      calories_kcal: 350,
      protein_g: 25,
      fat_g: 8,
      carb_g: 40,
      sugar_g: 5,
      fiber_g: 4,
      caffeine_level: "none",
      health_score: 9,
      type_tag: "healthy"
    },
    {
      id: "m3",
      name_th: "กะเพราหมูสับไข่ดาว",
      name_en: "Basil Pork with Fried Egg",
      description_th: "เมนูยอดฮิต รสจัดจ้าน ไขมันสูงจากน้ำมันผัดและไข่ดาว",
      calories_kcal: 650,
      protein_g: 22,
      fat_g: 35,
      carb_g: 55,
      sugar_g: 6,
      fiber_g: 1,
      caffeine_level: "none",
      health_score: 4,
      type_tag: "high_calorie"
    }
  ],
  snack: [
    {
      id: "s1",
      name_th: "ผลไม้รวม",
      name_en: "Mixed Fruits",
      description_th: "แตงโม มะละกอ สับปะรด",
      calories_kcal: 120,
      protein_g: 2,
      fat_g: 0,
      carb_g: 28,
      sugar_g: 20,
      fiber_g: 5,
      caffeine_level: "none",
      health_score: 9,
      type_tag: "healthy"
    },
    {
      id: "s2",
      name_th: "ลูกชิ้นปิ้ง (3 ไม้)",
      name_en: "Grilled Meatballs",
      description_th: "ลูกชิ้นหมูปิ้งราดน้ำจิ้มหวาน",
      calories_kcal: 250,
      protein_g: 10,
      fat_g: 12,
      carb_g: 25,
      sugar_g: 15,
      fiber_g: 0,
      caffeine_level: "none",
      health_score: 3,
      type_tag: "normal"
    }
  ],
  drink: [
    {
      id: "d1",
      name_th: "น้ำเปล่า",
      name_en: "Water",
      description_th: "น้ำดื่มสะอาด สดชื่น",
      calories_kcal: 0,
      protein_g: 0,
      fat_g: 0,
      carb_g: 0,
      sugar_g: 0,
      fiber_g: 0,
      caffeine_level: "none",
      health_score: 10,
      type_tag: "healthy"
    },
    {
      id: "d2",
      name_th: "ชาไทยเย็น",
      name_en: "Thai Iced Tea",
      description_th: "ชาไทยใส่นมข้นหวาน หวานมัน",
      calories_kcal: 280,
      protein_g: 4,
      fat_g: 10,
      carb_g: 45,
      sugar_g: 38,
      fiber_g: 0,
      caffeine_level: "medium",
      health_score: 2,
      type_tag: "high_calorie"
    }
  ]
};