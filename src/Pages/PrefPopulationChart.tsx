/* eslint-disable @typescript-eslint/no-misused-promises */
import { Layout } from '../components/ui/Layout/Layout';
import { PopulationGraphContainer } from '../components/PopulationGraph/PopulationGraph';
import { SectionTitle } from '../components/ui/Text/SectionTitle';
import { Title } from '../components/ui/Text/Title';
import { Loading } from '../components/Loading/Loading';
import { useHandleSelectedData } from '../hooks/useHandleSelectedData';
import { Prefectures } from '../components/Prefectures/Prefectures';
import { SectionLayout } from '../components/ui/Layout/SectionLayout';

export const PrefPopulationChart = () => {
  //チェックボックスを選択した際のロジック処理
  const { prefData, isLoading, prefList, handleChange } = useHandleSelectedData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Title>都道府県別の総人口推移</Title>

      <SectionLayout>
        <SectionTitle>都道府県</SectionTitle>
        <Prefectures handleChange={handleChange} prefData={prefData} prefList={prefList} />
      </SectionLayout>

      <SectionLayout variant='sub'>
        <SectionTitle variant='sub'>都道府県別人口構成グラフ</SectionTitle>
        <PopulationGraphContainer prefList={prefList} />
      </SectionLayout>
    </Layout>
  );
};
