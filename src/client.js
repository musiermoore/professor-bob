import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';

export default class DiscordClient {
    client

    roleIdsByReactionIds = {
        '📕': '1038070534191202304', // elementary
        '📘': '1038072333484687400', // pre-intermediate
        '📙': '1038072427344826430', // intermediate
        '📗': '1038072459582251028', // upper-intermediate
    }

    getClient() {
        return this.client
    }

    initClient() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageReactions
            ],
            partials: [Partials.Channel, Partials.Reaction, Partials.Message],
        });
    }

    initEvents() {
        this.client.on('ready', () => {
            console.log('Bot is now online.');

            const reactionEnglishLevelMessageId = '1038074741690474587'

            this.client.on(Events.MessageReactionAdd, (reaction, user) => {
                if (
                    reaction?.message?.id === reactionEnglishLevelMessageId
                    && user?.id
                    && !user?.bot
                    && Object.keys(this.roleIdsByReactionIds).includes(reaction.emoji.name)
                ) {
                    const role = reaction?.message.guild.roles.cache.find(r => r.id === this.roleIdsByReactionIds[reaction.emoji.name]);

                    if (role) {
                        const member = reaction.message.guild.members.cache.get(user.id);
                        member?.roles?.add(role);
                        member?.roles?.add(role);
                    }
                }
            });
            this.client.on(Events.MessageReactionRemove, (reaction, user) => {
                if (
                    reaction?.message?.id === reactionEnglishLevelMessageId
                    && user?.id
                    && !user?.bot
                    && Object.keys(this.roleIdsByReactionIds).includes(reaction.emoji.name)
                ) {
                    const role = reaction?.message.guild.roles.cache.find(r => r.id === this.roleIdsByReactionIds[reaction.emoji.name]);

                    if (role) {
                        const member = reaction.message.guild.members.cache.get(user.id);
                        member?.roles?.remove(role);
                    }
                }
            });
        })
    }

    loginClient() {
        const token = process?.env?.TOKEN ? process.env.TOKEN : ''

        if (token) {
            this.client.login(token);
        }
    }
}



