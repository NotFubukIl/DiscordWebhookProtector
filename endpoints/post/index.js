module.exports = async function(req, res) {
    var form = new FormData()

    if (req.files) {
        var i = 1
        req.files.forEach(r => {
            fs.renameSync(path + "/" + r.filename, path + "/" + r.originalname)
            form.append("file" + i++, fs.createReadStream(path + "/" + r.originalname))
        });
    }
    delete req.headers.host
    var request = await fetch(webhook, {
        method: "POST",
        headers: req.files ? form.getHeaders() : req.headers,
        body: req.files ? form : JSON.stringify(req.body)
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