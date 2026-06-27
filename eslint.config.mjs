import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**']
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: false
        }
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2022,
                ...globals.vitest
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    allowInterfaces: 'always'
                }
            ]
        }
    }
);
