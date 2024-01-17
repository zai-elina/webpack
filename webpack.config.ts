import path from "path"; //модуль node js для корректного обрабатывания пути на разных ос
import webpack from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as Configuration } from "webpack-dev-server";

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === "development";

  const config: webpack.Configuration = {
    mode: env.mode ?? "development", // формат сборки режим разработики или продакшн
    entry: path.resolve(__dirname, "src", "index.ts"), // точка входа
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
    ].filter(Boolean),
    // loader -  цепочка обработчиков, через которую проходят файлы с тем или иным разширением
    module: {
      rules: [
        {
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
