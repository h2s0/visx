import createTeamInfo from "@/data/createTeamInfo";
import RadialBarsColors from "@/styles/RadialBarsColors";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Arc } from "@visx/shape";
import { useEffect, useMemo, useRef, useState } from "react";

type Teams = ReturnType<typeof createTeamInfo>;
type Team = Teams[number];

interface ProcessedTeams extends Team {
  startAngle: number;
  endAngle: number;
  midAngle: number;
  outerRadius: number;
  textRadius: number;
  textX: number;
  textY: number;
  textLines: string[];
  rotationCenterX: number;
  rotationCenterY: number;
}

const RadialBarsEx: React.FC = () => {
  const rotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [teams, setTeams] = useState<Teams>([]);
  // SVG 의 크기를 동적으로 관리, 브라우저 창 크기가 변경될 때마다 업데이트
  const [dimensions, setDimensions] = useState<{ width: number; height: number; }>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // 회전 상태 관리
  const [rotation, setRotation] = useState(0);

  // 팀 정보 생성, 색깔 지정
  useEffect(() => {
    setRotation(0);
    const coloredTeams = createTeamInfo(20).map((team, i) => ({
      ...team,
      color: RadialBarsColors[i % RadialBarsColors.length],
    }));
    setTeams(coloredTeams);
  }, []);

  // 브라우저 리사이즈 감지해 SVG 크기 업데이트
  useEffect(() => {
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
    rotateTimerRef.current = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 0.005);
    }, 100);
    return () => {
      if (rotateTimerRef.current) {
        clearInterval(rotateTimerRef.current);
      }
    };
  }, []);

  const outerRadius = Math.min(dimensions.width, dimensions.height) / 2 - 100;
  const innerRadius = outerRadius / 2;

  // 팀 이름을 기준으로 설정, 원호의 시작 각도를 결정하는 데 사용
  const xDomain = useMemo(() => teams.map(team => team.name).sort(), [teams]);
  // 점수의 최대값을 계산하여 outerRadius 의 최대 범위를 설정하는 데 사용
  const yDomain = useMemo(() => [0, Math.max(...teams.map(team => team.score))], [teams]);

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

  const fontSize = 20;

  // 글자 자르는 함수
  const splitText = (text: string, maxLen: number): string[] => {
    const result = [];
    for (let i = 0; i < text.length; i += maxLen) {
      result.push(text.slice(i, i + maxLen));
    }
    return result;
  };

  const processedTeams: ProcessedTeams[] = useMemo(() => {
    return teams.map((team) => {
      const name = team.name;
      const score = team.score;
      const color = team.color;

      const startAngle = angleScale(name as string);
      if (startAngle == null) return null;

      const angleWidth = angleScale.bandwidth();
      const midAngle = startAngle + angleScale.bandwidth() / 2;
      const endAngle = startAngle + angleScale.bandwidth();
      const outerRadius = radiusScale(team.score);
      const textRadius = outerRadius + 4;
      
      const arcLength = angleWidth * textRadius;
      
      const approxTextWidth = name.length * fontSize * 0.6;
      const needsWrap = approxTextWidth > arcLength;
      const textLines = needsWrap
      ? splitText(name, Math.floor(name.length / 2))
      : [name];

      const totalHeight = textLines.length * fontSize * 1.2;
      
      const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
      const textY = textRadius * Math.sin(midAngle - Math.PI / 2) - totalHeight / 2;

      const rotationCenterX = textRadius * Math.cos(midAngle - Math.PI / 2);
      const rotationCenterY = textRadius * Math.sin(midAngle - Math.PI / 2);
      
      return {
        name,
        score,
        color,
        startAngle,
        midAngle,
        endAngle,
        outerRadius,
        textX,
        textY,
        textRadius,
        textLines,
        rotationCenterX,
        rotationCenterY,
      }
    }).filter((t): t is ProcessedTeams & { textLines: string[] } => t !== null);
  }, [teams, angleScale, radiusScale]);

  return(
    <>
      <svg width={dimensions.width} height={dimensions.height}>
        <Group top={dimensions.height / 2} left={dimensions.width / 2} >
          {processedTeams.map((team) => {
            return (
              <g key={team.name} transform={`rotate(${toDegrees(rotation)})`}>
                <Arc
                  startAngle={team.startAngle}
                  endAngle={team.endAngle}
                  innerRadius={innerRadius}
                  outerRadius={team.outerRadius}
                  fill={team.color}
                />
                <text
                  x={team.rotationCenterX}
                  y={team.rotationCenterY}
                  transform={`rotate(${toDegrees(team.midAngle)}, ${team.rotationCenterX}, ${team.rotationCenterY})`}
                  textAnchor="middle"
                  fill={team.color}
                  fontSize={fontSize}
                  fontWeight="bold"
                >
                  {team.textLines.map((line, i) => (
                    <tspan
                      key={i}
                      x={team.textX}
                      y={team.textY + (i - (team.textLines.length - 1) / 2) * fontSize * 1.2}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </Group>
      </svg>
  </>
  )
}

export default RadialBarsEx;