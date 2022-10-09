import { ChartOptions } from './sellers.model';

/**
 * BitCoin Chart
 */
 const BitcoinChart: ChartOptions = {
  series: [{
    data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#f06548"]
};

/**
 * Micro Chart
 */
 const MicroChart: ChartOptions = {
  series: [{
    data: [12, 14, 2, 47, 42, 15, 35, 75, 20, 67, 89],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#0AB39C"]
};

/**
 * Nesta Chart
 */
 const NestaChart: ChartOptions = {
  series: [{
    data: [45, 20, 8, 42, 30, 5, 35, 79, 22, 54, 64],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#F7B84B"]
};

/**
 * iTest Chart
 */
 const iTestChart: ChartOptions = {
  series: [{
    data: [26, 15, 48, 12, 47, 19, 35, 19, 85, 68, 50],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#0AB39C"]
};

/**
 * Meta Chart
 */
 const MetaChart: ChartOptions = {
  series: [{
    data: [60, 67, 12, 49, 6, 78, 63, 51, 33, 8, 16],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#F7B84B"]
};

/**
 * Digitech Chart
 */
 const DigitechChart: ChartOptions = {
  series: [{
    data: [78, 63, 51, 33, 8, 16, 60, 67, 12, 49],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#0AB39C"]
};

/**
 * Syntyce Chart
 */
 const SyntyceChart: ChartOptions = {
  series: [{
    data: [15, 35, 75, 20, 67, 8, 42, 30, 5, 35],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#F06548"]
};

/**
 * Zoetic Chart
 */
 const ZoeticChart: ChartOptions = {
  series: [{
    data: [45, 32, 68, 55, 36, 10, 48, 25, 74, 54],
  }, ],
  chart: {
    type: "area",
    height: 50,
    sparkline: {
        enabled: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  tooltip: {
    fixed: {
        enabled: false,
    },
    x: {
        show: false,
    },
    y: {
        title: {
            formatter: function (seriesName) {
                return "";
            },
        },
    },
    marker: {
        show: false,
    },
  },
  colors: ["#F7B84B"]
};

export { BitcoinChart, MicroChart, NestaChart, iTestChart, MetaChart, DigitechChart, SyntyceChart, ZoeticChart };
