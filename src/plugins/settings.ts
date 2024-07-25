import {createPinia, defineStore} from "pinia";
import {ref} from "vue";
import persisitedstate from "pinia-plugin-persistedstate";

const pinia = createPinia()
pinia.use(persisitedstate);
/**
 * 全局设置
 * 储存于localStorage
 *
 * tile-size         tile size (>=32/0=auto, default=0) can be 0,0,0 for multi-gpu
 * model-path        folder path to the pre-trained models. default=models
 * model-name        model name (default=realesr-animevideov3, can be realesr-animevideov3 | realesrgan-x4plus | realesrgan-x4plus-anime | realesrnet-x4plus)
 * gpu-id            gpu device to use (default=auto) can be 0,1,2 for multi-gpu
 * load:proc:save    thread count for load/proc/save (default=1:2:2) can be 1:2,2,2:2 for multi-gpu
 * ttaMode           tta mode
 * output image format (jpg/png/webp, default=ext/png)
 * verbose output
 */
export const globalSettings = defineStore(
    'settings',
    () => {
        const tileSize = ref('');
        const modelPath = ref('');
        const gpuId = ref('');
        const threadCount = ref('');
        const ttaMode = ref<boolean>();
        const outputFormat = ref('');
        const verboseOutput = ref<boolean>();
        const firstEnter = ref(true);
        const locale = ref('zh-CN');
        const color = ref({
            'light': {
                primary: '#FFDBD3',
                secondary: '#77574F',
                background: '#FFF8F6'
            },
            'dark': {
                primary: '#FFB4A3',
                secondary: '#E7BDB4',
                background: '#1A110F'
            }
        });
        const maxWidth = ref(400);
        const minWidth = ref(200);
        const selectFolder = ref(false);
        const exeThread = ref(1);
        const keepDirectoryStructure = ref(false);
        const outputFolder = ref('');
        function defaultSet() {
            tileSize.value = '0';
            modelPath.value = 'models';
            gpuId.value = 'auto';
            threadCount.value = '1:2:2';
            ttaMode.value = false;
            outputFormat.value = 'png';
            verboseOutput.value = false;
            firstEnter.value = false;
            locale.value = 'en';
            maxWidth.value = 400;
            minWidth.value = 200;
            selectFolder.value = false;
            exeThread.value = 1;
            keepDirectoryStructure.value = false;
        }

        return {
            firstEnter,
            threadCount,
            tileSize,
            modelPath,
            gpuId,
            ttaMode,
            outputFormat,
            verboseOutput,
            defaultSet,
            locale,
            color,
            maxWidth,
            minWidth,
            selectFolder,
            exeThread,
            keepDirectoryStructure,
            outputFolder
        }
    },
    {
        persist: true,
    }
)