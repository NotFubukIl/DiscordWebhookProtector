const toGlob = {
    ...require("./config"),
    log: what => {
        var date = new Date()
        var hours = date.getHours()
        var min = date.getMinutes()
        var sec = date.getSeconds()
        console.log(`[${hours}:${min}:${sec}]: ${what}`)
    },
    express: require("express"),
    random: () => {
        var i = 0
        var ni = ""
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase() + "0123456789"
        while (i !== 32) {
            ni += chars[Math.floor( Math.random() * chars.length )]
            i++
        }
        return ni
    },
    fetch: require("node-fetch"),
    multer: require("multer"),
    bodyParser: require("body-parser"),
    FormData: require("form-data"),
    fs: require("fs"),
    path: __dirname + "/uploads"
    
    
}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
for (var p in toGlob) global[p] = toGlob[p]
global.upload = multer({ dest: 'uploads/' })
global.app = express()

app.use(bodyParser.json())
app.listen(port, () => log(`Listening On Port ${port}`));

["get", "delete", "post"].forEach(r => app[r](`/${r}`, upload.array("file", 8), require(`./endpoints/${r}/index.js`)));