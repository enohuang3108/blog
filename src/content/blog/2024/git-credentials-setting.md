---
title: 安全使用 Git 憑證
description: GitHub 存取令牌與 2FA 下的儲存方式
date: 2024-05-01
---

<!-- heroImage: /git-credentials-setting/heroImage.png -->

最近公司電腦重灌把 Git 相關的設定也重新整理了一下，這邊分享一下憑證相關的設定。

如果你的 GitHub repo 是 private 的話，每次要進行 Git 操作時 Git 會提示你輸入用戶名和密碼，但是如果你同時開啟了 2FA，輸入密碼的方式就需要改成存取令牌（access tokens）。因為一般人不太可能去記住存取令牌，就會有下面幾種解決方式：

## 1. `helper = store` (不推薦)

直接把 GitHub access token 明碼存在 `.git-credentials` 內，這個方式的問題也很明顯，access token 很有可能被直接取得。

```toml
https://USERNAME:ACCESSTOKEN@email.com
```

<br/>

## 2. 使用 **[git-credential-oauth](https://github.com/hickford/git-credential-oauth)**

這也是這次要介紹的方法，利用 git-credential-oauth 套件來實現在 CLI 也可能通過 2FA 的方法。<br/>
（若你使用 Windows 的話 [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager)（GCM）可能是個更好的選擇。而在 Linux 上，由於 GCM 是在 .NET 中開發的，難以在 Linux 上打包，所以會使用 git-credential-oauth 來處理。）

這邊介紹 Ubuntu 的安裝方式

如果你的 Ubuntu 版本是 23.10 或 24.04，可以使用 `sudo apt install git-credential-oauth` 直接安裝，若無法安裝，可透過以下 PPA 方式安裝：

1.  新增個人套件庫

```bash
sudo add-apt-repository ppa:hickford/git-credential-oauth
```

2.  安裝 git-credential-oauth

```bash
sudo apt update
sudo apt install git-credential-oauth
```

3.  確認安裝成功

```bash
git-credential-oauth --version
```

<br/>
如果不想新增到個人套件庫，也可以直接從 GitHub 下載執行檔：

4.  下載壓縮檔 (確認 URL 的版本是不是最新的)

```bash
wget https://github.com/hickford/git-credential-oauth/releases/download/v0.11.1/git-credential-oauth_0.11.1_linux_amd64.tar.gz
```

5.  解壓縮

```bash
tar -xvf git-credential-oauth_0.11.1_linux_amd64.tar.gz
```

6.  把執行檔搬到 `/bin`，讓系統可以執行

```bash
sudo mv git-credential-oauth /usr/local/bin
```

7.  記得把下載的壓縮檔移除

```bash
rm -f git-credential-oauth_0.11.1_linux_amd64.tar.gz
```

其他平台的安裝可以參考[這裡](https://github.com/hickford/git-credential-oauth?tab=readme-ov-file#installation)

安裝成功的話就可以設定`.gitconfig`，這邊的邏輯是先檢查有沒有 cache，如果沒有的話則使用 OAuth 登入，登入後可利用快取重複操作 Git，同時避免明碼儲存的問題。

```toml
[credential]
    helper = cache --timeout 28800 # 8 hours
    helper = oauth
```

當我們進行 Git 操作時，Terminal 會顯示一個 Github 的 OAuth 連結，登入後就可以進行 Git 操作了。

![git credentials demo](public/2024/git-credentials-setting/git-credentials-demo.png)
