<template>
  <v-app>

    <div class="container">
      <v-app-bar
          color="primary"
          height="72"
      >
        <v-app-bar-title>Easy Real-ESRGAN</v-app-bar-title>
        <template v-slot:append>
          <!--Theme Dialog-->
          <v-dialog max-width="60vw">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                  v-bind="activatorProps"
                  icon="mdi-palette"
                  id="theme-activator"
              >
              </v-btn>
              <v-tooltip
                  activator="#theme-activator"
                  location="top"
              >{{ $t('app.tooltips.theme') }}
              </v-tooltip>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card color="background" :title="$t('app.themeSettingsText.title')">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-subtitle-2 text-center">{{ $t('app.themeSettingsText.lightMode') }}</div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('light', 'primary')" :color="settings.color.light.primary"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="top"
                            >{{ $t('app.themeSettingsText.primaryColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('light','secondary')" :color="settings.color.light.secondary"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="top"
                            >{{ $t('app.themeSettingsText.secondaryColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('light', 'background')" :color="settings.color.light.background"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="top"
                            >{{ $t('app.themeSettingsText.backgroundColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="text-subtitle-2 text-center">{{ $t('app.themeSettingsText.darkMode') }}</div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('dark', 'primary')" :color="settings.color.dark.primary"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="bottom"
                            >{{ $t('app.themeSettingsText.primaryColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('dark','secondary')" :color="settings.color.dark.secondary"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="bottom"
                            >{{ $t('app.themeSettingsText.secondaryColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                          <v-btn @click="changeColor('dark', 'background')" :color="settings.color.dark.background"
                                 class="border-md"
                                 icon="">
                            <v-tooltip
                                activator="parent"
                                location="bottom"
                            >{{ $t('app.themeSettingsText.backgroundColor') }}
                            </v-tooltip>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col class="d-flex align-center">
                      <v-row align="center">
                        <v-col cols="12">
                          <div class="text-subtitle-2 text-center">{{ $t('app.themeSettingsText.realTime') }}</div>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-caption">{{ $t('app.themeSettingsText.maxWidth') }}</div>
                          <v-slider
                              prepend-icon="mdi-arrow-expand-horizontal"
                              width="80%"
                              max="2000"
                              min="10"
                              v-model="settings.maxWidth"
                              thumb-label
                              step="1"
                              color="secondary"
                              track-color="grey"></v-slider>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-caption">{{ $t('app.themeSettingsText.minWidth') }}</div>
                          <v-slider
                              prepend-icon="mdi-arrow-collapse-horizontal"
                              width="80%"
                              max="1000"
                              min="10"
                              v-model="settings.minWidth"
                              thumb-label
                              step="1"
                              color="secondary"
                              track-color="grey"></v-slider>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <template v-slot:actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      :text="$t('app.themeSettingsText.cancel')"
                      @click="isActive.value = false"
                  ></v-btn>
                  <v-btn
                      :text="$t('app.themeSettingsText.saveAndRestart')"
                      @click="()=>{isActive.value = false;refreshPage()}"
                  ></v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog
              v-model="colorPickerDialog"
              width="auto"
          >
            <v-card>
              <v-row>
                <v-col>
                  <v-color-picker
                      class="ma-2"
                      v-model="selectedColor"
                      swatches-max-height="400px"
                      show-swatches
                  ></v-color-picker>
                </v-col>
              </v-row>
            </v-card>
            <v-btn color="secondary" @click="confirmColor">{{ $t('app.themeSettingsText.confirm') }}</v-btn>
          </v-dialog>
          <!--Language Menu-->
          <v-btn
              icon="mdi-earth"
              id="menu-activator">
          </v-btn>
          <v-tooltip activator="#menu-activator"
                     location="bottom">语言/Language
          </v-tooltip>
          <v-menu activator="#menu-activator">
            <v-list>
              <v-list-item
                  v-for="(item, index) in SUPPORT_LOCALES"
                  :key="index"
                  :value="index"
              >
                <v-list-item-title @click="setLanguage(index)">{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-tooltip
              :text="$t('app.tooltips.settings')"
              location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                  icon="mdi-cog"
                  class="mr-2"
                  v-bind="props"
                  @click="()=>{if(settings.firstEnter){
                    snackbarText=$t('settings.realtime');
                    snackbar=true}
                    settingWindow=true}">
              </v-btn>
            </template>
          </v-tooltip>
          <!--Settings Dialog-->
          <v-dialog
              v-model="settingWindow"
              transition="dialog-bottom-transition"
              fullscreen
          >
            <v-card color="background">
              <v-toolbar :elevation="8" color="primary">

                <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                    width="auto"
                >
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-tooltip
                        :text="$t('settings.tooltips.reset')"
                        location="bottom"
                        v-bind:activatorProps
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            icon="mdi-restart"
                        >
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card
                        max-width="400"
                        prepend-icon="mdi-restart"
                        :text="$t('settings.resetConfirm')"
                        :title="$t('settings.tooltips.reset')"
                    >
                      <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="ms-auto"
                            @click="isActive.value = false"
                            :text="$t('app.themeSettingsText.cancel')"
                        ></v-btn>
                        <v-btn
                            @click="() => {settings.defaultSet();isActive.value = false}"
                            class="ms-auto"
                            color="red"
                            :text="$t('app.themeSettingsText.confirm')"
                        ></v-btn>
                      </template>
                    </v-card>
                  </template>
                </v-dialog>

                <v-tooltip
                    :text="$t('settings.tooltips.saveAndClose')"
                    location="bottom"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                        icon="mdi-close"
                        class="mr-2"
                        v-bind="props"
                        @click="settingWindow = false"
                    ></v-btn>
                  </template>
                </v-tooltip>

              </v-toolbar>
              <v-main>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                          v-model="settings.tileSize"
                          color="secondary"
                          prepend-inner-icon="mdi-image"
                          :label="$t('settings.tileSize')"
                          variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                          v-model="settings.modelPath"
                          color="secondary"
                          prepend-inner-icon="mdi-folder"
                          :label="$t('settings.modelPath')"
                          variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                          v-model="settings.gpuId"
                          color="secondary"
                          prepend-inner-icon="mdi-desktop-classic"
                          :label="$t('settings.gpuId')"
                          variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                          v-model="settings.threadCount"
                          color="secondary"
                          prepend-inner-icon="mdi-numeric"
                          :label="$t('settings.threadCount')"
                          variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="3">
                      <v-switch
                          v-model="settings.ttaMode"
                          color="secondary"
                          :label="$t('settings.ttaMode')"
                      ></v-switch>
                    </v-col>
                    <v-col cols="3">
                      <v-switch
                          v-model="settings.verboseOutput"
                          color="secondary"
                          :label="$t('settings.verboseOutput')"
                      ></v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                          :label="$t('settings.imageFormat')"
                          color="secondary"
                          prepend-inner-icon="mdi-file-image"
                          v-model="settings.outputFormat"
                          :items="['jpg', 'png', 'webp']"
                          variant="outlined"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-switch
                          v-model="settings.selectFolder"
                          color="secondary"
                          :label="$t('settings.selectFolder')"
                      ></v-switch>
                    </v-col>
                    <v-col cols="3">
                      <v-switch
                          v-model="settings.keepDirectoryStructure"
                          color="secondary"
                          :label="$t('settings.keepDirectoryStructure')"
                      ></v-switch>
                    </v-col>
                    <v-col cols="2">
                      <v-btn @click="logWindow=true">{{ $t('settings.showLog') }}</v-btn>
                    </v-col>
                    <v-dialog
                        v-model="logWindow"
                        transition="dialog-bottom-transition"
                        fullscreen
                    >
                      <v-card color="background">
                        <v-toolbar :elevation="8" color="primary">

                          <v-toolbar-title>{{ $t("settings.logOutput") }}</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn
                              icon="mdi-close"
                              class="mr-2"
                              @click="logWindow = false"
                          ></v-btn>
                        </v-toolbar>
                        <v-textarea auto-grow v-model="logText"></v-textarea>
                      </v-card>
                    </v-dialog>
                    <v-col cols="4">
                      <v-number-input
                          :reverse="false"
                          color="secondary"
                          controlVariant="stacked"
                          :label="$t('settings.exeThread')"
                          :hideInput="false"
                          :inset="false"
                          variant="outlined"
                          v-model="settings.exeThread"
                          :min="1"
                          :max="5"
                      ></v-number-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-main>
            </v-card>
          </v-dialog>
        </template>

      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-expansion-panels v-model="panels" class="mt-3">
              <v-expansion-panel value="panel">
                <v-expansion-panel-title>
                  <template #default>
                    <v-row class="d-flex align-center justify-center">
                      <v-col cols="11" md="10">
                        <v-progress-linear
                            :model-value="mainProgress"
                            bg-color="Background"
                            color="secondary"
                        ></v-progress-linear>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="inputDir"
                          color="secondary"
                          prepend-inner-icon="mdi-import"
                          append-icon="mdi-folder-outline"
                          :label="$t('app.input')"
                          variant="outlined"
                          @click:append="selectFile('input')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="outputDir"
                          color="secondary"
                          append-icon="mdi-folder-outline"
                          prepend-inner-icon="mdi-export"
                          :label=" $t('app.output')"
                          variant="outlined"
                          @click:append="selectFile('output')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="8" md="10">
                      <v-select
                          :label="$t('app.model')"
                          color="secondary"
                          prepend-inner-icon="mdi-atom"
                          v-model="model"
                          :items="modelList"
                          variant="outlined"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-number-input
                          :reverse="false"
                          color="secondary"
                          controlVariant="stacked"
                          :label="$t('app.scale')"
                          :hideInput="false"
                          :inset="false"
                          variant="outlined"
                          v-model="scale"
                          :min="2"
                          :max="4"
                      ></v-number-input>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          <v-row>
            <v-col v-for="(file, index) in queue">
              <v-hover v-slot="{ isHovering, props }">
                <v-card v-bind="props">
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-img :max-width="settings.maxWidth"
                             :min-width="settings.minWidth"
                             :src="convertFileSrc(file.path)"
                      >
                        <v-expand-transition>
                          <v-card
                              v-if="isHovering"
                              class="d-flex transition-fast-in-fast-out"
                              color="black-lighten-4"
                              style="opacity: 0.3"
                              width="100%"
                              height="100%">
                            <v-row no-gutters>
                              <v-col class="d-flex justify-center align-center">
                                <v-btn @click="removeImage(index)" icon="mdi-close" flat></v-btn>
                              </v-col>
                            </v-row>

                          </v-card>
                        </v-expand-transition>
                      </v-img>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <v-progress-linear :model-value="processesProgress[index]"
                                         bg-color="Background"
                                         color="secondary"></v-progress-linear>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-fab
          :icon="runFabIcon"
          class="mb-4 mr-10"
          location="bottom end"
          size="64"
          color="secondary"
          app
          appear
          @click="()=>{
            if(runFabIcon==='mdi-stop'){
              stop();
            }else if(runFabIcon==='mdi-play'){
              run()
            }
          }"
      ></v-fab>
    </div>
    <v-snackbar
        v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
            color="secondary"
            variant="text"
            @click="snackbar = false"
        >
          {{ $t('app.themeSettingsText.confirm') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import i18n, {SUPPORT_LOCALES} from './plugins/i18n.ts'
import {Child, Command} from '@tauri-apps/api/shell';
import {listen} from '@tauri-apps/api/event';
import {open} from '@tauri-apps/api/dialog';
import {extname, resolveResource} from '@tauri-apps/api/path';
import {readDir} from '@tauri-apps/api/fs';
import {convertFileSrc, invoke} from '@tauri-apps/api/tauri'
import {VNumberInput} from 'vuetify/labs/VNumberInput'
import {downloadDir} from '@tauri-apps/api/path';
import {globalSettings} from './plugins/settings.ts';
import {useTheme} from "vuetify";
import {useI18n} from "vue-i18n";

//主题
const theme = useTheme()
//长期设置
const settings = globalSettings()
//常用设置
//多语言(JavaScript用)
const {t} = useI18n({locale: settings.locale, fallbackLocale: 'zh-CN'});
//折叠面板
const panels = ref(['panel']);
//fab图标
const runFabIcon = ref('mdi-play');
//输入路径
const inputDir = ref('');
//输出目录, 默认为用户下载目录.
const outputDir = ref('');
//模型列表, 来源于resources\models.
const modelList = ref<string[]>([]);
//用户已选模型
const model = ref('');
//放大倍数, 默认为4, 可选：2、3、4.
const scale = ref('4');
//设置窗口
const settingWindow = ref(false);
//输出窗口
const logWindow = ref(false);
//输出
const logText = ref('');
//消息条
const snackbar = ref(false);
//消息条文本
const snackbarText = ref('');

//设置语言
function setLanguage(index: string) {
  settings.locale = index;
  let locale = ref(i18n.global.locale)
  locale.value = index;
}

let tombstone: Array<Child | null> = [];
const persistentRun = ref(true);
const queue = ref();
const processesProgress = ref([0]);
const runningIndex = ref(0);
const mainProgress = computed(() => {
  let sum = processesProgress.value.reduce((acc, curr) => acc + curr, 0);
  if (queue.value === undefined) {
    return 0
  } else {
    return Math.round(sum / (queue.value.length))
  }
})

//启动程序
async function run() {
  persistentRun.value = true;
  processesProgress.value = [];
  runningIndex.value = 0;
  tombstone = [];
  //折叠面板
  panels.value = [];
  //fab图标变为加载中
  runFabIcon.value = 'mdi-dots-horizontal';
  queue.value = await solveDir(inputDir.value)
  let threads: number = settings.exeThread;
  if (queue.value.length === 1) {
    threads = 1;
  }
  let processes: Promise<string>[] = [];
  while (persistentRun && runningIndex.value < queue.value.length) {
    processes = []
    //线程
    for (let i = 0; i < threads; ++i) {
      processes.push(runRealesrgan(queue.value[runningIndex.value], runningIndex.value++, tombstone));
    }
    await Promise.allSettled(processes).then((states) => {
      states.forEach((item) => {
        if (item.status === "rejected") {
          stop();
        }
      })
    })
  }
  runFabIcon.value = 'mdi-play';
}

function removeImage(index: number) {
  if (index > runningIndex.value && queue.value !== undefined) {
    queue.value.splice(index, 1)
    processesProgress.value.splice(index, 1)
  }
}

function stop() {
  persistentRun.value = false;
  tombstone.forEach((child) => {
    if (child === null) {
      return;
    } else {
      child.kill();
      processesProgress.value = [0];
    }
    return;
  })

}

//执行Realesrgan命令
function runRealesrgan(file: { path: string, name: string }, runningIndex: number, tombstone: Array<Child | null>) {
  return new Promise<string>(async (resolve, rejected) => {
    if (file.name === '') {
      rejected('Wrong file.');
      return;
    }
    let isPathSeparator = outputDir.value.endsWith('/') || outputDir.value.endsWith('\\');
    let output;
    if (settings.keepDirectoryStructure) {
      let relativeDir = file.path.replace(inputDir.value, ''); // inputBaseDir 是输入目录的基准路径
      relativeDir = relativeDir.replace('\\\\?\\\\', '');
      output = outputDir.value + relativeDir;
      if (isPathSeparator) {
        output = outputDir.value + relativeDir;
      } else {
        output = outputDir.value + '\\' + relativeDir;
      }
    } else {
      if (isPathSeparator) {
        output = outputDir.value + file.name;
      } else {
        output = outputDir.value + '\\' + file.name;
      }
    }
    let args: string[] = [
      "-i", file.path,
      "-o", output,
      "-n", model.value,
      "-s", scale.value,
      "-t", settings.tileSize,
      "-m", settings.modelPath,
      "-g", settings.gpuId,
      "-j", settings.threadCount,
      "-f", settings.outputFormat,
    ];
    if (settings.ttaMode === true)
      args.push("-x");
    if (settings.verboseOutput === true)
      args.push("-v");

    const command = new Command('realesrgan', args, {encoding: 'utf8'});
    console.log(command)
    command.on('close', data => {
      tombstone[runningIndex] = null;
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
      if (data.code === 0) {
        resolve("Success.");
        processesProgress.value[runningIndex] = 100
      } else {
        rejected(data.code);
      }
    });
    command.on('error', error => console.error(`command error: "${error}"`));
    command.stdout.on('data', line => {
      logText.value += line + '\n';
    });
    command.stderr.on('data',
        line => {
          logText.value += line + '\n';
          if (line.includes('%')) {
            runFabIcon.value = 'mdi-stop';
            processesProgress.value[runningIndex] = parseInt(line.replace('%', ''), 10)
          }
        });
    tombstone[runningIndex] = await command.spawn();
  })
}


//选择文件
async function selectFile(selectType: string) {
  let selected = await open({
    directory: settings.selectFolder,
    multiple: false,
  });
  if (selected !== null) {
    if (selected.constructor !== Array)
      switch (selectType) {
        case 'input':
          inputDir.value = <string>selected!;
          await setQueue()
          break
        case 'output':
          outputDir.value = <string>selected!;
          break
        default:
          break
      }
  }
}

//获取模型列表
const getModelList = async (): Promise<string[]> => {
  let modelsDir: string = await resolveResource('resources/models');
  let models = await readDir(modelsDir, {recursive: true});
  let modelNames: string[] = [];
  for (let entry of models) {
    modelNames.push(entry.path);
  }
  modelNames = modelNames
      .filter((path: string) => path.endsWith('.bin'))
      .map((path: string) => {
        let parts = path.split('\\');
        let fileName = parts[parts.length - 1];
        return fileName.split('.').slice(0, -1).join('.');
      });
  return modelNames;
};

//刷新模型列表
const refreshModelList = async () => {
  modelList.value = await getModelList();
  model.value = modelList.value[0];
};

const colorPickerDialog = ref(false);
const changingColor = ref('');
const changingColorMode = ref('');
const selectedColor = ref('')

function changeColor(mode: string, name: string) {
  changingColor.value = name;
  changingColorMode.value = mode;
  colorPickerDialog.value = true;
}

function confirmColor() {
  if (changingColorMode.value === 'light') {
    switch (changingColor.value) {
      case 'primary':
        settings.color.light.primary = selectedColor.value;
        break;
      case'secondary':

        settings.color.light.secondary = selectedColor.value;
        break;
      case 'background':
        settings.color.light.background = selectedColor.value;
        break;
      default:
        break;
    }
  } else if (changingColorMode.value === 'dark') {
    switch (changingColor.value) {
      case 'primary':
        settings.color.dark.primary = selectedColor.value;
        break;
      case'secondary':
        settings.color.dark.secondary = selectedColor.value;
        break;
      case 'background':
        settings.color.dark.background = selectedColor.value;
        break;
      default:
        break;
    }
  }
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = theme.global.current.value.dark ? 'dark' : 'light'
  colorPickerDialog.value = false;
}

function refreshPage() {
  window.location.reload();
}

function changeScrollColor(theme: string) {
  let backgroundColor = '#FCFCFC'
  let thumbColor = '#8B8B8B'
  if (theme === 'light') {
  } else if (theme === 'dark') {
    backgroundColor = '#2C2C2C'
    thumbColor = '#9F9F9F'
  }
  let scrollStyle = `
      <style css-id="scroll">
        /* 滚动条 */
        /*定义整个滚动条高宽及背景：高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar
        {
            width:12px;
            background-color:${backgroundColor};
        }
        /*定义滚动条轨道：内阴影+圆角*/
        ::-webkit-scrollbar-track
        {
            width: 10px;
            border-radius: 30px;
            background-color:${backgroundColor};
        }
        /*定义滑块：内阴影+圆角*/
        ::-webkit-scrollbar-thumb
        {
            width: 3px;
            border: 2px solid transparent;
            border-radius: 9px;
            background-clip: content-box;
            background-color:${thumbColor};
        }
      </style>

    `
  let div = document.createElement("div");
  let _scrollNode = document.querySelector("[css-id='scroll']") || null;
  if (_scrollNode) {
    document.querySelector("head")!.removeChild(document.querySelector("[css-id='scroll']")!);
  }
  div.innerHTML = scrollStyle;
  let newScrollNode = div.querySelector("[css-id='scroll']");
  document.getElementsByTagName("head")[0].appendChild(newScrollNode!)
}

function basename(path: string): string {
  return path.split(/[\\/]+/).pop()!;
}


async function isExtValid(name: string) {
  return await extname(name) in {png: 0, jpg: 0, webp: 0};
}

async function solveDir(dir: string, recursive: boolean = true) {
  dir = dir.replace(/\\/g, '/');
  let result: { path: string, name: string }[] = [];
  try {
    if (await invoke<boolean>('is_dirs', {'path': inputDir.value})) {
      let files = await invoke<string[]>('read_dir', {'dir': dir, 'recursive': recursive})
      for (let file of files) {
        if (await isExtValid(file)) {
          result.push({path: file, name: basename(file)});
        } else {
          snackbarText.value = t('app.extNotValid') + basename(file)
          snackbar.value = true;
        }
      }
    } else if (await isExtValid(dir)) {
      result = [{path: dir, name: basename(dir)}]
    } else {
      snackbarText.value = t('app.extNotValid') + basename(dir)
      snackbar.value = true;
    }
  } catch (error) {
    throw error;
  }
  return result;
}


//监听暗色模式切换
window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', (blackMode) => {
  let prefersDarkMode = blackMode.matches;
  if (prefersDarkMode) {
    theme.global.name.value = 'dark'
    changeScrollColor('dark')
  } else {
    theme.global.name.value = 'light'
    changeScrollColor('light')
  }
});

async function setQueue() {
  queue.value = await solveDir(inputDir.value)
}

onMounted(() => {
  console.log(navigator.language);
  //自适应黑暗模式
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.global.name.value = 'dark'
    changeScrollColor('dark')
  }
  //如果是第一次进入软件, 初始化设置
  if (settings.firstEnter)
    settings.defaultSet();
  //监听文件拖拽
  listen('tauri://file-drop', (event: { payload: string }) => {
    inputDir.value = event.payload[0];
    setQueue()
  });
  //刷新文件列表
  refreshModelList();
  //获取下载文件夹路径并填入outputDir
  if(settings.outputFolder===''){
    downloadDir().then((result) => {
      outputDir.value = result;
  })}else{
    outputDir.value = settings.outputFolder;
  }
});

</script>

<style>
html {
  overflow: auto !important;
}
</style>