import { test, expect } from '@playwright/test';

test('初期表示のテスト', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('都道府県別の総人口推移')).toBeVisible();
  await expect(page.getByText('都道府県').nth(1)).toBeVisible();
  await expect(page.getByText('都道府県別人口構成グラフ')).toBeVisible();
  //47都道府県が表示されているかチェック
  await expect(
    page.getByText(
      '北海道青森県岩手県宮城県秋田県山形県福島県茨城県栃木県群馬県埼玉県千葉県東京都神奈川県新潟県富山県石川県福井県山梨県長野県岐阜県静岡県愛知県三重県滋賀県京都府大阪府兵庫県奈良県和歌山県鳥取県島根県岡山県広島県山口県徳島県香川県愛媛県高知県福岡県佐賀県長崎県熊本県大分県宮崎県鹿児島県沖縄県'
    )
  ).toBeVisible();
});

test('チェックボックスをcheckした際にグラフに反映されているかテスト', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  //北海道のチェックボックスをcheck
  await page.locator('.focus\\:outline-none').first().check();
  await expect(page.getByText('北海道')).toBeVisible();
  //北海道のグラフが表示されているかチェック
  await expect(page.locator('.highcharts-tracker-line')).toBeVisible();
  //グラフ右側に北海道の名前が表示されているかチェック（北海道のグラフが表示されていることを確認するため）
  await expect(page.getByText('北海道').nth(1)).toBeVisible();
});

test('チェックボックスを複数チェックした際にグラフに反映されているかテスト', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  //北海道のチェックボックスをcheck
  await page.locator('.focus\\:outline-none').first().check();
  await expect(page.getByText('北海道')).toBeVisible();
  //北海道のグラフが表示されているかチェック
  await expect(page.locator('.highcharts-tracker-line')).toBeVisible();
  //グラフ右側に北海道の名前が表示されているかチェック（北海道のグラフが表示されていることを確認するため）
  await expect(page.getByText('北海道').nth(1)).toBeVisible();

  //青森県のチェックボックスをcheckし、グラフに反映されているかチェック
  await page.locator('div:nth-child(2) > .focus\\:outline-none').check();
  await expect(page.locator('g:nth-child(3) > .highcharts-tracker-line')).toBeVisible();
  await expect(page.locator('text:has-text("青森県")')).toBeVisible();
});

test('チェックボックスをuncheckした際にラインチャートが消えているかのテスト', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  //北海道のチェックボックスをcheck
  await page.locator('.focus\\:outline-none').first().check();
  //青森県のチェックボックスをcheckし、グラフに反映されているかチェック
  await page.locator('div:nth-child(2) > .focus\\:outline-none').check();
  await expect(page.locator('g:nth-child(3) > .highcharts-tracker-line')).toBeVisible();
  await expect(page.locator('text:has-text("青森県")')).toBeVisible();

  //青森県のチェックボックスをuncheckし、青森県のラインチャートが消えているか確認
  await page.locator('div:nth-child(2) > .focus\\:outline-none').uncheck();
  await expect(page.locator('g:nth-child(3) > .highcharts-tracker-line')).not.toBeVisible();
});
