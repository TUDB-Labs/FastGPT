const showToast = (that, { title, content, type }) => {
  that.$bvToast.toast(content || "这是一条 Toast 消息", {
    title: title || "提示消息",
    variant: type || "success",
    toaster: "b-toaster-top-center",
    autoHideDelay: 3000,
  });
}

export default showToast
