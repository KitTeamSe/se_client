/*
 * media query 영역을 세 영역으로 나눔
 * - 모바일 환경  ~ 767px
 * - 태블릿 환경 768px ~ 1023px
 * - PC 환경 1024px ~
 * 사용 예시
 * // ... PC 환경 및 기본 CSS ...
 * @media ${({ theme }) => theme.sizeQuery.tablet} {
 *   // ... 태블릿 환경 CSS ...
 * }
 * @media ${({ theme }) => theme.sizeQuery.mobile} {
 *   // ... 모바일 환경 CSS ...
 * }
 */

const width = {
  mobile: 768,
  tablet: 1024
};

const size = {
  mobile: `${width.mobile - 32}px`,
  tablet: `${width.tablet - 24}px`
};

const sizeQuery = {
  mobile: `screen and (max-width: ${width.mobile - 1}px)`,
  tablet: `screen and (max-width: ${width.tablet - 1}px)`
};

export default { size, sizeQuery };
