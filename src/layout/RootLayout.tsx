import FloatingCards from "@/pages/FloatingCards";
import RadialBarsEx from "@/pages/RadialBarsEx";
import WordcloudEx from "@/pages/WordcloudEx";
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(<WordcloudEx />);

  useEffect(() => {
    // 표시할 컴포넌트 목록
    const components = [ <WordcloudEx />, <RadialBarsEx />, <FloatingCards /> ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % components.length;
      setCurrentComponent(components[index]);
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='flex flex-col text-white'>
      {currentComponent}
      <Outlet />
    </main>
  )
}

export default RootLayout;