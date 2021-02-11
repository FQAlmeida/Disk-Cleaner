const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

const isDevelopment = process.env.NODE_ENV !== "production"

rules.push({
    test: /\.module\.s(a|c)ss$/,
    loader: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: true,
                sourceMap: isDevelopment
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: isDevelopment
            }
        }
    ]
},
    {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment
                }
            }
        ]
    });

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".sass"]
    },
};
