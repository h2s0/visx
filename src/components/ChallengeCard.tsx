import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ChallengeCardProps {
  challenges: Challenge[];
  total: number;
};

interface Challenge {
  name: string;
  categories: string[];
  difficulty: string;
  teams_solved: number;
  total_attempts: number;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenges, total }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 각 요소별 y축 움직임을 생성하는 함수
  const getYMotion = (index: number) => {
    const amplitude = 20; // 최대 이동 범위
    return [
      0,
      amplitude * Math.pow(-1, index % 2),
      0,
      amplitude * Math.pow(-1, (index + 1) % 2),
      0
    ];
  };

  return(
    <>
    {challenges.map((challenge, i) => {
      const correctRate = challenge.total_attempts / challenge.teams_solved;
      return (
        <motion.div
          key={i}
          className="flex-col bg-indigo-300 p-5 rounded"
          initial={{ x: windowWidth, y: 0 }}
          animate={{
            x: -windowWidth,
            y: getYMotion(i) // 각 요소별 y축 움직임
          }}
          transition={{
            x: {
              duration: 35,
              loop: Infinity,
              ease: "linear"
            },
            y: {
              duration: 5,
              loop: Infinity,
            }
          }}
        >
          <p className="font-bold">{challenge.name}</p>
          <div className="flex gap-2 text-xs">
          {challenge.categories.map((category, index) => (
            <span
              key={index}
              className="bg-white rounded p-1"
            >
              {category}
            </span>
          ))}
          </div>
          <p>{challenge.difficulty}</p>
          <p>{challenge.teams_solved} team Solved!</p>
          <p>{(challenge.total_attempts / challenge.teams_solved).toFixed(2)}</p>
        </motion.div>
      )
    })}
    </>
  )
};

export default ChallengeCard;
