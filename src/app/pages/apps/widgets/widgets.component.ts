import { Component, OnInit } from '@angular/core';

import { circle, latLng, tileLayer } from 'leaflet';

import { TitleBox1Model, TitleBox2Model, TitleBox3Model, TitleBox4Model, otherWidgetsModel, widgetsActivitiesModel, widgetsTasksModel } from './widgets.model';
import { tileBoxs1, tileBoxs2, tileBoxs3, tileBoxs4, otherWidgets, widgetsActivities, widgetsTasks, basicBarChart } from './data';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})

/**
 * Widgets Component
 */
export class WidgetsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  tileBoxs1!: TitleBox1Model[];
  tileBoxs2!: TitleBox2Model[];
  tileBoxs3!: TitleBox3Model[];
  tileBoxs4!: TitleBox4Model[];
  otherWidgets!: otherWidgetsModel[];
  widgetsActivities!: widgetsActivitiesModel[];
  widgetsTasks!: widgetsTasksModel[];
  basicBarChart: any;
  basicColumnChart: any;
  simpleDonutChart: any;
  basicHeatmapChart: any;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Velzon' },
      { label: 'Widgets', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();

    // Chart Color Data Get Function
    this._basicBarChart('["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]');
    this._basicColumnChart('["--vz-success", "--vz-gray-300"]');
    this._simpleDonutChart('["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]');
    this._basicHeatmapChart('["--vz-info", "--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]');
  }

      // Chart Colors Set
      private getChartColorsArray(colors:any) {
        colors = JSON.parse(colors);
        return colors.map(function (value:any) {
          var newValue = value.replace(" ", "");
          if (newValue.indexOf(",") === -1) {
            var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                if (color) {
                color = color.replace(" ", "");
                return color;
                }
                else return newValue;;
            } else {
                var val = value.split(',');
                if (val.length == 2) {
                    var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                    rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                    return rgbaColor;
                } else {
                    return newValue;
                }
            }
        });
      }
    
      /**
     * Series Data
     */
     private generateData(count: number, yrange: { max: number; min: number; }) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = "w" + (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    
        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    }
    
      /**
     * Basic Bar Chart
     */
      private _basicBarChart(colors:any) {
        colors = this.getChartColorsArray(colors);
        this.basicBarChart = {
          series: [{
              data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
              name: 'Sessions',
          }],
          chart: {
              type: 'bar',
              height: 436,
              toolbar: {
                  show: false,
              }
          },
          plotOptions: {
              bar: {
                  borderRadius: 4,
                  horizontal: true,
                  distributed: true,
                  dataLabels: {
                      position: 'top',
                  },
              }
          },
          dataLabels: {
              enabled: true,
              offsetX: 32,
              style: {
                  fontSize: '12px',
                  fontWeight: 400,
                  colors: ['#adb5bd']
              }
          },
          colors: colors,
          legend: {
              show: false,
          },
          grid: {
              show: false,
          },
          xaxis: {
              categories: ['India', 'United States', 'China', 'Indonesia', 'Russia', 'Bangladesh', 'Canada', 'Brazil', 'Vietnam', 'UK'],
          },
        };
      }
    
      /**
     * Basic Column Charts
     */
      private _basicColumnChart(colors:any) {
        colors = this.getChartColorsArray(colors);
        this.basicColumnChart = {
          series: [{
            name: 'Last Year',
            data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2]
          }, {
              name: 'Current Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }],
          chart: {
            type: 'bar',
            height: 306,
            stacked: true,
            toolbar: {
                show: false,
            }
          },
          plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                borderRadius: 6,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontWeight: 400,
            fontSize: '8px',
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 9,
                height: 9,
                radius: 4,
            },
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          grid: {
            show: false,
          },
          colors: colors,
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: true,
                offsetX: 0,
                offsetY: 0
            },
          },
          yaxis: {
            show: false
          },
          fill: {
              opacity: 1
          }
        };
      }
    
      /**
     * Simple Donut Chart
     */
      private _simpleDonutChart(colors:any) {
        colors = this.getChartColorsArray(colors);
        this.simpleDonutChart = {
          series: [19405, 40552, 15824, 30635],
          labels: ["Bitcoin", "Ethereum", "Litecoin", "Dash"],
          chart: {
            type: "donut",
            height: 210,
          },
          plotOptions: {
            pie: {
    
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '18px',
                            offsetY: -5,
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            color: '#343a40',
                            fontWeight: 500,
                            offsetY: 5,
                            formatter: function (val:any) {
                                return "$" + val
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '13px',
                            label: 'Total value',
                            color: '#9599ad',
                            fontWeight: 500,
                        }
                    }
                },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          yaxis: {
            labels: {
                formatter: function (value:any) {
                    return "$" + value ;
                }
            }
          },
          stroke: {
              lineCap: "round",
              width: 2
          },
          colors: colors
        };
      }
    
      /**
     * Basic Heatmap Chart
     */
      private _basicHeatmapChart(colors:any) {
        colors = this.getChartColorsArray(colors);
        this.basicHeatmapChart = {
          series: [{
            name: 'Jan',
            data: this.generateData(20, {
                min: -30,
                max: 55
            })
            },
            {
                name: 'Feb',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Mar',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Apr',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'May',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Jun',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Jul',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Aug',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            },
            {
                name: 'Sep',
                data: this.generateData(20, {
                    min: -30,
                    max: 55
                })
            }
          ],
          chart: {
            height: 310,
            type: 'heatmap',
            toolbar: {
                show: false
            }
          },
          legend: {
            show: false,
          },
          plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [{
                            from: -30,
                            to: 5,
                            name: 'Youtube',
                            color: colors[0]
                        },
                        {
                            from: 6,
                            to: 20,
                            name: 'Meta',
                            color: colors[1]
                        },
                        {
                            from: 21,
                            to: 45,
                            name: 'Google',
                            color: colors[2]
                        },
                        {
                            from: 46,
                            to: 55,
                            name: 'Medium',
                            color: colors[3]
                        },
                        {
                            from: 36,
                            to: 40,
                            name: 'Other',
                            color: colors[4]
                        }
                    ]
                }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
              width: 1
          },
          title: {
              style: {
                  fontWeight: 500,
              },
          },
        };
      }

  // Chat Data Fetch
  private _fetchData() {
    this.tileBoxs1 = tileBoxs1;
    this.tileBoxs2 = tileBoxs2;
    this.tileBoxs3 = tileBoxs3;
    this.tileBoxs4 = tileBoxs4;
    this.otherWidgets = otherWidgets;
    this.widgetsActivities = widgetsActivities;
    this.widgetsTasks = widgetsTasks;
    this.basicBarChart = basicBarChart;

  }

  /**
   * Sale Location Map
   */
   options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];

}
