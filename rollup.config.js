const fs = require('fs')
const path = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const { dts } = require('rollup-plugin-dts')
const terser = require('@rollup/plugin-terser')

const input = path.resolve(__dirname, 'src/index.ts')
const distDir = path.resolve(__dirname, 'dist')
const typesDir = path.resolve(__dirname, 'types')

fs.rmSync(distDir, { recursive: true, force: true })
fs.rmSync(typesDir, { recursive: true, force: true })
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(typesDir, { recursive: true })

module.exports = [
  {
    input,
    output: [
      {
        file: path.join(distDir, 'web-mask-layer.es.js'),
        format: 'es',
      },
      {
        file: path.join(distDir, 'web-mask-layer.umd.js'),
        format: 'umd',
        name: 'WebMaskLayer',
      },
      {
        file: path.join(distDir, 'web-mask-layer.umd.min.js'),
        format: 'umd',
        name: 'WebMaskLayer',
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve.nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      postcss({
        extract: path.join(distDir, 'web-mask-layer.css'),
        minimize: true,
      }),
      typescript({
        tsconfig: './tsconfig.rollup.json',
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: path.join(typesDir, 'web-mask-layer.d.ts'),
        format: 'es',
      },
    ],
    external: [/\.css$/],
    plugins: [
      dts({
        tsconfig: './tsconfig.rollup.json',
      }),
    ],
  },
]
