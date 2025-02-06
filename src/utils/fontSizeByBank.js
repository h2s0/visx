// 폰트 크기를 결정하는 함수: 순위가 높을수록 큰 크기

function fontSizeByRank(rank, totalTeams) {
  const maxFontSize = 100;
  const minFontSize = 20;
  return maxFontSize - ((rank - 1) / (totalTeams - 1)) * (maxFontSize - minFontSize);
}

export default fontSizeByRank;
