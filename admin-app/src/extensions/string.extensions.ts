declare global{
    interface String {
        format(...args: string[]): string;
    }
}

String.prototype.format = function (...args: string[]): string {
    var s = this;
    return s.replace(/{(\d+)}/g, function (match, number) {
        return (typeof args[number] != 'undefined') ? args[number] : match;
    });
};

export{};