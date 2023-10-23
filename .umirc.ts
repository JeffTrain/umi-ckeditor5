import {defineConfig} from '@umijs/max';

import CKEditorWebpackPlugin from "@ckeditor/ckeditor5-dev-webpack-plugin";

import path from "path";

import {styles} from "@ckeditor/ckeditor5-dev-utils";

import fs from "fs";

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
    },
    // devtool: "source-map",
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
        },
        {
            name: '权限演示',
            path: '/access',
            component: './Access',
        },
        {
            name: ' CRUD 示例',
            path: '/table',
            component: './Table',
        },
    ],
    npmClient: 'yarn',
    // WEBPACK_FS_CACHE_DEBUG: 1,
    // plugins:[require.resolve('./chainWebpackConfig')],
    // postcssLoader: {
    //   postcssOptions: styles.getPostCssConfig({
    //     themeImporter: {
    //       themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
    //     },
    //     minify: true,
    //   }),
    // },
    // urlLoaderExcludes: [/.svg$/],
    chainWebpack: (config) => {
        config.plugin('CKEditorWebpackPlugin').use(CKEditorWebpackPlugin, [{}]);
        config.module
            .rule('svg')
            .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
        config.module
            .rule('css')
            .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
        config.module
            .rule('cke-svg')
            .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
            .use('raw-loader')
            .loader('raw-loader');

        const ckeCss = config.module
            .rule('cke-css')
            .test(/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/);
        let postCssConfig = styles.getPostCssConfig({
            themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
            },
            minify: true,
        });
        console.log('postCssConfig = ', postCssConfig);

        ckeCss
            .use('style-loader')
            .loader('style-loader')
            .end()
            .use('css-loader')
            .loader('css-loader')
            .end()
            .use('postcss-loader')
            .loader('postcss-loader')
            .options({
                    postcssOptions: postCssConfig,
                }
            )
        ;
    },
});
