# vite-plugin-app-loading-template

Inject a static loading template into your Vue app. Demo purposes only.

## devDependencies

```shell
pnpm add -D cheerio sass
```

## Usage example

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AppLoadingTemplate from '../path/to/vite-plugin-app-loading-template/index.cjs'


return defineConfig({
  // ... more config
  plugins: [
    vue(),
    // Inject the app loading template
    AppLoadingTemplate(),
  ],
  // ... more config
})
```
