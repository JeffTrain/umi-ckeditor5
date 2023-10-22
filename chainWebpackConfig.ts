import { IApi } from 'umi';
import {merge} from 'webpack-merge'
const sass:any = require.resolve( 'file-loader' );


const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

export default (api: IApi) => {
    // api.modifyWebpackConfig((memo, { webpack, env }) => {
    //     console.log("==========");
    //     console.log(memo.module?.rules);
    //     console.log("==========");
        
    //     return memo;
    // })
      
    api.chainWebpack(( memo, { webpack, env}) => {
        memo.module
        .rule('ckrawloader')
        .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
        .use("babel")
        .loader("raw-loader")
        
        memo.module
        .rule('ckpostcssloader')
        .test(/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/)
        .use("babel")
        .loader("style-loader")
        .options(
            {
                injectType: 'singletonStyleTag',
                attributes: {
                'data-cke': true
                }
            }
        )//第1个 loader
        .end()
        .use("babel3")
        .loader("css-loader")//第2个 loader
        .end()
        .use("babel2")
        .loader('postcss-loader')
        .options(
            {
                postcssOptions: styles.getPostCssConfig( 
                    {
                        themeImporter: {
                            themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                        },
                        minify: true
                    } 
                )
            }
        )
        .end()//第3个 loader

        memo.module
        .rule('ckcssRegex')
        .test(cssRegex)
        .exclude
        .add([
            cssModuleRegex,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        ])
        .end()

        memo.module
        .rule('ckcssModuleRegex')
        .test(cssModuleRegex)
        .exclude
        .add([
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        ])
        .end()

        const svgRule = memo.module.rule('svg')
        // svgRule.uses.clear()
        console.log("svgRule.use===============");
        console.log(Object.keys(svgRule.values()));
        // svgRule.uses.forEach((item) => {
        //     console.log(item);
        // });
        console.log("svgRule.use===============");


        memo.module
        .rule('svgr')
        .use('ckfileloader')
        // .loader(`require.resolve('file-loader')`)
        .loader(require.resolve("file-loader"))
        .options({
            exclude: [
                /\.(js|mjs|jsx|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
            ],
            name: 'static/media/[name].[hash].[ext]',
    
        }).end()

        memo.module
        .rule('svg')
        .use('ckfileloader')
        .loader(require.resolve("file-loader"))
        .options({
            exclude: [
                /\.(js|mjs|jsx|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
            ],
            name: 'static/media/[name].[hash].[ext]',
    
        })

        
        console.log('===============');
        // console.log(memo.toString());
        console.log('===============');
    })
};