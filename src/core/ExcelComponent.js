import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribes = []

    this.prepare()
    console.log(options)
  }
  // Настраиваем наш компонент до init
  prepare() {}
  //Возвращает шаблон компонента
  toHTML() {
    return ``
  }
  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  //подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }
  // инициализируем компонент / добавляем DOM слушателей
  init() {
    this.initDomListeners()
  }
  //Удаляем компонент / чистим слушателей
  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
  }
}