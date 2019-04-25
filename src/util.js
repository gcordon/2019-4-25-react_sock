// getRedirectPath
export function checkRouter({type, avatar}) {
    // 根据用户信息 返回跳转地址
    // user.type /boss /genius
    // user.avart /boosinfo /geniusinfo
// 自己写的错逻辑
    // if (type == 'boss') {
    //      console.log('======util==============================');
    //      console.log(type);
    //     console.log('========util============================');
    //     return '/bossinfo'
    // } else if (type == 'genius') {
    //      return '/geniusinfo'
    // }
// 自己写的错逻辑

    let url = (type==='boss') ? '/boss' : '/genius'
    if (!avatar) {
        url += 'info'
    }
    return url
}
// 消息的唯一chatid
export function getChatId(userId, tagetId) {
    return [userId, tagetId].sort().join('_')
}