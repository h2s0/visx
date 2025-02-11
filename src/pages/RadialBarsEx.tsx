import createTeamInfo from '@/data/createTeamInfo';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Arc } from '@visx/shape';
import { Text } from '@visx/text';
import { useEffect, useMemo, useState } from 'react';

const RadialBarsEx: React.FC = () => {
  const [ teams, setTeams ] = useState([]);
  // SVG 의 크기를 동적으로 관리, 브라우저 창 크기가 변경될 때마다 업데이트
  const [dimensions, setDimensions] = useState<{ width: number; height: number; }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const newTeams = createTeamInfo(20);
    setTeams(newTeams);
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

  console.log(teams);

  const outerRadius = Math.min(dimensions.width, dimensions.height) / 2 - 40;
  const innerRadius = outerRadius / 2;

  const getTeamName = team => team.name;
  const getTeamScore = team => team.score;

  // 팀 이름을 기준으로 설정, 원호의 시작 각도를 결정하는 데 사용
  const xDomain = useMemo(() => teams.map(getTeamName).sort(), [teams]);
  // 점수의 최대값을 계산하여 outerRadius 의 최대 범위를 설정하는 데 사용
  const yDomain = useMemo(() => [0, Math.max(...teams.map(getTeamScore))], [teams]);

  // scaleBand 를 사용하여 각 팀의 이름을 원의 각도로 매핑. 각 원호가 시작하는 각도와 종료 각도를 계산하는 데 사용됨
  const angleScale = useMemo(() => scaleBand({
      range: [0 , Math.PI * 2],
      domain: xDomain,
      padding: 0.1,
    }),
    [xDomain, teams.length]
  );

  // scaleLinear 를 사용하여 팀의 점수를 원의 반지름으로 매핑, innerRadius, outerRadius 를 결정하는 데 사용됨
  const radiusScale = useMemo(() => scaleLinear({
      range: [innerRadius, outerRadius],
      domain:  [0, Math.max(...teams.map(getTeamScore))],
    }), [innerRadius, outerRadius, yDomain]);

  const barColor = '#93F9B9';
  const toDegrees = (x: number) => (x * 180) / Math.PI;

  return(
    <svg width={dimensions.width} height={dimensions.height}>
      <Group top={dimensions.height / 2} left={dimensions.width / 2}>
        {teams.map((team) => {
          const startAngle = angleScale(getTeamName(team));
          const midAngle = startAngle + angleScale.bandwidth() / 2;
          const endAngle = startAngle + angleScale.bandwidth();

          const outerRadius = radiusScale(getTeamScore(team));

          const textRadius = outerRadius + 4;
          const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
          const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

          return (
            <g key={team.name}>
              <Arc
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={barColor}
              />
              <Text
                x={textX}
                y={textY}
                dominantBaseline="end"
                textAnchor="middle"
                fill={barColor}
                fontSize={20}
                fontWeight="bold"
                angle={toDegrees(midAngle)}
              >
                {team.name}
              </Text>
            </g>
          );
        })}
      </Group>
      </svg>
  )
}

export default RadialBarsEx;