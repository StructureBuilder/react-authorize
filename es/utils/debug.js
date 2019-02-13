export var warn = function () { return undefined; };
if (process.env.NODE_ENV !== 'production') {
    warn = function (message) {
        if (typeof console !== undefined) {
            console.error(message);
        }
        else {
            throw new Error(message);
        }
    };
}
