import ChallengeCard from '@/components/ChallengeCard';
import challengesData from "@/data/challenges";
import { useEffect, useState } from "react";

interface challenges {
  name: string;
  categories: string[];
  difficulty: string;
  teams_solved: number;
  total_attempts: number;
}

const FloatingCards: React.FC = () => {
  const [challenges, setChallenges] = useState<challenges[]>([]);
  const [totalTeam, setTotalTeam] = useState<number>(0);

  useEffect(() => {
    setChallenges(challengesData.problems);
    setTotalTeam(challengesData.total_teams);
  }, [challengesData]);

  return(
    <section className='mt-20'>
      <ChallengeCard challenges={challenges} total={totalTeam} />
    </section>
  )
};

export default FloatingCards;