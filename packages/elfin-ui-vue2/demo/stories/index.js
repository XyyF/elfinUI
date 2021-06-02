// import all
function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./', true, /\.js$/));
