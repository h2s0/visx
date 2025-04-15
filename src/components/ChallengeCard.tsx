import { Divider, Flex, Text, useTheme } from '@chakra-ui/react';
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

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return theme.colors.green;
      case 'Medium':
        return theme.colors.primary[100];
      case 'Hard':
        return theme.colors.red;
      case 'default':
        return theme.colors.primary[500];
    }
  };

  return(
    <motion.div
      className='flex gap-5 p-5 absolute'
      style={{ top: "50%", y: "-50%" }}
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
              className="bg-white py-1 px-4 rounded-full max-w-fit text-[0.9375rem]"
              style={{
                backgroundColor: theme.colors.primary[400],
              }}
            >
              {category.toUpperCase()}
            </p>
          ))}
          </div>
          <div className='flex flex-col gap-2'>
            <Divider />
            <Text color={difficultyColor(challenge.difficulty)}>
              {challenge.difficulty.toUpperCase()}
            </Text>
            <Divider />
            <p>{challenge.teams_solved} TEAM SOLVED!</p>
            <Divider />
            <p>
              CORRECT RATE : {parseInt(challenge.total_attempts / challenge.teams_solved)}%
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
