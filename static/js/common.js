/**
 * 把时间戳格式化成日期
 */
function formatTime(time) {
    return new Date(parseInt(time)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//判断是否是正整数
function IsNum(s) {
    if (s != null && s != "") {
        var r, re;
        re = /\d*/i; //\d表示数字,*表示匹配多个数字
        r = s.match(re);
        return (r == s) ? true : false;
    }
    return false;
}

//判断是否是浮点数
function isFloat(c) {
    var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    return r.test(c);
}

/**
 * 
 * @requires jQuery
 * 
 * 页面加载加载进度条启用
 * **/
function progressLoad() {
    $("<div class=\"datagrid-mask\" style=\"position:absolute;z-index: 9999;\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\" style=\"position:absolute;z-index: 9999;\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
}

/**
 * 
 * @requires jQuery
 * 
 * 页面加载加载进度条关闭
 * **/
function progressClose() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

/**
 * 获取昨天的时间年-月-日
 */
function getCurrentTime1() {
    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 1);
    var year = myDate.getFullYear(),
        month = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1),
        day = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
    return year + '-' + month + '-' + day;
}

/**
 * 时间比较{结束时间大于开始时间}
 * @parameter
 * startTime: 开始时间；
 * endTime: 结束时间
 */
function compareDateEndTimeGTStartTime(startTime, endTime) {
    return ((new Date(endTime.replace(/-/g, "/"))) >= (new Date(
        startTime.replace(/-/g, "/"))));
}

function addSort(str, id, sort, offline, name) {
    $(str).parent().remove();
    var li = "<li class='sortonline'>" + name + "<span class='minus online' onclick='delSort(this," + id + "," + sort + "," + offline + ",\"" + name + "\");'></span></li>";
    $("#onlinetb").append(li);
}

function delSort(str, id, sort, online, name) {
    $(str).parent().remove();
    var li = "<li class='sortdefault'>" + name + "<span class='plus offline' onclick='addSort(this," + id + "," + sort + "," + online + ",\"" + name + "\");'></span></li>";
    $("#offlinetb").append(li);
}

var list = new Array();
function getList() {
    list = [];
    var lenght = $("#offlinetb li").length;
    $("#offlinetb li span").each(function (index, element) {
        if (element.className.indexOf("offline") > -1) {
            var str = $(element).attr("onclick");
            str = str.replace("addSort(this,", "").replace(");", "");
            str = str.split(",");
            if (str[2] != 0) {
                list.push(new but(str[0], lenght - index, str[3]));
            }
        }
    });
    return JSON.stringify(list);
}

var onlineList = new Array();
function getOnline() {
    onlineList = [];
    var lenght = $("#onlinetb li").length;
    $("#onlinetb li span").each(function (index, element) {
        var str = $(element).attr("onclick");
        str = str.replace("delSort(this,", "").replace(");", "");
        str = str.split(",");
        if (element.className.indexOf("online") > -1) {
            onlineList.push(new but(str[0], lenght - index, str[3]));
        } else if (str[1] != (lenght - index)) {
            onlineList.push(new but(str[0], lenght - index, str[3]));
        }
    });
    return JSON.stringify(onlineList);
}

function but(id, sort, name) {
    this.id = id;
    this.sort = sort;
    //this.name=name;
}

function showImging(imgUrl) {
    if (!imgUrl) {
        return false;
    }
    if (document.getElementById('showImg-container')) return false;
    var div = document.createElement('div');
    div.style.cssText = "position:absolute; left:5%;top:20%; width:350px;";
    div.id = 'showImg-container';
    document.body.appendChild(div);
    div.innerHTML = '<img src="' + imgUrl + '" alt="图片不存在" style="max-width:350px;"/>';
}

function hideImging() {
    document.getElementById('showImg-container') && document.body.removeChild(document.getElementById('showImg-container'));
}

function init_yearMonth(id) {
    var db = $('#' + id);
    db.datebox({
        editable: false,
        prompt: '选择年月',
        validType: [],
        onShowPanel: function () {//显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
            span.trigger('click'); //触发click事件弹出月份层
            if (!tds) setTimeout(function () {//延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
                tds = p.find('div.calendar-menu-month-inner td');
                tds.click(function (e) {
                    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
                    var year = /\d{4}/.exec(span.html())[0]//得到年份
                        , month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
                    db.datebox('hidePanel')//隐藏日期对象
                        .datebox('setValue', year + '-' + month); //设置日期的值
                });
            }, 0);
            yearIpt.unbind();//解绑年份输入框中任何事件
            $(yearIpt).attr('readonly', true);//年份只读
            $(yearIpt).css('border-color', 'white');//边框去掉
        },
        parser: function (s) {
            if (!s) return new Date();
            var arr = s.split('-');
            return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
        },
        formatter: function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            return y + '-' + (m < 10 ? ('0' + m) : m);
        }
    });
    var p = db.datebox('panel'), //日期选择对象
        tds = false, //日期选择对象中月份
        aToday = p.find('a.datebox-current'),
        yearIpt = p.find('input.calendar-menu-year'),//年份输入框
        //显示月份层的触发控件
        span = aToday.length ? p.find('div.calendar-title span') ://1.3.x版本
            p.find('span.calendar-text'); //1.4.x版本
    if (aToday.length) {//1.3.x版本，取消Today按钮的click事件，重新绑定新事件设置日期框为今天，防止弹出日期选择面板
        aToday.unbind('click').click(function () {
            var now = new Date();
            db.datebox('hidePanel').datebox('setValue', now.getFullYear() + '-' + (now.getMonth() + 1));
        });
    }
}

function buildMenu(target) {
    var state = $(target).data('datagrid');
    if (!state.columnMenu) {
        state.columnMenu = $('<div></div>').appendTo('body');
        state.columnMenu.menu({
            onClick: function (item) {
                if (item.iconCls == 'tree-checkbox1') {
                    $(target).datagrid('hideColumn', item.name);
                    $(this).menu('setIcon', {
                        target: item.target,
                        iconCls: 'tree-checkbox0'
                    });
                } else {
                    $(target).datagrid('showColumn', item.name);
                    $(this).menu('setIcon', {
                        target: item.target,
                        iconCls: 'tree-checkbox1'
                    });
                }
            }
        })
        var fields = $(target).datagrid('getColumnFields', true).concat($(target).datagrid('getColumnFields', false));
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var col = $(target).datagrid('getColumnOption', field);
            state.columnMenu.menu('appendItem', {
                text: col.title,
                name: field,
                iconCls: 'tree-checkbox1'
            });
        }
    }
    return state.columnMenu;
}