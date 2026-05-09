export const postcardThemes = [
  {
    id: 'golden-hour',
    name: 'Golden Hour Memory',
    mood: 'Warm and glowing',
    palette: ['#fff3dd', '#f3c98b', '#c9872d'],
    caption:
      'For a visit that feels sunlit, welcoming, and gently celebratory.',
  },
  {
    id: 'market-breeze',
    name: 'Market Breeze',
    mood: 'Lively and social',
    palette: ['#fff6ec', '#d97b35', '#2f8a7d'],
    caption:
      'For visitors who remember movement, chatter, crossings, and quick discoveries.',
  },
  {
    id: 'quiet-canal',
    name: 'Quiet Canal Reflection',
    mood: 'Soft and reflective',
    palette: ['#f4f4ec', '#92b7ae', '#5e7b70'],
    caption:
      'For a slower route shaped by water, shade, and small details.',
  },
];

const themeTranslations = {
  'golden-hour': {
    name: '金色时刻记忆',
    mood: '温暖明亮',
    caption: '适合记录阳光、友好而轻松庆祝感的参观体验。',
  },
  'market-breeze': {
    name: '市井微风',
    mood: '热闹而有社交感',
    caption: '适合记住流动、交谈、穿行和快速发现的游客。',
  },
  'quiet-canal': {
    name: '安静运河回望',
    mood: '柔和而沉静',
    caption: '适合被水、阴影和细节塑造的慢速路线。',
  },
};

export function localizePostcardTheme(theme, language = 'en') {
  if (language !== 'zh') {
    return theme;
  }

  return {
    ...theme,
    ...themeTranslations[theme.id],
  };
}
