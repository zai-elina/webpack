import path from "path"; //модуль node js для корректного обрабатывания пути на разных ос
import webpack from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const config: webpack.Configuration = {
    mode: env.mode ?? "development", // формат сборки режим разработики или продакшн
    entry: path.resolve(__dirname, "src", "index.tsx"), // точка входа
    output: {
      path: path.resolve(__dirname, "build"), //куда идёт сбока
      filename: "[name].[contenthash].js", //динамичное название, чтобы браузер не кешировал,берется на основании содержимого
      clean: true, // очищает файлы при каждой сборке
    },
    plugins: [
      // генерирует HTML-файл для приложения, с автоматической вставкой ссылок на сгенерированные JavaScript-файлы
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(), //процент того на сколько прошла сборка
      isProd &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].css",
        }), //Этот плагин извлекает CSS в отдельные файлы
    ].filter(Boolean),
    // loader -  цепочка обработчиков, через которую проходят файлы с тем или иным разширением
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          //ts-loader умеет обрабатывать jsx
          // если использовать js надо подключать babel-loader(переписывает код современного js на более поздний) и настраивать его
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    // помогает распознавать расширений
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev && "inline-source-map", // чтобы отслеживать ошибки в конкретном файле
    devServer: isDev
      ? {
          port: env.port ?? 5000,
          open: true,
        }
      : undefined,
  };
  return config;
};
