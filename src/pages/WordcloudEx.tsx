import React, { useState, useEffect } from "react";
import { Text } from "@visx/text";
import { scaleLinear } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { motion } from "framer-motion";
import createTeamInfo from "@/data/createTeamInfo";

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
  const colors = ["#143059", "#2F6B9A", "#82a6c2"];

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
    
    window.addEventListener("resize", handleResize); // 창 크기 변경 감지
    return () => {
      window.removeEventListener("resize", handleResize); // 언마운트 시 이벤트 제거
    };
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const wordVariants = {
    initial: (w: any) => ({
      // x: Math.random() * dimensions.width - dimensions.width / 2, // 랜덤한 시작 위치
      // y: Math.random() * dimensions.height - dimensions.height / 2,
      x: w.x,
      y: w.y,
      opacity: 0,
    }),
    appear: (w: any) => ({
      x: w.x ?? centerX,
      y: w.y ?? centerY,
      opacity: 1,
      transition: {
        duration: 3,
        ease: "easeOut",
        delay: w.i * 0.1,
      },
    }),
    floating: (w: any) => ({
      x: [w.x , w.x + Math.random() * 5, w.x],
      y: [w.y , w.y + Math.random() * 5, w.y],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    }),
  };

  return (
    <div className="wordcloud" style={{ width: "100%", height: "100%", position: "relative" }}>
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
              variants={wordVariants}
              custom={{...w, i}}
              // Framer motion 에서 initial : 애니메이션 시작 시 상태
              initial="initial"
              // Framer motion 에서 animate : 목표 상태 ( 완료 후 위치나 투명도 등 )
              animate={["appear", "floating"]}
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
