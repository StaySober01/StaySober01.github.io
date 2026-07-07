# 배포

## 현재 배포 모델

GitHub Pages가 저장소의 정적 파일을 그대로 제공하는 구성을 기준으로 한다. 기본 브랜치의 저장소 루트(`/`)를 배포 소스로 선택하면 별도 빌드 산출물 없이 `index.html`이 진입점이 된다.

## 설정 절차

1. GitHub 저장소의 **Settings → Pages**로 이동한다.
2. **Deploy from a branch**를 선택한다.
3. 기본 브랜치와 `/(root)` 폴더를 선택해 저장한다.
4. 배포된 URL에서 CSS, 섹션 링크, 모바일 화면을 확인한다.

현재 저장소에는 배포용 GitHub Actions나 커스텀 도메인 설정을 추가하지 않는다.

## 향후 변경

Astro 또는 Vite로 전환하면 정적 결과물을 생성하는 빌드 명령과 GitHub Actions 배포가 필요하다. 이때 Pages base path, 산출물 디렉토리, Node 버전, 캐시 정책을 이 문서와 결정 로그에 기록한다.
