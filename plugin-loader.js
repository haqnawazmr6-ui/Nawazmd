const fs = require('fs')
const path = require('path')

function loadPlugins(sock) {
    sock.commands = new Map()

    const pluginsPath = path.join(__dirname, '..', 'plugins')
    const files = fs.readdirSync(pluginsPath)

    for(const file of files) {
        const plugin = require(path.join(pluginsPath, file))
        if(plugin?.pattern) {
            sock.commands.set(plugin.pattern, plugin.run)
        }
    }
}

module.exports = { loadPlugins }
