import fs from 'fs-extra'

// 日経225ヒートマップページをGitHub Pages用の静的サイトとして docs/ に書き出す。
// 拡張機能本体のビルド(build.mjs)とは別に、`npm run pages:build` で実行する。
const builtDir = 'build/chromium'
const docsDir = 'docs'

async function buildPages() {
  if (!(await fs.pathExists(`${builtDir}/nikkei225.html`))) {
    throw new Error('build/chromium/nikkei225.html が見つかりません。先に `npm run build` を実行してください。')
  }

  await fs.ensureDir(docsDir)
  await fs.copy(`${builtDir}/nikkei225.html`, `${docsDir}/index.html`)
  await fs.copy(`${builtDir}/nikkei225.css`, `${docsDir}/nikkei225.css`)
  await fs.copy(`${builtDir}/nikkei225.js`, `${docsDir}/nikkei225.js`)

  console.log('GitHub Pages用の静的ファイルを docs/ に出力しました。')
}

buildPages()
