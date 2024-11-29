# Auth API Documentation

## 회원가입 (Register)

```
POST /register
```

사용자 회원가입을 처리하고 인증 이메일을 발송합니다.

### Request Body

```json
{

    "username": "string",

    "password": "string",

    "email": "string",

    "nickname": "string"

}
```

### Response

성공 시:
```json
{

    "success": true,

    "message": "인증 이메일이 발송되었습니다. 이메일을 확인하세요."

}
```

실패 시:
```json
{

    "success": false,

    "message": "이미 존재하는 이메일입니다." | "데이터베이스 오류가 발생했습니다."

}
```


## 로그인 (Login)

```
POST /login
```

사용자 로그인을 처리합니다.

### Request Body
```json

{

    "username": "string",

    "password": "string"

}
```

### Response

성공 시:

```json
{

    "success": true,

    "redirect_url": "string"

}
```

실패 시:
```json
{

    "success": false,

    "message": "존재하지 않는 사용자입니다." | 

               "이메일 인증이 완료되지 않았습니다. 이메일을 확인하세요." |

               "비밀번호가 잘못되었습니다." |

               "로그인 실패: 데이터베이스 오류가 발생했습니다."

}
```

## 로그아웃 (Logout)

```
GET /logout
```

사용자 로그아웃을 처리합니다.

### Response

- 로그인 페이지로 리다이렉트됩니다.

## 닉네임 변경 (Change Nickname)

```
POST /change_nickname
```


사용자의 닉네임을 변경합니다.

### Request Body

```json
{

    "new_nickname": "string"

}
```

### Response

성공 시:
```json

{

    "success": true,

    "message": "닉네임이 성공적으로 변경되었습니다.",

    "new_nickname": "string"

}

```
실패 시:
```json

{

    "success": false,

    "message": "로그인이 필요합니다." | "닉네임 변경 실패."

}
```

## 이메일 인증 확인 (Confirm Email)

```jsp
GET /confirm/<token>
```

회원가입 시 발송된 이메일 인증을 처리합니다.

### Parameters 

- token: 이메일 인증 토큰 (URL에 포함)

### Response

성공 시:

- 로그인 페이지로 리다이렉트되며 "이메일 인증이 완료되었습니다. 로그인하세요." 메시지가 표시됩니다.

실패 시:

- "인증 링크가 만료되었거나 유효하지 않습니다." 메시지가 표시됩니다.

- "데이터베이스 오류가 발생했습니다." 메시지가 표시됩니다.

## 대시보드 (Dashboard)
```
GET /dashboard
```


사용자의 대시보드 페이지를 표시합니다.

### 인증

- 로그인이 필요합니다.

### Response

성공 시:

- 대시보드 페이지가 표시됩니다.

실패 시:

- 로그인 페이지로 리다이렉트됩니다.

## 공통 사항

### 인증

- /login, /register, /confirm/<token>을 제외한 모든 엔드포인트는 로그인이 필요합니다.

- 로그인하지 않은 상태에서 접근 시 로그인 페이지로 리다이렉트됩니다.

### CSRF 보호

- 모든 응답에는 CSRF 토큰이 쿠키로 포함됩니다.

- POST 요청 시 CSRF 토큰이 필요할 수 있습니다.