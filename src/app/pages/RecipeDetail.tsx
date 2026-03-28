import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Heart } from 'lucide-react';
import { allRecipes } from '../data/recipes';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, isFavorite, toggleFavorite } = useAuth();

  const recipe = allRecipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="h-full flex flex-col">
        {/* 统一顶部导航栏 */}
        <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0 flex items-center">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-1 text-gray-600 text-sm"
          >
            <ArrowLeft className="size-5" />
            <span>返回</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-4xl mb-3">😕</div>
            <p className="text-gray-600 text-sm mb-3">找不到这道菜</p>
            <button
              onClick={() => navigate('/home')}
              className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate(`/home/login?redirect=/home/recipe/${recipe.id}`);
      return;
    }
    toggleFavorite(recipe.id);
    toast.success(favorited ? '已取消收藏' : '收藏成功！');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 统一顶部导航栏 */}
      <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-1 text-gray-600 text-sm"
          >
            <ArrowLeft className="size-5" />
            <span>返回</span>
          </button>

          <h2 className="text-sm font-medium text-gray-800 truncate max-w-[120px]">{recipe.name}</h2>

          <button
            onClick={handleFavoriteClick}
            className="p-1.5 rounded-full hover:bg-orange-50 transition-colors"
          >
            <Heart
              className={`size-5 ${favorited ? 'fill-red-400 text-red-400' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-3 pt-4 pb-4">
        {/* 菜谱头部 */}
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">{recipe.emoji}</div>
          <h1 className="text-lg font-bold text-gray-800">{recipe.name}</h1>
        </div>

        {/* 标签 */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="bg-white px-3 py-2 rounded-xl shadow-sm text-center min-w-[65px]">
            <div className="text-base">⏱️</div>
            <div className="text-[9px] text-gray-500">时间</div>
            <div className="text-xs font-medium text-gray-800">{recipe.time}</div>
          </div>
          <div className="bg-white px-3 py-2 rounded-xl shadow-sm text-center min-w-[65px]">
            <div className="text-base">⭐</div>
            <div className="text-[9px] text-gray-500">难度</div>
            <div className="text-xs font-medium text-gray-800">{recipe.difficulty}</div>
          </div>
          <div className="bg-white px-3 py-2 rounded-xl shadow-sm text-center min-w-[65px]">
            <div className="text-base">🍽️</div>
            <div className="text-[9px] text-gray-500">分类</div>
            <div className="text-xs font-medium text-gray-800">{recipe.category}</div>
          </div>
        </div>

        {/* 食材清单 */}
        <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
            <span className="text-base">🛒</span> 食材清单
          </h3>
          <div className="grid grid-cols-1 gap-1.5">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2 px-2.5 py-1.5 bg-orange-50 rounded-lg">
                <span className="text-orange-500 text-xs">✓</span>
                <span className="text-gray-700 text-xs">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 做法步骤 */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
            <span className="text-base">👨‍🍳</span> 做法步骤
          </h3>
          <div className="space-y-2.5">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-xs leading-5 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部收藏按钮 */}
        <div className="mt-4">
          <button
            onClick={handleFavoriteClick}
            className={`w-full py-3 rounded-full text-sm font-medium flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
              favorited ? 'bg-gray-200 text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <Heart className={`size-4 ${favorited ? 'fill-current' : ''}`} />
            {favorited ? '已收藏' : '收藏这道菜'}
          </button>
        </div>
      </div>
    </div>
  );
}
