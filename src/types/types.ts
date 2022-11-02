// 選択した県の番号と名前を格納する型
export type SelectedPref = {
  prefCode: string | undefined;
  prefName: string | undefined;
};
//人口構成(PopulationData）の型定義
export type PopulationData = {
  prefCode: string | undefined;
  prefName: string | undefined;
  yearData: number[] | undefined;
  valueData: number[] | undefined;
};
