const translation = {
  labelInputDirective: {
    'en-US': 'en Label',
    'fr': 'fr Label'
  },
  placeholderInputDirective: {
    'en-US': 'en Placeholder',
    'fr': 'fr Placeholder'
  }
}

const navigatorLanguage = navigator.language

const tran = {

  beforeMount(el, binding, vnode, prevVnode) {
    // ex : v-tran="`labelInputDirective`" or v-tran:placeholder="`placeholderInputDirective`"
    if (typeof binding.value === 'string') {
      if (binding.arg === undefined) {
        el.innerHTML = translation?.[binding.value]?.[navigatorLanguage]
      } else {
        el[binding.arg] = translation?.[binding.value]?.[navigatorLanguage]
      }
    }

    // ex : v-tran.placeholder.title
    Object.keys(binding.modifiers).forEach((key) => {
      if (el[key] !== undefined) {
        el[key] = translation?.[binding.value]?.[navigatorLanguage]
      }
    })

    // ex : { placeholder: 'placeholderInputDirective', title: 'placeholderInputDirective' }
    Object.keys(binding.value).forEach((key) => {
      if (el[key] !== undefined) {
        el[key] = translation?.[binding.value?.[key]]?.[navigatorLanguage]
      }
    })
  },

}

// ex : tran('labelInputDirective')
const vTrans = (value) => {
  return translation?.[value]?.[navigatorLanguage]
}

export {
  vTrans
}

export default {
  install(Vue, options) {
    Vue.directive('tran', tran);
  }
}
