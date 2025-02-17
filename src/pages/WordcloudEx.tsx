import React, { useState, useEffect } from 'react';
import { Text } from '@visx/text';
import { scaleLinear } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { motion } from 'framer-motion';
import createTeamInfo from '@/data/createTeamInfo';

interface WordData {
  text: string;
  value: number;
}

const WordcloudEx: React.FC = () => {
  // 창 크기 상태 관리
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 색깔 목록
  const colors = ['#143059', '#2F6B9A', '#82a6c2'];

  const totalTeam = 30;
  // faker js 를 사용하여 더미데이터 생성, 추후 데이터 통신으로 받아올 것
  const teamInfo = createTeamInfo(totalTeam);

  // teamInfo를 사용하여 words 배열 생성
  const words: WordData[] = teamInfo.map(team => ({
    text: team.name,
    value: team.score,
  }));

  const max = Math.max(...words.map(word => word.value));
  const min = Math.min(...words.map(word => word.value));

  const fontSizeScale = scaleLinear({
    domain: [min, max],
    range: [10, 100],
  });

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize); // 창 크기 변경 감지
    return () => {
      window.removeEventListener('resize', handleResize); // 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <div className="wordcloud" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Wordcloud
        words={words} // 단어 리스트
        width={dimensions.width}
        height={dimensions.height}
        fontSize={(d: WordData) => fontSizeScale(d.value)} // 단어 크기 조절
        font="Impact"
        padding={2}
        spiral="archimedean" // 단어 배치 방식
        rotate={() => 0} // 단어 회전 없음
        random={() => 0.5} // 랜덤 배치 값
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            // 애니메이션 적용할 요소가 svg 의 <g></g> 그룹임
            <motion.g
              key={w.text}
              // Framer motion 에서 initial : 애니메이션 시작 시 상태
              initial={{
                x: Math.random() * dimensions.width - dimensions.width / 2, // 랜덤한 시작 위치
                y: Math.random() * dimensions.height - dimensions.height / 2,
                opacity: 0
              }}
              // Framer motion 에서 animate : 목표 상태 ( 완료 후 위치나 투명도 등 )
              animate={{
                x: w.x, // 원래 위치로 이동
                y: w.y, // 원래 위치로 이동
                opacity: 1
              }}
              // Framer motion 에서 transition : 애니메이션 속도 및 효과 설정
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                delay: i * 0.05 // 순차적으로 애니메이션 실행, 단어마다 딜레이
              }}
            >
              <Text
                fill={colors[i % colors.length]} // 색상 순환
                textAnchor="middle"
                fontSize={w.size}
                fontFamily="Impact"
              >
                {w.text}
              </Text>
            </motion.g>
          ))
        }
      </Wordcloud>
    </div>
  );
};

export default WordcloudEx;
