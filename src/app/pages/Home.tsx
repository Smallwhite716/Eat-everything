import { useState } from 'react';
import { X } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { allRecipes, matchRecipes, filterByCategory, Recipe, MealType } from '../data/recipes';

const mealTypes: { name: MealType | '不限'; emoji: string }[] = [
  { name: '不限', emoji: '🍽️' },
  { name: '早餐', emoji: '🌅' },
  { name: '午餐', emoji: '☀️' },
  { name: '晚餐', emoji: '🌙' },
  { name: '小吃', emoji: '🍡' },
];

const categories = ['全部', '家常菜', '快手菜', '汤品', '主食'];

// 统一顶部导航栏高度
const Header = () => (
  <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
    <div className="text-center">
      <h1 className="text-lg font-bold text-orange-600">🍳 有啥吃啥</h1>
      <p className="text-xs text-gray-500">有食材，就能做</p>
    </div>
  </div>
);

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentMealType, setCurrentMealType] = useState<MealType | '不限'>('不限');
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>(allRecipes);

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      const newIngredients = [...selectedIngredients, ingredient];
      setSelectedIngredients(newIngredients);
      updateRecipes(newIngredients, currentMealType, currentCategory);
    }
    setInputValue('');
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = selectedIngredients.filter(i => i !== ingredient);
    setSelectedIngredients(newIngredients);
    updateRecipes(newIngredients, currentMealType, currentCategory);
  };

  const updateRecipes = (ingredients: string[], mealType: MealType | '不限', category: string) => {
    let matched = ingredients.length > 0 ? matchRecipes(ingredients) : allRecipes;

    // 先按餐次筛选
    if (mealType !== '不限') {
      matched = matched.filter(recipe => recipe.mealType.includes(mealType));
    }

    // 再按菜系筛选
    const filtered = filterByCategory(matched, category);
    setDisplayRecipes(filtered);
  };

  const changeMealType = (mealType: MealType | '不限') => {
    setCurrentMealType(mealType);
    updateRecipes(selectedIngredients, mealType, currentCategory);
  };

  const changeCategory = (category: string) => {
    setCurrentCategory(category);
    updateRecipes(selectedIngredients, currentMealType, category);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addIngredient(inputValue.trim());
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-3">
        {/* 冰箱背景 */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-4 mb-3 border-2 border-blue-200/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-1 right-2 text-3xl opacity-20 animate-pulse">🧊</div>

          {selectedIngredients.length > 0 && (
            <div className="mb-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-wrap gap-1.5">
                {selectedIngredients.map(ingredient => (
                  <div
                    key={ingredient}
                    className="bg-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-gray-700 text-xs">{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入食材，回车添加"
            className="w-full px-4 py-2.5 rounded-full border-2 border-white/80 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all bg-white/90 backdrop-blur"
          />
        </div>

        {/* 餐次筛选 - 第一层 */}
        <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
          {mealTypes.map(({ name, emoji }) => (
            <button
              key={name}
              onClick={() => changeMealType(name)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-medium transition-all duration-200 flex-shrink-0 flex items-center gap-1 ${
                currentMealType === name
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-500 shadow-sm hover:shadow-md border border-gray-100'
              }`}
            >
              <span>{emoji}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>

        {/* 菜系筛选 - 第二层 */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => changeCategory(category)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-200 flex-shrink-0 ${
                currentCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md shadow-orange-200'
                  : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 菜谱列表 */}
        {displayRecipes.length === 0 ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
            <div className="text-4xl mb-3 animate-bounce">🤔</div>
            <p className="text-gray-600 text-sm">没有找到匹配的菜谱</p>
            <p className="text-gray-400 text-xs mt-1">试试添加其他食材吧</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {displayRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  showMatch={selectedIngredients.length > 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
