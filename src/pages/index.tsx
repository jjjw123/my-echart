import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { useEffect } from 'react';
import mapJson from '@/assets/SC.json';
import styles from './index.less';

function HomePage() {
  const geoCoordMap = [
    { name: '成都', value: [104.065735, 30.659462], data1: '200TB' },
    { name: '德阳', value: [104.398651, 31.127991], data1: '20TB' },
    { name: '绵阳', value: [104.741722, 31.46402], data1: '300TB' },
  ];

  useEffect(() => {
    createChart()
  }, []);

  function createChart() {
    const width = window.document.getElementById('main')?.clientWidth;
    const height = window.document.getElementById('main')?.clientHeight;
    // @ts-ignore
    echarts.registerMap('scMap', mapJson);
    // @ts-ignore
    const myCharts = echarts.init(document.getElementById('main'), undefined, {
      devicePixelRatio: window.devicePixelRatio,
      width,
      height: 600,
    });
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        show: true,
        confine: true,
        backgroundColor: 'rgba(51, 51, 51, 0.8)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: function (params: any) {
          return (
            `<div style={{display: 'flex', alignItems: 'center'}}>
              <div>
                ${params.data.name}
              </div>
              <div>
                <div>数据项：${params.data.data1}</div>
                <div>数据体量：${params.data.data1}</div>
              </div>
            </div>`
          )
        }
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          showEffectOn: "render",
          data: geoCoordMap,
          rippleEffect: {
            brushType: "stroke",
            scale: 5,
            period: 2, // 秒数
          },
          symbolSize: 12,
          zlevel: 1,
          label: {
            formatter: "{b}",
            position: "right",
            show: true,
            color: '#0f5d9d'
          },
        }
      ],
      geo: [
        {
          map: 'scMap',
          z: 3,
          aspectScale: 0.85,
          selectedMode: "single",// 开启单选
          label: {
            show: false,
          },
          roam: false,
          itemStyle: {
            areaColor: "#03365b",
            borderColor: "#4bf3f9",
            // shadowBlur: 3,
            shadowColor: '#4bf3f9', //阴影颜色
            // shadowOffsetX: 0, //阴影偏移量
            // shadowOffsetY: 10, //阴影偏移量
          },
          emphasis: {
            label: {
              show: true,
              color: '#ffffff',
            },
            itemStyle: {
              areaColor: "#0f5d9d",
            }
          }
        },
        {
          map: 'scMap',
          z: 2,
          aspectScale: 0.85,
          selectedMode: "single",// 开启单选
          label: {
            show: false,
          },
          roam: false,
          itemStyle: {
            borderColor: '#d8feff',
            borderWidth: 3,
            // shadowBlur: 10,
            shadowColor: '#22a1ff',
            areaColor: '#0862db',
            shadowOffsetX: -5,
            shadowOffsetY: 8
          },
          emphasis: {
            disabled: true
          }
        },
        {
          map: 'scMap',
          z: 1,
          aspectScale: 0.85,
          selectedMode: "single",// 开启单选
          label: {
            show: false,
          },
          roam: false,
          itemStyle: {
            borderColor: '#c8feff',
            borderWidth: 1,
            // shadowBlur: 0,
            shadowColor: '#99c4ff',
            areaColor: '#4ebaff',
          },
          emphasis: {
            disabled: true
          }
        },
        {
          map: 'scMap',
          z: 0,
          aspectScale: 0.85,
          selectedMode: "single",// 开启单选
          label: {
            show: false,
          },
          roam: false,
          itemStyle: {
            borderColor: '#66edff',
            borderWidth: 2,
            // shadowBlur: 20,
            shadowColor: '#4d99ff',
            areaColor: '#1752ad',
            shadowOffsetX: -5,
            shadowOffsetY: 8
          },
          emphasis: {
            disabled: true
          }
        }
      ],
    };
    myCharts.setOption(option)
  }

  return (
    <div className={styles.container}>
      <div id="main" />
    </div>
  );
}

export default HomePage;

