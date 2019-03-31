import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        globals: { react: 'React'}
    },
    // All the used libs needs to be here
    external: [
        'react',
        'react-proptypes'
    ],
    plugins: [
        resolve(),
        commonjs({
            exclude: 'src/**'
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}