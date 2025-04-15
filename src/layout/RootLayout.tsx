import FloatingCards from "@/pages/FloatingCards";
import RadialBarsEx from "@/pages/RadialBarsEx";
import WordcloudEx from "@/pages/WordcloudEx";
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const RootLayout: React.FC = () => {
  // 표시 할 컴포넌트 목록
  const components = [ <WordcloudEx />, <RadialBarsEx />, <FloatingCards /> ];
  const [ index, setIndex ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % components.length);
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='flex flex-col text-white'>
      <motion.div
        key={index}
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {components[index]}
      </motion.div>
      <Outlet />
    </main>
  )
}

export default RootLayout;