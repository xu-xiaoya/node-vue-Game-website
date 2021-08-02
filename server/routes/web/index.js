module.exports = app=>{

    const router = require('express').Router();
    const mongoose = require('mongoose');
    // const Article = require('../../models/Article');

    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    const Hero = mongoose.model('Hero');
    const Ad = mongoose.model('Ad');
    const Video = mongoose.model('Video');


    // 导入新闻数据
    router.get('/news/init', async(req, res)=>{
        const parent = await Category.findOne({
            name:'新闻分类'
        });
        const cats = await Category.find().where({
            parent:parent
        }).lean();
        const newsTitles = [
            "“统御圣所”团队副本普通与英雄难度现已开放",
            "“塔扎维什，帷纱集市”地下城现已开放",
            "2021史诗钥石地下城全球锦标赛第2赛季迎接全新升级!",
            "《魔兽世界》联手百度地图与百度输入法，打造全方位游戏化体验",
            "购买180天游戏时间赠送全新蓝玉灼天者坐骑",
            "部分“燃烧的远征”服务器开放免费角色转移服务(7月2日更新)",
            "“统御之链”内容更新现已上线",
            "“暗影国度” “统御之链”更新说明",
            "统御之链”的全新盟约坐骑",
            "假日活动:战场",
            "[媒体推荐]燃烧的远征:集结号插件下载",
            "了解“统御之链”中的史诗钥石评分",
            "“燃烧的远征”竞技场第1赛季现已开始",
            "[媒体推荐]限时福利!上大神领取十万魔兽世界补贴",
            "“暗影国度”:“统御之链”的噬渊更新",
            "谁还没有一两个咕咕队友集合石地下城挑战八强趣闻",
            "假日活动:世界任务",
            "MDI极限冲层赛Skyline专访",
            "飞行预备:准备在“统御之链”中翱翔九天阅读下文，了解如何准备在“统御之链”中翱翔九天。"
        ]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a,b)=>Math.random()-0.5);
            return {
                categories: randomCats.slice(0,2),
                title: title
            }
        })
        // 数据库清空原有数据
        await Article.deleteMany({});
        // 插入newList
        await Article.insertMany(newsList);
        res.send(newsList);
    });


    
     // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //   name: '新闻分类'
        // }).populate({
        //   path: 'children',
        //   populate: {    //调children，再在其内关联newsList
        //     path: 'newsList'
        //   }
        // }).lean()

        // 先找出顶级分类：新闻分类
        const parent = await Category.findById('60ed4d97dc2a8f37a98b9f05')
        // 聚合查询
        const cats = await Category.aggregate([
            // 第一步：$match阶段，按parent字段过滤数据
            { $match: { parent: parent._id } },
            // 第二步：关联查询
            {
                $lookup: {
                    from: 'articles',   //从关联的表获取数据（collection名，默认模型名小写+s）
                    localField: '_id',          //本地键
                    foreignField: 'categories', //对应外键
                    as: 'newsList'      //别名
                }
            },
            // 第三步：添加字段（修改）
            {
                $addFields: {
                    // slice对数组字段做切片映射,第一个参数：要筛的字段，第二个参数：个数
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
            
        // 新闻公告活动赛事四个分类的id
        const subCats = cats.map(v => v._id);
        // 在头部添加一个热门板块
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                // $in运算符会筛选出字段值等于指定数组中任何值的文档
                // 此处匹配id等于 subCats的四个分类id 的分类
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                // 在热门分类的文章，应显示自身的第一个类型，如非热门，则显示分类栏的名称
                news.categoryName = (cat.name === '热门')
                    ? news.categories[0].name : cat.name
                return news;
            })
            return cat;
        })
        res.send(cats);
    })

    //导入职业数据
    router.get('/heroes/init', async(req, res)=> {
        await Hero.deleteMany({})
        const rawData = [ { "name":"热门", "heroes":[ { "name": "战士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt4da5b5373f7b0a5a/5ee3e48814a7bc718bab5fbc/WTZV6QLQWMGA1472462584161.jpg" }, { "name": "猎人", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt9e2a83286eabf5f9/5ee3e428a9170407eeb4b785/MFUHSBUXIVHC1472462567800.jpg" }, { "name": "牧师", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt62ba94268b5d70af/5ee78c19e35f99710ac7903f/DNYEIRWUCTD71472462578250.jpg" }, { "name": "法师", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt8c37ada81ee00f2d/5ee3e45cd217327180733d0f/1RZZ8SIGPF2A1472462568985.jpg" }, { "name": "武僧", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt1f67783c6ed852ec/5ee7942fe8f74907ecce02bb/XCAU21DM19PN1472462572837.jpg" }, { "name": "恶魔猎手", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte82b67d3cb4394e3/5ee79641fc5bec085f1e66b7/2M4W72FCP73P1472462563446.jpg" }, { "name": "圣骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt5b1703ed19bbdaef/5ee790bba7c560086afc41c7/B9O2ZMD5MTKZ1472462573678.jpg" }, { "name": "潜行者", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt0a85b15a150cc8e1/5ee3e4b8e8f74907ecce0130/BONY10RAWWMM1472462578823.jpg" }, { "name": "萨满祭司", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltfc7f6afbcd8c4581/5ee79291d217327180733e65/GMUE51XJ12H11472462580949.jpg" }, { "name": "术士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt0abcecf5fceb04a5/5ee3e8d9418a3c077bb23791/6KN3PGUVXI6D1472462570509.jpg" }, { "name": "德鲁伊", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte0e32d1d3f1f3b81/5ee3e3b214a7bc718bab5f86/3I1UGKCI6NIZ1472462563762.jpg" }, { "name": "死亡骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltd85783c07f6c1895/5ee3e3ea63a2d97093830791/0140N08APH7H1472462563120.jpg" }, ] }, { "name":"伤害输出", "heroes":[ { "name": "战士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt4da5b5373f7b0a5a/5ee3e48814a7bc718bab5fbc/WTZV6QLQWMGA1472462584161.jpg" }, { "name": "猎人", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt9e2a83286eabf5f9/5ee3e428a9170407eeb4b785/MFUHSBUXIVHC1472462567800.jpg" }, { "name": "牧师", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt62ba94268b5d70af/5ee78c19e35f99710ac7903f/DNYEIRWUCTD71472462578250.jpg" }, { "name": "法师", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt8c37ada81ee00f2d/5ee3e45cd217327180733d0f/1RZZ8SIGPF2A1472462568985.jpg" }, { "name": "武僧", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt1f67783c6ed852ec/5ee7942fe8f74907ecce02bb/XCAU21DM19PN1472462572837.jpg" }, { "name": "恶魔猎手", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte82b67d3cb4394e3/5ee79641fc5bec085f1e66b7/2M4W72FCP73P1472462563446.jpg" }, { "name": "圣骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt5b1703ed19bbdaef/5ee790bba7c560086afc41c7/B9O2ZMD5MTKZ1472462573678.jpg" }, { "name": "潜行者", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt0a85b15a150cc8e1/5ee3e4b8e8f74907ecce0130/BONY10RAWWMM1472462578823.jpg" }, { "name": "萨满祭司", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltfc7f6afbcd8c4581/5ee79291d217327180733e65/GMUE51XJ12H11472462580949.jpg" }, { "name": "术士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt0abcecf5fceb04a5/5ee3e8d9418a3c077bb23791/6KN3PGUVXI6D1472462570509.jpg" }, { "name": "德鲁伊", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte0e32d1d3f1f3b81/5ee3e3b214a7bc718bab5f86/3I1UGKCI6NIZ1472462563762.jpg" }, { "name": "死亡骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltd85783c07f6c1895/5ee3e3ea63a2d97093830791/0140N08APH7H1472462563120.jpg" }, ] }, { "name":"坦克", "heroes":[ { "name": "战士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt4da5b5373f7b0a5a/5ee3e48814a7bc718bab5fbc/WTZV6QLQWMGA1472462584161.jpg" }, { "name": "武僧", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt1f67783c6ed852ec/5ee7942fe8f74907ecce02bb/XCAU21DM19PN1472462572837.jpg" }, { "name": "恶魔猎手", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte82b67d3cb4394e3/5ee79641fc5bec085f1e66b7/2M4W72FCP73P1472462563446.jpg" }, { "name": "圣骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt5b1703ed19bbdaef/5ee790bba7c560086afc41c7/B9O2ZMD5MTKZ1472462573678.jpg" }, { "name": "德鲁伊", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte0e32d1d3f1f3b81/5ee3e3b214a7bc718bab5f86/3I1UGKCI6NIZ1472462563762.jpg" }, { "name": "死亡骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltd85783c07f6c1895/5ee3e3ea63a2d97093830791/0140N08APH7H1472462563120.jpg" }, ] }, { "name":"治疗者", "heroes":[ { "name": "牧师", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt62ba94268b5d70af/5ee78c19e35f99710ac7903f/DNYEIRWUCTD71472462578250.jpg" }, { "name": "武僧", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt1f67783c6ed852ec/5ee7942fe8f74907ecce02bb/XCAU21DM19PN1472462572837.jpg" }, { "name": "圣骑士", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blt5b1703ed19bbdaef/5ee790bba7c560086afc41c7/B9O2ZMD5MTKZ1472462573678.jpg" }, { "name": "萨满祭司", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/bltfc7f6afbcd8c4581/5ee79291d217327180733e65/GMUE51XJ12H11472462580949.jpg" }, { "name": "德鲁伊", "avatar": "https://contentstack-images.cnc.blzstatic.cn/v3/assets/blt3452e3b114fab0cd/blte0e32d1d3f1f3b81/5ee3e3b214a7bc718bab5f86/3I1UGKCI6NIZ1472462563762.jpg" } ] } ]
        for (let cat of rawData) {
            if (cat.name === '热门') {
                continue;
            }
            // 找到当前分类在数据库中对应的数据
            const category = await Category.findOne({
                // rawData的各个分类名：热门/伤害输出/治疗者/坦克
                name: cat.name
            })
            // hero表示heroes里的每一行数据
            cat.heroes = cat.heroes.map(hero => {
                // 解构
                hero.categories = [category];
                return hero;
            })

            //录入英雄
            await Hero.insertMany(cat.heroes);
        }
        res.send(await Hero.find())
    }) 


    // 职业列表接口
    router.get('/heroes/list', async (req, res) => {
        // 先找出顶级分类：新闻分类
        const parent = await Category.findOne({
            name: '职业分类'
        })
        // 聚合查询
        const cats = await Category.aggregate([
            // 第一步：$match阶段，按parent字段过滤数据
            { $match: { parent: parent._id } },
            // 第二步：关联查询
            {
                $lookup: {
                    from: 'heroes',   
                    localField: '_id',          
                    foreignField: 'categories', 
                    as: 'heroList'      //别名
                }
            },
        ])
            
        const subCats = cats.map(v => v._id);
        // 在头部添加一个热门
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                // $in运算符会筛选出字段值等于指定数组中任何值的文档
                // 此处匹配id等于 subCats的四个分类id 的分类
                categories: { $in: subCats }
            }).limit(4).lean()
        })
        res.send(cats);
    })

    //职业列表页面接口 
    router.get('/heroes/listTwo', async(req, res) =>  {
        let { heroType } = req.query
        console.log(heroType)
        // 返回的英雄数据
        let heroList = []
    
        if (heroType === '全部') {
          heroList = await Hero.find()
        } else {
          // 先把对应分类信息查出来
          const category = await Category.findOne().where({ name: heroType })
          // 根据分类的id取查找对应文章
          heroList = await Hero.find().where({
            categories: { $in: [category._id] }
          })
        }
    
        res.send(heroList);
    })

    //职业列表页面分类 
    router.get('/heroes/cate', async(req, res) =>  {
        const cate = await Category.find()
        .where({ parent: '60ed4d5cdc2a8f37a98b9eab' }).lean()
        cate.unshift({ name: '全部' })
        res.send(cate);
    })

    // 文章详情
    router.get('/articles/:id',async(req,res) => {
        const data = await Article.findById(req.params.id).lean();
        data.related = await Article.find().where({
            categories: { $in: data.categories },
            // ne ：不等于某个字段名
            _id : { $ne: data._id } 
        }).limit(2);
        res.send(data);
    })

    

    // 职业详情
    router.get('/heroes/:id', async(req,res) => {
        const data = await Hero.findById(req.params.id)
        .populate('categories items1 items2 partners.hero').lean();
        res.send(data);
    }),

    // 视频列表接口
    router.get('/videos/list', async(req, res)=>{
        const catesData = await Category.aggregate([
            { $match: { parent: mongoose.Types.ObjectId('6107a698d274221cb88c197d') } },
            {
              $lookup: {
                from: 'videos',
                localField: '_id',
                foreignField: 'category',
                as: 'videoList'
              }
            },
          ])
          res.send(catesData);
    })
    // 视频详情
    router.get('/videos/:id', async(req,res) => {
        const data = await Video.findById(req.params.id).lean();
        
        res.send(data);
    })

    // 首页轮播图列表接口
    router.get('/ads/home', async(req, res) =>{
        const data = await Ad.findById('60d36a181063a946a0af757d');
        res.send(data.items);
    }),
    
    app.use('/web/api', router);
}