// Logic of url shortening
const encoder = function base62_encoder(deci) {
    s = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    hash_str = "";
    while (deci > 0) {
        hash_str = s[deci % 62] + hash_str;
        deci = Math.floor(deci / 62);
    }
    return hash_str;
}

module.exports = encoder;