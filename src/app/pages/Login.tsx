import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

// 统一顶部导航栏
const Header = () => (
  <div className="bg-gradient-to-b from-orange-50 to-orange-100 px-4 pt-3 pb-4 flex-shrink-0">
    <div className="text-center">
      <div className="text-4xl mb-1.5">🍳</div>
      <h1 className="text-lg font-bold text-orange-600">有啥吃啥</h1>
      <p className="text-xs text-gray-500">有食材，就能做</p>
    </div>
  </div>
);

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const redirectPath = searchParams.get('redirect') || '/home';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号');
      return;
    }
    setCountdown(60);
    toast.success('验证码已发送');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (!code) {
      toast.error('请输入验证码');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({
        id: `phone_${phone}`,
        phone: phone,
        loginMethod: 'phone'
      });
      toast.success('登录成功！');
      setLoading(false);
      navigate(redirectPath);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 text-center">登录账号</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">手机号</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入手机号"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-200 transition-all"
                maxLength={11}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-1">验证码</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="请输入验证码"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-200 transition-all"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  className="px-3 py-2.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium whitespace-nowrap disabled:opacity-50 active:scale-95 transition-transform"
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium disabled:opacity-50 active:scale-98 transition-transform"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <p className="text-[10px] text-gray-400 text-center mt-3">
            登录即表示同意用户协议和隐私政策
          </p>
        </div>

        <div className="text-center mt-3">
          <button
            onClick={() => navigate('/home')}
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
          >
            ← 返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
