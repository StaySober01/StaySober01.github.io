# 기술 아키텍처

## 현재 구조

```text
astro.config.mjs              정적 생성, React 통합, 기존 URL 출력 규칙
src/pages/index.astro         홈
src/pages/til/index.astro     TIL 목록
src/pages/[...path].astro     개별 글과 프로젝트 상세
src/layouts/SiteLayout.astro  head, 테마 초기화, 공통 문서 구조
src/components/               공통 헤더·푸터·본문, React PostList
src/content/pages.json       공개 경로, 제목, 설명, 코드 강조 여부
src/content/pages/           기존 main 내부 HTML 원문
src/lib/pages.ts             메타데이터와 본문을 빌드 시 결합
public/styles.css            기존 디자인과 반응형 스타일
public/theme.js              테마 전환과 localStorage 저장
public/code-highlight.js     C++ 코드블록 강조
public/assets/               프로필 사진 등 공개 자산
public/outputs/              기존 공개 다운로드 파일
scripts/                     빌드·이전 검증
.github/workflows/pages.yml  검사, 빌드, Pages 배포
dist/                        배포 산출물 (Git 제외)
```

Astro 7과 React 19를 사용한다. 패키지 버전은 `package-lock.json`으로 고정하고 `npm ci`로 설치한다. Node 기준 버전은 `.nvmrc`에 기록한다. 서버 런타임은 없으며 Pages에는 `dist/`만 배포한다.

## 렌더링과 상호작용

- 헤더·푸터·메타데이터는 Astro 공통 레이아웃으로 생성한다.
- `src/content/pages/`에는 `<main>` 내부 HTML을 보관한다. 기존 본문·코드·목차·댓글 스크립트를 그대로 유지한다.
- `PageBody.astro`는 목록 페이지에 한해 빌드 시 HTML을 파싱해 카드와 카테고리를 React `PostList`에 전달한다. 목록 HTML이 단일 원본이다.
- `PostList.tsx`는 카드 전체를 HTML로 출력하고 `client:load`로 필터를 활성화한다. JavaScript 실행 전에는 필터를 숨기고 전체 글을 보여준다. 개별 글과 홈에는 React hydration을 추가하지 않는다.
- 기존 `theme.js`, `code-highlight.js`는 React 관리 영역 밖에서 실행한다. 클라이언트 라우터나 View Transitions를 사용하지 않아 일반 페이지 이동 시 기존 초기화 흐름이 유지된다.
- `set:html`과 `dangerouslySetInnerHTML`에는 저장소에서 검토한 HTML만 전달한다. 사용자 입력이나 외부 응답을 그대로 삽입하지 않는다.

## URL과 댓글 보존

`build.format: 'preserve'`로 index 라우트는 폴더의 `index.html`, 나머지는 `{slug}.html`로 생성한다. `site`는 `https://staysober01.github.io`, base는 루트 `/`다. 기존 상대 링크와 목차 ID를 유지한다. `.html`을 제거하거나 해시 라우터를 도입하지 않는다.

giscus의 저장소·카테고리·`data-mapping="pathname"`·기타 설정은 원문 그대로 둔다. 이전에 댓글이 없던 글에는 댓글을 새로 추가하지 않는다. 댓글은 GitHub Discussions에 남아 있으며 URL 경로를 바꾸면 기존 연결에 영향을 줄 수 있다.

## 유지보수 범위

스타일은 `public/styles.css`에서 관리한다. 새 페이지는 본문 파일과 `pages.json` 항목을 추가한 뒤 목록과 홈 링크를 갱신한다. Markdown 전환, 자동 목록 생성, 테마 로직 재작성은 이번 이전에 포함하지 않았다. 새로운 index 라우트가 필요하면 기존 `src/pages/til/index.astro` 패턴을 따른다.
