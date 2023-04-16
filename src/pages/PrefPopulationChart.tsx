import { Title } from '../components/ui/Text/Title';
import { SectionTitle } from '../components/ui/Text/SectionTitle';
import { useHandleSelectedData } from '../hooks/useHandleSelectedData';
import { SectionLayout } from '../components/ui/Layout/SectionLayout';
import { Layout } from '../components/ui/Layout/Layout';
import { Prefectures } from '../components/prefectures/Prefectures';
import { PopulationGraphContainer } from '../components/populationGraph/PopulationGraph';
import { Loading } from '../components/loading/Loading';

export const PrefPopulationChart = () => {
  //チェックボックスを選択した際のロジック処理
  const { prefData, isLoading, prefList, handleChange, isFetching } = useHandleSelectedData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Title>都道府県別の総人口推移</Title>

      <SectionLayout>
        <SectionTitle>都道府県</SectionTitle>
        <Prefectures handleChange={handleChange} prefData={prefData} prefList={prefList} isFetching={isFetching} />
      </SectionLayout>

      <SectionLayout variant='sub'>
        <SectionTitle variant='sub'>都道府県別人口構成グラフ</SectionTitle>
        <PopulationGraphContainer prefList={prefList} />
      </SectionLayout>
    </Layout>
  );
};
