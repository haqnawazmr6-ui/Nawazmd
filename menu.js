module.exports = {
    pattern: "menu",
    run: async (sock, msg, args) => {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "RED ZONE MD MENU\n. ping\n. menu"
        })
    }
}
