const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Thay 'NHAP_ID_KENH_VAN_BAN_O_DAY' bằng ID kênh chat của bạn
const NOTIFICATION_CHANNEL_ID = '1569014246006591510';

client.once('ready', () => {
    console.log(`Bot đã đăng nhập thành công với tên ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const channel = newState.guild.channels.cache.get(NOTIFICATION_CHANNEL_ID);
    if (!channel) return;

    const member = newState.member;

    if (!oldState.channelId && newState.channelId) {
        channel.send(`🟢 **${member.user.tag}** đã đột nhập vào kênh thoại **${newState.channel.name}**.`);
    } 
    else if (oldState.channelId && !newState.channelId) {
        channel.send(`🔴 **${member.user.tag}** đã đột tử khỏi kênh thoại **${oldState.channel.name}**.`);
    } 
    else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
        channel.send(`🔄 **${member.user.tag}** đã dịch chuyển từ **${oldState.channel.name}** sang **${newState.channel.name}**.`);
    }
});

// Thay 'MTU2ODk4OTIyMDI1MTYzOTg0MA.GOl2MJ.AnXzg7NowF64yfDN3JdPHUcN_6ysgFipeodyrU' bằng Token thật của bot
client.login('TOKEN_CUA_BAN');