module.exports = async function(req, res) {
    var infos = await fetch(webhook)
    var json = await infos.json();
    ["id", "token", "channel_id", "guild_id"].forEach(r => json[r] = `RemProtect_${random()}`);
    log("GET Request, deleted: " + ["id", "token", "channel_id", "guild_id"].join(", ") + " Values")
    res.json(json)
}