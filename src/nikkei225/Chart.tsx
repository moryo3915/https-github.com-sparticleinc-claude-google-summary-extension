import { useEffect, useState } from 'react'
import { MONTHLY_HISTORY } from './data'

interface DailyPoint {
  date: string
  close: number
}

type HistoryState =
  | { status: 'loading' }
  | { status: 'daily'; points: DailyPoint[] }
  | { status: 'monthly' }

// stooq.com は日経平均(^NKX)の日足CSVを無料公開している。拡張機能ページは
// manifest.json の host_permissions により、CORSヘッダーなしでもこのドメインへ
// fetch できる(通常のWebページにはない拡張機能特有の挙動)。
const STOOQ_URL = 'https://stooq.com/q/d/l/?s=^nkx&i=d'
const ONE_YEAR_MS = 366 * 24 * 60 * 60 * 1000

function parseStooqCsv(csv: string): DailyPoint[] {
  const lines = csv.trim().split('\n').slice(1)
  const points: DailyPoint[] = []
  for (const line of lines) {
    const cols = line.split(',')
    if (cols.length < 5) continue
    const close = parseFloat(cols[4])
    if (!Number.isFinite(close)) continue
    points.push({ date: cols[0], close })
  }
  return points
}

function useNikkeiHistory(): HistoryState {
  const [state, setState] = useState<HistoryState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetch(STOOQ_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`)
        return res.text()
      })
      .then((csv) => {
        if (cancelled) return
        const all = parseStooqCsv(csv)
        const cutoff = Date.now() - ONE_YEAR_MS
        const recent = all.filter((p) => new Date(p.date).getTime() >= cutoff)
        if (recent.length < 30) throw new Error('insufficient data')
        setState({ status: 'daily', points: recent })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'monthly' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

const WIDTH = 760
const HEIGHT = 220
const PAD_X = 12
const PAD_Y = 24

function LineChart({ labels, values }: { labels: string[]; values: number[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const min = Math.min(...values)
  const max = Math.max(...values)
  const points = values.map((v, i) => {
    const x = PAD_X + (values.length === 1 ? 0 : (i / (values.length - 1)) * (WIDTH - PAD_X * 2))
    const y = HEIGHT - PAD_Y - ((v - min) / (max - min || 1)) * (HEIGHT - PAD_Y * 2)
    return { x, y }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${HEIGHT - PAD_Y} L${points[0].x.toFixed(1)},${HEIGHT - PAD_Y} Z`

  const handleMove = (e: any) => {
    const svg = e.currentTarget as SVGSVGElement
    const rect = svg.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const idx = Math.round(ratio * (values.length - 1))
    setHoverIdx(Math.max(0, Math.min(values.length - 1, idx)))
  }

  return (
    <div className="glarity--nikkei225__chart-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="glarity--nikkei225__chart-svg"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <path d={areaPath} className="glarity--nikkei225__chart-area" />
        <path d={linePath} className="glarity--nikkei225__chart-line" />
        {hoverIdx !== null && (
          <line
            x1={points[hoverIdx].x}
            x2={points[hoverIdx].x}
            y1={PAD_Y}
            y2={HEIGHT - PAD_Y}
            className="glarity--nikkei225__chart-crosshair"
          />
        )}
      </svg>
      <div className="glarity--nikkei225__chart-meta">
        <span>最高 {max.toLocaleString()}円</span>
        <span>最低 {min.toLocaleString()}円</span>
        <span className="glarity--nikkei225__chart-tooltip">
          {hoverIdx !== null
            ? `${labels[hoverIdx]}: ${values[hoverIdx].toLocaleString()}円`
            : `${labels[labels.length - 1]}: ${values[values.length - 1].toLocaleString()}円`}
        </span>
      </div>
      <div className="glarity--nikkei225__chart-axis">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  )
}

function NikkeiChart() {
  const state = useNikkeiHistory()

  if (state.status === 'loading') {
    return <p className="glarity--nikkei225__chart-status">過去1年分の日足データを取得中...</p>
  }

  if (state.status === 'daily') {
    const labels = state.points.map((p) => p.date)
    const values = state.points.map((p) => p.close)
    return (
      <>
        <p className="glarity--nikkei225__chart-note">
          日経平均 日足終値(直近{state.points.length}営業日、出典: stooq.com)
        </p>
        <LineChart labels={labels} values={values} />
      </>
    )
  }

  const labels = MONTHLY_HISTORY.map((p) => p.label)
  const values = MONTHLY_HISTORY.map((p) => p.close)
  return (
    <>
      <p className="glarity--nikkei225__chart-note">
        ※ 日足データを取得できなかったため、日経公式「指数リポート」の月末終値で代用しています。
      </p>
      <LineChart labels={labels} values={values} />
    </>
  )
}

export default NikkeiChart
