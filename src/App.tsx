import React from 'react';
import { usePopulationDataQuery } from './components/Hooks/usePopulationDataQuery';
import { usePrefDataQuery } from './components/Hooks/usePrefDataQuery';
import { Layout } from './components/Layout/Layout';
import { SectionTitle } from './components/Text/SectionTitle';
import { Title } from './components/Text/Title';

function App() {
  const { prefData } = usePrefDataQuery();
  const { populationData } = usePopulationDataQuery();
  return (
    <>
      <Layout>
        <Title>都道府県別の総人口推移</Title>

        <div className='border m-6 p-4 rounded-md shadow'>
          <SectionTitle>都道府県</SectionTitle>
          <div className='w-full flex  flex-wrap p-8 gap-3'>
            {prefData?.result.map((pref) => {
              return (
                <div key={pref.prefCode} className='flex gap-1'>
                  <input type='checkbox' />
                  <p>{pref.prefName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
