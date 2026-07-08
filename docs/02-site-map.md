# 사이트 맵

## 현재 구조

```text
/
├─ 헤더 내비게이션
├─ 소개(Hero)
├─ 기술 스택
├─ 프로젝트
├─ TIL / 블로그
├─ About
├─ 푸터 / GitHub 링크
└─ til/
   └─ solid.html
```

홈의 주요 콘텐츠는 `/index.html` 한 페이지에 있고 섹션 앵커(`#projects`, `#writing`, `#about`)로 이동한다.
TIL / 블로그 글은 `/til/{post-slug}.html` 하위 페이지로 제공한다.

## 확장 후보

```text
/
├─ projects/
│  └─ {project-slug}/
├─ til/
│  └─ {post-slug}/
├─ blog/
│  └─ {post-slug}/
└─ about/
```

URL은 영문 소문자와 하이픈을 사용하고, 기존 공개 URL은 가능한 한 유지한다.
