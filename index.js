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
    getIP: req => req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    path: __dirname + "/uploads"
}
process.env = {
    ...process.env,
    NODE_NO_WARNINGS: 1,
    NODE_TLS_REJECT_UNAUTHORIZED: 0
}
for (var p in toGlob) global[p] = toGlob[p]
global.upload = multer({ dest: 'uploads/' })
global.app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
    var fileContent = fs.readFileSync("./ips.txt").toString()
    var ip = getIP(req)
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    var hours = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    fileContent += `\n[${day}:${month.length = 1 ? `0${month}` : month}:${year}:${hours}:${min}:${sec}]: ${ip.includes("::ffff:") ? ip.split("::ffff:")[1] : ip}`
    fs.writeFileSync("./ips.txt", fileContent)
    next()
})
app.listen(port, () => log(`Listening On Port ${port}`));
if (!fs.existsSync("./ips.txt")) fs.writeFileSync("./ips.txt", "--------------[RemPROTECT]--------------");
["get", "delete", "post"].forEach(r => app[r](`/${r}`, upload.array("file", 8), require(`./endpoints/${r}/index.js`)));