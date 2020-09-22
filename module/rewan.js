function getRewanData (){
    const puppeteer = require('puppeteer');
    // 等待3000毫秒
    const sleep = time => new Promise(resolve => {
        setTimeout(resolve, time);
    })

    const url ='https://www.taptap.com/top/played';
    return (async() => {
        console.log('Start visit');
    
        // 启动一个浏览器
        const brower = await puppeteer.launch({
            args: ['--no-sandbox'],
            dumpio: false
        });
    
        const page = await brower.newPage()   // 开启一个新页面
        // 去豆瓣那个页面
        await page.goto(url, {
            waitUntil: 'networkidle2'  // 网络空闲说明已加载完毕
        });
    
        await sleep(3000);
    
        // 等待页面加载更多按钮出现
        await page.waitForSelector('.taptap-button-more>.btn-primary');
    
        // 只爬取两页的数据
        for (let i = 0; i < 4; i++) {
            await sleep(1000);
            // 点击加载更多
            await page.click('.taptap-button-more>.btn-primary')
        }
    
        // await sleep(2000);
        // 结果
        const result = await page.evaluate(() => {
    
            var items = document.querySelectorAll('.top-card-middle')
            // console.log(items)
            var links = [];
            var urlList = [];
            if(items.length>=1){
                for(let i=0;i<items.length;i++){
                    let rank = i + 1
                    let name =  items[i].children[0].children[0].innerHTML ? items[i].children[0].children[0].innerHTML : ''
                    let url = items[i].children[0].getAttribute('href')
                    let firm = items[i].children[1].children[0].innerHTML ? items[i].children[1].children[0].innerHTML.replace('厂商:&nbsp;','') : '' 
                    let type = items[i].children[5].children[0].innerHTML ? items[i].children[5].children[0].innerHTML : ''
    
                    let data = {name:name,url:url}
                    urlList.push(data)
    
                    links.push({
                        rank,
                        name,
                        firm,
                        url,
                        type
                    })
                }
            }
            
            return {urlList,links}
        });
    
        // console.log(result.links);
        const page2 = await brower.newPage()   // 开启一个新页面
    
        for(let i=0;i<result.urlList.length;i++){
            
            await page2.goto(result.urlList[i].url);
        
            await sleep(1000);
    
            const result2 =  await page2.evaluate(() =>{
                let installNum =''
                let followerNum =''
                if(document.querySelectorAll('.count-stats')[1]){
                    installNum =document.querySelectorAll('.count-stats')[0] ? document.querySelectorAll('.count-stats')[0].innerHTML.replace('人安装','') :'0'
                    followerNum =document.querySelectorAll('.count-stats')[1] ? document.querySelectorAll('.count-stats')[1].innerHTML.replace('人关注','') : '0'
                }else{
                    installNum = '0'
                    followerNum =document.querySelectorAll('.count-stats')[0] ? document.querySelectorAll('.count-stats')[0].innerHTML.replace('人关注','') : '0'
                }
                let score = document.querySelector('.app-rating-score') ? document.querySelector('.app-rating-score').innerHTML : '0'
                let evaluate =document.querySelectorAll('.main-header-tab>ul>li>a>small')[0]? document.querySelectorAll('.main-header-tab>ul>li>a>small')[0].innerHTML : '0'
                let community =document.querySelectorAll('.main-header-tab>ul>li>a>small')[1]? document.querySelectorAll('.main-header-tab>ul>li>a>small')[1].innerHTML : '0'
                return {installNum,followerNum,score,evaluate,community}
            })
            result.links[i].installNum = result2.installNum
            result.links[i].followerNum = result2.followerNum
            result.links[i].score = result2.score
            result.links[i].evaluate = result2.evaluate
            result.links[i].community = result2.community
            console.log(result.links[i])
        }
    
        // 关闭浏览器
        brower.close();
        return result.links
    })();
}

module.exports =  getRewanData