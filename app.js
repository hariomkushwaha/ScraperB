const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const { response } = require("express");


const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV === "production") {
    app.use(compression())
  }



const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.json());


app.get('/',function(req,res){
    res.json({api:'working fine! good to go.'})
})

app.get('/API/scrape' ,function(req,res){
    res.json(" ")})

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
             $('.link').each((i ,el) =>{
                const author = $(el).text();
                // console.log(author);
                Author.push(author);
                

            })
            
            for(var i=1;i<30;i=i+3){
                // console.log(Author[i]);
                // console.log(Author[i+1]);
                if (Author[i-1] !== "") {
                    break;
                }
                Author2.push(Author[i]);
                Date.push(Author[i+1]);
                
            }
            
                //  $('.postMetaInline-authorLockup').each((i ,el) =>{
                //     const date = $(el).find('time').text();
                //     Date.push(date);

            // })
                    $('.u-background').each((i ,el) =>{
                         const views = $(el).text();
                         Views.push(views);

            })
     
        }
        for(var i=0;i<Author2.length;i++){
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



app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
  })