const { SwitchbladeEmbed, Command, Constants } = require('../../../')

module.exports = class ScrobblingPercent extends Command {
  constructor (client) {
    super(client, {
      name: 'percent',
      aliases: ['p'],
      parentCommand: 'scrobbling',
      parameters: [{ type: 'number', min: 35, max: 95, missingError: 'commands.scrobbling.subcommands.percent.missingNumber' }]
    })
  }

  async run ({ t, author, channel }, percent) {
    channel.startTyping()
    const embed = new SwitchbladeEmbed(author)
    try {
      const userConnections = await this.client.modules.connection.getConnections(author.id)
      const lastfm = userConnections.find(c => c.name === 'lastfm')
      if (!lastfm) {
        throw new Error('NOT_CONNECTED')
      }
      const newConfig = await this.client.modules.connection.editConfig(author.id, 'lastfm', { percent })
      embed.setDescription(t('commands:scrobbling.subcommands.percent.changed', { percent: newConfig.percent }))
      await channel.send(embed)
    } catch (e) {
      await channel.send(embed.setDescription(t('commands:scrobbling.configNotConnected', { link: `${process.env.DASHBOARD_URL}/profile` }))
        .setColor(Constants.ERROR_COLOR))
    }
    channel.stopTyping()
  }
}
