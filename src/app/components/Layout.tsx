import { Outlet } from 'react-router';
import { Heart, Home, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/home');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const isActive = (path: string) => activeTab === path;

  const tabs = [
    { path: '/home', icon: Home, label: '首页' },
    { path: '/home/favorites', icon: Heart, label: '收藏' },
    { path: '/home/profile', icon: User, label: '我的' },
  ];

  return (
    <div className="h-full flex flex-col bg-orange-50">
      {/* 主内容 */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* 底部导航栏 - 固定在底部 */}
      <nav className="bg-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around py-2.5 px-2">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setActiveTab(path)}
                className={`relative flex flex-col items-center justify-center gap-0.5 px-5 py-1.5 min-w-[70px] transition-all duration-200 ${
                  active ? 'text-orange-500' : 'text-gray-400 active:text-gray-500'
                }`}
              >
                {/* 选中时的图标背景 */}
                <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-10 rounded-2xl transition-all duration-300 ${
                  active ? 'bg-orange-50' : ''
                }`} />

                <Icon
                  className={`relative z-10 size-6 transition-all duration-200 ${
                    active ? 'scale-110' : ''
                  } ${active && path === '/home/favorites' ? 'fill-orange-400' : ''}`}
                  strokeWidth={active ? 2.5 : 2}
                />

                <span
                  className={`relative z-10 text-[11px] transition-all duration-200 ${
                    active ? 'font-semibold' : ''
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
