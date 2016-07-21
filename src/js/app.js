		//时间格式化函数
		var dateFormat = {
		    Y: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        Y = date.getFullYear() + '-';
		        return Y;
		    },
		    M: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        Y = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		        return M;
		    },
		    D: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        D = date.getDate() + ' ';
		        return D;
		    },
		    h: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        h = date.getHours() + ':';
		        return h;
		    },
		    m: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        m = date.getMinutes();
		        return m;
		    },
		    s: function(timeStamp) {
		        var date = new Date(timeStamp * 1000);
		        s = date.getSeconds();
		        return s;
		    },
		    h_m: function(timeStamp) {
		        return (this.h(timeStamp) + this.m(timeStamp));
		    }

		}

		var domainGraph = function() {
		    $.ajax({
		        url: 'http://127.0.0.1/index.php/api/domain',
		        type: 'GET',
		        async: true,
		        cache: false,
		        dataType: 'json',
		        success: function(data) {
		            // console.log(data[0].url);
		            // console.log(data[0].count);
		            var dataSource = [];
		            var info = [];
		            for (var i = 0; i < data.length; i++) {
		                info.push(data[i].url);
		                info.push(parseInt(data[i].count));
		            };
		            while (info.length) {
		                dataSource.push(info.splice(0, 2));
		            };
		            //时间格式化
		            var startTimestampHour = dateFormat.h(data[0].startTimestamp);
		            var endTimestampHour = dateFormat.h(data[0].endTimestamp);
		            var startTimestampMinutes = dateFormat.m(data[0].startTimestamp);
		            var endTimestampMinutes = dateFormat.m(data[0].endTimestamp);

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
		                text: 'Collect time: ' + startTimestampHour + startTimestampMinutes + ' - ' + endTimestampHour + endTimestampMinutes,
		                style: {
		                    color: '#6b717d',
		                    fontSize: '12px',
		                    fontWeight: '600',
		                    fontFamily: 'Avenir Next Condensed,Alegreya Sans'
		                }
		            };
		            //指定数据列
		            var data_series = {

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
		                }

		            };
		            //新建 Chart 对象
		            var chart = new Highcharts.Chart(domain_options);
		            //设置主标题
		            chart.setTitle(title);
		            //设置副标题
		            chart.setTitle(null, subtitle);
		            chart.addSeries(data_series);
		        },
		        error: function(e) {
		            alert("fail");
		        }
		    });
		};


		var trafficGraph = function() {
		    $.ajax({
		        url: 'http://127.0.0.1/index.php/api/traffic',
		        type: 'GET',
		        async: true,
		        cache: false,
		        dataType: 'json',
		        success: function(data) {
		            var timeStampArray = [];
		            var upload = data[0][1].wlan0[1].upload;
		            var download = data[0][1].wlan0[0].download;
		            for (var i = 0; i < data[0][1].wlan0[2].timeStamp.length; i++) {
		                //时间格式化 push 到时间戳数组
		                timeStampArray.push(dateFormat.h_m(data[0][1].wlan0[2].timeStamp[i]));
		            }
		            //Debug start
		            // 下载
		            console.log(data[0][1].wlan0[0].download);
		            // 上传
		            console.log(data[0][1].wlan0[1].upload);
		            // 时间戳
		            console.log(data[0][1].wlan0[2].timeStamp);
		            //时间戳数组
		            console.log(timeStampArray);
		            //初始化 Chart 对象
		            var chart = new Highcharts.Chart(traffic_options);
		            chart.xAxis[0].setCategories(timeStampArray.reverse());

		            if (chart.series.length === 0) {
		                chart.addSeries({
		                    name: 'Download',
		                    color: '#ff2d77',
		                    data: download.reverse()
		                });
		                chart.addSeries({
		                    name: 'Upload',
		                    data: upload.reverse()
		                });
		            }
		        },
		        error: function(e) {
		            alert("fail");
		        }
		    });
		};



		//domain 图表展示容器，与div的id保持一致
		var domain_options = {
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
		    series: []
		};


		var traffic_options = {
		    chart: {
		        type: 'areaspline',
		        renderTo: "traffic-container",
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
		        text: 'interface:' + ' ' + 'p2p1',
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
		        categories: [],
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
		    series: []
		};

		$(document).ready(function() {
		    domainGraph();
		    trafficGraph();
		    // setInterval("domainGraph();", 5000);
				// setInterval("trafficGraph();", 5000);
		});
