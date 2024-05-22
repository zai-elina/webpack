import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export default function buildLoaders(
  options: BuildOptions
): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    //ts-loader умеет обрабатывать jsx
    // если использовать js надо подключать babel-loader(переписывает код современного js на более поздний) и настраивать его
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          // только сборка без проверки типов, ускоряет сборку
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: isDev ? [ReactRefreshTypeScript()] : [],
          }),
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [scssLoader, tsLoader, assetLoader, svgLoader];
}
