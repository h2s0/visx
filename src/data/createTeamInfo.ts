
import { faker } from '@faker-js/faker';

const createTeamInfo = ( teamCount: number) => {
  const teams = [];

  // 최고 점수
  let currentScore = 3000;

  for ( let i = 0; i < teamCount; i++ ) {
    teams.push({
      name: faker.company.buzzNoun(),
      rank: i+1,
      score: currentScore
    });
    currentScore -= 150;
  }
  return teams.sort((a,b) => a.rank - b.rank);
}

export default createTeamInfo;