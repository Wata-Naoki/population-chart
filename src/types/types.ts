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
//グラフを表示するコンポーネントのPropsの型定義
export type PopulationGraphProps = {
  prefList: PopulationData[];
};
//等道府県のチェックボックスのPropsの型定義
export type PrefProps = {
  prefData:
    | {
        message: null;
        result: { prefCode: string; prefName: string }[];
      }
    | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefList: PopulationData[];
};
//スタイルの型定義
export type StyleProps = {
  children: React.ReactNode;
};
//SectionTitleのPropsの型定義
export type SectionTitleProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'sub';
};
//SectionLayoutのPropsの型定義
export type SectionLayoutProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'sub';
};

export type PrefData = {
  message: null;
  result: {
    prefCode: string;
    prefName: string;
  }[];
};
