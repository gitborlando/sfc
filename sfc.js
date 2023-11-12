function sfc() {
  let js = document.querySelector('[type="text/babel"]').innerHTML
  let reg = /\$:\s*(\w+)\s*=/
  let returns = []
  while (reg.test(js)) {
    js = js.replace(reg, (_, $1) => {
      returns.push($1)
      return `const ${$1} =`
    })
  }
  reg = /(ref|reactive)\(/
  while (reg.test(js)) {
    js = js.replace(reg, 'Vue.$1 (')
  }
  js = js + `\n  return {${returns.toString()}}`
  js = `\nfunction setup() {\n  ${js}\n}`
  js = js + `\n\nVue.createApp({ setup }).mount('#app')`
  const script = document.createElement('script')
  script.innerHTML = js
  document.head.appendChild(script)
}
setTimeout(sfc, 20)
