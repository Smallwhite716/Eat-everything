import { useNavigate } from 'react-router';
import { Heart } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { useAuth } from '../contexts/AuthContext';
import { allRecipes } from '../data/recipes';

// 统一顶部导航栏
const Header = () => (
  <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
    <h1 className="text-lg font-bold text-orange-600 text-center flex items-center justify-center gap-1.5">
      <Heart className="size-5 fill-orange-500 text-orange-500" />
      我的收藏
    </h1>
  </div>
);

export default function Favorites() {
  const navigate = useNavigate();
  const { isLoggedIn, favorites } = useAuth();

  const favoriteRecipes = allRecipes.filter(recipe =>
    favorites.includes(recipe.id)
  );

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-3">
        {!isLoggedIn ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 animate-bounce">💔</div>
            <p className="text-gray-600 text-sm mb-1">还没有收藏的菜谱</p>
            <p className="text-gray-400 text-xs mb-4">快去首页探索吧～</p>
            <div className="flex flex-col gap-2 px-4">
              <button
                onClick={() => navigate('/home')}
                className="px-5 py-2.5 bg-orange-500 text-white rounded-full text-sm font-medium active:scale-95 transition-transform"
              >
                去首页探索
              </button>
              <button
                onClick={() => navigate('/home/login?redirect=/home/favorites')}
                className="px-5 py-2.5 bg-white text-orange-600 border-2 border-orange-500 rounded-full text-sm font-medium active:scale-95 transition-transform"
              >
                登录查看收藏
              </button>
            </div>
          </div>
        ) : favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 animate-bounce">🍽️</div>
            <p className="text-gray-600 text-sm mb-1">还没有收藏任何菜谱</p>
            <p className="text-gray-400 text-xs mb-4">快去首页探索吧～</p>
            <button
              onClick={() => navigate('/home')}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-full text-sm font-medium active:scale-95 transition-transform"
            >
              去首页探索
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-xs text-center mb-3">
              共收藏了 <span className="text-orange-600 font-semibold">{favoriteRecipes.length}</span> 道菜谱
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {favoriteRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
