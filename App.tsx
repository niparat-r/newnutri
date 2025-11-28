import React, { useState, useEffect, useCallback } from 'react';
import { generateFoodDatabase, analyzeMenu, generateUICopy } from './services/geminiService';
import { FoodCategories, FoodItem, UserProfile, AnalysisResponse, UICopy } from './types';
import { DEFAULT_USER_PROFILE, MOCK_DATABASE, DEFAULT_UI_COPY } from './constants';
import FoodCard from './components/FoodCard';
import AnalysisView from './components/AnalysisView';

const App: React.FC = () => {
  // State
  const [database, setDatabase] = useState<FoodCategories>(MOCK_DATABASE);
  const [uiCopy, setUiCopy] = useState<UICopy>(DEFAULT_UI_COPY);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [selectedItems, setSelectedItems] = useState<{ main_dish: FoodItem | null; snack: FoodItem | null; drink: FoodItem | null }>({
    main_dish: null,
    snack: null,
    drink: null
  });
  
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  
  // Loading States
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingDB, setIsGeneratingDB] = useState(false);

  // Initialize UI Copy on mount
  useEffect(() => {
    const fetchCopy = async () => {
      if(process.env.API_KEY) {
        const copy = await generateUICopy();
        if (copy) setUiCopy(copy);
      }
    };
    fetchCopy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Handlers
  const handleGenerateDatabase = async () => {
    if (!process.env.API_KEY) {
      alert("Please check your API KEY in the environment.");
      return;
    }
    setIsGeneratingDB(true);
    const newDB = await generateFoodDatabase();
    if (newDB) {
      setDatabase(newDB.categories);
    }
    setIsGeneratingDB(false);
  };

  const spin = useCallback(() => {
    setIsSpinning(true);
    setAnalysis(null);
    setSelectedItems({ main_dish: null, snack: null, drink: null });

    // Simulate spinning delay
    setTimeout(() => {
      const randomMain = database.main_dish[Math.floor(Math.random() * database.main_dish.length)];
      const randomSnack = database.snack[Math.floor(Math.random() * database.snack.length)];
      const randomDrink = database.drink[Math.floor(Math.random() * database.drink.length)];

      setSelectedItems({
        main_dish: randomMain,
        snack: randomSnack,
        drink: randomDrink
      });
      setIsSpinning(false);
      
      // Trigger Analysis automatically after spin
      handleAnalyze({ main_dish: randomMain, snack: randomSnack, drink: randomDrink });
      
    }, 1500);
  }, [database]);

  const handleAnalyze = async (selection: { main_dish: FoodItem; snack: FoodItem; drink: FoodItem }) => {
    if (!process.env.API_KEY) return;
    setIsAnalyzing(true);
    const result = await analyzeMenu(profile, selection, database);
    if (result) {
      setAnalysis(result);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-kanit pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥑</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              NutriWheel AI
            </h1>
          </div>
          <button 
            onClick={handleGenerateDatabase}
            disabled={isGeneratingDB}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
          >
            {isGeneratingDB ? 'Generating...' : 'Refresh DB (AI)'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Welcome / Motivational Message */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">สวัสดีคุณ {profile.gender === 'female' ? 'ผู้หญิง' : 'ผู้ชาย'}!</h2>
            <p className="opacity-90">{uiCopy.messages.daily_success[0] || "กินดี ชีวิตดี เริ่มต้นที่มื้อนี้"}</p>
          </div>
        </div>

        {/* Spin Controls */}
        <div className="flex flex-col items-center gap-6">
           <button 
             onClick={spin}
             disabled={isSpinning || isAnalyzing}
             className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-500 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-emerald-600 hover:scale-105 active:scale-95 shadow-emerald-200 shadow-xl"
           >
             <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
             <span className="relative flex items-center gap-2 text-xl">
               {isSpinning ? '🌀 กำลังหมุน...' : `🎲 ${uiCopy.buttons.spin_all}`}
             </span>
           </button>
           
           <p className="text-slate-400 text-sm">
             {isSpinning ? "ระบบกำลังสุ่มเมนูที่เหมาะสม..." : "กดปุ่มเพื่อสุ่มอาหาร 3 อย่างพร้อมกัน"}
           </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Dish */}
          <div className="flex flex-col gap-2">
            <FoodCard 
              item={selectedItems.main_dish || database.main_dish[0]} 
              categoryName="Main Dish"
              isSpinning={isSpinning}
            />
          </div>

          {/* Snack */}
          <div className="flex flex-col gap-2">
            <FoodCard 
              item={selectedItems.snack || database.snack[0]} 
              categoryName="Snack"
              isSpinning={isSpinning}
            />
          </div>

          {/* Drink */}
          <div className="flex flex-col gap-2">
             <FoodCard 
               item={selectedItems.drink || database.drink[0]} 
               categoryName="Drink"
               isSpinning={isSpinning}
             />
          </div>
        </div>

        {/* Analysis Section */}
        {(selectedItems.main_dish || analysis) && (
          <div className={`transition-opacity duration-500 ${isSpinning ? 'opacity-50' : 'opacity-100'}`}>
            {(analysis || isAnalyzing) && (
              <AnalysisView analysis={analysis || {
                  summary_th: "กำลังประมวลผล...",
                  evaluation_th: "รอสักครู่",
                  risk_factors_th: [],
                  advice_th: "...",
                  health_score_overall: 0,
                  suggested_alternatives: []
              }} loading={isAnalyzing} />
            )}
          </div>
        )}

      </main>

      {/* User Profile Summary (Bottom Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-20">
         <div className="max-w-4xl mx-auto flex items-center justify-between text-xs md:text-sm text-slate-600">
            <div className="flex gap-4">
              <span>👤 Age: {profile.age}</span>
              <span>⚖️ Weight: {profile.weight_kg}kg</span>
              <span className="hidden md:inline">🎯 Goal: {profile.goal}</span>
            </div>
            <button className="text-indigo-600 font-bold hover:underline" onClick={() => alert("Profile editing not implemented in this demo")}>
              Edit Profile
            </button>
         </div>
      </div>
    </div>
  );
};

export default App;