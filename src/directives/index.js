export const imgError = {
  inserted: (el, { value }) => {
    // if (!el.src) {
    //   el.src = value
    // }
    el.onerror = () => {
      el.src = value
    }
  }
}
