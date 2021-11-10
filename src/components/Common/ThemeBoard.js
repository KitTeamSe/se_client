import React from 'react';
import styled from 'styled-components';
import { MainWrapper } from './Wrapper/Wrapper';

const WhiteBox = styled.div`
  width: 100%;
  height: 60px;
  font-weight: 500;
  ${({ theme }) => theme.common.flexCenter}
  flex-direction: column;
  justify-content: space-around;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.white};
`;
const GrayBox0 = styled(WhiteBox)`
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.gray[0]};
`;
const GrayBox1 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[1]};
`;
const GrayBox2 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[2]};
`;
const GrayBox3 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[3]};
`;
const GrayBox4 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[4]};
`;
const GrayBox5 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[5]};
`;
const GrayBox6 = styled(WhiteBox)`
  background: ${({ theme }) => theme.color.gray[6]};
`;
const GrayBox7 = styled(WhiteBox)`
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.gray[7]};
`;
const GrayBox8 = styled(GrayBox7)`
  background: ${({ theme }) => theme.color.gray[8]};
`;
const GrayBox9 = styled(GrayBox7)`
  background: ${({ theme }) => theme.color.gray[9]};
`;
const BlackBox = styled(GrayBox7)`
  background: ${({ theme }) => theme.color.black};
`;
const PrimaryText1 = styled.p`
  width: 100%;
  font-size: 0.875rem;
  text-align: center;
  ${({ theme }) => theme.common.textEllipsis}
  color: ${({ theme }) => theme.color.black};
`;
const PrimaryText2 = styled(PrimaryText1)`
  color: ${({ theme }) => theme.color.gray[0]};
`;
const SecondaryText1 = styled(PrimaryText1)`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.gray[7]};
`;
const SecondaryText2 = styled(SecondaryText1)`
  color: ${({ theme }) => theme.color.gray[3]};
`;
const OtherText1 = styled.span`
  width: 100%;
  font-size: 0.625rem;
  text-align: center;
  ${({ theme }) => theme.common.textEllipsis}
  color: ${({ theme }) => theme.color.gray[6]};
`;
const OtherText2 = styled(OtherText1)`
  color: ${({ theme }) => theme.color.gray[5]};
`;

const Text1 = ({ text, color }) => (
  <>
    <PrimaryText1>{text}</PrimaryText1>
    <SecondaryText1>{text}</SecondaryText1>
    <OtherText1>{color}</OtherText1>
  </>
);

const Text2 = ({ text, color }) => (
  <>
    <PrimaryText2>{text}</PrimaryText2>
    <SecondaryText2>{text}</SecondaryText2>
    <OtherText2>{color}</OtherText2>
  </>
);

const ThemeBoard = () => {
  const text =
    'qwertyuiopasdfghjklzxcvbnm 모든 인류 구성원의 천부의 존엄성과 동등하고 양도할 수 없는 권리를 인정하는';

  return (
    <MainWrapper>
      <GrayBox0>
        <Text1 color="theme.color.gray[0]" text={text} />
      </GrayBox0>
      <GrayBox1>
        <Text1 color="theme.color.gray[1]" text={text} />
      </GrayBox1>
      <GrayBox2>
        <Text1 color="theme.color.gray[2]" text={text} />
      </GrayBox2>
      <GrayBox3>
        <Text1 color="theme.color.gray[3]" text={text} />
      </GrayBox3>
      <GrayBox4>
        <Text1 color="theme.color.gray[4]" text={text} />
      </GrayBox4>
      <GrayBox5>
        <Text1 color="theme.color.gray[5]" text={text} />
      </GrayBox5>
      <GrayBox6>
        <Text2 color="theme.color.gray[6]" text={text} />
      </GrayBox6>
      <GrayBox7>
        <Text2 color="theme.color.gray[7]" text={text} />
      </GrayBox7>
      <GrayBox8>
        <Text2 color="theme.color.gray[8]" text={text} />
      </GrayBox8>
      <GrayBox9>
        <Text2 color="theme.color.gray[9]" text={text} />
      </GrayBox9>
      <WhiteBox>
        <Text1 color="theme.color.white" text={text} />
      </WhiteBox>
      <BlackBox>
        <Text2 color="theme.color.black" text={text} />
      </BlackBox>
    </MainWrapper>
  );
};

export default ThemeBoard;
