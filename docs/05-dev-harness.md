# 개발 하네스

## 환경과 실행

Node 버전은 `.nvmrc`의 24.14.1을 기준으로 한다. Astro의 최소 요구 사항은 Node 22.23.4 이상이다.

```bash
npm ci
npm run dev
```

기본 주소는 `http://localhost:4321/`이다. 루트 HTML 파일을 직접 여는 방식은 더 이상 사용하지 않는다.

## 필수 검사

```bash
npm run check
npm run build
npm run verify
npm run preview
```

- `check`: Astro와 TypeScript 진단.
- `build`: 전체 페이지를 `dist/`에 생성.
- `verify`: 생성 HTML과 원문의 구조·내용 일치, 내부 링크·파일·목차 앵커, 메타 설명, 단일 h1, React 적용 범위 검사.
- `preview`: 빌드 산출물의 브라우저 확인. 실제 Pages처럼 직접 접속·새로고침도 확인한다.
- 별도 `lint` 명령은 없다. 현재 검사 범위에는 전용 CSS 린터가 포함되지 않는다.

작업 시작 전 `AGENTS.md`, 관련 문서, `git status`를 확인한다. 완료 전 모바일·데스크톱, 키보드 이동, 코드블록·표 가로 스크롤, 테마 전환·새로고침, 필터 결과 수와 댓글을 확인하고 `git diff --check`를 실행한다.

## 초기 이전 전용 검사

```bash
npm run verify:migration
```

`scripts/fixtures/pre-astro.json`에는 이전 직전 커밋 `7707044fb5e352e54abf4b314116b32f54eb009f`에서 추출한 40개 페이지의 구조·본문·코드 해시, 메타데이터, 댓글 설정, 공개 자산 해시가 있다. 빌드 결과가 원본과 같은지 검사한다. 공백 정리는 일반 문서에만 적용하고 코드블록 내부 공백은 보존해 비교한다.

이 검사는 초기 전환 승인용이며 이후 의도적인 글·디자인 수정 시 실패할 수 있다. 일반 CI는 현재 원문과 산출물을 비교하는 `verify`를 사용한다. 기준 스냅샷을 자동 갱신해 실패를 숨기지 않는다.
