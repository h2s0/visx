import FloatingCards from "@/pages/FloatingCards";
import RadialBarsEx from "@/pages/RadialBarsEx";
import WordcloudEx from "@/pages/WordcloudEx";
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Text } from "@chakra-ui/react";
import api from "@/utils/Api";
import RankTable from "@/pages/RankTable";

// 그룹 이름 타입 정의
type GroupName = 'Advanced' | 'Beginner A' | 'Beginner B';

// API 응답 타입 정의
interface TeamData {
  rank: number;
  teamName: string;
  country: string;
  last_update: string;
  currentScore: number;
}

interface ChallengeData {
  name: string;
  tag: string[];
  solves: number;
  flag_try: number;
}

interface ScoreboardResponse {
  teams: TeamData[];
}

interface ChallengeResponse {
  challenges: ChallengeData[];
}

const RootLayout: React.FC = () => {
  // 컴포넌트 인덱스와 그룹 인덱스 상태 관리
  const [componentIndex, setComponentIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);
  
  // 그룹 이름 배열
  const groups: GroupName[] = ['Advanced', 'Beginner A', 'Beginner B'];
  
  // 각 그룹별 데이터 상태 관리
  const [groupData, setGroupData] = useState<{
    [key in GroupName]: {
      teams: TeamData[];
      challenges: ChallengeData[];
    }
  }>({ 
    'Advanced': { teams: [], challenges: [] },
    'Beginner A': { teams: [], challenges: [] },
    'Beginner B': { teams: [], challenges: [] }
  });

  // 현재 표시할 그룹 이름
  const currentGroup = groups[groupIndex];
  
  // 현재 그룹의 데이터
  const currentTeams = groupData[currentGroup].teams;
  const currentChallenges = groupData[currentGroup].challenges;

  // 데이터 가져오기 함수
  const fetchGroupData = async (groupName: GroupName) => {
    try {
      // 스코어보드 데이터 가져오기
      const scoreboardResponse = await api.get<ScoreboardResponse>(`/pub_scoreboard/${encodeURIComponent(groupName)}`);
      
      // 챌린지 데이터 가져오기
      const challengeResponse = await api.get<ChallengeResponse>(`/pub_challenge/${encodeURIComponent(groupName)}`);
      
      // 상태 업데이트
      setGroupData(prevData => ({
        ...prevData,
        [groupName]: {
          teams: scoreboardResponse.data.teams,
          challenges: challengeResponse.data.challenges
        }
      }));
    } catch (error) {
      console.error(`${groupName} 데이터를 가져오는 중 오류 발생:`, error);
    }
  };
  
  // 모든 그룹의 데이터 가져오기
  const fetchAllGroupData = async () => {
    for (const group of groups) {
      await fetchGroupData(group);
    }
  };

  // 컴포넌트 목록 정의
  const getComponents = () => [
    <WordcloudEx data={currentTeams} />,
    <RadialBarsEx data={currentTeams} />,
    <FloatingCards data={currentChallenges} />,
    <RankTable teams={currentTeams} />
  ];
  
  // 현재 표시할 컴포넌트
  const currentComponent = getComponents()[componentIndex];

  // 초기 데이터 로드
  useEffect(() => {
    fetchAllGroupData();
    
    // 10초마다 컴포넌트 변경, 한 사이클(4개 컴포넌트) 후 그룹 변경
    const interval = setInterval(() => {
      setComponentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % 4;
        
        // 컴포넌트 사이클이 완료되면 그룹 변경
        if (nextIndex === 0) {
          setGroupIndex(prevGroupIndex => (prevGroupIndex + 1) % groups.length);
        }
        
        return nextIndex;
      });
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='flex flex-col text-white relative'>
      <Text fontSize="3xl" position="absolute" top="32px" left="32px" zIndex="1" fontWeight="bold">
        {currentGroup}
      </Text>
      <motion.div
        key={`${currentGroup}-${componentIndex}`}
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {currentComponent}
      </motion.div>
      <Outlet />
    </main>
  )
}

export default RootLayout;