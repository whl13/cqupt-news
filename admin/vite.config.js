import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()],// 自动按需加载Element Plus组件
        dts: true, // 生成组件类型声明
      }),
      viteCompression({// Gzip压缩
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
      }),
      visualizer({// 打包分析
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {// 自定义代码分割
            if (id.includes('element-plus')) return 'element-plus'
            if (id.includes('@wangeditor')) return 'wangeditor'
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    transpileDependencies: true,
    server: {
      proxy: {
        '/adminapi': {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          pathRewrite: {
            '^/webapi': ''
          }
        }
      }
    }
  })
}
