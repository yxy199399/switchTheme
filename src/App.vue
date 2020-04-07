<template>
  <div id="app">
    <el-container>
      <el-header
        height="80px"
        :style="{ 'background-color': Theme['$--color-primary'] }"
      >
        <img
          src="http://placehold.it/146x38/"
          alt="element-logo"
          class="header-logo"
        />
        <ul class="header-operations">
          <li @click="showThemeDialog">切换主题颜色</li>
          <li>帮助</li>
          <li>
            语言
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside class="menu" width="auto">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :background-color="Theme['$--color-primary']"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <el-dialog
      center
      :visible.sync="themeDialogVisible"
      title="切换主题色"
      width="400px"
    >
      <el-form
        :model="colors"
        :rules="rules"
        ref="form"
        class="theme-form"
        label-position="top"
        label-width="70px"
      >
        <el-form-item label="主题色" prop="primary">
          <el-color-picker v-model="colors.primary"></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">切换</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import generateColors from "./utils/color";
export default {
  name: "App",
  data() {
    const colorValidator = (rule, value, callback) => {
      if (!value) {
        return callback(
          new Error(this.langConfig.validate.required[this.lang])
        );
      } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error(this.langConfig.validate.format[this.lang]));
      } else {
        callback();
      }
    };
    return {
      themeDialogVisible: false,
      colors: {
        primary: this.Theme["$--color-primary"]
      },
      rules: {
        primary: [{ validator: colorValidator, trigger: "blur" }]
      },
      originalStyle: this.Theme["$--color-primary"]
    };
  },
  methods: {
    showThemeDialog() {
      this.themeDialogVisible = true;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.themeDialogVisible = false;
          this.primaryColor = this.colors.primary;
          this.colors = Object.assign(
            {},
            this.colors,
            generateColors(this.colors.primary)
          );
          this.canDownload = true;
          this.writeNewStyle();
        } else {
          return false;
        }
      });
    },
    writeNewStyle() {
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });
      this.Theme["$--color-primary"] = cssText;
      console.log(this.colors, cssText);
      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
