import { useNavigate } from 'react-router';
import { User, LogOut, ChevronRight, Utensils, Clock, Bell, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

// 统一顶部导航栏
const Header = () => (
  <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
    <h2 className="text-lg font-bold text-gray-800 text-center">我的</h2>
  </div>
);

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
  };

  // 未登录状态
  if (!isLoggedIn) {
    return (
      <div className="h-full flex flex-col">
        <Header />

        <div className="flex-1 overflow-y-auto px-3 pt-4">
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User className="size-7 text-orange-600" />
            </div>

            <h3 className="text-sm font-medium text-gray-800 mb-1">登录后体验更多功能</h3>
            <p className="text-gray-400 text-xs mb-4">收藏喜欢的菜谱，随时查看</p>

            <button
              onClick={() => navigate('/home/login')}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-full text-sm font-medium active:scale-95 transition-transform"
            >
              立即登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 已登录状态
  if (!user) return null;

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-3">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <User className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800">
                {user.name || '美食爱好者'}
              </h3>
              <p className="text-xs text-gray-500">
                {user.phone || '用户'}
              </p>
            </div>
          </div>
        </div>

        {/* 发布菜谱入口 */}
        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-3.5 shadow-sm mb-3 flex items-center gap-3 active:scale-98 transition-transform">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Utensils className="size-5" />
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-semibold">发布菜谱</div>
            <div className="text-[10px] text-orange-100">分享你的拿手好菜</div>
          </div>
          <ChevronRight className="size-4 text-white/60" />
        </button>

        {/* 设置菜单 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
          <button className="w-full flex items-center justify-between px-3.5 py-3 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 text-orange-500" />
              <span className="text-sm text-gray-800">浏览记录</span>
            </div>
            <ChevronRight className="size-3.5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-3.5 py-3 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <Shield className="size-4 text-orange-500" />
              <span className="text-sm text-gray-800">账号与安全</span>
            </div>
            <ChevronRight className="size-3.5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-3.5 py-3 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <Bell className="size-4 text-orange-500" />
              <span className="text-sm text-gray-800">通知设置</span>
            </div>
            <ChevronRight className="size-3.5 text-gray-400" />
          </button>
        </div>

        {/* 退出登录 */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-white text-red-600 rounded-xl shadow-sm text-sm font-medium flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
        >
          <LogOut className="size-3.5" />
          退出登录
        </button>
      </div>
    </div>
  );
}
