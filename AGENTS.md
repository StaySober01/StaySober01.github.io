# AGENTS.md

## Project

이 저장소는 GitHub Pages에 배포하는 게임 개발자 포트폴리오 블로그다.

우선순위는 다음과 같다.

1. 프로젝트와 기술적 의사결정을 명확하게 전달한다.
2. 빠르고 읽기 쉬우며 모바일에서도 안정적인 사이트를 유지한다.
3. 작은 단위로 변경하고 쉽게 검증할 수 있게 한다.

## Working Rules

변경하기 전에:

- 이 파일과 작업에 관련된 `docs/` 문서를 읽는다.
- 기존 코드와 문서의 패턴을 우선한다.
- 요청과 관계없는 리팩터링을 하지 않는다.
- 문서와 실제 동작이 어긋나지 않는지 확인한다.

변경할 때:

- 현재는 프레임워크 없는 HTML/CSS 정적 사이트를 유지한다.
- 콘텐츠를 시맨틱 HTML로 작성하고 CSS는 `styles.css`에 둔다.
- 모바일 우선, 키보드 접근성, 가독성, 빠른 첫 로드를 우선한다.
- 의존성이나 빌드 도구는 명확한 필요와 합의 없이 추가하지 않는다.
- 프로젝트 사례에는 가능하면 문제, 역할, 기술 스택, 핵심 구현, 트러블슈팅, 결과, 배운 점을 포함한다.

## Architecture Direction

- 현재: 저장소 루트의 `index.html`과 `styles.css`를 GitHub Pages가 직접 제공한다.
- 콘텐츠나 반복 레이아웃 관리가 어려워질 때 Astro 또는 Vite 도입을 검토한다.
- 프레임워크 전환 시 `docs/04-tech-architecture.md`, `docs/06-deployment.md`, `docs/08-decision-log.md`를 함께 갱신한다.

## Verification

작업 후 변경 범위에 맞게 확인한다.

- HTML/CSS 링크와 문서 내 경로를 확인한다.
- 로컬 정적 서버 또는 브라우저에서 주요 섹션과 반응형 레이아웃을 확인한다.
- `npm` 기반 구성이 생긴 뒤에는 제공되는 `npm run build`, `npm run lint`, `npm run check`를 실행한다.
- 실행할 수 없거나 아직 존재하지 않는 검증 명령은 결과 보고에 명시한다.

## Documentation

동작, 구조, 디자인 규칙, 배포 흐름 또는 주요 결정을 바꾸면 관련 `docs/` 문서를 함께 수정한다. 특히 다음 문서를 기준으로 삼는다.

- `docs/00-project-brief.md`
- `docs/03-design-system.md`
- `docs/04-tech-architecture.md`
- `docs/05-dev-harness.md`
- `docs/08-decision-log.md`
