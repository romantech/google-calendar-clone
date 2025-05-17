/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // 코드 한 줄의 최대 길이 100칸
  printWidth: 100,
  // 들여쓰기 너비 2칸
  tabWidth: 2,
  // 스페이스로 들여쓰기
  useTabs: false,
  // 코드 마지막에 세미콜론 추가
  semi: true,
  // 문자열에 작은따옴표(') 사용
  singleQuote: true,
  // JSX 속성값에 큰따옴표("") 사용
  jsxSingleQuote: false,
  // 객체 속성에 따옴표가 필요한 속성이 하나라도 있으면, 모든 속성에 따옴표 사용
  quoteProps: 'consistent',
  // 여러 줄로 이루어진 객체, 배열, 함수 호출 파라미터 등의 마지막 요소 뒤에 항상 쉼표 추가
  trailingComma: 'all',
  // 객체 양쪽 중괄호 안쪽에 항상 공백 추가
  bracketSpacing: true,
  // 화살표 함수 파라미터에 항상 괄호 사용
  arrowParens: 'always',
  // 마크다운 파일에서 기존 작성된 대로 줄바꿈 유지
  proseWrap: 'preserve',
  // HTML 파일에서 CSS display 속성에 따라 공백 처리
  htmlWhitespaceSensitivity: 'css',
  // 파일의 줄 끝을 Unix 스타일 줄바꿈(\n, line feed)으로 설정
  endOfLine: 'lf',
  // HTML, Markdown 등에 포함된 코드 블록 자동 포맷팅
  embeddedLanguageFormatting: 'auto',
  // HTML, JSX, Vue 태그에서 가능한 경우 한 줄에 여러 속성 배치
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
