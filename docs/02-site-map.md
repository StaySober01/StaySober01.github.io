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
├─ projects/
│  └─ roguelike-project.html
└─ til/
   ├─ index.html
   ├─ programmers-target-number-dfs.html
   ├─ dfs-bfs-graph-traversal.html
   ├─ multithreading-vs-multiprocessing.html
   ├─ garbage-collection-csharp-unreal.html
   ├─ locality-of-reference.html
   ├─ programmers-integer-triangle-dp.html
   ├─ programmers-n-expression-dp.html
   ├─ dynamic-programming.html
   ├─ branch-prediction.html
   ├─ time-complexity-big-o-data-structures.html
   └─ solid.html
```

홈의 주요 콘텐츠는 `/index.html` 한 페이지에 있고 섹션 앵커(`#projects`, `#writing`, `#about`)로 이동한다.
프로젝트 상세 사례는 `/projects/{project-slug}.html` 하위 페이지로 제공한다.
TIL / 블로그 목록은 `/til/index.html`에서 제공하며, 홈의 TIL / 블로그 섹션은 최근 글 일부만 보여준다.
모든 페이지의 헤더 `TIL & Blog` 메뉴는 홈 섹션이 아니라 `/til/index.html` 목록 페이지로 직접 연결한다.
TIL / 블로그 글은 `/til/{post-slug}.html` 하위 페이지로 제공한다.

## 확장 후보

```text
/
├─ projects/
│  └─ {project-slug}.html
├─ til/
│  ├─ index.html
│  └─ {post-slug}.html
├─ blog/
│  └─ {post-slug}.html
└─ about/
```

URL은 영문 소문자와 하이픈을 사용하고, 기존 공개 URL은 가능한 한 유지한다.
