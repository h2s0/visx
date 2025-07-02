import ChallengeCard from '@/components/ChallengeCard';
import { useEffect, useState } from "react";

interface Challenge {
  name: string;
  tag: string[];
  // difficulty: string;
  solves: number;
  flag_try: number;
}

interface FloatingCardsProps {
  data?: Challenge[];
}

const FloatingCards: React.FC<FloatingCardsProps> = ({ data = [] }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    setChallenges(data);
  }, [data]);

  return(
    <div
      className='relative w-full h-screen overflow-hidden'
    >
      <ChallengeCard challenges={challenges} />
    </div>
  )
};

export default FloatingCards;