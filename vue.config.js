module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/flex-system.scss";
          @import "@/assets/scss/font.scss";
          @import "@/assets/scss/global.scss";
          @import "@/assets/scss/button.scss";
          @import "@/assets/scss/form.scss";
          @import "@/assets/scss/box.scss";
          @import "@/assets/scss/margins-paddings.scss";
        `
      }
    }
  },
  devServer: {
    host: 'localhost'
  }
}