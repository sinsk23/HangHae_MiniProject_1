# TRAPICK ๐๏ธ

### **์ฑํฅ๋ณ ์ฌํ์ง ์ถ์ฒ, ์ฌํ ์ ๋ณด ์ ๊ณต - API์ ์ ์ฅ์ ์๋๋ค.**

---

### ์๋ต ์ฃผ์๋ ๋ค์๊ณผ ๊ฐ์ 10๊ฐ์ ์ฃผ์๋ก ์ด๋ฃจ์ด์ ธ ์์ต๋๋ค.

๋ ์์ธํ ์ ๋ณด๋ [์ฌ๊ธฐ](http://nodeapi.myspaceti.me:8002/api)๋ฅผ ํ์ธํด์ฃผ์ธ์.

- /api/
  - [x] POST /signup : ํ์๊ฐ์ํ๊ธฐ
  - [x] POST /login : ๋ก๊ทธ์ธํ๊ธฐ
  - [x] POST /login/withsave : ๋ด ๊ฒฐ๊ณผ์ง๋ฒํธ(resultId)๋ฅผ ๋ด ๊ณ์ ์ ์ ์ฅํจ๊ณผ ๋์์ ๋ก๊ทธ์ธํ๊ธฐ
  - [x] /logout โ ํด๋ผ์ด์ธํธ์์ ํ ํฐ์ง์ฐ๋ ๊ฒ์ผ๋ก ๊ฐ์ํฉ๋๋ค.
- /api/results/
  - [x] POST /submit : ์ ์ถ ํ ๋ด ๊ฒฐ๊ณผ์ง๋ฒํธ(resultId)๋ฅผ ๋ฐ๊ธฐ
  - [x] GET /:resultId : ๋ด ๊ฒฐ๊ณผ์ง๋ฒํธ(resultId)๋ก ๊ฒฐ๊ณผ(๋ค์ํ ์ถ์ฒ์ ๋ณด) ์ป๊ธฐ
  - [x] GET / : ์๋ก๋ ๋ ๊ฒฐ๊ณผ์ง ๋ชจ๋ ๋ณด๊ธฐ (์ต๊ทผ ์ ์ถ๋ ๊ฒ๋ถํฐ ๋ณด๊ธฐ - ์ต๋ 15๊ฐ)
  - [x] GET /countries : 64๊ฐ ๋๋ผ ์ถ์ฒ ์ ๋ณด ๋ณด๊ธฐ
- /api/mypage
  - [x] GET / : ๋์ ID, Nickname ๊ฐ์ ธ์ค๊ธฐ
  - [x] GET /myanswers : ๋์ ์ต๊ทผ ๊ฒฐ๊ณผ(๋ค์ํ ์ถ์ฒ์ ๋ณด) ์ป๊ธฐ

---

### ์๋์ ๊ฐ์ ์ ์ฐจ๋ก ์ค์นํด์ฃผ์๋ฉด ๋ฉ๋๋ค.

```bash

git clone https://github.com/sinsk23/HangHae_MiniProject_1.git
cd HangHae_MiniProject_1
npm install
## .env ์์ฑํ์์ผ ํฉ๋๋ค.

## ์๋ฒ ์คํ
node app.js

```

---

### API์ ์๋ตํ๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ ์๋์ ๊ฐ์ด ๊ตฌ์ฑํ์ต๋๋ค.

![ERD](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8306dd1d-d25f-4e54-bac6-f65f94ca3e6d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220817T082419Z&X-Amz-Expires=86400&X-Amz-Signature=703631e7734121e1088fc47bf7392ea92df2eb241482666e0c6b878920d23527&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
