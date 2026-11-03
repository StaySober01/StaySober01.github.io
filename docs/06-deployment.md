# 배포

## 현재 배포 모델

Astro가 생성한 `dist/`를 GitHub Actions로 GitHub Pages에 배포한다. 서버 런타임은 필요 없다. 소스 폴더나 저장소 루트를 직접 배포하지 않는다.

- 공개 주소: `https://staysober01.github.io/`
- base path: `/` (사용자 사이트이므로 저장소 이름을 붙이지 않음)
- Node: `.nvmrc`의 24.14.1
- 설치: `npm ci` / 빌드: `npm run build` / 산출물: `dist/`
- 캐시: `setup-node`의 npm 다운로드 캐시, `package-lock.json` 기준. `node_modules`나 이전 `dist`는 재사용하지 않는다.

## 최초 전환 절차

1. 전환 브랜치에서 로컬 검사와 `verify:migration`, 화면 검증을 완료한다.
2. PR의 build 작업을 확인한다. PR 및 전환 브랜치에서는 배포 작업이 실행되지 않는다.
3. 실제 전환 시 저장소 **Settings → Pages → Source → GitHub Actions**로 변경하고 기본 브랜치에 병합한다. 기존 branch 배포를 유지한 채 새 구조를 main에 먼저 반영하면 정상 제공되지 않을 수 있다.
4. `Build and deploy portfolio`가 성공한 뒤 홈·목록·기존 글의 `.html` 직접 접속 및 새로고침, 댓글 연결을 확인한다.

워크플로는 main push와 main에서의 수동 실행만 배포한다. 타입 검사·빌드·링크 검사 실패 시 배포하지 않는다. 브랜치 작업을 검증하는 동안 원격 Pages 설정·main·공개 사이트는 변경하지 않는다.

## 복구

Astro 전환 이후의 배포 실패는 정상 동작했던 Astro 커밋으로 되돌린 별도 복구 변경을 main에 반영해 동일 Actions로 재배포한다.

초기 HTML 사이트로 완전히 복구해야 한다면 이전 기준 커밋 `7707044fb5e352e54abf4b314116b32f54eb009f`의 정적 소스를 복구 브랜치에 준비한 뒤, 이후 콘텐츠 변경을 보존할지 검토하고 main에 반영한다. 이 경우 Pages Source도 **Deploy from a branch → main → /(root)**로 되돌려야 한다. 소스만 되돌리고 Astro용 Actions를 실행하는 방식은 사용할 수 없다.

## 참고

- [Astro GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages artifact 배포](https://github.com/actions/deploy-pages)
