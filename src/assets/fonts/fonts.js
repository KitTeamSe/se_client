/* eslint import/no-unresolved: [2, { ignore: ['\.woff2$', '\.woff$', '\.otf$'] }] */
import { createGlobalStyle } from 'styled-components';
import NotoSansKRThinWoff2 from './NotoSansKr/NotoSansKR-Thin.woff2';
import NotoSansKRThinWoff from './NotoSansKr/NotoSansKR-Thin.woff';
import NotoSansKRThinOtf from './NotoSansKr/NotoSansKR-Thin.otf';
import NotoSansKRLightWoff2 from './NotoSansKr/NotoSansKR-Light.woff2';
import NotoSansKRLightWoff from './NotoSansKr/NotoSansKR-Light.woff';
import NotoSansKRLightOtf from './NotoSansKr/NotoSansKR-Light.otf';
import NotoSansKRRegularWoff2 from './NotoSansKr/NotoSansKR-Regular.woff2';
import NotoSansKRRegularWoff from './NotoSansKr/NotoSansKR-Regular.woff';
import NotoSansKRRegularOtf from './NotoSansKr/NotoSansKR-Regular.otf';
import NotoSansKRMediumWoff2 from './NotoSansKr/NotoSansKR-Medium.woff2';
import NotoSansKRMediumWoff from './NotoSansKr/NotoSansKR-Medium.woff';
import NotoSansKRMediumOtf from './NotoSansKr/NotoSansKR-Medium.otf';
import NotoSansKRBoldWoff2 from './NotoSansKr/NotoSansKR-Bold.woff2';
import NotoSansKRBoldWoff from './NotoSansKr/NotoSansKR-Bold.woff';
import NotoSansKRBoldOtf from './NotoSansKr/NotoSansKR-Bold.otf';
import NotoSansKRBlackWoff2 from './NotoSansKr/NotoSansKR-Black.woff2';
import NotoSansKRBlackWoff from './NotoSansKr/NotoSansKR-Black.woff';
import NotoSansKRBlackOtf from './NotoSansKr/NotoSansKR-Black.otf';

const FontStyle = createGlobalStyle`
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 100;
        src: url(${NotoSansKRThinWoff2}) format('woff2'),
            url(${NotoSansKRThinWoff}) format('woff'),
            url(${NotoSansKRThinOtf}) format('opentype');
    }
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        src: url(${NotoSansKRLightWoff2}) format('woff2'),
            url(${NotoSansKRLightWoff}) format('woff'),
            url(${NotoSansKRLightOtf}) format('opentype');
    }
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        src: url(${NotoSansKRRegularWoff2}) format('woff2'),
            url(${NotoSansKRRegularWoff}) format('woff'),
            url(${NotoSansKRRegularOtf}) format('opentype');
    }
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        src: url(${NotoSansKRMediumWoff2}) format('woff2'),
            url(${NotoSansKRMediumWoff}) format('woff'),
            url(${NotoSansKRMediumOtf}) format('opentype');
    }
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 700;
        src: url(${NotoSansKRBoldWoff2}) format('woff2'),
            url(${NotoSansKRBoldWoff}) format('woff'),
            url(${NotoSansKRBoldOtf}) format('opentype');
    }
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 900;
        src: url(${NotoSansKRBlackWoff2}) format('woff2'),
            url(${NotoSansKRBlackWoff}) format('woff'),
            url(${NotoSansKRBlackOtf}) format('opentype');
    } 
`;

export default FontStyle;
