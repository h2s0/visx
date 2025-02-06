import React, { useState, useEffect } from 'react';
import { Text } from '@visx/text';
import { scaleLinear } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import createTeamInfo from '@/data/createTeamInfo';

interface WordData {
  text: string;
  value: number;
  size?: number;
  color?: string;
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

const totalTeam = 30;
// faker js 를 사용하여 더미데이터 생성
const teamInfo = createTeamInfo(totalTeam);

console.log(teamInfo);

// teamInfo를 사용하여 words 배열 생성
const words: WordData[] = teamInfo.map(team => ({
  text: team.name,
  // value: totalTeam - team.rank,
  value: team.score,
}));

const max = Math.max(...words.map(word => word.value));
const min = Math.min(...words.map(word => word.value));

const fontSizeScale = scaleLinear({
  domain: [min, max],
  range: [10, 100],
});

// const colorScale = scaleLinear({
//   domain: [minRank, maxRank],
//   range: ['#ccc', '#000'],
// });

const WordcloudEx: React.FC = () => {
  // 상태로 width와 height 관리
  const [dimensions, setDimensions] = useState<{ width: number; height: number; }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="wordcloud" style={{ width: '100%', height: '100%' }}>
      <Wordcloud
        words={words}
        width={dimensions.width}
        height={dimensions.height}
        fontSize={(d: WordData) => fontSizeScale(d.value)}
        font="Impact"
        padding={2}
        spiral="archimedean"
        rotate={() => 0}
        random={() => 0.5}
      >
        {(cloudWords) => cloudWords.map((w, i) => (
          <Text
            key={w.text}
            // fill={colorScale(w.value)}
            fill={colors[i % colors.length]}
            textAnchor="middle"
            transform={`translate(${w.x}, ${w.y})`}
            fontSize={w.size}
            fontFamily="Impact"
          >
            {w.text}
          </Text>
        ))}
      </Wordcloud>
    </div>
  );
};

export default WordcloudEx;
