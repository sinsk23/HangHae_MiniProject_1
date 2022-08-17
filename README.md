# TRAPICK 🏖️

### **성향별 여행지 추천, 여행 정보 제공 - API의 저장소 입니다.**

---

### 응답 주소는 다음과 같은 10개의 주소로 이루어져 있습니다.

더 자세한 정보는 [여기](http://nodeapi.myspaceti.me:8002/api)를 확인해주세요.

- /api/
  - [x] POST /signup : 회원가입하기
  - [x] POST /login : 로그인하기
  - [x] POST /login/withsave : 내 결과지번호(resultId)를 내 계정에 저장함과 동시에 로그인하기
  - [x] /logout → 클라이언트에서 토큰지우는 것으로 갈음합니다.
- /api/results/
  - [x] POST /submit : 제출 후 내 결과지번호(resultId)를 받기
  - [x] GET /:resultId : 내 결과지번호(resultId)로 결과(다양한 추천정보) 얻기
  - [x] GET / : 업로드 된 결과지 모두 보기 (최근 제출된 것부터 보기 - 최대 15개)
  - [x] GET /countries : 64개 나라 추천 정보 보기
- /api/mypage
  - [x] GET / : 나의 ID, Nickname 가져오기
  - [x] GET /myanswers : 나의 최근 결과(다양한 추천정보) 얻기

---

### 아래와 같은 절차로 설치해주시면 됩니다.

```bash

git clone https://github.com/sinsk23/HangHae_MiniProject_1.git
cd HangHae_MiniProject_1
npm install
## .env 생성하셔야 합니다.

## 서버 실행
node app.js

```

---

### API에 응답하는 데이터베이스는 아래와 같이 구성했습니다.

![ERD](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8306dd1d-d25f-4e54-bac6-f65f94ca3e6d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220817T082419Z&X-Amz-Expires=86400&X-Amz-Signature=703631e7734121e1088fc47bf7392ea92df2eb241482666e0c6b878920d23527&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
