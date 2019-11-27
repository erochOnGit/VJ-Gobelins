const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const srcPath = path.resolve(__dirname, "src");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/")
    }
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: "three"
      // OrbitControls: "three-orbit-controls"
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      //load js files
      {
        test: /\.js$/,
        include: [srcPath],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      //load css
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["absolute/path/a", "absolute/path/b"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      //load pictures
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      //load video
      {
        test: /\.(webm|mp4)$/,
        use: ["file-loader"]
      },
      //load musics
      {
        test: /\.mp3$/,
        use: ["file-loader"]
      },
      //load fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf|obj|gltf|glb)$/,
        use: ["file-loader"]
      },
      //load datas like csv or xml
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"]
      }
    ]
  }
};
