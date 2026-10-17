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
  // 1ファイルで完結する HTML にする(ダブルクリックで開け、どこへ置いても動く)
  const css = await fs.readFile(`${builtDir}/nikkei225.css`, 'utf8')
  const js = await fs.readFile(`${builtDir}/nikkei225.js`, 'utf8')
  const html = (await fs.readFile(`${builtDir}/nikkei225.html`, 'utf8'))
    .replace('<link rel="stylesheet" href="nikkei225.css" />', () => `<style>\n${css}\n</style>`)
    .replace('<script src="nikkei225.js"></script>', () => `<script>\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>`)
  await fs.writeFile(`${docsDir}/index.html`, html)
  await fs.remove(`${docsDir}/nikkei225.css`)
  await fs.remove(`${docsDir}/nikkei225.js`)

  console.log('GitHub Pages用の静的ファイルを docs/ に出力しました。')
}

buildPages()
