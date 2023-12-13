# School API

## 학교 생성

- **Endpoint**: `POST /school`
- **Permissions**: Admin
- **Request Body**:

  - `name`: string - 학교 이름
  - `region`: string - 지역

- **Response Body**:
  - `name`: string - 학교 이름
  - `region`: string - 지역

## 학교 소식 생성

- **Endpoint**: `POST /school/news`
- **Permissions**: Admin
- **Request Body**:

  - `schoolId`: string - 학교 ID
  - `context`: string - 소식 내용

- **Response Body**:
  - `context`: string - 학교 이름
  - `createdAt`: date - 지역

## 학교 소식 삭제

- **Endpoint**: `DELETE /school/news`
- **Permissions**: Admin
- **Request Body**:
  - `newsId`: string - 소식 ID
- **Response Body**:
  - `context`: string - 학교 이름
  - `createdAt`: date - 지역

## 학교 소식 업데이트

- **Endpoint**: `PATCH /school/news`
- **Permissions**: Admin
- **Request Body**:
  - `newsId`: string - 소식 ID
  - `updatedContext`: string - 업데이트된 소식 내용
- **Response Body**:
  - `context`: string - 학교 이름
  - `createdAt`: date - 지역

## 사용자가 구독 중인 학교 목록 가져오기

- **Endpoint**: `GET /school/subscribe`
- **Permissions**: Student

- **Response Body**:
  - `schools`: array - 학교 목록
    - `name`: string - 학교 이름
    - `region`: string - 지역

## 학교 구독하기

- **Endpoint**: `POST /school/subscribe`
- **Permissions**: Student
- **Request Body**:
  - `schoolId`: string - 구독할 학교 ID
- **Response Body**:
  - `name`: string - 학교 이름
  - `region`: string - 지역

## 학교 구독 취소

- **Endpoint**: `DELETE /school/subscribe`
- **Permissions**: Student
- **Request Body**:
  - `schoolId`: string - 취소할 학교 ID
- **Response Body**:
  - `name`: string - 학교 이름
  - `region`: string - 지역

## 구독 중인 학교 소식 가져오기

- **Endpoint**: `GET /school/subscribe/news`
- **Permissions**: Student

- **Response Body**:
  - `schools`: array - 학교 목록
    - `name`: string - 학교 이름
    - `region`: string - 지역
    - `news`: array - 소식
      - `context`: string - 학교 이름
      - `createdAt`: date - 지역

# User API

## 사용자 소식 피드 가져오기

- **Endpoint**: `GET /user/news-feed`
- **Permissions**: Student
- **Response Body**:
  - `news`: array - 소식 목록
    - `context`: string - 학교 이름
    - `createdAt`: date - 지역
