// 监控模块
(function () {
    // 监控模块
    // 获取点击的tab  choseTab
    var choseTab = document.getElementsByClassName('choseTab');
    // 获取下面对应的显示内容  showTab

    var showTab = document.getElementsByClassName('showTab');

    for (var i = 0; i < choseTab.length; i++) {
        choseTab[i].setAttribute('index', i);

        choseTab[i].onclick = function () {
            var index_ = this.getAttribute('index');

            for (var j = 0; j < choseTab.length; j++) {
                choseTab[j].classList.remove('active');
                choseTab[index_].classList.add('active');
            }

            for (var k = 0; k < showTab.length; k++) {
                showTab[k].style.display = 'none';
                showTab[index_].style.display = 'block';
            }
        }
    }

})();


// 自执行函数的好处：在其他的地方就可以使用相同的类名 而不会产生冲突可以控制变量的作用域





// 点位分布模块
(function () {
    var myChart = echarts.init(document.querySelector('.pie'));
    var option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            // item 表述 鼠标到饼图的每一项内容的时候 触发提示信息
            trigger: 'item',
            // a:series 选项下面的name
            // b:  series下面data中的name
            // c:  series下面data中的value
            // d:  当前value 占所以内容的比例
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '老陈学员分布',
                // pie 饼图  
                type: 'pie',
                // 百分比 具体指都可以  百分比加一号
                // 1：内圆的半径  2 外圆的半径
                radius: ['10%', '65%'],
                // 设置水平方向  垂直方法  50% 居中
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 4,
                    length2: 8
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '河南' }
                ]
            }
        ]
    };
    myChart.setOption(option);
    // 解决echarts设置option后，图标特别小的情况
    // 页面加载的时候，调用echarts实例对象的reszie()方法
    // 必须使用事件监听
    window.addEventListener('load', function () {
        myChart.resize();
    });
    // 当屏幕重置大小的时候  继续调用echarts的重置大小方法
    // 自动适应当前屏幕
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();




// 全国用户统计模块
// 插入的位置   类名.bar
(function () {
    var item = {
        name: '',
        value: 1200,
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        tooltip: {
            extraCssText: 'opacity:0'
        }
    }
    var myChart = echarts.init(document.querySelector('.bar'));
    var option = {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#00fffb' // 0% 处的颜色
            }, {
                offset: 1, color: '#0061ce' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        tooltip: {
            trigger: 'item',
            // 触发的时候 效果  shadow 阴影
            //                line 虚线
            //                none 没效果
            axisPointer: {
                type: 'none'
            }
        },
        // 表格
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            containLabel: true,
            // 是否显示网格
            show: true,
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                data: ['郑州', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'], axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#71f2fb"
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)',
                    }
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#71f2fb"
                },
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }
        ]
    };
    myChart.setOption(option);

    window.addEventListener('load', function () {
        myChart.resize()
    });
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();





// 订单模块  订单显示隐藏，订单自动切换
(function () {
    // 找到时间选项  365天 90天 30天 24小时
    var timeTab = document.getElementsByClassName('filter')[0].children;
    // 找到所有对应显示的内容
    var orderData = document.getElementsByClassName('orderData');
    var index_ = 0;
    var timer = null;//计时器 操作index_的下标
    for (var i = 0; i < timeTab.length; i++) {
        timeTab[i].setAttribute('index', i);

        // 点谁 给事件加选中的样式
        timeTab[i].onclick = function () {
            index_ = this.getAttribute("index");
            for (var j = 0; j < timeTab.length; j++) {
                // timeTab[j].className = '';
                // timeTab[index_].className = 'active';
                timeTab[j].classList.remove('active');
                timeTab[index_].classList.add('active');
            }

            //切换对应内容的显示和隐藏
            // 通过orderDataHidden 类名进行控制
            for (var k = 0; k < orderData.length; k++) {
                orderData[k].classList.add('orderDataHidden');
                orderData[index_].classList.remove('orderDataHidden');
            }
        }
    }

    function autoCheck() {
        timer = setInterval(function () {
            index_++;
            if (index_ >= timeTab.length) {
                index_ = 0;
            }
            timeTab[index_].click();
        }, 1500);

    }
    autoCheck();

    // 鼠标来到订单框的时候  计时器停
    // 鼠标移除的时候 计时器继续进行
    var order = document.getElementsByClassName('order')[0];
    order.onmouseenter = function () {
        clearInterval(timer);
    }
    order.onmouseleave = function () {
        autoCheck(), 1500;
    }
})();




// 销售额统计模块
(function () {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    var myChart = echarts.init(document.querySelector('.sline'));

    var option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%' // 距离右边10%
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            boundaryGap: false  // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false  // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        series: [
            {
                name: '预期销售额',
                type: 'line',
                stack: 'Total',
                data: data.year[0],
                smooth: true// 折现变圆滑
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: 'Total',
                data: data.year[1],
                smooth: true
            }
        ]
    };
    myChart.setOption(option);


    // 点击切换年月日
    var timeTab = document.getElementsByClassName('timeTab');
    var index_ = 0;
    var timer = null;//计时器
    for (var i = 0; i < timeTab.length; i++) {
        timeTab[i].setAttribute('index', i);

        timeTab[i].onclick = function () {
            index_ = this.getAttribute('index');

            for (var j = 0; j < timeTab.length; j++) {
                timeTab[j].classList.remove('active');
                timeTab[index_].classList.add('active');
            }

            // 获取自定义属性携带的时间

            var dataTime = this.getAttribute('data-time');
            // console.log(typeof dataTime);
            // console.log(data[dataTime][0]);
            // console.log(data[dataTime][1]);

            option.series[0].data = data[dataTime][0];
            option.series[1].data = data[dataTime][1];

            //修改option数据后 要重新配置option
            myChart.setOption(option);

        }
    }

    function auto() {
        timer = setInterval(function () {
            index_++;
            if (index_ >= timeTab.length) {
                index_ = 0;
            }

            timeTab[index_].click();
        }, 1000);
    }
    auto();

    // 鼠标移入暂停 移出继续

    var sales = document.querySelector('.sales');
    sales.onmouseenter = function () {
        clearInterval(timer);
    }

    sales.onmouseleave = function () {
        auto();
    }


    window.addEventListener('load', function () {
        myChart.resize();
    })

    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();



// 渠道分布   
(function () {
    var myChart = echarts.init(document.querySelector('.radar'));
    var option = {
        radar: {
            //控制圆的大小
            radius: '60%',
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            shape: 'circle',
            // 整个雷达图 有几个圈
            splitNumber: 4,
            axisName: {
                //雷达图 文字的颜色
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ['60%', '0%'],
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        },
        series: [
            {
                name: 'Beijing',
                type: 'radar',
                lineStyle: {
                    normal: {
                        color: '#fff',
                        // width: 1
                    }
                },
                data: [[90, 100, 56, 11, 34]],
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#fff'
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)',
                },


            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('load', function () {
        myChart.resize();
    })
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();
