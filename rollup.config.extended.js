import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';

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
    'react-proptypes'
  ],
  plugins: [
    resolve(),
    progress(),
    nodeResolve({
      browser: true,
    }),
    json(),
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'react-is': ['ForwardRef', 'isForwardRef', 'isValidElementType'],
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      },
    }),
    babel({
      babelrc: false,
      presets: [
        ['es2015', { modules: false }], 
        'stage-1', 
        'react',
        '@babel/env', 
        '@babel/preset-react'
      ],
      plugins: ['external-helpers'],
      exclude: 'node_modules/**'
    }),
    visualizer()
  ]
};