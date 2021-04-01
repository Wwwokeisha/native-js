import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribes = []
    // this.storeSub = null

    this.prepare()
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
  $dispatch(action) {
    this.store.dispatch(action)
  }
  //сюда приходят изменения по тем полям , на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
  // инициализируем компонент / добавляем DOM слушателей
  init() {
    this.initDomListeners()
  }
  //Удаляем компонент / чистим слушателей
  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
    // this.store.unsubscribe()
  }
}