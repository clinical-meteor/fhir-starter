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
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['ForwardRef', 'isForwardRef', 'isValidElementType']
      },
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      preferBuiltins: false,
    })
  ]
};