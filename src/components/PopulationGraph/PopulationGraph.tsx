import React from 'react';
import { PopulationData } from '../../Pages/PrefPopulationChart';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export type Props = {
  prefList: PopulationData[];
};

export const PopulationGraphContainer: React.FC<Props> = ({ prefList }) => {
  //グラフのseriesのデータに変換
  const convertData = (prefList: PopulationData[]) => {
    const seriesData = prefList.map((pref) => {
      return {
        name: pref.prefName,
        data: pref.valueData,
      };
    });
    return seriesData;
  };

  const options = {
    accessibility: {
      enabled: false,
    },
    title: {
      text: '都道府県別人口構成グラフ',
      margin: 40,
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

    series: convertData(prefList),
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
