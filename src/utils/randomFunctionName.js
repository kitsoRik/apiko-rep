export const getRandomRunctionName = () => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < 256; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "____" + result;
}