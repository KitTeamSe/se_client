import styled from 'styled-components';

export const MainWrapper = styled.div`
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ theme }) => theme.size.tablet};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: ${({ theme }) => theme.size.mobile};
    margin-top: 1rem;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

export default null;
