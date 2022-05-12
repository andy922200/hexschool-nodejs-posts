const swaggerAutogen = require('swagger-autogen')() 

const swaggerDoc = { 
    info: {
        title:"Post API", 
        description: "Post API 示範文件"
    }, 
    host: "localhost:8080",
    schemes: ['http','https']
} 

const outputFile = './swagger-output.json' // 輸出路徑和檔名 
const endpointFiles = ['./routes/index.js'] // 路由進入點，像是 routes/index.js 

swaggerAutogen(outputFile, endpointFiles, swaggerDoc)