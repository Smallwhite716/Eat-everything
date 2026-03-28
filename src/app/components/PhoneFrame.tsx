import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* iPhone 16 Pro Max: 430 x 932 */}
      <div className="relative bg-black w-[430px] h-[932px] rounded-[50px] shadow-2xl overflow-hidden border-[3px] border-gray-900">
        {/* Dynamic Island */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[36px] bg-black z-50 rounded-[24px]" />

        {/* 状态栏 - 白色背景与APP顶部衔接 */}
        <div className="h-[54px] px-8 pt-[14px] flex items-center justify-between z-40 bg-white">
          <span className="text-gray-900 text-xs font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* 信号 */}
            <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="14" width="3" height="6" rx="1" opacity="0.4"/>
              <rect x="6.5" y="10" width="3" height="10" rx="1" opacity="0.6"/>
              <rect x="11" y="6" width="3" height="14" rx="1" opacity="0.8"/>
              <rect x="15.5" y="2" width="3" height="18" rx="1"/>
            </svg>
            {/* WiFi */}
            <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5.27-4.44l1.42 1.42a6.01 6.01 0 017.7 0l1.42-1.42a8.01 8.01 0 00-10.54 0zm-2.83-2.83l1.42 1.42a9.99 9.99 0 0113.36 0l1.42-1.42c-4.49-4.49-11.71-4.49-16.2 0zm-2.83-2.83l1.42 1.42a14 14 0 0118.02 0l1.42-1.42a16 16 0 00-20.86 0z"/>
            </svg>
            {/* 电池 */}
            <div className="flex items-center">
              <div className="w-6 h-3 border border-gray-900 rounded-[2px] relative">
                <div className="absolute inset-[2px] right-1 bg-gray-900 rounded-[1px]" />
              </div>
              <div className="w-[3px] h-[6px] bg-gray-900 rounded-r-[1px] ml-[1px]" />
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="h-[calc(100%-54px)] flex flex-col bg-orange-50 overflow-hidden">
          {children}
        </div>

      </div>
    </div>
  );
}
