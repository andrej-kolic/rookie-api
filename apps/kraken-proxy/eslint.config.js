import { config as expressConfig } from '@repo/eslint-config/express';
import globals from 'globals';

/** @type {import("eslint").Linter.Config} */
export default [...expressConfig];
