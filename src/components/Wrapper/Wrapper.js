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
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: calc(100vw - 1rem);
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

export default null;
