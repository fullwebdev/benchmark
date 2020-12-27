import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  plugins: [
    minifyHTML({
      options: {
        minifyOptions: {
          keepClosingSlash: true
        }
      }
    }),
    resolve(),
    terser({
      ecma: 2017,
      compress: {
        unsafe: true,
      },
      output: {
        comments: false,
        inline_script: false,
      },
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    })
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'dist/index.js',
    format: 'iife'
  }
};
