# Glarity - ChatGPT による Google／YouTube の要約

Glarity Summary：YouTube、Google、Twitter、その他あらゆる Web ページに対応した、オープンソースの ChatGPT 要約拡張機能です。言語をまたいだ要約を提供し、動画・検索結果・PDF・メール・Web ページを手軽に要約できます。無料の対訳翻訳、メール作成の支援、Web コンテンツへの Q&A など、多くの機能をサポートしています。
体験用パッケージをダウンロードし（[https://github.com/sparticleinc/chatgpt-google-summary-extension/tree/main/packages](https://github.com/sparticleinc/chatgpt-google-summary-extension/tree/main/packages)）、手動で追加してください（[https://github.com/sparticleinc/chatgpt-google-summary-extension#chrome](https://github.com/sparticleinc/chatgpt-google-summary-extension#chrome)）。

## スポンサー


<p align="center">
  <a target="_blank" href="https://felo.ai">
  <img alt="Felo AI"" src="https://felo.ai/blog/img-blog/logo.svg?sanitize=true" width="40">  <br />Felo AI
  </a>
</p>

## 対応サイト

- Google
- YouTube
- Yahoo! JAPAN ニュース
- PubMed
- PMC
- NewsPicks
- Github
- 日経（Nikkei）
- Bing
- Google Patents
- Bilibili
- あらゆる Web サイト
  （要約対応リスト：https://blog.glarity.app/getting-started/user-guide/summary-list）

## インストール

[Chrome ウェブストアから追加](https://chrome.google.com/webstore/detail/summary-for-google-with-c/cmnlolelipjlhfkhpohphpedmkfbobjc)
[Mozilla アドオンストアから追加](https://addons.mozilla.org/zh-CN/firefox/addon/glarity/)

## 機能

- 対訳翻訳（ミラー翻訳、イマーシブ翻訳）
- Gmail のクイック返信
- Google 検索に対応
- YouTube に対応（YouTube 動画の文字起こし、要約、キーモーメント）
- Github に対応
- Bing に対応
- Yahoo! JAPAN ニュースに対応
- PubMed に対応
- PMC に対応
- NewsPicks に対応
- 日経（Nikkei）に対応
- Google Patents に対応
- bilibili に対応
- Twitter の要約に対応
- あらゆる Web ページの要約に対応
- iOS Safari／macOS Safari に対応
- OpenAI 公式 API に対応（GPT-3.5-turbo／text-davinci-003）
- ChatGPT Plus に対応
- Markdown のレンダリング
- コードのシンタックスハイライト
- ダークモード
- ChatGPT 改善のためのフィードバック送信
- クリップボードへのコピー
- 言語の切り替え
- Glarity AI モデル

## スクリーンショット

### Google

![Screenshot](screenshots/google-vs-chatgpt.png?raw=true)
![Screenshot](screenshots/extension-google.png?raw=true)

### YouTube

![Screenshot](screenshots/extension-youtube.jpeg?raw=true)

### Bilibili

![Screenshot](screenshots/bilibili-cn.webp?raw=true)

### iOS Safari／macOS Safari

![Screenshot](screenshots/iOS-Safari-en.webp?raw=true)
![Screenshot](screenshots/macOS-Safari-en.webp?raw=true)

### Github

![Github](screenshots/github-en.png?raw=true)

### Bing

![Bing](screenshots/bing-en.png)

### Google Patents

![Google Patents](screenshots/google-patents-en.png)

### Yahoo! JAPAN ニュース

![Screenshot](screenshots/yahoo-japan.jpg?raw=true)

### PubMed

![Screenshot](screenshots/pubmed.jpg?raw=true)

### PMC

![Screenshot](screenshots/PMC-en.png?raw=true)

### NewsPicks

![Screenshot](screenshots/newspicks-jp.jpg?raw=true)

### 日経（Nikkei）

![Nikkei](screenshots/nikkei-jp.png)

## 日経225ヒートマップ & 投資家情報

拡張機能のポップアップにある「日経225 ヒートマップ & 投資家情報」ボタンから、専用ページ(`nikkei225.html`)を開けます。GitHub Pages で公開した静的版(`docs/index.html`)も同じ内容です。

### ページの構成

- **本日の市場概況**: 終値・前日比、下落/上昇の要因、寄与度の上位銘柄、出典リンク。
- **過去1年間のチャート(日足)**: 日経平均の終値を折れ線で表示し、ホバーで日付と値を確認できます。拡張機能では `stooq.com` から日足を取得します。取得できない場合(静的版など)は、日経公式「指数リポート」の月末終値で代用し、その旨を画面に表示します。
- **ヒートマップ**: 採用銘柄をタイルで表示します。
  - **大きさ**: 正式な指数ウェイトではなく、影響度の目安を3段階(A/B/C)で表したものです。日経平均は株価平均型のため、株価の高い銘柄ほど指数への影響(寄与度)が大きくなります。
  - **色**: 業種グループ(13グループを7色で表現)。
  - **枠線**: 報道で値動きを確認できた銘柄のみ、赤=上昇・青=下落で表示します。
- **銘柄の詳細**: タイルまたは一覧の行をクリックすると、配当利回りと直近決算の要約、出典を表示します。
- **採用銘柄一覧**: コード・銘柄名・業種・配当・決算サマリーの表。

### データについて

- 決算・配当の詳細は、影響の大きい36銘柄のみ Web 検索で調べた内容を掲載しています。残りの銘柄はコード・銘柄名・業種のみです。
- 銘柄リストは入れ替え(4月・10月)の確認結果に基づくベストエフォートで、完全性・最新性は保証しません。正式な構成銘柄とウェイトは[日経公式サイト](https://indexes.nikkei.co.jp/nkave/index/component?idx=nk225)で確認してください。
- 本ページは投資助言ではありません。投資判断は自己責任で行ってください。

### データの更新と公開

- データは `src/nikkei225/data.ts` にあります。
- 静的版は `npm run pages:build` で `docs/` に出力されます。GitHub Pages は Settings → Pages で `/docs` フォルダを公開元に指定してください。

## トラブルシューティング

### Brave で動作させる方法

![Screenshot](screenshots/brave.png?raw=true)
`brave://settings/shields` で「言語設定に基づくフィンガープリントによるサイトの追跡を防ぐ」を無効にしてください。

## ソースからのビルド

1. リポジトリをクローンする
2. `npm` で依存パッケージをインストールする
3. `npm run build` を実行する

### パッケージ

- [Chromium](packages/Glarity-chromium-beta.zip)
- [Firefox](packages/Glarity-firefox-beta.zip)

### Chrome

1. `chrome://extensions/` を開く。
2. 右上の `Developer mode`（デベロッパーモード）をオンにする。
3. `Load unpacked`（パッケージ化されていない拡張機能を読み込む）をクリックする。
4. 拡張機能のフォルダ（`build/chromium/`）を選択する。

### Firefox

1. `about:debugging#/runtime/this-firefox` を開く。
2. `Load Temporary Add-on`（一時的なアドオンを読み込む）をクリックする。
3. 拡張機能のファイル（`build/firefox.zip`）を選択する。

## クレジット

本プロジェクトは [wong2/chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension) をフォークしたものであり、[qunash/chatgpt-advanced](https://github.com/qunash/chatgpt-advanced) および [YouTube Summary with ChatGPT](https://github.com/kazuki-sf/YouTube_Summary_with_ChatGPT) のコードを参考にしています。

## ライセンス

[GPL-3.0 ライセンス](LICENSE)。
