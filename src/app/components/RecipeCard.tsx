import { Link } from 'react-router';
import { Recipe } from '../data/recipes';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RecipeCardProps {
  recipe: Recipe;
  showMatch?: boolean;
}

export function RecipeCard({ recipe, showMatch = false }: RecipeCardProps) {
  const { isFavorite } = useAuth();
  const favorited = isFavorite(recipe.id);

  // 根据分类选择渐变色
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case '家常菜':
        return 'from-orange-50 to-orange-100';
      case '快手菜':
        return 'from-green-50 to-green-100';
      case '汤品':
        return 'from-blue-50 to-blue-100';
      case '主食':
        return 'from-yellow-50 to-yellow-100';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  return (
    <Link to={`/home/recipe/${recipe.id}`} className="block">
      <div className={`bg-gradient-to-br ${getCategoryGradient(recipe.category)} rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-white/80 relative overflow-hidden group`}>
        {/* 收藏图标 */}
        {favorited && (
          <div className="absolute top-2 right-2 z-10">
            <Heart className="size-3.5 fill-red-400 text-red-400" />
          </div>
        )}

                {/* 装饰圆形 */}
        <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Emoji */}
        <div className="text-4xl my-2 text-center relative z-5">
          {recipe.emoji}
        </div>

        {/* 菜名 */}
        <h3 className="text-center text-gray-800 text-xs font-semibold mb-2 truncate px-1">
          {recipe.name}
        </h3>

        {/* 标签 */}
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <span className="text-[9px] px-1.5 py-0.5 bg-white/70 rounded-full text-gray-600">
              ⏱️ {recipe.time}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              recipe.difficulty === '简单' ? 'bg-green-100 text-green-600' :
              recipe.difficulty === '中等' ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}>
              ⭐ {recipe.difficulty}
            </span>
          </div>
          {/* 匹配度标签 */}
          {showMatch && recipe.matchInfo && (
            <div className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              recipe.matchInfo.matched === recipe.matchInfo.total
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-orange-500 to-orange-400 text-white'
            }`}>
              {recipe.matchInfo.matched === recipe.matchInfo.total
                ? '全部食材都有'
                : `匹配${recipe.matchInfo.matched}/${recipe.matchInfo.total}食材`
              }
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
