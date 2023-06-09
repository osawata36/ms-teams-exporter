# teams-analyzer

Microfost Teamsのチームやチャネルの分析用データを取得します。

## Quick Start

access to : https://teamsanalytics.intrapreneurlab.net/

アクセストークンを貼り付けてください

## アクセストークンについて

Graph APIの実行にはアクセストークンが必要です。
以下のいずれかの手順で自身のアカウントのアクセストークンを取得し、[TOKEN設定]画面より登録して

<img src="images/2021-10-28-13-19-34.png" border="1" width="60%">

### 手作業で取得する方法（推奨）

1. [Graphエクスプローラーサイト](https://developer.microsoft.com/ja-jp/graph/graph-explorer)にアクセスし、自身のアカウントでサインインし、APIを実行する
2. 画面内のアクセストークンタブを開くとアクセストークンが表示されるのでコピーする

<img src="images/2021-10-28-13-17-35.png" border="1" width="80%">
ください。


## For developers

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# リポジトリチェック
$ npx repolinter
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### 本プロジェクト環境を構築した際の参考サイト

https://qiita.com/k_kind/items/e2f07f70c9e4455b9902
