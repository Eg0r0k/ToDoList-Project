const path = require("path")
module.exports = 
{
    entry: './index.js',
    context: path.resolve(__dirname,"src"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}