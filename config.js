// 加工畑不良一覧表アプリ 設定ファイル
// ※ 更新のときはこのファイルを GitHub にアップしないでください（URL とパスワードが消えます）
window.APP_CONFIG = {
  // 手順2で出た「ウェブアプリのURL」を "" の中に貼る
  syncUrl: "https://script.google.com/macros/s/AKfycbxZx3umw_pGXBM_eJQuOcHnXYQZCMr1Y00q2yKKfvTgHj3cUWKbfIVNgGoo1-UIX0BnrQ/exec",

  // 合言葉（Code と同じ。書き換えない）
  token: "kkb-7Q2m-shine",

  // 管理者パスワード（削除・マスター更新・判定のやり直しに使う）。好きな数字に変えてください
  adminPin: "9001",

  // 入力者（選ぶだけ）
  users: ["谷川", "夏目", "土橋"],

  // 記録確認（監督者）の名前
  supervisors: ["係長", "課長"],

  // 月度の始まりの日（21 → 8/21〜9/20 が「9月度」）。暦どおりの月にするなら 1
  monthStartDay: 21
};
