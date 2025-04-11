import { Divider, Flex, useTheme } from '@chakra-ui/react';
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
  const theme = useTheme();

  return(
    <motion.div
      className='flex gap-5 border-4 p-5 absolute'
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{
        duration: 30,
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
          className="flex flex-col gap-4 p-6 rounded-2xl border w-[250px]"
          style={{
            backgroundColor: theme.colors.primary[900],
            borderColor: theme.colors.primary[700],
          }}
          initial={{ y: "10%" }}
          animate={{ y: "-10%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: delay,
            ease: "easeInOut",
          }}
        >
          <p className="text-lg">
            {(challenge.name).toUpperCase()}
          </p>
          <div className='flex flex-col gap-2'>
          {challenge.categories.map((category, index) => (
            <p
              key={index}
              className="bg-white py-1 px-4 rounded-2xl max-w-fit"
              style={{
                backgroundColor: theme.colors.primary[400],
              }}
            >
              {category.toUpperCase()}
            </p>
          ))}
          </div>
          <div className='flex flex-col gap-2'>
            <Divider colorScheme='' />
            <p>
              {challenge.difficulty.toUpperCase()}
            </p>
            <Divider />
            <p>{challenge.teams_solved} TEAM SOLVED!</p>
            <Divider />
            <p>
              {parseInt(challenge.total_attempts / challenge.teams_solved)}
            </p>
            <Divider />
          </div>
        </motion.div>
      )
    })}
    </motion.div>
  )
};

export default ChallengeCard;
