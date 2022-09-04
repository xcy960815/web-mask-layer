import typescript from 'rollup-plugin-typescript2'
import {
    babel
} from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import {
    terser
} from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'
export default {
    input: './src/web-mask-layer.ts',
    output: [
        {
            format: 'umd',
            file: 'dist/web-mask-layer.umd.js',
            name: 'webMaskLayer',
        },
        {
            format: 'es',
            file: 'dist/web-mask-layer.esm.js',
        },
    ],
    plugins: [
        isProduction && del({
            targets: ['dist']
        }),
        isProduction && terser(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        postcss({
            plugins: [autoprefixer()],
        }),
        // 热更新
        !isProduction && livereload(),

        typescript({
            exclude: 'node_modules/**',
            useTsconfigDeclarationDir: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
    ],
}