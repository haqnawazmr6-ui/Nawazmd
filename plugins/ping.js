module.exports = {
    pattern: "ping",
    run: async (sock, msg, args) => {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "PONG ⚡ RED ZONE MD is alive"
        })
    }
}
