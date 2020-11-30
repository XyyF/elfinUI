// import all
function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./welcome', true, /\.js$/));
importAll(require.context('./packages', true, /\.js$/));
importAll(require.context('./element', true, /\.js$/));
