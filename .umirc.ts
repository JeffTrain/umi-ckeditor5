import { defineConfig } from '@umijs/max';
import merge from 'webpack-merge';
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const fs = require('fs');
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
  inlineLimit: 0,
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
    
    // config.plugin('CKEditorWebpackPlug in').use(CKEditorWebpackPlugin, [{}]); 
    
    // config.module
    //   .rule('svg')
    //   .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
      
    config.module
      .rule('css')
      .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
    
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');
  
    const ckeCss = config.module
    .rule( 'cke-css' )
    .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
    .use('style-loader')
    .loader('style-loader')
    .options({
      injectType: 'singletonStyleTag',
      attributes: {
          'data-cke': true
      }
    })
    .end()
    .use('css-loader')
    .loader('css-loader')
    .end()
    // .use( 'postcss-loader' )
    // .loader( 'postcss-loader' )
    // .tap( () => {
    //     return styles.getPostCssConfig( {
    //         themeImporter: {
    //             themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
    //         },
    //         minify: true
    //     } );
    // } );

    config.module
    .rule('svg')
    .use('svgo-loader')
    .clear()

    config.module
      .rule('svgr')
      .use('svgr-loader')
      .clear()

    config.module
      .rule('svgr')
      .use('url-loader')
      .clear()
      // .tap(((options)=>{
      //   return merge(options, {
      //     limit: 0,
      //   })
      // }))


  //   config.module
  //     .rule('cke-svg')
  //     .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
  //     .use('raw-loader')
  //     .loader('raw-loader');

  //   config.module
  //     .rule('cke-css')
  //     .test(/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/)
  //     .use('style-loader')
  //     .loader('style-loader')
  //     .options({
  //       injectType: 'singletonStyleTag',
  //       attributes: {
  //           'data-cke': true
  //       }
  //     })
  //     .end()
  //     .use('css-loader')
  //     .loader('css-loader')
  //     .end()
  //     .use('postcss-loader')
  //     .loader('postcss-loader')
  //     .options(
  //       styles.getPostCssConfig({
  //         themeImporter: {
  //           themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
  //         },
  //         minify: true,
  //       })
  //     )

  //   // config.module
  //   //   .rule('svg')
  //   //   .use('svgo-loader')
  //   //   .clear()
  //     // .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    config.module
      .rule('svgr')
      .delete('type')
      .issuer({
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      })
      .test(/\.svg$/)
      .use('svgr-loader')
      .loader(require.resolve('@svgr/webpack'))
      .options(
        {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        }
      )
      .end()
  //     .use('url-loader')
  //     .clear()
  //     .end()
      .use("file-loader")
      .loader(require.resolve('file-loader'))
      .options(
        {
          // Exclude `js` files to keep the "css" loader working as it injects
          // its runtime that would otherwise be processed through the "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpack's internal loaders.
          exclude: [
            /\.(js|mjs|jsx|ts|tsx)$/,
            /\.html$/,
            /\.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
          ],
          name: 'static/media/[name].[hash].[ext]',
        }
      )
  //     // .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

  //     /*
  //   config.module
  //     .rule('css')
  //     .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
  //     */

  //   config.module
  //     .rule('css')
  //     .test(cssRegex)
  //     .sideEffects(true)
  //     // .exclude.add(path.join(__dirname, 'node_modules', '@ckeditor').join(cssModuleRegex));
  //     .exclude
  //     .add([cssModuleRegex,/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/])
      
    

    fs.writeFileSync('./webpack.js', config.toString());
  },
});

