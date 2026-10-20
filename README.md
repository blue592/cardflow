# Cardflow — 인스타그램 카드뉴스 자동 생성기

Markdown으로 쓴 글을 인스타그램 1080×1080 캐러셀 카드로 변환하는 로컬 오픈소스 CLI입니다.

## 사용

```bash
cardflow --input post.md --out cards --accent '#f97316' --background '#111827'
```

`post.md`는 각 `# 제목`을 새 카드로 사용합니다. 결과는 업로드 가능한 SVG 카드 묶음으로 저장됩니다. PNG 변환, 템플릿, 예약 게시 기능은 확장 adapter로 추가할 수 있습니다.

자동 게시를 구현할 때는 비공식 브라우저 자동화나 계정 비밀번호를 사용하지 않고, Instagram Graph API와 사용자가 발급한 권한 토큰만 사용해야 합니다.

## License

MIT

