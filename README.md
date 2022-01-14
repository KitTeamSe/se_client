# se_web_client <a href="#"><img alt="react" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"></a>

## 목차

- <a id="user-content-목차" class="anchor" aria-hidden="true" href="#목차">
    SE 게시판 소개
  </a>
- 기능
- 아키텍처
- 기술스택
- 코드구조
- 개발방법
- 테스트

## SE 게시판

SE게시판은 Software Engineering의 약자로 금오공대 컴퓨터 소프트웨어 공학과의 학과 게시판 이다
아직 정식 배포 전으로 [기존 게시판](http://se.kumoh.ac.kr/) 의 데이터 마이그레이션이 되지 않았다

[데모](https://se-testboard.duckdns.org/board/freeboard) 이다
디자인은 Mui를 사용하였다

메인페이지인 자유게시판의 PC화면 이다

<p align="center">
  <img alt="자유게시판 PC" src="https://user-images.githubusercontent.com/40172373/149065848-502504f5-0f67-4b73-addc-2ee269b6e31a.png" width="80%">
  <p align="center">SE게시판 PC화면</p>
</p>
<p align="center">
  <img alt="자유게시판 모바일" src="https://user-images.githubusercontent.com/40172373/149065999-571e0515-c9a6-49bd-8191-13f73936eae3.png" width="50%">
  <p align="center">SE게시판 모바일화면</p>
</p>

## 기능

SE 게시판은 금오공대 컴퓨터 소프트웨어 공학과의 학과 홈페이지로 기본적인 기능들을 제공하고 있다

### 회원가입, 아이디, 비밀번호 찾기 로그인, 로그아웃 기능

로그인 화면
아이디, 비밀번호/아이디 찾기 버튼, 회원가입 버튼이 포함한 Dialog로 구현하였다

<p align="center">
  <img alt="로그인 PC" src="https://user-images.githubusercontent.com/40172373/149066460-1481d9e0-474f-4a0b-a583-d80bff1770db.png" width="80%">
  <p align="center">로그인 PC화면</p>
</p>
<p align="center">
  <img alt="로그인 모바일" src="https://user-images.githubusercontent.com/40172373/149066357-929cb6cb-acc8-4061-a8a9-99be9b37844b.png" width="50%">
  <p align="center">로그인 모바일화면</p>
</p>

회원가입 화면
프론트단에서 기본적인 양식검사를 하고 통과한 경우에 초록불로 알려준다
모든 요소를 채워야 회원가입 버튼이 활성화 된다

<p align="center">
  <img alt="회원가입 PC" src="https://user-images.githubusercontent.com/40172373/149066702-6a194e7b-a86f-431f-8f6a-098c9a9f7b35.png" width="80%">
  <p align="center">회원가입 PC화면</p>
</p>

<p align="center">
  <img alt="회원가입 모바일" src="https://user-images.githubusercontent.com/40172373/149066782-ec7b8ca9-128e-4df9-9a2e-6ffb005b7d03.png" width="50%">
  <p align="center">회원가입 모바일화면</p>
</p>

아이디, 비밀번호 찾기 화면
가입 이메일을 입력하여 아이디를 조회한다
아이디를 입력하여 내 질문을 조회한다
내 질문의 답변을 입력하면 비밀번호가 가입 이메일로 전송된다

<p align="center">
  <img alt="비밀번호찾기 PC" src="https://user-images.githubusercontent.com/40172373/149067995-4af90ef2-c98e-44d2-90ca-98720067ea2c.png" width="80%">
  <p align="center">비밀번호찾기 PC 화면</p>
</p>

<p align="center">
  <img alt="비밀번호찾기 모바일" src="https://user-images.githubusercontent.com/40172373/149068024-8b332bd0-fc5d-4f57-8c5b-94b50866d92a.png" width="50%">
  <p align="center">비밀번호찾기 모바일 화면</p>
</p>

### 게시글, 댓글 작성, 수정, 삭제, 검색

텍스트 입력은 CKEditor를 이용했다. 텍스트 뿐만 아니라 이미지, 동영상, 폰트 설정 등 다양한 플러그인을 제공한다
로그인 유저의 경우 태그를 추가할수있다
비 로그인 유저는 일회용 아이디와 비밀번호를 설정하여 게시글, 댓글을 작성할수 있다
비 로그인 유저는 비밀글을 작성할수 있다
게시글 검색은 제목, 내용, 댓글, 닉네임, 사용자ID, 태그를 이용하여 검색이 가능하다

<p align="center">
  <img alt="게시글 작성 PC" src="https://user-images.githubusercontent.com/40172373/149068364-fa94552a-8237-47bb-8fcb-c38344c7faba.png" width="80%">
  <p align="center">게시글 작성 PC화면</p>
</p>

<p align="center">
  <img alt="댓글 작성 모바일" src="https://user-images.githubusercontent.com/40172373/149068464-3ff46fd1-21e3-46ad-a911-4f7d68a2c570.png" width="50%">
  <p align="center">댓글작성 모바일 화면</p>
</p>

비밀글에 접근하기 위해서는 게시 당시 설정한 비밀번호를 입력해야 한다

<p align="center">
  <img alt="비밀글 접속 PC" src="https://user-images.githubusercontent.com/40172373/149068873-838015c9-0ae1-4179-8f30-eee152b6e290.png" width="80%">
  <p align="center">비밀글 접근 PC버전</p>
</p>

### 프로필 정보 수정, 검색

프로필 화면에서 개인정보를 확인하고 닉네임, 정보공유동의를 수정하기 위해서는 비밀번호 확인이 필요하다
비밀번호 수정과 회원탈퇴 기능을 제공한다

<p align="center">
  <img alt="프로필 PC" src="https://user-images.githubusercontent.com/40172373/149069632-62918118-4354-4c98-abe5-89d52ed56bc9.png" width="80%">
  <p align="center">프로필 PC화면</p>
</p>

개인정보 수정을 위해서는 비밀번호 확인을 입력해야 수정버튼이 활성화 된다

<p align="center">
  <img alt="프로필 수정 모바일" src="https://user-images.githubusercontent.com/40172373/149069656-23f9dbd4-b621-45e7-8cc8-e271db42e519.png" width="50%">
  <p align="center">프로필 수정 모바일 화면</p>
</p>

비밀번호 변경과 회원탈퇴는 별도의 Dialog로 구현하였다
변경, 탈퇴 하기 위해서는 비밀번호확인을 해야한다

<p align="center">
  <img alt="회원탈퇴 PC" src="https://user-images.githubusercontent.com/40172373/149069996-8eb2b157-5449-40f6-b74a-c5c82bba42a1.png" width="80%">
  <p align="center">회원탈퇴 PC화면</p>
</p>

게시글의 글쓴이가 회원가입 유저이면 클릭이 활성화 된다 클릭하면 해당유저의 프로필을 볼 수 있다
또는 주소를 이용하여 유저의 아이디를 검색할수있다
./profile/{userId}

<p align="center">
  <img alt="다른 유저 프로필 PC" src="https://user-images.githubusercontent.com/40172373/149070195-ce92abf9-1edf-403c-8908-1df07e0f7307.png" width="80%">
  <p align="center">다른 유저의 프로필 PC화면</p>
</p>

### 신고

신고는 아이디가 아닌 게시글을 기반으로 작성한다 (익명게시글도 작성가능하기 때문)
신고 버튼은 내용에 5글자 이상 입력해야 활성화 된다

<p align="center">
  <img alt="게시글 신고 모바일" src="https://user-images.githubusercontent.com/40172373/149070472-6fd3262a-fcda-48b1-9c85-6c3b53256202.png" width="50%">
  <p align="center">게시글 신고 모바일 화면</p>
</p>

## 아키텍처

### MVC 패턴

프로그램을 Model, View, Controller 3가지로 구성하는 디자인 패턴이다
Model은 데이터를, View는 인터페이스 요소를, Controller는 Model과 View를 잇는 기능을 수행한다

<p align="center">
  <img alt="MVC architecture" src="https://user-images.githubusercontent.com/40172373/149278158-223ee397-cce5-4d73-a2dc-02d879e7da74.png" width="50%">
  <p align="center">MVC 아키텍처</p>
</p>

직관적인 구조이다
MVC 패턴은 널리 사용되었고 많은 파생 패턴이 있다 이들을 통칭해서 MV\* 패턴 이라고 한다

<p align="center">
  <img alt="complex MVC architecture" src="https://user-images.githubusercontent.com/40172373/149276240-7eddc1a9-d741-4ad4-b1f6-de0d2ae49246.png" width="50%">
  <p align="center">복잡한 MVC 아키텍처</p>
</p>

하지만 큰 프로그램에는 많은 컴포넌트들이 사용되어 M,V,C 간의 연결이 복작하게 되었다
위 그림에서 Controller가 Model을 조작하고, Model의 값이 View에 반영되고 View가 Model을 조정한다고 그려져 있지만 View와 Model은 직접 상호작용 하면 안된다 따라서 다음과 같이 디자인 패턴을 수정해야 한다

<p align="center">
  <img alt="new MVC architecture" src="https://user-images.githubusercontent.com/40172373/149279481-b3d041a9-2663-4264-9a56-33b92aa9c517.png" width="50%">
  <p align="center">수정된 MVC 아키텍처</p>
</p>

사용자가 View를 통해 수정을 하면 Controller가 Model을 조작하고 수정된 Model이 View에 반영된다
이 수정된 패턴이 Flux 패턴으로 이어진다

### Flux 패턴

Flux 패턴의 핵심은 '단방향 흐름' 이다

<p align="center">
  <img alt="Flux architecture" src="https://user-images.githubusercontent.com/40172373/149278175-92f607be-b78a-4b5e-a9b1-c7fbad3a8a09.png" width="50%">
  <p align="center">Flux 아키텍처</p>
</p>

사용자가 Action을 하면 그림의 Action에서부터 View까지 흐르기만 하면 반영이 된다
Flux패턴으로 작성한 se_client의 코드구조는 다음과 같다

<p align="center">
  <img alt="SE boardFlux architecture" src="https://user-images.githubusercontent.com/40172373/149282874-11558946-cb58-4d37-8e7a-fade70ef6bf7.png" width="50%">
  <p align="center">SE board의 Flux 아키텍처</p>
</p>

Redux-Saga가 Dispatcher의 역학을 Redux가 Store를, Containers와 Components가 View를 맡는다

## 기술스택

<img alt="react" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img alt="redux" src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black"> <img alt="redux saga" src="https://img.shields.io/badge/redux saga-999999?style=for-the-badge&logo=reduxsaga&logoColor=black"> <img alt="react router" src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">

<img alt="docker" src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img alt="nginx" src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img alt="jenkins" src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"> <img alt="portainer" src="https://img.shields.io/badge/portainer-13BEF9?style=for-the-badge&logo=portainer&logoColor=white">

<img alt="github" src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img alt="eslint" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img alt="prettier" src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

<img alt="cypress" src="https://img.shields.io/badge/cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white">

## 코드구조

    ├── cypress
    ├── node_modules
    ├── public
    ├── src
    │ ├── assets
    │ │ └── fonts
    │ ├── components
    │ ├── containers
    │ ├── libs
    │ ├── modules
    │ ├── pages
    │ ├── styles
    │ ├── utils
    │ ├── App.js
    │ ├── DataExport.js
    │ ├── index.js
    │ ├── reportWebVitals.js
    │ ├── Router.js
    │ └── setupTests.js
    ├── package.json
    └── README.md

<p align="center">se_client Tree</p>

<p align="center">
  <img alt="se code structure1" src="https://user-images.githubusercontent.com/40172373/149257974-d6ce6a1b-52ec-4b2a-be2b-b97065d20846.png" width="70%"/>
  <p align="center">se_client Router 구조</p>
</p>

<p align="center">
  <img alt="se code structure2" src="https://user-images.githubusercontent.com/40172373/149282850-388ee15d-3be6-41c9-acd8-3e5b1c232409.png" width="70%"/>
  <p align="center">se_client Component 구조</p>
</p>

## 개발방법

Jira를 사용해 이슈기반의 개발을 진행한다

<p align="center">
  <img alt="jira" src="https://user-images.githubusercontent.com/40172373/149447295-6c1f7cfe-b1de-460c-a399-9af0d4406655.png" width="70%"/>
  <p align="center">se프로젝트의 Jira</p>
</p>

2주단위의 스프린트를 실시하여 해결해야할 이슈를 선정하고 프로젝트 참여자에게 분배후 할일, 진행 중, 완료 로 구분하여 진행사항을 공유한다

<p align="center">
  <img alt="confluence" src="https://user-images.githubusercontent.com/40172373/149447720-310f6c39-417c-4dc2-b915-1b3b79732bbc.png" width="70%"/>
  <p align="center">se프로젝트의 Confluence</p>
</p>
Confluence를 이용해 프로젝트와 관련된 내용들을 문서화 했다
Sprint 회의록이나 라이브러리 조사결과, Jenkins를 사용한 배포 방법 등이 포함된다

## 테스트 <img alt="cypress" src="https://img.shields.io/badge/cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white">

E2E 테스트란 실제 사용자의 행동을 고려하여 화면 UI부터 API통신까지 모든것을 연결한 통합테스트 이다
Cypress를 사용해 E2E 테스트를 진행하였다

### npm run test

            npm run start
            npm run test //test는 cypress run

먼저 서버를 실행 시키고 test를 실행한다
test는 headless 하게 실행되고 console에 결과가 표시된다

<p align="center">
  <img alt="test fail" src="https://user-images.githubusercontent.com/40172373/148684547-40527819-e194-46a8-9ced-78164e980cd9.png" width="80%"/>
</p>

실패한 케이스 이다 테스트 코드의 어느부분에서 어떻게 오류가 났는지 console에 출력된다
위 케이스 에서는 search anonymous post에서 '0810_Test Post Add Anonymous User'를 4초안에 찾지 못해서 실패했다

<p align="center">
  <img alt="test end" src="https://user-images.githubusercontent.com/40172373/148684549-9e3fef52-92c9-4054-8f62-e5fd3ecb5dc1.png" width="80%"/>
</p>

테스트 코드가 종료되면 최종 결과가 출력된다
총 3개의 테스트 코드가 작성되었고 그 중 PostAddSearch가 실패했다
각 테스트의 실행시간, 총 테스트 함수, 실패한 함수의 갯수가 출력된다

### npm run cypress

            npm run start
            npm run cypress  //cypress는 cypress open

먼저 서버를 실행 시키고 cypress를 실행한다

<p align="center">
  <img alt="cypress open" src="https://user-images.githubusercontent.com/40172373/148684797-b5a9efe6-38fa-4b3a-bc27-9d7f01faad54.png" width="80%"/>
</p>

테스트 코드 파일이 표시된다 클릭하면 해당 파일만 실행된다

<p align="center">
  <img alt="cypress error" src="https://user-images.githubusercontent.com/40172373/148684878-ec13d3d3-21a4-47d9-a4c1-a78a7abb687d.png" width="80%"/>
</p>

테스트가 실패하면 해당 내용이 출력된다
위 예시에서는 '7196_Test Post Add Anonymous User'을 찾을수 없어서 실패했다

<p align="center">
  <img alt="cypress success" src="https://user-images.githubusercontent.com/40172373/148684881-82a7a2ae-b4b7-4637-950b-2b53fb2e30f4.png" width="80%"/>
</p>

테스트가 성공한 경우이다

테스트 코드 작성중에는 npm run cypress를 사용하고 최종 테스트에는 npm run test를 사용하는것을 추천한다
