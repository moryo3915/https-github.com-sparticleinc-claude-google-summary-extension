import { useMemo, useState } from 'react'
import NikkeiChart from './Chart'
import { DETAILED_COUNT, MACRO_GROUP_INFO, MARKET_SNAPSHOT, STOCKS, StockEntry } from './data'
import './styles.scss'

function App() {
  const [selected, setSelected] = useState<StockEntry | null>(null)

  const totalListed = STOCKS.length

  const groupEntries = useMemo(() => Object.entries(MACRO_GROUP_INFO), [])

  return (
    <div className="glarity--nikkei225">
      <header className="glarity--nikkei225__header">
        <h1>日経225 ヒートマップ &amp; 投資家情報</h1>
        <p className="glarity--nikkei225__subtitle">
          価格換算ウェイト・寄与度のイメージと、採用銘柄225社の決算・配当情報をまとめています。
        </p>
      </header>

      <section className="glarity--nikkei225__card glarity--nikkei225__snapshot">
        <h2>最新の市場概況({MARKET_SNAPSHOT.asOf})</h2>
        <p className="glarity--nikkei225__price">
          {MARKET_SNAPSHOT.close}
          <span className="glarity--nikkei225__change">{MARKET_SNAPSHOT.change}</span>
        </p>
        <p>{MARKET_SNAPSHOT.note}</p>
        <p>{MARKET_SNAPSHOT.cause}</p>

        <p className="glarity--nikkei225__sources">{MARKET_SNAPSHOT.contributionLabel}</p>
        <div className="glarity--nikkei225__contrib">
          <div>
            <h3>寄与度プラス上位</h3>
            <ul>
              {MARKET_SNAPSHOT.topPositive.map((s) => (
                <li key={s.code}>
                  {s.name}({s.code}): {s.contribution}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>寄与度マイナス上位</h3>
            <ul>
              {MARKET_SNAPSHOT.topNegative.map((s) => (
                <li key={s.code}>
                  {s.name}({s.code}): {s.contribution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="glarity--nikkei225__sources">
          出典:{' '}
          {MARKET_SNAPSHOT.sources.map((src, i) => (
            <span key={src.url}>
              <a href={src.url} target="_blank" rel="noreferrer">
                {src.label}
              </a>
              {i < MARKET_SNAPSHOT.sources.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </p>
      </section>

      <section className="glarity--nikkei225__card glarity--nikkei225__chart">
        <h2>過去1年間のチャート(日足)</h2>
        <NikkeiChart />
      </section>

      <section className="glarity--nikkei225__legend">
        {groupEntries.map(([key, info]) => (
          <span key={key} className="glarity--nikkei225__legend-item">
            <i style={{ background: info.color }} />
            {info.label}
          </span>
        ))}
        <span className="glarity--nikkei225__legend-item">
          <i className="glarity--nikkei225__legend-swatch--up" />
          直近値上がり(確認済)
        </span>
        <span className="glarity--nikkei225__legend-item">
          <i className="glarity--nikkei225__legend-swatch--down" />
          直近値下がり(確認済)
        </span>
      </section>

      <section className="glarity--nikkei225__grid">
        {STOCKS.map((stock) => (
          <button
            key={stock.code}
            type="button"
            title={`${stock.name}(${stock.code})`}
            className={[
              'glarity--nikkei225__tile',
              `glarity--nikkei225__tile--${stock.tier}`,
              stock.detail?.todayMove ? `glarity--nikkei225__tile--${stock.detail.todayMove}` : '',
            ].join(' ')}
            style={{ background: MACRO_GROUP_INFO[stock.group].color }}
            onClick={() => setSelected(stock)}
          >
            <span className="glarity--nikkei225__tile-code">{stock.code}</span>
            <span className="glarity--nikkei225__tile-name">{stock.name}</span>
          </button>
        ))}
      </section>

      {selected && (
        <section className="glarity--nikkei225__card glarity--nikkei225__detail">
          <h2>
            {selected.name}({selected.code})
          </h2>
          <p>
            業種: {MACRO_GROUP_INFO[selected.group].label} / {selected.sector}
          </p>
          {selected.detail ? (
            <>
              <p>{selected.detail.priceNote}</p>
              <p>配当: {selected.detail.dividendYield}</p>
              <p>決算: {selected.detail.earnings}</p>
              <p className="glarity--nikkei225__detail-source">出典: {selected.detail.source}</p>
            </>
          ) : (
            <p>
              この銘柄の決算・配当の詳細データは未収集です。最新情報は各社IRや証券会社サイトをご確認ください。
            </p>
          )}
          <button type="button" onClick={() => setSelected(null)}>
            閉じる
          </button>
        </section>
      )}

      <section className="glarity--nikkei225__list">
        <h2>
          採用銘柄一覧({totalListed}銘柄、決算・配当の詳細データあり{DETAILED_COUNT}銘柄)
        </h2>
        <table>
          <thead>
            <tr>
              <th>コード</th>
              <th>銘柄名</th>
              <th>業種</th>
              <th>配当</th>
              <th>決算サマリー</th>
            </tr>
          </thead>
          <tbody>
            {STOCKS.map((stock) => (
              <tr key={stock.code} onClick={() => setSelected(stock)}>
                <td>{stock.code}</td>
                <td>{stock.name}</td>
                <td>{stock.sector}</td>
                <td>{stock.detail?.dividendYield ?? '-'}</td>
                <td>{stock.detail?.earnings ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="glarity--nikkei225__footer">
        <p>
          ※ タイルの大きさは正式な指数ウェイトではなく、影響度の目安(3段階)です。色は業種グループを表します。
          直近の値動き(枠線の赤=上昇/青=下落)は報道で確認できた銘柄のみ表示しています。
          最新かつ正式な構成銘柄・ウェイトは
          <a
            href="https://indexes.nikkei.co.jp/nkave/index/component?idx=nk225"
            target="_blank"
            rel="noreferrer"
          >
            日経公式サイト
          </a>
          でご確認ください。本ページの情報は投資助言ではありません。投資判断は自己責任で行ってください。
        </p>
      </footer>
    </div>
  )
}

export default App
