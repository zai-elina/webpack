import webpack from "webpack";
import buildLoaders from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";
import { buildDevServer } from "./buildDevServer";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { port, mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development", // формат сборки режим разработики или продакшн
    entry: paths.entry, // точка входа
    output: {
      path: paths.output, //куда идёт сбока
      filename: "[name].[contenthash].js", //динамичное название, чтобы браузер не кешировал,берется на основании содержимого
      clean: true, // очищает файлы при каждой сборке
    },
    plugins: buildPlugins(options),
    // loader -  цепочка обработчиков, через которую проходят файлы с тем или иным разширением
    module: {
      rules: buildLoaders(options),
    },
    // помогает распознавать расширений
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map", // чтобы отслеживать ошибки в конкретном файле
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
