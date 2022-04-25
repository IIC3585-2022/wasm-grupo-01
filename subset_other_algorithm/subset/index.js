import Module from './wasmSubset.js'
import crunchingJS from './jsSubset.js';

const generateArrayC = (list, mod) => {
  const arrayC = mod._calloc(list.length, 4)
  for (let i = 0; i < list.length; i++) {
    mod.setValue(arrayC + i * 4, list[i], "i32");
  }
  return arrayC;
}

const runJS = (list) => {
  let startDateJS = window.performance.now();
  const arrOfNum = list.map(str => {
    return Number(str);
  })
  const resultJS = crunchingJS(arrOfNum, arrOfNum.length);
  let endDateJS = window.performance.now();
  return {startDateJS, resultJS, endDateJS}
}

const runWasm = (mod, arrayC, list) => {
  let startDateC = window.performance.now();
  const resultC = mod._checkEqualSum(arrayC, list.length);
  let endDateC = window.performance.now();
  return {startDateC, resultC, endDateC}
}

const runner = (mod) => {
  const list = document.querySelector('#input').value.split(',');
  if(list.length) {
    document.querySelector('#loading').innerHTML = 'Cargando ...';
    //document.querySelector('#list').innerHTML = JSON.stringify(list);
    const arrayC = generateArrayC(list, mod);
    const {startDateC, endDateC} = runWasm(mod, arrayC, list);
    mod._free(arrayC);
    document.querySelector('#wasm').innerHTML = `${Math.round(((endDateC - startDateC) + Number.EPSILON) * 100) / 100} ms`
    const {startDateJS, resultJS, endDateJS} = runJS(list);
    //const [subSet1, subSet2, subSet3] = resultJS;

    document.querySelector('#list').innerHTML = resultJS[0].length ? JSON.stringify(resultJS) : '';
    document.querySelector('#js').innerHTML = `${Math.round(((endDateJS - startDateJS) + Number.EPSILON) * 100) / 100} ms`
    document.querySelector('#loading').innerHTML = resultJS[0].length ? 'Tiene división' : 'No tiene división';
  }

}

Module().then((mod) => {
    const button = document.querySelector('#button');
    button.addEventListener('click', () => runner(mod, button))
});