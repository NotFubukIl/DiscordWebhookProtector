module.exports = async function(req, res) {
    var form = new FormData()

    if (req.files) {
        var i = 1
        req.files.forEach(r => {
            fs.renameSync(path + "/" + r.filename, path + "/" + r.originalname)
            form.append("file" + i++, fs.createReadStream(path + "/" + r.originalname))
        });
    }
    if (req.body) form.append("payload_json", JSON.stringify(req.body))
    
    delete req.headers.host
    log("Posting Request")
    var request = await fetch(webhook, {
        method: "POST",
        headers: {
            ...form.getHeaders()
        },
        body: form 
    })
    var infos = ""
    try {
        var infos = await request.json()
    } catch(e) {
        try {
            var infos = await request.text()
        } catch(e) {}
    }

    fs.readdirSync(path).forEach(r=> fs.unlinkSync(path + "/" + r))
    typeof infos == "object" ? res.json(infos) : infos ? res.send(infos) : res.sendStatus(request.status)

}