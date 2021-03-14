const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const { response } = require("express");






const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.json());

app.get('/',function(req,res){
    res.json({api:'working fine! good to go.'})
})

app.get('/API/scrape' ,function(req,res){
    res.json(" ");
})

app.post('/API/scrape', function(req,res){
    
    const Title = [];
    const Link = [];
    const Author = [];
    const Date = [];
    const Views = [];
    const data =[];
    const Author2 =[];
    const que = [];
    const qu ={
        q :req.body.q
    }
     que.push(qu);
    

    request('https://medium.com/search?q='+que[0].q,(err,response,html)=>{


        if(!err && response.statusCode==200){
        
            const $ = cheerio.load(html);
            $('.postArticle-content').each((i ,el) =>{
                const title = $(el).find('h3').text();
                const link = $(el).find('a').attr('href');

                Title.push(title);
                Link.push(link);
               

            })
             $('.ds-link').each((i ,el) =>{
                const author = $(el).text();
                Author.push(author);

            })
            for(var i=0;i<Author.length;i+=2){
                Author2.push(Author[i]);
            }
            
                 $('.postMetaInline-authorLockup').each((i ,el) =>{
                    const date = $(el).find('time').text();
                    Date.push(date);

            })
                    $('.u-background').each((i ,el) =>{
                         const views = $(el).text();
                         Views.push(views);

            })
     
        }
        for(var i=0;i<10;i++){
            const Data ={
                Title: Title[i],
                Link : Link[i],
                Author : Author2[i],
                Date : Date[i],
                Views : Views[i]
            }
            data.push(Data);
        }
    res.json(data);
    })
})


app.listen(5000,function(){
    console.log("server is running on port 5000");
})