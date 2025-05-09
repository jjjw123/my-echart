import type { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './index.less';
import mapJson from '@/assets/SC.json';

export type Chart = ECharts;

function HomePage() {
  const divRef = useRef < any > (null);
  const chartRef = useRef < Chart > (null);

  const geoCoordMap = [
    {
      num: 20,
      name: '成都'
    }
  ]
  const option: EChartsOption = {
    series: [
      {
        name: '',
        type: 'scatter',
        symbol: "image://./img/titleBg.png",
        coordinateSystem: 'geo',
        color: ['#000'],
        symbolSize: [178, 50],
        symbolOffset: [0, "-50%"],
        label: {
          show: true,
          padding: [0, 0, 0, 0],
          formatter: function (param) {
            return "{a | " + '' + "}" + " " + "{b | " + '' + "}";
          },
          rich: {
            a: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              width: 89,
              align: "center",
              padding: [0, 0, 0, 10]
            },
            b: {
              fontSize: 20,
              color: "#819FD",
              fontFamily: "PangMenZhengDao",
              fontWeight: "bold",
              width: 89,
              align: "center",
              padding: [0, 0, 0, -30]
            }
          }
        },
        data: geoCoordMap,
      }, {
        name: '',
        type: 'scatter',
        symbol: "image://./img/light.png",
        coordinateSystem: 'geo',
        symbolSize: [54, 47],
        symbolOffset: [0, 10],
        color: ['#000'],
        tooltip: {
          position: "right",
          color: "#000",
          formatter(d) {
            // console.log(d)
            return `<div style="padding: 5px 10px;">【${d.data.name}】</div>`;
          },
        },
        label: {
          show: false
        },

        data: geoCoordMap,
      }

    ],
    geo: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      show: true,
      map: 'scMap',
      type: 'map',
      // mapType: "",
      roam: false,
      zoom: 0.8,
      label: {
        show: false
      },
      itemStyle: {
        areaColor: {
          // image: createImg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          repeat: 'no-repeat'
        },
      },
      emphasis: {
        disabled: false,
        itemStyle: {
          areaColor: {
            // image: createImg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
            repeat: 'no-repeat'
          },
        },
        label: {
          show: false
        }
      }
    }
  };

  useEffect(() => {
    const chart = createChart();
    function resizeChart() {
      if (chart) {
        chart.resize();
        // @ts-ignore
        echarts.registerMap('scMap', mapJson)
        chart.setOption(option);
      }
    }
    console.log(echarts, 'echarts')
    window.addEventListener('resize', resizeChart);
    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  function createChart() {
    if ((!chartRef || !chartRef.current) && echarts) {
      const width = window.document.getElementById('main')?.clientWidth;
      const height = window.document.getElementById('main')?.clientHeight;
      console.log(width, height)
      // @ts-ignore
      chartRef.current = echarts.init(divRef.current, undefined, {
        devicePixelRatio: window.devicePixelRatio,
        width,
        height,
      });
    }
    return chartRef.current;
  }

  return <div id="main" ref={divRef} className={styles.container} />;
}

export default HomePage;

