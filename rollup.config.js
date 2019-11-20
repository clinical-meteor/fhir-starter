import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/bundle.js',
    format: 'cjs'
  }, {
    file: 'dist/bundle.module',
    format: 'es'
  }],
  // All the used libs needs to be here
  external: [
    'react', 
    'react-dom',
    'prop-types',
    'react-proptypes',
    '@material-ui/core',
    '@material-ui/styles'
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['ForwardRef', 'isForwardRef', 'isValidElementType']
      },
    })
  ]
};