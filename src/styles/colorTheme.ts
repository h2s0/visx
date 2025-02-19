// 색깔 테마 변경 방법 : 맨 아래에 있는 selectedTheme 수정

const pastelColors = [
  "#A8E6CF", "#DCE6EA", "#B9D6E3", "#C2D4DC", "#D0D8D8", "#D6D8E6",

  "#C7BCCB", "#F4A5A5", "#F6B8B8", "#E8C3A9", "#D9B89E", "#D9A375",

  "#F4C28D", "#F6A3A3", "#F99B92", "#D9A5C6", "#C9B2E2", "#D6DA93",

  "#D6DB83", "#F0E296", "#A8DE92", "#E3E3D4", "#F6F4EB", "#E0E0E0",

  "#D5E7F2", "#B0DFD3", "#A8D8C6", "#C2D4D8", "#C5D2D5", "#D6D8DC",

  "#E2B7B6", "#F3C6BA", "#F3D7BF", "#EED8C3", "#E8D3BF", "#D9C6B5"
];

const softAutumnColors = [
  "#C0CFC0", "#EAF2E8", "#E5F2C7", "#E0E2E1", "#C7D2CC",

  "#968489", "#FBD1D2", "#FCD7C6", "#E6D4DA", "#C9AFAA",

  "#D6E0EA", "#FCE1D8", "#E8E6E6", "#E8D3D3", "#DEE9F0",
  
  "#DDA28F", "#F7E8D4", "#E5CEC6", "#D6BDA4", "#FCF6CA"
];

const colorThemes = {
  pastel: pastelColors,
  softAutumn: softAutumnColors,
};

// 맨 마지막 단어를 바꿔 색깔 테마 변경
export const selectedTheme = colorThemes.pastel;

export default colorThemes;