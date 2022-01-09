# se_web_client

<img alt="react" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img alt="redux" src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black"><img alt="redux saga" src="https://img.shields.io/badge/redux saga-999999?style=for-the-badge&logo=reduxsaga&logoColor=black"><img alt="react router" src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">

<img alt="docker" src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"><img alt="nginx" src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"><img alt="jenkins" src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"><img alt="portainer" src="https://img.shields.io/badge/portainer-13BEF9?style=for-the-badge&logo=portainer&logoColor=white">

<img alt="cypress" src="https://img.shields.io/badge/cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white"><img alt="eslint" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"><img alt="prettier" src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"><img alt="github" src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 목차

- SE 게시판 소개
- 기능
- 아키텍처
- 기술스택
- 코드구조
- 개발방법
- 테스트

## SE 게시판

기존 SE 게시판
![화면 캡처 2022-01-04 222103](https://user-images.githubusercontent.com/40172373/148065369-4b58a266-7aea-48a4-9e12-b6fe6ca9bdae.png)

기존 SE 게시판 모바일 버전
![KakaoTalk_20220104_222507959](https://user-images.githubusercontent.com/40172373/148065755-04ef466d-42c1-46e3-90b7-6ccdc8901796.jpg)

## 기능

SE 게시판은 커뮤니티로써 갖추어야 할 기능들을 만들었다.

### 회원가입, 로그인, 로그아웃 기능

### 게시글, 댓글 작성, 수정, 삭제, 검색

### 프로필 정보 수정, 검색

### 신고

## 아키텍처

### Flux

## 기술스택

## 코드구조

## 개발방법

### Jira

### Sprint회의

## 테스트 <img alt="cypress" src="https://img.shields.io/badge/cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white">
E2E 테스트란 실제 사용자의 행동을 고려하여 화면 UI부터 API통신까지 모든것을 연결한 통합테스트 이다
Cypress를 사용해 E2E 테스트를 진행하였다

### E2E 테스트
#### npm run test
            npm run start
            npm run test //test는 cypress run
먼저 서버를 실행 시키고 test를 실행한다
test는 headless 하게 실행되고 console에 결과가 표시된다
![npmruntest실패](https://user-images.githubusercontent.com/40172373/148684547-40527819-e194-46a8-9ced-78164e980cd9.png)
실패한 케이스 이다 테스트 코드의 어느부분에서 어떻게 오류가 났는지 console에 출력된다
위 케이스 에서는 search anonymous post에서 '0810_Test Post Add Anonymous User'를 4초안에 찾지 못해서 실패했다
![npmruntestend](https://user-images.githubusercontent.com/40172373/148684549-9e3fef52-92c9-4054-8f62-e5fd3ecb5dc1.png)
테스트 코드가 종료되면 최종 결과가 출력된다
총 3개의 테스트 코드가 작성되었고 그 중 PostAddSearch가 실패했다
각 테스트의 실행시간, 총 테스트 함수, 실패한 함수의 갯수가 출력된다

#### npm run cypress
            npm run start
            npm run cypress  //cypress는 cypress open
먼저 서버를 실행 시키고 cypress를 실행한다

![cypressopen](https://user-images.githubusercontent.com/40172373/148684797-b5a9efe6-38fa-4b3a-bc27-9d7f01faad54.png)

테스트 코드 파일이 표시된다 클릭하면 해당 파일만 실행된다

![cypress에러](https://user-images.githubusercontent.com/40172373/148684878-ec13d3d3-21a4-47d9-a4c1-a78a7abb687d.png)
테스트가 실패하면 해당 내용이 출력된다
위 예시에서는 '7196_Test Post Add Anonymous User'을 찾을수 없어서 실패했다
![test성공](https://user-images.githubusercontent.com/40172373/148684881-82a7a2ae-b4b7-4637-950b-2b53fb2e30f4.png)
테스트가 성공한 경우이다

테스트 코드 작성중에는 npm run cypress를 사용하고 최종 테스트에는 npm run test를 사용하는것을 추천한다