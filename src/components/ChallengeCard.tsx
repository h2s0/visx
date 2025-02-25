import { motion } from 'framer-motion';

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
  const doubleChallenges = [...challenges, ...challenges];

  return(
    <motion.div
      className='flex gap-5 border p-5 absolute'
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
    >
    {doubleChallenges.map((challenge, i) => {
      const correctRate = challenge.total_attempts / challenge.teams_solved;
      const delay = 0.4 * i;
      return (
        <motion.div
          key={i}
          className="flex-col bg-indigo-300 p-5 rounded"
          initial={{ y: "15%" }}
          animate={{ y: "-15%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: delay,
            ease: "easeInOut",
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
    </motion.div>
  )
};

export default ChallengeCard;
