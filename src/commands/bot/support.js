const { Command, SwitchbladeEmbed } = require('../../')

module.exports = class Support extends Command {
    constructor(client) {
        super({
            name: 'support',
            category: 'bot'
        }, client)
    }

    async run({ t, channel }) {
        channel.send(
            new SwitchbladeEmbed()
            .setImage('https://i.imgur.com/chdwk9P.png')
            .setDescription(`${this.getEmoji('discordLogo')} ${t('commands:support.clickHere')}`)
        )
    }
}