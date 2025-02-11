import { faker } from '@faker-js/faker';

const createTeamInfo = (teamCount: number) => {
  const teams = [];
  const maxScore = 3000;

  for (let i = 0; i < teamCount; i++) {
    // 점수를 랜덤으로 생성하되, 100점 단위로 설정합니다. 예: 100 ~ 1000 점 범위
    const score = Math.floor(Math.random() * (maxScore / 100) + 1) * 100;
    
    teams.push({
      name: `${faker.company.buzzNoun()}-${score}`,
      score: score
    });
  }

  // 점수가 높은 순서대로 팀을 정렬, 랭크 할당
  teams.sort((a, b) => b.score - a.score).forEach((team, index) => {
    team.rank = index + 1;
  });

  return teams;
}

export default createTeamInfo;