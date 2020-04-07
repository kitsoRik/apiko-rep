export const upperCaseToTire = (str = '') => {
    for(let i = 0; i < str.length; i++) {
        if(str[i] === str[i].toUpperCase()) {
            str = str.slice(0, i) + '-' + str[i].toLowerCase() + str.slice(i + 1);
        }
    }
    return str;
}