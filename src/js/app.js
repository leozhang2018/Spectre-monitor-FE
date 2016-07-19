		var dataSource = [];
		var info = [];
		var drawGraph = function() {
		    $.ajax({
		        url: 'http://127.0.0.1/index.php/api/meta_json',
		        type: 'GET',
		        async: true,
		        cache: false,
		        dataType: 'json',
		        success: function(data) {
		            // console.log(data[0].url);
		            // console.log(data[0].count);
		            for (var i = 0; i < data.length; i++) {
		                info.push(data[i].url);
		                info.push(parseInt(data[i].count));
		            };
		            while (info.length) {
		                dataSource.push(info.splice(0, 2));
		            };
		            //时间格式化
		            var startTimestampHour = new Date(data[0].startTimestamp * 1000).getHours();
		            var endTimestampHour = new Date(data[0].endTimestamp * 1000).getHours();
		            var startTimestampMinutes = new Date(data[0].startTimestamp * 1000).getMinutes();
		            var endTimestampMinutes = new Date(data[0].endTimestamp * 1000).getMinutes();

		            var title = {
		                text: 'TOP 10 domains in the past 1 hour', //指定图表标题
		                style: {
		                    color: '#6b717d',
		                    fontSize: '17px',
		                    fontFamily: 'Avenir Next Condensed,Alegreya Sans',
		                }
		            };
		            //副标题
		            var subtitle = {
		                text: 'Collect time: ' + startTimestampHour + ':' + startTimestampMinutes + ' - ' + endTimestampHour + ':' + endTimestampMinutes,
		                style: {
		                    color: '#6b717d',
		                    fontSize: '12px',
												fontWeight: '600',
		                    fontFamily: 'Avenir Next Condensed,Alegreya Sans'
		                }
		            };
		            //新建 Chart 对象
		            var chart = new Highcharts.Chart(options);
		            //设置主标题
		            chart.setTitle(title);
		            //设置副标题
		            chart.setTitle(null, subtitle);
		            //全局 dataSource 置空
		            dataSource = [];
		            info = [];
		        },
		        error: function(e) {
		            alert("fail");
		        }
		    });
		};
		//图表展示容器，与div的id保持一致
		var options = {
		    chart: {
		        type: 'column', //指定图表的类型，默认是折线图（line）
		        renderTo: "domains-container",
		        //背景颜色
		        backgroundColor: '#222632',
		        // marginBottom:'10px',
		    },
		    credits: {
		        enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
		        text: 'Spectre', // 显示的文字
		        href: 'http://192.168.2.1', // 链接地址
		        style: { // 样式设置
		            cursor: 'pointer',
		            fontSize: '10px'
		        }
		    },
		    title: {
		        text: 'TOP 10 domains in the past 1 hour', //指定图表标题
		        style: {
		            color: (217, 227, 239, .4),
		            fontSize: '18px',
		        }
		    },
		    colors: ['#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77', '#ff2d77'],
		    xAxis: { //指定x轴分组
		        //x轴颜色
		        lineColor: 'rgba(217,227,239,.4)',
		        type: 'category',
		        // gridLineColor: '#3d4653',
		        tickWidth: 0,
		        labels: {
		            enabled: false, //关闭x 轴标记
		            rotation: -45,
		            style: {
		                fontSize: '10px',
		                fontFamily: 'Avenir Next Condensed,Alegreya Sans'
		            }
		        },

		    },
		    yAxis: { //指定y轴的标题
		        //隐藏网格线
		        gridLineWidth: 0,
		        gridLineColor: '#3d4653',
		        min: 0,
		        title: {
		            text: 'Hit Counts',
		            style: { // 文字内容相关样式
		                color: "#606060",
		                fontSize: "10px"
		            }
		        }
		    },
		    //http://api.highcharts.com/highcharts#plotOptions.bar.borderWidth
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            states: {
		                // http://api.highcharts.com/highcharts#plotOptions.column.states.hover
		                hover: {
		                    // brightness: -0.3, // darken
		                    color: 'rgb(119, 136, 153)'
		                }
		            }
		        }
		    },
		    legend: {
		        enabled: false
		            //图例。用不同形状、颜色、文字等 标示不同数据列，通过点击标示可以显示或隐藏该数据列。
		    },
		    tooltip: {
		        pointFormat: '访问情况: </b><span style="color:#ff2d77;">{point.y}</span> 次',
		        borderWidth: 1,
		        borderRadius: 10,
		        shadow: true,
		        style: { // 文字内容相关样式
		            color: "#000",
		            fontSize: "13px",
		            fontWeight: '500'
		        }
		    },
		    series: [{ //指定数据列
		        name: '访问情况', //数据列名
		        colorByPoint: true, //或者直接写在这里:http://www.hcharts.cn/docs/index.php?doc=basic-color
		        data: dataSource,
		        dataLabels: {
		            enabled: true,
		            rotation: 0,
		            color: '#789',
		            align: 'center',
		            format: '{point.y}', // one decimal
		            y: 1, // 10 pixels down from the top
		            style: {
		                fontSize: '16px',
		                fontWeight: '500',
		                fontFamily: 'Avenir Next Condensed,Alegreya Sans',
		            }
		        },
		    }]
		};

		$(document).ready(function() {
		    drawGraph();
		    setInterval("drawGraph();", 600000);
		});


		$(function() {
		    $('#traffic-container').highcharts({
		        chart: {
		            type: 'areaspline',
		            backgroundColor: '#222632'
		        },
		        title: {
		            // text: null
		            text: "Traffic of network",
		            style: {
		                fontSize: '18px',
		                // fontWeight: '500',
		                fontFamily: 'Avenir Next Condensed,Alegreya Sans',
		                color: '#6b717d'
		            }
		        },
						subtitle: {
												text: 'interface:' + ' '+'p2p1',
												style: {
														color: '#6b717d',
														fontSize: '12px',
														fontWeight: '600',
														fontFamily: 'Avenir Next Condensed,Alegreya Sans'
												}
										},
		        legend: {
		            enabled: false
		                // layout: 'vertical',
		                // align: 'left',
		                // verticalAlign: 'top',
		                // x: 150,
		                // y: 100,
		                // floating: true,
		                // borderWidth: 1,
		                // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        xAxis: {
		            //刻度宽度
		            tickWidth: 0,
		            //x轴颜色
		            lineColor: 'rgba(217,227,239,.4)',
		            categories: [
		                '9:00',
		                '10:00',
		                '11:00',
		                '12:00',
		                '13:00',
		                '14:00',
		                '15:00'
		            ],
		            // plotBands: [{ // visualize the weekend
		            //     from: 4.5,
		            //     to: 6.5,
		            //     color: 'rgba(68, 170, 213, .2)'
		            // }],

		            labels: {
		                style: {
		                    fontSize: '10px',
		                    fontFamily: 'Avenir Next Condensed,Alegreya Sans'
		                }
		            }

		        },
		        yAxis: {
		            title: {
		                enabled: false
		            },
		            gridLineWidth: 0
		        },
		        tooltip: {
		            shared: true,
		            valueSuffix: ' MB'
		        },
		        credits: {
		            enabled: false
		        },
		        plotOptions: {
		            areaspline: {
		                fillOpacity: 0.5
		            }
		        },
		        series: [{
		            name: 'Download',
		            color: '#ff2d77',
		            data: [300, 400, 500, 600, 800, 1000]
		        }, {
		            name: 'Upload',
		            data: [200, 350, 400, 358, 354, 500]
		        }]
		    });
		});
