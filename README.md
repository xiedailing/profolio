# Mia Hsieh — Portfolio

個人作品集網站。純 HTML / CSS,無 build 流程。設計稿來自 Figma。

## 檔案結構

- `index.html` — 首頁(Hero / About / Selected Work / Contact)
- `trova.html` — TROVA. 案例頁(桌機 1440 + 手機 390 版型)
- `bubu.html` — 補補 Bubu 案例頁(桌機 1440,平板/手機依 TROVA 版型推導)
- `styles.css` — 共用樣式(設計 token 在最上方 `:root`)
- `case.css` — 案例頁共用樣式(TROVA 與補補)
- `bubu.css` — 補補案例頁專用樣式
- `assets/` — 圖片;`assets/trova/`、`assets/bubu/` 是各案例頁素材
- `vercel.json` — 啟用 clean URLs(`/trova.html` → `/trova`)

## 本機預覽

直接用瀏覽器開啟 `index.html`,或在資料夾內執行:

```bash
npx serve .
```

## 部署

連結到 Vercel 後,每次 push 到 `main` 會自動部署。