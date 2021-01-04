const path = require('path');

module.exports = {
    plugins: {
        output: {
            path: path.join(__dirname, 'dist'), // emit to 'dist' folder in root
            name: '[name]-[query].[ext]' // pattern of emited files
        }
    }
};