# Mia Hsieh — Portfolio

個人作品集網站。純 HTML / CSS,無 build 流程。

## 檔案結構

- `index.html` — 首頁(Hero / 作品 / 聯絡),樣式內嵌
- `case.html` — TROVA. 案例頁
- `bubu.html` — 補補 Bubu 案例頁
- `base.css` — 案例頁共用樣式(各頁專屬樣式內嵌於各自檔案)
- `assets/` — 圖片;`assets/trova/`、`assets/trova-new/`、`assets/bubu/` 是各案例頁素材
- `favicon.svg` — 網站圖示
- `vercel.json` — 啟用 clean URLs(`/case.html` → `/case`),並把舊網址 `/trova` 轉址到 `/case`

## 本機預覽

```bash
npx serve .
```

## 部署

連結 Vercel 後,推到 `redesign` 分支會產生預覽網址;合併到 `main` 才更新正式網站。
