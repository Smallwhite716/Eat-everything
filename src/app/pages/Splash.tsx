import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PhoneFrame from '../components/PhoneFrame';

export default function Splash() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const navigateTimer = setTimeout(() => {
      navigate('/home');
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center">
        <div
          className={`text-center px-4 transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-6xl mb-3 animate-bounce">🍳</div>
          <h1 className="text-2xl font-bold text-white mb-1">有啥吃啥</h1>
          <p className="text-sm text-orange-100">有食材，就能做</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
