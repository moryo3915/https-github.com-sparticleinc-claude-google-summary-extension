// 日経平均株価(日経225)ヒートマップ用データ
//
// 注意: このデータはClaude (claude-sonnet-4-6) がWeb検索結果をもとに
// 2026年6月26日時点で作成したスナップショットです。本拡張機能が動作する
// サンドボックス環境のネットワーク制約上、225銘柄すべてをリアルタイムで
// 自動取得することはできず、以下の方針でデータを構成しています。
//
// 1. 指数への影響が大きい・話題性が高い36銘柄については、Web検索で取得した
//    実際の決算・配当情報を detail に記載し、出典(source)を明記しています。
// 2. 残りの銘柄は、銘柄コード・銘柄名・業種のみを掲載しています(訓練データ
//    および2025年10月・2026年4月の入れ替え発表の確認結果に基づくベスト
//    エフォートの一覧で、完全性・最新性を保証するものではありません)。
// 3. 「本日の市場概況」は2026年6月26日の実際の報道(日本経済新聞・株探等)
//    に基づく実データです。
//
// 最新かつ正式な構成銘柄・ウェイトは日経公式サイトでご確認ください:
// https://indexes.nikkei.co.jp/nkave/index/component?idx=nk225

export type MacroGroup =
  | 'auto'
  | 'electronics'
  | 'materials'
  | 'pharma'
  | 'machinery'
  | 'trading'
  | 'retail'
  | 'financial'
  | 'telecom'
  | 'transport'
  | 'realestate'
  | 'energy'
  | 'service'

export const MACRO_GROUP_INFO: Record<MacroGroup, { label: string; color: string }> = {
  auto: { label: '自動車・輸送機器', color: '#6495CF' },
  electronics: { label: '電機・精密', color: '#B4E04B' },
  materials: { label: '素材・化学', color: '#EE762E' },
  pharma: { label: '医薬品', color: '#EA5B76' },
  machinery: { label: '機械', color: '#7E6CA8' },
  trading: { label: '商社・卸売', color: '#AFA690' },
  retail: { label: '小売・食品', color: '#FED552' },
  financial: { label: '金融(銀行・保険・証券)', color: '#6495CF' },
  telecom: { label: '情報・通信', color: '#B4E04B' },
  transport: { label: '運輸(陸運・海運・空運)', color: '#7E6CA8' },
  realestate: { label: '不動産・建設', color: '#EE762E' },
  energy: { label: 'インフラ・エネルギー', color: '#FED552' },
  service: { label: 'サービス・その他', color: '#EA5B76' },
}

export type Tier = 'A' | 'B' | 'C'

export interface StockDetail {
  priceNote: string
  dividendYield: string
  earnings: string
  todayMove?: 'up' | 'down'
  source: string
}

export interface StockEntry {
  code: string
  name: string
  sector: string
  group: MacroGroup
  tier: Tier
  detail?: StockDetail
}

export const MARKET_SNAPSHOT = {
  asOf: '2026年6月26日 大引け',
  close: '69,360.88円',
  change: '-3,005.46円 (-4.15%)',
  note: '年間最大、歴代3番目の下げ幅。値上がり114銘柄・値下がり109銘柄・変わらず2銘柄。',
  cause:
    'メモリー(DRAM/NAND)価格の急騰でAI投資が減速しかねないとの懸念が広がり、国内外のAI・半導体関連株が軒並み売られた。原油価格上昇による企業業績への懸念も重荷となった。',
  topPositive: [{ code: '7203', name: 'トヨタ自動車', contribution: '+11.31pt(株価+2.5%)' }],
  topNegative: [
    { code: '9984', name: 'ソフトバンクグループ', contribution: 'マイナス寄与上位' },
    { code: '8035', name: '東京エレクトロン', contribution: 'マイナス寄与上位' },
    { code: '6857', name: 'アドバンテスト', contribution: 'マイナス寄与上位' },
  ],
  sources: [
    { label: '日経平均終値3005円安の6万9360円 過去3番目の下げ幅 - 日本経済新聞', url: 'https://www.nikkei.com/article/DGXZQOFL261RUTW6A620C2000000/' },
    { label: '日経平均 大引け｜急反落、AI・半導体関連株が軒並み安(6月26日) - 株探', url: 'https://kabutan.jp/news/marketnews/?b=n202606261054' },
    { label: '日経平均寄与度ランキング［2026年6月26日］ - 株式ちゃんねる', url: 'https://stock.f-frontier.com/2026/06/26/234224/' },
  ],
}

export interface MonthlyPoint {
  label: string
  close: number
  sourceUrl: string
}

// 日経公式「指数リポート」(indexes.nikkei.co.jp/atoz/...)の月次終値。
// 過去1年分の日足データがネットワーク制約等で取得できない場合のフォールバック表示用。
export const MONTHLY_HISTORY: MonthlyPoint[] = [
  { label: '2025/05', close: 37965.10, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/06/202505.html' },
  { label: '2025/06', close: 40487.39, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/07/202506.html' },
  { label: '2025/07', close: 41069.82, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/08/202507.html' },
  { label: '2025/08', close: 42718.47, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/09/202508.html' },
  { label: '2025/09', close: 44932.63, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/10/202509.html' },
  { label: '2025/10', close: 52411.34, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/11/202510.html' },
  { label: '2025/11', close: 50253.91, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2025/12/202511.html' },
  { label: '2025/12', close: 50339.48, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/01/202512.html' },
  { label: '2026/01', close: 53322.85, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/02/202601.html' },
  { label: '2026/02', close: 58850.27, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/03/202602.html' },
  { label: '2026/03', close: 51063.72, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/04/202603.html' },
  { label: '2026/04', close: 59284.92, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/05/202604.html' },
  { label: '2026/05', close: 66329.50, sourceUrl: 'https://indexes.nikkei.co.jp/atoz/2026/06/202605.html' },
  { label: '2026/06/26', close: 69360.88, sourceUrl: 'https://www.nikkei.com/article/DGXZQOFL261RUTW6A620C2000000/' },
]

const SRC_GENERAL = 'WebSearch調査(2026/6/26時点、Yahoo!ファイナンス・日経電子版・各社IR等の検索結果を集約)'

export const STOCKS: StockEntry[] = [
  // ---- 大型・主要36銘柄(投資家向け実データあり) ----
  { code: '9983', name: 'ファーストリテイリング', sector: '小売業', group: 'retail', tier: 'A', detail: {
    priceNote: '日経225の中で価格換算ウェイトが最大級',
    dividendYield: '予想配当利回り 0.76%',
    earnings: '2026年8月期2Q: 売上収益2兆552億円(+14.8%)、営業利益4,006億円(+31.7%)で過去最高。海外ユニクロが牽引。',
    source: SRC_GENERAL,
  } },
  { code: '9984', name: 'ソフトバンクグループ', sector: '情報・通信業', group: 'telecom', tier: 'A', detail: {
    priceNote: '2026/6/26はAI・半導体懸念でマイナス寄与上位',
    dividendYield: '予想配当利回り 0.15%',
    earnings: '直近期: OpenAI関連のAI投資拡大で売上高7兆7,987億円(+7.7%)、純利益5兆23億円(+333.7%)の大幅増益。',
    todayMove: 'down',
    source: SRC_GENERAL,
  } },
  { code: '8035', name: '東京エレクトロン', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '2026/6/26はAI・半導体懸念でマイナス寄与上位',
    dividendYield: '配当方針: 連結配当性向重視(具体的数値は要確認)',
    earnings: '2026年3月期4Q: 8.6%増収、11.9%営業増益。2027年3月期上期は33%増収・42%営業増益を予想。',
    todayMove: 'down',
    source: SRC_GENERAL,
  } },
  { code: '6857', name: 'アドバンテスト', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '2026/6/26はメモリー価格高騰懸念でマイナス寄与上位',
    dividendYield: '配当方針: 連結配当性向目安あり(具体的数値は要確認)',
    earnings: '2026年3月期: 売上高1兆1,286億円(+44.7%)、営業利益4,991億円(+118.8%)。AI向け半導体テスタ需要拡大で大幅増収増益。',
    todayMove: 'down',
    source: SRC_GENERAL,
  } },
  { code: '6146', name: 'ディスコ', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '半導体製造装置(精密加工装置)大手',
    dividendYield: '配当: 業績連動の配当政策(具体的利回りは要確認)',
    earnings: 'AI・先端半導体需要を背景に業績拡大基調(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '4063', name: '信越化学工業', sector: '化学', group: 'materials', tier: 'A', detail: {
    priceNote: '半導体シリコンウェハー世界最大手',
    dividendYield: '配当: 安定配当方針(具体的利回りは要確認)',
    earnings: '半導体材料・塩化ビニル事業が中核(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '4543', name: 'テルモ', sector: '精密機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '医療機器大手',
    dividendYield: '増配方針: 2027年3月期は6円増配予定',
    earnings: '2026年3月期: 売上収益1兆1,319億円(+9.2%)、営業利益1,763億円(+11.8%)。2027年3月期は最終利益+22%を計画。',
    source: SRC_GENERAL,
  } },
  { code: '6954', name: 'ファナック', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: 'FA・産業用ロボット大手',
    dividendYield: '配当: 業績連動(具体的利回りは要確認)',
    earnings: '2026年3月期: FA・ロボット部門好調で売上高8,578億円(+7.6%)、経常利益2,274億円(+15.6%)の増収増益。',
    source: SRC_GENERAL,
  } },
  { code: '4568', name: '第一三共', sector: '医薬品', group: 'pharma', tier: 'A', detail: {
    priceNote: '大型抗がん剤(ADC)が成長ドライバー',
    dividendYield: '配当: 安定配当方針(具体的利回りは要確認)',
    earnings: '抗がん剤ポートフォリオの海外展開が業績を牽引(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '6976', name: '太陽誘電', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '電子部品(コンデンサ等)大手',
    dividendYield: '配当: 業績連動(具体的利回りは要確認)',
    earnings: '2026年3月期: 車載・情報インフラ向け需要増で売上高3,553億円(+4.1%)、営業利益199億円(+91.2%)の大幅増収増益。',
    source: SRC_GENERAL,
  } },
  { code: '6971', name: '京セラ', sector: '電気機器', group: 'electronics', tier: 'B', detail: {
    priceNote: '電子部品・ファインセラミックス大手',
    dividendYield: '配当利回り 1.57%',
    earnings: '直近配当は1株当たり27円。',
    source: SRC_GENERAL,
  } },
  { code: '7733', name: 'オリンパス', sector: '精密機器', group: 'electronics', tier: 'B', detail: {
    priceNote: '内視鏡で世界トップシェアの医療機器メーカー',
    dividendYield: '予想配当利回り 1.96%(配当30.00円予想)',
    earnings: '2026年3月期: 増収減益。売上高1兆106億円(+1.3%、過去最高)、営業利益971億円(-40.2%)。',
    source: SRC_GENERAL,
  } },
  { code: '6098', name: 'リクルートホールディングス', sector: 'サービス業', group: 'service', tier: 'A', detail: {
    priceNote: '人材・HR Technology事業が中核',
    dividendYield: '予想配当利回り 0.38%(配当25.00円予想)',
    earnings: '2026年3月期: 全事業セグメントで増収。売上収益3兆6,973億円(+3.9%)、営業利益6,305億円(+28.5%)の大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '6762', name: 'TDK', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '電子部品(電池・センサ等)大手',
    dividendYield: '年間配当36円予定(中間16円+期末20円)',
    earnings: '2026年3月期: 売上高2兆5,048億円(+13.6%)、営業利益2,724億円(+21.5%)で過去最高を更新。',
    source: SRC_GENERAL,
  } },
  { code: '6988', name: '日東電工', sector: '電気機器', group: 'electronics', tier: 'B', detail: {
    priceNote: '機能材料(粘着・フィルム)大手',
    dividendYield: '配当利回り 1.95%',
    earnings: '2026年3月期: 増収減益。売上収益1兆281億円(+1.4%)、営業利益1,836億円(-1.1%)。',
    source: SRC_GENERAL,
  } },
  { code: '6367', name: 'ダイキン工業', sector: '機械', group: 'machinery', tier: 'A', detail: {
    priceNote: '2026/6/26は主要プラス寄与銘柄の一つ',
    dividendYield: '配当利回り 1.53%',
    earnings: '2026年3月期: 増収増益。売上高5兆150億円(+5.5%)、営業利益4,149億円(+3.3%)。',
    todayMove: 'up',
    source: SRC_GENERAL,
  } },
  { code: '7974', name: '任天堂', sector: 'その他製品', group: 'service', tier: 'A', detail: {
    priceNote: 'Nintendo Switch 2が好調',
    dividendYield: '配当利回り 2.41%',
    earnings: '2026年3月期: 売上高2兆3,130億円(+98.6%)、営業利益3,601億円(+27.5%)の大幅増収増益。',
    source: SRC_GENERAL,
  } },
  { code: '9433', name: 'KDDI', sector: '情報・通信業', group: 'telecom', tier: 'A', detail: {
    priceNote: '2026/6/26は主要プラス寄与銘柄の一つ',
    dividendYield: '配当: 累進的増配方針(具体的利回りは要確認)',
    earnings: '2026年3月期: 売上高6兆719億円(+4.1%)、営業利益1兆991億円(+1.1%)、純利益7,071億円(+7.9%)の増収増益。',
    todayMove: 'up',
    source: SRC_GENERAL,
  } },
  { code: '6758', name: 'ソニーグループ', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: 'ゲーム・音楽・映画・イメージングセンサーの複合企業',
    dividendYield: '配当利回り 0.70%(配当予想22.42円)',
    earnings: '2025年度3Q: 売上高9兆4,432億円(+2.3%)、営業利益1兆2,839億円(+21.0%)の増収増益。',
    source: SRC_GENERAL,
  } },
  { code: '8316', name: '三井住友フィナンシャルグループ', sector: '銀行業', group: 'financial', tier: 'A', detail: {
    priceNote: '3メガバンクの一つ',
    dividendYield: '配当利回り 2.77%(年間配当180円)',
    earnings: '2026年3月期: 経常利益2兆3,034億円(+34.0%)、純利益1兆5,830億円(+34.4%)の大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '8058', name: '三菱商事', sector: '卸売業', group: 'trading', tier: 'A', detail: {
    priceNote: '総合商社最大手',
    dividendYield: '予想配当利回り 約2%(予想配当110円)',
    earnings: '資源・エネルギー権益と事業投資が収益基盤(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '8031', name: '三井物産', sector: '卸売業', group: 'trading', tier: 'A', detail: {
    priceNote: '総合商社大手',
    dividendYield: '予想配当 100株あたり11,500円(具体的利回りは要確認)',
    earnings: '資源・金属、エネルギー、機械・インフラ等が収益基盤(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '8001', name: '伊藤忠商事', sector: '卸売業', group: 'trading', tier: 'A', detail: {
    priceNote: '非資源分野に強い総合商社',
    dividendYield: '2026年度配当予想 1株あたり44円以上(累進的増配方針)',
    earnings: '2026年3月期: 増収増益。収益14兆8,231億円(+0.7%)、純利益9,003億円(+2.3%)。次期純利益9,500億円を見込む。',
    source: SRC_GENERAL,
  } },
  { code: '4519', name: '中外製薬', sector: '医薬品', group: 'pharma', tier: 'B', detail: {
    priceNote: 'ロシュ(Roche)グループの高ROE製薬企業',
    dividendYield: '配当: 安定配当方針(具体的利回りは要確認)',
    earnings: '抗体医薬・がん領域に強み(詳細な最新決算数値は検索結果からは未確認)。',
    source: SRC_GENERAL,
  } },
  { code: '4502', name: '武田薬品工業', sector: '医薬品', group: 'pharma', tier: 'A', detail: {
    priceNote: '国内製薬最大手、グローバル展開',
    dividendYield: '配当: 安定配当方針(具体的利回りは要確認)',
    earnings: '2026年3月期: VYVANSE後発品の影響を主力製品の伸長でカバー。営業利益+19.3%、当期利益+77.6%の大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '6861', name: 'キーエンス', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: 'FAセンサー大手、超高収益体質で知られる',
    dividendYield: '配当: 増配傾向(具体的利回りは要確認)',
    earnings: '2026年3月期: 売上高1兆1,692億円(+10.4%)、営業利益5,957億円(+8.4%)で過去最高。海外売上+13.5%が牽引。',
    source: SRC_GENERAL,
  } },
  { code: '7741', name: 'HOYA', sector: '精密機器', group: 'electronics', tier: 'A', detail: {
    priceNote: '半導体用マスク・ライフケア事業が収益柱',
    dividendYield: '配当利回り 1.09%',
    earnings: '2026年3月期: ライフケア・情報通信事業好調で売上収益9,477億円(+9.4%)、純利益2,531億円(+25.2%)の大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '6752', name: 'パナソニックホールディングス', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: 'データセンター向け蓄電システムが成長分野',
    dividendYield: '配当利回り 1.51%',
    earnings: '2026年3月期: 減収減益。売上高8兆487億円(前年比95%)、営業利益2,364億円(前年比55%)。',
    source: SRC_GENERAL,
  } },
  { code: '6501', name: '日立製作所', sector: '電気機器', group: 'electronics', tier: 'A', detail: {
    priceNote: 'Lumada事業(デジタル)・エネルギー事業が成長柱',
    dividendYield: '配当利回り 1.05%',
    earnings: '2026年3月期: 売上収益10兆5,867億円(+8.2%)、調整後営業利益1兆1,992億円(+23.4%)、純利益8,023億円(+30.3%)の大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '9432', name: 'NTT', sector: '情報・通信業', group: 'telecom', tier: 'A', detail: {
    priceNote: '国内通信最大手、グローバル事業も展開',
    dividendYield: '予想配当利回り 3.75%',
    earnings: '2025年度3Q: 営業収益10兆4,210億円(+3.7%)、営業利益1兆4,571億円(+4.1%)。但し2027年3月期は純利益5.5%減益予想。',
    source: SRC_GENERAL,
  } },
  { code: '7011', name: '三菱重工業', sector: '機械', group: 'machinery', tier: 'A', detail: {
    priceNote: '航空・防衛・宇宙セグメントが好調',
    dividendYield: '配当利回り 0.80%',
    earnings: '2026年3月期: 売上収益4兆9,741億円(+14.1%)、事業利益4,322億円(+21.8%)の大幅増益。通期予想を上方修正。',
    source: SRC_GENERAL,
  } },
  { code: '9101', name: '日本郵船', sector: '海運業', group: 'transport', tier: 'B', detail: {
    priceNote: '高配当の海運大手',
    dividendYield: '配当利回り 4.5%(高配当)',
    earnings: '2026年3月期: 減収減益。売上高2兆4,236億円(-6.4%)、営業利益1,386億円(-34.3%)。定期船市況下落が影響。',
    source: SRC_GENERAL,
  } },
  { code: '1605', name: 'INPEX', sector: '鉱業', group: 'energy', tier: 'B', detail: {
    priceNote: '国内最大の石油・天然ガス開発企業',
    dividendYield: '配当利回り 2.7%',
    earnings: '2025-2027年度中期経営計画: 年間配当90円を起点とする累進配当+機動的自己株式取得で総還元性向50%以上を目指す。',
    source: SRC_GENERAL,
  } },
  { code: '4755', name: '楽天グループ', sector: '情報・通信業', group: 'telecom', tier: 'B', detail: {
    priceNote: 'EC・金融・携帯通信のエコシステム展開',
    dividendYield: '配当利回り 0.00%(無配)',
    earnings: '2025年12月期: 全セグメントで増収。売上収益2兆4,965億円(+9.5%)。Non-GAAP営業利益は大幅増益。',
    source: SRC_GENERAL,
  } },
  { code: '7203', name: 'トヨタ自動車', sector: '輸送用機器', group: 'auto', tier: 'A', detail: {
    priceNote: '2026/6/26 終値2,768円(+2.5%)、寄与度+11.31pt(プラス寄与トップ)',
    dividendYield: '配当利回り 3.70%(2026年3月期は年間95円・6期連続増配の見込み)',
    earnings: '2026年3月期: 増収減益。売上高50兆6,849億円(+5.5%、過去最高)、営業利益3兆7,662億円(-21.5%)。',
    todayMove: 'up',
    source: SRC_GENERAL,
  } },
  { code: '8306', name: '三菱UFJフィナンシャル・グループ', sector: '銀行業', group: 'financial', tier: 'A', detail: {
    priceNote: '3メガバンクの一つ、時価総額最大級',
    dividendYield: '配当利回り 3.01%',
    earnings: '2026年3月期: 5期連続増配。年間配当74円(前期比+6円)。',
    source: SRC_GENERAL,
  } },

  // ---- その他の構成銘柄(コード・銘柄名・業種のみ。ベストエフォートの一覧) ----
  { code: '1332', name: '日本水産', sector: '水産・農林業', group: 'service', tier: 'C' },
  { code: '1377', name: 'サカタのタネ', sector: '水産・農林業', group: 'service', tier: 'C' },
  { code: '1801', name: '大成建設', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '1802', name: '大林組', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '1803', name: '清水建設', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '1808', name: '長谷工コーポレーション', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '1812', name: '鹿島建設', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '1925', name: '大和ハウス工業', sector: '建設業', group: 'realestate', tier: 'B' },
  { code: '1928', name: '積水ハウス', sector: '建設業', group: 'realestate', tier: 'B' },
  { code: '1944', name: 'きんでん', sector: '建設業', group: 'realestate', tier: 'C' },
  { code: '2002', name: '日清製粉グループ本社', sector: '食品', group: 'retail', tier: 'C' },
  { code: '2269', name: '明治ホールディングス', sector: '食品', group: 'retail', tier: 'C' },
  { code: '2282', name: '日本ハム', sector: '食品', group: 'retail', tier: 'C' },
  { code: '2502', name: 'アサヒグループホールディングス', sector: '食品', group: 'retail', tier: 'B' },
  { code: '2503', name: 'キリンホールディングス', sector: '食品', group: 'retail', tier: 'B' },
  { code: '2531', name: '宝ホールディングス', sector: '食品', group: 'retail', tier: 'C' },
  { code: '2801', name: 'キッコーマン', sector: '食品', group: 'retail', tier: 'C' },
  { code: '2802', name: '味の素', sector: '食品', group: 'retail', tier: 'B' },
  { code: '2914', name: '日本たばこ産業(JT)', sector: '食品', group: 'retail', tier: 'B' },
  { code: '3101', name: '東洋紡', sector: '繊維製品', group: 'materials', tier: 'C' },
  { code: '3401', name: '帝人', sector: '繊維製品', group: 'materials', tier: 'C' },
  { code: '3402', name: '東レ', sector: '繊維製品', group: 'materials', tier: 'B' },
  { code: '3697', name: 'SHIFT', sector: '情報・通信業', group: 'telecom', tier: 'C' },
  { code: '3863', name: '日本製紙', sector: 'パルプ・紙', group: 'materials', tier: 'C' },
  { code: '4004', name: 'レゾナック・ホールディングス', sector: '化学', group: 'materials', tier: 'B' },
  { code: '4005', name: '住友化学', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4021', name: '日産化学', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4042', name: '東ソー', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4043', name: 'トクヤマ', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4061', name: 'デンカ', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4183', name: '三井化学', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4188', name: '三菱ケミカルグループ', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4208', name: 'UBE', sector: '化学', group: 'materials', tier: 'C' },
  { code: '4452', name: '花王', sector: '化学', group: 'retail', tier: 'B' },
  { code: '4901', name: '富士フイルムホールディングス', sector: '化学', group: 'electronics', tier: 'B' },
  { code: '4911', name: '資生堂', sector: '化学', group: 'retail', tier: 'B' },
  { code: '4503', name: 'アステラス製薬', sector: '医薬品', group: 'pharma', tier: 'B' },
  { code: '4506', name: '住友ファーマ', sector: '医薬品', group: 'pharma', tier: 'C' },
  { code: '4507', name: '塩野義製薬', sector: '医薬品', group: 'pharma', tier: 'C' },
  { code: '4523', name: 'エーザイ', sector: '医薬品', group: 'pharma', tier: 'B' },
  { code: '4578', name: '大塚ホールディングス', sector: '医薬品', group: 'pharma', tier: 'B' },
  { code: '5020', name: 'ENEOSホールディングス', sector: '石油', group: 'energy', tier: 'B' },
  { code: '5101', name: '横浜ゴム', sector: 'ゴム製品', group: 'materials', tier: 'C' },
  { code: '5108', name: 'ブリヂストン', sector: 'ゴム製品', group: 'auto', tier: 'B' },
  { code: '5201', name: 'AGC', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5214', name: '日本電気硝子', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5233', name: '太平洋セメント', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5301', name: '東海カーボン', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5332', name: 'TOTO', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5333', name: '日本ガイシ', sector: 'ガラス・土石製品', group: 'materials', tier: 'C' },
  { code: '5401', name: '日本製鉄', sector: '鉄鋼', group: 'materials', tier: 'B' },
  { code: '5406', name: '神戸製鋼所', sector: '鉄鋼', group: 'materials', tier: 'C' },
  { code: '5411', name: 'JFEホールディングス', sector: '鉄鋼', group: 'materials', tier: 'B' },
  { code: '5631', name: '日本製鋼所', sector: '金属製品', group: 'materials', tier: 'C' },
  { code: '5706', name: '三井金属鉱業', sector: '非鉄金属', group: 'materials', tier: 'C' },
  { code: '5711', name: '三菱マテリアル', sector: '非鉄金属', group: 'materials', tier: 'C' },
  { code: '5713', name: '住友金属鉱山', sector: '非鉄金属', group: 'materials', tier: 'B' },
  { code: '5714', name: 'DOWAホールディングス', sector: '非鉄金属', group: 'materials', tier: 'C' },
  { code: '5801', name: '古河電気工業', sector: '非鉄金属', group: 'materials', tier: 'C' },
  { code: '5802', name: '住友電気工業', sector: '非鉄金属', group: 'materials', tier: 'B' },
  { code: '5803', name: 'フジクラ', sector: '非鉄金属', group: 'materials', tier: 'B' },
  { code: '6103', name: 'オークマ', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6113', name: 'アマダ', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6273', name: 'SMC', sector: '機械', group: 'machinery', tier: 'B' },
  { code: '6301', name: '小松製作所(コマツ)', sector: '機械', group: 'machinery', tier: 'B' },
  { code: '6302', name: '住友重機械工業', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6305', name: '日立建機', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6326', name: 'クボタ', sector: '機械', group: 'machinery', tier: 'B' },
  { code: '6361', name: '荏原製作所', sector: '機械', group: 'machinery', tier: 'B' },
  { code: '6471', name: '日本精工(NSK)', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6472', name: 'NTN', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6473', name: 'ジェイテクト', sector: '機械', group: 'machinery', tier: 'C' },
  { code: '6503', name: '三菱電機', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6504', name: '富士電機', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6506', name: '安川電機', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6526', name: 'ソシオネクスト', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6594', name: 'ニデック', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6645', name: 'オムロン', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6701', name: 'NEC', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6702', name: '富士通', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6724', name: 'セイコーエプソン', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6753', name: 'シャープ', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6770', name: 'アルプスアルパイン', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6841', name: '横河電機', sector: '電気機器', group: 'electronics', tier: 'C' },
  { code: '6902', name: 'デンソー', sector: '電気機器', group: 'auto', tier: 'B' },
  { code: '6920', name: 'レーザーテック', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '6981', name: '村田製作所', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '285A', name: 'キオクシアホールディングス', sector: '電気機器', group: 'electronics', tier: 'B' },
  { code: '7201', name: '日産自動車', sector: '輸送用機器', group: 'auto', tier: 'B' },
  { code: '7202', name: 'いすゞ自動車', sector: '輸送用機器', group: 'auto', tier: 'C' },
  { code: '7211', name: '三菱自動車工業', sector: '輸送用機器', group: 'auto', tier: 'C' },
  { code: '7261', name: 'マツダ', sector: '輸送用機器', group: 'auto', tier: 'C' },
  { code: '7267', name: 'ホンダ(本田技研工業)', sector: '輸送用機器', group: 'auto', tier: 'A' },
  { code: '7270', name: 'SUBARU', sector: '輸送用機器', group: 'auto', tier: 'B' },
  { code: '7272', name: 'ヤマハ発動機', sector: '輸送用機器', group: 'auto', tier: 'C' },
  { code: '543A', name: 'ARCHION', sector: '輸送用機器', group: 'auto', tier: 'C' },
  { code: '7731', name: 'ニコン', sector: '精密機器', group: 'electronics', tier: 'C' },
  { code: '7751', name: 'キヤノン', sector: '精密機器', group: 'electronics', tier: 'B' },
  { code: '7752', name: 'リコー', sector: '精密機器', group: 'electronics', tier: 'C' },
  { code: '7832', name: 'バンダイナムコホールディングス', sector: 'その他製品', group: 'service', tier: 'B' },
  { code: '7911', name: 'TOPPANホールディングス', sector: 'その他製品', group: 'service', tier: 'C' },
  { code: '7912', name: '大日本印刷', sector: 'その他製品', group: 'service', tier: 'B' },
  { code: '7951', name: 'ヤマハ', sector: 'その他製品', group: 'service', tier: 'C' },
  { code: '9501', name: '東京電力ホールディングス', sector: '電気・ガス業', group: 'energy', tier: 'B' },
  { code: '9502', name: '中部電力', sector: '電気・ガス業', group: 'energy', tier: 'C' },
  { code: '9503', name: '関西電力', sector: '電気・ガス業', group: 'energy', tier: 'C' },
  { code: '9531', name: '東京ガス', sector: '電気・ガス業', group: 'energy', tier: 'C' },
  { code: '9532', name: '大阪ガス', sector: '電気・ガス業', group: 'energy', tier: 'C' },
  { code: '9001', name: '東武鉄道', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9005', name: '東急', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9007', name: '小田急電鉄', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9008', name: '京王電鉄', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9009', name: '京成電鉄', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9020', name: '東日本旅客鉄道(JR東日本)', sector: '陸運業', group: 'transport', tier: 'B' },
  { code: '9021', name: '西日本旅客鉄道(JR西日本)', sector: '陸運業', group: 'transport', tier: 'B' },
  { code: '9022', name: '東海旅客鉄道(JR東海)', sector: '陸運業', group: 'transport', tier: 'A' },
  { code: '9062', name: '日本通運', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9064', name: 'ヤマトホールディングス', sector: '陸運業', group: 'transport', tier: 'C' },
  { code: '9104', name: '商船三井', sector: '海運業', group: 'transport', tier: 'B' },
  { code: '9107', name: '川崎汽船', sector: '海運業', group: 'transport', tier: 'B' },
  { code: '9201', name: '日本航空(JAL)', sector: '空運業', group: 'transport', tier: 'C' },
  { code: '9202', name: 'ANAホールディングス', sector: '空運業', group: 'transport', tier: 'C' },
  { code: '9301', name: '三菱倉庫', sector: '倉庫・運輸関連業', group: 'transport', tier: 'C' },
  { code: '4324', name: '電通グループ', sector: '情報・通信業', group: 'telecom', tier: 'C' },
  { code: '4689', name: 'LINEヤフー', sector: '情報・通信業', group: 'telecom', tier: 'B' },
  { code: '4751', name: 'サイバーエージェント', sector: '情報・通信業', group: 'telecom', tier: 'C' },
  { code: '9434', name: 'ソフトバンク', sector: '情報・通信業', group: 'telecom', tier: 'B' },
  { code: '9613', name: 'NTTデータグループ', sector: '情報・通信業', group: 'telecom', tier: 'B' },
  { code: '2768', name: '双日', sector: '卸売業', group: 'trading', tier: 'C' },
  { code: '8002', name: '丸紅', sector: '卸売業', group: 'trading', tier: 'B' },
  { code: '8015', name: '豊田通商', sector: '卸売業', group: 'trading', tier: 'B' },
  { code: '8053', name: '住友商事', sector: '卸売業', group: 'trading', tier: 'B' },
  { code: '3086', name: 'J.フロント リテイリング', sector: '小売業', group: 'retail', tier: 'C' },
  { code: '3382', name: 'セブン&アイ・ホールディングス', sector: '小売業', group: 'retail', tier: 'B' },
  { code: '7532', name: 'パン・パシフィック・インターナショナルホールディングス', sector: '小売業', group: 'retail', tier: 'B' },
  { code: '8233', name: '高島屋', sector: '小売業', group: 'retail', tier: 'C' },
  { code: '8252', name: '丸井グループ', sector: '小売業', group: 'retail', tier: 'C' },
  { code: '8267', name: 'イオン', sector: '小売業', group: 'retail', tier: 'B' },
  { code: '9843', name: 'ニトリホールディングス', sector: '小売業', group: 'retail', tier: 'B' },
  { code: '8304', name: 'あおぞら銀行', sector: '銀行業', group: 'financial', tier: 'C' },
  { code: '8308', name: 'りそなホールディングス', sector: '銀行業', group: 'financial', tier: 'B' },
  { code: '8309', name: '三井住友トラスト・ホールディングス', sector: '銀行業', group: 'financial', tier: 'B' },
  { code: '8331', name: '千葉銀行', sector: '銀行業', group: 'financial', tier: 'C' },
  { code: '8354', name: 'ふくおかフィナンシャルグループ', sector: '銀行業', group: 'financial', tier: 'C' },
  { code: '8411', name: 'みずほフィナンシャルグループ', sector: '銀行業', group: 'financial', tier: 'A' },
  { code: '8601', name: '大和証券グループ本社', sector: '証券、商品先物取引業', group: 'financial', tier: 'B' },
  { code: '8604', name: '野村ホールディングス', sector: '証券、商品先物取引業', group: 'financial', tier: 'B' },
  { code: '8630', name: 'SOMPOホールディングス', sector: '保険業', group: 'financial', tier: 'B' },
  { code: '8725', name: 'MS&ADインシュアランスグループホールディングス', sector: '保険業', group: 'financial', tier: 'B' },
  { code: '8750', name: '第一生命ホールディングス', sector: '保険業', group: 'financial', tier: 'B' },
  { code: '8766', name: '東京海上ホールディングス', sector: '保険業', group: 'financial', tier: 'A' },
  { code: '8795', name: 'T&Dホールディングス', sector: '保険業', group: 'financial', tier: 'C' },
  { code: '8424', name: '芙蓉総合リース', sector: 'その他金融業', group: 'financial', tier: 'C' },
  { code: '8591', name: 'オリックス', sector: 'その他金融業', group: 'financial', tier: 'B' },
  { code: '8697', name: '日本取引所グループ(JPX)', sector: 'その他金融業', group: 'financial', tier: 'B' },
  { code: '8801', name: '三井不動産', sector: '不動産業', group: 'realestate', tier: 'B' },
  { code: '8802', name: '三菱地所', sector: '不動産業', group: 'realestate', tier: 'B' },
  { code: '8804', name: '東京建物', sector: '不動産業', group: 'realestate', tier: 'C' },
  { code: '8830', name: '住友不動産', sector: '不動産業', group: 'realestate', tier: 'B' },
  { code: '2413', name: 'エムスリー', sector: 'サービス業', group: 'service', tier: 'C' },
  { code: '4307', name: '野村総合研究所', sector: 'サービス業', group: 'service', tier: 'B' },
  { code: '4661', name: 'オリエンタルランド', sector: 'サービス業', group: 'service', tier: 'B' },
  { code: '4704', name: 'トレンドマイクロ', sector: 'サービス業', group: 'service', tier: 'C' },
  { code: '4768', name: '大塚商会', sector: 'サービス業', group: 'service', tier: 'C' },
  { code: '9602', name: '東宝', sector: 'サービス業', group: 'service', tier: 'C' },
  { code: '9735', name: 'セコム', sector: 'サービス業', group: 'service', tier: 'B' },
  { code: '9766', name: 'コナミグループ', sector: 'サービス業', group: 'service', tier: 'B' },
]

export const DETAILED_COUNT = STOCKS.filter((s) => s.detail).length
export const TOTAL_LISTED = STOCKS.length
