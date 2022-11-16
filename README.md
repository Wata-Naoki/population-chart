# population-chart

## ローカル環境

画面起動
```bash
npm start
```

## 環境変数の設定

環境変数準備
```bash
cp .env.example .env
```

```bash
REACT_APP_API_KEY=
```


## テスト（playwrightというライブラリを使用）

テストコマンドを実行

```bash
npx playwright test
```

テスト結果をブラウザに表示

```bash
npx playwright show-report 
```


テスト結果(全てPASS)
<img width="1550" alt="スクリーンショット 2022-11-03 18 54 03" src="https://user-images.githubusercontent.com/103019604/199696907-d28f8ced-2f0b-4ce0-af9b-f8f807ffe3da.png">


## デプロイURL

https://yumemi-frontend-population-chart.vercel.app/
