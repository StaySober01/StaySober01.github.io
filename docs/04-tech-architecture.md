# 기술 아키텍처

## 현재 구조

```text
AGENTS.md             작업 규칙
index.html            시맨틱 콘텐츠와 문서 메타데이터
projects/             프로젝트 상세 하위 페이지
til/                  문제 풀이와 기술 학습을 정리한 TIL / 블로그 하위 페이지
til/index.html        TIL / 블로그 전체 글 목록
styles.css            디자인 토큰, 레이아웃, 반응형 스타일
theme.js              테마 전환과 사용자 선택 저장
code-highlight.js     TIL 코드블록 구문 강조
docs/                 제품, 콘텐츠, 기술 의사결정 문서
```

브라우저가 루트와 하위 폴더의 HTML, CSS와 소형 JavaScript를 직접 읽는 정적 사이트다. 패키지 관리자, 빌드 단계, 런타임 의존성은 없다. 상대 경로를 사용하므로 GitHub Pages에서 단순하게 제공할 수 있다. `theme.js`는 테마 버튼의 상태와 `localStorage`에 저장한 사용자 선택을 관리한다. `code-highlight.js`는 TIL 코드블록의 C++ 중심 키워드, 타입, 문자열, 숫자, 주석, 연산자 색상을 적용한다. TIL 글의 댓글은 giscus 임베드 스크립트를 사용하며, 글별 댓글 데이터는 GitHub Discussions의 `Comments` 카테고리에 저장한다.

## 변경 원칙

- HTML은 `header`, `nav`, `main`, `section`, `article`, `footer` 등 의미 있는 요소를 사용한다.
- 표현은 `styles.css`에 두고 콘텐츠와 분리한다.
- 이미지 추가 시 크기를 명시하고 적절한 대체 텍스트와 압축 형식을 사용한다.
- 외부 임베드는 정적 배포를 유지할 수 있고 운영 책임이 명확할 때만 추가한다.
- 기능 추가 전에 정적 HTML/CSS만으로 해결 가능한지 먼저 확인한다.

## 프레임워크 전환 기준

글과 프로젝트 상세 페이지 증가로 공통 레이아웃 복사가 잦아지거나, Markdown 콘텐츠 컬렉션과 자동 목록 생성이 필요해지면 Astro를 우선 검토한다. 단순한 JavaScript 기반 UI와 번들링이 주목적이면 Vite를 검토할 수 있다.

전환은 요구사항, 마이그레이션 범위, GitHub Pages의 base path, 빌드·배포 방식을 결정 로그에 기록한 뒤 진행한다. 현재 단계에서는 도입하지 않는다.
