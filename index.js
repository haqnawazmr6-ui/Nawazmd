const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const config = require('./config')
const { loadPlugins } = require('./lib/plugin-loader')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions')

    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true
    })

    loadPlugins(sock)

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update

        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
            if(shouldReconnect) startBot()
        }

        if(connection === 'open') {
            console.log('RED ZONE MD CONNECTED')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if(!msg.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
        const prefix = config.PREFIX

        if(!text || !text.startsWith(prefix)) return

        const args = text.slice(prefix.length).trim().split(' ')
        const cmd = args.shift().toLowerCase()

        sock.commands?.get(cmd)?.(sock, msg, args)
    })
}

startBot()
