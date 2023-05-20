/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export const resolvePkgPath = (pkgName, isDist = false) => {
  return `${isDist ? distPath : pkgPath}/${pkgName}`;
};

export const getPackageJSON = pkgName => {
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(str);
};

export const getBaseRollupPlugins = ({
  alias = { __LOG__: false, preventAssignment: true },
  typescript = {},
} = {}) => {
  return [replace(alias), cjs(), ts(typescript)];
};
