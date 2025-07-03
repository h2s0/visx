import { Divider, Text, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ChallengeCardProps {
  challenges: Challenge[];
};

interface Challenge {
  name: string;
  tag: string[];
  difficult: string;
  solves: number;
  flag_try: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenges }) => {
  const doubleChallenges = [...challenges, ...challenges];
  const theme = useTheme();

  const difficultyColor = (difficult: string) => {
    switch (difficult) {
      case 'easy':
        return theme.colors.green;
      case 'normal':
        return theme.colors.primary[100];
      case 'hard':
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
      const correctRate = Math.floor((challenge.solves / challenge.flag_try) * 100);
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
          <p className="text-lg font-bold">
            {(challenge.name).toUpperCase()}
          </p>
          <div className='flex flex-col gap-2'>
          {challenge.tag.map((tag, index) => (
            <p
              key={index}
              className="bg-white py-1 px-4 rounded-full max-w-fit text-[0.9375rem]"
              style={{
                backgroundColor: theme.colors.primary[400],
              }}
            >
              {tag.toUpperCase()}
            </p>
          ))}
          </div>
          <div className='flex flex-col gap-2'>
            <Divider />
            {challenge.difficult &&
              <Text color={difficultyColor(challenge.difficult)}>
                {challenge.difficult.toUpperCase()}
              </Text>
            }
            <Divider />
            <p>{challenge.solves} TEAM SOLVED!</p>
            <Divider />
            <p>
              CORRECT RATE : {correctRate}%
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
