export const useAsideStore = defineStore("asideStore", {
  state: () => {
    return {
      isCollapse: false,
    };
  },
  actions: {
    asideToggle() {
      this.$patch((state) => {
        state.isCollapse = !state.isCollapse;
      });
    },
  },
});
