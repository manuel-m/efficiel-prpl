export { clone };

function clone(in_) {
    return JSON.parse(JSON.stringify(in_));
}
