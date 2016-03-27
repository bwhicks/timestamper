var http = require('http')
var url = require('url')
var strtime = require('strftime')





var server = http.createServer(function (req, res) {
    var parsedURL = url.parse(req.url, true)
    var dateInfo = new Date(parsedURL.path.replace('/','').replace(/%20/g, ' '))
    

    var unix = 0
    var natural = ''
    
   
    
    if (isNaN(dateInfo) == false) {
    
        unix = dateInfo.getTime(),
        natural = strtime('%B %d, %Y', dateInfo)
    
         var returnObject = {
            'unix': unix, 
            'natural': natural
        
        }
    
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(returnObject))
    }
    
    
    
    else {
        
        dateInfo = new Date(parsedURL.path.replace('/','').replace(/%20/g, ' '))
        
        if (dateInfo == 'Invalid Date') {
            unix = null
            natural = null
         
         
         var returnObject = {
            'unix': unix, 
            'natural': natural
        
            }
    
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(returnObject))   
       
        }
        
        if (dateInfo != 'Invalid Date') {
        unix = dateInfo.getTime()
        natural = strtime('%B %d, %Y', unix)
        
         var returnObject = {
            'unix': unix, 
            'natural': natural
        
            }
    
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(returnObject))
    }
 
    }   

})

server.listen(process.env.PORT || 8080)

