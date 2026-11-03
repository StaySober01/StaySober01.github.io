# StaySober01.github.io

게임 개발자 포트폴리오와 TIL 블로그. Astro + React로 정적 HTML을 생성해 GitHub Pages에 배포한다.

```bash
npm ci
npm run dev
```

Node 버전은 [.nvmrc](.nvmrc)를 따른다. 변경 후 `npm run check`, `npm run build`, `npm run verify`를 실행한다. 초기 이전 원본 대조는 `npm run verify:migration`으로 실행한다.

- [개발·검증](docs/05-dev-harness.md)
- [구조와 콘텐츠 작성 위치](docs/04-tech-architecture.md)
- [배포 전환과 복구](docs/06-deployment.md)
- [Astro 전환 검증 기록](docs/09-astro-migration-validation.md)
