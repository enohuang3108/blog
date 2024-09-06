---
title: 11 個常用的 VSCode 插件
description: 介紹 11 個常用的 VSCode 插件
date: 2024-05-01
# heroImage: /vscode-extensions/heroImage.png
---

這篇沒意外的話會是部落格的第一篇文章。之前一直想培養寫文章的習慣，不過一直遲遲沒有下手，就先挑個簡單的題目來寫吧。

## 1. Perttier H2

如果你是前端工程師，應該都會裝這個插件。這是一個 code format 的工具，支援 JS、JSX、TS、CSS、HTML... 如果公司有規定 coding style 的話，這是一個很方便的工具。

![Perttier](https://lh3.googleusercontent.com/sfHO5MKevLesNw1grlh21j0hgtH5IaMmASI5aVv_-gYyF7dvA96FlS7mdagWM6NDPxfEY2JwkArooEZZPOzXmu01-g=w640-h400-e365-rj-sc0x00ffffff)

## 2. Error Lens

讓錯誤訊息直接顯示在程式碼後面，就不需要滑鼠貼上去看了。

![Error Lens demo](https://raw.githubusercontent.com/usernamehw/vscode-error-lens/master/img/demo.png)

## 3. Code Spell Checker

檢查錯字的插件，對於英文常常打錯的小夥伴很有幫助！
![Code Spell Checker demo](https://raw.githubusercontent.com/streetsidesoftware/vscode-spell-checker/main/images/suggestions.gif)

不過當程式裡面出現 Checker 看不懂的專有名詞時（像是公司名字），再搭配上面的 Error Lens 畫面會出現一堆錯字檢查的訊息，這時候可以把這些單字加到白名單中。

```json
"cSpell.userWords": [
  "mynameiseno"
],
```

<br/>

## 4. CodeSnap

將程式碼截成美美的圖片，讓你的投影片看起來有點東西？
![CodeSnap demo](https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/monokai_fira-code.png)

## 5. Color Highlight

前端程式內常常會有大量的色碼，這個插件會在色碼上加上顏色，可以更直觀閱讀程式的顏色。<br/>
![Color Highlight demo](public/vscode-extensions/color-highlight.png)

## 6. Import Cost

在 import library 的時候可以顯示 library 的大小。
![Import Cost demo](public/vscode-extensions/import-cost.png)

## 7. Tailwind CSS IntelliSense

你的專案如果有使用 Tailwind 的話，可以用這個官方插件快速選擇 class。
![Tailwind CSS IntelliSense demo](https://raw.githubusercontent.com/bradlc/vscode-tailwindcss/master/packages/vscode-tailwindcss/.github/autocomplete.png)

## 8. Pretty TypeScript Errors

讓 TypeScript 的 error 變得好看。
![Pretty TypeScript Errors demo](https://github.com/yoavbls/pretty-ts-errors/raw/main/assets/this.png)

## 9. GitLens

追蹤 Git 歷史記錄很強大的一個工具。還有一個很實用的功能，可以直接在這行的後面或是檔案的上方看到這是哪個大神寫的。
![GitLens demo](https://raw.githubusercontent.com/gitkraken/vscode-gitlens/main/images/docs/current-line-blame.png)

## 10. Auto Rename Tag

快速改 HTML 的 Tag，也適用於 JSX。
![Auto Rename Tag demo](https://github.com/formulahendry/vscode-auto-rename-tag/raw/HEAD/images/usage.gif)

## 11. Toggle Quotes

快速切換`" ' `或是`<> []`。
![Toggle Quotes Tag demo](public/vscode-extensions/toggle-quotes-demo.gif)

## 插件分析

最後，如果你安裝了太多插件，發現 VSCode 啟動時間變慢了，可以用`ctrl + shift + p`並輸入 Developer: Show Running Extensions 來檢測插件的啟動時間。
![Toggle Quotes Tag demo](public/vscode-extensions/extensions-analyze.png)

每次都會裝的大概是這些，之後有新的再來分享～
