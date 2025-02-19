import createTeamInfo from "@/data/createTeamInfo";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Arc } from "@visx/shape";
import { Text } from "@visx/text";
import { useEffect, useMemo, useState } from "react";

const RadialBarsEx: React.FC = () => {
  const [ teams, setTeams ] = useState([]);
  // SVG 의 크기를 동적으로 관리, 브라우저 창 크기가 변경될 때마다 업데이트
  const [dimensions, setDimensions] = useState<{ width: number; height: number; }>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // 회전 상태 관리
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const newTeams = createTeamInfo(20);
    setTeams(newTeams);
    console.log(newTeams);
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 회전 상태를 업데이트하는 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 0.005);
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
      range: [0 , Math.PI * 2 + rotation],
      domain: xDomain,
      padding: 0.1,
    }), [xDomain]);

    // 의존성 배열에 rotation 을 추가하면, 요소의 돌아가는 속도가 달라져서 UI 가 깨지는 이슈가 발생한다. 이유가 뭘까?
    // rotation 값은 매우 자주 변경되는 값이기 때문에 angleScale 이 자주 재계산되어 angleScale 을 초기 설정 이후 고정한다.

  // scaleLinear 를 사용하여 팀의 점수를 원의 반지름으로 매핑, innerRadius, outerRadius 를 결정하는 데 사용됨
  const radiusScale = useMemo(() => scaleLinear({
    range: [innerRadius, outerRadius],
    domain: yDomain,
  }), [innerRadius, outerRadius, yDomain]);

  const toDegrees = (x: number) => (x * 180) / Math.PI;

  return(
    <svg width={dimensions.width} height={dimensions.height}>
      <Group top={dimensions.height / 2} left={dimensions.width / 2} >
        {teams.map((team) => {
          const startAngle = angleScale(getTeamName(team));
          const midAngle = startAngle + angleScale.bandwidth() / 2;
          const endAngle = startAngle + angleScale.bandwidth();

          const outerRadius = radiusScale(getTeamScore(team));

          const textRadius = outerRadius + 4;
          const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
          const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

          return (
            <g key={team.name} transform={`rotate(${toDegrees(rotation)})`}>
              <Arc
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={team.color}
              />
              <Text
                x={textX}
                y={textY}
                dominantBaseline="end"
                textAnchor="middle"
                fill={team.color}
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