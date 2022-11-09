import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationGraphProps } from '../../types/types';
import { convertToSeriesData } from '../../helpers/convertToSeriesData';
//各都道府県の人口構成データをグラフに表示するコンポーネント
export const PopulationGraphContainer: React.FC<PopulationGraphProps> = ({ prefList }) => {
  const options = {
    accessibility: {
      enabled: false,
    },
    title: {
      text: '',
      margin: 0,
    },

    yAxis: {
      title: {
        align: 'high',
        rotation: '0',
        text: '人口数',
        textAlign: 'high',
        y: -20,
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 1960 to 2045',
      },
      title: {
        text: '年度',
        textAlign: 'high',
        align: 'high',
        x: 20,
        y: -20,
      },
      categories: prefList[0]?.yearData,
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      y: -80,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: true,
        },
      },
    },

    series: convertToSeriesData(prefList),
  };
  return (
    <div className='w-screen 2xl:max-w-screen-2xl'>
      {prefList[0]?.prefCode && <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};
