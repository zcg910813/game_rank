const Excel = require('exceljs')
const getYuyue = require('./module/yuyue')
const getRemen = require('./module/remen')
const getXinpin = require('./module/xinpin')
const getRemai = require('./module/remai')
const getRewan = require('./module/rewan')

console.log("开始导出Excel")
const workbook = new Excel.Workbook()
workbook.creator = 'ZCG'
workbook.lastModifiedBy = 'ZCG'
workbook.created = new Date()
workbook.modified = new Date()
    
//生成一个工作表
let yuyueSheet = workbook.addWorksheet("预约榜")
const yuyueColumns = [
    {header: '排名', key: 'rank', width: 7},
    {header: '游戏名称', key: 'name', width: 30},
    {header: '厂商', key: 'firm', width: 30},
    {header: '评分', key: 'score', width: 10},
    {header: '游戏类型', key: 'type', width: 15},
    {header: '预约人数', key: 'appointmentsNum', width: 15},
    {header: '关注人数', key: 'followerNum', width: 15},
    {header: '评价条数', key: 'evaluate', width: 15},
    {header: '社区条数', key: 'community', width: 15},
    {header: '详情链接', key: 'url', width: 50}
];

let remenSheet = workbook.addWorksheet("热门榜")
const remenColumns = [
    {header: '排名', key: 'rank', width: 7},
    {header: '游戏名称', key: 'name', width: 30},
    {header: '厂商', key: 'firm', width: 30},
    {header: '评分', key: 'score', width: 10},
    {header: '游戏类型', key: 'type', width: 15},
    {header: '安装人数', key: 'installNum', width: 15},
    {header: '关注人数', key: 'followerNum', width: 15},
    {header: '评价条数', key: 'evaluate', width: 15},
    {header: '社区条数', key: 'community', width: 15},
    {header: '详情链接', key: 'url', width: 50}
];

let xinpinSheet = workbook.addWorksheet("新品榜")
const xinpinColumns = [
    {header: '排名', key: 'rank', width: 7},
    {header: '游戏名称', key: 'name', width: 30},
    {header: '厂商', key: 'firm', width: 30},
    {header: '评分', key: 'score', width: 10},
    {header: '游戏类型', key: 'type', width: 15},
    {header: '安装人数', key: 'installNum', width: 15},
    {header: '关注人数', key: 'followerNum', width: 15},
    {header: '评价条数', key: 'evaluate', width: 15},
    {header: '社区条数', key: 'community', width: 15},
    {header: '详情链接', key: 'url', width: 50}
];

let remaiSheet = workbook.addWorksheet("热卖榜")
const remaiColumns = [
    {header: '排名', key: 'rank', width: 7},
    {header: '游戏名称', key: 'name', width: 30},
    {header: '厂商', key: 'firm', width: 30},
    {header: '评分', key: 'score', width: 10},
    {header: '游戏类型', key: 'type', width: 15},
    {header: '购买人数', key: 'buyNum', width: 15},
    {header: '关注人数', key: 'followerNum', width: 15},
    {header: '评价条数', key: 'evaluate', width: 15},
    {header: '售价', key: 'price', width: 15},
    // {header: 'ios售价', key: 'iosPrice', width: 15},
    {header: '详情链接', key: 'url', width: 50}
];

let rewanSheet = workbook.addWorksheet("热玩榜")
const rewanColumns = [
    {header: '排名', key: 'rank', width: 7},
    {header: '游戏名称', key: 'name', width: 30},
    {header: '厂商', key: 'firm', width: 30},
    {header: '评分', key: 'score', width: 10},
    {header: '游戏类型', key: 'type', width: 15},
    {header: '安装人数', key: 'installNum', width: 15},
    {header: '关注人数', key: 'followerNum', width: 15},
    {header: '评价条数', key: 'evaluate', width: 15},
    {header: '详情链接', key: 'url', width: 50}
];
    
function creatExecl (sheet,columns,data,name){
    sheet.columns = columns
    sheet.addRows(data)
    workbook.xlsx.writeFile('attachement/游戏排行榜.xlsx')
    console.log("导出=="+name+"==结束")
}
async function main(){
    let yuyueData = await getYuyue()
    creatExecl(yuyueSheet,yuyueColumns,yuyueData,'预约榜')

    let remenData = await getRemen()
    creatExecl(remenSheet,remenColumns,remenData,'热门榜')

    let xinpinData = await getXinpin()
    creatExecl(xinpinSheet,xinpinColumns,xinpinData,'新品榜')

    let rewanData = await getRewan()
    creatExecl(rewanSheet,rewanColumns,rewanData,'热玩榜')
    
    let remaiData = await getRemai()
    creatExecl(remaiSheet,remaiColumns,remaiData,'热卖榜')
    
}

main();

