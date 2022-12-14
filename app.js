const axios = require('axios');



const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};


const getUrls = async () =>{
    let news = []
        source = []
        resp = await axios.get('https://www.reddit.com/r/news/new/.json')
        childArray = resp.data.data.children

    for(var i=0 ; i<childArray.length ; i++){
        if((childArray[i].data).hasOwnProperty("title")){
            
            var n = childArray[i].data.title
                s = childArray[i].data.url_overridden_by_dest
            n = n.replace(/amp;/g,'')
            news.push(n)
            source.push(s)
        }
    }
    
    return [news,source];
}

(async () => {
    console.log(colours.bright,colours.bg.red,"         FLASH NEWS         ",colours.reset);
    console.log("");
    let bundle = await getUrls()
        news = bundle[0]
        source = bundle[1]

    for(var i = 0 ; i<news.length ; i++){
        console.log(colours.bg.red,(i+1).toString() ,colours.reset, colours.bright,colours.fg.green, news[i].toString(),colours.reset)
        console.log(colours.fg.cyan, source[i].toString() + "\n",colours.reset)
    }

})();
