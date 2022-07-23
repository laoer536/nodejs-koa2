var __defProp = Object.defineProperty,
  __getOwnPropSymbols = Object.getOwnPropertySymbols,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __propIsEnum = Object.prototype.propertyIsEnumerable,
  __defNormalProp = (e, t, r) =>
    t in e ? __defProp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r),
  __spreadValues = (e, t) => {
    for (var r in t || (t = {})) __hasOwnProp.call(t, r) && __defNormalProp(e, r, t[r])
    if (__getOwnPropSymbols)
      for (var r of __getOwnPropSymbols(t)) __propIsEnum.call(t, r) && __defNormalProp(e, r, t[r])
    return e
  }
function makeMap(e, t) {
  const r = Object.create(null),
    n = e.split(',')
  for (let i = 0; i < n.length; i++) r[n[i]] = !0
  return t ? (e) => !!r[e.toLowerCase()] : (e) => !!r[e]
}
const specialBooleanAttrs = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  isSpecialBooleanAttr = makeMap(specialBooleanAttrs)
function includeBooleanAttr(e) {
  return !!e || '' === e
}
function normalizeStyle(e) {
  if (isArray$1(e)) {
    const t = {}
    for (let r = 0; r < e.length; r++) {
      const n = e[r],
        i = isString$1(n) ? parseStringStyle(n) : normalizeStyle(n)
      if (i) for (const e in i) t[e] = i[e]
    }
    return t
  }
  return isString$1(e) || isObject$2(e) ? e : void 0
}
const listDelimiterRE = /;(?![^(]*\))/g,
  propertyDelimiterRE = /:(.+)/
function parseStringStyle(e) {
  const t = {}
  return (
    e.split(listDelimiterRE).forEach((e) => {
      if (e) {
        const r = e.split(propertyDelimiterRE)
        r.length > 1 && (t[r[0].trim()] = r[1].trim())
      }
    }),
    t
  )
}
function normalizeClass(e) {
  let t = ''
  if (isString$1(e)) t = e
  else if (isArray$1(e))
    for (let r = 0; r < e.length; r++) {
      const n = normalizeClass(e[r])
      n && (t += n + ' ')
    }
  else if (isObject$2(e)) for (const r in e) e[r] && (t += r + ' ')
  return t.trim()
}
function looseCompareArrays(e, t) {
  if (e.length !== t.length) return !1
  let r = !0
  for (let n = 0; r && n < e.length; n++) r = looseEqual(e[n], t[n])
  return r
}
function looseEqual(e, t) {
  if (e === t) return !0
  let r = isDate$1(e),
    n = isDate$1(t)
  if (r || n) return !(!r || !n) && e.getTime() === t.getTime()
  if (((r = isArray$1(e)), (n = isArray$1(t)), r || n)) return !(!r || !n) && looseCompareArrays(e, t)
  if (((r = isObject$2(e)), (n = isObject$2(t)), r || n)) {
    if (!r || !n) return !1
    if (Object.keys(e).length !== Object.keys(t).length) return !1
    for (const r in e) {
      const n = e.hasOwnProperty(r),
        i = t.hasOwnProperty(r)
      if ((n && !i) || (!n && i) || !looseEqual(e[r], t[r])) return !1
    }
  }
  return String(e) === String(t)
}
const toDisplayString = (e) =>
    null == e
      ? ''
      : isArray$1(e) || (isObject$2(e) && (e.toString === objectToString || !isFunction$1(e.toString)))
      ? JSON.stringify(e, replacer, 2)
      : String(e),
  replacer = (e, t) =>
    t && t.__v_isRef
      ? replacer(e, t.value)
      : isMap(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, r]) => ((e[`${t} =>`] = r), e), {}) }
      : isSet(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !isObject$2(t) || isArray$1(t) || isPlainObject$1(t)
      ? t
      : String(t),
  EMPTY_OBJ = {},
  EMPTY_ARR = [],
  NOOP = () => {},
  NO = () => !1,
  onRE = /^on[^a-z]/,
  isOn = (e) => onRE.test(e),
  isModelListener = (e) => e.startsWith('onUpdate:'),
  extend$1 = Object.assign,
  remove = (e, t) => {
    const r = e.indexOf(t)
    r > -1 && e.splice(r, 1)
  },
  hasOwnProperty = Object.prototype.hasOwnProperty,
  hasOwn = (e, t) => hasOwnProperty.call(e, t),
  isArray$1 = Array.isArray,
  isMap = (e) => '[object Map]' === toTypeString(e),
  isSet = (e) => '[object Set]' === toTypeString(e),
  isDate$1 = (e) => e instanceof Date,
  isFunction$1 = (e) => 'function' == typeof e,
  isString$1 = (e) => 'string' == typeof e,
  isSymbol = (e) => 'symbol' == typeof e,
  isObject$2 = (e) => null !== e && 'object' == typeof e,
  isPromise$1 = (e) => isObject$2(e) && isFunction$1(e.then) && isFunction$1(e.catch),
  objectToString = Object.prototype.toString,
  toTypeString = (e) => objectToString.call(e),
  toRawType = (e) => toTypeString(e).slice(8, -1),
  isPlainObject$1 = (e) => '[object Object]' === toTypeString(e),
  isIntegerKey = (e) => isString$1(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  isReservedProp = makeMap(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  cacheStringFunction = (e) => {
    const t = Object.create(null)
    return (r) => t[r] || (t[r] = e(r))
  },
  camelizeRE = /-(\w)/g,
  camelize = cacheStringFunction((e) => e.replace(camelizeRE, (e, t) => (t ? t.toUpperCase() : ''))),
  hyphenateRE = /\B([A-Z])/g,
  hyphenate = cacheStringFunction((e) => e.replace(hyphenateRE, '-$1').toLowerCase()),
  capitalize = cacheStringFunction((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  toHandlerKey = cacheStringFunction((e) => (e ? `on${capitalize(e)}` : '')),
  hasChanged = (e, t) => !Object.is(e, t),
  invokeArrayFns = (e, t) => {
    for (let r = 0; r < e.length; r++) e[r](t)
  },
  def = (e, t, r) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: r })
  },
  toNumber = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let _globalThis
const getGlobalThis = () =>
  _globalThis ||
  (_globalThis =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
      ? self
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : {})
let activeEffectScope
const effectScopeStack = []
class EffectScope {
  constructor(e = !1) {
    ;(this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !e &&
        activeEffectScope &&
        ((this.parent = activeEffectScope),
        (this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1))
  }
  run(e) {
    if (this.active)
      try {
        return this.on(), e()
      } finally {
        this.off()
      }
  }
  on() {
    this.active && (effectScopeStack.push(this), (activeEffectScope = this))
  }
  off() {
    this.active && (effectScopeStack.pop(), (activeEffectScope = effectScopeStack[effectScopeStack.length - 1]))
  }
  stop(e) {
    if (this.active) {
      if (
        (this.effects.forEach((e) => e.stop()),
        this.cleanups.forEach((e) => e()),
        this.scopes && this.scopes.forEach((e) => e.stop(!0)),
        this.parent && !e)
      ) {
        const e = this.parent.scopes.pop()
        e && e !== this && ((this.parent.scopes[this.index] = e), (e.index = this.index))
      }
      this.active = !1
    }
  }
}
function recordEffectScope(e, t) {
  ;(t = t || activeEffectScope) && t.active && t.effects.push(e)
}
const createDep = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  wasTracked = (e) => (e.w & trackOpBit) > 0,
  newTracked = (e) => (e.n & trackOpBit) > 0,
  initDepMarkers = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= trackOpBit
  },
  finalizeDepMarkers = (e) => {
    const { deps: t } = e
    if (t.length) {
      let r = 0
      for (let n = 0; n < t.length; n++) {
        const i = t[n]
        wasTracked(i) && !newTracked(i) ? i.delete(e) : (t[r++] = i), (i.w &= ~trackOpBit), (i.n &= ~trackOpBit)
      }
      t.length = r
    }
  },
  targetMap = new WeakMap()
let effectTrackDepth = 0,
  trackOpBit = 1
const maxMarkerBits = 30,
  effectStack = []
let activeEffect
const ITERATE_KEY = Symbol(''),
  MAP_KEY_ITERATE_KEY = Symbol('')
class ReactiveEffect {
  constructor(e, t = null, r) {
    ;(this.fn = e), (this.scheduler = t), (this.active = !0), (this.deps = []), recordEffectScope(this, r)
  }
  run() {
    if (!this.active) return this.fn()
    if (!effectStack.includes(this))
      try {
        return (
          effectStack.push((activeEffect = this)),
          enableTracking(),
          (trackOpBit = 1 << ++effectTrackDepth),
          effectTrackDepth <= maxMarkerBits ? initDepMarkers(this) : cleanupEffect(this),
          this.fn()
        )
      } finally {
        effectTrackDepth <= maxMarkerBits && finalizeDepMarkers(this),
          (trackOpBit = 1 << --effectTrackDepth),
          resetTracking(),
          effectStack.pop()
        const e = effectStack.length
        activeEffect = e > 0 ? effectStack[e - 1] : void 0
      }
  }
  stop() {
    this.active && (cleanupEffect(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function cleanupEffect(e) {
  const { deps: t } = e
  if (t.length) {
    for (let r = 0; r < t.length; r++) t[r].delete(e)
    t.length = 0
  }
}
let shouldTrack = !0
const trackStack = []
function pauseTracking() {
  trackStack.push(shouldTrack), (shouldTrack = !1)
}
function enableTracking() {
  trackStack.push(shouldTrack), (shouldTrack = !0)
}
function resetTracking() {
  const e = trackStack.pop()
  shouldTrack = void 0 === e || e
}
function track(e, t, r) {
  if (!isTracking()) return
  let n = targetMap.get(e)
  n || targetMap.set(e, (n = new Map()))
  let i = n.get(r)
  i || n.set(r, (i = createDep())), trackEffects(i)
}
function isTracking() {
  return shouldTrack && void 0 !== activeEffect
}
function trackEffects(e, t) {
  let r = !1
  effectTrackDepth <= maxMarkerBits
    ? newTracked(e) || ((e.n |= trackOpBit), (r = !wasTracked(e)))
    : (r = !e.has(activeEffect)),
    r && (e.add(activeEffect), activeEffect.deps.push(e))
}
function trigger$1(e, t, r, n, i, s) {
  const a = targetMap.get(e)
  if (!a) return
  let o = []
  if ('clear' === t) o = [...a.values()]
  else if ('length' === r && isArray$1(e))
    a.forEach((e, t) => {
      ;('length' === t || t >= n) && o.push(e)
    })
  else
    switch ((void 0 !== r && o.push(a.get(r)), t)) {
      case 'add':
        isArray$1(e)
          ? isIntegerKey(r) && o.push(a.get('length'))
          : (o.push(a.get(ITERATE_KEY)), isMap(e) && o.push(a.get(MAP_KEY_ITERATE_KEY)))
        break
      case 'delete':
        isArray$1(e) || (o.push(a.get(ITERATE_KEY)), isMap(e) && o.push(a.get(MAP_KEY_ITERATE_KEY)))
        break
      case 'set':
        isMap(e) && o.push(a.get(ITERATE_KEY))
    }
  if (1 === o.length) o[0] && triggerEffects(o[0])
  else {
    const e = []
    for (const t of o) t && e.push(...t)
    triggerEffects(createDep(e))
  }
}
function triggerEffects(e, t) {
  for (const r of isArray$1(e) ? e : [...e])
    (r !== activeEffect || r.allowRecurse) && (r.scheduler ? r.scheduler() : r.run())
}
const isNonTrackableKeys = makeMap('__proto__,__v_isRef,__isVue'),
  builtInSymbols = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(isSymbol)
  ),
  get = createGetter(),
  shallowGet = createGetter(!1, !0),
  readonlyGet = createGetter(!0),
  arrayInstrumentations = createArrayInstrumentations()
function createArrayInstrumentations() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...e) {
        const r = toRaw(this)
        for (let t = 0, i = this.length; t < i; t++) track(r, 'get', t + '')
        const n = r[t](...e)
        return -1 === n || !1 === n ? r[t](...e.map(toRaw)) : n
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...e) {
        pauseTracking()
        const r = toRaw(this)[t].apply(this, e)
        return resetTracking(), r
      }
    }),
    e
  )
}
function createGetter(e = !1, t = !1) {
  return function (r, n, i) {
    if ('__v_isReactive' === n) return !e
    if ('__v_isReadonly' === n) return e
    if (
      '__v_raw' === n &&
      i === (e ? (t ? shallowReadonlyMap : readonlyMap) : t ? shallowReactiveMap : reactiveMap).get(r)
    )
      return r
    const s = isArray$1(r)
    if (!e && s && hasOwn(arrayInstrumentations, n)) return Reflect.get(arrayInstrumentations, n, i)
    const a = Reflect.get(r, n, i)
    if (isSymbol(n) ? builtInSymbols.has(n) : isNonTrackableKeys(n)) return a
    if ((e || track(r, 'get', n), t)) return a
    if (isRef(a)) {
      return !s || !isIntegerKey(n) ? a.value : a
    }
    return isObject$2(a) ? (e ? readonly(a) : reactive(a)) : a
  }
}
const set = createSetter(),
  shallowSet = createSetter(!0)
function createSetter(e = !1) {
  return function (t, r, n, i) {
    let s = t[r]
    if (!e && ((n = toRaw(n)), (s = toRaw(s)), !isArray$1(t) && isRef(s) && !isRef(n))) return (s.value = n), !0
    const a = isArray$1(t) && isIntegerKey(r) ? Number(r) < t.length : hasOwn(t, r),
      o = Reflect.set(t, r, n, i)
    return t === toRaw(i) && (a ? hasChanged(n, s) && trigger$1(t, 'set', r, n) : trigger$1(t, 'add', r, n)), o
  }
}
function deleteProperty(e, t) {
  const r = hasOwn(e, t)
  e[t]
  const n = Reflect.deleteProperty(e, t)
  return n && r && trigger$1(e, 'delete', t, void 0), n
}
function has(e, t) {
  const r = Reflect.has(e, t)
  return (isSymbol(t) && builtInSymbols.has(t)) || track(e, 'has', t), r
}
function ownKeys(e) {
  return track(e, 'iterate', isArray$1(e) ? 'length' : ITERATE_KEY), Reflect.ownKeys(e)
}
const mutableHandlers = { get: get, set: set, deleteProperty: deleteProperty, has: has, ownKeys: ownKeys },
  readonlyHandlers = { get: readonlyGet, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  shallowReactiveHandlers = extend$1({}, mutableHandlers, { get: shallowGet, set: shallowSet }),
  toShallow = (e) => e,
  getProto = (e) => Reflect.getPrototypeOf(e)
function get$1(e, t, r = !1, n = !1) {
  const i = toRaw((e = e.__v_raw)),
    s = toRaw(t)
  t !== s && !r && track(i, 'get', t), !r && track(i, 'get', s)
  const { has: a } = getProto(i),
    o = n ? toShallow : r ? toReadonly : toReactive
  return a.call(i, t) ? o(e.get(t)) : a.call(i, s) ? o(e.get(s)) : void (e !== i && e.get(t))
}
function has$1(e, t = !1) {
  const r = this.__v_raw,
    n = toRaw(r),
    i = toRaw(e)
  return e !== i && !t && track(n, 'has', e), !t && track(n, 'has', i), e === i ? r.has(e) : r.has(e) || r.has(i)
}
function size(e, t = !1) {
  return (e = e.__v_raw), !t && track(toRaw(e), 'iterate', ITERATE_KEY), Reflect.get(e, 'size', e)
}
function add(e) {
  e = toRaw(e)
  const t = toRaw(this)
  return getProto(t).has.call(t, e) || (t.add(e), trigger$1(t, 'add', e, e)), this
}
function set$1(e, t) {
  t = toRaw(t)
  const r = toRaw(this),
    { has: n, get: i } = getProto(r)
  let s = n.call(r, e)
  s || ((e = toRaw(e)), (s = n.call(r, e)))
  const a = i.call(r, e)
  return r.set(e, t), s ? hasChanged(t, a) && trigger$1(r, 'set', e, t) : trigger$1(r, 'add', e, t), this
}
function deleteEntry(e) {
  const t = toRaw(this),
    { has: r, get: n } = getProto(t)
  let i = r.call(t, e)
  i || ((e = toRaw(e)), (i = r.call(t, e))), n && n.call(t, e)
  const s = t.delete(e)
  return i && trigger$1(t, 'delete', e, void 0), s
}
function clear() {
  const e = toRaw(this),
    t = 0 !== e.size,
    r = e.clear()
  return t && trigger$1(e, 'clear', void 0, void 0), r
}
function createForEach(e, t) {
  return function (r, n) {
    const i = this,
      s = i.__v_raw,
      a = toRaw(s),
      o = t ? toShallow : e ? toReadonly : toReactive
    return !e && track(a, 'iterate', ITERATE_KEY), s.forEach((e, t) => r.call(n, o(e), o(t), i))
  }
}
function createIterableMethod(e, t, r) {
  return function (...n) {
    const i = this.__v_raw,
      s = toRaw(i),
      a = isMap(s),
      o = 'entries' === e || (e === Symbol.iterator && a),
      l = 'keys' === e && a,
      h = i[e](...n),
      c = r ? toShallow : t ? toReadonly : toReactive
    return (
      !t && track(s, 'iterate', l ? MAP_KEY_ITERATE_KEY : ITERATE_KEY),
      {
        next() {
          const { value: e, done: t } = h.next()
          return t ? { value: e, done: t } : { value: o ? [c(e[0]), c(e[1])] : c(e), done: t }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function createReadonlyMethod(e) {
  return function (...t) {
    return 'delete' !== e && this
  }
}
function createInstrumentations() {
  const e = {
      get(e) {
        return get$1(this, e)
      },
      get size() {
        return size(this)
      },
      has: has$1,
      add: add,
      set: set$1,
      delete: deleteEntry,
      clear: clear,
      forEach: createForEach(!1, !1),
    },
    t = {
      get(e) {
        return get$1(this, e, !1, !0)
      },
      get size() {
        return size(this)
      },
      has: has$1,
      add: add,
      set: set$1,
      delete: deleteEntry,
      clear: clear,
      forEach: createForEach(!1, !0),
    },
    r = {
      get(e) {
        return get$1(this, e, !0)
      },
      get size() {
        return size(this, !0)
      },
      has(e) {
        return has$1.call(this, e, !0)
      },
      add: createReadonlyMethod('add'),
      set: createReadonlyMethod('set'),
      delete: createReadonlyMethod('delete'),
      clear: createReadonlyMethod('clear'),
      forEach: createForEach(!0, !1),
    },
    n = {
      get(e) {
        return get$1(this, e, !0, !0)
      },
      get size() {
        return size(this, !0)
      },
      has(e) {
        return has$1.call(this, e, !0)
      },
      add: createReadonlyMethod('add'),
      set: createReadonlyMethod('set'),
      delete: createReadonlyMethod('delete'),
      clear: createReadonlyMethod('clear'),
      forEach: createForEach(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((i) => {
      ;(e[i] = createIterableMethod(i, !1, !1)),
        (r[i] = createIterableMethod(i, !0, !1)),
        (t[i] = createIterableMethod(i, !1, !0)),
        (n[i] = createIterableMethod(i, !0, !0))
    }),
    [e, r, t, n]
  )
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] =
  createInstrumentations()
function createInstrumentationGetter(e, t) {
  const r = t
    ? e
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : e
    ? readonlyInstrumentations
    : mutableInstrumentations
  return (t, n, i) =>
    '__v_isReactive' === n
      ? !e
      : '__v_isReadonly' === n
      ? e
      : '__v_raw' === n
      ? t
      : Reflect.get(hasOwn(r, n) && n in t ? r : t, n, i)
}
const mutableCollectionHandlers = { get: createInstrumentationGetter(!1, !1) },
  shallowCollectionHandlers = { get: createInstrumentationGetter(!1, !0) },
  readonlyCollectionHandlers = { get: createInstrumentationGetter(!0, !1) },
  reactiveMap = new WeakMap(),
  shallowReactiveMap = new WeakMap(),
  readonlyMap = new WeakMap(),
  shallowReadonlyMap = new WeakMap()
function targetTypeMap(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function getTargetType(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : targetTypeMap(toRawType(e))
}
function reactive(e) {
  return e && e.__v_isReadonly
    ? e
    : createReactiveObject(e, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}
function shallowReactive(e) {
  return createReactiveObject(e, !1, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap)
}
function readonly(e) {
  return createReactiveObject(e, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}
function createReactiveObject(e, t, r, n, i) {
  if (!isObject$2(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const s = i.get(e)
  if (s) return s
  const a = getTargetType(e)
  if (0 === a) return e
  const o = new Proxy(e, 2 === a ? n : r)
  return i.set(e, o), o
}
function isReactive(e) {
  return isReadonly(e) ? isReactive(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function isReadonly(e) {
  return !(!e || !e.__v_isReadonly)
}
function isProxy(e) {
  return isReactive(e) || isReadonly(e)
}
function toRaw(e) {
  const t = e && e.__v_raw
  return t ? toRaw(t) : e
}
function markRaw(e) {
  return def(e, '__v_skip', !0), e
}
const toReactive = (e) => (isObject$2(e) ? reactive(e) : e),
  toReadonly = (e) => (isObject$2(e) ? readonly(e) : e)
function trackRefValue(e) {
  isTracking() && ((e = toRaw(e)).dep || (e.dep = createDep()), trackEffects(e.dep))
}
function triggerRefValue(e, t) {
  ;(e = toRaw(e)).dep && triggerEffects(e.dep)
}
function isRef(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
function ref(e) {
  return createRef(e, !1)
}
function shallowRef(e) {
  return createRef(e, !0)
}
function createRef(e, t) {
  return isRef(e) ? e : new RefImpl(e, t)
}
class RefImpl {
  constructor(e, t) {
    ;(this._shallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? e : toRaw(e)),
      (this._value = t ? e : toReactive(e))
  }
  get value() {
    return trackRefValue(this), this._value
  }
  set value(e) {
    ;(e = this._shallow ? e : toRaw(e)),
      hasChanged(e, this._rawValue) &&
        ((this._rawValue = e), (this._value = this._shallow ? e : toReactive(e)), triggerRefValue(this))
  }
}
function unref(e) {
  return isRef(e) ? e.value : e
}
const shallowUnwrapHandlers = {
  get: (e, t, r) => unref(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t]
    return isRef(i) && !isRef(r) ? ((i.value = r), !0) : Reflect.set(e, t, r, n)
  },
}
function proxyRefs(e) {
  return isReactive(e) ? e : new Proxy(e, shallowUnwrapHandlers)
}
class ComputedRefImpl {
  constructor(e, t, r) {
    ;(this._setter = t),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new ReactiveEffect(e, () => {
        this._dirty || ((this._dirty = !0), triggerRefValue(this))
      })),
      (this.__v_isReadonly = r)
  }
  get value() {
    const e = toRaw(this)
    return trackRefValue(e), e._dirty && ((e._dirty = !1), (e._value = e.effect.run())), e._value
  }
  set value(e) {
    this._setter(e)
  }
}
function computed(e, t) {
  let r, n
  const i = isFunction$1(e)
  i ? ((r = e), (n = NOOP)) : ((r = e.get), (n = e.set))
  return new ComputedRefImpl(r, n, i || !n)
}
function emit$1(e, t, ...r) {
  const n = e.vnode.props || EMPTY_OBJ
  let i = r
  const s = t.startsWith('update:'),
    a = s && t.slice(7)
  if (a && a in n) {
    const e = `${'modelValue' === a ? 'model' : a}Modifiers`,
      { number: t, trim: s } = n[e] || EMPTY_OBJ
    s ? (i = r.map((e) => e.trim())) : t && (i = r.map(toNumber))
  }
  let o,
    l = n[(o = toHandlerKey(t))] || n[(o = toHandlerKey(camelize(t)))]
  !l && s && (l = n[(o = toHandlerKey(hyphenate(t)))]), l && callWithAsyncErrorHandling(l, e, 6, i)
  const h = n[o + 'Once']
  if (h) {
    if (e.emitted) {
      if (e.emitted[o]) return
    } else e.emitted = {}
    ;(e.emitted[o] = !0), callWithAsyncErrorHandling(h, e, 6, i)
  }
}
function normalizeEmitsOptions(e, t, r = !1) {
  const n = t.emitsCache,
    i = n.get(e)
  if (void 0 !== i) return i
  const s = e.emits
  let a = {},
    o = !1
  if (!isFunction$1(e)) {
    const n = (e) => {
      const r = normalizeEmitsOptions(e, t, !0)
      r && ((o = !0), extend$1(a, r))
    }
    !r && t.mixins.length && t.mixins.forEach(n), e.extends && n(e.extends), e.mixins && e.mixins.forEach(n)
  }
  return s || o
    ? (isArray$1(s) ? s.forEach((e) => (a[e] = null)) : extend$1(a, s), n.set(e, a), a)
    : (n.set(e, null), null)
}
function isEmitListener(e, t) {
  return (
    !(!e || !isOn(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    hasOwn(e, t[0].toLowerCase() + t.slice(1)) || hasOwn(e, hyphenate(t)) || hasOwn(e, t))
  )
}
Promise.resolve()
let currentRenderingInstance = null,
  currentScopeId = null
function setCurrentRenderingInstance(e) {
  const t = currentRenderingInstance
  return (currentRenderingInstance = e), (currentScopeId = (e && e.type.__scopeId) || null), t
}
function withCtx(e, t = currentRenderingInstance, r) {
  if (!t) return e
  if (e._n) return e
  const n = (...r) => {
    n._d && setBlockTracking(-1)
    const i = setCurrentRenderingInstance(t),
      s = e(...r)
    return setCurrentRenderingInstance(i), n._d && setBlockTracking(1), s
  }
  return (n._n = !0), (n._c = !0), (n._d = !0), n
}
function markAttrsAccessed() {}
function renderComponentRoot(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: i,
    props: s,
    propsOptions: [a],
    slots: o,
    attrs: l,
    emit: h,
    render: c,
    renderCache: p,
    data: u,
    setupState: f,
    ctx: d,
    inheritAttrs: m,
  } = e
  let g, y
  const v = setCurrentRenderingInstance(e)
  try {
    if (4 & r.shapeFlag) {
      const e = i || n
      ;(g = normalizeVNode(c.call(e, e, p, s, f, u, d))), (y = l)
    } else {
      const e = t
      0,
        (g = normalizeVNode(e.length > 1 ? e(s, { attrs: l, slots: o, emit: h }) : e(s, null))),
        (y = t.props ? l : getFunctionalFallthrough(l))
    }
  } catch (E) {
    ;(blockStack.length = 0), handleError(E, e, 1), (g = createVNode(Comment))
  }
  let b = g
  if (y && !1 !== m) {
    const e = Object.keys(y),
      { shapeFlag: t } = b
    e.length && 7 & t && (a && e.some(isModelListener) && (y = filterModelListeners(y, a)), (b = cloneVNode(b, y)))
  }
  return (
    r.dirs && (b.dirs = b.dirs ? b.dirs.concat(r.dirs) : r.dirs),
    r.transition && (b.transition = r.transition),
    (g = b),
    setCurrentRenderingInstance(v),
    g
  )
}
const getFunctionalFallthrough = (e) => {
    let t
    for (const r in e) ('class' === r || 'style' === r || isOn(r)) && ((t || (t = {}))[r] = e[r])
    return t
  },
  filterModelListeners = (e, t) => {
    const r = {}
    for (const n in e) (isModelListener(n) && n.slice(9) in t) || (r[n] = e[n])
    return r
  }
function shouldUpdateComponent(e, t, r) {
  const { props: n, children: i, component: s } = e,
    { props: a, children: o, patchFlag: l } = t,
    h = s.emitsOptions
  if (t.dirs || t.transition) return !0
  if (!(r && l >= 0))
    return !((!i && !o) || (o && o.$stable)) || (n !== a && (n ? !a || hasPropsChanged(n, a, h) : !!a))
  if (1024 & l) return !0
  if (16 & l) return n ? hasPropsChanged(n, a, h) : !!a
  if (8 & l) {
    const e = t.dynamicProps
    for (let t = 0; t < e.length; t++) {
      const r = e[t]
      if (a[r] !== n[r] && !isEmitListener(h, r)) return !0
    }
  }
  return !1
}
function hasPropsChanged(e, t, r) {
  const n = Object.keys(t)
  if (n.length !== Object.keys(e).length) return !0
  for (let i = 0; i < n.length; i++) {
    const s = n[i]
    if (t[s] !== e[s] && !isEmitListener(r, s)) return !0
  }
  return !1
}
function updateHOCHostEl({ vnode: e, parent: t }, r) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = r), (t = t.parent)
}
const isSuspense = (e) => e.__isSuspense
function queueEffectWithSuspense(e, t) {
  t && t.pendingBranch ? (isArray$1(e) ? t.effects.push(...e) : t.effects.push(e)) : queuePostFlushCb(e)
}
function provide(e, t) {
  if (currentInstance) {
    let r = currentInstance.provides
    const n = currentInstance.parent && currentInstance.parent.provides
    n === r && (r = currentInstance.provides = Object.create(n)), (r[e] = t)
  } else;
}
function inject(e, t, r = !1) {
  const n = currentInstance || currentRenderingInstance
  if (n) {
    const i = null == n.parent ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides
    if (i && e in i) return i[e]
    if (arguments.length > 1) return r && isFunction$1(t) ? t.call(n.proxy) : t
  }
}
function useTransitionState() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    onMounted(() => {
      e.isMounted = !0
    }),
    onBeforeUnmount(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const TransitionHookValidator = [Function, Array],
  BaseTransitionImpl = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator,
    },
    setup(e, { slots: t }) {
      const r = getCurrentInstance(),
        n = useTransitionState()
      let i
      return () => {
        const s = t.default && getTransitionRawChildren(t.default(), !0)
        if (!s || !s.length) return
        const a = toRaw(e),
          { mode: o } = a,
          l = s[0]
        if (n.isLeaving) return emptyPlaceholder(l)
        const h = getKeepAliveChild(l)
        if (!h) return emptyPlaceholder(l)
        const c = resolveTransitionHooks(h, a, n, r)
        setTransitionHooks(h, c)
        const p = r.subTree,
          u = p && getKeepAliveChild(p)
        let f = !1
        const { getTransitionKey: d } = h.type
        if (d) {
          const e = d()
          void 0 === i ? (i = e) : e !== i && ((i = e), (f = !0))
        }
        if (u && u.type !== Comment && (!isSameVNodeType(h, u) || f)) {
          const e = resolveTransitionHooks(u, a, n, r)
          if ((setTransitionHooks(u, e), 'out-in' === o))
            return (
              (n.isLeaving = !0),
              (e.afterLeave = () => {
                ;(n.isLeaving = !1), r.update()
              }),
              emptyPlaceholder(l)
            )
          'in-out' === o &&
            h.type !== Comment &&
            (e.delayLeave = (e, t, r) => {
              ;(getLeavingNodesForType(n, u)[String(u.key)] = u),
                (e._leaveCb = () => {
                  t(), (e._leaveCb = void 0), delete c.delayedLeave
                }),
                (c.delayedLeave = r)
            })
        }
        return l
      }
    },
  },
  BaseTransition = BaseTransitionImpl
function getLeavingNodesForType(e, t) {
  const { leavingVNodes: r } = e
  let n = r.get(t.type)
  return n || ((n = Object.create(null)), r.set(t.type, n)), n
}
function resolveTransitionHooks(e, t, r, n) {
  const {
      appear: i,
      mode: s,
      persisted: a = !1,
      onBeforeEnter: o,
      onEnter: l,
      onAfterEnter: h,
      onEnterCancelled: c,
      onBeforeLeave: p,
      onLeave: u,
      onAfterLeave: f,
      onLeaveCancelled: d,
      onBeforeAppear: m,
      onAppear: g,
      onAfterAppear: y,
      onAppearCancelled: v,
    } = t,
    b = String(e.key),
    E = getLeavingNodesForType(r, e),
    S = (e, t) => {
      e && callWithAsyncErrorHandling(e, n, 9, t)
    },
    P = {
      mode: s,
      persisted: a,
      beforeEnter(t) {
        let n = o
        if (!r.isMounted) {
          if (!i) return
          n = m || o
        }
        t._leaveCb && t._leaveCb(!0)
        const s = E[b]
        s && isSameVNodeType(e, s) && s.el._leaveCb && s.el._leaveCb(), S(n, [t])
      },
      enter(e) {
        let t = l,
          n = h,
          s = c
        if (!r.isMounted) {
          if (!i) return
          ;(t = g || l), (n = y || h), (s = v || c)
        }
        let a = !1
        const o = (e._enterCb = (t) => {
          a || ((a = !0), S(t ? s : n, [e]), P.delayedLeave && P.delayedLeave(), (e._enterCb = void 0))
        })
        t ? (t(e, o), t.length <= 1 && o()) : o()
      },
      leave(t, n) {
        const i = String(e.key)
        if ((t._enterCb && t._enterCb(!0), r.isUnmounting)) return n()
        S(p, [t])
        let s = !1
        const a = (t._leaveCb = (r) => {
          s || ((s = !0), n(), S(r ? d : f, [t]), (t._leaveCb = void 0), E[i] === e && delete E[i])
        })
        ;(E[i] = e), u ? (u(t, a), u.length <= 1 && a()) : a()
      },
      clone: (e) => resolveTransitionHooks(e, t, r, n),
    }
  return P
}
function emptyPlaceholder(e) {
  if (isKeepAlive(e)) return ((e = cloneVNode(e)).children = null), e
}
function getKeepAliveChild(e) {
  return isKeepAlive(e) ? (e.children ? e.children[0] : void 0) : e
}
function setTransitionHooks(e, t) {
  6 & e.shapeFlag && e.component
    ? setTransitionHooks(e.component.subTree, t)
    : 128 & e.shapeFlag
    ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function getTransitionRawChildren(e, t = !1) {
  let r = [],
    n = 0
  for (let i = 0; i < e.length; i++) {
    const s = e[i]
    s.type === Fragment
      ? (128 & s.patchFlag && n++, (r = r.concat(getTransitionRawChildren(s.children, t))))
      : (t || s.type !== Comment) && r.push(s)
  }
  if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2
  return r
}
function defineComponent(e) {
  return isFunction$1(e) ? { setup: e, name: e.name } : e
}
const isAsyncWrapper = (e) => !!e.type.__asyncLoader,
  isKeepAlive = (e) => e.type.__isKeepAlive
function onActivated(e, t) {
  registerKeepAliveHook(e, 'a', t)
}
function onDeactivated(e, t) {
  registerKeepAliveHook(e, 'da', t)
}
function registerKeepAliveHook(e, t, r = currentInstance) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let t = r
      for (; t; ) {
        if (t.isDeactivated) return
        t = t.parent
      }
      e()
    })
  if ((injectHook(t, n, r), r)) {
    let e = r.parent
    for (; e && e.parent; ) isKeepAlive(e.parent.vnode) && injectToKeepAliveRoot(n, t, r, e), (e = e.parent)
  }
}
function injectToKeepAliveRoot(e, t, r, n) {
  const i = injectHook(t, e, n, !0)
  onUnmounted(() => {
    remove(n[t], i)
  }, r)
}
function injectHook(e, t, r = currentInstance, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...n) => {
          if (r.isUnmounted) return
          pauseTracking(), setCurrentInstance(r)
          const i = callWithAsyncErrorHandling(t, r, e, n)
          return unsetCurrentInstance(), resetTracking(), i
        })
    return n ? i.unshift(s) : i.push(s), s
  }
}
const createHook =
    (e) =>
    (t, r = currentInstance) =>
      (!isInSSRComponentSetup || 'sp' === e) && injectHook(e, t, r),
  onBeforeMount = createHook('bm'),
  onMounted = createHook('m'),
  onBeforeUpdate = createHook('bu'),
  onUpdated = createHook('u'),
  onBeforeUnmount = createHook('bum'),
  onUnmounted = createHook('um'),
  onServerPrefetch = createHook('sp'),
  onRenderTriggered = createHook('rtg'),
  onRenderTracked = createHook('rtc')
function onErrorCaptured(e, t = currentInstance) {
  injectHook('ec', e, t)
}
let shouldCacheAccess = !0
function applyOptions(e) {
  const t = resolveMergedOptions(e),
    r = e.proxy,
    n = e.ctx
  ;(shouldCacheAccess = !1), t.beforeCreate && callHook(t.beforeCreate, e, 'bc')
  const {
    data: i,
    computed: s,
    methods: a,
    watch: o,
    provide: l,
    inject: h,
    created: c,
    beforeMount: p,
    mounted: u,
    beforeUpdate: f,
    updated: d,
    activated: m,
    deactivated: g,
    beforeDestroy: y,
    beforeUnmount: v,
    destroyed: b,
    unmounted: E,
    render: S,
    renderTracked: P,
    renderTriggered: _,
    errorCaptured: x,
    serverPrefetch: C,
    expose: A,
    inheritAttrs: T,
    components: k,
    directives: w,
    filters: M,
  } = t
  if ((h && resolveInjections(h, n, null, e.appContext.config.unwrapInjectedRef), a))
    for (const F in a) {
      const e = a[F]
      isFunction$1(e) && (n[F] = e.bind(r))
    }
  if (i) {
    const t = i.call(r, r)
    isObject$2(t) && (e.data = reactive(t))
  }
  if (((shouldCacheAccess = !0), s))
    for (const F in s) {
      const e = s[F],
        t = computed({
          get: isFunction$1(e) ? e.bind(r, r) : isFunction$1(e.get) ? e.get.bind(r, r) : NOOP,
          set: !isFunction$1(e) && isFunction$1(e.set) ? e.set.bind(r) : NOOP,
        })
      Object.defineProperty(n, F, { enumerable: !0, configurable: !0, get: () => t.value, set: (e) => (t.value = e) })
    }
  if (o) for (const F in o) createWatcher(o[F], n, r, F)
  if (l) {
    const e = isFunction$1(l) ? l.call(r) : l
    Reflect.ownKeys(e).forEach((t) => {
      provide(t, e[t])
    })
  }
  function I(e, t) {
    isArray$1(t) ? t.forEach((t) => e(t.bind(r))) : t && e(t.bind(r))
  }
  if (
    (c && callHook(c, e, 'c'),
    I(onBeforeMount, p),
    I(onMounted, u),
    I(onBeforeUpdate, f),
    I(onUpdated, d),
    I(onActivated, m),
    I(onDeactivated, g),
    I(onErrorCaptured, x),
    I(onRenderTracked, P),
    I(onRenderTriggered, _),
    I(onBeforeUnmount, v),
    I(onUnmounted, E),
    I(onServerPrefetch, C),
    isArray$1(A))
  )
    if (A.length) {
      const t = e.exposed || (e.exposed = {})
      A.forEach((e) => {
        Object.defineProperty(t, e, { get: () => r[e], set: (t) => (r[e] = t) })
      })
    } else e.exposed || (e.exposed = {})
  S && e.render === NOOP && (e.render = S),
    null != T && (e.inheritAttrs = T),
    k && (e.components = k),
    w && (e.directives = w)
}
function resolveInjections(e, t, r = NOOP, n = !1) {
  isArray$1(e) && (e = normalizeInject(e))
  for (const i in e) {
    const r = e[i]
    let s
    ;(s = isObject$2(r) ? ('default' in r ? inject(r.from || i, r.default, !0) : inject(r.from || i)) : inject(r)),
      isRef(s) && n
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (e) => (s.value = e),
          })
        : (t[i] = s)
  }
}
function callHook(e, t, r) {
  callWithAsyncErrorHandling(isArray$1(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, r)
}
function createWatcher(e, t, r, n) {
  const i = n.includes('.') ? createPathGetter(r, n) : () => r[n]
  if (isString$1(e)) {
    const r = t[e]
    isFunction$1(r) && watch(i, r)
  } else if (isFunction$1(e)) watch(i, e.bind(r))
  else if (isObject$2(e))
    if (isArray$1(e)) e.forEach((e) => createWatcher(e, t, r, n))
    else {
      const n = isFunction$1(e.handler) ? e.handler.bind(r) : t[e.handler]
      isFunction$1(n) && watch(i, n, e)
    }
}
function resolveMergedOptions(e) {
  const t = e.type,
    { mixins: r, extends: n } = t,
    {
      mixins: i,
      optionsCache: s,
      config: { optionMergeStrategies: a },
    } = e.appContext,
    o = s.get(t)
  let l
  return (
    o
      ? (l = o)
      : i.length || r || n
      ? ((l = {}), i.length && i.forEach((e) => mergeOptions$1(l, e, a, !0)), mergeOptions$1(l, t, a))
      : (l = t),
    s.set(t, l),
    l
  )
}
function mergeOptions$1(e, t, r, n = !1) {
  const { mixins: i, extends: s } = t
  s && mergeOptions$1(e, s, r, !0), i && i.forEach((t) => mergeOptions$1(e, t, r, !0))
  for (const a in t)
    if (n && 'expose' === a);
    else {
      const n = internalOptionMergeStrats[a] || (r && r[a])
      e[a] = n ? n(e[a], t[a]) : t[a]
    }
  return e
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject,
}
function mergeDataFn(e, t) {
  return t
    ? e
      ? function () {
          return extend$1(isFunction$1(e) ? e.call(this, this) : e, isFunction$1(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function mergeInject(e, t) {
  return mergeObjectOptions(normalizeInject(e), normalizeInject(t))
}
function normalizeInject(e) {
  if (isArray$1(e)) {
    const t = {}
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r]
    return t
  }
  return e
}
function mergeAsArray(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function mergeObjectOptions(e, t) {
  return e ? extend$1(extend$1(Object.create(null), e), t) : t
}
function mergeWatchOptions(e, t) {
  if (!e) return t
  if (!t) return e
  const r = extend$1(Object.create(null), e)
  for (const n in t) r[n] = mergeAsArray(e[n], t[n])
  return r
}
function initProps(e, t, r, n = !1) {
  const i = {},
    s = {}
  def(s, InternalObjectKey, 1), (e.propsDefaults = Object.create(null)), setFullProps(e, t, i, s)
  for (const a in e.propsOptions[0]) a in i || (i[a] = void 0)
  r ? (e.props = n ? i : shallowReactive(i)) : e.type.props ? (e.props = i) : (e.props = s), (e.attrs = s)
}
function updateProps(e, t, r, n) {
  const {
      props: i,
      attrs: s,
      vnode: { patchFlag: a },
    } = e,
    o = toRaw(i),
    [l] = e.propsOptions
  let h = !1
  if (!(n || a > 0) || 16 & a) {
    let n
    setFullProps(e, t, i, s) && (h = !0)
    for (const s in o)
      (t && (hasOwn(t, s) || ((n = hyphenate(s)) !== s && hasOwn(t, n)))) ||
        (l
          ? !r || (void 0 === r[s] && void 0 === r[n]) || (i[s] = resolvePropValue(l, o, s, void 0, e, !0))
          : delete i[s])
    if (s !== o) for (const e in s) (t && hasOwn(t, e)) || (delete s[e], (h = !0))
  } else if (8 & a) {
    const r = e.vnode.dynamicProps
    for (let n = 0; n < r.length; n++) {
      let a = r[n]
      const c = t[a]
      if (l)
        if (hasOwn(s, a)) c !== s[a] && ((s[a] = c), (h = !0))
        else {
          const t = camelize(a)
          i[t] = resolvePropValue(l, o, t, c, e, !1)
        }
      else c !== s[a] && ((s[a] = c), (h = !0))
    }
  }
  h && trigger$1(e, 'set', '$attrs')
}
function setFullProps(e, t, r, n) {
  const [i, s] = e.propsOptions
  let a,
    o = !1
  if (t)
    for (let l in t) {
      if (isReservedProp(l)) continue
      const h = t[l]
      let c
      i && hasOwn(i, (c = camelize(l)))
        ? s && s.includes(c)
          ? ((a || (a = {}))[c] = h)
          : (r[c] = h)
        : isEmitListener(e.emitsOptions, l) || (h !== n[l] && ((n[l] = h), (o = !0)))
    }
  if (s) {
    const t = toRaw(r),
      n = a || EMPTY_OBJ
    for (let a = 0; a < s.length; a++) {
      const o = s[a]
      r[o] = resolvePropValue(i, t, o, n[o], e, !hasOwn(n, o))
    }
  }
  return o
}
function resolvePropValue(e, t, r, n, i, s) {
  const a = e[r]
  if (null != a) {
    const e = hasOwn(a, 'default')
    if (e && void 0 === n) {
      const e = a.default
      if (a.type !== Function && isFunction$1(e)) {
        const { propsDefaults: s } = i
        r in s ? (n = s[r]) : (setCurrentInstance(i), (n = s[r] = e.call(null, t)), unsetCurrentInstance())
      } else n = e
    }
    a[0] && (s && !e ? (n = !1) : !a[1] || ('' !== n && n !== hyphenate(r)) || (n = !0))
  }
  return n
}
function normalizePropsOptions(e, t, r = !1) {
  const n = t.propsCache,
    i = n.get(e)
  if (i) return i
  const s = e.props,
    a = {},
    o = []
  let l = !1
  if (!isFunction$1(e)) {
    const n = (e) => {
      l = !0
      const [r, n] = normalizePropsOptions(e, t, !0)
      extend$1(a, r), n && o.push(...n)
    }
    !r && t.mixins.length && t.mixins.forEach(n), e.extends && n(e.extends), e.mixins && e.mixins.forEach(n)
  }
  if (!s && !l) return n.set(e, EMPTY_ARR), EMPTY_ARR
  if (isArray$1(s))
    for (let c = 0; c < s.length; c++) {
      const e = camelize(s[c])
      validatePropName(e) && (a[e] = EMPTY_OBJ)
    }
  else if (s)
    for (const c in s) {
      const e = camelize(c)
      if (validatePropName(e)) {
        const t = s[c],
          r = (a[e] = isArray$1(t) || isFunction$1(t) ? { type: t } : t)
        if (r) {
          const t = getTypeIndex(Boolean, r.type),
            n = getTypeIndex(String, r.type)
          ;(r[0] = t > -1), (r[1] = n < 0 || t < n), (t > -1 || hasOwn(r, 'default')) && o.push(e)
        }
      }
    }
  const h = [a, o]
  return n.set(e, h), h
}
function validatePropName(e) {
  return '$' !== e[0]
}
function getType(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : null === e ? 'null' : ''
}
function isSameType(e, t) {
  return getType(e) === getType(t)
}
function getTypeIndex(e, t) {
  return isArray$1(t) ? t.findIndex((t) => isSameType(t, e)) : isFunction$1(t) && isSameType(t, e) ? 0 : -1
}
const isInternalKey = (e) => '_' === e[0] || '$stable' === e,
  normalizeSlotValue = (e) => (isArray$1(e) ? e.map(normalizeVNode) : [normalizeVNode(e)]),
  normalizeSlot$1 = (e, t, r) => {
    const n = withCtx((...e) => normalizeSlotValue(t(...e)), r)
    return (n._c = !1), n
  },
  normalizeObjectSlots = (e, t, r) => {
    const n = e._ctx
    for (const i in e) {
      if (isInternalKey(i)) continue
      const r = e[i]
      if (isFunction$1(r)) t[i] = normalizeSlot$1(i, r, n)
      else if (null != r) {
        const e = normalizeSlotValue(r)
        t[i] = () => e
      }
    }
  },
  normalizeVNodeSlots = (e, t) => {
    const r = normalizeSlotValue(t)
    e.slots.default = () => r
  },
  initSlots = (e, t) => {
    if (32 & e.vnode.shapeFlag) {
      const r = t._
      r ? ((e.slots = toRaw(t)), def(t, '_', r)) : normalizeObjectSlots(t, (e.slots = {}))
    } else (e.slots = {}), t && normalizeVNodeSlots(e, t)
    def(e.slots, InternalObjectKey, 1)
  },
  updateSlots = (e, t, r) => {
    const { vnode: n, slots: i } = e
    let s = !0,
      a = EMPTY_OBJ
    if (32 & n.shapeFlag) {
      const e = t._
      e
        ? r && 1 === e
          ? (s = !1)
          : (extend$1(i, t), r || 1 !== e || delete i._)
        : ((s = !t.$stable), normalizeObjectSlots(t, i)),
        (a = t)
    } else t && (normalizeVNodeSlots(e, t), (a = { default: 1 }))
    if (s) for (const o in i) isInternalKey(o) || o in a || delete i[o]
  }
function withDirectives(e, t) {
  if (null === currentRenderingInstance) return e
  const r = currentRenderingInstance.proxy,
    n = e.dirs || (e.dirs = [])
  for (let i = 0; i < t.length; i++) {
    let [e, s, a, o = EMPTY_OBJ] = t[i]
    isFunction$1(e) && (e = { mounted: e, updated: e }),
      e.deep && traverse(s),
      n.push({ dir: e, instance: r, value: s, oldValue: void 0, arg: a, modifiers: o })
  }
  return e
}
function invokeDirectiveHook(e, t, r, n) {
  const i = e.dirs,
    s = t && t.dirs
  for (let a = 0; a < i.length; a++) {
    const o = i[a]
    s && (o.oldValue = s[a].value)
    let l = o.dir[n]
    l && (pauseTracking(), callWithAsyncErrorHandling(l, r, 8, [e.el, o, e, t]), resetTracking())
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let uid = 0
function createAppAPI(e, t) {
  return function (r, n = null) {
    null == n || isObject$2(n) || (n = null)
    const i = createAppContext(),
      s = new Set()
    let a = !1
    const o = (i.app = {
      _uid: uid++,
      _component: r,
      _props: n,
      _container: null,
      _context: i,
      _instance: null,
      version: version,
      get config() {
        return i.config
      },
      set config(e) {},
      use: (e, ...t) => (
        s.has(e) ||
          (e && isFunction$1(e.install) ? (s.add(e), e.install(o, ...t)) : isFunction$1(e) && (s.add(e), e(o, ...t))),
        o
      ),
      mixin: (e) => (i.mixins.includes(e) || i.mixins.push(e), o),
      component: (e, t) => (t ? ((i.components[e] = t), o) : i.components[e]),
      directive: (e, t) => (t ? ((i.directives[e] = t), o) : i.directives[e]),
      mount(s, l, h) {
        if (!a) {
          const c = createVNode(r, n)
          return (
            (c.appContext = i),
            l && t ? t(c, s) : e(c, s, h),
            (a = !0),
            (o._container = s),
            (s.__vue_app__ = o),
            getExposeProxy(c.component) || c.component.proxy
          )
        }
      },
      unmount() {
        a && (e(null, o._container), delete o._container.__vue_app__)
      },
      provide: (e, t) => ((i.provides[e] = t), o),
    })
    return o
  }
}
const queuePostRenderEffect = queueEffectWithSuspense
function createRenderer(e) {
  return baseCreateRenderer(e)
}
function baseCreateRenderer(e, t) {
  getGlobalThis().__VUE__ = !0
  const {
      insert: r,
      remove: n,
      patchProp: i,
      createElement: s,
      createText: a,
      createComment: o,
      setText: l,
      setElementText: h,
      parentNode: c,
      nextSibling: p,
      setScopeId: u = NOOP,
      cloneNode: f,
      insertStaticContent: d,
    } = e,
    m = (e, t, r, n = null, i = null, s = null, a = !1, o = null, l = !!t.dynamicChildren) => {
      if (e === t) return
      e && !isSameVNodeType(e, t) && ((n = z(e)), V(e, i, s, !0), (e = null)),
        -2 === t.patchFlag && ((l = !1), (t.dynamicChildren = null))
      const { type: h, ref: c, shapeFlag: p } = t
      switch (h) {
        case Text:
          g(e, t, r, n)
          break
        case Comment:
          y(e, t, r, n)
          break
        case Static:
          null == e && v(t, r, n, a)
          break
        case Fragment:
          A(e, t, r, n, i, s, a, o, l)
          break
        default:
          1 & p
            ? b(e, t, r, n, i, s, a, o, l)
            : 6 & p
            ? T(e, t, r, n, i, s, a, o, l)
            : (64 & p || 128 & p) && h.process(e, t, r, n, i, s, a, o, l, H)
      }
      null != c && i && setRef(c, e && e.ref, s, t || e, !t)
    },
    g = (e, t, n, i) => {
      if (null == e) r((t.el = a(t.children)), n, i)
      else {
        const r = (t.el = e.el)
        t.children !== e.children && l(r, t.children)
      }
    },
    y = (e, t, n, i) => {
      null == e ? r((t.el = o(t.children || '')), n, i) : (t.el = e.el)
    },
    v = (e, t, r, n) => {
      ;[e.el, e.anchor] = d(e.children, t, r, n)
    },
    b = (e, t, r, n, i, s, a, o, l) => {
      ;(a = a || 'svg' === t.type), null == e ? E(t, r, n, i, s, a, o, l) : _(e, t, i, s, a, o, l)
    },
    E = (e, t, n, a, o, l, c, p) => {
      let u, d
      const { type: m, props: g, shapeFlag: y, transition: v, patchFlag: b, dirs: E } = e
      if (e.el && void 0 !== f && -1 === b) u = e.el = f(e.el)
      else {
        if (
          ((u = e.el = s(e.type, l, g && g.is, g)),
          8 & y ? h(u, e.children) : 16 & y && P(e.children, u, null, a, o, l && 'foreignObject' !== m, c, p),
          E && invokeDirectiveHook(e, null, a, 'created'),
          g)
        ) {
          for (const t in g) 'value' === t || isReservedProp(t) || i(u, t, null, g[t], l, e.children, a, o, $)
          'value' in g && i(u, 'value', null, g.value), (d = g.onVnodeBeforeMount) && invokeVNodeHook(d, a, e)
        }
        S(u, e, e.scopeId, c, a)
      }
      E && invokeDirectiveHook(e, null, a, 'beforeMount')
      const _ = (!o || (o && !o.pendingBranch)) && v && !v.persisted
      _ && v.beforeEnter(u),
        r(u, t, n),
        ((d = g && g.onVnodeMounted) || _ || E) &&
          queuePostRenderEffect(() => {
            d && invokeVNodeHook(d, a, e), _ && v.enter(u), E && invokeDirectiveHook(e, null, a, 'mounted')
          }, o)
    },
    S = (e, t, r, n, i) => {
      if ((r && u(e, r), n)) for (let s = 0; s < n.length; s++) u(e, n[s])
      if (i) {
        if (t === i.subTree) {
          const t = i.vnode
          S(e, t, t.scopeId, t.slotScopeIds, i.parent)
        }
      }
    },
    P = (e, t, r, n, i, s, a, o, l = 0) => {
      for (let h = l; h < e.length; h++) {
        const l = (e[h] = o ? cloneIfMounted(e[h]) : normalizeVNode(e[h]))
        m(null, l, t, r, n, i, s, a, o)
      }
    },
    _ = (e, t, r, n, s, a, o) => {
      const l = (t.el = e.el)
      let { patchFlag: c, dynamicChildren: p, dirs: u } = t
      c |= 16 & e.patchFlag
      const f = e.props || EMPTY_OBJ,
        d = t.props || EMPTY_OBJ
      let m
      ;(m = d.onVnodeBeforeUpdate) && invokeVNodeHook(m, r, t, e), u && invokeDirectiveHook(t, e, r, 'beforeUpdate')
      const g = s && 'foreignObject' !== t.type
      if ((p ? x(e.dynamicChildren, p, l, r, n, g, a) : o || F(e, t, l, null, r, n, g, a, !1), c > 0)) {
        if (16 & c) C(l, t, f, d, r, n, s)
        else if (
          (2 & c && f.class !== d.class && i(l, 'class', null, d.class, s),
          4 & c && i(l, 'style', f.style, d.style, s),
          8 & c)
        ) {
          const a = t.dynamicProps
          for (let t = 0; t < a.length; t++) {
            const o = a[t],
              h = f[o],
              c = d[o]
            ;(c === h && 'value' !== o) || i(l, o, h, c, s, e.children, r, n, $)
          }
        }
        1 & c && e.children !== t.children && h(l, t.children)
      } else o || null != p || C(l, t, f, d, r, n, s)
      ;((m = d.onVnodeUpdated) || u) &&
        queuePostRenderEffect(() => {
          m && invokeVNodeHook(m, r, t, e), u && invokeDirectiveHook(t, e, r, 'updated')
        }, n)
    },
    x = (e, t, r, n, i, s, a) => {
      for (let o = 0; o < t.length; o++) {
        const l = e[o],
          h = t[o],
          p = l.el && (l.type === Fragment || !isSameVNodeType(l, h) || 70 & l.shapeFlag) ? c(l.el) : r
        m(l, h, p, null, n, i, s, a, !0)
      }
    },
    C = (e, t, r, n, s, a, o) => {
      if (r !== n) {
        for (const l in n) {
          if (isReservedProp(l)) continue
          const h = n[l],
            c = r[l]
          h !== c && 'value' !== l && i(e, l, c, h, o, t.children, s, a, $)
        }
        if (r !== EMPTY_OBJ)
          for (const l in r) isReservedProp(l) || l in n || i(e, l, r[l], null, o, t.children, s, a, $)
        'value' in n && i(e, 'value', r.value, n.value)
      }
    },
    A = (e, t, n, i, s, o, l, h, c) => {
      const p = (t.el = e ? e.el : a('')),
        u = (t.anchor = e ? e.anchor : a(''))
      let { patchFlag: f, dynamicChildren: d, slotScopeIds: m } = t
      m && (h = h ? h.concat(m) : m),
        null == e
          ? (r(p, n, i), r(u, n, i), P(t.children, n, u, s, o, l, h, c))
          : f > 0 && 64 & f && d && e.dynamicChildren
          ? (x(e.dynamicChildren, d, n, s, o, l, h),
            (null != t.key || (s && t === s.subTree)) && traverseStaticChildren(e, t, !0))
          : F(e, t, n, u, s, o, l, h, c)
    },
    T = (e, t, r, n, i, s, a, o, l) => {
      ;(t.slotScopeIds = o),
        null == e ? (512 & t.shapeFlag ? i.ctx.activate(t, r, n, a, l) : k(t, r, n, i, s, a, l)) : w(e, t, l)
    },
    k = (e, t, r, n, i, s, a) => {
      const o = (e.component = createComponentInstance(e, n, i))
      if ((isKeepAlive(e) && (o.ctx.renderer = H), setupComponent(o), o.asyncDep)) {
        if ((i && i.registerDep(o, M), !e.el)) {
          const e = (o.subTree = createVNode(Comment))
          y(null, e, t, r)
        }
      } else M(o, e, t, r, i, s, a)
    },
    w = (e, t, r) => {
      const n = (t.component = e.component)
      if (shouldUpdateComponent(e, t, r)) {
        if (n.asyncDep && !n.asyncResolved) return void I(n, t, r)
        ;(n.next = t), invalidateJob(n.update), n.update()
      } else (t.component = e.component), (t.el = e.el), (n.vnode = t)
    },
    M = (e, t, r, n, i, s, a) => {
      const o = new ReactiveEffect(
          () => {
            if (e.isMounted) {
              let t,
                { next: r, bu: n, u: l, parent: h, vnode: p } = e,
                u = r
              ;(o.allowRecurse = !1),
                r ? ((r.el = p.el), I(e, r, a)) : (r = p),
                n && invokeArrayFns(n),
                (t = r.props && r.props.onVnodeBeforeUpdate) && invokeVNodeHook(t, h, r, p),
                (o.allowRecurse = !0)
              const f = renderComponentRoot(e),
                d = e.subTree
              ;(e.subTree = f),
                m(d, f, c(d.el), z(d), e, i, s),
                (r.el = f.el),
                null === u && updateHOCHostEl(e, f.el),
                l && queuePostRenderEffect(l, i),
                (t = r.props && r.props.onVnodeUpdated) && queuePostRenderEffect(() => invokeVNodeHook(t, h, r, p), i)
            } else {
              let a
              const { el: l, props: h } = t,
                { bm: c, m: p, parent: u } = e,
                f = isAsyncWrapper(t)
              if (
                ((o.allowRecurse = !1),
                c && invokeArrayFns(c),
                !f && (a = h && h.onVnodeBeforeMount) && invokeVNodeHook(a, u, t),
                (o.allowRecurse = !0),
                l && q)
              ) {
                const r = () => {
                  ;(e.subTree = renderComponentRoot(e)), q(l, e.subTree, e, i, null)
                }
                f ? t.type.__asyncLoader().then(() => !e.isUnmounted && r()) : r()
              } else {
                const a = (e.subTree = renderComponentRoot(e))
                m(null, a, r, n, e, i, s), (t.el = a.el)
              }
              if ((p && queuePostRenderEffect(p, i), !f && (a = h && h.onVnodeMounted))) {
                const e = t
                queuePostRenderEffect(() => invokeVNodeHook(a, u, e), i)
              }
              256 & t.shapeFlag && e.a && queuePostRenderEffect(e.a, i), (e.isMounted = !0), (t = r = n = null)
            }
          },
          () => queueJob(e.update),
          e.scope
        ),
        l = (e.update = o.run.bind(o))
      ;(l.id = e.uid), (o.allowRecurse = l.allowRecurse = !0), l()
    },
    I = (e, t, r) => {
      t.component = e
      const n = e.vnode.props
      ;(e.vnode = t),
        (e.next = null),
        updateProps(e, t.props, n, r),
        updateSlots(e, t.children, r),
        pauseTracking(),
        flushPreFlushCbs(void 0, e.update),
        resetTracking()
    },
    F = (e, t, r, n, i, s, a, o, l = !1) => {
      const c = e && e.children,
        p = e ? e.shapeFlag : 0,
        u = t.children,
        { patchFlag: f, shapeFlag: d } = t
      if (f > 0) {
        if (128 & f) return void D(c, u, r, n, i, s, a, o, l)
        if (256 & f) return void R(c, u, r, n, i, s, a, o, l)
      }
      8 & d
        ? (16 & p && $(c, i, s), u !== c && h(r, u))
        : 16 & p
        ? 16 & d
          ? D(c, u, r, n, i, s, a, o, l)
          : $(c, i, s, !0)
        : (8 & p && h(r, ''), 16 & d && P(u, r, n, i, s, a, o, l))
    },
    R = (e, t, r, n, i, s, a, o, l) => {
      t = t || EMPTY_ARR
      const h = (e = e || EMPTY_ARR).length,
        c = t.length,
        p = Math.min(h, c)
      let u
      for (u = 0; u < p; u++) {
        const n = (t[u] = l ? cloneIfMounted(t[u]) : normalizeVNode(t[u]))
        m(e[u], n, r, null, i, s, a, o, l)
      }
      h > c ? $(e, i, s, !0, !1, p) : P(t, r, n, i, s, a, o, l, p)
    },
    D = (e, t, r, n, i, s, a, o, l) => {
      let h = 0
      const c = t.length
      let p = e.length - 1,
        u = c - 1
      for (; h <= p && h <= u; ) {
        const n = e[h],
          c = (t[h] = l ? cloneIfMounted(t[h]) : normalizeVNode(t[h]))
        if (!isSameVNodeType(n, c)) break
        m(n, c, r, null, i, s, a, o, l), h++
      }
      for (; h <= p && h <= u; ) {
        const n = e[p],
          h = (t[u] = l ? cloneIfMounted(t[u]) : normalizeVNode(t[u]))
        if (!isSameVNodeType(n, h)) break
        m(n, h, r, null, i, s, a, o, l), p--, u--
      }
      if (h > p) {
        if (h <= u) {
          const e = u + 1,
            p = e < c ? t[e].el : n
          for (; h <= u; ) m(null, (t[h] = l ? cloneIfMounted(t[h]) : normalizeVNode(t[h])), r, p, i, s, a, o, l), h++
        }
      } else if (h > u) for (; h <= p; ) V(e[h], i, s, !0), h++
      else {
        const f = h,
          d = h,
          g = new Map()
        for (h = d; h <= u; h++) {
          const e = (t[h] = l ? cloneIfMounted(t[h]) : normalizeVNode(t[h]))
          null != e.key && g.set(e.key, h)
        }
        let y,
          v = 0
        const b = u - d + 1
        let E = !1,
          S = 0
        const P = new Array(b)
        for (h = 0; h < b; h++) P[h] = 0
        for (h = f; h <= p; h++) {
          const n = e[h]
          if (v >= b) {
            V(n, i, s, !0)
            continue
          }
          let c
          if (null != n.key) c = g.get(n.key)
          else
            for (y = d; y <= u; y++)
              if (0 === P[y - d] && isSameVNodeType(n, t[y])) {
                c = y
                break
              }
          void 0 === c
            ? V(n, i, s, !0)
            : ((P[c - d] = h + 1), c >= S ? (S = c) : (E = !0), m(n, t[c], r, null, i, s, a, o, l), v++)
        }
        const _ = E ? getSequence(P) : EMPTY_ARR
        for (y = _.length - 1, h = b - 1; h >= 0; h--) {
          const e = d + h,
            p = t[e],
            u = e + 1 < c ? t[e + 1].el : n
          0 === P[h] ? m(null, p, r, u, i, s, a, o, l) : E && (y < 0 || h !== _[y] ? O(p, r, u, 2) : y--)
        }
      }
    },
    O = (e, t, n, i, s = null) => {
      const { el: a, type: o, transition: l, children: h, shapeFlag: c } = e
      if (6 & c) return void O(e.component.subTree, t, n, i)
      if (128 & c) return void e.suspense.move(t, n, i)
      if (64 & c) return void o.move(e, t, n, H)
      if (o === Fragment) {
        r(a, t, n)
        for (let e = 0; e < h.length; e++) O(h[e], t, n, i)
        return void r(e.anchor, t, n)
      }
      if (o === Static)
        return void (({ el: e, anchor: t }, n, i) => {
          let s
          for (; e && e !== t; ) (s = p(e)), r(e, n, i), (e = s)
          r(t, n, i)
        })(e, t, n)
      if (2 !== i && 1 & c && l)
        if (0 === i) l.beforeEnter(a), r(a, t, n), queuePostRenderEffect(() => l.enter(a), s)
        else {
          const { leave: e, delayLeave: i, afterLeave: s } = l,
            o = () => r(a, t, n),
            h = () => {
              e(a, () => {
                o(), s && s()
              })
            }
          i ? i(a, o, h) : h()
        }
      else r(a, t, n)
    },
    V = (e, t, r, n = !1, i = !1) => {
      const { type: s, props: a, ref: o, children: l, dynamicChildren: h, shapeFlag: c, patchFlag: p, dirs: u } = e
      if ((null != o && setRef(o, null, r, e, !0), 256 & c)) return void t.ctx.deactivate(e)
      const f = 1 & c && u,
        d = !isAsyncWrapper(e)
      let m
      if ((d && (m = a && a.onVnodeBeforeUnmount) && invokeVNodeHook(m, t, e), 6 & c)) N(e.component, r, n)
      else {
        if (128 & c) return void e.suspense.unmount(r, n)
        f && invokeDirectiveHook(e, null, t, 'beforeUnmount'),
          64 & c
            ? e.type.remove(e, t, r, i, H, n)
            : h && (s !== Fragment || (p > 0 && 64 & p))
            ? $(h, t, r, !1, !0)
            : ((s === Fragment && 384 & p) || (!i && 16 & c)) && $(l, t, r),
          n && B(e)
      }
      ;((d && (m = a && a.onVnodeUnmounted)) || f) &&
        queuePostRenderEffect(() => {
          m && invokeVNodeHook(m, t, e), f && invokeDirectiveHook(e, null, t, 'unmounted')
        }, r)
    },
    B = (e) => {
      const { type: t, el: r, anchor: i, transition: s } = e
      if (t === Fragment) return void L(r, i)
      if (t === Static)
        return void (({ el: e, anchor: t }) => {
          let r
          for (; e && e !== t; ) (r = p(e)), n(e), (e = r)
          n(t)
        })(e)
      const a = () => {
        n(r), s && !s.persisted && s.afterLeave && s.afterLeave()
      }
      if (1 & e.shapeFlag && s && !s.persisted) {
        const { leave: t, delayLeave: n } = s,
          i = () => t(r, a)
        n ? n(e.el, a, i) : i()
      } else a()
    },
    L = (e, t) => {
      let r
      for (; e !== t; ) (r = p(e)), n(e), (e = r)
      n(t)
    },
    N = (e, t, r) => {
      const { bum: n, scope: i, update: s, subTree: a, um: o } = e
      n && invokeArrayFns(n),
        i.stop(),
        s && ((s.active = !1), V(a, e, t, r)),
        o && queuePostRenderEffect(o, t),
        queuePostRenderEffect(() => {
          e.isUnmounted = !0
        }, t),
        t &&
          t.pendingBranch &&
          !t.isUnmounted &&
          e.asyncDep &&
          !e.asyncResolved &&
          e.suspenseId === t.pendingId &&
          (t.deps--, 0 === t.deps && t.resolve())
    },
    $ = (e, t, r, n = !1, i = !1, s = 0) => {
      for (let a = s; a < e.length; a++) V(e[a], t, r, n, i)
    },
    z = (e) => (6 & e.shapeFlag ? z(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el)),
    G = (e, t, r) => {
      null == e ? t._vnode && V(t._vnode, null, null, !0) : m(t._vnode || null, e, t, null, null, null, r),
        flushPostFlushCbs(),
        (t._vnode = e)
    },
    H = { p: m, um: V, m: O, r: B, mt: k, mc: P, pc: F, pbc: x, n: z, o: e }
  let j, q
  return t && ([j, q] = t(H)), { render: G, hydrate: j, createApp: createAppAPI(G, j) }
}
function setRef(e, t, r, n, i = !1) {
  if (isArray$1(e)) return void e.forEach((e, s) => setRef(e, t && (isArray$1(t) ? t[s] : t), r, n, i))
  if (isAsyncWrapper(n) && !i) return
  const s = 4 & n.shapeFlag ? getExposeProxy(n.component) || n.component.proxy : n.el,
    a = i ? null : s,
    { i: o, r: l } = e,
    h = t && t.r,
    c = o.refs === EMPTY_OBJ ? (o.refs = {}) : o.refs,
    p = o.setupState
  if (
    (null != h &&
      h !== l &&
      (isString$1(h) ? ((c[h] = null), hasOwn(p, h) && (p[h] = null)) : isRef(h) && (h.value = null)),
    isString$1(l))
  ) {
    const e = () => {
      ;(c[l] = a), hasOwn(p, l) && (p[l] = a)
    }
    a ? ((e.id = -1), queuePostRenderEffect(e, r)) : e()
  } else if (isRef(l)) {
    const e = () => {
      l.value = a
    }
    a ? ((e.id = -1), queuePostRenderEffect(e, r)) : e()
  } else isFunction$1(l) && callWithErrorHandling(l, o, 12, [a, c])
}
function invokeVNodeHook(e, t, r, n = null) {
  callWithAsyncErrorHandling(e, t, 7, [r, n])
}
function traverseStaticChildren(e, t, r = !1) {
  const n = e.children,
    i = t.children
  if (isArray$1(n) && isArray$1(i))
    for (let s = 0; s < n.length; s++) {
      const e = n[s]
      let t = i[s]
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) && ((t = i[s] = cloneIfMounted(i[s])), (t.el = e.el)),
        r || traverseStaticChildren(e, t))
    }
}
function getSequence(e) {
  const t = e.slice(),
    r = [0]
  let n, i, s, a, o
  const l = e.length
  for (n = 0; n < l; n++) {
    const l = e[n]
    if (0 !== l) {
      if (((i = r[r.length - 1]), e[i] < l)) {
        ;(t[n] = i), r.push(n)
        continue
      }
      for (s = 0, a = r.length - 1; s < a; ) (o = (s + a) >> 1), e[r[o]] < l ? (s = o + 1) : (a = o)
      l < e[r[s]] && (s > 0 && (t[n] = r[s - 1]), (r[s] = n))
    }
  }
  for (s = r.length, a = r[s - 1]; s-- > 0; ) (r[s] = a), (a = t[a])
  return r
}
const isTeleport = (e) => e.__isTeleport,
  COMPONENTS = 'components'
function resolveComponent(e, t) {
  return resolveAsset(COMPONENTS, e, !0, t) || e
}
const NULL_DYNAMIC_COMPONENT = Symbol()
function resolveAsset(e, t, r = !0, n = !1) {
  const i = currentRenderingInstance || currentInstance
  if (i) {
    const r = i.type
    if (e === COMPONENTS) {
      const e = getComponentName(r)
      if (e && (e === t || e === camelize(t) || e === capitalize(camelize(t)))) return r
    }
    const s = resolve(i[e] || r[e], t) || resolve(i.appContext[e], t)
    return !s && n ? r : s
  }
}
function resolve(e, t) {
  return e && (e[t] || e[camelize(t)] || e[capitalize(camelize(t))])
}
const Fragment = Symbol(void 0),
  Text = Symbol(void 0),
  Comment = Symbol(void 0),
  Static = Symbol(void 0),
  blockStack = []
let currentBlock = null
function openBlock(e = !1) {
  blockStack.push((currentBlock = e ? null : []))
}
function closeBlock() {
  blockStack.pop(), (currentBlock = blockStack[blockStack.length - 1] || null)
}
let isBlockTreeEnabled = 1
function setBlockTracking(e) {
  isBlockTreeEnabled += e
}
function setupBlock(e) {
  return (
    (e.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null),
    closeBlock(),
    isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e),
    e
  )
}
function createElementBlock(e, t, r, n, i, s) {
  return setupBlock(createBaseVNode(e, t, r, n, i, s, !0))
}
function createBlock(e, t, r, n, i) {
  return setupBlock(createVNode(e, t, r, n, i, !0))
}
function isVNode(e) {
  return !!e && !0 === e.__v_isVNode
}
function isSameVNodeType(e, t) {
  return e.type === t.type && e.key === t.key
}
const InternalObjectKey = '__vInternal',
  normalizeKey = ({ key: e }) => (null != e ? e : null),
  normalizeRef = ({ ref: e }) =>
    null != e ? (isString$1(e) || isRef(e) || isFunction$1(e) ? { i: currentRenderingInstance, r: e } : e) : null
function createBaseVNode(e, t = null, r = null, n = 0, i = null, s = e === Fragment ? 0 : 1, a = !1, o = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && normalizeKey(t),
    ref: t && normalizeRef(t),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
  }
  return (
    o ? (normalizeChildren(l, r), 128 & s && e.normalize(l)) : r && (l.shapeFlag |= isString$1(r) ? 8 : 16),
    isBlockTreeEnabled > 0 &&
      !a &&
      currentBlock &&
      (l.patchFlag > 0 || 6 & s) &&
      32 !== l.patchFlag &&
      currentBlock.push(l),
    l
  )
}
const createVNode = _createVNode
function _createVNode(e, t = null, r = null, n = 0, i = null, s = !1) {
  if (((e && e !== NULL_DYNAMIC_COMPONENT) || (e = Comment), isVNode(e))) {
    const n = cloneVNode(e, t, !0)
    return r && normalizeChildren(n, r), n
  }
  if ((isClassComponent(e) && (e = e.__vccOpts), t)) {
    t = guardReactiveProps(t)
    let { class: e, style: r } = t
    e && !isString$1(e) && (t.class = normalizeClass(e)),
      isObject$2(r) && (isProxy(r) && !isArray$1(r) && (r = extend$1({}, r)), (t.style = normalizeStyle(r)))
  }
  return createBaseVNode(
    e,
    t,
    r,
    n,
    i,
    isString$1(e) ? 1 : isSuspense(e) ? 128 : isTeleport(e) ? 64 : isObject$2(e) ? 4 : isFunction$1(e) ? 2 : 0,
    s,
    !0
  )
}
function guardReactiveProps(e) {
  return e ? (isProxy(e) || InternalObjectKey in e ? extend$1({}, e) : e) : null
}
function cloneVNode(e, t, r = !1) {
  const { props: n, ref: i, patchFlag: s, children: a } = e,
    o = t ? mergeProps(n || {}, t) : n
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: o,
    key: o && normalizeKey(o),
    ref:
      t && t.ref ? (r && i ? (isArray$1(i) ? i.concat(normalizeRef(t)) : [i, normalizeRef(t)]) : normalizeRef(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Fragment ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && cloneVNode(e.ssContent),
    ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  }
}
function createTextVNode(e = ' ', t = 0) {
  return createVNode(Text, null, e, t)
}
function createCommentVNode(e = '', t = !1) {
  return t ? (openBlock(), createBlock(Comment, null, e)) : createVNode(Comment, null, e)
}
function normalizeVNode(e) {
  return null == e || 'boolean' == typeof e
    ? createVNode(Comment)
    : isArray$1(e)
    ? createVNode(Fragment, null, e.slice())
    : 'object' == typeof e
    ? cloneIfMounted(e)
    : createVNode(Text, null, String(e))
}
function cloneIfMounted(e) {
  return null === e.el || e.memo ? e : cloneVNode(e)
}
function normalizeChildren(e, t) {
  let r = 0
  const { shapeFlag: n } = e
  if (null == t) t = null
  else if (isArray$1(t)) r = 16
  else if ('object' == typeof t) {
    if (65 & n) {
      const r = t.default
      return void (r && (r._c && (r._d = !1), normalizeChildren(e, r()), r._c && (r._d = !0)))
    }
    {
      r = 32
      const n = t._
      n || InternalObjectKey in t
        ? 3 === n &&
          currentRenderingInstance &&
          (1 === currentRenderingInstance.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = currentRenderingInstance)
    }
  } else
    isFunction$1(t)
      ? ((t = { default: t, _ctx: currentRenderingInstance }), (r = 32))
      : ((t = String(t)), 64 & n ? ((r = 16), (t = [createTextVNode(t)])) : (r = 8))
  ;(e.children = t), (e.shapeFlag |= r)
}
function mergeProps(...e) {
  const t = {}
  for (let r = 0; r < e.length; r++) {
    const n = e[r]
    for (const e in n)
      if ('class' === e) t.class !== n.class && (t.class = normalizeClass([t.class, n.class]))
      else if ('style' === e) t.style = normalizeStyle([t.style, n.style])
      else if (isOn(e)) {
        const r = t[e],
          i = n[e]
        r === i || (isArray$1(r) && r.includes(i)) || (t[e] = r ? [].concat(r, i) : i)
      } else '' !== e && (t[e] = n[e])
  }
  return t
}
function renderSlot(e, t, r = {}, n, i) {
  if (currentRenderingInstance.isCE) return createVNode('slot', 'default' === t ? null : { name: t }, n && n())
  let s = e[t]
  s && s._c && (s._d = !1), openBlock()
  const a = s && ensureValidVNode(s(r)),
    o = createBlock(Fragment, { key: r.key || `_${t}` }, a || (n ? n() : []), a && 1 === e._ ? 64 : -2)
  return !i && o.scopeId && (o.slotScopeIds = [o.scopeId + '-s']), s && s._c && (s._d = !0), o
}
function ensureValidVNode(e) {
  return e.some((e) => !isVNode(e) || (e.type !== Comment && !(e.type === Fragment && !ensureValidVNode(e.children))))
    ? e
    : null
}
const getPublicInstance = (e) =>
    e ? (isStatefulComponent(e) ? getExposeProxy(e) || e.proxy : getPublicInstance(e.parent)) : null,
  publicPropertiesMap = extend$1(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => getPublicInstance(e.parent),
    $root: (e) => getPublicInstance(e.root),
    $emit: (e) => e.emit,
    $options: (e) => resolveMergedOptions(e),
    $forceUpdate: (e) => () => queueJob(e.update),
    $nextTick: (e) => nextTick.bind(e.proxy),
    $watch: (e) => instanceWatch.bind(e),
  }),
  PublicInstanceProxyHandlers = {
    get({ _: e }, t) {
      const { ctx: r, setupState: n, data: i, props: s, accessCache: a, type: o, appContext: l } = e
      let h
      if ('$' !== t[0]) {
        const o = a[t]
        if (void 0 !== o)
          switch (o) {
            case 0:
              return n[t]
            case 1:
              return i[t]
            case 3:
              return r[t]
            case 2:
              return s[t]
          }
        else {
          if (n !== EMPTY_OBJ && hasOwn(n, t)) return (a[t] = 0), n[t]
          if (i !== EMPTY_OBJ && hasOwn(i, t)) return (a[t] = 1), i[t]
          if ((h = e.propsOptions[0]) && hasOwn(h, t)) return (a[t] = 2), s[t]
          if (r !== EMPTY_OBJ && hasOwn(r, t)) return (a[t] = 3), r[t]
          shouldCacheAccess && (a[t] = 4)
        }
      }
      const c = publicPropertiesMap[t]
      let p, u
      return c
        ? ('$attrs' === t && track(e, 'get', t), c(e))
        : (p = o.__cssModules) && (p = p[t])
        ? p
        : r !== EMPTY_OBJ && hasOwn(r, t)
        ? ((a[t] = 3), r[t])
        : ((u = l.config.globalProperties), hasOwn(u, t) ? u[t] : void 0)
    },
    set({ _: e }, t, r) {
      const { data: n, setupState: i, ctx: s } = e
      if (i !== EMPTY_OBJ && hasOwn(i, t)) i[t] = r
      else if (n !== EMPTY_OBJ && hasOwn(n, t)) n[t] = r
      else if (hasOwn(e.props, t)) return !1
      return ('$' !== t[0] || !(t.slice(1) in e)) && ((s[t] = r), !0)
    },
    has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, propsOptions: s } }, a) {
      let o
      return (
        void 0 !== r[a] ||
        (e !== EMPTY_OBJ && hasOwn(e, a)) ||
        (t !== EMPTY_OBJ && hasOwn(t, a)) ||
        ((o = s[0]) && hasOwn(o, a)) ||
        hasOwn(n, a) ||
        hasOwn(publicPropertiesMap, a) ||
        hasOwn(i.config.globalProperties, a)
      )
    },
  },
  emptyAppContext = createAppContext()
let uid$1 = 0
function createComponentInstance(e, t, r) {
  const n = e.type,
    i = (t ? t.appContext : e.appContext) || emptyAppContext,
    s = {
      uid: uid$1++,
      vnode: e,
      type: n,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      update: null,
      scope: new EffectScope(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(n, i),
      emitsOptions: normalizeEmitsOptions(n, i),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: n.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (s.ctx = { _: s }), (s.root = t ? t.root : s), (s.emit = emit$1.bind(null, s)), e.ce && e.ce(s), s
}
let currentInstance = null
const getCurrentInstance = () => currentInstance || currentRenderingInstance,
  setCurrentInstance = (e) => {
    ;(currentInstance = e), e.scope.on()
  },
  unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off(), (currentInstance = null)
  }
function isStatefulComponent(e) {
  return 4 & e.vnode.shapeFlag
}
let isInSSRComponentSetup = !1,
  compile
function setupComponent(e, t = !1) {
  isInSSRComponentSetup = t
  const { props: r, children: n } = e.vnode,
    i = isStatefulComponent(e)
  initProps(e, r, i, t), initSlots(e, n)
  const s = i ? setupStatefulComponent(e, t) : void 0
  return (isInSSRComponentSetup = !1), s
}
function setupStatefulComponent(e, t) {
  const r = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = markRaw(new Proxy(e.ctx, PublicInstanceProxyHandlers)))
  const { setup: n } = r
  if (n) {
    const r = (e.setupContext = n.length > 1 ? createSetupContext(e) : null)
    setCurrentInstance(e), pauseTracking()
    const i = callWithErrorHandling(n, e, 0, [e.props, r])
    if ((resetTracking(), unsetCurrentInstance(), isPromise$1(i))) {
      if ((i.then(unsetCurrentInstance, unsetCurrentInstance), t))
        return i
          .then((r) => {
            handleSetupResult(e, r, t)
          })
          .catch((t) => {
            handleError(t, e, 0)
          })
      e.asyncDep = i
    } else handleSetupResult(e, i, t)
  } else finishComponentSetup(e, t)
}
function handleSetupResult(e, t, r) {
  isFunction$1(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : isObject$2(t) && (e.setupState = proxyRefs(t)),
    finishComponentSetup(e, r)
}
function finishComponentSetup(e, t, r) {
  const n = e.type
  if (!e.render) {
    if (!t && compile && !n.render) {
      const t = n.template
      if (t) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config,
          { delimiters: s, compilerOptions: a } = n,
          o = extend$1(extend$1({ isCustomElement: r, delimiters: s }, i), a)
        n.render = compile(t, o)
      }
    }
    e.render = n.render || NOOP
  }
  setCurrentInstance(e), pauseTracking(), applyOptions(e), resetTracking(), unsetCurrentInstance()
}
function createAttrsProxy(e) {
  return new Proxy(e.attrs, { get: (t, r) => (track(e, 'get', '$attrs'), t[r]) })
}
function createSetupContext(e) {
  const t = (t) => {
    e.exposed = t || {}
  }
  let r
  return {
    get attrs() {
      return r || (r = createAttrsProxy(e))
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function getExposeProxy(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)), {
        get: (t, r) => (r in t ? t[r] : r in publicPropertiesMap ? publicPropertiesMap[r](e) : void 0),
      }))
    )
}
function getComponentName(e) {
  return (isFunction$1(e) && e.displayName) || e.name
}
function isClassComponent(e) {
  return isFunction$1(e) && '__vccOpts' in e
}
function callWithErrorHandling(e, t, r, n) {
  let i
  try {
    i = n ? e(...n) : e()
  } catch (s) {
    handleError(s, t, r)
  }
  return i
}
function callWithAsyncErrorHandling(e, t, r, n) {
  if (isFunction$1(e)) {
    const i = callWithErrorHandling(e, t, r, n)
    return (
      i &&
        isPromise$1(i) &&
        i.catch((e) => {
          handleError(e, t, r)
        }),
      i
    )
  }
  const i = []
  for (let s = 0; s < e.length; s++) i.push(callWithAsyncErrorHandling(e[s], t, r, n))
  return i
}
function handleError(e, t, r, n = !0) {
  const i = t ? t.vnode : null
  if (t) {
    let n = t.parent
    const i = t.proxy,
      s = r
    for (; n; ) {
      const t = n.ec
      if (t) for (let r = 0; r < t.length; r++) if (!1 === t[r](e, i, s)) return
      n = n.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) return void callWithErrorHandling(a, null, 10, [e, i, s])
  }
  logError(e, r, i, n)
}
function logError(e, t, r, n = !0) {}
let isFlushing = !1,
  isFlushPending = !1
const queue = []
let flushIndex = 0
const pendingPreFlushCbs = []
let activePreFlushCbs = null,
  preFlushIndex = 0
const pendingPostFlushCbs = []
let activePostFlushCbs = null,
  postFlushIndex = 0
const resolvedPromise = Promise.resolve()
let currentFlushPromise = null,
  currentPreFlushParentJob = null
function nextTick(e) {
  const t = currentFlushPromise || resolvedPromise
  return e ? t.then(this ? e.bind(this) : e) : t
}
function findInsertionIndex(e) {
  let t = flushIndex + 1,
    r = queue.length
  for (; t < r; ) {
    const n = (t + r) >>> 1
    getId(queue[n]) < e ? (t = n + 1) : (r = n)
  }
  return t
}
function queueJob(e) {
  ;(queue.length && queue.includes(e, isFlushing && e.allowRecurse ? flushIndex + 1 : flushIndex)) ||
    e === currentPreFlushParentJob ||
    (null == e.id ? queue.push(e) : queue.splice(findInsertionIndex(e.id), 0, e), queueFlush())
}
function queueFlush() {
  isFlushing || isFlushPending || ((isFlushPending = !0), (currentFlushPromise = resolvedPromise.then(flushJobs)))
}
function invalidateJob(e) {
  const t = queue.indexOf(e)
  t > flushIndex && queue.splice(t, 1)
}
function queueCb(e, t, r, n) {
  isArray$1(e) ? r.push(...e) : (t && t.includes(e, e.allowRecurse ? n + 1 : n)) || r.push(e), queueFlush()
}
function queuePreFlushCb(e) {
  queueCb(e, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex)
}
function queuePostFlushCb(e) {
  queueCb(e, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex)
}
function flushPreFlushCbs(e, t = null) {
  if (pendingPreFlushCbs.length) {
    for (
      currentPreFlushParentJob = t,
        activePreFlushCbs = [...new Set(pendingPreFlushCbs)],
        pendingPreFlushCbs.length = 0,
        preFlushIndex = 0;
      preFlushIndex < activePreFlushCbs.length;
      preFlushIndex++
    )
      activePreFlushCbs[preFlushIndex]()
    ;(activePreFlushCbs = null), (preFlushIndex = 0), (currentPreFlushParentJob = null), flushPreFlushCbs(e, t)
  }
}
function flushPostFlushCbs(e) {
  if (pendingPostFlushCbs.length) {
    const e = [...new Set(pendingPostFlushCbs)]
    if (((pendingPostFlushCbs.length = 0), activePostFlushCbs)) return void activePostFlushCbs.push(...e)
    for (
      activePostFlushCbs = e, activePostFlushCbs.sort((e, t) => getId(e) - getId(t)), postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    )
      activePostFlushCbs[postFlushIndex]()
    ;(activePostFlushCbs = null), (postFlushIndex = 0)
  }
}
const getId = (e) => (null == e.id ? 1 / 0 : e.id)
function flushJobs(e) {
  ;(isFlushPending = !1), (isFlushing = !0), flushPreFlushCbs(e), queue.sort((e, t) => getId(e) - getId(t))
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const e = queue[flushIndex]
      e && !1 !== e.active && callWithErrorHandling(e, null, 14)
    }
  } finally {
    ;(flushIndex = 0),
      (queue.length = 0),
      flushPostFlushCbs(),
      (isFlushing = !1),
      (currentFlushPromise = null),
      (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) && flushJobs(e)
  }
}
const INITIAL_WATCHER_VALUE = {}
function watch(e, t, r) {
  return doWatch(e, t, r)
}
function doWatch(e, t, { immediate: r, deep: n, flush: i, onTrack: s, onTrigger: a } = EMPTY_OBJ) {
  const o = currentInstance
  let l,
    h,
    c = !1,
    p = !1
  if (
    (isRef(e)
      ? ((l = () => e.value), (c = !!e._shallow))
      : isReactive(e)
      ? ((l = () => e), (n = !0))
      : isArray$1(e)
      ? ((p = !0),
        (c = e.some(isReactive)),
        (l = () =>
          e.map((e) =>
            isRef(e) ? e.value : isReactive(e) ? traverse(e) : isFunction$1(e) ? callWithErrorHandling(e, o, 2) : void 0
          )))
      : (l = isFunction$1(e)
          ? t
            ? () => callWithErrorHandling(e, o, 2)
            : () => {
                if (!o || !o.isUnmounted) return h && h(), callWithAsyncErrorHandling(e, o, 3, [u])
              }
          : NOOP),
    t && n)
  ) {
    const e = l
    l = () => traverse(e())
  }
  let u = (e) => {
    h = g.onStop = () => {
      callWithErrorHandling(e, o, 4)
    }
  }
  if (isInSSRComponentSetup)
    return (u = NOOP), t ? r && callWithAsyncErrorHandling(t, o, 3, [l(), p ? [] : void 0, u]) : l(), NOOP
  let f = p ? [] : INITIAL_WATCHER_VALUE
  const d = () => {
    if (g.active)
      if (t) {
        const e = g.run()
        ;(n || c || (p ? e.some((e, t) => hasChanged(e, f[t])) : hasChanged(e, f))) &&
          (h && h(), callWithAsyncErrorHandling(t, o, 3, [e, f === INITIAL_WATCHER_VALUE ? void 0 : f, u]), (f = e))
      } else g.run()
  }
  let m
  ;(d.allowRecurse = !!t),
    (m =
      'sync' === i
        ? d
        : 'post' === i
        ? () => queuePostRenderEffect(d, o && o.suspense)
        : () => {
            !o || o.isMounted ? queuePreFlushCb(d) : d()
          })
  const g = new ReactiveEffect(l, m)
  return (
    t ? (r ? d() : (f = g.run())) : 'post' === i ? queuePostRenderEffect(g.run.bind(g), o && o.suspense) : g.run(),
    () => {
      g.stop(), o && o.scope && remove(o.scope.effects, g)
    }
  )
}
function instanceWatch(e, t, r) {
  const n = this.proxy,
    i = isString$1(e) ? (e.includes('.') ? createPathGetter(n, e) : () => n[e]) : e.bind(n, n)
  let s
  isFunction$1(t) ? (s = t) : ((s = t.handler), (r = t))
  const a = currentInstance
  setCurrentInstance(this)
  const o = doWatch(i, s.bind(n), r)
  return a ? setCurrentInstance(a) : unsetCurrentInstance(), o
}
function createPathGetter(e, t) {
  const r = t.split('.')
  return () => {
    let t = e
    for (let e = 0; e < r.length && t; e++) t = t[r[e]]
    return t
  }
}
function traverse(e, t) {
  if (!isObject$2(e) || e.__v_skip) return e
  if ((t = t || new Set()).has(e)) return e
  if ((t.add(e), isRef(e))) traverse(e.value, t)
  else if (isArray$1(e)) for (let r = 0; r < e.length; r++) traverse(e[r], t)
  else if (isSet(e) || isMap(e))
    e.forEach((e) => {
      traverse(e, t)
    })
  else if (isPlainObject$1(e)) for (const r in e) traverse(e[r], t)
  return e
}
function h(e, t, r) {
  const n = arguments.length
  return 2 === n
    ? isObject$2(t) && !isArray$1(t)
      ? isVNode(t)
        ? createVNode(e, null, [t])
        : createVNode(e, t)
      : createVNode(e, null, t)
    : (n > 3 ? (r = Array.prototype.slice.call(arguments, 2)) : 3 === n && isVNode(r) && (r = [r]),
      createVNode(e, t, r))
}
const version = '3.2.22',
  svgNS = 'http://www.w3.org/2000/svg',
  doc = 'undefined' != typeof document ? document : null,
  staticTemplateCache = new Map(),
  nodeOps = {
    insert: (e, t, r) => {
      t.insertBefore(e, r || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, r, n) => {
      const i = t ? doc.createElementNS(svgNS, e) : doc.createElement(e, r ? { is: r } : void 0)
      return 'select' === e && n && null != n.multiple && i.setAttribute('multiple', n.multiple), i
    },
    createText: (e) => doc.createTextNode(e),
    createComment: (e) => doc.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => doc.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    cloneNode(e) {
      const t = e.cloneNode(!0)
      return '_value' in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, r, n) {
      const i = r ? r.previousSibling : t.lastChild
      let s = staticTemplateCache.get(e)
      if (!s) {
        const t = doc.createElement('template')
        if (((t.innerHTML = n ? `<svg>${e}</svg>` : e), (s = t.content), n)) {
          const e = s.firstChild
          for (; e.firstChild; ) s.appendChild(e.firstChild)
          s.removeChild(e)
        }
        staticTemplateCache.set(e, s)
      }
      return t.insertBefore(s.cloneNode(!0), r), [i ? i.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild]
    },
  }
function patchClass(e, t, r) {
  const n = e._vtc
  n && (t = (t ? [t, ...n] : [...n]).join(' ')),
    null == t ? e.removeAttribute('class') : r ? e.setAttribute('class', t) : (e.className = t)
}
function patchStyle(e, t, r) {
  const n = e.style,
    i = isString$1(r)
  if (r && !i) {
    for (const e in r) setStyle(n, e, r[e])
    if (t && !isString$1(t)) for (const e in t) null == r[e] && setStyle(n, e, '')
  } else {
    const s = n.display
    i ? t !== r && (n.cssText = r) : t && e.removeAttribute('style'), '_vod' in e && (n.display = s)
  }
}
const importantRE = /\s*!important$/
function setStyle(e, t, r) {
  if (isArray$1(r)) r.forEach((r) => setStyle(e, t, r))
  else if (t.startsWith('--')) e.setProperty(t, r)
  else {
    const n = autoPrefix(e, t)
    importantRE.test(r) ? e.setProperty(hyphenate(n), r.replace(importantRE, ''), 'important') : (e[n] = r)
  }
}
const prefixes = ['Webkit', 'Moz', 'ms'],
  prefixCache = {}
function autoPrefix(e, t) {
  const r = prefixCache[t]
  if (r) return r
  let n = camelize(t)
  if ('filter' !== n && n in e) return (prefixCache[t] = n)
  n = capitalize(n)
  for (let i = 0; i < prefixes.length; i++) {
    const r = prefixes[i] + n
    if (r in e) return (prefixCache[t] = r)
  }
  return t
}
const xlinkNS = 'http://www.w3.org/1999/xlink'
function patchAttr(e, t, r, n, i) {
  if (n && t.startsWith('xlink:'))
    null == r ? e.removeAttributeNS(xlinkNS, t.slice(6, t.length)) : e.setAttributeNS(xlinkNS, t, r)
  else {
    const n = isSpecialBooleanAttr(t)
    null == r || (n && !includeBooleanAttr(r)) ? e.removeAttribute(t) : e.setAttribute(t, n ? '' : r)
  }
}
function patchDOMProp(e, t, r, n, i, s, a) {
  if ('innerHTML' === t || 'textContent' === t) return n && a(n, i, s), void (e[t] = null == r ? '' : r)
  if ('value' === t && 'PROGRESS' !== e.tagName) {
    e._value = r
    const n = null == r ? '' : r
    return e.value !== n && (e.value = n), void (null == r && e.removeAttribute(t))
  }
  if ('' === r || null == r) {
    const n = typeof e[t]
    if ('boolean' === n) return void (e[t] = includeBooleanAttr(r))
    if (null == r && 'string' === n) return (e[t] = ''), void e.removeAttribute(t)
    if ('number' === n) {
      try {
        e[t] = 0
      } catch (o) {}
      return void e.removeAttribute(t)
    }
  }
  try {
    e[t] = r
  } catch (l) {}
}
let _getNow = Date.now,
  skipTimestampCheck = !1
if ('undefined' != typeof window) {
  _getNow() > document.createEvent('Event').timeStamp && (_getNow = () => performance.now())
  const e = navigator.userAgent.match(/firefox\/(\d+)/i)
  skipTimestampCheck = !!(e && Number(e[1]) <= 53)
}
let cachedNow = 0
const p = Promise.resolve(),
  reset = () => {
    cachedNow = 0
  },
  getNow = () => cachedNow || (p.then(reset), (cachedNow = _getNow()))
function addEventListener(e, t, r, n) {
  e.addEventListener(t, r, n)
}
function removeEventListener(e, t, r, n) {
  e.removeEventListener(t, r, n)
}
function patchEvent(e, t, r, n, i = null) {
  const s = e._vei || (e._vei = {}),
    a = s[t]
  if (n && a) a.value = n
  else {
    const [r, o] = parseName(t)
    if (n) {
      addEventListener(e, r, (s[t] = createInvoker(n, i)), o)
    } else a && (removeEventListener(e, r, a, o), (s[t] = void 0))
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/
function parseName(e) {
  let t
  if (optionsModifierRE.test(e)) {
    let r
    for (t = {}; (r = e.match(optionsModifierRE)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [hyphenate(e.slice(2)), t]
}
function createInvoker(e, t) {
  const r = (e) => {
    const n = e.timeStamp || _getNow()
    ;(skipTimestampCheck || n >= r.attached - 1) &&
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, r.value), t, 5, [e])
  }
  return (r.value = e), (r.attached = getNow()), r
}
function patchStopImmediatePropagation(e, t) {
  if (isArray$1(t)) {
    const r = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        r.call(e), (e._stopped = !0)
      }),
      t.map((e) => (t) => !t._stopped && e(t))
    )
  }
  return t
}
const nativeOnRE = /^on[a-z]/,
  patchProp = (e, t, r, n, i = !1, s, a, o, l) => {
    'class' === t
      ? patchClass(e, n, i)
      : 'style' === t
      ? patchStyle(e, r, n)
      : isOn(t)
      ? isModelListener(t) || patchEvent(e, t, r, n, a)
      : ('.' === t[0] ? ((t = t.slice(1)), 1) : '^' === t[0] ? ((t = t.slice(1)), 0) : shouldSetAsProp(e, t, n, i))
      ? patchDOMProp(e, t, n, s, a, o, l)
      : ('true-value' === t ? (e._trueValue = n) : 'false-value' === t && (e._falseValue = n), patchAttr(e, t, n, i))
  }
function shouldSetAsProp(e, t, r, n) {
  return n
    ? 'innerHTML' === t || 'textContent' === t || !!(t in e && nativeOnRE.test(t) && isFunction$1(r))
    : 'spellcheck' !== t &&
        'draggable' !== t &&
        'form' !== t &&
        ('list' !== t || 'INPUT' !== e.tagName) &&
        ('type' !== t || 'TEXTAREA' !== e.tagName) &&
        (!nativeOnRE.test(t) || !isString$1(r)) &&
        t in e
}
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
BaseTransition.props
const getModelAssigner = (e) => {
  const t = e.props['onUpdate:modelValue']
  return isArray$1(t) ? (e) => invokeArrayFns(t, e) : t
}
function onCompositionStart(e) {
  e.target.composing = !0
}
function onCompositionEnd(e) {
  const t = e.target
  t.composing && ((t.composing = !1), trigger(t, 'input'))
}
function trigger(e, t) {
  const r = document.createEvent('HTMLEvents')
  r.initEvent(t, !0, !0), e.dispatchEvent(r)
}
const vModelText = {
    created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
      e._assign = getModelAssigner(i)
      const s = n || (i.props && 'number' === i.props.type)
      addEventListener(e, t ? 'change' : 'input', (t) => {
        if (t.target.composing) return
        let n = e.value
        r ? (n = n.trim()) : s && (n = toNumber(n)), e._assign(n)
      }),
        r &&
          addEventListener(e, 'change', () => {
            e.value = e.value.trim()
          }),
        t ||
          (addEventListener(e, 'compositionstart', onCompositionStart),
          addEventListener(e, 'compositionend', onCompositionEnd),
          addEventListener(e, 'change', onCompositionEnd))
    },
    mounted(e, { value: t }) {
      e.value = null == t ? '' : t
    },
    beforeUpdate(e, { value: t, modifiers: { lazy: r, trim: n, number: i } }, s) {
      if (((e._assign = getModelAssigner(s)), e.composing)) return
      if (document.activeElement === e) {
        if (r) return
        if (n && e.value.trim() === t) return
        if ((i || 'number' === e.type) && toNumber(e.value) === t) return
      }
      const a = null == t ? '' : t
      e.value !== a && (e.value = a)
    },
  },
  vModelRadio = {
    created(e, { value: t }, r) {
      ;(e.checked = looseEqual(t, r.props.value)),
        (e._assign = getModelAssigner(r)),
        addEventListener(e, 'change', () => {
          e._assign(getValue(e))
        })
    },
    beforeUpdate(e, { value: t, oldValue: r }, n) {
      ;(e._assign = getModelAssigner(n)), t !== r && (e.checked = looseEqual(t, n.props.value))
    },
  }
function getValue(e) {
  return '_value' in e ? e._value : e.value
}
const vShow = {
  beforeMount(e, { value: t }, { transition: r }) {
    ;(e._vod = 'none' === e.style.display ? '' : e.style.display), r && t ? r.beforeEnter(e) : setDisplay(e, t)
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e)
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r &&
      (n
        ? t
          ? (n.beforeEnter(e), setDisplay(e, !0), n.enter(e))
          : n.leave(e, () => {
              setDisplay(e, !1)
            })
        : setDisplay(e, t))
  },
  beforeUnmount(e, { value: t }) {
    setDisplay(e, t)
  },
}
function setDisplay(e, t) {
  e.style.display = t ? e._vod : 'none'
}
const rendererOptions = extend$1({ patchProp: patchProp }, nodeOps)
let renderer
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}
const createApp = (...e) => {
  const t = ensureRenderer().createApp(...e),
    { mount: r } = t
  return (
    (t.mount = (e) => {
      const n = normalizeContainer(e)
      if (!n) return
      const i = t._component
      isFunction$1(i) || i.render || i.template || (i.template = n.innerHTML), (n.innerHTML = '')
      const s = r(n, !1, n instanceof SVGElement)
      return n instanceof Element && (n.removeAttribute('v-cloak'), n.setAttribute('data-v-app', '')), s
    }),
    t
  )
}
function normalizeContainer(e) {
  if (isString$1(e)) {
    return document.querySelector(e)
  }
  return e
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__
}
function getTarget() {
  return 'undefined' != typeof navigator && 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : {}
}
const isProxyAvailable = 'function' == typeof Proxy,
  HOOK_SETUP = 'devtools-plugin:setup',
  HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set'
class ApiProxy {
  constructor(e, t) {
    ;(this.target = null), (this.targetQueue = []), (this.onQueue = []), (this.plugin = e), (this.hook = t)
    const r = {}
    if (e.settings)
      for (const a in e.settings) {
        const t = e.settings[a]
        r[a] = t.defaultValue
      }
    const n = `__vue-devtools-plugin-settings__${e.id}`
    let i = __spreadValues({}, r)
    try {
      const e = localStorage.getItem(n),
        t = JSON.parse(e)
      Object.assign(i, t)
    } catch (s) {}
    ;(this.fallbacks = {
      getSettings: () => i,
      setSettings(e) {
        try {
          localStorage.setItem(n, JSON.stringify(e))
        } catch (s) {}
        i = e
      },
    }),
      t.on(HOOK_PLUGIN_SETTINGS_SET, (e, t) => {
        e === this.plugin.id && this.fallbacks.setSettings(t)
      }),
      (this.proxiedOn = new Proxy(
        {},
        {
          get: (e, t) =>
            this.target
              ? this.target.on[t]
              : (...e) => {
                  this.onQueue.push({ method: t, args: e })
                },
        }
      )),
      (this.proxiedTarget = new Proxy(
        {},
        {
          get: (e, t) =>
            this.target
              ? this.target[t]
              : 'on' === t
              ? this.proxiedOn
              : Object.keys(this.fallbacks).includes(t)
              ? (...e) => (this.targetQueue.push({ method: t, args: e, resolve: () => {} }), this.fallbacks[t](...e))
              : (...e) =>
                  new Promise((r) => {
                    this.targetQueue.push({ method: t, args: e, resolve: r })
                  }),
        }
      ))
  }
  async setRealTarget(e) {
    this.target = e
    for (const t of this.onQueue) this.target.on[t.method](...t.args)
    for (const t of this.targetQueue) t.resolve(await this.target[t.method](...t.args))
  }
}
function setupDevtoolsPlugin(e, t) {
  const r = getTarget(),
    n = getDevtoolsGlobalHook(),
    i = isProxyAvailable && e.enableEarlyProxy
  if (!n || (!r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ && i)) {
    const s = i ? new ApiProxy(e, n) : null
    ;(r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: e,
      setupFn: t,
      proxy: s,
    }),
      s && t(s.proxiedTarget)
  } else n.emit(HOOK_SETUP, e, t)
}
/*!
 * vue-router v4.0.12
 * (c) 2021 Eduardo San Martin Morote
 * @license MIT
 */ const hasSymbol = 'function' == typeof Symbol && 'symbol' == typeof Symbol.toStringTag,
  PolySymbol = (e) => (hasSymbol ? Symbol(e) : '_vr_' + e),
  matchedRouteKey = PolySymbol('rvlm'),
  viewDepthKey = PolySymbol('rvd'),
  routerKey = PolySymbol('r'),
  routeLocationKey = PolySymbol('rl'),
  routerViewLocationKey = PolySymbol('rvl'),
  isBrowser = 'undefined' != typeof window
function isESModule(e) {
  return e.__esModule || (hasSymbol && 'Module' === e[Symbol.toStringTag])
}
const assign = Object.assign
function applyToParams(e, t) {
  const r = {}
  for (const n in t) {
    const i = t[n]
    r[n] = Array.isArray(i) ? i.map(e) : e(i)
  }
  return r
}
const noop = () => {},
  TRAILING_SLASH_RE = /\/$/,
  removeTrailingSlash = (e) => e.replace(TRAILING_SLASH_RE, '')
function parseURL(e, t, r = '/') {
  let n,
    i = {},
    s = '',
    a = ''
  const o = t.indexOf('?'),
    l = t.indexOf('#', o > -1 ? o : 0)
  return (
    o > -1 && ((n = t.slice(0, o)), (s = t.slice(o + 1, l > -1 ? l : t.length)), (i = e(s))),
    l > -1 && ((n = n || t.slice(0, l)), (a = t.slice(l, t.length))),
    (n = resolveRelativePath(null != n ? n : t, r)),
    { fullPath: n + (s && '?') + s + a, path: n, query: i, hash: a }
  )
}
function stringifyURL(e, t) {
  const r = t.query ? e(t.query) : ''
  return t.path + (r && '?') + r + (t.hash || '')
}
function stripBase(e, t) {
  return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || '/' : e
}
function isSameRouteLocation(e, t, r) {
  const n = t.matched.length - 1,
    i = r.matched.length - 1
  return (
    n > -1 &&
    n === i &&
    isSameRouteRecord(t.matched[n], r.matched[i]) &&
    isSameRouteLocationParams(t.params, r.params) &&
    e(t.query) === e(r.query) &&
    t.hash === r.hash
  )
}
function isSameRouteRecord(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function isSameRouteLocationParams(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const r in e) if (!isSameRouteLocationParamsValue(e[r], t[r])) return !1
  return !0
}
function isSameRouteLocationParamsValue(e, t) {
  return Array.isArray(e) ? isEquivalentArray(e, t) : Array.isArray(t) ? isEquivalentArray(t, e) : e === t
}
function isEquivalentArray(e, t) {
  return Array.isArray(t) ? e.length === t.length && e.every((e, r) => e === t[r]) : 1 === e.length && e[0] === t
}
function resolveRelativePath(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const r = t.split('/'),
    n = e.split('/')
  let i,
    s,
    a = r.length - 1
  for (i = 0; i < n.length; i++)
    if (((s = n[i]), 1 !== a && '.' !== s)) {
      if ('..' !== s) break
      a--
    }
  return r.slice(0, a).join('/') + '/' + n.slice(i - (i === n.length ? 1 : 0)).join('/')
}
var NavigationType, NavigationType2, NavigationDirection, NavigationDirection2
function normalizeBase(e) {
  if (!e)
    if (isBrowser) {
      const t = document.querySelector('base')
      e = (e = (t && t.getAttribute('href')) || '/').replace(/^\w+:\/\/[^\/]+/, '')
    } else e = '/'
  return '/' !== e[0] && '#' !== e[0] && (e = '/' + e), removeTrailingSlash(e)
}
;(NavigationType2 = NavigationType || (NavigationType = {})),
  (NavigationType2.pop = 'pop'),
  (NavigationType2.push = 'push'),
  (NavigationDirection2 = NavigationDirection || (NavigationDirection = {})),
  (NavigationDirection2.back = 'back'),
  (NavigationDirection2.forward = 'forward'),
  (NavigationDirection2.unknown = '')
const BEFORE_HASH_RE = /^[^#]+#/
function createHref(e, t) {
  return e.replace(BEFORE_HASH_RE, '#') + t
}
function getElementPosition(e, t) {
  const r = document.documentElement.getBoundingClientRect(),
    n = e.getBoundingClientRect()
  return { behavior: t.behavior, left: n.left - r.left - (t.left || 0), top: n.top - r.top - (t.top || 0) }
}
const computeScrollPosition = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function scrollToPosition(e) {
  let t
  if ('el' in e) {
    const r = e.el,
      n = 'string' == typeof r && r.startsWith('#'),
      i = 'string' == typeof r ? (n ? document.getElementById(r.slice(1)) : document.querySelector(r)) : r
    if (!i) return
    t = getElementPosition(i, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}
function getScrollKey(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const scrollPositions = new Map()
function saveScrollPosition(e, t) {
  scrollPositions.set(e, t)
}
function getSavedScrollPosition(e) {
  const t = scrollPositions.get(e)
  return scrollPositions.delete(e), t
}
let createBaseLocation = () => location.protocol + '//' + location.host
function createCurrentLocation(e, t) {
  const { pathname: r, search: n, hash: i } = t,
    s = e.indexOf('#')
  if (s > -1) {
    let t = i.includes(e.slice(s)) ? e.slice(s).length : 1,
      r = i.slice(t)
    return '/' !== r[0] && (r = '/' + r), stripBase(r, '')
  }
  return stripBase(r, e) + n + i
}
function useHistoryListeners(e, t, r, n) {
  let i = [],
    s = [],
    a = null
  const o = ({ state: s }) => {
    const o = createCurrentLocation(e, location),
      l = r.value,
      h = t.value
    let c = 0
    if (s) {
      if (((r.value = o), (t.value = s), a && a === l)) return void (a = null)
      c = h ? s.position - h.position : 0
    } else n(o)
    i.forEach((e) => {
      e(r.value, l, {
        delta: c,
        type: NavigationType.pop,
        direction: c ? (c > 0 ? NavigationDirection.forward : NavigationDirection.back) : NavigationDirection.unknown,
      })
    })
  }
  function l() {
    const { history: e } = window
    e.state && e.replaceState(assign({}, e.state, { scroll: computeScrollPosition() }), '')
  }
  return (
    window.addEventListener('popstate', o),
    window.addEventListener('beforeunload', l),
    {
      pauseListeners: function () {
        a = r.value
      },
      listen: function (e) {
        i.push(e)
        const t = () => {
          const t = i.indexOf(e)
          t > -1 && i.splice(t, 1)
        }
        return s.push(t), t
      },
      destroy: function () {
        for (const e of s) e()
        ;(s = []), window.removeEventListener('popstate', o), window.removeEventListener('beforeunload', l)
      },
    }
  )
}
function buildState(e, t, r, n = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: r,
    replaced: n,
    position: window.history.length,
    scroll: i ? computeScrollPosition() : null,
  }
}
function useHistoryStateNavigation(e) {
  const { history: t, location: r } = window,
    n = { value: createCurrentLocation(e, r) },
    i = { value: t.state }
  function s(n, s, a) {
    const o = e.indexOf('#'),
      l = o > -1 ? (r.host && document.querySelector('base') ? e : e.slice(o)) + n : createBaseLocation() + e + n
    try {
      t[a ? 'replaceState' : 'pushState'](s, '', l), (i.value = s)
    } catch (h) {
      r[a ? 'replace' : 'assign'](l)
    }
  }
  return (
    i.value ||
      s(
        n.value,
        { back: null, current: n.value, forward: null, position: t.length - 1, replaced: !0, scroll: null },
        !0
      ),
    {
      location: n,
      state: i,
      push: function (e, r) {
        const a = assign({}, i.value, t.state, { forward: e, scroll: computeScrollPosition() })
        s(a.current, a, !0),
          s(e, assign({}, buildState(n.value, e, null), { position: a.position + 1 }, r), !1),
          (n.value = e)
      },
      replace: function (e, r) {
        s(
          e,
          assign({}, t.state, buildState(i.value.back, e, i.value.forward, !0), r, { position: i.value.position }),
          !0
        ),
          (n.value = e)
      },
    }
  )
}
function createWebHistory(e) {
  const t = useHistoryStateNavigation((e = normalizeBase(e))),
    r = useHistoryListeners(e, t.state, t.location, t.replace)
  const n = assign(
    {
      location: '',
      base: e,
      go: function (e, t = !0) {
        t || r.pauseListeners(), history.go(e)
      },
      createHref: createHref.bind(null, e),
    },
    t,
    r
  )
  return (
    Object.defineProperty(n, 'location', { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(n, 'state', { enumerable: !0, get: () => t.state.value }),
    n
  )
}
function isRouteLocation(e) {
  return 'string' == typeof e || (e && 'object' == typeof e)
}
function isRouteName(e) {
  return 'string' == typeof e || 'symbol' == typeof e
}
const START_LOCATION_NORMALIZED = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  NavigationFailureSymbol = PolySymbol('nf')
var NavigationFailureType, NavigationFailureType2
function createRouterError(e, t) {
  return assign(new Error(), { type: e, [NavigationFailureSymbol]: !0 }, t)
}
function isNavigationFailure(e, t) {
  return e instanceof Error && NavigationFailureSymbol in e && (null == t || !!(e.type & t))
}
;(NavigationFailureType2 = NavigationFailureType || (NavigationFailureType = {})),
  (NavigationFailureType2[(NavigationFailureType2.aborted = 4)] = 'aborted'),
  (NavigationFailureType2[(NavigationFailureType2.cancelled = 8)] = 'cancelled'),
  (NavigationFailureType2[(NavigationFailureType2.duplicated = 16)] = 'duplicated')
const BASE_PARAM_PATTERN = '[^/]+?',
  BASE_PATH_PARSER_OPTIONS = { sensitive: !1, strict: !1, start: !0, end: !0 },
  REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g
function tokensToParser(e, t) {
  const r = assign({}, BASE_PATH_PARSER_OPTIONS, t),
    n = []
  let i = r.start ? '^' : ''
  const s = []
  for (const l of e) {
    const e = l.length ? [] : [90]
    r.strict && !l.length && (i += '/')
    for (let t = 0; t < l.length; t++) {
      const n = l[t]
      let a = 40 + (r.sensitive ? 0.25 : 0)
      if (0 === n.type) t || (i += '/'), (i += n.value.replace(REGEX_CHARS_RE, '\\$&')), (a += 40)
      else if (1 === n.type) {
        const { value: e, repeatable: r, optional: h, regexp: c } = n
        s.push({ name: e, repeatable: r, optional: h })
        const p = c || BASE_PARAM_PATTERN
        if (p !== BASE_PARAM_PATTERN) {
          a += 10
          try {
            new RegExp(`(${p})`)
          } catch (o) {
            throw new Error(`Invalid custom RegExp for param "${e}" (${p}): ` + o.message)
          }
        }
        let u = r ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`
        t || (u = h && l.length < 2 ? `(?:/${u})` : '/' + u),
          h && (u += '?'),
          (i += u),
          (a += 20),
          h && (a += -8),
          r && (a += -20),
          '.*' === p && (a += -50)
      }
      e.push(a)
    }
    n.push(e)
  }
  if (r.strict && r.end) {
    const e = n.length - 1
    n[e][n[e].length - 1] += 0.7000000000000001
  }
  r.strict || (i += '/?'), r.end ? (i += '$') : r.strict && (i += '(?:/|$)')
  const a = new RegExp(i, r.sensitive ? '' : 'i')
  return {
    re: a,
    score: n,
    keys: s,
    parse: function (e) {
      const t = e.match(a),
        r = {}
      if (!t) return null
      for (let n = 1; n < t.length; n++) {
        const e = t[n] || '',
          i = s[n - 1]
        r[i.name] = e && i.repeatable ? e.split('/') : e
      }
      return r
    },
    stringify: function (t) {
      let r = '',
        n = !1
      for (const i of e) {
        ;(n && r.endsWith('/')) || (r += '/'), (n = !1)
        for (const e of i)
          if (0 === e.type) r += e.value
          else if (1 === e.type) {
            const { value: s, repeatable: a, optional: o } = e,
              l = s in t ? t[s] : ''
            if (Array.isArray(l) && !a)
              throw new Error(`Provided param "${s}" is an array but it is not repeatable (* or + modifiers)`)
            const h = Array.isArray(l) ? l.join('/') : l
            if (!h) {
              if (!o) throw new Error(`Missing required param "${s}"`)
              i.length < 2 && (r.endsWith('/') ? (r = r.slice(0, -1)) : (n = !0))
            }
            r += h
          }
      }
      return r
    },
  }
}
function compareScoreArray(e, t) {
  let r = 0
  for (; r < e.length && r < t.length; ) {
    const n = t[r] - e[r]
    if (n) return n
    r++
  }
  return e.length < t.length
    ? 1 === e.length && 80 === e[0]
      ? -1
      : 1
    : e.length > t.length
    ? 1 === t.length && 80 === t[0]
      ? 1
      : -1
    : 0
}
function comparePathParserScore(e, t) {
  let r = 0
  const n = e.score,
    i = t.score
  for (; r < n.length && r < i.length; ) {
    const e = compareScoreArray(n[r], i[r])
    if (e) return e
    r++
  }
  return i.length - n.length
}
const ROOT_TOKEN = { type: 0, value: '' },
  VALID_PARAM_RE = /[a-zA-Z0-9_]/
function tokenizePath(e) {
  if (!e) return [[]]
  if ('/' === e) return [[ROOT_TOKEN]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(e) {
    throw new Error(`ERR (${r})/"${h}": ${e}`)
  }
  let r = 0,
    n = r
  const i = []
  let s
  function a() {
    s && i.push(s), (s = [])
  }
  let o,
    l = 0,
    h = '',
    c = ''
  function p() {
    h &&
      (0 === r
        ? s.push({ type: 0, value: h })
        : 1 === r || 2 === r || 3 === r
        ? (s.length > 1 &&
            ('*' === o || '+' === o) &&
            t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),
          s.push({
            type: 1,
            value: h,
            regexp: c,
            repeatable: '*' === o || '+' === o,
            optional: '*' === o || '?' === o,
          }))
        : t('Invalid state to consume buffer'),
      (h = ''))
  }
  function u() {
    h += o
  }
  for (; l < e.length; )
    if (((o = e[l++]), '\\' !== o || 2 === r))
      switch (r) {
        case 0:
          '/' === o ? (h && p(), a()) : ':' === o ? (p(), (r = 1)) : u()
          break
        case 4:
          u(), (r = n)
          break
        case 1:
          '(' === o
            ? (r = 2)
            : VALID_PARAM_RE.test(o)
            ? u()
            : (p(), (r = 0), '*' !== o && '?' !== o && '+' !== o && l--)
          break
        case 2:
          ')' === o ? ('\\' == c[c.length - 1] ? (c = c.slice(0, -1) + o) : (r = 3)) : (c += o)
          break
        case 3:
          p(), (r = 0), '*' !== o && '?' !== o && '+' !== o && l--, (c = '')
          break
        default:
          t('Unknown state')
      }
    else (n = r), (r = 4)
  return 2 === r && t(`Unfinished custom RegExp for param "${h}"`), p(), a(), i
}
function createRouteRecordMatcher(e, t, r) {
  const n = tokensToParser(tokenizePath(e.path), r),
    i = assign(n, { record: e, parent: t, children: [], alias: [] })
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i
}
function createRouterMatcher(e, t) {
  const r = [],
    n = new Map()
  function i(e, r, n) {
    const o = !n,
      l = normalizeRouteRecord(e)
    l.aliasOf = n && n.record
    const h = mergeOptions(t, e),
      c = [l]
    if ('alias' in e) {
      const t = 'string' == typeof e.alias ? [e.alias] : e.alias
      for (const e of t)
        c.push(
          assign({}, l, { components: n ? n.record.components : l.components, path: e, aliasOf: n ? n.record : l })
        )
    }
    let p, u
    for (const t of c) {
      const { path: c } = t
      if (r && '/' !== c[0]) {
        const e = r.record.path,
          n = '/' === e[e.length - 1] ? '' : '/'
        t.path = r.record.path + (c && n + c)
      }
      if (
        ((p = createRouteRecordMatcher(t, r, h)),
        n ? n.alias.push(p) : ((u = u || p), u !== p && u.alias.push(p), o && e.name && !isAliasRecord(p) && s(e.name)),
        'children' in l)
      ) {
        const e = l.children
        for (let t = 0; t < e.length; t++) i(e[t], p, n && n.children[t])
      }
      ;(n = n || p), a(p)
    }
    return u
      ? () => {
          s(u)
        }
      : noop
  }
  function s(e) {
    if (isRouteName(e)) {
      const t = n.get(e)
      t && (n.delete(e), r.splice(r.indexOf(t), 1), t.children.forEach(s), t.alias.forEach(s))
    } else {
      const t = r.indexOf(e)
      t > -1 && (r.splice(t, 1), e.record.name && n.delete(e.record.name), e.children.forEach(s), e.alias.forEach(s))
    }
  }
  function a(e) {
    let t = 0
    for (; t < r.length && comparePathParserScore(e, r[t]) >= 0; ) t++
    r.splice(t, 0, e), e.record.name && !isAliasRecord(e) && n.set(e.record.name, e)
  }
  return (
    (t = mergeOptions({ strict: !1, end: !0, sensitive: !1 }, t)),
    e.forEach((e) => i(e)),
    {
      addRoute: i,
      resolve: function (e, t) {
        let i,
          s,
          a,
          o = {}
        if ('name' in e && e.name) {
          if (((i = n.get(e.name)), !i)) throw createRouterError(1, { location: e })
          ;(a = i.record.name),
            (o = assign(
              paramsFromLocation(
                t.params,
                i.keys.filter((e) => !e.optional).map((e) => e.name)
              ),
              e.params
            )),
            (s = i.stringify(o))
        } else if ('path' in e)
          (s = e.path), (i = r.find((e) => e.re.test(s))), i && ((o = i.parse(s)), (a = i.record.name))
        else {
          if (((i = t.name ? n.get(t.name) : r.find((e) => e.re.test(t.path))), !i))
            throw createRouterError(1, { location: e, currentLocation: t })
          ;(a = i.record.name), (o = assign({}, t.params, e.params)), (s = i.stringify(o))
        }
        const l = []
        let h = i
        for (; h; ) l.unshift(h.record), (h = h.parent)
        return { name: a, path: s, params: o, matched: l, meta: mergeMetaFields(l) }
      },
      removeRoute: s,
      getRoutes: function () {
        return r
      },
      getRecordMatcher: function (e) {
        return n.get(e)
      },
    }
  )
}
function paramsFromLocation(e, t) {
  const r = {}
  for (const n of t) n in e && (r[n] = e[n])
  return r
}
function normalizeRouteRecord(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: normalizeRecordProps(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in e ? e.components || {} : { default: e.component },
  }
}
function normalizeRecordProps(e) {
  const t = {},
    r = e.props || !1
  if ('component' in e) t.default = r
  else for (const n in e.components) t[n] = 'boolean' == typeof r ? r : r[n]
  return t
}
function isAliasRecord(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function mergeMetaFields(e) {
  return e.reduce((e, t) => assign(e, t.meta), {})
}
function mergeOptions(e, t) {
  const r = {}
  for (const n in e) r[n] = n in t ? t[n] : e[n]
  return r
}
const HASH_RE = /#/g,
  AMPERSAND_RE = /&/g,
  SLASH_RE = /\//g,
  EQUAL_RE = /=/g,
  IM_RE = /\?/g,
  PLUS_RE = /\+/g,
  ENC_BRACKET_OPEN_RE = /%5B/g,
  ENC_BRACKET_CLOSE_RE = /%5D/g,
  ENC_CARET_RE = /%5E/g,
  ENC_BACKTICK_RE = /%60/g,
  ENC_CURLY_OPEN_RE = /%7B/g,
  ENC_PIPE_RE = /%7C/g,
  ENC_CURLY_CLOSE_RE = /%7D/g,
  ENC_SPACE_RE = /%20/g
function commonEncode(e) {
  return encodeURI('' + e)
    .replace(ENC_PIPE_RE, '|')
    .replace(ENC_BRACKET_OPEN_RE, '[')
    .replace(ENC_BRACKET_CLOSE_RE, ']')
}
function encodeHash(e) {
  return commonEncode(e).replace(ENC_CURLY_OPEN_RE, '{').replace(ENC_CURLY_CLOSE_RE, '}').replace(ENC_CARET_RE, '^')
}
function encodeQueryValue(e) {
  return commonEncode(e)
    .replace(PLUS_RE, '%2B')
    .replace(ENC_SPACE_RE, '+')
    .replace(HASH_RE, '%23')
    .replace(AMPERSAND_RE, '%26')
    .replace(ENC_BACKTICK_RE, '`')
    .replace(ENC_CURLY_OPEN_RE, '{')
    .replace(ENC_CURLY_CLOSE_RE, '}')
    .replace(ENC_CARET_RE, '^')
}
function encodeQueryKey(e) {
  return encodeQueryValue(e).replace(EQUAL_RE, '%3D')
}
function encodePath(e) {
  return commonEncode(e).replace(HASH_RE, '%23').replace(IM_RE, '%3F')
}
function encodeParam(e) {
  return null == e ? '' : encodePath(e).replace(SLASH_RE, '%2F')
}
function decode(e) {
  try {
    return decodeURIComponent('' + e)
  } catch (t) {}
  return '' + e
}
function parseQuery(e) {
  const t = {}
  if ('' === e || '?' === e) return t
  const r = ('?' === e[0] ? e.slice(1) : e).split('&')
  for (let n = 0; n < r.length; ++n) {
    const e = r[n].replace(PLUS_RE, ' '),
      i = e.indexOf('='),
      s = decode(i < 0 ? e : e.slice(0, i)),
      a = i < 0 ? null : decode(e.slice(i + 1))
    if (s in t) {
      let e = t[s]
      Array.isArray(e) || (e = t[s] = [e]), e.push(a)
    } else t[s] = a
  }
  return t
}
function stringifyQuery(e) {
  let t = ''
  for (let r in e) {
    const n = e[r]
    if (((r = encodeQueryKey(r)), null == n)) {
      void 0 !== n && (t += (t.length ? '&' : '') + r)
      continue
    }
    ;(Array.isArray(n) ? n.map((e) => e && encodeQueryValue(e)) : [n && encodeQueryValue(n)]).forEach((e) => {
      void 0 !== e && ((t += (t.length ? '&' : '') + r), null != e && (t += '=' + e))
    })
  }
  return t
}
function normalizeQuery(e) {
  const t = {}
  for (const r in e) {
    const n = e[r]
    void 0 !== n && (t[r] = Array.isArray(n) ? n.map((e) => (null == e ? null : '' + e)) : null == n ? n : '' + n)
  }
  return t
}
function useCallbacks() {
  let e = []
  return {
    add: function (t) {
      return (
        e.push(t),
        () => {
          const r = e.indexOf(t)
          r > -1 && e.splice(r, 1)
        }
      )
    },
    list: () => e,
    reset: function () {
      e = []
    },
  }
}
function guardToPromiseFn(e, t, r, n, i) {
  const s = n && (n.enterCallbacks[i] = n.enterCallbacks[i] || [])
  return () =>
    new Promise((a, o) => {
      const l = (e) => {
          !1 === e
            ? o(createRouterError(4, { from: r, to: t }))
            : e instanceof Error
            ? o(e)
            : isRouteLocation(e)
            ? o(createRouterError(2, { from: t, to: e }))
            : (s && n.enterCallbacks[i] === s && 'function' == typeof e && s.push(e), a())
        },
        h = e.call(n && n.instances[i], t, r, l)
      let c = Promise.resolve(h)
      e.length < 3 && (c = c.then(l)), c.catch((e) => o(e))
    })
}
function extractComponentsGuards(e, t, r, n) {
  const i = []
  for (const s of e)
    for (const e in s.components) {
      let a = s.components[e]
      if ('beforeRouteEnter' === t || s.instances[e])
        if (isRouteComponent(a)) {
          const o = (a.__vccOpts || a)[t]
          o && i.push(guardToPromiseFn(o, r, n, s, e))
        } else {
          let o = a()
          i.push(() =>
            o.then((i) => {
              if (!i) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`))
              const a = isESModule(i) ? i.default : i
              s.components[e] = a
              const o = (a.__vccOpts || a)[t]
              return o && guardToPromiseFn(o, r, n, s, e)()
            })
          )
        }
    }
  return i
}
function isRouteComponent(e) {
  return 'object' == typeof e || 'displayName' in e || 'props' in e || '__vccOpts' in e
}
function useLink(e) {
  const t = inject(routerKey),
    r = inject(routeLocationKey),
    n = computed(() => t.resolve(unref(e.to))),
    i = computed(() => {
      const { matched: e } = n.value,
        { length: t } = e,
        i = e[t - 1],
        s = r.matched
      if (!i || !s.length) return -1
      const a = s.findIndex(isSameRouteRecord.bind(null, i))
      if (a > -1) return a
      const o = getOriginalPath(e[t - 2])
      return t > 1 && getOriginalPath(i) === o && s[s.length - 1].path !== o
        ? s.findIndex(isSameRouteRecord.bind(null, e[t - 2]))
        : a
    }),
    s = computed(() => i.value > -1 && includesParams(r.params, n.value.params)),
    a = computed(
      () => i.value > -1 && i.value === r.matched.length - 1 && isSameRouteLocationParams(r.params, n.value.params)
    )
  return {
    route: n,
    href: computed(() => n.value.href),
    isActive: s,
    isExactActive: a,
    navigate: function (r = {}) {
      return guardEvent(r) ? t[unref(e.replace) ? 'replace' : 'push'](unref(e.to)).catch(noop) : Promise.resolve()
    },
  }
}
const RouterLinkImpl = defineComponent({
    name: 'RouterLink',
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: useLink,
    setup(e, { slots: t }) {
      const r = reactive(useLink(e)),
        { options: n } = inject(routerKey),
        i = computed(() => ({
          [getLinkClass(e.activeClass, n.linkActiveClass, 'router-link-active')]: r.isActive,
          [getLinkClass(e.exactActiveClass, n.linkExactActiveClass, 'router-link-exact-active')]: r.isExactActive,
        }))
      return () => {
        const n = t.default && t.default(r)
        return e.custom
          ? n
          : h(
              'a',
              {
                'aria-current': r.isExactActive ? e.ariaCurrentValue : null,
                href: r.href,
                onClick: r.navigate,
                class: i.value,
              },
              n
            )
      }
    },
  }),
  RouterLink = RouterLinkImpl
function guardEvent(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.defaultPrevented || (void 0 !== e.button && 0 !== e.button))
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function includesParams(e, t) {
  for (const r in t) {
    const n = t[r],
      i = e[r]
    if ('string' == typeof n) {
      if (n !== i) return !1
    } else if (!Array.isArray(i) || i.length !== n.length || n.some((e, t) => e !== i[t])) return !1
  }
  return !0
}
function getOriginalPath(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const getLinkClass = (e, t, r) => (null != e ? e : null != t ? t : r),
  RouterViewImpl = defineComponent({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    setup(e, { attrs: t, slots: r }) {
      const n = inject(routerViewLocationKey),
        i = computed(() => e.route || n.value),
        s = inject(viewDepthKey, 0),
        a = computed(() => i.value.matched[s])
      provide(viewDepthKey, s + 1), provide(matchedRouteKey, a), provide(routerViewLocationKey, i)
      const o = ref()
      return (
        watch(
          () => [o.value, a.value, e.name],
          ([e, t, r], [n, i, s]) => {
            t &&
              ((t.instances[r] = e),
              i &&
                i !== t &&
                e &&
                e === n &&
                (t.leaveGuards.size || (t.leaveGuards = i.leaveGuards),
                t.updateGuards.size || (t.updateGuards = i.updateGuards))),
              !e || !t || (i && isSameRouteRecord(t, i) && n) || (t.enterCallbacks[r] || []).forEach((t) => t(e))
          },
          { flush: 'post' }
        ),
        () => {
          const n = i.value,
            s = a.value,
            l = s && s.components[e.name],
            c = e.name
          if (!l) return normalizeSlot(r.default, { Component: l, route: n })
          const p = s.props[e.name],
            u = p ? (!0 === p ? n.params : 'function' == typeof p ? p(n) : p) : null,
            f = h(
              l,
              assign({}, u, t, {
                onVnodeUnmounted: (e) => {
                  e.component.isUnmounted && (s.instances[c] = null)
                },
                ref: o,
              })
            )
          return normalizeSlot(r.default, { Component: f, route: n }) || f
        }
      )
    },
  })
function normalizeSlot(e, t) {
  if (!e) return null
  const r = e(t)
  return 1 === r.length ? r[0] : r
}
const RouterView = RouterViewImpl
function createRouter(e) {
  const t = createRouterMatcher(e.routes, e),
    r = e.parseQuery || parseQuery,
    n = e.stringifyQuery || stringifyQuery,
    i = e.history,
    s = useCallbacks(),
    a = useCallbacks(),
    o = useCallbacks(),
    l = shallowRef(START_LOCATION_NORMALIZED)
  let h = START_LOCATION_NORMALIZED
  isBrowser && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const c = applyToParams.bind(null, (e) => '' + e),
    p = applyToParams.bind(null, encodeParam),
    u = applyToParams.bind(null, decode)
  function f(e, s) {
    if (((s = assign({}, s || l.value)), 'string' == typeof e)) {
      const n = parseURL(r, e, s.path),
        a = t.resolve({ path: n.path }, s),
        o = i.createHref(n.fullPath)
      return assign(n, a, { params: u(a.params), hash: decode(n.hash), redirectedFrom: void 0, href: o })
    }
    let a
    if ('path' in e) a = assign({}, e, { path: parseURL(r, e.path, s.path).path })
    else {
      const t = assign({}, e.params)
      for (const e in t) null == t[e] && delete t[e]
      ;(a = assign({}, e, { params: p(e.params) })), (s.params = p(s.params))
    }
    const o = t.resolve(a, s),
      h = e.hash || ''
    o.params = c(u(o.params))
    const f = stringifyURL(n, assign({}, e, { hash: encodeHash(h), path: o.path })),
      d = i.createHref(f)
    return assign({ fullPath: f, hash: h, query: n === stringifyQuery ? normalizeQuery(e.query) : e.query || {} }, o, {
      redirectedFrom: void 0,
      href: d,
    })
  }
  function d(e) {
    return 'string' == typeof e ? parseURL(r, e, l.value.path) : assign({}, e)
  }
  function m(e, t) {
    if (h !== e) return createRouterError(8, { from: t, to: e })
  }
  function g(e) {
    return v(e)
  }
  function y(e) {
    const t = e.matched[e.matched.length - 1]
    if (t && t.redirect) {
      const { redirect: r } = t
      let n = 'function' == typeof r ? r(e) : r
      return (
        'string' == typeof n && ((n = n.includes('?') || n.includes('#') ? (n = d(n)) : { path: n }), (n.params = {})),
        assign({ query: e.query, hash: e.hash, params: e.params }, n)
      )
    }
  }
  function v(e, t) {
    const r = (h = f(e)),
      i = l.value,
      s = e.state,
      a = e.force,
      o = !0 === e.replace,
      c = y(r)
    if (c) return v(assign(d(c), { state: s, force: a, replace: o }), t || r)
    const p = r
    let u
    return (
      (p.redirectedFrom = t),
      !a && isSameRouteLocation(n, i, r) && ((u = createRouterError(16, { to: p, from: i })), w(i, i, !0, !1)),
      (u ? Promise.resolve(u) : E(p, i))
        .catch((e) => (isNavigationFailure(e) ? e : T(e, p, i)))
        .then((e) => {
          if (e) {
            if (isNavigationFailure(e, 2)) return v(assign(d(e.to), { state: s, force: a, replace: o }), t || p)
          } else e = P(p, i, !0, o, s)
          return S(p, i, e), e
        })
    )
  }
  function b(e, t) {
    const r = m(e, t)
    return r ? Promise.reject(r) : Promise.resolve()
  }
  function E(e, t) {
    let r
    const [n, i, o] = extractChangingRecords(e, t)
    r = extractComponentsGuards(n.reverse(), 'beforeRouteLeave', e, t)
    for (const s of n)
      s.leaveGuards.forEach((n) => {
        r.push(guardToPromiseFn(n, e, t))
      })
    const l = b.bind(null, e, t)
    return (
      r.push(l),
      runGuardQueue(r)
        .then(() => {
          r = []
          for (const n of s.list()) r.push(guardToPromiseFn(n, e, t))
          return r.push(l), runGuardQueue(r)
        })
        .then(() => {
          r = extractComponentsGuards(i, 'beforeRouteUpdate', e, t)
          for (const n of i)
            n.updateGuards.forEach((n) => {
              r.push(guardToPromiseFn(n, e, t))
            })
          return r.push(l), runGuardQueue(r)
        })
        .then(() => {
          r = []
          for (const n of e.matched)
            if (n.beforeEnter && !t.matched.includes(n))
              if (Array.isArray(n.beforeEnter)) for (const i of n.beforeEnter) r.push(guardToPromiseFn(i, e, t))
              else r.push(guardToPromiseFn(n.beforeEnter, e, t))
          return r.push(l), runGuardQueue(r)
        })
        .then(
          () => (
            e.matched.forEach((e) => (e.enterCallbacks = {})),
            (r = extractComponentsGuards(o, 'beforeRouteEnter', e, t)),
            r.push(l),
            runGuardQueue(r)
          )
        )
        .then(() => {
          r = []
          for (const n of a.list()) r.push(guardToPromiseFn(n, e, t))
          return r.push(l), runGuardQueue(r)
        })
        .catch((e) => (isNavigationFailure(e, 8) ? e : Promise.reject(e)))
    )
  }
  function S(e, t, r) {
    for (const n of o.list()) n(e, t, r)
  }
  function P(e, t, r, n, s) {
    const a = m(e, t)
    if (a) return a
    const o = t === START_LOCATION_NORMALIZED,
      h = isBrowser ? history.state : {}
    r && (n || o ? i.replace(e.fullPath, assign({ scroll: o && h && h.scroll }, s)) : i.push(e.fullPath, s)),
      (l.value = e),
      w(e, t, r, o),
      k()
  }
  let _
  let x,
    C = useCallbacks(),
    A = useCallbacks()
  function T(e, t, r) {
    k(e)
    const n = A.list()
    return n.length && n.forEach((n) => n(e, t, r)), Promise.reject(e)
  }
  function k(e) {
    x ||
      ((x = !0),
      (_ = i.listen((e, t, r) => {
        const n = f(e),
          s = y(n)
        if (s) return void v(assign(s, { replace: !0 }), n).catch(noop)
        h = n
        const a = l.value
        isBrowser && saveScrollPosition(getScrollKey(a.fullPath, r.delta), computeScrollPosition()),
          E(n, a)
            .catch((e) =>
              isNavigationFailure(e, 12)
                ? e
                : isNavigationFailure(e, 2)
                ? (v(e.to, n)
                    .then((e) => {
                      isNavigationFailure(e, 20) && !r.delta && r.type === NavigationType.pop && i.go(-1, !1)
                    })
                    .catch(noop),
                  Promise.reject())
                : (r.delta && i.go(-r.delta, !1), T(e, n, a))
            )
            .then((e) => {
              ;(e = e || P(n, a, !1)) &&
                (r.delta
                  ? i.go(-r.delta, !1)
                  : r.type === NavigationType.pop && isNavigationFailure(e, 20) && i.go(-1, !1)),
                S(n, a, e)
            })
            .catch(noop)
      })),
      C.list().forEach(([t, r]) => (e ? r(e) : t())),
      C.reset())
  }
  function w(t, r, n, i) {
    const { scrollBehavior: s } = e
    if (!isBrowser || !s) return Promise.resolve()
    const a =
      (!n && getSavedScrollPosition(getScrollKey(t.fullPath, 0))) ||
      ((i || !n) && history.state && history.state.scroll) ||
      null
    return nextTick()
      .then(() => s(t, r, a))
      .then((e) => e && scrollToPosition(e))
      .catch((e) => T(e, t, r))
  }
  const M = (e) => i.go(e)
  let I
  const F = new Set()
  return {
    currentRoute: l,
    addRoute: function (e, r) {
      let n, i
      return isRouteName(e) ? ((n = t.getRecordMatcher(e)), (i = r)) : (i = e), t.addRoute(i, n)
    },
    removeRoute: function (e) {
      const r = t.getRecordMatcher(e)
      r && t.removeRoute(r)
    },
    hasRoute: function (e) {
      return !!t.getRecordMatcher(e)
    },
    getRoutes: function () {
      return t.getRoutes().map((e) => e.record)
    },
    resolve: f,
    options: e,
    push: g,
    replace: function (e) {
      return g(assign(d(e), { replace: !0 }))
    },
    go: M,
    back: () => M(-1),
    forward: () => M(1),
    beforeEach: s.add,
    beforeResolve: a.add,
    afterEach: o.add,
    onError: A.add,
    isReady: function () {
      return x && l.value !== START_LOCATION_NORMALIZED
        ? Promise.resolve()
        : new Promise((e, t) => {
            C.add([e, t])
          })
    },
    install(e) {
      e.component('RouterLink', RouterLink),
        e.component('RouterView', RouterView),
        (e.config.globalProperties.$router = this),
        Object.defineProperty(e.config.globalProperties, '$route', { enumerable: !0, get: () => unref(l) }),
        isBrowser && !I && l.value === START_LOCATION_NORMALIZED && ((I = !0), g(i.location).catch((e) => {}))
      const t = {}
      for (const n in START_LOCATION_NORMALIZED) t[n] = computed(() => l.value[n])
      e.provide(routerKey, this), e.provide(routeLocationKey, reactive(t)), e.provide(routerViewLocationKey, l)
      const r = e.unmount
      F.add(e),
        (e.unmount = function () {
          F.delete(e),
            F.size < 1 &&
              ((h = START_LOCATION_NORMALIZED), _ && _(), (l.value = START_LOCATION_NORMALIZED), (I = !1), (x = !1)),
            r()
        })
    },
  }
}
function runGuardQueue(e) {
  return e.reduce((e, t) => e.then(() => t()), Promise.resolve())
}
function extractChangingRecords(e, t) {
  const r = [],
    n = [],
    i = [],
    s = Math.max(t.matched.length, e.matched.length)
  for (let a = 0; a < s; a++) {
    const s = t.matched[a]
    s && (e.matched.find((e) => isSameRouteRecord(e, s)) ? n.push(s) : r.push(s))
    const o = e.matched[a]
    o && (t.matched.find((e) => isSameRouteRecord(e, o)) || i.push(o))
  }
  return [r, n, i]
}
function useRouter() {
  return inject(routerKey)
}
function useRoute() {
  return inject(routeLocationKey)
}
var commonjsGlobal =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {},
  themeChange = { exports: {} }
!(function (e, t) {
  function r() {
    var e = document.querySelector('[data-toggle-theme]')
    !(function (t = localStorage.getItem('theme')) {
      localStorage.getItem('theme') &&
        (document.documentElement.setAttribute('data-theme', t),
        e &&
          [...document.querySelectorAll('[data-toggle-theme]')].forEach((t) => {
            t.classList.add(e.getAttribute('data-act-class'))
          }))
    })(),
      e &&
        [...document.querySelectorAll('[data-toggle-theme]')].forEach((e) => {
          e.addEventListener('click', function () {
            var t = e.getAttribute('data-toggle-theme')
            if (t) {
              var r = t.split(',')
              document.documentElement.getAttribute('data-theme') == r[0]
                ? 1 == r.length
                  ? (document.documentElement.removeAttribute('data-theme'), localStorage.removeItem('theme'))
                  : (document.documentElement.setAttribute('data-theme', r[1]), localStorage.setItem('theme', r[1]))
                : (document.documentElement.setAttribute('data-theme', r[0]), localStorage.setItem('theme', r[0]))
            }
            ;[...document.querySelectorAll('[data-toggle-theme]')].forEach((e) => {
              e.classList.toggle(this.getAttribute('data-act-class'))
            })
          })
        })
  }
  function n() {
    !(function (e = localStorage.getItem('theme')) {
      var t
      null != e &&
        '' != e &&
        (localStorage.getItem('theme') && '' != localStorage.getItem('theme')
          ? (document.documentElement.setAttribute('data-theme', e),
            (t = document.querySelector("[data-set-theme='" + e.toString() + "']")) &&
              ([...document.querySelectorAll('[data-set-theme]')].forEach((e) => {
                e.classList.remove(e.getAttribute('data-act-class'))
              }),
              t.getAttribute('data-act-class') && t.classList.add(t.getAttribute('data-act-class'))))
          : (t = document.querySelector("[data-set-theme='']")).getAttribute('data-act-class') &&
            t.classList.add(t.getAttribute('data-act-class')))
    })(),
      [...document.querySelectorAll('[data-set-theme]')].forEach((e) => {
        e.addEventListener('click', function () {
          document.documentElement.setAttribute('data-theme', this.getAttribute('data-set-theme')),
            localStorage.setItem('theme', document.documentElement.getAttribute('data-theme')),
            [...document.querySelectorAll('[data-set-theme]')].forEach((e) => {
              e.classList.remove(e.getAttribute('data-act-class'))
            }),
            e.getAttribute('data-act-class') && e.classList.add(e.getAttribute('data-act-class'))
        })
      })
  }
  function i() {
    !(function (e = localStorage.getItem('theme')) {
      localStorage.getItem('theme') &&
        (document.documentElement.setAttribute('data-theme', e),
        document.querySelector("select[data-choose-theme] [value='" + e.toString() + "']") &&
          [...document.querySelectorAll("select[data-choose-theme] [value='" + e.toString() + "']")].forEach((e) => {
            e.selected = !0
          }))
    })(),
      document.querySelector('select[data-choose-theme]') &&
        [...document.querySelectorAll('select[data-choose-theme]')].forEach((e) => {
          e.addEventListener('change', function () {
            document.documentElement.setAttribute('data-theme', this.value),
              localStorage.setItem('theme', document.documentElement.getAttribute('data-theme')),
              [
                ...document.querySelectorAll(
                  "select[data-choose-theme] [value='" + localStorage.getItem('theme') + "']"
                ),
              ].forEach((e) => {
                e.selected = !0
              })
          })
        })
  }
  themeChange.exports = {
    themeChange: function (e = !0) {
      !0 === e
        ? document.addEventListener('DOMContentLoaded', function (e) {
            r(), i(), n()
          })
        : (r(), i(), n())
    },
  }
})()
var lottie$1 = { exports: {} }
;(function (module, exports) {
  var factory
  'undefined' != typeof navigator &&
    ((factory = function () {
      var svgNS = 'http://www.w3.org/2000/svg',
        locationHref = '',
        _useWebWorker = !1,
        initialDefaultFrame = -999999,
        setWebWorker = function (e) {
          _useWebWorker = !!e
        },
        getWebWorker = function () {
          return _useWebWorker
        },
        setLocationHref = function (e) {
          locationHref = e
        },
        getLocationHref = function () {
          return locationHref
        }
      function createTag(e) {
        return document.createElement(e)
      }
      function extendPrototype(e, t) {
        var r,
          n,
          i = e.length
        for (r = 0; r < i; r += 1)
          for (var s in (n = e[r].prototype)) Object.prototype.hasOwnProperty.call(n, s) && (t.prototype[s] = n[s])
      }
      function getDescriptor(e, t) {
        return Object.getOwnPropertyDescriptor(e, t)
      }
      function createProxyFunction(e) {
        function t() {}
        return (t.prototype = e), t
      }
      var audioControllerFactory = (function () {
          function e(e) {
            ;(this.audios = []), (this.audioFactory = e), (this._volume = 1), (this._isMuted = !1)
          }
          return (
            (e.prototype = {
              addAudio: function (e) {
                this.audios.push(e)
              },
              pause: function () {
                var e,
                  t = this.audios.length
                for (e = 0; e < t; e += 1) this.audios[e].pause()
              },
              resume: function () {
                var e,
                  t = this.audios.length
                for (e = 0; e < t; e += 1) this.audios[e].resume()
              },
              setRate: function (e) {
                var t,
                  r = this.audios.length
                for (t = 0; t < r; t += 1) this.audios[t].setRate(e)
              },
              createAudio: function (e) {
                return this.audioFactory
                  ? this.audioFactory(e)
                  : window.Howl
                  ? new window.Howl({ src: [e] })
                  : {
                      isPlaying: !1,
                      play: function () {
                        this.isPlaying = !0
                      },
                      seek: function () {
                        this.isPlaying = !1
                      },
                      playing: function () {},
                      rate: function () {},
                      setVolume: function () {},
                    }
              },
              setAudioFactory: function (e) {
                this.audioFactory = e
              },
              setVolume: function (e) {
                ;(this._volume = e), this._updateVolume()
              },
              mute: function () {
                ;(this._isMuted = !0), this._updateVolume()
              },
              unmute: function () {
                ;(this._isMuted = !1), this._updateVolume()
              },
              getVolume: function () {
                return this._volume
              },
              _updateVolume: function () {
                var e,
                  t = this.audios.length
                for (e = 0; e < t; e += 1) this.audios[e].volume(this._volume * (this._isMuted ? 0 : 1))
              },
            }),
            function () {
              return new e()
            }
          )
        })(),
        createTypedArray = (function () {
          function e(e, t) {
            var r,
              n = 0,
              i = []
            switch (e) {
              case 'int16':
              case 'uint8c':
                r = 1
                break
              default:
                r = 1.1
            }
            for (n = 0; n < t; n += 1) i.push(r)
            return i
          }
          return 'function' == typeof Uint8ClampedArray && 'function' == typeof Float32Array
            ? function (t, r) {
                return 'float32' === t
                  ? new Float32Array(r)
                  : 'int16' === t
                  ? new Int16Array(r)
                  : 'uint8c' === t
                  ? new Uint8ClampedArray(r)
                  : e(t, r)
              }
            : e
        })()
      function createSizedArray(e) {
        return Array.apply(null, { length: e })
      }
      function _typeof$6(e) {
        return (_typeof$6 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      var subframeEnabled = !0,
        expressionsPlugin = null,
        idPrefix = '',
        isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        bmPow = Math.pow,
        bmSqrt = Math.sqrt,
        bmFloor = Math.floor,
        bmMax = Math.max,
        bmMin = Math.min,
        BMMath = {}
      !(function () {
        var e,
          t = [
            'abs',
            'acos',
            'acosh',
            'asin',
            'asinh',
            'atan',
            'atanh',
            'atan2',
            'ceil',
            'cbrt',
            'expm1',
            'clz32',
            'cos',
            'cosh',
            'exp',
            'floor',
            'fround',
            'hypot',
            'imul',
            'log',
            'log1p',
            'log2',
            'log10',
            'max',
            'min',
            'pow',
            'random',
            'round',
            'sign',
            'sin',
            'sinh',
            'sqrt',
            'tan',
            'tanh',
            'trunc',
            'E',
            'LN10',
            'LN2',
            'LOG10E',
            'LOG2E',
            'PI',
            'SQRT1_2',
            'SQRT2',
          ],
          r = t.length
        for (e = 0; e < r; e += 1) BMMath[t[e]] = Math[t[e]]
      })(),
        (BMMath.random = Math.random),
        (BMMath.abs = function (e) {
          if ('object' === _typeof$6(e) && e.length) {
            var t,
              r = createSizedArray(e.length),
              n = e.length
            for (t = 0; t < n; t += 1) r[t] = Math.abs(e[t])
            return r
          }
          return Math.abs(e)
        })
      var defaultCurveSegments = 150,
        degToRads = Math.PI / 180,
        roundCorner = 0.5519
      function styleDiv(e) {
        ;(e.style.position = 'absolute'),
          (e.style.top = 0),
          (e.style.left = 0),
          (e.style.display = 'block'),
          (e.style.transformOrigin = '0 0'),
          (e.style.webkitTransformOrigin = '0 0'),
          (e.style.backfaceVisibility = 'visible'),
          (e.style.webkitBackfaceVisibility = 'visible'),
          (e.style.transformStyle = 'preserve-3d'),
          (e.style.webkitTransformStyle = 'preserve-3d'),
          (e.style.mozTransformStyle = 'preserve-3d')
      }
      function BMEnterFrameEvent(e, t, r, n) {
        ;(this.type = e), (this.currentTime = t), (this.totalTime = r), (this.direction = n < 0 ? -1 : 1)
      }
      function BMCompleteEvent(e, t) {
        ;(this.type = e), (this.direction = t < 0 ? -1 : 1)
      }
      function BMCompleteLoopEvent(e, t, r, n) {
        ;(this.type = e), (this.currentLoop = r), (this.totalLoops = t), (this.direction = n < 0 ? -1 : 1)
      }
      function BMSegmentStartEvent(e, t, r) {
        ;(this.type = e), (this.firstFrame = t), (this.totalFrames = r)
      }
      function BMDestroyEvent(e, t) {
        ;(this.type = e), (this.target = t)
      }
      function BMRenderFrameErrorEvent(e, t) {
        ;(this.type = 'renderFrameError'), (this.nativeError = e), (this.currentTime = t)
      }
      function BMConfigErrorEvent(e) {
        ;(this.type = 'configError'), (this.nativeError = e)
      }
      var createElementID =
          ((_count = 0),
          function () {
            return idPrefix + '__lottie_element_' + (_count += 1)
          }),
        _count
      function HSVtoRGB(e, t, r) {
        var n, i, s, a, o, l, h, c
        switch (
          ((l = r * (1 - t)),
          (h = r * (1 - (o = 6 * e - (a = Math.floor(6 * e))) * t)),
          (c = r * (1 - (1 - o) * t)),
          a % 6)
        ) {
          case 0:
            ;(n = r), (i = c), (s = l)
            break
          case 1:
            ;(n = h), (i = r), (s = l)
            break
          case 2:
            ;(n = l), (i = r), (s = c)
            break
          case 3:
            ;(n = l), (i = h), (s = r)
            break
          case 4:
            ;(n = c), (i = l), (s = r)
            break
          case 5:
            ;(n = r), (i = l), (s = h)
        }
        return [n, i, s]
      }
      function RGBtoHSV(e, t, r) {
        var n,
          i = Math.max(e, t, r),
          s = Math.min(e, t, r),
          a = i - s,
          o = 0 === i ? 0 : a / i,
          l = i / 255
        switch (i) {
          case s:
            n = 0
            break
          case e:
            ;(n = t - r + a * (t < r ? 6 : 0)), (n /= 6 * a)
            break
          case t:
            ;(n = r - e + 2 * a), (n /= 6 * a)
            break
          case r:
            ;(n = e - t + 4 * a), (n /= 6 * a)
        }
        return [n, o, l]
      }
      function addSaturationToRGB(e, t) {
        var r = RGBtoHSV(255 * e[0], 255 * e[1], 255 * e[2])
        return (r[1] += t), r[1] > 1 ? (r[1] = 1) : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
      }
      function addBrightnessToRGB(e, t) {
        var r = RGBtoHSV(255 * e[0], 255 * e[1], 255 * e[2])
        return (r[2] += t), r[2] > 1 ? (r[2] = 1) : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
      }
      function addHueToRGB(e, t) {
        var r = RGBtoHSV(255 * e[0], 255 * e[1], 255 * e[2])
        return (r[0] += t / 360), r[0] > 1 ? (r[0] -= 1) : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
      }
      var rgbToHex = (function () {
          var e,
            t,
            r = []
          for (e = 0; e < 256; e += 1) (t = e.toString(16)), (r[e] = 1 === t.length ? '0' + t : t)
          return function (e, t, n) {
            return e < 0 && (e = 0), t < 0 && (t = 0), n < 0 && (n = 0), '#' + r[e] + r[t] + r[n]
          }
        })(),
        setSubframeEnabled = function (e) {
          subframeEnabled = !!e
        },
        getSubframeEnabled = function () {
          return subframeEnabled
        },
        setExpressionsPlugin = function (e) {
          expressionsPlugin = e
        },
        getExpressionsPlugin = function () {
          return expressionsPlugin
        },
        setDefaultCurveSegments = function (e) {
          defaultCurveSegments = e
        },
        getDefaultCurveSegments = function () {
          return defaultCurveSegments
        },
        setIdPrefix = function (e) {
          idPrefix = e
        }
      function createNS(e) {
        return document.createElementNS(svgNS, e)
      }
      function _typeof$5(e) {
        return (_typeof$5 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      var dataManager = (function () {
          var e,
            t,
            r = 1,
            n = [],
            i = {
              onmessage: function () {},
              postMessage: function (t) {
                e({ data: t })
              },
            },
            s = {
              postMessage: function (e) {
                i.onmessage({ data: e })
              },
            }
          function a() {
            t ||
              ((t = (function (t) {
                if (window.Worker && window.Blob && getWebWorker()) {
                  var r = new Blob(['var _workerSelf = self; self.onmessage = ', t.toString()], {
                      type: 'text/javascript',
                    }),
                    n = URL.createObjectURL(r)
                  return new Worker(n)
                }
                return (e = t), i
              })(function (e) {
                if (
                  (s.dataManager ||
                    (s.dataManager = (function () {
                      function e(i, s) {
                        var a,
                          o,
                          l,
                          h,
                          c,
                          u,
                          f = i.length
                        for (o = 0; o < f; o += 1)
                          if ('ks' in (a = i[o]) && !a.completed) {
                            if (((a.completed = !0), a.tt && (i[o - 1].td = a.tt), a.hasMask)) {
                              var d = a.masksProperties
                              for (h = d.length, l = 0; l < h; l += 1)
                                if (d[l].pt.k.i) n(d[l].pt.k)
                                else
                                  for (u = d[l].pt.k.length, c = 0; c < u; c += 1)
                                    d[l].pt.k[c].s && n(d[l].pt.k[c].s[0]), d[l].pt.k[c].e && n(d[l].pt.k[c].e[0])
                            }
                            0 === a.ty
                              ? ((a.layers = t(a.refId, s)), e(a.layers, s))
                              : 4 === a.ty
                              ? r(a.shapes)
                              : 5 === a.ty && p(a)
                          }
                      }
                      function t(e, t) {
                        var r = (function (e, t) {
                          for (var r = 0, n = t.length; r < n; ) {
                            if (t[r].id === e) return t[r]
                            r += 1
                          }
                          return null
                        })(e, t)
                        return r
                          ? r.layers.__used
                            ? JSON.parse(JSON.stringify(r.layers))
                            : ((r.layers.__used = !0), r.layers)
                          : null
                      }
                      function r(e) {
                        var t, i, s
                        for (t = e.length - 1; t >= 0; t -= 1)
                          if ('sh' === e[t].ty)
                            if (e[t].ks.k.i) n(e[t].ks.k)
                            else
                              for (s = e[t].ks.k.length, i = 0; i < s; i += 1)
                                e[t].ks.k[i].s && n(e[t].ks.k[i].s[0]), e[t].ks.k[i].e && n(e[t].ks.k[i].e[0])
                          else 'gr' === e[t].ty && r(e[t].it)
                      }
                      function n(e) {
                        var t,
                          r = e.i.length
                        for (t = 0; t < r; t += 1)
                          (e.i[t][0] += e.v[t][0]),
                            (e.i[t][1] += e.v[t][1]),
                            (e.o[t][0] += e.v[t][0]),
                            (e.o[t][1] += e.v[t][1])
                      }
                      function i(e, t) {
                        var r = t ? t.split('.') : [100, 100, 100]
                        return (
                          e[0] > r[0] ||
                          (!(r[0] > e[0]) &&
                            (e[1] > r[1] || (!(r[1] > e[1]) && (e[2] > r[2] || (!(r[2] > e[2]) && null)))))
                        )
                      }
                      var s,
                        a = (function () {
                          var e = [4, 4, 14]
                          function t(e) {
                            var t,
                              r,
                              n,
                              i = e.length
                            for (t = 0; t < i; t += 1)
                              5 === e[t].ty && ((n = void 0), (n = (r = e[t]).t.d), (r.t.d = { k: [{ s: n, t: 0 }] }))
                          }
                          return function (r) {
                            if (i(e, r.v) && (t(r.layers), r.assets)) {
                              var n,
                                s = r.assets.length
                              for (n = 0; n < s; n += 1) r.assets[n].layers && t(r.assets[n].layers)
                            }
                          }
                        })(),
                        o =
                          ((s = [4, 7, 99]),
                          function (e) {
                            if (e.chars && !i(s, e.v)) {
                              var t,
                                n = e.chars.length
                              for (t = 0; t < n; t += 1) {
                                var a = e.chars[t]
                                a.data &&
                                  a.data.shapes &&
                                  (r(a.data.shapes),
                                  (a.data.ip = 0),
                                  (a.data.op = 99999),
                                  (a.data.st = 0),
                                  (a.data.sr = 1),
                                  (a.data.ks = {
                                    p: { k: [0, 0], a: 0 },
                                    s: { k: [100, 100], a: 0 },
                                    a: { k: [0, 0], a: 0 },
                                    r: { k: 0, a: 0 },
                                    o: { k: 100, a: 0 },
                                  }),
                                  e.chars[t].t ||
                                    (a.data.shapes.push({ ty: 'no' }),
                                    a.data.shapes[0].it.push({
                                      p: { k: [0, 0], a: 0 },
                                      s: { k: [100, 100], a: 0 },
                                      a: { k: [0, 0], a: 0 },
                                      r: { k: 0, a: 0 },
                                      o: { k: 100, a: 0 },
                                      sk: { k: 0, a: 0 },
                                      sa: { k: 0, a: 0 },
                                      ty: 'tr',
                                    })))
                              }
                            }
                          }),
                        l = (function () {
                          var e = [5, 7, 15]
                          function t(e) {
                            var t,
                              r,
                              n = e.length
                            for (t = 0; t < n; t += 1)
                              5 === e[t].ty &&
                                ((r = void 0),
                                'number' == typeof (r = e[t].t.p).a && (r.a = { a: 0, k: r.a }),
                                'number' == typeof r.p && (r.p = { a: 0, k: r.p }),
                                'number' == typeof r.r && (r.r = { a: 0, k: r.r }))
                          }
                          return function (r) {
                            if (i(e, r.v) && (t(r.layers), r.assets)) {
                              var n,
                                s = r.assets.length
                              for (n = 0; n < s; n += 1) r.assets[n].layers && t(r.assets[n].layers)
                            }
                          }
                        })(),
                        h = (function () {
                          var e = [4, 1, 9]
                          function t(e) {
                            var r,
                              n,
                              i,
                              s = e.length
                            for (r = 0; r < s; r += 1)
                              if ('gr' === e[r].ty) t(e[r].it)
                              else if ('fl' === e[r].ty || 'st' === e[r].ty)
                                if (e[r].c.k && e[r].c.k[0].i)
                                  for (i = e[r].c.k.length, n = 0; n < i; n += 1)
                                    e[r].c.k[n].s &&
                                      ((e[r].c.k[n].s[0] /= 255),
                                      (e[r].c.k[n].s[1] /= 255),
                                      (e[r].c.k[n].s[2] /= 255),
                                      (e[r].c.k[n].s[3] /= 255)),
                                      e[r].c.k[n].e &&
                                        ((e[r].c.k[n].e[0] /= 255),
                                        (e[r].c.k[n].e[1] /= 255),
                                        (e[r].c.k[n].e[2] /= 255),
                                        (e[r].c.k[n].e[3] /= 255))
                                else
                                  (e[r].c.k[0] /= 255), (e[r].c.k[1] /= 255), (e[r].c.k[2] /= 255), (e[r].c.k[3] /= 255)
                          }
                          function r(e) {
                            var r,
                              n = e.length
                            for (r = 0; r < n; r += 1) 4 === e[r].ty && t(e[r].shapes)
                          }
                          return function (t) {
                            if (i(e, t.v) && (r(t.layers), t.assets)) {
                              var n,
                                s = t.assets.length
                              for (n = 0; n < s; n += 1) t.assets[n].layers && r(t.assets[n].layers)
                            }
                          }
                        })(),
                        c = (function () {
                          var e = [4, 4, 18]
                          function t(e) {
                            var r, n, i
                            for (r = e.length - 1; r >= 0; r -= 1)
                              if ('sh' === e[r].ty)
                                if (e[r].ks.k.i) e[r].ks.k.c = e[r].closed
                                else
                                  for (i = e[r].ks.k.length, n = 0; n < i; n += 1)
                                    e[r].ks.k[n].s && (e[r].ks.k[n].s[0].c = e[r].closed),
                                      e[r].ks.k[n].e && (e[r].ks.k[n].e[0].c = e[r].closed)
                              else 'gr' === e[r].ty && t(e[r].it)
                          }
                          function r(e) {
                            var r,
                              n,
                              i,
                              s,
                              a,
                              o,
                              l = e.length
                            for (n = 0; n < l; n += 1) {
                              if ((r = e[n]).hasMask) {
                                var h = r.masksProperties
                                for (s = h.length, i = 0; i < s; i += 1)
                                  if (h[i].pt.k.i) h[i].pt.k.c = h[i].cl
                                  else
                                    for (o = h[i].pt.k.length, a = 0; a < o; a += 1)
                                      h[i].pt.k[a].s && (h[i].pt.k[a].s[0].c = h[i].cl),
                                        h[i].pt.k[a].e && (h[i].pt.k[a].e[0].c = h[i].cl)
                              }
                              4 === r.ty && t(r.shapes)
                            }
                          }
                          return function (t) {
                            if (i(e, t.v) && (r(t.layers), t.assets)) {
                              var n,
                                s = t.assets.length
                              for (n = 0; n < s; n += 1) t.assets[n].layers && r(t.assets[n].layers)
                            }
                          }
                        })()
                      function p(e) {
                        0 === e.t.a.length && e.t.p
                      }
                      var u = {
                        completeData: function (r) {
                          r.__complete ||
                            (h(r),
                            a(r),
                            o(r),
                            l(r),
                            c(r),
                            e(r.layers, r.assets),
                            (function (r, n) {
                              if (r) {
                                var i = 0,
                                  s = r.length
                                for (i = 0; i < s; i += 1)
                                  1 === r[i].t && ((r[i].data.layers = t(r[i].data.refId, n)), e(r[i].data.layers, n))
                              }
                            })(r.chars, r.assets),
                            (r.__complete = !0))
                        },
                      }
                      return (
                        (u.checkColors = h),
                        (u.checkChars = o),
                        (u.checkPathProperties = l),
                        (u.checkShapes = c),
                        (u.completeLayers = e),
                        u
                      )
                    })()),
                  s.assetLoader ||
                    (s.assetLoader = (function () {
                      function e(e) {
                        var t = e.getResponseHeader('content-type')
                        return (t && 'json' === e.responseType && -1 !== t.indexOf('json')) ||
                          (e.response && 'object' === _typeof$5(e.response))
                          ? e.response
                          : e.response && 'string' == typeof e.response
                          ? JSON.parse(e.response)
                          : e.responseText
                          ? JSON.parse(e.responseText)
                          : null
                      }
                      return {
                        load: function (t, r, n, i) {
                          var s,
                            a = new XMLHttpRequest()
                          try {
                            a.responseType = 'json'
                          } catch (o) {}
                          a.onreadystatechange = function () {
                            if (4 === a.readyState)
                              if (200 === a.status) (s = e(a)), n(s)
                              else
                                try {
                                  ;(s = e(a)), n(s)
                                } catch (o) {
                                  i && i(o)
                                }
                          }
                          try {
                            a.open('GET', t, !0)
                          } catch (l) {
                            a.open('GET', r + '/' + t, !0)
                          }
                          a.send()
                        },
                      }
                    })()),
                  'loadAnimation' === e.data.type)
                )
                  s.assetLoader.load(
                    e.data.path,
                    e.data.fullPath,
                    function (t) {
                      s.dataManager.completeData(t), s.postMessage({ id: e.data.id, payload: t, status: 'success' })
                    },
                    function () {
                      s.postMessage({ id: e.data.id, status: 'error' })
                    }
                  )
                else if ('complete' === e.data.type) {
                  var t = e.data.animation
                  s.dataManager.completeData(t), s.postMessage({ id: e.data.id, payload: t, status: 'success' })
                } else
                  'loadData' === e.data.type &&
                    s.assetLoader.load(
                      e.data.path,
                      e.data.fullPath,
                      function (t) {
                        s.postMessage({ id: e.data.id, payload: t, status: 'success' })
                      },
                      function () {
                        s.postMessage({ id: e.data.id, status: 'error' })
                      }
                    )
              })).onmessage = function (e) {
                var t = e.data,
                  r = t.id,
                  i = n[r]
                ;(n[r] = null), 'success' === t.status ? i.onComplete(t.payload) : i.onError && i.onError()
              })
          }
          function o(e, t) {
            var i = 'processId_' + (r += 1)
            return (n[i] = { onComplete: e, onError: t }), i
          }
          return {
            loadAnimation: function (e, r, n) {
              a()
              var i = o(r, n)
              t.postMessage({
                type: 'loadAnimation',
                path: e,
                fullPath: window.location.origin + window.location.pathname,
                id: i,
              })
            },
            loadData: function (e, r, n) {
              a()
              var i = o(r, n)
              t.postMessage({
                type: 'loadData',
                path: e,
                fullPath: window.location.origin + window.location.pathname,
                id: i,
              })
            },
            completeAnimation: function (e, r, n) {
              a()
              var i = o(r, n)
              t.postMessage({ type: 'complete', animation: e, id: i })
            },
          }
        })(),
        ImagePreloader = (function () {
          var e = (function () {
            var e = createTag('canvas')
            ;(e.width = 1), (e.height = 1)
            var t = e.getContext('2d')
            return (t.fillStyle = 'rgba(0,0,0,0)'), t.fillRect(0, 0, 1, 1), e
          })()
          function t() {
            ;(this.loadedAssets += 1),
              this.loadedAssets === this.totalImages &&
                this.loadedFootagesCount === this.totalFootages &&
                this.imagesLoadedCb &&
                this.imagesLoadedCb(null)
          }
          function r() {
            ;(this.loadedFootagesCount += 1),
              this.loadedAssets === this.totalImages &&
                this.loadedFootagesCount === this.totalFootages &&
                this.imagesLoadedCb &&
                this.imagesLoadedCb(null)
          }
          function n(e, t, r) {
            var n = ''
            if (e.e) n = e.p
            else if (t) {
              var i = e.p
              ;-1 !== i.indexOf('images/') && (i = i.split('/')[1]), (n = t + i)
            } else (n = r), (n += e.u ? e.u : ''), (n += e.p)
            return n
          }
          function i(e) {
            var t = 0,
              r = setInterval(
                function () {
                  ;(e.getBBox().width || t > 500) && (this._imageLoaded(), clearInterval(r)), (t += 1)
                }.bind(this),
                50
              )
          }
          function s(e) {
            var t = { assetData: e },
              r = n(e, this.assetsPath, this.path)
            return (
              dataManager.loadData(
                r,
                function (e) {
                  ;(t.img = e), this._footageLoaded()
                }.bind(this),
                function () {
                  ;(t.img = {}), this._footageLoaded()
                }.bind(this)
              ),
              t
            )
          }
          function a() {
            ;(this._imageLoaded = t.bind(this)),
              (this._footageLoaded = r.bind(this)),
              (this.testImageLoaded = i.bind(this)),
              (this.createFootageData = s.bind(this)),
              (this.assetsPath = ''),
              (this.path = ''),
              (this.totalImages = 0),
              (this.totalFootages = 0),
              (this.loadedAssets = 0),
              (this.loadedFootagesCount = 0),
              (this.imagesLoadedCb = null),
              (this.images = [])
          }
          return (
            (a.prototype = {
              loadAssets: function (e, t) {
                var r
                this.imagesLoadedCb = t
                var n = e.length
                for (r = 0; r < n; r += 1)
                  e[r].layers ||
                    (e[r].t && 'seq' !== e[r].t
                      ? 3 === e[r].t && ((this.totalFootages += 1), this.images.push(this.createFootageData(e[r])))
                      : ((this.totalImages += 1), this.images.push(this._createImageData(e[r]))))
              },
              setAssetsPath: function (e) {
                this.assetsPath = e || ''
              },
              setPath: function (e) {
                this.path = e || ''
              },
              loadedImages: function () {
                return this.totalImages === this.loadedAssets
              },
              loadedFootages: function () {
                return this.totalFootages === this.loadedFootagesCount
              },
              destroy: function () {
                ;(this.imagesLoadedCb = null), (this.images.length = 0)
              },
              getAsset: function (e) {
                for (var t = 0, r = this.images.length; t < r; ) {
                  if (this.images[t].assetData === e) return this.images[t].img
                  t += 1
                }
                return null
              },
              createImgData: function (t) {
                var r = n(t, this.assetsPath, this.path),
                  i = createTag('img')
                ;(i.crossOrigin = 'anonymous'),
                  i.addEventListener('load', this._imageLoaded, !1),
                  i.addEventListener(
                    'error',
                    function () {
                      ;(s.img = e), this._imageLoaded()
                    }.bind(this),
                    !1
                  ),
                  (i.src = r)
                var s = { img: i, assetData: t }
                return s
              },
              createImageData: function (t) {
                var r = n(t, this.assetsPath, this.path),
                  i = createNS('image')
                isSafari ? this.testImageLoaded(i) : i.addEventListener('load', this._imageLoaded, !1),
                  i.addEventListener(
                    'error',
                    function () {
                      ;(s.img = e), this._imageLoaded()
                    }.bind(this),
                    !1
                  ),
                  i.setAttributeNS('http://www.w3.org/1999/xlink', 'href', r),
                  this._elementHelper.append ? this._elementHelper.append(i) : this._elementHelper.appendChild(i)
                var s = { img: i, assetData: t }
                return s
              },
              imageLoaded: t,
              footageLoaded: r,
              setCacheType: function (e, t) {
                'svg' === e
                  ? ((this._elementHelper = t), (this._createImageData = this.createImageData.bind(this)))
                  : (this._createImageData = this.createImgData.bind(this))
              },
            }),
            a
          )
        })()
      function BaseEvent() {}
      BaseEvent.prototype = {
        triggerEvent: function (e, t) {
          if (this._cbs[e]) for (var r = this._cbs[e], n = 0; n < r.length; n += 1) r[n](t)
        },
        addEventListener: function (e, t) {
          return (
            this._cbs[e] || (this._cbs[e] = []),
            this._cbs[e].push(t),
            function () {
              this.removeEventListener(e, t)
            }.bind(this)
          )
        },
        removeEventListener: function (e, t) {
          if (t) {
            if (this._cbs[e]) {
              for (var r = 0, n = this._cbs[e].length; r < n; )
                this._cbs[e][r] === t && (this._cbs[e].splice(r, 1), (r -= 1), (n -= 1)), (r += 1)
              this._cbs[e].length || (this._cbs[e] = null)
            }
          } else this._cbs[e] = null
        },
      }
      var markerParser = (function () {
          function e(e) {
            for (var t, r = e.split('\r\n'), n = {}, i = 0, s = 0; s < r.length; s += 1)
              2 === (t = r[s].split(':')).length && ((n[t[0]] = t[1].trim()), (i += 1))
            if (0 === i) throw new Error()
            return n
          }
          return function (t) {
            for (var r = [], n = 0; n < t.length; n += 1) {
              var i = t[n],
                s = { time: i.tm, duration: i.dr }
              try {
                s.payload = JSON.parse(t[n].cm)
              } catch (a) {
                try {
                  s.payload = e(t[n].cm)
                } catch (o) {
                  s.payload = { name: t[n] }
                }
              }
              r.push(s)
            }
            return r
          }
        })(),
        ProjectInterface = (function () {
          function e(e) {
            this.compositions.push(e)
          }
          return function () {
            function t(e) {
              for (var t = 0, r = this.compositions.length; t < r; ) {
                if (this.compositions[t].data && this.compositions[t].data.nm === e)
                  return (
                    this.compositions[t].prepareFrame &&
                      this.compositions[t].data.xt &&
                      this.compositions[t].prepareFrame(this.currentFrame),
                    this.compositions[t].compInterface
                  )
                t += 1
              }
              return null
            }
            return (t.compositions = []), (t.currentFrame = 0), (t.registerComposition = e), t
          }
        })(),
        renderers = {},
        registerRenderer = function (e, t) {
          renderers[e] = t
        }
      function getRenderer(e) {
        return renderers[e]
      }
      function _typeof$4(e) {
        return (_typeof$4 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      var AnimationItem = function () {
        ;(this._cbs = []),
          (this.name = ''),
          (this.path = ''),
          (this.isLoaded = !1),
          (this.currentFrame = 0),
          (this.currentRawFrame = 0),
          (this.firstFrame = 0),
          (this.totalFrames = 0),
          (this.frameRate = 0),
          (this.frameMult = 0),
          (this.playSpeed = 1),
          (this.playDirection = 1),
          (this.playCount = 0),
          (this.animationData = {}),
          (this.assets = []),
          (this.isPaused = !0),
          (this.autoplay = !1),
          (this.loop = !0),
          (this.renderer = null),
          (this.animationID = createElementID()),
          (this.assetsPath = ''),
          (this.timeCompleted = 0),
          (this.segmentPos = 0),
          (this.isSubframeEnabled = getSubframeEnabled()),
          (this.segments = []),
          (this._idle = !0),
          (this._completedLoop = !1),
          (this.projectInterface = ProjectInterface()),
          (this.imagePreloader = new ImagePreloader()),
          (this.audioController = audioControllerFactory()),
          (this.markers = []),
          (this.configAnimation = this.configAnimation.bind(this)),
          (this.onSetupError = this.onSetupError.bind(this)),
          (this.onSegmentComplete = this.onSegmentComplete.bind(this))
      }
      extendPrototype([BaseEvent], AnimationItem),
        (AnimationItem.prototype.setParams = function (e) {
          ;(e.wrapper || e.container) && (this.wrapper = e.wrapper || e.container)
          var t = 'svg'
          e.animType ? (t = e.animType) : e.renderer && (t = e.renderer)
          var r = getRenderer(t)
          ;(this.renderer = new r(this, e.rendererSettings)),
            this.imagePreloader.setCacheType(t, this.renderer.globalData.defs),
            this.renderer.setProjectInterface(this.projectInterface),
            (this.animType = t),
            '' === e.loop || null === e.loop || void 0 === e.loop || !0 === e.loop
              ? (this.loop = !0)
              : !1 === e.loop
              ? (this.loop = !1)
              : (this.loop = parseInt(e.loop, 10)),
            (this.autoplay = !('autoplay' in e) || e.autoplay),
            (this.name = e.name ? e.name : ''),
            (this.autoloadSegments =
              !Object.prototype.hasOwnProperty.call(e, 'autoloadSegments') || e.autoloadSegments),
            (this.assetsPath = e.assetsPath),
            (this.initialSegment = e.initialSegment),
            e.audioFactory && this.audioController.setAudioFactory(e.audioFactory),
            e.animationData
              ? this.setupAnimation(e.animationData)
              : e.path &&
                (-1 !== e.path.lastIndexOf('\\')
                  ? (this.path = e.path.substr(0, e.path.lastIndexOf('\\') + 1))
                  : (this.path = e.path.substr(0, e.path.lastIndexOf('/') + 1)),
                (this.fileName = e.path.substr(e.path.lastIndexOf('/') + 1)),
                (this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.json'))),
                dataManager.loadAnimation(e.path, this.configAnimation, this.onSetupError))
        }),
        (AnimationItem.prototype.onSetupError = function () {
          this.trigger('data_failed')
        }),
        (AnimationItem.prototype.setupAnimation = function (e) {
          dataManager.completeAnimation(e, this.configAnimation)
        }),
        (AnimationItem.prototype.setData = function (e, t) {
          t && 'object' !== _typeof$4(t) && (t = JSON.parse(t))
          var r = { wrapper: e, animationData: t },
            n = e.attributes
          ;(r.path = n.getNamedItem('data-animation-path')
            ? n.getNamedItem('data-animation-path').value
            : n.getNamedItem('data-bm-path')
            ? n.getNamedItem('data-bm-path').value
            : n.getNamedItem('bm-path')
            ? n.getNamedItem('bm-path').value
            : ''),
            (r.animType = n.getNamedItem('data-anim-type')
              ? n.getNamedItem('data-anim-type').value
              : n.getNamedItem('data-bm-type')
              ? n.getNamedItem('data-bm-type').value
              : n.getNamedItem('bm-type')
              ? n.getNamedItem('bm-type').value
              : n.getNamedItem('data-bm-renderer')
              ? n.getNamedItem('data-bm-renderer').value
              : n.getNamedItem('bm-renderer')
              ? n.getNamedItem('bm-renderer').value
              : 'canvas')
          var i = n.getNamedItem('data-anim-loop')
            ? n.getNamedItem('data-anim-loop').value
            : n.getNamedItem('data-bm-loop')
            ? n.getNamedItem('data-bm-loop').value
            : n.getNamedItem('bm-loop')
            ? n.getNamedItem('bm-loop').value
            : ''
          'false' === i ? (r.loop = !1) : 'true' === i ? (r.loop = !0) : '' !== i && (r.loop = parseInt(i, 10))
          var s = n.getNamedItem('data-anim-autoplay')
            ? n.getNamedItem('data-anim-autoplay').value
            : n.getNamedItem('data-bm-autoplay')
            ? n.getNamedItem('data-bm-autoplay').value
            : !n.getNamedItem('bm-autoplay') || n.getNamedItem('bm-autoplay').value
          ;(r.autoplay = 'false' !== s),
            (r.name = n.getNamedItem('data-name')
              ? n.getNamedItem('data-name').value
              : n.getNamedItem('data-bm-name')
              ? n.getNamedItem('data-bm-name').value
              : n.getNamedItem('bm-name')
              ? n.getNamedItem('bm-name').value
              : ''),
            'false' ===
              (n.getNamedItem('data-anim-prerender')
                ? n.getNamedItem('data-anim-prerender').value
                : n.getNamedItem('data-bm-prerender')
                ? n.getNamedItem('data-bm-prerender').value
                : n.getNamedItem('bm-prerender')
                ? n.getNamedItem('bm-prerender').value
                : '') && (r.prerender = !1),
            this.setParams(r)
        }),
        (AnimationItem.prototype.includeLayers = function (e) {
          e.op > this.animationData.op &&
            ((this.animationData.op = e.op), (this.totalFrames = Math.floor(e.op - this.animationData.ip)))
          var t,
            r,
            n = this.animationData.layers,
            i = n.length,
            s = e.layers,
            a = s.length
          for (r = 0; r < a; r += 1)
            for (t = 0; t < i; ) {
              if (n[t].id === s[r].id) {
                n[t] = s[r]
                break
              }
              t += 1
            }
          if (
            ((e.chars || e.fonts) &&
              (this.renderer.globalData.fontManager.addChars(e.chars),
              this.renderer.globalData.fontManager.addFonts(e.fonts, this.renderer.globalData.defs)),
            e.assets)
          )
            for (i = e.assets.length, t = 0; t < i; t += 1) this.animationData.assets.push(e.assets[t])
          ;(this.animationData.__complete = !1),
            dataManager.completeAnimation(this.animationData, this.onSegmentComplete)
        }),
        (AnimationItem.prototype.onSegmentComplete = function (e) {
          this.animationData = e
          var t = getExpressionsPlugin()
          t && t.initExpressions(this), this.loadNextSegment()
        }),
        (AnimationItem.prototype.loadNextSegment = function () {
          var e = this.animationData.segments
          if (!e || 0 === e.length || !this.autoloadSegments)
            return this.trigger('data_ready'), void (this.timeCompleted = this.totalFrames)
          var t = e.shift()
          this.timeCompleted = t.time * this.frameRate
          var r = this.path + this.fileName + '_' + this.segmentPos + '.json'
          ;(this.segmentPos += 1),
            dataManager.loadData(
              r,
              this.includeLayers.bind(this),
              function () {
                this.trigger('data_failed')
              }.bind(this)
            )
        }),
        (AnimationItem.prototype.loadSegments = function () {
          this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
        }),
        (AnimationItem.prototype.imagesLoaded = function () {
          this.trigger('loaded_images'), this.checkLoaded()
        }),
        (AnimationItem.prototype.preloadImages = function () {
          this.imagePreloader.setAssetsPath(this.assetsPath),
            this.imagePreloader.setPath(this.path),
            this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
        }),
        (AnimationItem.prototype.configAnimation = function (e) {
          if (this.renderer)
            try {
              ;(this.animationData = e),
                this.initialSegment
                  ? ((this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0])),
                    (this.firstFrame = Math.round(this.initialSegment[0])))
                  : ((this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip)),
                    (this.firstFrame = Math.round(this.animationData.ip))),
                this.renderer.configAnimation(e),
                e.assets || (e.assets = []),
                (this.assets = this.animationData.assets),
                (this.frameRate = this.animationData.fr),
                (this.frameMult = this.animationData.fr / 1e3),
                this.renderer.searchExtraCompositions(e.assets),
                (this.markers = markerParser(e.markers || [])),
                this.trigger('config_ready'),
                this.preloadImages(),
                this.loadSegments(),
                this.updaFrameModifier(),
                this.waitForFontsLoaded(),
                this.isPaused && this.audioController.pause()
            } catch (t) {
              this.triggerConfigError(t)
            }
        }),
        (AnimationItem.prototype.waitForFontsLoaded = function () {
          this.renderer &&
            (this.renderer.globalData.fontManager.isLoaded
              ? this.checkLoaded()
              : setTimeout(this.waitForFontsLoaded.bind(this), 20))
        }),
        (AnimationItem.prototype.checkLoaded = function () {
          if (
            !this.isLoaded &&
            this.renderer.globalData.fontManager.isLoaded &&
            (this.imagePreloader.loadedImages() || 'canvas' !== this.renderer.rendererType) &&
            this.imagePreloader.loadedFootages()
          ) {
            this.isLoaded = !0
            var e = getExpressionsPlugin()
            e && e.initExpressions(this),
              this.renderer.initItems(),
              setTimeout(
                function () {
                  this.trigger('DOMLoaded')
                }.bind(this),
                0
              ),
              this.gotoFrame(),
              this.autoplay && this.play()
          }
        }),
        (AnimationItem.prototype.resize = function () {
          this.renderer.updateContainerSize()
        }),
        (AnimationItem.prototype.setSubframe = function (e) {
          this.isSubframeEnabled = !!e
        }),
        (AnimationItem.prototype.gotoFrame = function () {
          ;(this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame),
            this.timeCompleted !== this.totalFrames &&
              this.currentFrame > this.timeCompleted &&
              (this.currentFrame = this.timeCompleted),
            this.trigger('enterFrame'),
            this.renderFrame(),
            this.trigger('drawnFrame')
        }),
        (AnimationItem.prototype.renderFrame = function () {
          if (!1 !== this.isLoaded && this.renderer)
            try {
              this.renderer.renderFrame(this.currentFrame + this.firstFrame)
            } catch (e) {
              this.triggerRenderFrameError(e)
            }
        }),
        (AnimationItem.prototype.play = function (e) {
          ;(e && this.name !== e) ||
            (!0 === this.isPaused &&
              ((this.isPaused = !1),
              this.audioController.resume(),
              this._idle && ((this._idle = !1), this.trigger('_active'))))
        }),
        (AnimationItem.prototype.pause = function (e) {
          ;(e && this.name !== e) ||
            (!1 === this.isPaused &&
              ((this.isPaused = !0), (this._idle = !0), this.trigger('_idle'), this.audioController.pause()))
        }),
        (AnimationItem.prototype.togglePause = function (e) {
          ;(e && this.name !== e) || (!0 === this.isPaused ? this.play() : this.pause())
        }),
        (AnimationItem.prototype.stop = function (e) {
          ;(e && this.name !== e) ||
            (this.pause(), (this.playCount = 0), (this._completedLoop = !1), this.setCurrentRawFrameValue(0))
        }),
        (AnimationItem.prototype.getMarkerData = function (e) {
          for (var t, r = 0; r < this.markers.length; r += 1)
            if ((t = this.markers[r]).payload && t.payload.name === e) return t
          return null
        }),
        (AnimationItem.prototype.goToAndStop = function (e, t, r) {
          if (!r || this.name === r) {
            var n = Number(e)
            if (isNaN(n)) {
              var i = this.getMarkerData(e)
              i && this.goToAndStop(i.time, !0)
            } else t ? this.setCurrentRawFrameValue(e) : this.setCurrentRawFrameValue(e * this.frameModifier)
            this.pause()
          }
        }),
        (AnimationItem.prototype.goToAndPlay = function (e, t, r) {
          if (!r || this.name === r) {
            var n = Number(e)
            if (isNaN(n)) {
              var i = this.getMarkerData(e)
              i && (i.duration ? this.playSegments([i.time, i.time + i.duration], !0) : this.goToAndStop(i.time, !0))
            } else this.goToAndStop(n, t, r)
            this.play()
          }
        }),
        (AnimationItem.prototype.advanceTime = function (e) {
          if (!0 !== this.isPaused && !1 !== this.isLoaded) {
            var t = this.currentRawFrame + e * this.frameModifier,
              r = !1
            t >= this.totalFrames - 1 && this.frameModifier > 0
              ? this.loop && this.playCount !== this.loop
                ? t >= this.totalFrames
                  ? ((this.playCount += 1),
                    this.checkSegments(t % this.totalFrames) ||
                      (this.setCurrentRawFrameValue(t % this.totalFrames),
                      (this._completedLoop = !0),
                      this.trigger('loopComplete')))
                  : this.setCurrentRawFrameValue(t)
                : this.checkSegments(t > this.totalFrames ? t % this.totalFrames : 0) ||
                  ((r = !0), (t = this.totalFrames - 1))
              : t < 0
              ? this.checkSegments(t % this.totalFrames) ||
                (!this.loop || (this.playCount-- <= 0 && !0 !== this.loop)
                  ? ((r = !0), (t = 0))
                  : (this.setCurrentRawFrameValue(this.totalFrames + (t % this.totalFrames)),
                    this._completedLoop ? this.trigger('loopComplete') : (this._completedLoop = !0)))
              : this.setCurrentRawFrameValue(t),
              r && (this.setCurrentRawFrameValue(t), this.pause(), this.trigger('complete'))
          }
        }),
        (AnimationItem.prototype.adjustSegment = function (e, t) {
          ;(this.playCount = 0),
            e[1] < e[0]
              ? (this.frameModifier > 0 &&
                  (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
                (this.totalFrames = e[0] - e[1]),
                (this.timeCompleted = this.totalFrames),
                (this.firstFrame = e[1]),
                this.setCurrentRawFrameValue(this.totalFrames - 0.001 - t))
              : e[1] > e[0] &&
                (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
                (this.totalFrames = e[1] - e[0]),
                (this.timeCompleted = this.totalFrames),
                (this.firstFrame = e[0]),
                this.setCurrentRawFrameValue(0.001 + t)),
            this.trigger('segmentStart')
        }),
        (AnimationItem.prototype.setSegment = function (e, t) {
          var r = -1
          this.isPaused &&
            (this.currentRawFrame + this.firstFrame < e
              ? (r = e)
              : this.currentRawFrame + this.firstFrame > t && (r = t - e)),
            (this.firstFrame = e),
            (this.totalFrames = t - e),
            (this.timeCompleted = this.totalFrames),
            -1 !== r && this.goToAndStop(r, !0)
        }),
        (AnimationItem.prototype.playSegments = function (e, t) {
          if ((t && (this.segments.length = 0), 'object' === _typeof$4(e[0]))) {
            var r,
              n = e.length
            for (r = 0; r < n; r += 1) this.segments.push(e[r])
          } else this.segments.push(e)
          this.segments.length && t && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
        }),
        (AnimationItem.prototype.resetSegments = function (e) {
          ;(this.segments.length = 0),
            this.segments.push([this.animationData.ip, this.animationData.op]),
            e && this.checkSegments(0)
        }),
        (AnimationItem.prototype.checkSegments = function (e) {
          return !!this.segments.length && (this.adjustSegment(this.segments.shift(), e), !0)
        }),
        (AnimationItem.prototype.destroy = function (e) {
          ;(e && this.name !== e) ||
            !this.renderer ||
            (this.renderer.destroy(),
            this.imagePreloader.destroy(),
            this.trigger('destroy'),
            (this._cbs = null),
            (this.onEnterFrame = null),
            (this.onLoopComplete = null),
            (this.onComplete = null),
            (this.onSegmentStart = null),
            (this.onDestroy = null),
            (this.renderer = null),
            (this.renderer = null),
            (this.imagePreloader = null),
            (this.projectInterface = null))
        }),
        (AnimationItem.prototype.setCurrentRawFrameValue = function (e) {
          ;(this.currentRawFrame = e), this.gotoFrame()
        }),
        (AnimationItem.prototype.setSpeed = function (e) {
          ;(this.playSpeed = e), this.updaFrameModifier()
        }),
        (AnimationItem.prototype.setDirection = function (e) {
          ;(this.playDirection = e < 0 ? -1 : 1), this.updaFrameModifier()
        }),
        (AnimationItem.prototype.setVolume = function (e, t) {
          ;(t && this.name !== t) || this.audioController.setVolume(e)
        }),
        (AnimationItem.prototype.getVolume = function () {
          return this.audioController.getVolume()
        }),
        (AnimationItem.prototype.mute = function (e) {
          ;(e && this.name !== e) || this.audioController.mute()
        }),
        (AnimationItem.prototype.unmute = function (e) {
          ;(e && this.name !== e) || this.audioController.unmute()
        }),
        (AnimationItem.prototype.updaFrameModifier = function () {
          ;(this.frameModifier = this.frameMult * this.playSpeed * this.playDirection),
            this.audioController.setRate(this.playSpeed * this.playDirection)
        }),
        (AnimationItem.prototype.getPath = function () {
          return this.path
        }),
        (AnimationItem.prototype.getAssetsPath = function (e) {
          var t = ''
          if (e.e) t = e.p
          else if (this.assetsPath) {
            var r = e.p
            ;-1 !== r.indexOf('images/') && (r = r.split('/')[1]), (t = this.assetsPath + r)
          } else (t = this.path), (t += e.u ? e.u : ''), (t += e.p)
          return t
        }),
        (AnimationItem.prototype.getAssetData = function (e) {
          for (var t = 0, r = this.assets.length; t < r; ) {
            if (e === this.assets[t].id) return this.assets[t]
            t += 1
          }
          return null
        }),
        (AnimationItem.prototype.hide = function () {
          this.renderer.hide()
        }),
        (AnimationItem.prototype.show = function () {
          this.renderer.show()
        }),
        (AnimationItem.prototype.getDuration = function (e) {
          return e ? this.totalFrames : this.totalFrames / this.frameRate
        }),
        (AnimationItem.prototype.trigger = function (e) {
          if (this._cbs && this._cbs[e])
            switch (e) {
              case 'enterFrame':
              case 'drawnFrame':
                this.triggerEvent(e, new BMEnterFrameEvent(e, this.currentFrame, this.totalFrames, this.frameModifier))
                break
              case 'loopComplete':
                this.triggerEvent(e, new BMCompleteLoopEvent(e, this.loop, this.playCount, this.frameMult))
                break
              case 'complete':
                this.triggerEvent(e, new BMCompleteEvent(e, this.frameMult))
                break
              case 'segmentStart':
                this.triggerEvent(e, new BMSegmentStartEvent(e, this.firstFrame, this.totalFrames))
                break
              case 'destroy':
                this.triggerEvent(e, new BMDestroyEvent(e, this))
                break
              default:
                this.triggerEvent(e)
            }
          'enterFrame' === e &&
            this.onEnterFrame &&
            this.onEnterFrame.call(this, new BMEnterFrameEvent(e, this.currentFrame, this.totalFrames, this.frameMult)),
            'loopComplete' === e &&
              this.onLoopComplete &&
              this.onLoopComplete.call(this, new BMCompleteLoopEvent(e, this.loop, this.playCount, this.frameMult)),
            'complete' === e && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(e, this.frameMult)),
            'segmentStart' === e &&
              this.onSegmentStart &&
              this.onSegmentStart.call(this, new BMSegmentStartEvent(e, this.firstFrame, this.totalFrames)),
            'destroy' === e && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(e, this))
        }),
        (AnimationItem.prototype.triggerRenderFrameError = function (e) {
          var t = new BMRenderFrameErrorEvent(e, this.currentFrame)
          this.triggerEvent('error', t), this.onError && this.onError.call(this, t)
        }),
        (AnimationItem.prototype.triggerConfigError = function (e) {
          var t = new BMConfigErrorEvent(e, this.currentFrame)
          this.triggerEvent('error', t), this.onError && this.onError.call(this, t)
        })
      var animationManager = (function () {
          var e = {},
            t = [],
            r = 0,
            n = 0,
            i = 0,
            s = !0,
            a = !1
          function o(e) {
            for (var r = 0, i = e.target; r < n; )
              t[r].animation === i && (t.splice(r, 1), (r -= 1), (n -= 1), i.isPaused || c()), (r += 1)
          }
          function l(e, r) {
            if (!e) return null
            for (var i = 0; i < n; ) {
              if (t[i].elem === e && null !== t[i].elem) return t[i].animation
              i += 1
            }
            var s = new AnimationItem()
            return p(s, e), s.setData(e, r), s
          }
          function h() {
            ;(i += 1), d()
          }
          function c() {
            i -= 1
          }
          function p(e, r) {
            e.addEventListener('destroy', o),
              e.addEventListener('_active', h),
              e.addEventListener('_idle', c),
              t.push({ elem: r, animation: e }),
              (n += 1)
          }
          function u(e) {
            var o,
              l = e - r
            for (o = 0; o < n; o += 1) t[o].animation.advanceTime(l)
            ;(r = e), i && !a ? window.requestAnimationFrame(u) : (s = !0)
          }
          function f(e) {
            ;(r = e), window.requestAnimationFrame(u)
          }
          function d() {
            !a && i && s && (window.requestAnimationFrame(f), (s = !1))
          }
          return (
            (e.registerAnimation = l),
            (e.loadAnimation = function (e) {
              var t = new AnimationItem()
              return p(t, null), t.setParams(e), t
            }),
            (e.setSpeed = function (e, r) {
              var i
              for (i = 0; i < n; i += 1) t[i].animation.setSpeed(e, r)
            }),
            (e.setDirection = function (e, r) {
              var i
              for (i = 0; i < n; i += 1) t[i].animation.setDirection(e, r)
            }),
            (e.play = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.play(e)
            }),
            (e.pause = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.pause(e)
            }),
            (e.stop = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.stop(e)
            }),
            (e.togglePause = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.togglePause(e)
            }),
            (e.searchAnimations = function (e, t, r) {
              var n,
                i = [].concat(
                  [].slice.call(document.getElementsByClassName('lottie')),
                  [].slice.call(document.getElementsByClassName('bodymovin'))
                ),
                s = i.length
              for (n = 0; n < s; n += 1) r && i[n].setAttribute('data-bm-type', r), l(i[n], e)
              if (t && 0 === s) {
                r || (r = 'svg')
                var a = document.getElementsByTagName('body')[0]
                a.innerText = ''
                var o = createTag('div')
                ;(o.style.width = '100%'),
                  (o.style.height = '100%'),
                  o.setAttribute('data-bm-type', r),
                  a.appendChild(o),
                  l(o, e)
              }
            }),
            (e.resize = function () {
              var e
              for (e = 0; e < n; e += 1) t[e].animation.resize()
            }),
            (e.goToAndStop = function (e, r, i) {
              var s
              for (s = 0; s < n; s += 1) t[s].animation.goToAndStop(e, r, i)
            }),
            (e.destroy = function (e) {
              var r
              for (r = n - 1; r >= 0; r -= 1) t[r].animation.destroy(e)
            }),
            (e.freeze = function () {
              a = !0
            }),
            (e.unfreeze = function () {
              ;(a = !1), d()
            }),
            (e.setVolume = function (e, r) {
              var i
              for (i = 0; i < n; i += 1) t[i].animation.setVolume(e, r)
            }),
            (e.mute = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.mute(e)
            }),
            (e.unmute = function (e) {
              var r
              for (r = 0; r < n; r += 1) t[r].animation.unmute(e)
            }),
            (e.getRegisteredAnimations = function () {
              var e,
                r = t.length,
                n = []
              for (e = 0; e < r; e += 1) n.push(t[e].animation)
              return n
            }),
            e
          )
        })(),
        BezierFactory = (function () {
          var e = {
              getBezierEasing: function (e, r, n, i, s) {
                var a = s || ('bez_' + e + '_' + r + '_' + n + '_' + i).replace(/\./g, 'p')
                if (t[a]) return t[a]
                var o = new h([e, r, n, i])
                return (t[a] = o), o
              },
            },
            t = {},
            r = 0.1,
            n = 'function' == typeof Float32Array
          function i(e, t) {
            return 1 - 3 * t + 3 * e
          }
          function s(e, t) {
            return 3 * t - 6 * e
          }
          function a(e) {
            return 3 * e
          }
          function o(e, t, r) {
            return ((i(t, r) * e + s(t, r)) * e + a(t)) * e
          }
          function l(e, t, r) {
            return 3 * i(t, r) * e * e + 2 * s(t, r) * e + a(t)
          }
          function h(e) {
            ;(this._p = e),
              (this._mSampleValues = n ? new Float32Array(11) : new Array(11)),
              (this._precomputed = !1),
              (this.get = this.get.bind(this))
          }
          return (
            (h.prototype = {
              get: function (e) {
                var t = this._p[0],
                  r = this._p[1],
                  n = this._p[2],
                  i = this._p[3]
                return (
                  this._precomputed || this._precompute(),
                  t === r && n === i ? e : 0 === e ? 0 : 1 === e ? 1 : o(this._getTForX(e), r, i)
                )
              },
              _precompute: function () {
                var e = this._p[0],
                  t = this._p[1],
                  r = this._p[2],
                  n = this._p[3]
                ;(this._precomputed = !0), (e === t && r === n) || this._calcSampleValues()
              },
              _calcSampleValues: function () {
                for (var e = this._p[0], t = this._p[2], n = 0; n < 11; ++n) this._mSampleValues[n] = o(n * r, e, t)
              },
              _getTForX: function (e) {
                for (
                  var t = this._p[0], n = this._p[2], i = this._mSampleValues, s = 0, a = 1;
                  10 !== a && i[a] <= e;
                  ++a
                )
                  s += r
                var h = s + ((e - i[--a]) / (i[a + 1] - i[a])) * r,
                  c = l(h, t, n)
                return c >= 0.001
                  ? (function (e, t, r, n) {
                      for (var i = 0; i < 4; ++i) {
                        var s = l(t, r, n)
                        if (0 === s) return t
                        t -= (o(t, r, n) - e) / s
                      }
                      return t
                    })(e, h, t, n)
                  : 0 === c
                  ? h
                  : (function (e, t, r, n, i) {
                      var s,
                        a,
                        l = 0
                      do {
                        ;(s = o((a = t + (r - t) / 2), n, i) - e) > 0 ? (r = a) : (t = a)
                      } while (Math.abs(s) > 1e-7 && ++l < 10)
                      return a
                    })(e, s, s + r, t, n)
              },
            }),
            e
          )
        })(),
        pooling = {
          double: function (e) {
            return e.concat(createSizedArray(e.length))
          },
        },
        poolFactory = function (e, t, r) {
          var n = 0,
            i = e,
            s = createSizedArray(i)
          return {
            newElement: function () {
              return n ? s[(n -= 1)] : t()
            },
            release: function (e) {
              n === i && ((s = pooling.double(s)), (i *= 2)), r && r(e), (s[n] = e), (n += 1)
            },
          }
        },
        bezierLengthPool = poolFactory(8, function () {
          return {
            addedLength: 0,
            percents: createTypedArray('float32', getDefaultCurveSegments()),
            lengths: createTypedArray('float32', getDefaultCurveSegments()),
          }
        }),
        segmentsLengthPool = poolFactory(
          8,
          function () {
            return { lengths: [], totalLength: 0 }
          },
          function (e) {
            var t,
              r = e.lengths.length
            for (t = 0; t < r; t += 1) bezierLengthPool.release(e.lengths[t])
            e.lengths.length = 0
          }
        )
      function bezFunction() {
        var e = Math
        function t(e, t, r, n, i, s) {
          var a = e * n + t * i + r * s - i * n - s * e - r * t
          return a > -0.001 && a < 0.001
        }
        var r = function (e, t, r, n) {
          var i,
            s,
            a,
            o,
            l,
            h,
            c = getDefaultCurveSegments(),
            p = 0,
            u = [],
            f = [],
            d = bezierLengthPool.newElement()
          for (a = r.length, i = 0; i < c; i += 1) {
            for (l = i / (c - 1), h = 0, s = 0; s < a; s += 1)
              (o =
                bmPow(1 - l, 3) * e[s] +
                3 * bmPow(1 - l, 2) * l * r[s] +
                3 * (1 - l) * bmPow(l, 2) * n[s] +
                bmPow(l, 3) * t[s]),
                (u[s] = o),
                null !== f[s] && (h += bmPow(u[s] - f[s], 2)),
                (f[s] = u[s])
            h && (p += h = bmSqrt(h)), (d.percents[i] = l), (d.lengths[i] = p)
          }
          return (d.addedLength = p), d
        }
        function n(e) {
          ;(this.segmentLength = 0), (this.points = new Array(e))
        }
        function i(e, t) {
          ;(this.partialLength = e), (this.point = t)
        }
        var s,
          a =
            ((s = {}),
            function (e, r, a, o) {
              var l = (
                e[0] +
                '_' +
                e[1] +
                '_' +
                r[0] +
                '_' +
                r[1] +
                '_' +
                a[0] +
                '_' +
                a[1] +
                '_' +
                o[0] +
                '_' +
                o[1]
              ).replace(/\./g, 'p')
              if (!s[l]) {
                var h,
                  c,
                  p,
                  u,
                  f,
                  d,
                  m,
                  g = getDefaultCurveSegments(),
                  y = 0,
                  v = null
                2 === e.length &&
                  (e[0] !== r[0] || e[1] !== r[1]) &&
                  t(e[0], e[1], r[0], r[1], e[0] + a[0], e[1] + a[1]) &&
                  t(e[0], e[1], r[0], r[1], r[0] + o[0], r[1] + o[1]) &&
                  (g = 2)
                var b = new n(g)
                for (p = a.length, h = 0; h < g; h += 1) {
                  for (m = createSizedArray(p), f = h / (g - 1), d = 0, c = 0; c < p; c += 1)
                    (u =
                      bmPow(1 - f, 3) * e[c] +
                      3 * bmPow(1 - f, 2) * f * (e[c] + a[c]) +
                      3 * (1 - f) * bmPow(f, 2) * (r[c] + o[c]) +
                      bmPow(f, 3) * r[c]),
                      (m[c] = u),
                      null !== v && (d += bmPow(m[c] - v[c], 2))
                  ;(y += d = bmSqrt(d)), (b.points[h] = new i(d, m)), (v = m)
                }
                ;(b.segmentLength = y), (s[l] = b)
              }
              return s[l]
            })
        function o(e, t) {
          var r = t.percents,
            n = t.lengths,
            i = r.length,
            s = bmFloor((i - 1) * e),
            a = e * t.addedLength,
            o = 0
          if (s === i - 1 || 0 === s || a === n[s]) return r[s]
          for (var l = n[s] > a ? -1 : 1, h = !0; h; )
            if (
              (n[s] <= a && n[s + 1] > a ? ((o = (a - n[s]) / (n[s + 1] - n[s])), (h = !1)) : (s += l),
              s < 0 || s >= i - 1)
            ) {
              if (s === i - 1) return r[s]
              h = !1
            }
          return r[s] + (r[s + 1] - r[s]) * o
        }
        var l = createTypedArray('float32', 8)
        return {
          getSegmentsLength: function (e) {
            var t,
              n = segmentsLengthPool.newElement(),
              i = e.c,
              s = e.v,
              a = e.o,
              o = e.i,
              l = e._length,
              h = n.lengths,
              c = 0
            for (t = 0; t < l - 1; t += 1) (h[t] = r(s[t], s[t + 1], a[t], o[t + 1])), (c += h[t].addedLength)
            return i && l && ((h[t] = r(s[t], s[0], a[t], o[0])), (c += h[t].addedLength)), (n.totalLength = c), n
          },
          getNewSegment: function (t, r, n, i, s, a, h) {
            s < 0 ? (s = 0) : s > 1 && (s = 1)
            var c,
              p = o(s, h),
              u = o((a = a > 1 ? 1 : a), h),
              f = t.length,
              d = 1 - p,
              m = 1 - u,
              g = d * d * d,
              y = p * d * d * 3,
              v = p * p * d * 3,
              b = p * p * p,
              E = d * d * m,
              S = p * d * m + d * p * m + d * d * u,
              P = p * p * m + d * p * u + p * d * u,
              _ = p * p * u,
              x = d * m * m,
              C = p * m * m + d * u * m + d * m * u,
              A = p * u * m + d * u * u + p * m * u,
              T = p * u * u,
              k = m * m * m,
              w = u * m * m + m * u * m + m * m * u,
              M = u * u * m + m * u * u + u * m * u,
              I = u * u * u
            for (c = 0; c < f; c += 1)
              (l[4 * c] = e.round(1e3 * (g * t[c] + y * n[c] + v * i[c] + b * r[c])) / 1e3),
                (l[4 * c + 1] = e.round(1e3 * (E * t[c] + S * n[c] + P * i[c] + _ * r[c])) / 1e3),
                (l[4 * c + 2] = e.round(1e3 * (x * t[c] + C * n[c] + A * i[c] + T * r[c])) / 1e3),
                (l[4 * c + 3] = e.round(1e3 * (k * t[c] + w * n[c] + M * i[c] + I * r[c])) / 1e3)
            return l
          },
          getPointInSegment: function (t, r, n, i, s, a) {
            var l = o(s, a),
              h = 1 - l
            return [
              e.round(
                1e3 *
                  (h * h * h * t[0] +
                    (l * h * h + h * l * h + h * h * l) * n[0] +
                    (l * l * h + h * l * l + l * h * l) * i[0] +
                    l * l * l * r[0])
              ) / 1e3,
              e.round(
                1e3 *
                  (h * h * h * t[1] +
                    (l * h * h + h * l * h + h * h * l) * n[1] +
                    (l * l * h + h * l * l + l * h * l) * i[1] +
                    l * l * l * r[1])
              ) / 1e3,
            ]
          },
          buildBezierData: a,
          pointOnLine2D: t,
          pointOnLine3D: function (r, n, i, s, a, o, l, h, c) {
            if (0 === i && 0 === o && 0 === c) return t(r, n, s, a, l, h)
            var p,
              u = e.sqrt(e.pow(s - r, 2) + e.pow(a - n, 2) + e.pow(o - i, 2)),
              f = e.sqrt(e.pow(l - r, 2) + e.pow(h - n, 2) + e.pow(c - i, 2)),
              d = e.sqrt(e.pow(l - s, 2) + e.pow(h - a, 2) + e.pow(c - o, 2))
            return (p = u > f ? (u > d ? u - f - d : d - f - u) : d > f ? d - f - u : f - u - d) > -1e-4 && p < 1e-4
          },
        }
      }
      var bez = bezFunction(),
        PropertyFactory = (function () {
          var e = initialDefaultFrame,
            t = Math.abs
          function r(e, t) {
            var r,
              i = this.offsetTime
            'multidimensional' === this.propType && (r = createTypedArray('float32', this.pv.length))
            for (var s, a, o, l, h, c, p, u, f, d = t.lastIndex, m = d, g = this.keyframes.length - 1, y = !0; y; ) {
              if (((s = this.keyframes[m]), (a = this.keyframes[m + 1]), m === g - 1 && e >= a.t - i)) {
                s.h && (s = a), (d = 0)
                break
              }
              if (a.t - i > e) {
                d = m
                break
              }
              m < g - 1 ? (m += 1) : ((d = 0), (y = !1))
            }
            o = this.keyframesMetadata[m] || {}
            var v,
              b,
              E,
              S,
              P,
              _,
              x,
              C,
              A,
              T,
              k = a.t - i,
              w = s.t - i
            if (s.to) {
              o.bezierData || (o.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti))
              var M = o.bezierData
              if (e >= k || e < w) {
                var I = e >= k ? M.points.length - 1 : 0
                for (h = M.points[I].point.length, l = 0; l < h; l += 1) r[l] = M.points[I].point[l]
              } else {
                o.__fnct
                  ? (f = o.__fnct)
                  : ((f = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get), (o.__fnct = f)),
                  (c = f((e - w) / (k - w)))
                var F,
                  R = M.segmentLength * c,
                  D = t.lastFrame < e && t._lastKeyframeIndex === m ? t._lastAddedLength : 0
                for (
                  u = t.lastFrame < e && t._lastKeyframeIndex === m ? t._lastPoint : 0, y = !0, p = M.points.length;
                  y;

                ) {
                  if (((D += M.points[u].partialLength), 0 === R || 0 === c || u === M.points.length - 1)) {
                    for (h = M.points[u].point.length, l = 0; l < h; l += 1) r[l] = M.points[u].point[l]
                    break
                  }
                  if (R >= D && R < D + M.points[u + 1].partialLength) {
                    for (
                      F = (R - D) / M.points[u + 1].partialLength, h = M.points[u].point.length, l = 0;
                      l < h;
                      l += 1
                    )
                      r[l] = M.points[u].point[l] + (M.points[u + 1].point[l] - M.points[u].point[l]) * F
                    break
                  }
                  u < p - 1 ? (u += 1) : (y = !1)
                }
                ;(t._lastPoint = u), (t._lastAddedLength = D - M.points[u].partialLength), (t._lastKeyframeIndex = m)
              }
            } else {
              var O, V, B, L, N
              if (((g = s.s.length), (v = a.s || s.e), this.sh && 1 !== s.h))
                if (e >= k) (r[0] = v[0]), (r[1] = v[1]), (r[2] = v[2])
                else if (e <= w) (r[0] = s.s[0]), (r[1] = s.s[1]), (r[2] = s.s[2])
                else {
                  var $ = n(s.s),
                    z = n(v)
                  ;(b = r),
                    (E = (function (e, t, r) {
                      var n,
                        i,
                        s,
                        a,
                        o,
                        l = [],
                        h = e[0],
                        c = e[1],
                        p = e[2],
                        u = e[3],
                        f = t[0],
                        d = t[1],
                        m = t[2],
                        g = t[3]
                      return (
                        (i = h * f + c * d + p * m + u * g) < 0 && ((i = -i), (f = -f), (d = -d), (m = -m), (g = -g)),
                        1 - i > 1e-6
                          ? ((n = Math.acos(i)),
                            (s = Math.sin(n)),
                            (a = Math.sin((1 - r) * n) / s),
                            (o = Math.sin(r * n) / s))
                          : ((a = 1 - r), (o = r)),
                        (l[0] = a * h + o * f),
                        (l[1] = a * c + o * d),
                        (l[2] = a * p + o * m),
                        (l[3] = a * u + o * g),
                        l
                      )
                    })($, z, (e - w) / (k - w))),
                    (S = E[0]),
                    (P = E[1]),
                    (_ = E[2]),
                    (x = E[3]),
                    (C = Math.atan2(2 * P * x - 2 * S * _, 1 - 2 * P * P - 2 * _ * _)),
                    (A = Math.asin(2 * S * P + 2 * _ * x)),
                    (T = Math.atan2(2 * S * x - 2 * P * _, 1 - 2 * S * S - 2 * _ * _)),
                    (b[0] = C / degToRads),
                    (b[1] = A / degToRads),
                    (b[2] = T / degToRads)
                }
              else
                for (m = 0; m < g; m += 1)
                  1 !== s.h &&
                    (e >= k
                      ? (c = 1)
                      : e < w
                      ? (c = 0)
                      : (s.o.x.constructor === Array
                          ? (o.__fnct || (o.__fnct = []),
                            o.__fnct[m]
                              ? (f = o.__fnct[m])
                              : ((O = void 0 === s.o.x[m] ? s.o.x[0] : s.o.x[m]),
                                (V = void 0 === s.o.y[m] ? s.o.y[0] : s.o.y[m]),
                                (B = void 0 === s.i.x[m] ? s.i.x[0] : s.i.x[m]),
                                (L = void 0 === s.i.y[m] ? s.i.y[0] : s.i.y[m]),
                                (f = BezierFactory.getBezierEasing(O, V, B, L).get),
                                (o.__fnct[m] = f)))
                          : o.__fnct
                          ? (f = o.__fnct)
                          : ((O = s.o.x),
                            (V = s.o.y),
                            (B = s.i.x),
                            (L = s.i.y),
                            (f = BezierFactory.getBezierEasing(O, V, B, L).get),
                            (s.keyframeMetadata = f)),
                        (c = f((e - w) / (k - w))))),
                    (v = a.s || s.e),
                    (N = 1 === s.h ? s.s[m] : s.s[m] + (v[m] - s.s[m]) * c),
                    'multidimensional' === this.propType ? (r[m] = N) : (r = N)
            }
            return (t.lastIndex = d), r
          }
          function n(e) {
            var t = e[0] * degToRads,
              r = e[1] * degToRads,
              n = e[2] * degToRads,
              i = Math.cos(t / 2),
              s = Math.cos(r / 2),
              a = Math.cos(n / 2),
              o = Math.sin(t / 2),
              l = Math.sin(r / 2),
              h = Math.sin(n / 2)
            return [o * l * a + i * s * h, o * s * a + i * l * h, i * l * a - o * s * h, i * s * a - o * l * h]
          }
          function i() {
            var t = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              n = this.keyframes[this.keyframes.length - 1].t - this.offsetTime
            if (
              !(
                t === this._caching.lastFrame ||
                (this._caching.lastFrame !== e &&
                  ((this._caching.lastFrame >= n && t >= n) || (this._caching.lastFrame < r && t < r)))
              )
            ) {
              this._caching.lastFrame >= t && ((this._caching._lastKeyframeIndex = -1), (this._caching.lastIndex = 0))
              var i = this.interpolateValue(t, this._caching)
              this.pv = i
            }
            return (this._caching.lastFrame = t), this.pv
          }
          function s(e) {
            var r
            if ('unidimensional' === this.propType)
              (r = e * this.mult), t(this.v - r) > 1e-5 && ((this.v = r), (this._mdf = !0))
            else
              for (var n = 0, i = this.v.length; n < i; )
                (r = e[n] * this.mult), t(this.v[n] - r) > 1e-5 && ((this.v[n] = r), (this._mdf = !0)), (n += 1)
          }
          function a() {
            if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
              if (this.lock) this.setVValue(this.pv)
              else {
                var e
                ;(this.lock = !0), (this._mdf = this._isFirstFrame)
                var t = this.effectsSequence.length,
                  r = this.kf ? this.pv : this.data.k
                for (e = 0; e < t; e += 1) r = this.effectsSequence[e](r)
                this.setVValue(r),
                  (this._isFirstFrame = !1),
                  (this.lock = !1),
                  (this.frameId = this.elem.globalData.frameId)
              }
          }
          function o(e) {
            this.effectsSequence.push(e), this.container.addDynamicProperty(this)
          }
          function l(e, t, r, n) {
            ;(this.propType = 'unidimensional'),
              (this.mult = r || 1),
              (this.data = t),
              (this.v = r ? t.k * r : t.k),
              (this.pv = t.k),
              (this._mdf = !1),
              (this.elem = e),
              (this.container = n),
              (this.comp = e.comp),
              (this.k = !1),
              (this.kf = !1),
              (this.vel = 0),
              (this.effectsSequence = []),
              (this._isFirstFrame = !0),
              (this.getValue = a),
              (this.setVValue = s),
              (this.addEffect = o)
          }
          function h(e, t, r, n) {
            var i
            ;(this.propType = 'multidimensional'),
              (this.mult = r || 1),
              (this.data = t),
              (this._mdf = !1),
              (this.elem = e),
              (this.container = n),
              (this.comp = e.comp),
              (this.k = !1),
              (this.kf = !1),
              (this.frameId = -1)
            var l = t.k.length
            for (
              this.v = createTypedArray('float32', l),
                this.pv = createTypedArray('float32', l),
                this.vel = createTypedArray('float32', l),
                i = 0;
              i < l;
              i += 1
            )
              (this.v[i] = t.k[i] * this.mult), (this.pv[i] = t.k[i])
            ;(this._isFirstFrame = !0),
              (this.effectsSequence = []),
              (this.getValue = a),
              (this.setVValue = s),
              (this.addEffect = o)
          }
          function c(t, n, l, h) {
            ;(this.propType = 'unidimensional'),
              (this.keyframes = n.k),
              (this.keyframesMetadata = []),
              (this.offsetTime = t.data.st),
              (this.frameId = -1),
              (this._caching = { lastFrame: e, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }),
              (this.k = !0),
              (this.kf = !0),
              (this.data = n),
              (this.mult = l || 1),
              (this.elem = t),
              (this.container = h),
              (this.comp = t.comp),
              (this.v = e),
              (this.pv = e),
              (this._isFirstFrame = !0),
              (this.getValue = a),
              (this.setVValue = s),
              (this.interpolateValue = r),
              (this.effectsSequence = [i.bind(this)]),
              (this.addEffect = o)
          }
          function p(t, n, l, h) {
            var c
            this.propType = 'multidimensional'
            var p,
              u,
              f,
              d,
              m = n.k.length
            for (c = 0; c < m - 1; c += 1)
              n.k[c].to &&
                n.k[c].s &&
                n.k[c + 1] &&
                n.k[c + 1].s &&
                ((p = n.k[c].s),
                (u = n.k[c + 1].s),
                (f = n.k[c].to),
                (d = n.k[c].ti),
                ((2 === p.length &&
                  (p[0] !== u[0] || p[1] !== u[1]) &&
                  bez.pointOnLine2D(p[0], p[1], u[0], u[1], p[0] + f[0], p[1] + f[1]) &&
                  bez.pointOnLine2D(p[0], p[1], u[0], u[1], u[0] + d[0], u[1] + d[1])) ||
                  (3 === p.length &&
                    (p[0] !== u[0] || p[1] !== u[1] || p[2] !== u[2]) &&
                    bez.pointOnLine3D(p[0], p[1], p[2], u[0], u[1], u[2], p[0] + f[0], p[1] + f[1], p[2] + f[2]) &&
                    bez.pointOnLine3D(p[0], p[1], p[2], u[0], u[1], u[2], u[0] + d[0], u[1] + d[1], u[2] + d[2]))) &&
                  ((n.k[c].to = null), (n.k[c].ti = null)),
                p[0] === u[0] &&
                  p[1] === u[1] &&
                  0 === f[0] &&
                  0 === f[1] &&
                  0 === d[0] &&
                  0 === d[1] &&
                  (2 === p.length || (p[2] === u[2] && 0 === f[2] && 0 === d[2])) &&
                  ((n.k[c].to = null), (n.k[c].ti = null)))
            ;(this.effectsSequence = [i.bind(this)]),
              (this.data = n),
              (this.keyframes = n.k),
              (this.keyframesMetadata = []),
              (this.offsetTime = t.data.st),
              (this.k = !0),
              (this.kf = !0),
              (this._isFirstFrame = !0),
              (this.mult = l || 1),
              (this.elem = t),
              (this.container = h),
              (this.comp = t.comp),
              (this.getValue = a),
              (this.setVValue = s),
              (this.interpolateValue = r),
              (this.frameId = -1)
            var g = n.k[0].s.length
            for (
              this.v = createTypedArray('float32', g), this.pv = createTypedArray('float32', g), c = 0;
              c < g;
              c += 1
            )
              (this.v[c] = e), (this.pv[c] = e)
            ;(this._caching = { lastFrame: e, lastIndex: 0, value: createTypedArray('float32', g) }),
              (this.addEffect = o)
          }
          return {
            getProp: function (e, t, r, n, i) {
              var s
              if (t.k.length)
                if ('number' == typeof t.k[0]) s = new h(e, t, n, i)
                else
                  switch (r) {
                    case 0:
                      s = new c(e, t, n, i)
                      break
                    case 1:
                      s = new p(e, t, n, i)
                  }
              else s = new l(e, t, n, i)
              return s.effectsSequence.length && i.addDynamicProperty(s), s
            },
          }
        })()
      function DynamicPropertyContainer() {}
      DynamicPropertyContainer.prototype = {
        addDynamicProperty: function (e) {
          ;-1 === this.dynamicProperties.indexOf(e) &&
            (this.dynamicProperties.push(e), this.container.addDynamicProperty(this), (this._isAnimated = !0))
        },
        iterateDynamicProperties: function () {
          var e
          this._mdf = !1
          var t = this.dynamicProperties.length
          for (e = 0; e < t; e += 1)
            this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0)
        },
        initDynamicPropertyContainer: function (e) {
          ;(this.container = e), (this.dynamicProperties = []), (this._mdf = !1), (this._isAnimated = !1)
        },
      }
      var pointPool = poolFactory(8, function () {
        return createTypedArray('float32', 2)
      })
      function ShapePath() {
        ;(this.c = !1),
          (this._length = 0),
          (this._maxLength = 8),
          (this.v = createSizedArray(this._maxLength)),
          (this.o = createSizedArray(this._maxLength)),
          (this.i = createSizedArray(this._maxLength))
      }
      ;(ShapePath.prototype.setPathData = function (e, t) {
        ;(this.c = e), this.setLength(t)
        for (var r = 0; r < t; )
          (this.v[r] = pointPool.newElement()),
            (this.o[r] = pointPool.newElement()),
            (this.i[r] = pointPool.newElement()),
            (r += 1)
      }),
        (ShapePath.prototype.setLength = function (e) {
          for (; this._maxLength < e; ) this.doubleArrayLength()
          this._length = e
        }),
        (ShapePath.prototype.doubleArrayLength = function () {
          ;(this.v = this.v.concat(createSizedArray(this._maxLength))),
            (this.i = this.i.concat(createSizedArray(this._maxLength))),
            (this.o = this.o.concat(createSizedArray(this._maxLength))),
            (this._maxLength *= 2)
        }),
        (ShapePath.prototype.setXYAt = function (e, t, r, n, i) {
          var s
          switch (
            ((this._length = Math.max(this._length, n + 1)),
            this._length >= this._maxLength && this.doubleArrayLength(),
            r)
          ) {
            case 'v':
              s = this.v
              break
            case 'i':
              s = this.i
              break
            case 'o':
              s = this.o
              break
            default:
              s = []
          }
          ;(!s[n] || (s[n] && !i)) && (s[n] = pointPool.newElement()), (s[n][0] = e), (s[n][1] = t)
        }),
        (ShapePath.prototype.setTripleAt = function (e, t, r, n, i, s, a, o) {
          this.setXYAt(e, t, 'v', a, o), this.setXYAt(r, n, 'o', a, o), this.setXYAt(i, s, 'i', a, o)
        }),
        (ShapePath.prototype.reverse = function () {
          var e = new ShapePath()
          e.setPathData(this.c, this._length)
          var t = this.v,
            r = this.o,
            n = this.i,
            i = 0
          this.c && (e.setTripleAt(t[0][0], t[0][1], n[0][0], n[0][1], r[0][0], r[0][1], 0, !1), (i = 1))
          var s,
            a = this._length - 1,
            o = this._length
          for (s = i; s < o; s += 1)
            e.setTripleAt(t[a][0], t[a][1], n[a][0], n[a][1], r[a][0], r[a][1], s, !1), (a -= 1)
          return e
        })
      var shapePool =
          ((factory = poolFactory(
            4,
            function () {
              return new ShapePath()
            },
            function (e) {
              var t,
                r = e._length
              for (t = 0; t < r; t += 1)
                pointPool.release(e.v[t]),
                  pointPool.release(e.i[t]),
                  pointPool.release(e.o[t]),
                  (e.v[t] = null),
                  (e.i[t] = null),
                  (e.o[t] = null)
              ;(e._length = 0), (e.c = !1)
            }
          )),
          (factory.clone = function (e) {
            var t,
              r = factory.newElement(),
              n = void 0 === e._length ? e.v.length : e._length
            for (r.setLength(n), r.c = e.c, t = 0; t < n; t += 1)
              r.setTripleAt(e.v[t][0], e.v[t][1], e.o[t][0], e.o[t][1], e.i[t][0], e.i[t][1], t)
            return r
          }),
          factory),
        factory
      function ShapeCollection() {
        ;(this._length = 0), (this._maxLength = 4), (this.shapes = createSizedArray(this._maxLength))
      }
      ;(ShapeCollection.prototype.addShape = function (e) {
        this._length === this._maxLength &&
          ((this.shapes = this.shapes.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2)),
          (this.shapes[this._length] = e),
          (this._length += 1)
      }),
        (ShapeCollection.prototype.releaseShapes = function () {
          var e
          for (e = 0; e < this._length; e += 1) shapePool.release(this.shapes[e])
          this._length = 0
        })
      var shapeCollectionPool =
          ((ob2 = {
            newShapeCollection: function () {
              return _length ? pool[(_length -= 1)] : new ShapeCollection()
            },
            release: function (e) {
              var t,
                r = e._length
              for (t = 0; t < r; t += 1) shapePool.release(e.shapes[t])
              ;(e._length = 0),
                _length === _maxLength && ((pool = pooling.double(pool)), (_maxLength *= 2)),
                (pool[_length] = e),
                (_length += 1)
            },
          }),
          (_length = 0),
          (_maxLength = 4),
          (pool = createSizedArray(_maxLength)),
          ob2),
        ob2,
        _length,
        _maxLength,
        pool,
        ShapePropertyFactory = (function () {
          var e = -999999
          function t(e, t, r) {
            var n,
              i,
              s,
              a,
              o,
              l,
              h,
              c,
              p,
              u = r.lastIndex,
              f = this.keyframes
            if (e < f[0].t - this.offsetTime) (n = f[0].s[0]), (s = !0), (u = 0)
            else if (e >= f[f.length - 1].t - this.offsetTime)
              (n = f[f.length - 1].s ? f[f.length - 1].s[0] : f[f.length - 2].e[0]), (s = !0)
            else {
              for (
                var d, m, g, y = u, v = f.length - 1, b = !0;
                b && ((d = f[y]), !((m = f[y + 1]).t - this.offsetTime > e));

              )
                y < v - 1 ? (y += 1) : (b = !1)
              if (((g = this.keyframesMetadata[y] || {}), (u = y), !(s = 1 === d.h))) {
                if (e >= m.t - this.offsetTime) c = 1
                else if (e < d.t - this.offsetTime) c = 0
                else {
                  var E
                  g.__fnct
                    ? (E = g.__fnct)
                    : ((E = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get), (g.__fnct = E)),
                    (c = E((e - (d.t - this.offsetTime)) / (m.t - this.offsetTime - (d.t - this.offsetTime))))
                }
                i = m.s ? m.s[0] : d.e[0]
              }
              n = d.s[0]
            }
            for (l = t._length, h = n.i[0].length, r.lastIndex = u, a = 0; a < l; a += 1)
              for (o = 0; o < h; o += 1)
                (p = s ? n.i[a][o] : n.i[a][o] + (i.i[a][o] - n.i[a][o]) * c),
                  (t.i[a][o] = p),
                  (p = s ? n.o[a][o] : n.o[a][o] + (i.o[a][o] - n.o[a][o]) * c),
                  (t.o[a][o] = p),
                  (p = s ? n.v[a][o] : n.v[a][o] + (i.v[a][o] - n.v[a][o]) * c),
                  (t.v[a][o] = p)
          }
          function r() {
            var t = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              n = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
              i = this._caching.lastFrame
            return (
              (i !== e && ((i < r && t < r) || (i > n && t > n))) ||
                ((this._caching.lastIndex = i < t ? this._caching.lastIndex : 0),
                this.interpolateShape(t, this.pv, this._caching)),
              (this._caching.lastFrame = t),
              this.pv
            )
          }
          function n() {
            this.paths = this.localShapeCollection
          }
          function i(e) {
            ;(function (e, t) {
              if (e._length !== t._length || e.c !== t.c) return !1
              var r,
                n = e._length
              for (r = 0; r < n; r += 1)
                if (
                  e.v[r][0] !== t.v[r][0] ||
                  e.v[r][1] !== t.v[r][1] ||
                  e.o[r][0] !== t.o[r][0] ||
                  e.o[r][1] !== t.o[r][1] ||
                  e.i[r][0] !== t.i[r][0] ||
                  e.i[r][1] !== t.i[r][1]
                )
                  return !1
              return !0
            })(this.v, e) ||
              ((this.v = shapePool.clone(e)),
              this.localShapeCollection.releaseShapes(),
              this.localShapeCollection.addShape(this.v),
              (this._mdf = !0),
              (this.paths = this.localShapeCollection))
          }
          function s() {
            if (this.elem.globalData.frameId !== this.frameId)
              if (this.effectsSequence.length)
                if (this.lock) this.setVValue(this.pv)
                else {
                  var e, t
                  ;(this.lock = !0),
                    (this._mdf = !1),
                    (e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k)
                  var r = this.effectsSequence.length
                  for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e)
                  this.setVValue(e), (this.lock = !1), (this.frameId = this.elem.globalData.frameId)
                }
              else this._mdf = !1
          }
          function a(e, t, r) {
            ;(this.propType = 'shape'),
              (this.comp = e.comp),
              (this.container = e),
              (this.elem = e),
              (this.data = t),
              (this.k = !1),
              (this.kf = !1),
              (this._mdf = !1)
            var i = 3 === r ? t.pt.k : t.ks.k
            ;(this.v = shapePool.clone(i)),
              (this.pv = shapePool.clone(this.v)),
              (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
              (this.paths = this.localShapeCollection),
              this.paths.addShape(this.v),
              (this.reset = n),
              (this.effectsSequence = [])
          }
          function o(e) {
            this.effectsSequence.push(e), this.container.addDynamicProperty(this)
          }
          function l(t, i, s) {
            ;(this.propType = 'shape'),
              (this.comp = t.comp),
              (this.elem = t),
              (this.container = t),
              (this.offsetTime = t.data.st),
              (this.keyframes = 3 === s ? i.pt.k : i.ks.k),
              (this.keyframesMetadata = []),
              (this.k = !0),
              (this.kf = !0)
            var a = this.keyframes[0].s[0].i.length
            ;(this.v = shapePool.newElement()),
              this.v.setPathData(this.keyframes[0].s[0].c, a),
              (this.pv = shapePool.clone(this.v)),
              (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
              (this.paths = this.localShapeCollection),
              this.paths.addShape(this.v),
              (this.lastFrame = e),
              (this.reset = n),
              (this._caching = { lastFrame: e, lastIndex: 0 }),
              (this.effectsSequence = [r.bind(this)])
          }
          ;(a.prototype.interpolateShape = t),
            (a.prototype.getValue = s),
            (a.prototype.setVValue = i),
            (a.prototype.addEffect = o),
            (l.prototype.getValue = s),
            (l.prototype.interpolateShape = t),
            (l.prototype.setVValue = i),
            (l.prototype.addEffect = o)
          var h = (function () {
              var e = roundCorner
              function t(e, t) {
                ;(this.v = shapePool.newElement()),
                  this.v.setPathData(!0, 4),
                  (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                  (this.paths = this.localShapeCollection),
                  this.localShapeCollection.addShape(this.v),
                  (this.d = t.d),
                  (this.elem = e),
                  (this.comp = e.comp),
                  (this.frameId = -1),
                  this.initDynamicPropertyContainer(e),
                  (this.p = PropertyFactory.getProp(e, t.p, 1, 0, this)),
                  (this.s = PropertyFactory.getProp(e, t.s, 1, 0, this)),
                  this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertEllToPath())
              }
              return (
                (t.prototype = {
                  reset: n,
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId &&
                      ((this.frameId = this.elem.globalData.frameId),
                      this.iterateDynamicProperties(),
                      this._mdf && this.convertEllToPath())
                  },
                  convertEllToPath: function () {
                    var t = this.p.v[0],
                      r = this.p.v[1],
                      n = this.s.v[0] / 2,
                      i = this.s.v[1] / 2,
                      s = 3 !== this.d,
                      a = this.v
                    ;(a.v[0][0] = t),
                      (a.v[0][1] = r - i),
                      (a.v[1][0] = s ? t + n : t - n),
                      (a.v[1][1] = r),
                      (a.v[2][0] = t),
                      (a.v[2][1] = r + i),
                      (a.v[3][0] = s ? t - n : t + n),
                      (a.v[3][1] = r),
                      (a.i[0][0] = s ? t - n * e : t + n * e),
                      (a.i[0][1] = r - i),
                      (a.i[1][0] = s ? t + n : t - n),
                      (a.i[1][1] = r - i * e),
                      (a.i[2][0] = s ? t + n * e : t - n * e),
                      (a.i[2][1] = r + i),
                      (a.i[3][0] = s ? t - n : t + n),
                      (a.i[3][1] = r + i * e),
                      (a.o[0][0] = s ? t + n * e : t - n * e),
                      (a.o[0][1] = r - i),
                      (a.o[1][0] = s ? t + n : t - n),
                      (a.o[1][1] = r + i * e),
                      (a.o[2][0] = s ? t - n * e : t + n * e),
                      (a.o[2][1] = r + i),
                      (a.o[3][0] = s ? t - n : t + n),
                      (a.o[3][1] = r - i * e)
                  },
                }),
                extendPrototype([DynamicPropertyContainer], t),
                t
              )
            })(),
            c = (function () {
              function e(e, t) {
                ;(this.v = shapePool.newElement()),
                  this.v.setPathData(!0, 0),
                  (this.elem = e),
                  (this.comp = e.comp),
                  (this.data = t),
                  (this.frameId = -1),
                  (this.d = t.d),
                  this.initDynamicPropertyContainer(e),
                  1 === t.sy
                    ? ((this.ir = PropertyFactory.getProp(e, t.ir, 0, 0, this)),
                      (this.is = PropertyFactory.getProp(e, t.is, 0, 0.01, this)),
                      (this.convertToPath = this.convertStarToPath))
                    : (this.convertToPath = this.convertPolygonToPath),
                  (this.pt = PropertyFactory.getProp(e, t.pt, 0, 0, this)),
                  (this.p = PropertyFactory.getProp(e, t.p, 1, 0, this)),
                  (this.r = PropertyFactory.getProp(e, t.r, 0, degToRads, this)),
                  (this.or = PropertyFactory.getProp(e, t.or, 0, 0, this)),
                  (this.os = PropertyFactory.getProp(e, t.os, 0, 0.01, this)),
                  (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                  this.localShapeCollection.addShape(this.v),
                  (this.paths = this.localShapeCollection),
                  this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertToPath())
              }
              return (
                (e.prototype = {
                  reset: n,
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId &&
                      ((this.frameId = this.elem.globalData.frameId),
                      this.iterateDynamicProperties(),
                      this._mdf && this.convertToPath())
                  },
                  convertStarToPath: function () {
                    var e,
                      t,
                      r,
                      n,
                      i = 2 * Math.floor(this.pt.v),
                      s = (2 * Math.PI) / i,
                      a = !0,
                      o = this.or.v,
                      l = this.ir.v,
                      h = this.os.v,
                      c = this.is.v,
                      p = (2 * Math.PI * o) / (2 * i),
                      u = (2 * Math.PI * l) / (2 * i),
                      f = -Math.PI / 2
                    f += this.r.v
                    var d = 3 === this.data.d ? -1 : 1
                    for (this.v._length = 0, e = 0; e < i; e += 1) {
                      ;(r = a ? h : c), (n = a ? p : u)
                      var m = (t = a ? o : l) * Math.cos(f),
                        g = t * Math.sin(f),
                        y = 0 === m && 0 === g ? 0 : g / Math.sqrt(m * m + g * g),
                        v = 0 === m && 0 === g ? 0 : -m / Math.sqrt(m * m + g * g)
                      ;(m += +this.p.v[0]),
                        (g += +this.p.v[1]),
                        this.v.setTripleAt(
                          m,
                          g,
                          m - y * n * r * d,
                          g - v * n * r * d,
                          m + y * n * r * d,
                          g + v * n * r * d,
                          e,
                          !0
                        ),
                        (a = !a),
                        (f += s * d)
                    }
                  },
                  convertPolygonToPath: function () {
                    var e,
                      t = Math.floor(this.pt.v),
                      r = (2 * Math.PI) / t,
                      n = this.or.v,
                      i = this.os.v,
                      s = (2 * Math.PI * n) / (4 * t),
                      a = 0.5 * -Math.PI,
                      o = 3 === this.data.d ? -1 : 1
                    for (a += this.r.v, this.v._length = 0, e = 0; e < t; e += 1) {
                      var l = n * Math.cos(a),
                        h = n * Math.sin(a),
                        c = 0 === l && 0 === h ? 0 : h / Math.sqrt(l * l + h * h),
                        p = 0 === l && 0 === h ? 0 : -l / Math.sqrt(l * l + h * h)
                      ;(l += +this.p.v[0]),
                        (h += +this.p.v[1]),
                        this.v.setTripleAt(
                          l,
                          h,
                          l - c * s * i * o,
                          h - p * s * i * o,
                          l + c * s * i * o,
                          h + p * s * i * o,
                          e,
                          !0
                        ),
                        (a += r * o)
                    }
                    ;(this.paths.length = 0), (this.paths[0] = this.v)
                  },
                }),
                extendPrototype([DynamicPropertyContainer], e),
                e
              )
            })(),
            p = (function () {
              function e(e, t) {
                ;(this.v = shapePool.newElement()),
                  (this.v.c = !0),
                  (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                  this.localShapeCollection.addShape(this.v),
                  (this.paths = this.localShapeCollection),
                  (this.elem = e),
                  (this.comp = e.comp),
                  (this.frameId = -1),
                  (this.d = t.d),
                  this.initDynamicPropertyContainer(e),
                  (this.p = PropertyFactory.getProp(e, t.p, 1, 0, this)),
                  (this.s = PropertyFactory.getProp(e, t.s, 1, 0, this)),
                  (this.r = PropertyFactory.getProp(e, t.r, 0, 0, this)),
                  this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertRectToPath())
              }
              return (
                (e.prototype = {
                  convertRectToPath: function () {
                    var e = this.p.v[0],
                      t = this.p.v[1],
                      r = this.s.v[0] / 2,
                      n = this.s.v[1] / 2,
                      i = bmMin(r, n, this.r.v),
                      s = i * (1 - roundCorner)
                    ;(this.v._length = 0),
                      2 === this.d || 1 === this.d
                        ? (this.v.setTripleAt(e + r, t - n + i, e + r, t - n + i, e + r, t - n + s, 0, !0),
                          this.v.setTripleAt(e + r, t + n - i, e + r, t + n - s, e + r, t + n - i, 1, !0),
                          0 !== i
                            ? (this.v.setTripleAt(e + r - i, t + n, e + r - i, t + n, e + r - s, t + n, 2, !0),
                              this.v.setTripleAt(e - r + i, t + n, e - r + s, t + n, e - r + i, t + n, 3, !0),
                              this.v.setTripleAt(e - r, t + n - i, e - r, t + n - i, e - r, t + n - s, 4, !0),
                              this.v.setTripleAt(e - r, t - n + i, e - r, t - n + s, e - r, t - n + i, 5, !0),
                              this.v.setTripleAt(e - r + i, t - n, e - r + i, t - n, e - r + s, t - n, 6, !0),
                              this.v.setTripleAt(e + r - i, t - n, e + r - s, t - n, e + r - i, t - n, 7, !0))
                            : (this.v.setTripleAt(e - r, t + n, e - r + s, t + n, e - r, t + n, 2),
                              this.v.setTripleAt(e - r, t - n, e - r, t - n + s, e - r, t - n, 3)))
                        : (this.v.setTripleAt(e + r, t - n + i, e + r, t - n + s, e + r, t - n + i, 0, !0),
                          0 !== i
                            ? (this.v.setTripleAt(e + r - i, t - n, e + r - i, t - n, e + r - s, t - n, 1, !0),
                              this.v.setTripleAt(e - r + i, t - n, e - r + s, t - n, e - r + i, t - n, 2, !0),
                              this.v.setTripleAt(e - r, t - n + i, e - r, t - n + i, e - r, t - n + s, 3, !0),
                              this.v.setTripleAt(e - r, t + n - i, e - r, t + n - s, e - r, t + n - i, 4, !0),
                              this.v.setTripleAt(e - r + i, t + n, e - r + i, t + n, e - r + s, t + n, 5, !0),
                              this.v.setTripleAt(e + r - i, t + n, e + r - s, t + n, e + r - i, t + n, 6, !0),
                              this.v.setTripleAt(e + r, t + n - i, e + r, t + n - i, e + r, t + n - s, 7, !0))
                            : (this.v.setTripleAt(e - r, t - n, e - r + s, t - n, e - r, t - n, 1, !0),
                              this.v.setTripleAt(e - r, t + n, e - r, t + n - s, e - r, t + n, 2, !0),
                              this.v.setTripleAt(e + r, t + n, e + r - s, t + n, e + r, t + n, 3, !0)))
                  },
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId &&
                      ((this.frameId = this.elem.globalData.frameId),
                      this.iterateDynamicProperties(),
                      this._mdf && this.convertRectToPath())
                  },
                  reset: n,
                }),
                extendPrototype([DynamicPropertyContainer], e),
                e
              )
            })(),
            u = {
              getShapeProp: function (e, t, r) {
                var n
                return (
                  3 === r || 4 === r
                    ? (n = (3 === r ? t.pt : t.ks).k.length ? new l(e, t, r) : new a(e, t, r))
                    : 5 === r
                    ? (n = new p(e, t))
                    : 6 === r
                    ? (n = new h(e, t))
                    : 7 === r && (n = new c(e, t)),
                  n.k && e.addDynamicProperty(n),
                  n
                )
              },
              getConstructorFunction: function () {
                return a
              },
              getKeyframedConstructorFunction: function () {
                return l
              },
            }
          return u
        })(),
        Matrix = (function () {
          var e = Math.cos,
            t = Math.sin,
            r = Math.tan,
            n = Math.round
          function i() {
            return (
              (this.props[0] = 1),
              (this.props[1] = 0),
              (this.props[2] = 0),
              (this.props[3] = 0),
              (this.props[4] = 0),
              (this.props[5] = 1),
              (this.props[6] = 0),
              (this.props[7] = 0),
              (this.props[8] = 0),
              (this.props[9] = 0),
              (this.props[10] = 1),
              (this.props[11] = 0),
              (this.props[12] = 0),
              (this.props[13] = 0),
              (this.props[14] = 0),
              (this.props[15] = 1),
              this
            )
          }
          function s(r) {
            if (0 === r) return this
            var n = e(r),
              i = t(r)
            return this._t(n, -i, 0, 0, i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          }
          function a(r) {
            if (0 === r) return this
            var n = e(r),
              i = t(r)
            return this._t(1, 0, 0, 0, 0, n, -i, 0, 0, i, n, 0, 0, 0, 0, 1)
          }
          function o(r) {
            if (0 === r) return this
            var n = e(r),
              i = t(r)
            return this._t(n, 0, i, 0, 0, 1, 0, 0, -i, 0, n, 0, 0, 0, 0, 1)
          }
          function l(r) {
            if (0 === r) return this
            var n = e(r),
              i = t(r)
            return this._t(n, -i, 0, 0, i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          }
          function h(e, t) {
            return this._t(1, t, e, 1, 0, 0)
          }
          function c(e, t) {
            return this.shear(r(e), r(t))
          }
          function p(n, i) {
            var s = e(i),
              a = t(i)
            return this._t(s, a, 0, 0, -a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
              ._t(1, 0, 0, 0, r(n), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
              ._t(s, -a, 0, 0, a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          }
          function u(e, t, r) {
            return (
              r || 0 === r || (r = 1),
              1 === e && 1 === t && 1 === r ? this : this._t(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
            )
          }
          function f(e, t, r, n, i, s, a, o, l, h, c, p, u, f, d, m) {
            return (
              (this.props[0] = e),
              (this.props[1] = t),
              (this.props[2] = r),
              (this.props[3] = n),
              (this.props[4] = i),
              (this.props[5] = s),
              (this.props[6] = a),
              (this.props[7] = o),
              (this.props[8] = l),
              (this.props[9] = h),
              (this.props[10] = c),
              (this.props[11] = p),
              (this.props[12] = u),
              (this.props[13] = f),
              (this.props[14] = d),
              (this.props[15] = m),
              this
            )
          }
          function d(e, t, r) {
            return (
              (r = r || 0),
              0 !== e || 0 !== t || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, t, r, 1) : this
            )
          }
          function m(e, t, r, n, i, s, a, o, l, h, c, p, u, f, d, m) {
            var g = this.props
            if (
              1 === e &&
              0 === t &&
              0 === r &&
              0 === n &&
              0 === i &&
              1 === s &&
              0 === a &&
              0 === o &&
              0 === l &&
              0 === h &&
              1 === c &&
              0 === p
            )
              return (
                (g[12] = g[12] * e + g[15] * u),
                (g[13] = g[13] * s + g[15] * f),
                (g[14] = g[14] * c + g[15] * d),
                (g[15] *= m),
                (this._identityCalculated = !1),
                this
              )
            var y = g[0],
              v = g[1],
              b = g[2],
              E = g[3],
              S = g[4],
              P = g[5],
              _ = g[6],
              x = g[7],
              C = g[8],
              A = g[9],
              T = g[10],
              k = g[11],
              w = g[12],
              M = g[13],
              I = g[14],
              F = g[15]
            return (
              (g[0] = y * e + v * i + b * l + E * u),
              (g[1] = y * t + v * s + b * h + E * f),
              (g[2] = y * r + v * a + b * c + E * d),
              (g[3] = y * n + v * o + b * p + E * m),
              (g[4] = S * e + P * i + _ * l + x * u),
              (g[5] = S * t + P * s + _ * h + x * f),
              (g[6] = S * r + P * a + _ * c + x * d),
              (g[7] = S * n + P * o + _ * p + x * m),
              (g[8] = C * e + A * i + T * l + k * u),
              (g[9] = C * t + A * s + T * h + k * f),
              (g[10] = C * r + A * a + T * c + k * d),
              (g[11] = C * n + A * o + T * p + k * m),
              (g[12] = w * e + M * i + I * l + F * u),
              (g[13] = w * t + M * s + I * h + F * f),
              (g[14] = w * r + M * a + I * c + F * d),
              (g[15] = w * n + M * o + I * p + F * m),
              (this._identityCalculated = !1),
              this
            )
          }
          function g() {
            return (
              this._identityCalculated ||
                ((this._identity = !(
                  1 !== this.props[0] ||
                  0 !== this.props[1] ||
                  0 !== this.props[2] ||
                  0 !== this.props[3] ||
                  0 !== this.props[4] ||
                  1 !== this.props[5] ||
                  0 !== this.props[6] ||
                  0 !== this.props[7] ||
                  0 !== this.props[8] ||
                  0 !== this.props[9] ||
                  1 !== this.props[10] ||
                  0 !== this.props[11] ||
                  0 !== this.props[12] ||
                  0 !== this.props[13] ||
                  0 !== this.props[14] ||
                  1 !== this.props[15]
                )),
                (this._identityCalculated = !0)),
              this._identity
            )
          }
          function y(e) {
            for (var t = 0; t < 16; ) {
              if (e.props[t] !== this.props[t]) return !1
              t += 1
            }
            return !0
          }
          function v(e) {
            var t
            for (t = 0; t < 16; t += 1) e.props[t] = this.props[t]
            return e
          }
          function b(e) {
            var t
            for (t = 0; t < 16; t += 1) this.props[t] = e[t]
          }
          function E(e, t, r) {
            return {
              x: e * this.props[0] + t * this.props[4] + r * this.props[8] + this.props[12],
              y: e * this.props[1] + t * this.props[5] + r * this.props[9] + this.props[13],
              z: e * this.props[2] + t * this.props[6] + r * this.props[10] + this.props[14],
            }
          }
          function S(e, t, r) {
            return e * this.props[0] + t * this.props[4] + r * this.props[8] + this.props[12]
          }
          function P(e, t, r) {
            return e * this.props[1] + t * this.props[5] + r * this.props[9] + this.props[13]
          }
          function _(e, t, r) {
            return e * this.props[2] + t * this.props[6] + r * this.props[10] + this.props[14]
          }
          function x() {
            var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
              t = this.props[5] / e,
              r = -this.props[1] / e,
              n = -this.props[4] / e,
              i = this.props[0] / e,
              s = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
              a = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e,
              o = new Matrix()
            return (
              (o.props[0] = t),
              (o.props[1] = r),
              (o.props[4] = n),
              (o.props[5] = i),
              (o.props[12] = s),
              (o.props[13] = a),
              o
            )
          }
          function C(e) {
            return this.getInverseMatrix().applyToPointArray(e[0], e[1], e[2] || 0)
          }
          function A(e) {
            var t,
              r = e.length,
              n = []
            for (t = 0; t < r; t += 1) n[t] = C(e[t])
            return n
          }
          function T(e, t, r) {
            var n = createTypedArray('float32', 6)
            if (this.isIdentity())
              (n[0] = e[0]), (n[1] = e[1]), (n[2] = t[0]), (n[3] = t[1]), (n[4] = r[0]), (n[5] = r[1])
            else {
              var i = this.props[0],
                s = this.props[1],
                a = this.props[4],
                o = this.props[5],
                l = this.props[12],
                h = this.props[13]
              ;(n[0] = e[0] * i + e[1] * a + l),
                (n[1] = e[0] * s + e[1] * o + h),
                (n[2] = t[0] * i + t[1] * a + l),
                (n[3] = t[0] * s + t[1] * o + h),
                (n[4] = r[0] * i + r[1] * a + l),
                (n[5] = r[0] * s + r[1] * o + h)
            }
            return n
          }
          function k(e, t, r) {
            return this.isIdentity()
              ? [e, t, r]
              : [
                  e * this.props[0] + t * this.props[4] + r * this.props[8] + this.props[12],
                  e * this.props[1] + t * this.props[5] + r * this.props[9] + this.props[13],
                  e * this.props[2] + t * this.props[6] + r * this.props[10] + this.props[14],
                ]
          }
          function w(e, t) {
            if (this.isIdentity()) return e + ',' + t
            var r = this.props
            return (
              Math.round(100 * (e * r[0] + t * r[4] + r[12])) / 100 +
              ',' +
              Math.round(100 * (e * r[1] + t * r[5] + r[13])) / 100
            )
          }
          function M() {
            for (var e = 0, t = this.props, r = 'matrix3d('; e < 16; )
              (r += n(1e4 * t[e]) / 1e4), (r += 15 === e ? ')' : ','), (e += 1)
            return r
          }
          function I(e) {
            return (e < 1e-6 && e > 0) || (e > -1e-6 && e < 0) ? n(1e4 * e) / 1e4 : e
          }
          function F() {
            var e = this.props
            return (
              'matrix(' +
              I(e[0]) +
              ',' +
              I(e[1]) +
              ',' +
              I(e[4]) +
              ',' +
              I(e[5]) +
              ',' +
              I(e[12]) +
              ',' +
              I(e[13]) +
              ')'
            )
          }
          return function () {
            ;(this.reset = i),
              (this.rotate = s),
              (this.rotateX = a),
              (this.rotateY = o),
              (this.rotateZ = l),
              (this.skew = c),
              (this.skewFromAxis = p),
              (this.shear = h),
              (this.scale = u),
              (this.setTransform = f),
              (this.translate = d),
              (this.transform = m),
              (this.applyToPoint = E),
              (this.applyToX = S),
              (this.applyToY = P),
              (this.applyToZ = _),
              (this.applyToPointArray = k),
              (this.applyToTriplePoints = T),
              (this.applyToPointStringified = w),
              (this.toCSS = M),
              (this.to2dCSS = F),
              (this.clone = v),
              (this.cloneFromProps = b),
              (this.equals = y),
              (this.inversePoints = A),
              (this.inversePoint = C),
              (this.getInverseMatrix = x),
              (this._t = this.transform),
              (this.isIdentity = g),
              (this._identity = !0),
              (this._identityCalculated = !1),
              (this.props = createTypedArray('float32', 16)),
              this.reset()
          }
        })()
      function _typeof$3(e) {
        return (_typeof$3 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      var lottie = {},
        queryString
      function setLocation(e) {
        setLocationHref(e)
      }
      function searchAnimations() {
        animationManager.searchAnimations()
      }
      function setSubframeRendering(e) {
        setSubframeEnabled(e)
      }
      function setPrefix(e) {
        setIdPrefix(e)
      }
      function loadAnimation(e) {
        return animationManager.loadAnimation(e)
      }
      function setQuality(e) {
        if ('string' == typeof e)
          switch (e) {
            case 'high':
              setDefaultCurveSegments(200)
              break
            default:
              setDefaultCurveSegments(50)
              break
            case 'low':
              setDefaultCurveSegments(10)
          }
        else !isNaN(e) && e > 1 && setDefaultCurveSegments(e)
      }
      function inBrowser() {
        return 'undefined' != typeof navigator
      }
      function installPlugin(e, t) {
        'expressions' === e && setExpressionsPlugin(t)
      }
      function getFactory(e) {
        switch (e) {
          case 'propertyFactory':
            return PropertyFactory
          case 'shapePropertyFactory':
            return ShapePropertyFactory
          case 'matrix':
            return Matrix
          default:
            return null
        }
      }
      function checkReady() {
        'complete' === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
      }
      function getQueryVariable(e) {
        for (var t = queryString.split('&'), r = 0; r < t.length; r += 1) {
          var n = t[r].split('=')
          if (decodeURIComponent(n[0]) == e) return decodeURIComponent(n[1])
        }
        return null
      }
      ;(lottie.play = animationManager.play),
        (lottie.pause = animationManager.pause),
        (lottie.setLocationHref = setLocation),
        (lottie.togglePause = animationManager.togglePause),
        (lottie.setSpeed = animationManager.setSpeed),
        (lottie.setDirection = animationManager.setDirection),
        (lottie.stop = animationManager.stop),
        (lottie.searchAnimations = searchAnimations),
        (lottie.registerAnimation = animationManager.registerAnimation),
        (lottie.loadAnimation = loadAnimation),
        (lottie.setSubframeRendering = setSubframeRendering),
        (lottie.resize = animationManager.resize),
        (lottie.goToAndStop = animationManager.goToAndStop),
        (lottie.destroy = animationManager.destroy),
        (lottie.setQuality = setQuality),
        (lottie.inBrowser = inBrowser),
        (lottie.installPlugin = installPlugin),
        (lottie.freeze = animationManager.freeze),
        (lottie.unfreeze = animationManager.unfreeze),
        (lottie.setVolume = animationManager.setVolume),
        (lottie.mute = animationManager.mute),
        (lottie.unmute = animationManager.unmute),
        (lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations),
        (lottie.useWebWorker = setWebWorker),
        (lottie.setIDPrefix = setPrefix),
        (lottie.__getFactory = getFactory),
        (lottie.version = '5.9.1')
      var scripts = document.getElementsByTagName('script'),
        index = scripts.length - 1,
        myScript = scripts[index] || { src: '' }
      ;(queryString = myScript.src.replace(/^[^\?]+\??/, '')), getQueryVariable('renderer')
      var readyStateCheckInterval = setInterval(checkReady, 100)
      try {
        'object' !== _typeof$3(exports) && (window.bodymovin = lottie)
      } catch (err) {}
      var ShapeModifiers = (function () {
        var e = {},
          t = {}
        return (
          (e.registerModifier = function (e, r) {
            t[e] || (t[e] = r)
          }),
          (e.getModifier = function (e, r, n) {
            return new t[e](r, n)
          }),
          e
        )
      })()
      function ShapeModifier() {}
      function TrimModifier() {}
      function PuckerAndBloatModifier() {}
      ;(ShapeModifier.prototype.initModifierProperties = function () {}),
        (ShapeModifier.prototype.addShapeToModifier = function () {}),
        (ShapeModifier.prototype.addShape = function (e) {
          if (!this.closed) {
            e.sh.container.addDynamicProperty(e.sh)
            var t = { shape: e.sh, data: e, localShapeCollection: shapeCollectionPool.newShapeCollection() }
            this.shapes.push(t), this.addShapeToModifier(t), this._isAnimated && e.setAsAnimated()
          }
        }),
        (ShapeModifier.prototype.init = function (e, t) {
          ;(this.shapes = []),
            (this.elem = e),
            this.initDynamicPropertyContainer(e),
            this.initModifierProperties(e, t),
            (this.frameId = initialDefaultFrame),
            (this.closed = !1),
            (this.k = !1),
            this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0)
        }),
        (ShapeModifier.prototype.processKeys = function () {
          this.elem.globalData.frameId !== this.frameId &&
            ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties())
        }),
        extendPrototype([DynamicPropertyContainer], ShapeModifier),
        extendPrototype([ShapeModifier], TrimModifier),
        (TrimModifier.prototype.initModifierProperties = function (e, t) {
          ;(this.s = PropertyFactory.getProp(e, t.s, 0, 0.01, this)),
            (this.e = PropertyFactory.getProp(e, t.e, 0, 0.01, this)),
            (this.o = PropertyFactory.getProp(e, t.o, 0, 0, this)),
            (this.sValue = 0),
            (this.eValue = 0),
            (this.getValue = this.processKeys),
            (this.m = t.m),
            (this._isAnimated =
              !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length)
        }),
        (TrimModifier.prototype.addShapeToModifier = function (e) {
          e.pathsData = []
        }),
        (TrimModifier.prototype.calculateShapeEdges = function (e, t, r, n, i) {
          var s = []
          t <= 1
            ? s.push({ s: e, e: t })
            : e >= 1
            ? s.push({ s: e - 1, e: t - 1 })
            : (s.push({ s: e, e: 1 }), s.push({ s: 0, e: t - 1 }))
          var a,
            o,
            l = [],
            h = s.length
          for (a = 0; a < h; a += 1) {
            var c, p
            ;(o = s[a]).e * i < n ||
              o.s * i > n + r ||
              ((c = o.s * i <= n ? 0 : (o.s * i - n) / r),
              (p = o.e * i >= n + r ? 1 : (o.e * i - n) / r),
              l.push([c, p]))
          }
          return l.length || l.push([0, 0]), l
        }),
        (TrimModifier.prototype.releasePathsData = function (e) {
          var t,
            r = e.length
          for (t = 0; t < r; t += 1) segmentsLengthPool.release(e[t])
          return (e.length = 0), e
        }),
        (TrimModifier.prototype.processShapes = function (e) {
          var t, r, n, i
          if (this._mdf || e) {
            var s = (this.o.v % 360) / 360
            if (
              (s < 0 && (s += 1),
              (t = this.s.v > 1 ? 1 + s : this.s.v < 0 ? 0 + s : this.s.v + s) >
                (r = this.e.v > 1 ? 1 + s : this.e.v < 0 ? 0 + s : this.e.v + s))
            ) {
              var a = t
              ;(t = r), (r = a)
            }
            ;(t = 1e-4 * Math.round(1e4 * t)), (r = 1e-4 * Math.round(1e4 * r)), (this.sValue = t), (this.eValue = r)
          } else (t = this.sValue), (r = this.eValue)
          var o,
            l,
            h,
            c,
            p,
            u = this.shapes.length,
            f = 0
          if (r === t)
            for (i = 0; i < u; i += 1)
              this.shapes[i].localShapeCollection.releaseShapes(),
                (this.shapes[i].shape._mdf = !0),
                (this.shapes[i].shape.paths = this.shapes[i].localShapeCollection),
                this._mdf && (this.shapes[i].pathsData.length = 0)
          else if ((1 === r && 0 === t) || (0 === r && 1 === t)) {
            if (this._mdf)
              for (i = 0; i < u; i += 1) (this.shapes[i].pathsData.length = 0), (this.shapes[i].shape._mdf = !0)
          } else {
            var d,
              m,
              g = []
            for (i = 0; i < u; i += 1)
              if ((d = this.shapes[i]).shape._mdf || this._mdf || e || 2 === this.m) {
                if (((l = (n = d.shape.paths)._length), (p = 0), !d.shape._mdf && d.pathsData.length))
                  p = d.totalShapeLength
                else {
                  for (h = this.releasePathsData(d.pathsData), o = 0; o < l; o += 1)
                    (c = bez.getSegmentsLength(n.shapes[o])), h.push(c), (p += c.totalLength)
                  ;(d.totalShapeLength = p), (d.pathsData = h)
                }
                ;(f += p), (d.shape._mdf = !0)
              } else d.shape.paths = d.localShapeCollection
            var y,
              v = t,
              b = r,
              E = 0
            for (i = u - 1; i >= 0; i -= 1)
              if ((d = this.shapes[i]).shape._mdf) {
                for (
                  (m = d.localShapeCollection).releaseShapes(),
                    2 === this.m && u > 1
                      ? ((y = this.calculateShapeEdges(t, r, d.totalShapeLength, E, f)), (E += d.totalShapeLength))
                      : (y = [[v, b]]),
                    l = y.length,
                    o = 0;
                  o < l;
                  o += 1
                ) {
                  ;(v = y[o][0]),
                    (b = y[o][1]),
                    (g.length = 0),
                    b <= 1
                      ? g.push({ s: d.totalShapeLength * v, e: d.totalShapeLength * b })
                      : v >= 1
                      ? g.push({ s: d.totalShapeLength * (v - 1), e: d.totalShapeLength * (b - 1) })
                      : (g.push({ s: d.totalShapeLength * v, e: d.totalShapeLength }),
                        g.push({ s: 0, e: d.totalShapeLength * (b - 1) }))
                  var S = this.addShapes(d, g[0])
                  if (g[0].s !== g[0].e) {
                    if (g.length > 1)
                      if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                        var P = S.pop()
                        this.addPaths(S, m), (S = this.addShapes(d, g[1], P))
                      } else this.addPaths(S, m), (S = this.addShapes(d, g[1]))
                    this.addPaths(S, m)
                  }
                }
                d.shape.paths = m
              }
          }
        }),
        (TrimModifier.prototype.addPaths = function (e, t) {
          var r,
            n = e.length
          for (r = 0; r < n; r += 1) t.addShape(e[r])
        }),
        (TrimModifier.prototype.addSegment = function (e, t, r, n, i, s, a) {
          i.setXYAt(t[0], t[1], 'o', s),
            i.setXYAt(r[0], r[1], 'i', s + 1),
            a && i.setXYAt(e[0], e[1], 'v', s),
            i.setXYAt(n[0], n[1], 'v', s + 1)
        }),
        (TrimModifier.prototype.addSegmentFromArray = function (e, t, r, n) {
          t.setXYAt(e[1], e[5], 'o', r),
            t.setXYAt(e[2], e[6], 'i', r + 1),
            n && t.setXYAt(e[0], e[4], 'v', r),
            t.setXYAt(e[3], e[7], 'v', r + 1)
        }),
        (TrimModifier.prototype.addShapes = function (e, t, r) {
          var n,
            i,
            s,
            a,
            o,
            l,
            h,
            c,
            p = e.pathsData,
            u = e.shape.paths.shapes,
            f = e.shape.paths._length,
            d = 0,
            m = [],
            g = !0
          for (
            r ? ((o = r._length), (c = r._length)) : ((r = shapePool.newElement()), (o = 0), (c = 0)), m.push(r), n = 0;
            n < f;
            n += 1
          ) {
            for (l = p[n].lengths, r.c = u[n].c, s = u[n].c ? l.length : l.length + 1, i = 1; i < s; i += 1)
              if (d + (a = l[i - 1]).addedLength < t.s) (d += a.addedLength), (r.c = !1)
              else {
                if (d > t.e) {
                  r.c = !1
                  break
                }
                t.s <= d && t.e >= d + a.addedLength
                  ? (this.addSegment(u[n].v[i - 1], u[n].o[i - 1], u[n].i[i], u[n].v[i], r, o, g), (g = !1))
                  : ((h = bez.getNewSegment(
                      u[n].v[i - 1],
                      u[n].v[i],
                      u[n].o[i - 1],
                      u[n].i[i],
                      (t.s - d) / a.addedLength,
                      (t.e - d) / a.addedLength,
                      l[i - 1]
                    )),
                    this.addSegmentFromArray(h, r, o, g),
                    (g = !1),
                    (r.c = !1)),
                  (d += a.addedLength),
                  (o += 1)
              }
            if (u[n].c && l.length) {
              if (((a = l[i - 1]), d <= t.e)) {
                var y = l[i - 1].addedLength
                t.s <= d && t.e >= d + y
                  ? (this.addSegment(u[n].v[i - 1], u[n].o[i - 1], u[n].i[0], u[n].v[0], r, o, g), (g = !1))
                  : ((h = bez.getNewSegment(
                      u[n].v[i - 1],
                      u[n].v[0],
                      u[n].o[i - 1],
                      u[n].i[0],
                      (t.s - d) / y,
                      (t.e - d) / y,
                      l[i - 1]
                    )),
                    this.addSegmentFromArray(h, r, o, g),
                    (g = !1),
                    (r.c = !1))
              } else r.c = !1
              ;(d += a.addedLength), (o += 1)
            }
            if (
              (r._length &&
                (r.setXYAt(r.v[c][0], r.v[c][1], 'i', c),
                r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], 'o', r._length - 1)),
              d > t.e)
            )
              break
            n < f - 1 && ((r = shapePool.newElement()), (g = !0), m.push(r), (o = 0))
          }
          return m
        }),
        extendPrototype([ShapeModifier], PuckerAndBloatModifier),
        (PuckerAndBloatModifier.prototype.initModifierProperties = function (e, t) {
          ;(this.getValue = this.processKeys),
            (this.amount = PropertyFactory.getProp(e, t.a, 0, null, this)),
            (this._isAnimated = !!this.amount.effectsSequence.length)
        }),
        (PuckerAndBloatModifier.prototype.processPath = function (e, t) {
          var r = t / 100,
            n = [0, 0],
            i = e._length,
            s = 0
          for (s = 0; s < i; s += 1) (n[0] += e.v[s][0]), (n[1] += e.v[s][1])
          ;(n[0] /= i), (n[1] /= i)
          var a,
            o,
            l,
            h,
            c,
            p,
            u = shapePool.newElement()
          for (u.c = e.c, s = 0; s < i; s += 1)
            (a = e.v[s][0] + (n[0] - e.v[s][0]) * r),
              (o = e.v[s][1] + (n[1] - e.v[s][1]) * r),
              (l = e.o[s][0] + (n[0] - e.o[s][0]) * -r),
              (h = e.o[s][1] + (n[1] - e.o[s][1]) * -r),
              (c = e.i[s][0] + (n[0] - e.i[s][0]) * -r),
              (p = e.i[s][1] + (n[1] - e.i[s][1]) * -r),
              u.setTripleAt(a, o, l, h, c, p, s)
          return u
        }),
        (PuckerAndBloatModifier.prototype.processShapes = function (e) {
          var t,
            r,
            n,
            i,
            s,
            a,
            o = this.shapes.length,
            l = this.amount.v
          if (0 !== l)
            for (r = 0; r < o; r += 1) {
              if (((a = (s = this.shapes[r]).localShapeCollection), s.shape._mdf || this._mdf || e))
                for (
                  a.releaseShapes(), s.shape._mdf = !0, t = s.shape.paths.shapes, i = s.shape.paths._length, n = 0;
                  n < i;
                  n += 1
                )
                  a.addShape(this.processPath(t[n], l))
              s.shape.paths = s.localShapeCollection
            }
          this.dynamicProperties.length || (this._mdf = !1)
        })
      var TransformPropertyFactory = (function () {
        var e = [0, 0]
        function t(e, t, r) {
          if (
            ((this.elem = e),
            (this.frameId = -1),
            (this.propType = 'transform'),
            (this.data = t),
            (this.v = new Matrix()),
            (this.pre = new Matrix()),
            (this.appliedTransformations = 0),
            this.initDynamicPropertyContainer(r || e),
            t.p && t.p.s
              ? ((this.px = PropertyFactory.getProp(e, t.p.x, 0, 0, this)),
                (this.py = PropertyFactory.getProp(e, t.p.y, 0, 0, this)),
                t.p.z && (this.pz = PropertyFactory.getProp(e, t.p.z, 0, 0, this)))
              : (this.p = PropertyFactory.getProp(e, t.p || { k: [0, 0, 0] }, 1, 0, this)),
            t.rx)
          ) {
            if (
              ((this.rx = PropertyFactory.getProp(e, t.rx, 0, degToRads, this)),
              (this.ry = PropertyFactory.getProp(e, t.ry, 0, degToRads, this)),
              (this.rz = PropertyFactory.getProp(e, t.rz, 0, degToRads, this)),
              t.or.k[0].ti)
            ) {
              var n,
                i = t.or.k.length
              for (n = 0; n < i; n += 1) (t.or.k[n].to = null), (t.or.k[n].ti = null)
            }
            ;(this.or = PropertyFactory.getProp(e, t.or, 1, degToRads, this)), (this.or.sh = !0)
          } else this.r = PropertyFactory.getProp(e, t.r || { k: 0 }, 0, degToRads, this)
          t.sk &&
            ((this.sk = PropertyFactory.getProp(e, t.sk, 0, degToRads, this)),
            (this.sa = PropertyFactory.getProp(e, t.sa, 0, degToRads, this))),
            (this.a = PropertyFactory.getProp(e, t.a || { k: [0, 0, 0] }, 1, 0, this)),
            (this.s = PropertyFactory.getProp(e, t.s || { k: [100, 100, 100] }, 1, 0.01, this)),
            t.o ? (this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, e)) : (this.o = { _mdf: !1, v: 1 }),
            (this._isDirty = !0),
            this.dynamicProperties.length || this.getValue(!0)
        }
        return (
          (t.prototype = {
            applyToMatrix: function (e) {
              var t = this._mdf
              this.iterateDynamicProperties(),
                (this._mdf = this._mdf || t),
                this.a && e.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                this.s && e.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.sk && e.skewFromAxis(-this.sk.v, this.sa.v),
                this.r
                  ? e.rotate(-this.r.v)
                  : e
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                this.data.p.s
                  ? this.data.p.z
                    ? e.translate(this.px.v, this.py.v, -this.pz.v)
                    : e.translate(this.px.v, this.py.v, 0)
                  : e.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
            },
            getValue: function (t) {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (
                  (this._isDirty && (this.precalculateMatrix(), (this._isDirty = !1)),
                  this.iterateDynamicProperties(),
                  this._mdf || t)
                ) {
                  var r
                  if (
                    (this.v.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                    this.r && this.appliedTransformations < 4
                      ? this.v.rotate(-this.r.v)
                      : !this.r &&
                        this.appliedTransformations < 4 &&
                        this.v
                          .rotateZ(-this.rz.v)
                          .rotateY(this.ry.v)
                          .rotateX(this.rx.v)
                          .rotateZ(-this.or.v[2])
                          .rotateY(this.or.v[1])
                          .rotateX(this.or.v[0]),
                    this.autoOriented)
                  ) {
                    var n, i
                    if (((r = this.elem.globalData.frameRate), this.p && this.p.keyframes && this.p.getValueAtTime))
                      this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t
                        ? ((n = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / r, 0)),
                          (i = this.p.getValueAtTime(this.p.keyframes[0].t / r, 0)))
                        : this.p._caching.lastFrame + this.p.offsetTime >=
                          this.p.keyframes[this.p.keyframes.length - 1].t
                        ? ((n = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / r, 0)),
                          (i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / r, 0)))
                        : ((n = this.p.pv),
                          (i = this.p.getValueAtTime(
                            (this.p._caching.lastFrame + this.p.offsetTime - 0.01) / r,
                            this.p.offsetTime
                          )))
                    else if (
                      this.px &&
                      this.px.keyframes &&
                      this.py.keyframes &&
                      this.px.getValueAtTime &&
                      this.py.getValueAtTime
                    ) {
                      ;(n = []), (i = [])
                      var s = this.px,
                        a = this.py
                      s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t
                        ? ((n[0] = s.getValueAtTime((s.keyframes[0].t + 0.01) / r, 0)),
                          (n[1] = a.getValueAtTime((a.keyframes[0].t + 0.01) / r, 0)),
                          (i[0] = s.getValueAtTime(s.keyframes[0].t / r, 0)),
                          (i[1] = a.getValueAtTime(a.keyframes[0].t / r, 0)))
                        : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t
                        ? ((n[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / r, 0)),
                          (n[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / r, 0)),
                          (i[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - 0.01) / r, 0)),
                          (i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - 0.01) / r, 0)))
                        : ((n = [s.pv, a.pv]),
                          (i[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - 0.01) / r, s.offsetTime)),
                          (i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - 0.01) / r, a.offsetTime)))
                    } else n = i = e
                    this.v.rotate(-Math.atan2(n[1] - i[1], n[0] - i[0]))
                  }
                  this.data.p && this.data.p.s
                    ? this.data.p.z
                      ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                      : this.v.translate(this.px.v, this.py.v, 0)
                    : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                }
                this.frameId = this.elem.globalData.frameId
              }
            },
            precalculateMatrix: function () {
              if (
                !this.a.k &&
                (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                (this.appliedTransformations = 1),
                !this.s.effectsSequence.length)
              ) {
                if (
                  (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), (this.appliedTransformations = 2), this.sk)
                ) {
                  if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return
                  this.pre.skewFromAxis(-this.sk.v, this.sa.v), (this.appliedTransformations = 3)
                }
                this.r
                  ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), (this.appliedTransformations = 4))
                  : this.rz.effectsSequence.length ||
                    this.ry.effectsSequence.length ||
                    this.rx.effectsSequence.length ||
                    this.or.effectsSequence.length ||
                    (this.pre
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                    (this.appliedTransformations = 4))
              }
            },
            autoOrient: function () {},
          }),
          extendPrototype([DynamicPropertyContainer], t),
          (t.prototype.addDynamicProperty = function (e) {
            this._addDynamicProperty(e), this.elem.addDynamicProperty(e), (this._isDirty = !0)
          }),
          (t.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty),
          {
            getTransformProperty: function (e, r, n) {
              return new t(e, r, n)
            },
          }
        )
      })()
      function RepeaterModifier() {}
      function RoundCornersModifier() {}
      function getFontProperties(e) {
        for (
          var t = e.fStyle ? e.fStyle.split(' ') : [], r = 'normal', n = 'normal', i = t.length, s = 0;
          s < i;
          s += 1
        )
          switch (t[s].toLowerCase()) {
            case 'italic':
              n = 'italic'
              break
            case 'bold':
              r = '700'
              break
            case 'black':
              r = '900'
              break
            case 'medium':
              r = '500'
              break
            case 'regular':
            case 'normal':
              r = '400'
              break
            case 'light':
            case 'thin':
              r = '200'
          }
        return { style: n, weight: e.fWeight || r }
      }
      extendPrototype([ShapeModifier], RepeaterModifier),
        (RepeaterModifier.prototype.initModifierProperties = function (e, t) {
          ;(this.getValue = this.processKeys),
            (this.c = PropertyFactory.getProp(e, t.c, 0, null, this)),
            (this.o = PropertyFactory.getProp(e, t.o, 0, null, this)),
            (this.tr = TransformPropertyFactory.getTransformProperty(e, t.tr, this)),
            (this.so = PropertyFactory.getProp(e, t.tr.so, 0, 0.01, this)),
            (this.eo = PropertyFactory.getProp(e, t.tr.eo, 0, 0.01, this)),
            (this.data = t),
            this.dynamicProperties.length || this.getValue(!0),
            (this._isAnimated = !!this.dynamicProperties.length),
            (this.pMatrix = new Matrix()),
            (this.rMatrix = new Matrix()),
            (this.sMatrix = new Matrix()),
            (this.tMatrix = new Matrix()),
            (this.matrix = new Matrix())
        }),
        (RepeaterModifier.prototype.applyTransforms = function (e, t, r, n, i, s) {
          var a = s ? -1 : 1,
            o = n.s.v[0] + (1 - n.s.v[0]) * (1 - i),
            l = n.s.v[1] + (1 - n.s.v[1]) * (1 - i)
          e.translate(n.p.v[0] * a * i, n.p.v[1] * a * i, n.p.v[2]),
            t.translate(-n.a.v[0], -n.a.v[1], n.a.v[2]),
            t.rotate(-n.r.v * a * i),
            t.translate(n.a.v[0], n.a.v[1], n.a.v[2]),
            r.translate(-n.a.v[0], -n.a.v[1], n.a.v[2]),
            r.scale(s ? 1 / o : o, s ? 1 / l : l),
            r.translate(n.a.v[0], n.a.v[1], n.a.v[2])
        }),
        (RepeaterModifier.prototype.init = function (e, t, r, n) {
          for (
            this.elem = e,
              this.arr = t,
              this.pos = r,
              this.elemsData = n,
              this._currentCopies = 0,
              this._elements = [],
              this._groups = [],
              this.frameId = -1,
              this.initDynamicPropertyContainer(e),
              this.initModifierProperties(e, t[r]);
            r > 0;

          )
            (r -= 1), this._elements.unshift(t[r])
          this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0)
        }),
        (RepeaterModifier.prototype.resetElements = function (e) {
          var t,
            r = e.length
          for (t = 0; t < r; t += 1) (e[t]._processed = !1), 'gr' === e[t].ty && this.resetElements(e[t].it)
        }),
        (RepeaterModifier.prototype.cloneElements = function (e) {
          var t = JSON.parse(JSON.stringify(e))
          return this.resetElements(t), t
        }),
        (RepeaterModifier.prototype.changeGroupRender = function (e, t) {
          var r,
            n = e.length
          for (r = 0; r < n; r += 1) (e[r]._render = t), 'gr' === e[r].ty && this.changeGroupRender(e[r].it, t)
        }),
        (RepeaterModifier.prototype.processShapes = function (e) {
          var t,
            r,
            n,
            i,
            s,
            a = !1
          if (this._mdf || e) {
            var o,
              l = Math.ceil(this.c.v)
            if (this._groups.length < l) {
              for (; this._groups.length < l; ) {
                var h = { it: this.cloneElements(this._elements), ty: 'gr' }
                h.it.push({
                  a: { a: 0, ix: 1, k: [0, 0] },
                  nm: 'Transform',
                  o: { a: 0, ix: 7, k: 100 },
                  p: { a: 0, ix: 2, k: [0, 0] },
                  r: {
                    a: 1,
                    ix: 6,
                    k: [
                      { s: 0, e: 0, t: 0 },
                      { s: 0, e: 0, t: 1 },
                    ],
                  },
                  s: { a: 0, ix: 3, k: [100, 100] },
                  sa: { a: 0, ix: 5, k: 0 },
                  sk: { a: 0, ix: 4, k: 0 },
                  ty: 'tr',
                }),
                  this.arr.splice(0, 0, h),
                  this._groups.splice(0, 0, h),
                  (this._currentCopies += 1)
              }
              this.elem.reloadShapes(), (a = !0)
            }
            for (s = 0, n = 0; n <= this._groups.length - 1; n += 1) {
              if (((o = s < l), (this._groups[n]._render = o), this.changeGroupRender(this._groups[n].it, o), !o)) {
                var c = this.elemsData[n].it,
                  p = c[c.length - 1]
                0 !== p.transform.op.v
                  ? ((p.transform.op._mdf = !0), (p.transform.op.v = 0))
                  : (p.transform.op._mdf = !1)
              }
              s += 1
            }
            this._currentCopies = l
            var u = this.o.v,
              f = u % 1,
              d = u > 0 ? Math.floor(u) : Math.ceil(u),
              m = this.pMatrix.props,
              g = this.rMatrix.props,
              y = this.sMatrix.props
            this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset()
            var v,
              b,
              E = 0
            if (u > 0) {
              for (; E < d; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), (E += 1)
              f && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, f, !1), (E += f))
            } else if (u < 0) {
              for (; E > d; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), (E -= 1)
              f && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -f, !0), (E -= f))
            }
            for (
              n = 1 === this.data.m ? 0 : this._currentCopies - 1,
                i = 1 === this.data.m ? 1 : -1,
                s = this._currentCopies;
              s;

            ) {
              if (
                ((b = (r = (t = this.elemsData[n].it)[t.length - 1].transform.mProps.v.props).length),
                (t[t.length - 1].transform.mProps._mdf = !0),
                (t[t.length - 1].transform.op._mdf = !0),
                (t[t.length - 1].transform.op.v =
                  1 === this._currentCopies
                    ? this.so.v
                    : this.so.v + (this.eo.v - this.so.v) * (n / (this._currentCopies - 1))),
                0 !== E)
              ) {
                for (
                  ((0 !== n && 1 === i) || (n !== this._currentCopies - 1 && -1 === i)) &&
                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                    this.matrix.transform(
                      g[0],
                      g[1],
                      g[2],
                      g[3],
                      g[4],
                      g[5],
                      g[6],
                      g[7],
                      g[8],
                      g[9],
                      g[10],
                      g[11],
                      g[12],
                      g[13],
                      g[14],
                      g[15]
                    ),
                    this.matrix.transform(
                      y[0],
                      y[1],
                      y[2],
                      y[3],
                      y[4],
                      y[5],
                      y[6],
                      y[7],
                      y[8],
                      y[9],
                      y[10],
                      y[11],
                      y[12],
                      y[13],
                      y[14],
                      y[15]
                    ),
                    this.matrix.transform(
                      m[0],
                      m[1],
                      m[2],
                      m[3],
                      m[4],
                      m[5],
                      m[6],
                      m[7],
                      m[8],
                      m[9],
                      m[10],
                      m[11],
                      m[12],
                      m[13],
                      m[14],
                      m[15]
                    ),
                    v = 0;
                  v < b;
                  v += 1
                )
                  r[v] = this.matrix.props[v]
                this.matrix.reset()
              } else for (this.matrix.reset(), v = 0; v < b; v += 1) r[v] = this.matrix.props[v]
              ;(E += 1), (s -= 1), (n += i)
            }
          } else
            for (s = this._currentCopies, n = 0, i = 1; s; )
              (r = (t = this.elemsData[n].it)[t.length - 1].transform.mProps.v.props),
                (t[t.length - 1].transform.mProps._mdf = !1),
                (t[t.length - 1].transform.op._mdf = !1),
                (s -= 1),
                (n += i)
          return a
        }),
        (RepeaterModifier.prototype.addShape = function () {}),
        extendPrototype([ShapeModifier], RoundCornersModifier),
        (RoundCornersModifier.prototype.initModifierProperties = function (e, t) {
          ;(this.getValue = this.processKeys),
            (this.rd = PropertyFactory.getProp(e, t.r, 0, null, this)),
            (this._isAnimated = !!this.rd.effectsSequence.length)
        }),
        (RoundCornersModifier.prototype.processPath = function (e, t) {
          var r,
            n = shapePool.newElement()
          n.c = e.c
          var i,
            s,
            a,
            o,
            l,
            h,
            c,
            p,
            u,
            f,
            d,
            m,
            g = e._length,
            y = 0
          for (r = 0; r < g; r += 1)
            (i = e.v[r]),
              (a = e.o[r]),
              (s = e.i[r]),
              i[0] === a[0] && i[1] === a[1] && i[0] === s[0] && i[1] === s[1]
                ? (0 !== r && r !== g - 1) || e.c
                  ? ((o = 0 === r ? e.v[g - 1] : e.v[r - 1]),
                    (h = (l = Math.sqrt(Math.pow(i[0] - o[0], 2) + Math.pow(i[1] - o[1], 2)))
                      ? Math.min(l / 2, t) / l
                      : 0),
                    (c = d = i[0] + (o[0] - i[0]) * h),
                    (p = m = i[1] - (i[1] - o[1]) * h),
                    (u = c - (c - i[0]) * roundCorner),
                    (f = p - (p - i[1]) * roundCorner),
                    n.setTripleAt(c, p, u, f, d, m, y),
                    (y += 1),
                    (o = r === g - 1 ? e.v[0] : e.v[r + 1]),
                    (h = (l = Math.sqrt(Math.pow(i[0] - o[0], 2) + Math.pow(i[1] - o[1], 2)))
                      ? Math.min(l / 2, t) / l
                      : 0),
                    (c = u = i[0] + (o[0] - i[0]) * h),
                    (p = f = i[1] + (o[1] - i[1]) * h),
                    (d = c - (c - i[0]) * roundCorner),
                    (m = p - (p - i[1]) * roundCorner),
                    n.setTripleAt(c, p, u, f, d, m, y),
                    (y += 1))
                  : (n.setTripleAt(i[0], i[1], a[0], a[1], s[0], s[1], y), (y += 1))
                : (n.setTripleAt(e.v[r][0], e.v[r][1], e.o[r][0], e.o[r][1], e.i[r][0], e.i[r][1], y), (y += 1))
          return n
        }),
        (RoundCornersModifier.prototype.processShapes = function (e) {
          var t,
            r,
            n,
            i,
            s,
            a,
            o = this.shapes.length,
            l = this.rd.v
          if (0 !== l)
            for (r = 0; r < o; r += 1) {
              if (((a = (s = this.shapes[r]).localShapeCollection), s.shape._mdf || this._mdf || e))
                for (
                  a.releaseShapes(), s.shape._mdf = !0, t = s.shape.paths.shapes, i = s.shape.paths._length, n = 0;
                  n < i;
                  n += 1
                )
                  a.addShape(this.processPath(t[n], l))
              s.shape.paths = s.localShapeCollection
            }
          this.dynamicProperties.length || (this._mdf = !1)
        })
      var FontManager = (function () {
        var e = { w: 0, size: 0, shapes: [], data: { shapes: [] } },
          t = []
        t = t.concat([
          2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375,
          2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403,
        ])
        var r = ['d83cdffb', 'd83cdffc', 'd83cdffd', 'd83cdffe', 'd83cdfff'],
          n = [65039, 8205]
        function i(e, t) {
          var r = createTag('span')
          r.setAttribute('aria-hidden', !0), (r.style.fontFamily = t)
          var n = createTag('span')
          ;(n.innerText = 'giItT1WQy@!-/#'),
            (r.style.position = 'absolute'),
            (r.style.left = '-10000px'),
            (r.style.top = '-10000px'),
            (r.style.fontSize = '300px'),
            (r.style.fontVariant = 'normal'),
            (r.style.fontStyle = 'normal'),
            (r.style.fontWeight = 'normal'),
            (r.style.letterSpacing = '0'),
            r.appendChild(n),
            document.body.appendChild(r)
          var i = n.offsetWidth
          return (
            (n.style.fontFamily =
              (function (e) {
                var t,
                  r = e.split(','),
                  n = r.length,
                  i = []
                for (t = 0; t < n; t += 1) 'sans-serif' !== r[t] && 'monospace' !== r[t] && i.push(r[t])
                return i.join(',')
              })(e) +
              ', ' +
              t),
            { node: n, w: i, parent: r }
          )
        }
        function s(e, t) {
          var r = createNS('text')
          r.style.fontSize = '100px'
          var n = getFontProperties(t)
          return (
            r.setAttribute('font-family', t.fFamily),
            r.setAttribute('font-style', n.style),
            r.setAttribute('font-weight', n.weight),
            (r.textContent = '1'),
            t.fClass
              ? ((r.style.fontFamily = 'inherit'), r.setAttribute('class', t.fClass))
              : (r.style.fontFamily = t.fFamily),
            e.appendChild(r),
            (createTag('canvas').getContext('2d').font = t.fWeight + ' ' + t.fStyle + ' 100px ' + t.fFamily),
            r
          )
        }
        var a = function () {
          ;(this.fonts = []),
            (this.chars = null),
            (this.typekitLoaded = 0),
            (this.isLoaded = !1),
            (this._warned = !1),
            (this.initTime = Date.now()),
            (this.setIsLoadedBinded = this.setIsLoaded.bind(this)),
            (this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this))
        }
        return (
          (a.isModifier = function (e, t) {
            var n = e.toString(16) + t.toString(16)
            return -1 !== r.indexOf(n)
          }),
          (a.isZeroWidthJoiner = function (e, t) {
            return t ? e === n[0] && t === n[1] : e === n[1]
          }),
          (a.isCombinedCharacter = function (e) {
            return -1 !== t.indexOf(e)
          }),
          (a.prototype = {
            addChars: function (e) {
              if (e) {
                var t
                this.chars || (this.chars = [])
                var r,
                  n,
                  i = e.length,
                  s = this.chars.length
                for (t = 0; t < i; t += 1) {
                  for (r = 0, n = !1; r < s; )
                    this.chars[r].style === e[t].style &&
                      this.chars[r].fFamily === e[t].fFamily &&
                      this.chars[r].ch === e[t].ch &&
                      (n = !0),
                      (r += 1)
                  n || (this.chars.push(e[t]), (s += 1))
                }
              }
            },
            addFonts: function (e, t) {
              if (e) {
                if (this.chars) return (this.isLoaded = !0), void (this.fonts = e.list)
                var r,
                  n = e.list,
                  a = n.length,
                  o = a
                for (r = 0; r < a; r += 1) {
                  var l,
                    h,
                    c = !0
                  if (
                    ((n[r].loaded = !1),
                    (n[r].monoCase = i(n[r].fFamily, 'monospace')),
                    (n[r].sansCase = i(n[r].fFamily, 'sans-serif')),
                    n[r].fPath)
                  ) {
                    if ('p' === n[r].fOrigin || 3 === n[r].origin) {
                      if (
                        ((l = document.querySelectorAll(
                          'style[f-forigin="p"][f-family="' +
                            n[r].fFamily +
                            '"], style[f-origin="3"][f-family="' +
                            n[r].fFamily +
                            '"]'
                        )).length > 0 && (c = !1),
                        c)
                      ) {
                        var p = createTag('style')
                        p.setAttribute('f-forigin', n[r].fOrigin),
                          p.setAttribute('f-origin', n[r].origin),
                          p.setAttribute('f-family', n[r].fFamily),
                          (p.type = 'text/css'),
                          (p.innerText =
                            '@font-face {font-family: ' +
                            n[r].fFamily +
                            "; font-style: normal; src: url('" +
                            n[r].fPath +
                            "');}"),
                          t.appendChild(p)
                      }
                    } else if ('g' === n[r].fOrigin || 1 === n[r].origin) {
                      for (
                        l = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), h = 0;
                        h < l.length;
                        h += 1
                      )
                        -1 !== l[h].href.indexOf(n[r].fPath) && (c = !1)
                      if (c) {
                        var u = createTag('link')
                        u.setAttribute('f-forigin', n[r].fOrigin),
                          u.setAttribute('f-origin', n[r].origin),
                          (u.type = 'text/css'),
                          (u.rel = 'stylesheet'),
                          (u.href = n[r].fPath),
                          document.body.appendChild(u)
                      }
                    } else if ('t' === n[r].fOrigin || 2 === n[r].origin) {
                      for (
                        l = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), h = 0;
                        h < l.length;
                        h += 1
                      )
                        n[r].fPath === l[h].src && (c = !1)
                      if (c) {
                        var f = createTag('link')
                        f.setAttribute('f-forigin', n[r].fOrigin),
                          f.setAttribute('f-origin', n[r].origin),
                          f.setAttribute('rel', 'stylesheet'),
                          f.setAttribute('href', n[r].fPath),
                          t.appendChild(f)
                      }
                    }
                  } else (n[r].loaded = !0), (o -= 1)
                  ;(n[r].helper = s(t, n[r])), (n[r].cache = {}), this.fonts.push(n[r])
                }
                0 === o ? (this.isLoaded = !0) : setTimeout(this.checkLoadedFonts.bind(this), 100)
              } else this.isLoaded = !0
            },
            getCharData: function (t, r, n) {
              for (var i = 0, s = this.chars.length; i < s; ) {
                if (this.chars[i].ch === t && this.chars[i].style === r && this.chars[i].fFamily === n)
                  return this.chars[i]
                i += 1
              }
              return (
                (('string' == typeof t && 13 !== t.charCodeAt(0)) || !t) &&
                  console &&
                  console.warn &&
                  !this._warned &&
                  (this._warned = !0),
                e
              )
            },
            getFontByName: function (e) {
              for (var t = 0, r = this.fonts.length; t < r; ) {
                if (this.fonts[t].fName === e) return this.fonts[t]
                t += 1
              }
              return this.fonts[0]
            },
            measureText: function (e, t, r) {
              var n = this.getFontByName(t),
                i = e.charCodeAt(0)
              if (!n.cache[i + 1]) {
                var s = n.helper
                if (' ' === e) {
                  s.textContent = '|' + e + '|'
                  var a = s.getComputedTextLength()
                  s.textContent = '||'
                  var o = s.getComputedTextLength()
                  n.cache[i + 1] = (a - o) / 100
                } else (s.textContent = e), (n.cache[i + 1] = s.getComputedTextLength() / 100)
              }
              return n.cache[i + 1] * r
            },
            checkLoadedFonts: function () {
              var e,
                t,
                r,
                n = this.fonts.length,
                i = n
              for (e = 0; e < n; e += 1)
                this.fonts[e].loaded
                  ? (i -= 1)
                  : 'n' === this.fonts[e].fOrigin || 0 === this.fonts[e].origin
                  ? (this.fonts[e].loaded = !0)
                  : ((t = this.fonts[e].monoCase.node),
                    (r = this.fonts[e].monoCase.w),
                    t.offsetWidth !== r
                      ? ((i -= 1), (this.fonts[e].loaded = !0))
                      : ((t = this.fonts[e].sansCase.node),
                        (r = this.fonts[e].sansCase.w),
                        t.offsetWidth !== r && ((i -= 1), (this.fonts[e].loaded = !0))),
                    this.fonts[e].loaded &&
                      (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent),
                      this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)))
              0 !== i && Date.now() - this.initTime < 5e3
                ? setTimeout(this.checkLoadedFontsBinded, 20)
                : setTimeout(this.setIsLoadedBinded, 10)
            },
            setIsLoaded: function () {
              this.isLoaded = !0
            },
          }),
          a
        )
      })()
      function RenderableElement() {}
      RenderableElement.prototype = {
        initRenderable: function () {
          ;(this.isInRange = !1), (this.hidden = !1), (this.isTransparent = !1), (this.renderableComponents = [])
        },
        addRenderableComponent: function (e) {
          ;-1 === this.renderableComponents.indexOf(e) && this.renderableComponents.push(e)
        },
        removeRenderableComponent: function (e) {
          ;-1 !== this.renderableComponents.indexOf(e) &&
            this.renderableComponents.splice(this.renderableComponents.indexOf(e), 1)
        },
        prepareRenderableFrame: function (e) {
          this.checkLayerLimits(e)
        },
        checkTransparency: function () {
          this.finalTransform.mProp.o.v <= 0
            ? !this.isTransparent &&
              this.globalData.renderConfig.hideOnTransparent &&
              ((this.isTransparent = !0), this.hide())
            : this.isTransparent && ((this.isTransparent = !1), this.show())
        },
        checkLayerLimits: function (e) {
          this.data.ip - this.data.st <= e && this.data.op - this.data.st > e
            ? !0 !== this.isInRange &&
              ((this.globalData._mdf = !0), (this._mdf = !0), (this.isInRange = !0), this.show())
            : !1 !== this.isInRange && ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide())
        },
        renderRenderable: function () {
          var e,
            t = this.renderableComponents.length
          for (e = 0; e < t; e += 1) this.renderableComponents[e].renderFrame(this._isFirstFrame)
        },
        sourceRectAtTime: function () {
          return { top: 0, left: 0, width: 100, height: 100 }
        },
        getLayerSize: function () {
          return 5 === this.data.ty
            ? { w: this.data.textData.width, h: this.data.textData.height }
            : { w: this.data.width, h: this.data.height }
        },
      }
      var MaskManagerInterface = (function () {
          function e(e, t) {
            ;(this._mask = e), (this._data = t)
          }
          return (
            Object.defineProperty(e.prototype, 'maskPath', {
              get: function () {
                return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
              },
            }),
            Object.defineProperty(e.prototype, 'maskOpacity', {
              get: function () {
                return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
              },
            }),
            function (t) {
              var r,
                n = createSizedArray(t.viewData.length),
                i = t.viewData.length
              for (r = 0; r < i; r += 1) n[r] = new e(t.viewData[r], t.masksProperties[r])
              return function (e) {
                for (r = 0; r < i; ) {
                  if (t.masksProperties[r].nm === e) return n[r]
                  r += 1
                }
                return null
              }
            }
          )
        })(),
        ExpressionPropertyInterface = (function () {
          var e = { pv: 0, v: 0, mult: 1 },
            t = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 }
          function r(e, t, r) {
            Object.defineProperty(e, 'velocity', {
              get: function () {
                return t.getVelocityAtTime(t.comp.currentFrame)
              },
            }),
              (e.numKeys = t.keyframes ? t.keyframes.length : 0),
              (e.key = function (n) {
                if (!e.numKeys) return 0
                var i = ''
                i =
                  's' in t.keyframes[n - 1]
                    ? t.keyframes[n - 1].s
                    : 'e' in t.keyframes[n - 2]
                    ? t.keyframes[n - 2].e
                    : t.keyframes[n - 2].s
                var s = 'unidimensional' === r ? new Number(i) : Object.assign({}, i)
                return (
                  (s.time = t.keyframes[n - 1].t / t.elem.comp.globalData.frameRate),
                  (s.value = 'unidimensional' === r ? i[0] : i),
                  s
                )
              }),
              (e.valueAtTime = t.getValueAtTime),
              (e.speedAtTime = t.getSpeedAtTime),
              (e.velocityAtTime = t.getVelocityAtTime),
              (e.propertyGroup = t.propertyGroup)
          }
          function n() {
            return e
          }
          return function (i) {
            return i
              ? 'unidimensional' === i.propType
                ? (function (t) {
                    ;(t && 'pv' in t) || (t = e)
                    var n = 1 / t.mult,
                      i = t.pv * n,
                      s = new Number(i)
                    return (
                      (s.value = i),
                      r(s, t, 'unidimensional'),
                      function () {
                        return (
                          t.k && t.getValue(),
                          (i = t.v * n),
                          s.value !== i && (((s = new Number(i)).value = i), r(s, t, 'unidimensional')),
                          s
                        )
                      }
                    )
                  })(i)
                : (function (e) {
                    ;(e && 'pv' in e) || (e = t)
                    var n = 1 / e.mult,
                      i = (e.data && e.data.l) || e.pv.length,
                      s = createTypedArray('float32', i),
                      a = createTypedArray('float32', i)
                    return (
                      (s.value = a),
                      r(s, e, 'multidimensional'),
                      function () {
                        e.k && e.getValue()
                        for (var t = 0; t < i; t += 1) (a[t] = e.v[t] * n), (s[t] = a[t])
                        return s
                      }
                    )
                  })(i)
              : n
          }
        })(),
        TransformExpressionInterface = function (e) {
          function t(e) {
            switch (e) {
              case 'scale':
              case 'Scale':
              case 'ADBE Scale':
              case 6:
                return t.scale
              case 'rotation':
              case 'Rotation':
              case 'ADBE Rotation':
              case 'ADBE Rotate Z':
              case 10:
                return t.rotation
              case 'ADBE Rotate X':
                return t.xRotation
              case 'ADBE Rotate Y':
                return t.yRotation
              case 'position':
              case 'Position':
              case 'ADBE Position':
              case 2:
                return t.position
              case 'ADBE Position_0':
                return t.xPosition
              case 'ADBE Position_1':
                return t.yPosition
              case 'ADBE Position_2':
                return t.zPosition
              case 'anchorPoint':
              case 'AnchorPoint':
              case 'Anchor Point':
              case 'ADBE AnchorPoint':
              case 1:
                return t.anchorPoint
              case 'opacity':
              case 'Opacity':
              case 11:
                return t.opacity
              default:
                return null
            }
          }
          var r, n, i, s
          return (
            Object.defineProperty(t, 'rotation', { get: ExpressionPropertyInterface(e.r || e.rz) }),
            Object.defineProperty(t, 'zRotation', { get: ExpressionPropertyInterface(e.rz || e.r) }),
            Object.defineProperty(t, 'xRotation', { get: ExpressionPropertyInterface(e.rx) }),
            Object.defineProperty(t, 'yRotation', { get: ExpressionPropertyInterface(e.ry) }),
            Object.defineProperty(t, 'scale', { get: ExpressionPropertyInterface(e.s) }),
            e.p
              ? (s = ExpressionPropertyInterface(e.p))
              : ((r = ExpressionPropertyInterface(e.px)),
                (n = ExpressionPropertyInterface(e.py)),
                e.pz && (i = ExpressionPropertyInterface(e.pz))),
            Object.defineProperty(t, 'position', {
              get: function () {
                return e.p ? s() : [r(), n(), i ? i() : 0]
              },
            }),
            Object.defineProperty(t, 'xPosition', { get: ExpressionPropertyInterface(e.px) }),
            Object.defineProperty(t, 'yPosition', { get: ExpressionPropertyInterface(e.py) }),
            Object.defineProperty(t, 'zPosition', { get: ExpressionPropertyInterface(e.pz) }),
            Object.defineProperty(t, 'anchorPoint', { get: ExpressionPropertyInterface(e.a) }),
            Object.defineProperty(t, 'opacity', { get: ExpressionPropertyInterface(e.o) }),
            Object.defineProperty(t, 'skew', { get: ExpressionPropertyInterface(e.sk) }),
            Object.defineProperty(t, 'skewAxis', { get: ExpressionPropertyInterface(e.sa) }),
            Object.defineProperty(t, 'orientation', { get: ExpressionPropertyInterface(e.or) }),
            t
          )
        },
        LayerExpressionInterface = (function () {
          function e(e) {
            var t = new Matrix()
            return (
              void 0 !== e
                ? this._elem.finalTransform.mProp.getValueAtTime(e).clone(t)
                : this._elem.finalTransform.mProp.applyToMatrix(t),
              t
            )
          }
          function t(e, t) {
            var r = this.getMatrix(t)
            return (r.props[12] = 0), (r.props[13] = 0), (r.props[14] = 0), this.applyPoint(r, e)
          }
          function r(e, t) {
            var r = this.getMatrix(t)
            return this.applyPoint(r, e)
          }
          function n(e, t) {
            var r = this.getMatrix(t)
            return (r.props[12] = 0), (r.props[13] = 0), (r.props[14] = 0), this.invertPoint(r, e)
          }
          function i(e, t) {
            var r = this.getMatrix(t)
            return this.invertPoint(r, e)
          }
          function s(e, t) {
            if (this._elem.hierarchy && this._elem.hierarchy.length) {
              var r,
                n = this._elem.hierarchy.length
              for (r = 0; r < n; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e)
            }
            return e.applyToPointArray(t[0], t[1], t[2] || 0)
          }
          function a(e, t) {
            if (this._elem.hierarchy && this._elem.hierarchy.length) {
              var r,
                n = this._elem.hierarchy.length
              for (r = 0; r < n; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e)
            }
            return e.inversePoint(t)
          }
          function o(e) {
            var t = new Matrix()
            if (
              (t.reset(),
              this._elem.finalTransform.mProp.applyToMatrix(t),
              this._elem.hierarchy && this._elem.hierarchy.length)
            ) {
              var r,
                n = this._elem.hierarchy.length
              for (r = 0; r < n; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
              return t.inversePoint(e)
            }
            return t.inversePoint(e)
          }
          function l() {
            return [1, 1, 1, 1]
          }
          return function (h) {
            var c
            function p(e) {
              switch (e) {
                case 'ADBE Root Vectors Group':
                case 'Contents':
                case 2:
                  return p.shapeInterface
                case 1:
                case 6:
                case 'Transform':
                case 'transform':
                case 'ADBE Transform Group':
                  return c
                case 4:
                case 'ADBE Effect Parade':
                case 'effects':
                case 'Effects':
                  return p.effect
                case 'ADBE Text Properties':
                  return p.textInterface
                default:
                  return null
              }
            }
            ;(p.getMatrix = e),
              (p.invertPoint = a),
              (p.applyPoint = s),
              (p.toWorld = r),
              (p.toWorldVec = t),
              (p.fromWorld = i),
              (p.fromWorldVec = n),
              (p.toComp = r),
              (p.fromComp = o),
              (p.sampleImage = l),
              (p.sourceRectAtTime = h.sourceRectAtTime.bind(h)),
              (p._elem = h)
            var u = getDescriptor((c = TransformExpressionInterface(h.finalTransform.mProp)), 'anchorPoint')
            return (
              Object.defineProperties(p, {
                hasParent: {
                  get: function () {
                    return h.hierarchy.length
                  },
                },
                parent: {
                  get: function () {
                    return h.hierarchy[0].layerInterface
                  },
                },
                rotation: getDescriptor(c, 'rotation'),
                scale: getDescriptor(c, 'scale'),
                position: getDescriptor(c, 'position'),
                opacity: getDescriptor(c, 'opacity'),
                anchorPoint: u,
                anchor_point: u,
                transform: {
                  get: function () {
                    return c
                  },
                },
                active: {
                  get: function () {
                    return h.isInRange
                  },
                },
              }),
              (p.startTime = h.data.st),
              (p.index = h.data.ind),
              (p.source = h.data.refId),
              (p.height = 0 === h.data.ty ? h.data.h : 100),
              (p.width = 0 === h.data.ty ? h.data.w : 100),
              (p.inPoint = h.data.ip / h.comp.globalData.frameRate),
              (p.outPoint = h.data.op / h.comp.globalData.frameRate),
              (p._name = h.data.nm),
              (p.registerMaskInterface = function (e) {
                p.mask = new MaskManagerInterface(e, h)
              }),
              (p.registerEffectsInterface = function (e) {
                p.effect = e
              }),
              p
            )
          }
        })(),
        propertyGroupFactory = function (e, t) {
          return function (r) {
            return (r = void 0 === r ? 1 : r) <= 0 ? e : t(r - 1)
          }
        },
        PropertyInterface = function (e, t) {
          var r = { _name: e }
          return function (e) {
            return (e = void 0 === e ? 1 : e) <= 0 ? r : t(e - 1)
          }
        },
        EffectsExpressionInterface = (function () {
          function e(r, n, i, s) {
            function a(e) {
              for (var t = r.ef, n = 0, i = t.length; n < i; ) {
                if (e === t[n].nm || e === t[n].mn || e === t[n].ix) return 5 === t[n].ty ? h[n] : h[n]()
                n += 1
              }
              throw new Error()
            }
            var o,
              l = propertyGroupFactory(a, i),
              h = [],
              c = r.ef.length
            for (o = 0; o < c; o += 1)
              5 === r.ef[o].ty
                ? h.push(e(r.ef[o], n.effectElements[o], n.effectElements[o].propertyGroup, s))
                : h.push(t(n.effectElements[o], r.ef[o].ty, s, l))
            return (
              'ADBE Color Control' === r.mn &&
                Object.defineProperty(a, 'color', {
                  get: function () {
                    return h[0]()
                  },
                }),
              Object.defineProperties(a, {
                numProperties: {
                  get: function () {
                    return r.np
                  },
                },
                _name: { value: r.nm },
                propertyGroup: { value: l },
              }),
              (a.enabled = 0 !== r.en),
              (a.active = a.enabled),
              a
            )
          }
          function t(e, t, r, n) {
            var i = ExpressionPropertyInterface(e.p)
            return (
              e.p.setGroupProperty && e.p.setGroupProperty(PropertyInterface('', n)),
              function () {
                return 10 === t ? r.comp.compInterface(e.p.v) : i()
              }
            )
          }
          return {
            createEffectsInterface: function (t, r) {
              if (t.effectsManager) {
                var n,
                  i = [],
                  s = t.data.ef,
                  a = t.effectsManager.effectElements.length
                for (n = 0; n < a; n += 1) i.push(e(s[n], t.effectsManager.effectElements[n], r, t))
                var o = t.data.ef || [],
                  l = function (e) {
                    for (n = 0, a = o.length; n < a; ) {
                      if (e === o[n].nm || e === o[n].mn || e === o[n].ix) return i[n]
                      n += 1
                    }
                    return null
                  }
                return (
                  Object.defineProperty(l, 'numProperties', {
                    get: function () {
                      return o.length
                    },
                  }),
                  l
                )
              }
              return null
            },
          }
        })(),
        CompExpressionInterface = function (e) {
          function t(t) {
            for (var r = 0, n = e.layers.length; r < n; ) {
              if (e.layers[r].nm === t || e.layers[r].ind === t) return e.elements[r].layerInterface
              r += 1
            }
            return null
          }
          return (
            Object.defineProperty(t, '_name', { value: e.data.nm }),
            (t.layer = t),
            (t.pixelAspect = 1),
            (t.height = e.data.h || e.globalData.compSize.h),
            (t.width = e.data.w || e.globalData.compSize.w),
            (t.pixelAspect = 1),
            (t.frameDuration = 1 / e.globalData.frameRate),
            (t.displayStartTime = 0),
            (t.numLayers = e.layers.length),
            t
          )
        },
        ShapePathInterface = function (e, t, r) {
          var n = t.sh
          function i(e) {
            return 'Shape' === e ||
              'shape' === e ||
              'Path' === e ||
              'path' === e ||
              'ADBE Vector Shape' === e ||
              2 === e
              ? i.path
              : null
          }
          var s = propertyGroupFactory(i, r)
          return (
            n.setGroupProperty(PropertyInterface('Path', s)),
            Object.defineProperties(i, {
              path: {
                get: function () {
                  return n.k && n.getValue(), n
                },
              },
              shape: {
                get: function () {
                  return n.k && n.getValue(), n
                },
              },
              _name: { value: e.nm },
              ix: { value: e.ix },
              propertyIndex: { value: e.ix },
              mn: { value: e.mn },
              propertyGroup: { value: r },
            }),
            i
          )
        },
        ShapeExpressionInterface = (function () {
          function e(e, a, u) {
            var f,
              d = [],
              m = e ? e.length : 0
            for (f = 0; f < m; f += 1)
              'gr' === e[f].ty
                ? d.push(t(e[f], a[f], u))
                : 'fl' === e[f].ty
                ? d.push(r(e[f], a[f], u))
                : 'st' === e[f].ty
                ? d.push(i(e[f], a[f], u))
                : 'tm' === e[f].ty
                ? d.push(s(e[f], a[f], u))
                : 'tr' === e[f].ty ||
                  ('el' === e[f].ty
                    ? d.push(o(e[f], a[f], u))
                    : 'sr' === e[f].ty
                    ? d.push(l(e[f], a[f], u))
                    : 'sh' === e[f].ty
                    ? d.push(ShapePathInterface(e[f], a[f], u))
                    : 'rc' === e[f].ty
                    ? d.push(h(e[f], a[f], u))
                    : 'rd' === e[f].ty
                    ? d.push(c(e[f], a[f], u))
                    : 'rp' === e[f].ty
                    ? d.push(p(e[f], a[f], u))
                    : 'gf' === e[f].ty
                    ? d.push(n(e[f], a[f], u))
                    : d.push(
                        (e[f],
                        a[f],
                        function () {
                          return null
                        })
                      ))
            return d
          }
          function t(t, r, n) {
            var i = function (e) {
              switch (e) {
                case 'ADBE Vectors Group':
                case 'Contents':
                case 2:
                  return i.content
                default:
                  return i.transform
              }
            }
            i.propertyGroup = propertyGroupFactory(i, n)
            var s = (function (t, r, n) {
                var i,
                  s = function (e) {
                    for (var t = 0, r = i.length; t < r; ) {
                      if (
                        i[t]._name === e ||
                        i[t].mn === e ||
                        i[t].propertyIndex === e ||
                        i[t].ix === e ||
                        i[t].ind === e
                      )
                        return i[t]
                      t += 1
                    }
                    return 'number' == typeof e ? i[e - 1] : null
                  }
                ;(s.propertyGroup = propertyGroupFactory(s, n)),
                  (i = e(t.it, r.it, s.propertyGroup)),
                  (s.numProperties = i.length)
                var o = a(t.it[t.it.length - 1], r.it[r.it.length - 1], s.propertyGroup)
                return (s.transform = o), (s.propertyIndex = t.cix), (s._name = t.nm), s
              })(t, r, i.propertyGroup),
              o = a(t.it[t.it.length - 1], r.it[r.it.length - 1], i.propertyGroup)
            return (
              (i.content = s),
              (i.transform = o),
              Object.defineProperty(i, '_name', {
                get: function () {
                  return t.nm
                },
              }),
              (i.numProperties = t.np),
              (i.propertyIndex = t.ix),
              (i.nm = t.nm),
              (i.mn = t.mn),
              i
            )
          }
          function r(e, t, r) {
            function n(e) {
              return 'Color' === e || 'color' === e ? n.color : 'Opacity' === e || 'opacity' === e ? n.opacity : null
            }
            return (
              Object.defineProperties(n, {
                color: { get: ExpressionPropertyInterface(t.c) },
                opacity: { get: ExpressionPropertyInterface(t.o) },
                _name: { value: e.nm },
                mn: { value: e.mn },
              }),
              t.c.setGroupProperty(PropertyInterface('Color', r)),
              t.o.setGroupProperty(PropertyInterface('Opacity', r)),
              n
            )
          }
          function n(e, t, r) {
            function n(e) {
              return 'Start Point' === e || 'start point' === e
                ? n.startPoint
                : 'End Point' === e || 'end point' === e
                ? n.endPoint
                : 'Opacity' === e || 'opacity' === e
                ? n.opacity
                : null
            }
            return (
              Object.defineProperties(n, {
                startPoint: { get: ExpressionPropertyInterface(t.s) },
                endPoint: { get: ExpressionPropertyInterface(t.e) },
                opacity: { get: ExpressionPropertyInterface(t.o) },
                type: {
                  get: function () {
                    return 'a'
                  },
                },
                _name: { value: e.nm },
                mn: { value: e.mn },
              }),
              t.s.setGroupProperty(PropertyInterface('Start Point', r)),
              t.e.setGroupProperty(PropertyInterface('End Point', r)),
              t.o.setGroupProperty(PropertyInterface('Opacity', r)),
              n
            )
          }
          function i(e, t, r) {
            var n,
              i,
              s = propertyGroupFactory(h, r),
              a = propertyGroupFactory(l, s),
              o = e.d ? e.d.length : 0,
              l = {}
            for (n = 0; n < o; n += 1)
              (i = n),
                Object.defineProperty(l, e.d[i].nm, { get: ExpressionPropertyInterface(t.d.dataProps[i].p) }),
                t.d.dataProps[n].p.setGroupProperty(a)
            function h(e) {
              return 'Color' === e || 'color' === e
                ? h.color
                : 'Opacity' === e || 'opacity' === e
                ? h.opacity
                : 'Stroke Width' === e || 'stroke width' === e
                ? h.strokeWidth
                : null
            }
            return (
              Object.defineProperties(h, {
                color: { get: ExpressionPropertyInterface(t.c) },
                opacity: { get: ExpressionPropertyInterface(t.o) },
                strokeWidth: { get: ExpressionPropertyInterface(t.w) },
                dash: {
                  get: function () {
                    return l
                  },
                },
                _name: { value: e.nm },
                mn: { value: e.mn },
              }),
              t.c.setGroupProperty(PropertyInterface('Color', s)),
              t.o.setGroupProperty(PropertyInterface('Opacity', s)),
              t.w.setGroupProperty(PropertyInterface('Stroke Width', s)),
              h
            )
          }
          function s(e, t, r) {
            function n(t) {
              return t === e.e.ix || 'End' === t || 'end' === t
                ? n.end
                : t === e.s.ix
                ? n.start
                : t === e.o.ix
                ? n.offset
                : null
            }
            var i = propertyGroupFactory(n, r)
            return (
              (n.propertyIndex = e.ix),
              t.s.setGroupProperty(PropertyInterface('Start', i)),
              t.e.setGroupProperty(PropertyInterface('End', i)),
              t.o.setGroupProperty(PropertyInterface('Offset', i)),
              (n.propertyIndex = e.ix),
              (n.propertyGroup = r),
              Object.defineProperties(n, {
                start: { get: ExpressionPropertyInterface(t.s) },
                end: { get: ExpressionPropertyInterface(t.e) },
                offset: { get: ExpressionPropertyInterface(t.o) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          function a(e, t, r) {
            function n(t) {
              return e.a.ix === t || 'Anchor Point' === t
                ? n.anchorPoint
                : e.o.ix === t || 'Opacity' === t
                ? n.opacity
                : e.p.ix === t || 'Position' === t
                ? n.position
                : e.r.ix === t || 'Rotation' === t || 'ADBE Vector Rotation' === t
                ? n.rotation
                : e.s.ix === t || 'Scale' === t
                ? n.scale
                : (e.sk && e.sk.ix === t) || 'Skew' === t
                ? n.skew
                : (e.sa && e.sa.ix === t) || 'Skew Axis' === t
                ? n.skewAxis
                : null
            }
            var i = propertyGroupFactory(n, r)
            return (
              t.transform.mProps.o.setGroupProperty(PropertyInterface('Opacity', i)),
              t.transform.mProps.p.setGroupProperty(PropertyInterface('Position', i)),
              t.transform.mProps.a.setGroupProperty(PropertyInterface('Anchor Point', i)),
              t.transform.mProps.s.setGroupProperty(PropertyInterface('Scale', i)),
              t.transform.mProps.r.setGroupProperty(PropertyInterface('Rotation', i)),
              t.transform.mProps.sk &&
                (t.transform.mProps.sk.setGroupProperty(PropertyInterface('Skew', i)),
                t.transform.mProps.sa.setGroupProperty(PropertyInterface('Skew Angle', i))),
              t.transform.op.setGroupProperty(PropertyInterface('Opacity', i)),
              Object.defineProperties(n, {
                opacity: { get: ExpressionPropertyInterface(t.transform.mProps.o) },
                position: { get: ExpressionPropertyInterface(t.transform.mProps.p) },
                anchorPoint: { get: ExpressionPropertyInterface(t.transform.mProps.a) },
                scale: { get: ExpressionPropertyInterface(t.transform.mProps.s) },
                rotation: { get: ExpressionPropertyInterface(t.transform.mProps.r) },
                skew: { get: ExpressionPropertyInterface(t.transform.mProps.sk) },
                skewAxis: { get: ExpressionPropertyInterface(t.transform.mProps.sa) },
                _name: { value: e.nm },
              }),
              (n.ty = 'tr'),
              (n.mn = e.mn),
              (n.propertyGroup = r),
              n
            )
          }
          function o(e, t, r) {
            function n(t) {
              return e.p.ix === t ? n.position : e.s.ix === t ? n.size : null
            }
            var i = propertyGroupFactory(n, r)
            n.propertyIndex = e.ix
            var s = 'tm' === t.sh.ty ? t.sh.prop : t.sh
            return (
              s.s.setGroupProperty(PropertyInterface('Size', i)),
              s.p.setGroupProperty(PropertyInterface('Position', i)),
              Object.defineProperties(n, {
                size: { get: ExpressionPropertyInterface(s.s) },
                position: { get: ExpressionPropertyInterface(s.p) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          function l(e, t, r) {
            function n(t) {
              return e.p.ix === t
                ? n.position
                : e.r.ix === t
                ? n.rotation
                : e.pt.ix === t
                ? n.points
                : e.or.ix === t || 'ADBE Vector Star Outer Radius' === t
                ? n.outerRadius
                : e.os.ix === t
                ? n.outerRoundness
                : !e.ir || (e.ir.ix !== t && 'ADBE Vector Star Inner Radius' !== t)
                ? e.is && e.is.ix === t
                  ? n.innerRoundness
                  : null
                : n.innerRadius
            }
            var i = propertyGroupFactory(n, r),
              s = 'tm' === t.sh.ty ? t.sh.prop : t.sh
            return (
              (n.propertyIndex = e.ix),
              s.or.setGroupProperty(PropertyInterface('Outer Radius', i)),
              s.os.setGroupProperty(PropertyInterface('Outer Roundness', i)),
              s.pt.setGroupProperty(PropertyInterface('Points', i)),
              s.p.setGroupProperty(PropertyInterface('Position', i)),
              s.r.setGroupProperty(PropertyInterface('Rotation', i)),
              e.ir &&
                (s.ir.setGroupProperty(PropertyInterface('Inner Radius', i)),
                s.is.setGroupProperty(PropertyInterface('Inner Roundness', i))),
              Object.defineProperties(n, {
                position: { get: ExpressionPropertyInterface(s.p) },
                rotation: { get: ExpressionPropertyInterface(s.r) },
                points: { get: ExpressionPropertyInterface(s.pt) },
                outerRadius: { get: ExpressionPropertyInterface(s.or) },
                outerRoundness: { get: ExpressionPropertyInterface(s.os) },
                innerRadius: { get: ExpressionPropertyInterface(s.ir) },
                innerRoundness: { get: ExpressionPropertyInterface(s.is) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          function h(e, t, r) {
            function n(t) {
              return e.p.ix === t
                ? n.position
                : e.r.ix === t
                ? n.roundness
                : e.s.ix === t || 'Size' === t || 'ADBE Vector Rect Size' === t
                ? n.size
                : null
            }
            var i = propertyGroupFactory(n, r),
              s = 'tm' === t.sh.ty ? t.sh.prop : t.sh
            return (
              (n.propertyIndex = e.ix),
              s.p.setGroupProperty(PropertyInterface('Position', i)),
              s.s.setGroupProperty(PropertyInterface('Size', i)),
              s.r.setGroupProperty(PropertyInterface('Rotation', i)),
              Object.defineProperties(n, {
                position: { get: ExpressionPropertyInterface(s.p) },
                roundness: { get: ExpressionPropertyInterface(s.r) },
                size: { get: ExpressionPropertyInterface(s.s) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          function c(e, t, r) {
            function n(t) {
              return e.r.ix === t || 'Round Corners 1' === t ? n.radius : null
            }
            var i = propertyGroupFactory(n, r),
              s = t
            return (
              (n.propertyIndex = e.ix),
              s.rd.setGroupProperty(PropertyInterface('Radius', i)),
              Object.defineProperties(n, {
                radius: { get: ExpressionPropertyInterface(s.rd) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          function p(e, t, r) {
            function n(t) {
              return e.c.ix === t || 'Copies' === t ? n.copies : e.o.ix === t || 'Offset' === t ? n.offset : null
            }
            var i = propertyGroupFactory(n, r),
              s = t
            return (
              (n.propertyIndex = e.ix),
              s.c.setGroupProperty(PropertyInterface('Copies', i)),
              s.o.setGroupProperty(PropertyInterface('Offset', i)),
              Object.defineProperties(n, {
                copies: { get: ExpressionPropertyInterface(s.c) },
                offset: { get: ExpressionPropertyInterface(s.o) },
                _name: { value: e.nm },
              }),
              (n.mn = e.mn),
              n
            )
          }
          return function (t, r, n) {
            var i
            function s(e) {
              if ('number' == typeof e) return 0 === (e = void 0 === e ? 1 : e) ? n : i[e - 1]
              for (var t = 0, r = i.length; t < r; ) {
                if (i[t]._name === e) return i[t]
                t += 1
              }
              return null
            }
            return (
              (s.propertyGroup = propertyGroupFactory(s, function () {
                return n
              })),
              (i = e(t, r, s.propertyGroup)),
              (s.numProperties = i.length),
              (s._name = 'Contents'),
              s
            )
          }
        })(),
        TextExpressionInterface = function (e) {
          var t, r
          function n(e) {
            return 'ADBE Text Document' === e ? n.sourceText : null
          }
          return (
            Object.defineProperty(n, 'sourceText', {
              get: function () {
                e.textProperty.getValue()
                var n = e.textProperty.currentData.t
                return (
                  n !== t && ((e.textProperty.currentData.t = t), ((r = new String(n)).value = n || new String(n))), r
                )
              },
            }),
            n
          )
        },
        getBlendMode =
          ((blendModeEnums = {
            0: 'source-over',
            1: 'multiply',
            2: 'screen',
            3: 'overlay',
            4: 'darken',
            5: 'lighten',
            6: 'color-dodge',
            7: 'color-burn',
            8: 'hard-light',
            9: 'soft-light',
            10: 'difference',
            11: 'exclusion',
            12: 'hue',
            13: 'saturation',
            14: 'color',
            15: 'luminosity',
          }),
          function (e) {
            return blendModeEnums[e] || ''
          }),
        blendModeEnums
      function SliderEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r)
      }
      function AngleEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r)
      }
      function ColorEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 1, 0, r)
      }
      function PointEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 1, 0, r)
      }
      function LayerIndexEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r)
      }
      function MaskIndexEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r)
      }
      function CheckboxEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r)
      }
      function NoValueEffect() {
        this.p = {}
      }
      function EffectsManager(e, t) {
        var r,
          n = e.ef || []
        this.effectElements = []
        var i,
          s = n.length
        for (r = 0; r < s; r += 1) (i = new GroupEffect(n[r], t)), this.effectElements.push(i)
      }
      function GroupEffect(e, t) {
        this.init(e, t)
      }
      function BaseElement() {}
      function FrameElement() {}
      function _typeof$2(e) {
        return (_typeof$2 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      extendPrototype([DynamicPropertyContainer], GroupEffect),
        (GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties),
        (GroupEffect.prototype.init = function (e, t) {
          var r
          ;(this.data = e), (this.effectElements = []), this.initDynamicPropertyContainer(t)
          var n,
            i = this.data.ef.length,
            s = this.data.ef
          for (r = 0; r < i; r += 1) {
            switch (((n = null), s[r].ty)) {
              case 0:
                n = new SliderEffect(s[r], t, this)
                break
              case 1:
                n = new AngleEffect(s[r], t, this)
                break
              case 2:
                n = new ColorEffect(s[r], t, this)
                break
              case 3:
                n = new PointEffect(s[r], t, this)
                break
              case 4:
              case 7:
                n = new CheckboxEffect(s[r], t, this)
                break
              case 10:
                n = new LayerIndexEffect(s[r], t, this)
                break
              case 11:
                n = new MaskIndexEffect(s[r], t, this)
                break
              case 5:
                n = new EffectsManager(s[r], t, this)
                break
              default:
                n = new NoValueEffect(s[r], t, this)
            }
            n && this.effectElements.push(n)
          }
        }),
        (BaseElement.prototype = {
          checkMasks: function () {
            if (!this.data.hasMask) return !1
            for (var e = 0, t = this.data.masksProperties.length; e < t; ) {
              if ('n' !== this.data.masksProperties[e].mode && !1 !== this.data.masksProperties[e].cl) return !0
              e += 1
            }
            return !1
          },
          initExpressions: function () {
            ;(this.layerInterface = LayerExpressionInterface(this)),
              this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager)
            var e = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface)
            this.layerInterface.registerEffectsInterface(e),
              0 === this.data.ty || this.data.xt
                ? (this.compInterface = CompExpressionInterface(this))
                : 4 === this.data.ty
                ? ((this.layerInterface.shapeInterface = ShapeExpressionInterface(
                    this.shapesData,
                    this.itemsData,
                    this.layerInterface
                  )),
                  (this.layerInterface.content = this.layerInterface.shapeInterface))
                : 5 === this.data.ty &&
                  ((this.layerInterface.textInterface = TextExpressionInterface(this)),
                  (this.layerInterface.text = this.layerInterface.textInterface))
          },
          setBlendMode: function () {
            var e = getBlendMode(this.data.bm)
            ;(this.baseElement || this.layerElement).style['mix-blend-mode'] = e
          },
          initBaseData: function (e, t, r) {
            ;(this.globalData = t),
              (this.comp = r),
              (this.data = e),
              (this.layerId = createElementID()),
              this.data.sr || (this.data.sr = 1),
              (this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties))
          },
          getType: function () {
            return this.type
          },
          sourceRectAtTime: function () {},
        }),
        (FrameElement.prototype = {
          initFrame: function () {
            ;(this._isFirstFrame = !1), (this.dynamicProperties = []), (this._mdf = !1)
          },
          prepareProperties: function (e, t) {
            var r,
              n = this.dynamicProperties.length
            for (r = 0; r < n; r += 1)
              (t || (this._isParent && 'transform' === this.dynamicProperties[r].propType)) &&
                (this.dynamicProperties[r].getValue(),
                this.dynamicProperties[r]._mdf && ((this.globalData._mdf = !0), (this._mdf = !0)))
          },
          addDynamicProperty: function (e) {
            ;-1 === this.dynamicProperties.indexOf(e) && this.dynamicProperties.push(e)
          },
        })
      var FootageInterface =
          ((dataInterfaceFactory = function (e) {
            function t(e) {
              return 'Outline' === e ? t.outlineInterface() : null
            }
            return (
              (t._name = 'Outline'),
              (t.outlineInterface = (function (e) {
                var t = '',
                  r = e.getFootageData()
                function n(e) {
                  if (r[e]) return (t = e), 'object' === _typeof$2((r = r[e])) ? n : r
                  var i = e.indexOf(t)
                  if (-1 !== i) {
                    var s = parseInt(e.substr(i + t.length), 10)
                    return 'object' === _typeof$2((r = r[s])) ? n : r
                  }
                  return ''
                }
                return function () {
                  return (t = ''), (r = e.getFootageData()), n
                }
              })(e)),
              t
            )
          }),
          function (e) {
            function t(e) {
              return 'Data' === e ? t.dataInterface : null
            }
            return (t._name = 'Data'), (t.dataInterface = dataInterfaceFactory(e)), t
          }),
        dataInterfaceFactory
      function FootageElement(e, t, r) {
        this.initFrame(),
          this.initRenderable(),
          (this.assetData = t.getAssetData(e.refId)),
          (this.footageData = t.imageLoader.getAsset(this.assetData)),
          this.initBaseData(e, t, r)
      }
      function AudioElement(e, t, r) {
        this.initFrame(),
          this.initRenderable(),
          (this.assetData = t.getAssetData(e.refId)),
          this.initBaseData(e, t, r),
          (this._isPlaying = !1),
          (this._canPlay = !1)
        var n = this.globalData.getAssetsPath(this.assetData)
        ;(this.audio = this.globalData.audioController.createAudio(n)),
          (this._currentTime = 0),
          this.globalData.audioController.addAudio(this),
          (this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : { _placeholder: !0 })
      }
      function BaseRenderer() {}
      function TransformElement() {}
      function MaskElement(e, t, r) {
        ;(this.data = e),
          (this.element = t),
          (this.globalData = r),
          (this.storedData = []),
          (this.masksProperties = this.data.masksProperties || []),
          (this.maskElement = null)
        var n,
          i,
          s = this.globalData.defs,
          a = this.masksProperties ? this.masksProperties.length : 0
        ;(this.viewData = createSizedArray(a)), (this.solidPath = '')
        var o,
          l,
          h,
          c,
          p,
          u,
          f = this.masksProperties,
          d = 0,
          m = [],
          g = createElementID(),
          y = 'clipPath',
          v = 'clip-path'
        for (n = 0; n < a; n += 1)
          if (
            ((('a' !== f[n].mode && 'n' !== f[n].mode) || f[n].inv || 100 !== f[n].o.k || f[n].o.x) &&
              ((y = 'mask'), (v = 'mask')),
            ('s' !== f[n].mode && 'i' !== f[n].mode) || 0 !== d
              ? (h = null)
              : ((h = createNS('rect')).setAttribute('fill', '#ffffff'),
                h.setAttribute('width', this.element.comp.data.w || 0),
                h.setAttribute('height', this.element.comp.data.h || 0),
                m.push(h)),
            (i = createNS('path')),
            'n' === f[n].mode)
          )
            (this.viewData[n] = {
              op: PropertyFactory.getProp(this.element, f[n].o, 0, 0.01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, f[n], 3),
              elem: i,
              lastPath: '',
            }),
              s.appendChild(i)
          else {
            var b
            if (
              ((d += 1),
              i.setAttribute('fill', 's' === f[n].mode ? '#000000' : '#ffffff'),
              i.setAttribute('clip-rule', 'nonzero'),
              0 !== f[n].x.k
                ? ((y = 'mask'),
                  (v = 'mask'),
                  (u = PropertyFactory.getProp(this.element, f[n].x, 0, null, this.element)),
                  (b = createElementID()),
                  (c = createNS('filter')).setAttribute('id', b),
                  (p = createNS('feMorphology')).setAttribute('operator', 'erode'),
                  p.setAttribute('in', 'SourceGraphic'),
                  p.setAttribute('radius', '0'),
                  c.appendChild(p),
                  s.appendChild(c),
                  i.setAttribute('stroke', 's' === f[n].mode ? '#000000' : '#ffffff'))
                : ((p = null), (u = null)),
              (this.storedData[n] = {
                elem: i,
                x: u,
                expan: p,
                lastPath: '',
                lastOperator: '',
                filterId: b,
                lastRadius: 0,
              }),
              'i' === f[n].mode)
            ) {
              l = m.length
              var E = createNS('g')
              for (o = 0; o < l; o += 1) E.appendChild(m[o])
              var S = createNS('mask')
              S.setAttribute('mask-type', 'alpha'),
                S.setAttribute('id', g + '_' + d),
                S.appendChild(i),
                s.appendChild(S),
                E.setAttribute('mask', 'url(' + getLocationHref() + '#' + g + '_' + d + ')'),
                (m.length = 0),
                m.push(E)
            } else m.push(i)
            f[n].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
              (this.viewData[n] = {
                elem: i,
                lastPath: '',
                op: PropertyFactory.getProp(this.element, f[n].o, 0, 0.01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, f[n], 3),
                invRect: h,
              }),
              this.viewData[n].prop.k || this.drawPath(f[n], this.viewData[n].prop.v, this.viewData[n])
          }
        for (this.maskElement = createNS(y), a = m.length, n = 0; n < a; n += 1) this.maskElement.appendChild(m[n])
        d > 0 &&
          (this.maskElement.setAttribute('id', g),
          this.element.maskedElement.setAttribute(v, 'url(' + getLocationHref() + '#' + g + ')'),
          s.appendChild(this.maskElement)),
          this.viewData.length && this.element.addRenderableComponent(this)
      }
      ;(FootageElement.prototype.prepareFrame = function () {}),
        extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement),
        (FootageElement.prototype.getBaseElement = function () {
          return null
        }),
        (FootageElement.prototype.renderFrame = function () {}),
        (FootageElement.prototype.destroy = function () {}),
        (FootageElement.prototype.initExpressions = function () {
          this.layerInterface = FootageInterface(this)
        }),
        (FootageElement.prototype.getFootageData = function () {
          return this.footageData
        }),
        (AudioElement.prototype.prepareFrame = function (e) {
          if ((this.prepareRenderableFrame(e, !0), this.prepareProperties(e, !0), this.tm._placeholder))
            this._currentTime = e / this.data.sr
          else {
            var t = this.tm.v
            this._currentTime = t
          }
        }),
        extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement),
        (AudioElement.prototype.renderFrame = function () {
          this.isInRange &&
            this._canPlay &&
            (this._isPlaying
              ? (!this.audio.playing() ||
                  Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1) &&
                this.audio.seek(this._currentTime / this.globalData.frameRate)
              : (this.audio.play(),
                this.audio.seek(this._currentTime / this.globalData.frameRate),
                (this._isPlaying = !0)))
        }),
        (AudioElement.prototype.show = function () {}),
        (AudioElement.prototype.hide = function () {
          this.audio.pause(), (this._isPlaying = !1)
        }),
        (AudioElement.prototype.pause = function () {
          this.audio.pause(), (this._isPlaying = !1), (this._canPlay = !1)
        }),
        (AudioElement.prototype.resume = function () {
          this._canPlay = !0
        }),
        (AudioElement.prototype.setRate = function (e) {
          this.audio.rate(e)
        }),
        (AudioElement.prototype.volume = function (e) {
          this.audio.volume(e)
        }),
        (AudioElement.prototype.getBaseElement = function () {
          return null
        }),
        (AudioElement.prototype.destroy = function () {}),
        (AudioElement.prototype.sourceRectAtTime = function () {}),
        (AudioElement.prototype.initExpressions = function () {}),
        (BaseRenderer.prototype.checkLayers = function (e) {
          var t,
            r,
            n = this.layers.length
          for (this.completeLayers = !0, t = n - 1; t >= 0; t -= 1)
            this.elements[t] ||
              ((r = this.layers[t]).ip - r.st <= e - this.layers[t].st &&
                r.op - r.st > e - this.layers[t].st &&
                this.buildItem(t)),
              (this.completeLayers = !!this.elements[t] && this.completeLayers)
          this.checkPendingElements()
        }),
        (BaseRenderer.prototype.createItem = function (e) {
          switch (e.ty) {
            case 2:
              return this.createImage(e)
            case 0:
              return this.createComp(e)
            case 1:
              return this.createSolid(e)
            default:
              return this.createNull(e)
            case 4:
              return this.createShape(e)
            case 5:
              return this.createText(e)
            case 6:
              return this.createAudio(e)
            case 13:
              return this.createCamera(e)
            case 15:
              return this.createFootage(e)
          }
        }),
        (BaseRenderer.prototype.createCamera = function () {
          throw new Error("You're using a 3d camera. Try the html renderer.")
        }),
        (BaseRenderer.prototype.createAudio = function (e) {
          return new AudioElement(e, this.globalData, this)
        }),
        (BaseRenderer.prototype.createFootage = function (e) {
          return new FootageElement(e, this.globalData, this)
        }),
        (BaseRenderer.prototype.buildAllItems = function () {
          var e,
            t = this.layers.length
          for (e = 0; e < t; e += 1) this.buildItem(e)
          this.checkPendingElements()
        }),
        (BaseRenderer.prototype.includeLayers = function (e) {
          var t
          this.completeLayers = !1
          var r,
            n = e.length,
            i = this.layers.length
          for (t = 0; t < n; t += 1)
            for (r = 0; r < i; ) {
              if (this.layers[r].id === e[t].id) {
                this.layers[r] = e[t]
                break
              }
              r += 1
            }
        }),
        (BaseRenderer.prototype.setProjectInterface = function (e) {
          this.globalData.projectInterface = e
        }),
        (BaseRenderer.prototype.initItems = function () {
          this.globalData.progressiveLoad || this.buildAllItems()
        }),
        (BaseRenderer.prototype.buildElementParenting = function (e, t, r) {
          for (var n = this.elements, i = this.layers, s = 0, a = i.length; s < a; )
            i[s].ind == t &&
              (n[s] && !0 !== n[s]
                ? (r.push(n[s]),
                  n[s].setAsParent(),
                  void 0 !== i[s].parent ? this.buildElementParenting(e, i[s].parent, r) : e.setHierarchy(r))
                : (this.buildItem(s), this.addPendingElement(e))),
              (s += 1)
        }),
        (BaseRenderer.prototype.addPendingElement = function (e) {
          this.pendingElements.push(e)
        }),
        (BaseRenderer.prototype.searchExtraCompositions = function (e) {
          var t,
            r = e.length
          for (t = 0; t < r; t += 1)
            if (e[t].xt) {
              var n = this.createComp(e[t])
              n.initExpressions(), this.globalData.projectInterface.registerComposition(n)
            }
        }),
        (BaseRenderer.prototype.setupGlobalData = function (e, t) {
          ;(this.globalData.fontManager = new FontManager()),
            this.globalData.fontManager.addChars(e.chars),
            this.globalData.fontManager.addFonts(e.fonts, t),
            (this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem)),
            (this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem)),
            (this.globalData.imageLoader = this.animationItem.imagePreloader),
            (this.globalData.audioController = this.animationItem.audioController),
            (this.globalData.frameId = 0),
            (this.globalData.frameRate = e.fr),
            (this.globalData.nm = e.nm),
            (this.globalData.compSize = { w: e.w, h: e.h })
        }),
        (TransformElement.prototype = {
          initTransform: function () {
            ;(this.finalTransform = {
              mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 },
              _matMdf: !1,
              _opMdf: !1,
              mat: new Matrix(),
            }),
              this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
              this.data.ty
          },
          renderTransform: function () {
            if (
              ((this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame),
              (this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame),
              this.hierarchy)
            ) {
              var e,
                t = this.finalTransform.mat,
                r = 0,
                n = this.hierarchy.length
              if (!this.finalTransform._matMdf)
                for (; r < n; ) {
                  if (this.hierarchy[r].finalTransform.mProp._mdf) {
                    this.finalTransform._matMdf = !0
                    break
                  }
                  r += 1
                }
              if (this.finalTransform._matMdf)
                for (e = this.finalTransform.mProp.v.props, t.cloneFromProps(e), r = 0; r < n; r += 1)
                  (e = this.hierarchy[r].finalTransform.mProp.v.props),
                    t.transform(
                      e[0],
                      e[1],
                      e[2],
                      e[3],
                      e[4],
                      e[5],
                      e[6],
                      e[7],
                      e[8],
                      e[9],
                      e[10],
                      e[11],
                      e[12],
                      e[13],
                      e[14],
                      e[15]
                    )
            }
          },
          globalToLocal: function (e) {
            var t = []
            t.push(this.finalTransform)
            for (var r, n = !0, i = this.comp; n; )
              i.finalTransform ? (i.data.hasMask && t.splice(0, 0, i.finalTransform), (i = i.comp)) : (n = !1)
            var s,
              a = t.length
            for (r = 0; r < a; r += 1) (s = t[r].mat.applyToPointArray(0, 0, 0)), (e = [e[0] - s[0], e[1] - s[1], 0])
            return e
          },
          mHelper: new Matrix(),
        }),
        (MaskElement.prototype.getMaskProperty = function (e) {
          return this.viewData[e].prop
        }),
        (MaskElement.prototype.renderFrame = function (e) {
          var t,
            r = this.element.finalTransform.mat,
            n = this.masksProperties.length
          for (t = 0; t < n; t += 1)
            if (
              ((this.viewData[t].prop._mdf || e) &&
                this.drawPath(this.masksProperties[t], this.viewData[t].prop.v, this.viewData[t]),
              (this.viewData[t].op._mdf || e) &&
                this.viewData[t].elem.setAttribute('fill-opacity', this.viewData[t].op.v),
              'n' !== this.masksProperties[t].mode &&
                (this.viewData[t].invRect &&
                  (this.element.finalTransform.mProp._mdf || e) &&
                  this.viewData[t].invRect.setAttribute('transform', r.getInverseMatrix().to2dCSS()),
                this.storedData[t].x && (this.storedData[t].x._mdf || e)))
            ) {
              var i = this.storedData[t].expan
              this.storedData[t].x.v < 0
                ? ('erode' !== this.storedData[t].lastOperator &&
                    ((this.storedData[t].lastOperator = 'erode'),
                    this.storedData[t].elem.setAttribute(
                      'filter',
                      'url(' + getLocationHref() + '#' + this.storedData[t].filterId + ')'
                    )),
                  i.setAttribute('radius', -this.storedData[t].x.v))
                : ('dilate' !== this.storedData[t].lastOperator &&
                    ((this.storedData[t].lastOperator = 'dilate'),
                    this.storedData[t].elem.setAttribute('filter', null)),
                  this.storedData[t].elem.setAttribute('stroke-width', 2 * this.storedData[t].x.v))
            }
        }),
        (MaskElement.prototype.getMaskelement = function () {
          return this.maskElement
        }),
        (MaskElement.prototype.createLayerSolidPath = function () {
          var e = 'M0,0 '
          return (
            (e += ' h' + this.globalData.compSize.w),
            (e += ' v' + this.globalData.compSize.h),
            (e += ' h-' + this.globalData.compSize.w),
            (e += ' v-' + this.globalData.compSize.h + ' ')
          )
        }),
        (MaskElement.prototype.drawPath = function (e, t, r) {
          var n,
            i,
            s = ' M' + t.v[0][0] + ',' + t.v[0][1]
          for (i = t._length, n = 1; n < i; n += 1)
            s +=
              ' C' +
              t.o[n - 1][0] +
              ',' +
              t.o[n - 1][1] +
              ' ' +
              t.i[n][0] +
              ',' +
              t.i[n][1] +
              ' ' +
              t.v[n][0] +
              ',' +
              t.v[n][1]
          if (
            (t.c &&
              i > 1 &&
              (s +=
                ' C' +
                t.o[n - 1][0] +
                ',' +
                t.o[n - 1][1] +
                ' ' +
                t.i[0][0] +
                ',' +
                t.i[0][1] +
                ' ' +
                t.v[0][0] +
                ',' +
                t.v[0][1]),
            r.lastPath !== s)
          ) {
            var a = ''
            r.elem && (t.c && (a = e.inv ? this.solidPath + s : s), r.elem.setAttribute('d', a)), (r.lastPath = s)
          }
        }),
        (MaskElement.prototype.destroy = function () {
          ;(this.element = null),
            (this.globalData = null),
            (this.maskElement = null),
            (this.data = null),
            (this.masksProperties = null)
        })
      var filtersFactory = (function () {
          var e = {
            createFilter: function (e, t) {
              var r = createNS('filter')
              return (
                r.setAttribute('id', e),
                !0 !== t &&
                  (r.setAttribute('filterUnits', 'objectBoundingBox'),
                  r.setAttribute('x', '0%'),
                  r.setAttribute('y', '0%'),
                  r.setAttribute('width', '100%'),
                  r.setAttribute('height', '100%')),
                r
              )
            },
            createAlphaToLuminanceFilter: function () {
              var e = createNS('feColorMatrix')
              return (
                e.setAttribute('type', 'matrix'),
                e.setAttribute('color-interpolation-filters', 'sRGB'),
                e.setAttribute('values', '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1'),
                e
              )
            },
          }
          return e
        })(),
        featureSupport = (function () {
          var e = { maskType: !0 }
          return (
            (/MSIE 10/i.test(navigator.userAgent) ||
              /MSIE 9/i.test(navigator.userAgent) ||
              /rv:11.0/i.test(navigator.userAgent) ||
              /Edge\/\d./i.test(navigator.userAgent)) &&
              (e.maskType = !1),
            e
          )
        })()
      function SVGTintFilter(e, t) {
        this.filterManager = t
        var r = createNS('feColorMatrix')
        if (
          (r.setAttribute('type', 'matrix'),
          r.setAttribute('color-interpolation-filters', 'linearRGB'),
          r.setAttribute(
            'values',
            '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'
          ),
          r.setAttribute('result', 'f1'),
          e.appendChild(r),
          (r = createNS('feColorMatrix')).setAttribute('type', 'matrix'),
          r.setAttribute('color-interpolation-filters', 'sRGB'),
          r.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'),
          r.setAttribute('result', 'f2'),
          e.appendChild(r),
          (this.matrixFilter = r),
          100 !== t.effectElements[2].p.v || t.effectElements[2].p.k)
        ) {
          var n,
            i = createNS('feMerge')
          e.appendChild(i),
            (n = createNS('feMergeNode')).setAttribute('in', 'SourceGraphic'),
            i.appendChild(n),
            (n = createNS('feMergeNode')).setAttribute('in', 'f2'),
            i.appendChild(n)
        }
      }
      function SVGFillFilter(e, t) {
        this.filterManager = t
        var r = createNS('feColorMatrix')
        r.setAttribute('type', 'matrix'),
          r.setAttribute('color-interpolation-filters', 'sRGB'),
          r.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'),
          e.appendChild(r),
          (this.matrixFilter = r)
      }
      function SVGStrokeEffect(e, t) {
        ;(this.initialized = !1), (this.filterManager = t), (this.elem = e), (this.paths = [])
      }
      function SVGTritoneFilter(e, t) {
        this.filterManager = t
        var r = createNS('feColorMatrix')
        r.setAttribute('type', 'matrix'),
          r.setAttribute('color-interpolation-filters', 'linearRGB'),
          r.setAttribute(
            'values',
            '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'
          ),
          r.setAttribute('result', 'f1'),
          e.appendChild(r)
        var n = createNS('feComponentTransfer')
        n.setAttribute('color-interpolation-filters', 'sRGB'), e.appendChild(n), (this.matrixFilter = n)
        var i = createNS('feFuncR')
        i.setAttribute('type', 'table'), n.appendChild(i), (this.feFuncR = i)
        var s = createNS('feFuncG')
        s.setAttribute('type', 'table'), n.appendChild(s), (this.feFuncG = s)
        var a = createNS('feFuncB')
        a.setAttribute('type', 'table'), n.appendChild(a), (this.feFuncB = a)
      }
      function SVGProLevelsFilter(e, t) {
        this.filterManager = t
        var r = this.filterManager.effectElements,
          n = createNS('feComponentTransfer')
        ;(r[10].p.k ||
          0 !== r[10].p.v ||
          r[11].p.k ||
          1 !== r[11].p.v ||
          r[12].p.k ||
          1 !== r[12].p.v ||
          r[13].p.k ||
          0 !== r[13].p.v ||
          r[14].p.k ||
          1 !== r[14].p.v) &&
          (this.feFuncR = this.createFeFunc('feFuncR', n)),
          (r[17].p.k ||
            0 !== r[17].p.v ||
            r[18].p.k ||
            1 !== r[18].p.v ||
            r[19].p.k ||
            1 !== r[19].p.v ||
            r[20].p.k ||
            0 !== r[20].p.v ||
            r[21].p.k ||
            1 !== r[21].p.v) &&
            (this.feFuncG = this.createFeFunc('feFuncG', n)),
          (r[24].p.k ||
            0 !== r[24].p.v ||
            r[25].p.k ||
            1 !== r[25].p.v ||
            r[26].p.k ||
            1 !== r[26].p.v ||
            r[27].p.k ||
            0 !== r[27].p.v ||
            r[28].p.k ||
            1 !== r[28].p.v) &&
            (this.feFuncB = this.createFeFunc('feFuncB', n)),
          (r[31].p.k ||
            0 !== r[31].p.v ||
            r[32].p.k ||
            1 !== r[32].p.v ||
            r[33].p.k ||
            1 !== r[33].p.v ||
            r[34].p.k ||
            0 !== r[34].p.v ||
            r[35].p.k ||
            1 !== r[35].p.v) &&
            (this.feFuncA = this.createFeFunc('feFuncA', n)),
          (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) &&
            (n.setAttribute('color-interpolation-filters', 'sRGB'),
            e.appendChild(n),
            (n = createNS('feComponentTransfer'))),
          (r[3].p.k ||
            0 !== r[3].p.v ||
            r[4].p.k ||
            1 !== r[4].p.v ||
            r[5].p.k ||
            1 !== r[5].p.v ||
            r[6].p.k ||
            0 !== r[6].p.v ||
            r[7].p.k ||
            1 !== r[7].p.v) &&
            (n.setAttribute('color-interpolation-filters', 'sRGB'),
            e.appendChild(n),
            (this.feFuncRComposed = this.createFeFunc('feFuncR', n)),
            (this.feFuncGComposed = this.createFeFunc('feFuncG', n)),
            (this.feFuncBComposed = this.createFeFunc('feFuncB', n)))
      }
      function SVGDropShadowEffect(e, t) {
        var r = t.container.globalData.renderConfig.filterSize
        e.setAttribute('x', r.x),
          e.setAttribute('y', r.y),
          e.setAttribute('width', r.width),
          e.setAttribute('height', r.height),
          (this.filterManager = t)
        var n = createNS('feGaussianBlur')
        n.setAttribute('in', 'SourceAlpha'),
          n.setAttribute('result', 'drop_shadow_1'),
          n.setAttribute('stdDeviation', '0'),
          (this.feGaussianBlur = n),
          e.appendChild(n)
        var i = createNS('feOffset')
        i.setAttribute('dx', '25'),
          i.setAttribute('dy', '0'),
          i.setAttribute('in', 'drop_shadow_1'),
          i.setAttribute('result', 'drop_shadow_2'),
          (this.feOffset = i),
          e.appendChild(i)
        var s = createNS('feFlood')
        s.setAttribute('flood-color', '#00ff00'),
          s.setAttribute('flood-opacity', '1'),
          s.setAttribute('result', 'drop_shadow_3'),
          (this.feFlood = s),
          e.appendChild(s)
        var a = createNS('feComposite')
        a.setAttribute('in', 'drop_shadow_3'),
          a.setAttribute('in2', 'drop_shadow_2'),
          a.setAttribute('operator', 'in'),
          a.setAttribute('result', 'drop_shadow_4'),
          e.appendChild(a)
        var o,
          l = createNS('feMerge')
        e.appendChild(l),
          (o = createNS('feMergeNode')),
          l.appendChild(o),
          (o = createNS('feMergeNode')).setAttribute('in', 'SourceGraphic'),
          (this.feMergeNode = o),
          (this.feMerge = l),
          (this.originalNodeAdded = !1),
          l.appendChild(o)
      }
      ;(SVGTintFilter.prototype.renderFrame = function (e) {
        if (e || this.filterManager._mdf) {
          var t = this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            n = this.filterManager.effectElements[2].p.v / 100
          this.matrixFilter.setAttribute(
            'values',
            r[0] -
              t[0] +
              ' 0 0 0 ' +
              t[0] +
              ' ' +
              (r[1] - t[1]) +
              ' 0 0 0 ' +
              t[1] +
              ' ' +
              (r[2] - t[2]) +
              ' 0 0 0 ' +
              t[2] +
              ' 0 0 0 ' +
              n +
              ' 0'
          )
        }
      }),
        (SVGFillFilter.prototype.renderFrame = function (e) {
          if (e || this.filterManager._mdf) {
            var t = this.filterManager.effectElements[2].p.v,
              r = this.filterManager.effectElements[6].p.v
            this.matrixFilter.setAttribute(
              'values',
              '0 0 0 0 ' + t[0] + ' 0 0 0 0 ' + t[1] + ' 0 0 0 0 ' + t[2] + ' 0 0 0 ' + r + ' 0'
            )
          }
        }),
        (SVGStrokeEffect.prototype.initialize = function () {
          var e,
            t,
            r,
            n,
            i = this.elem.layerElement.children || this.elem.layerElement.childNodes
          for (
            1 === this.filterManager.effectElements[1].p.v
              ? ((n = this.elem.maskManager.masksProperties.length), (r = 0))
              : (n = 1 + (r = this.filterManager.effectElements[0].p.v - 1)),
              (t = createNS('g')).setAttribute('fill', 'none'),
              t.setAttribute('stroke-linecap', 'round'),
              t.setAttribute('stroke-dashoffset', 1);
            r < n;
            r += 1
          )
            (e = createNS('path')), t.appendChild(e), this.paths.push({ p: e, m: r })
          if (3 === this.filterManager.effectElements[10].p.v) {
            var s = createNS('mask'),
              a = createElementID()
            s.setAttribute('id', a),
              s.setAttribute('mask-type', 'alpha'),
              s.appendChild(t),
              this.elem.globalData.defs.appendChild(s)
            var o = createNS('g')
            for (o.setAttribute('mask', 'url(' + getLocationHref() + '#' + a + ')'); i[0]; ) o.appendChild(i[0])
            this.elem.layerElement.appendChild(o), (this.masker = s), t.setAttribute('stroke', '#fff')
          } else if (
            1 === this.filterManager.effectElements[10].p.v ||
            2 === this.filterManager.effectElements[10].p.v
          ) {
            if (2 === this.filterManager.effectElements[10].p.v)
              for (i = this.elem.layerElement.children || this.elem.layerElement.childNodes; i.length; )
                this.elem.layerElement.removeChild(i[0])
            this.elem.layerElement.appendChild(t),
              this.elem.layerElement.removeAttribute('mask'),
              t.setAttribute('stroke', '#fff')
          }
          ;(this.initialized = !0), (this.pathMasker = t)
        }),
        (SVGStrokeEffect.prototype.renderFrame = function (e) {
          var t
          this.initialized || this.initialize()
          var r,
            n,
            i = this.paths.length
          for (t = 0; t < i; t += 1)
            if (
              -1 !== this.paths[t].m &&
              ((r = this.elem.maskManager.viewData[this.paths[t].m]),
              (n = this.paths[t].p),
              (e || this.filterManager._mdf || r.prop._mdf) && n.setAttribute('d', r.lastPath),
              e ||
                this.filterManager.effectElements[9].p._mdf ||
                this.filterManager.effectElements[4].p._mdf ||
                this.filterManager.effectElements[7].p._mdf ||
                this.filterManager.effectElements[8].p._mdf ||
                r.prop._mdf)
            ) {
              var s
              if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                var a =
                    0.01 * Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                  o =
                    0.01 * Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                  l = n.getTotalLength()
                s = '0 0 0 ' + l * a + ' '
                var h,
                  c = l * (o - a),
                  p =
                    1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * 0.01,
                  u = Math.floor(c / p)
                for (h = 0; h < u; h += 1)
                  s +=
                    '1 ' +
                    2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * 0.01 +
                    ' '
                s += '0 ' + 10 * l + ' 0 0'
              } else
                s =
                  '1 ' + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * 0.01
              n.setAttribute('stroke-dasharray', s)
            }
          if (
            ((e || this.filterManager.effectElements[4].p._mdf) &&
              this.pathMasker.setAttribute('stroke-width', 2 * this.filterManager.effectElements[4].p.v),
            (e || this.filterManager.effectElements[6].p._mdf) &&
              this.pathMasker.setAttribute('opacity', this.filterManager.effectElements[6].p.v),
            (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) &&
              (e || this.filterManager.effectElements[3].p._mdf))
          ) {
            var f = this.filterManager.effectElements[3].p.v
            this.pathMasker.setAttribute(
              'stroke',
              'rgb(' + bmFloor(255 * f[0]) + ',' + bmFloor(255 * f[1]) + ',' + bmFloor(255 * f[2]) + ')'
            )
          }
        }),
        (SVGTritoneFilter.prototype.renderFrame = function (e) {
          if (e || this.filterManager._mdf) {
            var t = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              n = this.filterManager.effectElements[2].p.v,
              i = n[0] + ' ' + r[0] + ' ' + t[0],
              s = n[1] + ' ' + r[1] + ' ' + t[1],
              a = n[2] + ' ' + r[2] + ' ' + t[2]
            this.feFuncR.setAttribute('tableValues', i),
              this.feFuncG.setAttribute('tableValues', s),
              this.feFuncB.setAttribute('tableValues', a)
          }
        }),
        (SVGProLevelsFilter.prototype.createFeFunc = function (e, t) {
          var r = createNS(e)
          return r.setAttribute('type', 'table'), t.appendChild(r), r
        }),
        (SVGProLevelsFilter.prototype.getTableValue = function (e, t, r, n, i) {
          for (
            var s,
              a,
              o = 0,
              l = Math.min(e, t),
              h = Math.max(e, t),
              c = Array.call(null, { length: 256 }),
              p = 0,
              u = i - n,
              f = t - e;
            o <= 256;

          )
            (a =
              (s = o / 256) <= l ? (f < 0 ? i : n) : s >= h ? (f < 0 ? n : i) : n + u * Math.pow((s - e) / f, 1 / r)),
              (c[p] = a),
              (p += 1),
              (o += 256 / 255)
          return c.join(' ')
        }),
        (SVGProLevelsFilter.prototype.renderFrame = function (e) {
          if (e || this.filterManager._mdf) {
            var t,
              r = this.filterManager.effectElements
            this.feFuncRComposed &&
              (e || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) &&
              ((t = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v)),
              this.feFuncRComposed.setAttribute('tableValues', t),
              this.feFuncGComposed.setAttribute('tableValues', t),
              this.feFuncBComposed.setAttribute('tableValues', t)),
              this.feFuncR &&
                (e || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) &&
                ((t = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v)),
                this.feFuncR.setAttribute('tableValues', t)),
              this.feFuncG &&
                (e || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) &&
                ((t = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v)),
                this.feFuncG.setAttribute('tableValues', t)),
              this.feFuncB &&
                (e || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) &&
                ((t = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v)),
                this.feFuncB.setAttribute('tableValues', t)),
              this.feFuncA &&
                (e || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) &&
                ((t = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v)),
                this.feFuncA.setAttribute('tableValues', t))
          }
        }),
        (SVGDropShadowEffect.prototype.renderFrame = function (e) {
          if (e || this.filterManager._mdf) {
            if (
              ((e || this.filterManager.effectElements[4].p._mdf) &&
                this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4),
              e || this.filterManager.effectElements[0].p._mdf)
            ) {
              var t = this.filterManager.effectElements[0].p.v
              this.feFlood.setAttribute(
                'flood-color',
                rgbToHex(Math.round(255 * t[0]), Math.round(255 * t[1]), Math.round(255 * t[2]))
              )
            }
            if (
              ((e || this.filterManager.effectElements[1].p._mdf) &&
                this.feFlood.setAttribute('flood-opacity', this.filterManager.effectElements[1].p.v / 255),
              e || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf)
            ) {
              var r = this.filterManager.effectElements[3].p.v,
                n = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                i = r * Math.cos(n),
                s = r * Math.sin(n)
              this.feOffset.setAttribute('dx', i), this.feOffset.setAttribute('dy', s)
            }
          }
        })
      var _svgMatteSymbols = []
      function SVGMatte3Effect(e, t, r) {
        ;(this.initialized = !1),
          (this.filterManager = t),
          (this.filterElem = e),
          (this.elem = r),
          (r.matteElement = createNS('g')),
          r.matteElement.appendChild(r.layerElement),
          r.matteElement.appendChild(r.transformedElement),
          (r.baseElement = r.matteElement)
      }
      function SVGGaussianBlurEffect(e, t) {
        e.setAttribute('x', '-100%'),
          e.setAttribute('y', '-100%'),
          e.setAttribute('width', '300%'),
          e.setAttribute('height', '300%'),
          (this.filterManager = t)
        var r = createNS('feGaussianBlur')
        e.appendChild(r), (this.feGaussianBlur = r)
      }
      ;(SVGMatte3Effect.prototype.findSymbol = function (e) {
        for (var t = 0, r = _svgMatteSymbols.length; t < r; ) {
          if (_svgMatteSymbols[t] === e) return _svgMatteSymbols[t]
          t += 1
        }
        return null
      }),
        (SVGMatte3Effect.prototype.replaceInParent = function (e, t) {
          var r = e.layerElement.parentNode
          if (r) {
            for (var n, i = r.children, s = 0, a = i.length; s < a && i[s] !== e.layerElement; ) s += 1
            s <= a - 2 && (n = i[s + 1])
            var o = createNS('use')
            o.setAttribute('href', '#' + t), n ? r.insertBefore(o, n) : r.appendChild(o)
          }
        }),
        (SVGMatte3Effect.prototype.setElementAsMask = function (e, t) {
          if (!this.findSymbol(t)) {
            var r = createElementID(),
              n = createNS('mask')
            n.setAttribute('id', t.layerId), n.setAttribute('mask-type', 'alpha'), _svgMatteSymbols.push(t)
            var i = e.globalData.defs
            i.appendChild(n)
            var s = createNS('symbol')
            s.setAttribute('id', r), this.replaceInParent(t, r), s.appendChild(t.layerElement), i.appendChild(s)
            var a = createNS('use')
            a.setAttribute('href', '#' + r), n.appendChild(a), (t.data.hd = !1), t.show()
          }
          e.setMatte(t.layerId)
        }),
        (SVGMatte3Effect.prototype.initialize = function () {
          for (
            var e = this.filterManager.effectElements[0].p.v, t = this.elem.comp.elements, r = 0, n = t.length;
            r < n;

          )
            t[r] && t[r].data.ind === e && this.setElementAsMask(this.elem, t[r]), (r += 1)
          this.initialized = !0
        }),
        (SVGMatte3Effect.prototype.renderFrame = function () {
          this.initialized || this.initialize()
        }),
        (SVGGaussianBlurEffect.prototype.renderFrame = function (e) {
          if (e || this.filterManager._mdf) {
            var t = 0.3 * this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              n = 3 == r ? 0 : t,
              i = 2 == r ? 0 : t
            this.feGaussianBlur.setAttribute('stdDeviation', n + ' ' + i)
            var s = 1 == this.filterManager.effectElements[2].p.v ? 'wrap' : 'duplicate'
            this.feGaussianBlur.setAttribute('edgeMode', s)
          }
        })
      var registeredEffects = {}
      function SVGEffects(e) {
        var t,
          r,
          n = e.data.ef ? e.data.ef.length : 0,
          i = createElementID(),
          s = filtersFactory.createFilter(i, !0),
          a = 0
        for (this.filters = [], t = 0; t < n; t += 1) {
          r = null
          var o = e.data.ef[t].ty
          registeredEffects[o] &&
            ((r = new (0, registeredEffects[o].effect)(s, e.effectsManager.effectElements[t], e)),
            registeredEffects[o].countsAsEffect && (a += 1)),
            20 === e.data.ef[t].ty
              ? ((a += 1), (r = new SVGTintFilter(s, e.effectsManager.effectElements[t])))
              : 21 === e.data.ef[t].ty
              ? ((a += 1), (r = new SVGFillFilter(s, e.effectsManager.effectElements[t])))
              : 22 === e.data.ef[t].ty
              ? (r = new SVGStrokeEffect(e, e.effectsManager.effectElements[t]))
              : 23 === e.data.ef[t].ty
              ? ((a += 1), (r = new SVGTritoneFilter(s, e.effectsManager.effectElements[t])))
              : 24 === e.data.ef[t].ty
              ? ((a += 1), (r = new SVGProLevelsFilter(s, e.effectsManager.effectElements[t])))
              : 25 === e.data.ef[t].ty
              ? ((a += 1), (r = new SVGDropShadowEffect(s, e.effectsManager.effectElements[t])))
              : 28 === e.data.ef[t].ty
              ? (r = new SVGMatte3Effect(s, e.effectsManager.effectElements[t], e))
              : 29 === e.data.ef[t].ty &&
                ((a += 1), (r = new SVGGaussianBlurEffect(s, e.effectsManager.effectElements[t]))),
            r && this.filters.push(r)
        }
        a &&
          (e.globalData.defs.appendChild(s),
          e.layerElement.setAttribute('filter', 'url(' + getLocationHref() + '#' + i + ')')),
          this.filters.length && e.addRenderableComponent(this)
      }
      function registerEffect(e, t, r) {
        registeredEffects[e] = { effect: t, countsAsEffect: r }
      }
      function SVGBaseElement() {}
      function HierarchyElement() {}
      function RenderableDOMElement() {}
      function IImageElement(e, t, r) {
        ;(this.assetData = t.getAssetData(e.refId)),
          this.initElement(e, t, r),
          (this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h })
      }
      function ProcessedElement(e, t) {
        ;(this.elem = e), (this.pos = t)
      }
      function IShapeElement() {}
      ;(SVGEffects.prototype.renderFrame = function (e) {
        var t,
          r = this.filters.length
        for (t = 0; t < r; t += 1) this.filters[t].renderFrame(e)
      }),
        (SVGBaseElement.prototype = {
          initRendererElement: function () {
            this.layerElement = createNS('g')
          },
          createContainerElements: function () {
            ;(this.matteElement = createNS('g')),
              (this.transformedElement = this.layerElement),
              (this.maskedElement = this.layerElement),
              (this._sizeChanged = !1)
            var e,
              t,
              r,
              n = null
            if (this.data.td) {
              if (3 == this.data.td || 1 == this.data.td) {
                var i = createNS('mask')
                i.setAttribute('id', this.layerId),
                  i.setAttribute('mask-type', 3 == this.data.td ? 'luminance' : 'alpha'),
                  i.appendChild(this.layerElement),
                  (n = i),
                  this.globalData.defs.appendChild(i),
                  featureSupport.maskType ||
                    1 != this.data.td ||
                    (i.setAttribute('mask-type', 'luminance'),
                    (e = createElementID()),
                    (t = filtersFactory.createFilter(e)),
                    this.globalData.defs.appendChild(t),
                    t.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                    (r = createNS('g')).appendChild(this.layerElement),
                    (n = r),
                    i.appendChild(r),
                    r.setAttribute('filter', 'url(' + getLocationHref() + '#' + e + ')'))
              } else if (2 == this.data.td) {
                var s = createNS('mask')
                s.setAttribute('id', this.layerId), s.setAttribute('mask-type', 'alpha')
                var a = createNS('g')
                s.appendChild(a), (e = createElementID()), (t = filtersFactory.createFilter(e))
                var o = createNS('feComponentTransfer')
                o.setAttribute('in', 'SourceGraphic'), t.appendChild(o)
                var l = createNS('feFuncA')
                l.setAttribute('type', 'table'),
                  l.setAttribute('tableValues', '1.0 0.0'),
                  o.appendChild(l),
                  this.globalData.defs.appendChild(t)
                var h = createNS('rect')
                h.setAttribute('width', this.comp.data.w),
                  h.setAttribute('height', this.comp.data.h),
                  h.setAttribute('x', '0'),
                  h.setAttribute('y', '0'),
                  h.setAttribute('fill', '#ffffff'),
                  h.setAttribute('opacity', '0'),
                  a.setAttribute('filter', 'url(' + getLocationHref() + '#' + e + ')'),
                  a.appendChild(h),
                  a.appendChild(this.layerElement),
                  (n = a),
                  featureSupport.maskType ||
                    (s.setAttribute('mask-type', 'luminance'),
                    t.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                    (r = createNS('g')),
                    a.appendChild(h),
                    r.appendChild(this.layerElement),
                    (n = r),
                    a.appendChild(r)),
                  this.globalData.defs.appendChild(s)
              }
            } else
              this.data.tt
                ? (this.matteElement.appendChild(this.layerElement),
                  (n = this.matteElement),
                  (this.baseElement = this.matteElement))
                : (this.baseElement = this.layerElement)
            if (
              (this.data.ln && this.layerElement.setAttribute('id', this.data.ln),
              this.data.cl && this.layerElement.setAttribute('class', this.data.cl),
              0 === this.data.ty && !this.data.hd)
            ) {
              var c = createNS('clipPath'),
                p = createNS('path')
              p.setAttribute(
                'd',
                'M0,0 L' + this.data.w + ',0 L' + this.data.w + ',' + this.data.h + ' L0,' + this.data.h + 'z'
              )
              var u = createElementID()
              if ((c.setAttribute('id', u), c.appendChild(p), this.globalData.defs.appendChild(c), this.checkMasks())) {
                var f = createNS('g')
                f.setAttribute('clip-path', 'url(' + getLocationHref() + '#' + u + ')'),
                  f.appendChild(this.layerElement),
                  (this.transformedElement = f),
                  n ? n.appendChild(this.transformedElement) : (this.baseElement = this.transformedElement)
              } else this.layerElement.setAttribute('clip-path', 'url(' + getLocationHref() + '#' + u + ')')
            }
            0 !== this.data.bm && this.setBlendMode()
          },
          renderElement: function () {
            this.finalTransform._matMdf &&
              this.transformedElement.setAttribute('transform', this.finalTransform.mat.to2dCSS()),
              this.finalTransform._opMdf &&
                this.transformedElement.setAttribute('opacity', this.finalTransform.mProp.o.v)
          },
          destroyBaseElement: function () {
            ;(this.layerElement = null), (this.matteElement = null), this.maskManager.destroy()
          },
          getBaseElement: function () {
            return this.data.hd ? null : this.baseElement
          },
          createRenderableComponents: function () {
            ;(this.maskManager = new MaskElement(this.data, this, this.globalData)),
              (this.renderableEffectsManager = new SVGEffects(this))
          },
          setMatte: function (e) {
            this.matteElement && this.matteElement.setAttribute('mask', 'url(' + getLocationHref() + '#' + e + ')')
          },
        }),
        (HierarchyElement.prototype = {
          initHierarchy: function () {
            ;(this.hierarchy = []), (this._isParent = !1), this.checkParenting()
          },
          setHierarchy: function (e) {
            this.hierarchy = e
          },
          setAsParent: function () {
            this._isParent = !0
          },
          checkParenting: function () {
            void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
          },
        }),
        extendPrototype(
          [
            RenderableElement,
            createProxyFunction({
              initElement: function (e, t, r) {
                this.initFrame(),
                  this.initBaseData(e, t, r),
                  this.initTransform(e, t, r),
                  this.initHierarchy(),
                  this.initRenderable(),
                  this.initRendererElement(),
                  this.createContainerElements(),
                  this.createRenderableComponents(),
                  this.createContent(),
                  this.hide()
              },
              hide: function () {
                this.hidden ||
                  (this.isInRange && !this.isTransparent) ||
                  (((this.baseElement || this.layerElement).style.display = 'none'), (this.hidden = !0))
              },
              show: function () {
                this.isInRange &&
                  !this.isTransparent &&
                  (this.data.hd || ((this.baseElement || this.layerElement).style.display = 'block'),
                  (this.hidden = !1),
                  (this._isFirstFrame = !0))
              },
              renderFrame: function () {
                this.data.hd ||
                  this.hidden ||
                  (this.renderTransform(),
                  this.renderRenderable(),
                  this.renderElement(),
                  this.renderInnerContent(),
                  this._isFirstFrame && (this._isFirstFrame = !1))
              },
              renderInnerContent: function () {},
              prepareFrame: function (e) {
                ;(this._mdf = !1),
                  this.prepareRenderableFrame(e),
                  this.prepareProperties(e, this.isInRange),
                  this.checkTransparency()
              },
              destroy: function () {
                ;(this.innerElem = null), this.destroyBaseElement()
              },
            }),
          ],
          RenderableDOMElement
        ),
        extendPrototype(
          [BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement],
          IImageElement
        ),
        (IImageElement.prototype.createContent = function () {
          var e = this.globalData.getAssetsPath(this.assetData)
          ;(this.innerElem = createNS('image')),
            this.innerElem.setAttribute('width', this.assetData.w + 'px'),
            this.innerElem.setAttribute('height', this.assetData.h + 'px'),
            this.innerElem.setAttribute(
              'preserveAspectRatio',
              this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio
            ),
            this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', e),
            this.layerElement.appendChild(this.innerElem)
        }),
        (IImageElement.prototype.sourceRectAtTime = function () {
          return this.sourceRect
        }),
        (IShapeElement.prototype = {
          addShapeToModifiers: function (e) {
            var t,
              r = this.shapeModifiers.length
            for (t = 0; t < r; t += 1) this.shapeModifiers[t].addShape(e)
          },
          isShapeInAnimatedModifiers: function (e) {
            for (var t = this.shapeModifiers.length; 0 < t; )
              if (this.shapeModifiers[0].isAnimatedWithShape(e)) return !0
            return !1
          },
          renderModifiers: function () {
            if (this.shapeModifiers.length) {
              var e,
                t = this.shapes.length
              for (e = 0; e < t; e += 1) this.shapes[e].sh.reset()
              for (
                e = (t = this.shapeModifiers.length) - 1;
                e >= 0 && !this.shapeModifiers[e].processShapes(this._isFirstFrame);
                e -= 1
              );
            }
          },
          searchProcessedElement: function (e) {
            for (var t = this.processedElements, r = 0, n = t.length; r < n; ) {
              if (t[r].elem === e) return t[r].pos
              r += 1
            }
            return 0
          },
          addProcessedElement: function (e, t) {
            for (var r = this.processedElements, n = r.length; n; )
              if (r[(n -= 1)].elem === e) return void (r[n].pos = t)
            r.push(new ProcessedElement(e, t))
          },
          prepareFrame: function (e) {
            this.prepareRenderableFrame(e), this.prepareProperties(e, this.isInRange)
          },
        })
      var lineCapEnum = { 1: 'butt', 2: 'round', 3: 'square' },
        lineJoinEnum = { 1: 'miter', 2: 'round', 3: 'bevel' }
      function SVGShapeData(e, t, r) {
        ;(this.caches = []),
          (this.styles = []),
          (this.transformers = e),
          (this.lStr = ''),
          (this.sh = r),
          (this.lvl = t),
          (this._isAnimated = !!r.k)
        for (var n = 0, i = e.length; n < i; ) {
          if (e[n].mProps.dynamicProperties.length) {
            this._isAnimated = !0
            break
          }
          n += 1
        }
      }
      function SVGStyleData(e, t) {
        ;(this.data = e),
          (this.type = e.ty),
          (this.d = ''),
          (this.lvl = t),
          (this._mdf = !1),
          (this.closed = !0 === e.hd),
          (this.pElem = createNS('path')),
          (this.msElem = null)
      }
      function DashProperty(e, t, r, n) {
        var i
        ;(this.elem = e),
          (this.frameId = -1),
          (this.dataProps = createSizedArray(t.length)),
          (this.renderer = r),
          (this.k = !1),
          (this.dashStr = ''),
          (this.dashArray = createTypedArray('float32', t.length ? t.length - 1 : 0)),
          (this.dashoffset = createTypedArray('float32', 1)),
          this.initDynamicPropertyContainer(n)
        var s,
          a = t.length || 0
        for (i = 0; i < a; i += 1)
          (s = PropertyFactory.getProp(e, t[i].v, 0, 0, this)),
            (this.k = s.k || this.k),
            (this.dataProps[i] = { n: t[i].n, p: s })
        this.k || this.getValue(!0), (this._isAnimated = this.k)
      }
      function SVGStrokeStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e),
          (this.getValue = this.iterateDynamicProperties),
          (this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this)),
          (this.w = PropertyFactory.getProp(e, t.w, 0, null, this)),
          (this.d = new DashProperty(e, t.d || {}, 'svg', this)),
          (this.c = PropertyFactory.getProp(e, t.c, 1, 255, this)),
          (this.style = r),
          (this._isAnimated = !!this._isAnimated)
      }
      function SVGFillStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e),
          (this.getValue = this.iterateDynamicProperties),
          (this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this)),
          (this.c = PropertyFactory.getProp(e, t.c, 1, 255, this)),
          (this.style = r)
      }
      function SVGNoStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), (this.getValue = this.iterateDynamicProperties), (this.style = r)
      }
      function GradientProperty(e, t, r) {
        ;(this.data = t), (this.c = createTypedArray('uint8c', 4 * t.p))
        var n = t.k.k[0].s ? t.k.k[0].s.length - 4 * t.p : t.k.k.length - 4 * t.p
        ;(this.o = createTypedArray('float32', n)),
          (this._cmdf = !1),
          (this._omdf = !1),
          (this._collapsable = this.checkCollapsable()),
          (this._hasOpacity = n),
          this.initDynamicPropertyContainer(r),
          (this.prop = PropertyFactory.getProp(e, t.k, 1, null, this)),
          (this.k = this.prop.k),
          this.getValue(!0)
      }
      function SVGGradientFillStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e),
          (this.getValue = this.iterateDynamicProperties),
          this.initGradientData(e, t, r)
      }
      function SVGGradientStrokeStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e),
          (this.getValue = this.iterateDynamicProperties),
          (this.w = PropertyFactory.getProp(e, t.w, 0, null, this)),
          (this.d = new DashProperty(e, t.d || {}, 'svg', this)),
          this.initGradientData(e, t, r),
          (this._isAnimated = !!this._isAnimated)
      }
      function ShapeGroupData() {
        ;(this.it = []), (this.prevViewData = []), (this.gr = createNS('g'))
      }
      function SVGTransformData(e, t, r) {
        ;(this.transform = { mProps: e, op: t, container: r }),
          (this.elements = []),
          (this._isAnimated =
            this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length)
      }
      ;(SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0
      }),
        (SVGStyleData.prototype.reset = function () {
          ;(this.d = ''), (this._mdf = !1)
        }),
        (DashProperty.prototype.getValue = function (e) {
          if (
            (this.elem.globalData.frameId !== this.frameId || e) &&
            ((this.frameId = this.elem.globalData.frameId),
            this.iterateDynamicProperties(),
            (this._mdf = this._mdf || e),
            this._mdf)
          ) {
            var t = 0,
              r = this.dataProps.length
            for ('svg' === this.renderer && (this.dashStr = ''), t = 0; t < r; t += 1)
              'o' !== this.dataProps[t].n
                ? 'svg' === this.renderer
                  ? (this.dashStr += ' ' + this.dataProps[t].p.v)
                  : (this.dashArray[t] = this.dataProps[t].p.v)
                : (this.dashoffset[0] = this.dataProps[t].p.v)
          }
        }),
        extendPrototype([DynamicPropertyContainer], DashProperty),
        extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
        extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
        extendPrototype([DynamicPropertyContainer], SVGNoStyleData),
        (GradientProperty.prototype.comparePoints = function (e, t) {
          for (var r = 0, n = this.o.length / 2; r < n; ) {
            if (Math.abs(e[4 * r] - e[4 * t + 2 * r]) > 0.01) return !1
            r += 1
          }
          return !0
        }),
        (GradientProperty.prototype.checkCollapsable = function () {
          if (this.o.length / 2 != this.c.length / 4) return !1
          if (this.data.k.k[0].s)
            for (var e = 0, t = this.data.k.k.length; e < t; ) {
              if (!this.comparePoints(this.data.k.k[e].s, this.data.p)) return !1
              e += 1
            }
          else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1
          return !0
        }),
        (GradientProperty.prototype.getValue = function (e) {
          if ((this.prop.getValue(), (this._mdf = !1), (this._cmdf = !1), (this._omdf = !1), this.prop._mdf || e)) {
            var t,
              r,
              n,
              i = 4 * this.data.p
            for (t = 0; t < i; t += 1)
              (r = t % 4 == 0 ? 100 : 255),
                (n = Math.round(this.prop.v[t] * r)),
                this.c[t] !== n && ((this.c[t] = n), (this._cmdf = !e))
            if (this.o.length)
              for (i = this.prop.v.length, t = 4 * this.data.p; t < i; t += 1)
                (r = t % 2 == 0 ? 100 : 1),
                  (n = t % 2 == 0 ? Math.round(100 * this.prop.v[t]) : this.prop.v[t]),
                  this.o[t - 4 * this.data.p] !== n && ((this.o[t - 4 * this.data.p] = n), (this._omdf = !e))
            this._mdf = !e
          }
        }),
        extendPrototype([DynamicPropertyContainer], GradientProperty),
        (SVGGradientFillStyleData.prototype.initGradientData = function (e, t, r) {
          ;(this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this)),
            (this.s = PropertyFactory.getProp(e, t.s, 1, null, this)),
            (this.e = PropertyFactory.getProp(e, t.e, 1, null, this)),
            (this.h = PropertyFactory.getProp(e, t.h || { k: 0 }, 0, 0.01, this)),
            (this.a = PropertyFactory.getProp(e, t.a || { k: 0 }, 0, degToRads, this)),
            (this.g = new GradientProperty(e, t.g, this)),
            (this.style = r),
            (this.stops = []),
            this.setGradientData(r.pElem, t),
            this.setGradientOpacity(t, r),
            (this._isAnimated = !!this._isAnimated)
        }),
        (SVGGradientFillStyleData.prototype.setGradientData = function (e, t) {
          var r = createElementID(),
            n = createNS(1 === t.t ? 'linearGradient' : 'radialGradient')
          n.setAttribute('id', r),
            n.setAttribute('spreadMethod', 'pad'),
            n.setAttribute('gradientUnits', 'userSpaceOnUse')
          var i,
            s,
            a,
            o = []
          for (a = 4 * t.g.p, s = 0; s < a; s += 4) (i = createNS('stop')), n.appendChild(i), o.push(i)
          e.setAttribute('gf' === t.ty ? 'fill' : 'stroke', 'url(' + getLocationHref() + '#' + r + ')'),
            (this.gf = n),
            (this.cst = o)
        }),
        (SVGGradientFillStyleData.prototype.setGradientOpacity = function (e, t) {
          if (this.g._hasOpacity && !this.g._collapsable) {
            var r,
              n,
              i,
              s = createNS('mask'),
              a = createNS('path')
            s.appendChild(a)
            var o = createElementID(),
              l = createElementID()
            s.setAttribute('id', l)
            var h = createNS(1 === e.t ? 'linearGradient' : 'radialGradient')
            h.setAttribute('id', o),
              h.setAttribute('spreadMethod', 'pad'),
              h.setAttribute('gradientUnits', 'userSpaceOnUse'),
              (i = e.g.k.k[0].s ? e.g.k.k[0].s.length : e.g.k.k.length)
            var c = this.stops
            for (n = 4 * e.g.p; n < i; n += 2)
              (r = createNS('stop')).setAttribute('stop-color', 'rgb(255,255,255)'), h.appendChild(r), c.push(r)
            a.setAttribute('gf' === e.ty ? 'fill' : 'stroke', 'url(' + getLocationHref() + '#' + o + ')'),
              'gs' === e.ty &&
                (a.setAttribute('stroke-linecap', lineCapEnum[e.lc || 2]),
                a.setAttribute('stroke-linejoin', lineJoinEnum[e.lj || 2]),
                1 === e.lj && a.setAttribute('stroke-miterlimit', e.ml)),
              (this.of = h),
              (this.ms = s),
              (this.ost = c),
              (this.maskId = l),
              (t.msElem = a)
          }
        }),
        extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
        extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData)
      var buildShapeString = function (e, t, r, n) {
          if (0 === t) return ''
          var i,
            s = e.o,
            a = e.i,
            o = e.v,
            l = ' M' + n.applyToPointStringified(o[0][0], o[0][1])
          for (i = 1; i < t; i += 1)
            l +=
              ' C' +
              n.applyToPointStringified(s[i - 1][0], s[i - 1][1]) +
              ' ' +
              n.applyToPointStringified(a[i][0], a[i][1]) +
              ' ' +
              n.applyToPointStringified(o[i][0], o[i][1])
          return (
            r &&
              t &&
              ((l +=
                ' C' +
                n.applyToPointStringified(s[i - 1][0], s[i - 1][1]) +
                ' ' +
                n.applyToPointStringified(a[0][0], a[0][1]) +
                ' ' +
                n.applyToPointStringified(o[0][0], o[0][1])),
              (l += 'z')),
            l
          )
        },
        SVGElementsRenderer = (function () {
          var e = new Matrix(),
            t = new Matrix()
          function r(e, t, r) {
            ;(r || t.transform.op._mdf) && t.transform.container.setAttribute('opacity', t.transform.op.v),
              (r || t.transform.mProps._mdf) &&
                t.transform.container.setAttribute('transform', t.transform.mProps.v.to2dCSS())
          }
          function n() {}
          function i(r, n, i) {
            var s,
              a,
              o,
              l,
              h,
              c,
              p,
              u,
              f,
              d,
              m,
              g = n.styles.length,
              y = n.lvl
            for (c = 0; c < g; c += 1) {
              if (((l = n.sh._mdf || i), n.styles[c].lvl < y)) {
                for (u = t.reset(), d = y - n.styles[c].lvl, m = n.transformers.length - 1; !l && d > 0; )
                  (l = n.transformers[m].mProps._mdf || l), (d -= 1), (m -= 1)
                if (l)
                  for (d = y - n.styles[c].lvl, m = n.transformers.length - 1; d > 0; )
                    (f = n.transformers[m].mProps.v.props),
                      u.transform(
                        f[0],
                        f[1],
                        f[2],
                        f[3],
                        f[4],
                        f[5],
                        f[6],
                        f[7],
                        f[8],
                        f[9],
                        f[10],
                        f[11],
                        f[12],
                        f[13],
                        f[14],
                        f[15]
                      ),
                      (d -= 1),
                      (m -= 1)
              } else u = e
              if (((a = (p = n.sh.paths)._length), l)) {
                for (o = '', s = 0; s < a; s += 1)
                  (h = p.shapes[s]) && h._length && (o += buildShapeString(h, h._length, h.c, u))
                n.caches[c] = o
              } else o = n.caches[c]
              ;(n.styles[c].d += !0 === r.hd ? '' : o), (n.styles[c]._mdf = l || n.styles[c]._mdf)
            }
          }
          function s(e, t, r) {
            var n = t.style
            ;(t.c._mdf || r) &&
              n.pElem.setAttribute(
                'fill',
                'rgb(' + bmFloor(t.c.v[0]) + ',' + bmFloor(t.c.v[1]) + ',' + bmFloor(t.c.v[2]) + ')'
              ),
              (t.o._mdf || r) && n.pElem.setAttribute('fill-opacity', t.o.v)
          }
          function a(e, t, r) {
            o(e, t, r), l(0, t, r)
          }
          function o(e, t, r) {
            var n,
              i,
              s,
              a,
              o,
              l = t.gf,
              h = t.g._hasOpacity,
              c = t.s.v,
              p = t.e.v
            if (t.o._mdf || r) {
              var u = 'gf' === e.ty ? 'fill-opacity' : 'stroke-opacity'
              t.style.pElem.setAttribute(u, t.o.v)
            }
            if (t.s._mdf || r) {
              var f = 1 === e.t ? 'x1' : 'cx',
                d = 'x1' === f ? 'y1' : 'cy'
              l.setAttribute(f, c[0]),
                l.setAttribute(d, c[1]),
                h && !t.g._collapsable && (t.of.setAttribute(f, c[0]), t.of.setAttribute(d, c[1]))
            }
            if (t.g._cmdf || r) {
              n = t.cst
              var m = t.g.c
              for (s = n.length, i = 0; i < s; i += 1)
                (a = n[i]).setAttribute('offset', m[4 * i] + '%'),
                  a.setAttribute('stop-color', 'rgb(' + m[4 * i + 1] + ',' + m[4 * i + 2] + ',' + m[4 * i + 3] + ')')
            }
            if (h && (t.g._omdf || r)) {
              var g = t.g.o
              for (s = (n = t.g._collapsable ? t.cst : t.ost).length, i = 0; i < s; i += 1)
                (a = n[i]),
                  t.g._collapsable || a.setAttribute('offset', g[2 * i] + '%'),
                  a.setAttribute('stop-opacity', g[2 * i + 1])
            }
            if (1 === e.t)
              (t.e._mdf || r) &&
                (l.setAttribute('x2', p[0]),
                l.setAttribute('y2', p[1]),
                h && !t.g._collapsable && (t.of.setAttribute('x2', p[0]), t.of.setAttribute('y2', p[1])))
            else if (
              ((t.s._mdf || t.e._mdf || r) &&
                ((o = Math.sqrt(Math.pow(c[0] - p[0], 2) + Math.pow(c[1] - p[1], 2))),
                l.setAttribute('r', o),
                h && !t.g._collapsable && t.of.setAttribute('r', o)),
              t.e._mdf || t.h._mdf || t.a._mdf || r)
            ) {
              o || (o = Math.sqrt(Math.pow(c[0] - p[0], 2) + Math.pow(c[1] - p[1], 2)))
              var y = Math.atan2(p[1] - c[1], p[0] - c[0]),
                v = t.h.v
              v >= 1 ? (v = 0.99) : v <= -1 && (v = -0.99)
              var b = o * v,
                E = Math.cos(y + t.a.v) * b + c[0],
                S = Math.sin(y + t.a.v) * b + c[1]
              l.setAttribute('fx', E),
                l.setAttribute('fy', S),
                h && !t.g._collapsable && (t.of.setAttribute('fx', E), t.of.setAttribute('fy', S))
            }
          }
          function l(e, t, r) {
            var n = t.style,
              i = t.d
            i &&
              (i._mdf || r) &&
              i.dashStr &&
              (n.pElem.setAttribute('stroke-dasharray', i.dashStr),
              n.pElem.setAttribute('stroke-dashoffset', i.dashoffset[0])),
              t.c &&
                (t.c._mdf || r) &&
                n.pElem.setAttribute(
                  'stroke',
                  'rgb(' + bmFloor(t.c.v[0]) + ',' + bmFloor(t.c.v[1]) + ',' + bmFloor(t.c.v[2]) + ')'
                ),
              (t.o._mdf || r) && n.pElem.setAttribute('stroke-opacity', t.o.v),
              (t.w._mdf || r) &&
                (n.pElem.setAttribute('stroke-width', t.w.v), n.msElem && n.msElem.setAttribute('stroke-width', t.w.v))
          }
          return {
            createRenderFunction: function (e) {
              switch (e.ty) {
                case 'fl':
                  return s
                case 'gf':
                  return o
                case 'gs':
                  return a
                case 'st':
                  return l
                case 'sh':
                case 'el':
                case 'rc':
                case 'sr':
                  return i
                case 'tr':
                  return r
                case 'no':
                  return n
                default:
                  return null
              }
            },
          }
        })()
      function SVGShapeElement(e, t, r) {
        ;(this.shapes = []),
          (this.shapesData = e.shapes),
          (this.stylesList = []),
          (this.shapeModifiers = []),
          (this.itemsData = []),
          (this.processedElements = []),
          (this.animatedContents = []),
          this.initElement(e, t, r),
          (this.prevViewData = [])
      }
      function LetterProps(e, t, r, n, i, s) {
        ;(this.o = e),
          (this.sw = t),
          (this.sc = r),
          (this.fc = n),
          (this.m = i),
          (this.p = s),
          (this._mdf = { o: !0, sw: !!t, sc: !!r, fc: !!n, m: !0, p: !0 })
      }
      function TextProperty(e, t) {
        ;(this._frameId = initialDefaultFrame),
          (this.pv = ''),
          (this.v = ''),
          (this.kf = !1),
          (this._isFirstFrame = !0),
          (this._mdf = !1),
          (this.data = t),
          (this.elem = e),
          (this.comp = this.elem.comp),
          (this.keysIndex = 0),
          (this.canResize = !1),
          (this.minimumFontSize = 1),
          (this.effectsSequence = []),
          (this.currentData = {
            ascent: 0,
            boxWidth: this.defaultBoxWidth,
            f: '',
            fStyle: '',
            fWeight: '',
            fc: '',
            j: '',
            justifyOffset: '',
            l: [],
            lh: 0,
            lineWidths: [],
            ls: '',
            of: '',
            s: '',
            sc: '',
            sw: 0,
            t: 0,
            tr: 0,
            sz: 0,
            ps: null,
            fillColorAnim: !1,
            strokeColorAnim: !1,
            strokeWidthAnim: !1,
            yOffset: 0,
            finalSize: 0,
            finalText: [],
            finalLineHeight: 0,
            __complete: !1,
          }),
          this.copyData(this.currentData, this.data.d.k[0].s),
          this.searchProperty() || this.completeTextData(this.currentData)
      }
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          IShapeElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
        ],
        SVGShapeElement
      ),
        (SVGShapeElement.prototype.initSecondaryElement = function () {}),
        (SVGShapeElement.prototype.identityMatrix = new Matrix()),
        (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
        (SVGShapeElement.prototype.createContent = function () {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
            this.filterUniqueShapes()
        }),
        (SVGShapeElement.prototype.filterUniqueShapes = function () {
          var e,
            t,
            r,
            n,
            i = this.shapes.length,
            s = this.stylesList.length,
            a = [],
            o = !1
          for (r = 0; r < s; r += 1) {
            for (n = this.stylesList[r], o = !1, a.length = 0, e = 0; e < i; e += 1)
              -1 !== (t = this.shapes[e]).styles.indexOf(n) && (a.push(t), (o = t._isAnimated || o))
            a.length > 1 && o && this.setShapesAsAnimated(a)
          }
        }),
        (SVGShapeElement.prototype.setShapesAsAnimated = function (e) {
          var t,
            r = e.length
          for (t = 0; t < r; t += 1) e[t].setAsAnimated()
        }),
        (SVGShapeElement.prototype.createStyleElement = function (e, t) {
          var r,
            n = new SVGStyleData(e, t),
            i = n.pElem
          return (
            'st' === e.ty
              ? (r = new SVGStrokeStyleData(this, e, n))
              : 'fl' === e.ty
              ? (r = new SVGFillStyleData(this, e, n))
              : 'gf' === e.ty || 'gs' === e.ty
              ? ((r = new ('gf' === e.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, e, n)),
                this.globalData.defs.appendChild(r.gf),
                r.maskId &&
                  (this.globalData.defs.appendChild(r.ms),
                  this.globalData.defs.appendChild(r.of),
                  i.setAttribute('mask', 'url(' + getLocationHref() + '#' + r.maskId + ')')))
              : 'no' === e.ty && (r = new SVGNoStyleData(this, e, n)),
            ('st' !== e.ty && 'gs' !== e.ty) ||
              (i.setAttribute('stroke-linecap', lineCapEnum[e.lc || 2]),
              i.setAttribute('stroke-linejoin', lineJoinEnum[e.lj || 2]),
              i.setAttribute('fill-opacity', '0'),
              1 === e.lj && i.setAttribute('stroke-miterlimit', e.ml)),
            2 === e.r && i.setAttribute('fill-rule', 'evenodd'),
            e.ln && i.setAttribute('id', e.ln),
            e.cl && i.setAttribute('class', e.cl),
            e.bm && (i.style['mix-blend-mode'] = getBlendMode(e.bm)),
            this.stylesList.push(n),
            this.addToAnimatedContents(e, r),
            r
          )
        }),
        (SVGShapeElement.prototype.createGroupElement = function (e) {
          var t = new ShapeGroupData()
          return (
            e.ln && t.gr.setAttribute('id', e.ln),
            e.cl && t.gr.setAttribute('class', e.cl),
            e.bm && (t.gr.style['mix-blend-mode'] = getBlendMode(e.bm)),
            t
          )
        }),
        (SVGShapeElement.prototype.createTransformElement = function (e, t) {
          var r = TransformPropertyFactory.getTransformProperty(this, e, this),
            n = new SVGTransformData(r, r.o, t)
          return this.addToAnimatedContents(e, n), n
        }),
        (SVGShapeElement.prototype.createShapeElement = function (e, t, r) {
          var n = 4
          'rc' === e.ty ? (n = 5) : 'el' === e.ty ? (n = 6) : 'sr' === e.ty && (n = 7)
          var i = new SVGShapeData(t, r, ShapePropertyFactory.getShapeProp(this, e, n, this))
          return this.shapes.push(i), this.addShapeToModifiers(i), this.addToAnimatedContents(e, i), i
        }),
        (SVGShapeElement.prototype.addToAnimatedContents = function (e, t) {
          for (var r = 0, n = this.animatedContents.length; r < n; ) {
            if (this.animatedContents[r].element === t) return
            r += 1
          }
          this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(e), element: t, data: e })
        }),
        (SVGShapeElement.prototype.setElementStyles = function (e) {
          var t,
            r = e.styles,
            n = this.stylesList.length
          for (t = 0; t < n; t += 1) this.stylesList[t].closed || r.push(this.stylesList[t])
        }),
        (SVGShapeElement.prototype.reloadShapes = function () {
          var e
          this._isFirstFrame = !0
          var t = this.itemsData.length
          for (e = 0; e < t; e += 1) this.prevViewData[e] = this.itemsData[e]
          for (
            this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
              this.filterUniqueShapes(),
              t = this.dynamicProperties.length,
              e = 0;
            e < t;
            e += 1
          )
            this.dynamicProperties[e].getValue()
          this.renderModifiers()
        }),
        (SVGShapeElement.prototype.searchShapes = function (e, t, r, n, i, s, a) {
          var o,
            l,
            h,
            c,
            p,
            u,
            f = [].concat(s),
            d = e.length - 1,
            m = [],
            g = []
          for (o = d; o >= 0; o -= 1) {
            if (
              ((u = this.searchProcessedElement(e[o])) ? (t[o] = r[u - 1]) : (e[o]._render = a),
              'fl' === e[o].ty || 'st' === e[o].ty || 'gf' === e[o].ty || 'gs' === e[o].ty || 'no' === e[o].ty)
            )
              u ? (t[o].style.closed = !1) : (t[o] = this.createStyleElement(e[o], i)),
                e[o]._render && t[o].style.pElem.parentNode !== n && n.appendChild(t[o].style.pElem),
                m.push(t[o].style)
            else if ('gr' === e[o].ty) {
              if (u) for (h = t[o].it.length, l = 0; l < h; l += 1) t[o].prevViewData[l] = t[o].it[l]
              else t[o] = this.createGroupElement(e[o])
              this.searchShapes(e[o].it, t[o].it, t[o].prevViewData, t[o].gr, i + 1, f, a),
                e[o]._render && t[o].gr.parentNode !== n && n.appendChild(t[o].gr)
            } else
              'tr' === e[o].ty
                ? (u || (t[o] = this.createTransformElement(e[o], n)), (c = t[o].transform), f.push(c))
                : 'sh' === e[o].ty || 'rc' === e[o].ty || 'el' === e[o].ty || 'sr' === e[o].ty
                ? (u || (t[o] = this.createShapeElement(e[o], f, i)), this.setElementStyles(t[o]))
                : 'tm' === e[o].ty || 'rd' === e[o].ty || 'ms' === e[o].ty || 'pb' === e[o].ty
                ? (u
                    ? ((p = t[o]).closed = !1)
                    : ((p = ShapeModifiers.getModifier(e[o].ty)).init(this, e[o]),
                      (t[o] = p),
                      this.shapeModifiers.push(p)),
                  g.push(p))
                : 'rp' === e[o].ty &&
                  (u
                    ? ((p = t[o]).closed = !0)
                    : ((p = ShapeModifiers.getModifier(e[o].ty)),
                      (t[o] = p),
                      p.init(this, e, o, t),
                      this.shapeModifiers.push(p),
                      (a = !1)),
                  g.push(p))
            this.addProcessedElement(e[o], o + 1)
          }
          for (d = m.length, o = 0; o < d; o += 1) m[o].closed = !0
          for (d = g.length, o = 0; o < d; o += 1) g[o].closed = !0
        }),
        (SVGShapeElement.prototype.renderInnerContent = function () {
          var e
          this.renderModifiers()
          var t = this.stylesList.length
          for (e = 0; e < t; e += 1) this.stylesList[e].reset()
          for (this.renderShape(), e = 0; e < t; e += 1)
            (this.stylesList[e]._mdf || this._isFirstFrame) &&
              (this.stylesList[e].msElem &&
                (this.stylesList[e].msElem.setAttribute('d', this.stylesList[e].d),
                (this.stylesList[e].d = 'M0 0' + this.stylesList[e].d)),
              this.stylesList[e].pElem.setAttribute('d', this.stylesList[e].d || 'M0 0'))
        }),
        (SVGShapeElement.prototype.renderShape = function () {
          var e,
            t,
            r = this.animatedContents.length
          for (e = 0; e < r; e += 1)
            (t = this.animatedContents[e]),
              (this._isFirstFrame || t.element._isAnimated) &&
                !0 !== t.data &&
                t.fn(t.data, t.element, this._isFirstFrame)
        }),
        (SVGShapeElement.prototype.destroy = function () {
          this.destroyBaseElement(), (this.shapesData = null), (this.itemsData = null)
        }),
        (LetterProps.prototype.update = function (e, t, r, n, i, s) {
          ;(this._mdf.o = !1),
            (this._mdf.sw = !1),
            (this._mdf.sc = !1),
            (this._mdf.fc = !1),
            (this._mdf.m = !1),
            (this._mdf.p = !1)
          var a = !1
          return (
            this.o !== e && ((this.o = e), (this._mdf.o = !0), (a = !0)),
            this.sw !== t && ((this.sw = t), (this._mdf.sw = !0), (a = !0)),
            this.sc !== r && ((this.sc = r), (this._mdf.sc = !0), (a = !0)),
            this.fc !== n && ((this.fc = n), (this._mdf.fc = !0), (a = !0)),
            this.m !== i && ((this.m = i), (this._mdf.m = !0), (a = !0)),
            !s.length ||
              (this.p[0] === s[0] &&
                this.p[1] === s[1] &&
                this.p[4] === s[4] &&
                this.p[5] === s[5] &&
                this.p[12] === s[12] &&
                this.p[13] === s[13]) ||
              ((this.p = s), (this._mdf.p = !0), (a = !0)),
            a
          )
        }),
        (TextProperty.prototype.defaultBoxWidth = [0, 0]),
        (TextProperty.prototype.copyData = function (e, t) {
          for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
          return e
        }),
        (TextProperty.prototype.setCurrentData = function (e) {
          e.__complete || this.completeTextData(e),
            (this.currentData = e),
            (this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth),
            (this._mdf = !0)
        }),
        (TextProperty.prototype.searchProperty = function () {
          return this.searchKeyframes()
        }),
        (TextProperty.prototype.searchKeyframes = function () {
          return (
            (this.kf = this.data.d.k.length > 1), this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
          )
        }),
        (TextProperty.prototype.addEffect = function (e) {
          this.effectsSequence.push(e), this.elem.addDynamicProperty(this)
        }),
        (TextProperty.prototype.getValue = function (e) {
          if ((this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) || e) {
            this.currentData.t = this.data.d.k[this.keysIndex].s.t
            var t = this.currentData,
              r = this.keysIndex
            if (this.lock) this.setCurrentData(this.currentData)
            else {
              var n
              ;(this.lock = !0), (this._mdf = !1)
              var i = this.effectsSequence.length,
                s = e || this.data.d.k[this.keysIndex].s
              for (n = 0; n < i; n += 1)
                s =
                  r !== this.keysIndex
                    ? this.effectsSequence[n](s, s.t)
                    : this.effectsSequence[n](this.currentData, s.t)
              t !== s && this.setCurrentData(s),
                (this.v = this.currentData),
                (this.pv = this.v),
                (this.lock = !1),
                (this.frameId = this.elem.globalData.frameId)
            }
          }
        }),
        (TextProperty.prototype.getKeyframeValue = function () {
          for (
            var e = this.data.d.k, t = this.elem.comp.renderedFrame, r = 0, n = e.length;
            r <= n - 1 && !(r === n - 1 || e[r + 1].t > t);

          )
            r += 1
          return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
        }),
        (TextProperty.prototype.buildFinalText = function (e) {
          for (var t, r, n = [], i = 0, s = e.length, a = !1; i < s; )
            (t = e.charCodeAt(i)),
              FontManager.isCombinedCharacter(t)
                ? (n[n.length - 1] += e.charAt(i))
                : t >= 55296 && t <= 56319
                ? (r = e.charCodeAt(i + 1)) >= 56320 && r <= 57343
                  ? (a || FontManager.isModifier(t, r)
                      ? ((n[n.length - 1] += e.substr(i, 2)), (a = !1))
                      : n.push(e.substr(i, 2)),
                    (i += 1))
                  : n.push(e.charAt(i))
                : t > 56319
                ? ((r = e.charCodeAt(i + 1)),
                  FontManager.isZeroWidthJoiner(t, r)
                    ? ((a = !0), (n[n.length - 1] += e.substr(i, 2)), (i += 1))
                    : n.push(e.charAt(i)))
                : FontManager.isZeroWidthJoiner(t)
                ? ((n[n.length - 1] += e.charAt(i)), (a = !0))
                : n.push(e.charAt(i)),
              (i += 1)
          return n
        }),
        (TextProperty.prototype.completeTextData = function (e) {
          e.__complete = !0
          var t,
            r,
            n,
            i,
            s,
            a,
            o,
            l = this.elem.globalData.fontManager,
            h = this.data,
            c = [],
            p = 0,
            u = h.m.g,
            f = 0,
            d = 0,
            m = 0,
            g = [],
            y = 0,
            v = 0,
            b = l.getFontByName(e.f),
            E = 0,
            S = getFontProperties(b)
          ;(e.fWeight = S.weight),
            (e.fStyle = S.style),
            (e.finalSize = e.s),
            (e.finalText = this.buildFinalText(e.t)),
            (r = e.finalText.length),
            (e.finalLineHeight = e.lh)
          var P,
            _ = (e.tr / 1e3) * e.finalSize
          if (e.sz)
            for (var x, C, A = !0, T = e.sz[0], k = e.sz[1]; A; ) {
              ;(x = 0), (y = 0), (r = (C = this.buildFinalText(e.t)).length), (_ = (e.tr / 1e3) * e.finalSize)
              var w = -1
              for (t = 0; t < r; t += 1)
                (P = C[t].charCodeAt(0)),
                  (n = !1),
                  ' ' === C[t]
                    ? (w = t)
                    : (13 !== P && 3 !== P) || ((y = 0), (n = !0), (x += e.finalLineHeight || 1.2 * e.finalSize)),
                  l.chars
                    ? ((o = l.getCharData(C[t], b.fStyle, b.fFamily)), (E = n ? 0 : (o.w * e.finalSize) / 100))
                    : (E = l.measureText(C[t], e.f, e.finalSize)),
                  y + E > T && ' ' !== C[t]
                    ? (-1 === w ? (r += 1) : (t = w),
                      (x += e.finalLineHeight || 1.2 * e.finalSize),
                      C.splice(t, w === t ? 1 : 0, '\r'),
                      (w = -1),
                      (y = 0))
                    : ((y += E), (y += _))
              ;(x += (b.ascent * e.finalSize) / 100),
                this.canResize && e.finalSize > this.minimumFontSize && k < x
                  ? ((e.finalSize -= 1), (e.finalLineHeight = (e.finalSize * e.lh) / e.s))
                  : ((e.finalText = C), (r = e.finalText.length), (A = !1))
            }
          ;(y = -_), (E = 0)
          var M,
            I = 0
          for (t = 0; t < r; t += 1)
            if (
              ((n = !1),
              13 === (P = (M = e.finalText[t]).charCodeAt(0)) || 3 === P
                ? ((I = 0), g.push(y), (v = y > v ? y : v), (y = -2 * _), (i = ''), (n = !0), (m += 1))
                : (i = M),
              l.chars
                ? ((o = l.getCharData(M, b.fStyle, l.getFontByName(e.f).fFamily)),
                  (E = n ? 0 : (o.w * e.finalSize) / 100))
                : (E = l.measureText(i, e.f, e.finalSize)),
              ' ' === M ? (I += E + _) : ((y += E + _ + I), (I = 0)),
              c.push({ l: E, an: E, add: f, n: n, anIndexes: [], val: i, line: m, animatorJustifyOffset: 0 }),
              2 == u)
            ) {
              if (((f += E), '' === i || ' ' === i || t === r - 1)) {
                for (('' !== i && ' ' !== i) || (f -= E); d <= t; )
                  (c[d].an = f), (c[d].ind = p), (c[d].extra = E), (d += 1)
                ;(p += 1), (f = 0)
              }
            } else if (3 == u) {
              if (((f += E), '' === i || t === r - 1)) {
                for ('' === i && (f -= E); d <= t; ) (c[d].an = f), (c[d].ind = p), (c[d].extra = E), (d += 1)
                ;(f = 0), (p += 1)
              }
            } else (c[p].ind = p), (c[p].extra = 0), (p += 1)
          if (((e.l = c), (v = y > v ? y : v), g.push(y), e.sz)) (e.boxWidth = e.sz[0]), (e.justifyOffset = 0)
          else
            switch (((e.boxWidth = v), e.j)) {
              case 1:
                e.justifyOffset = -e.boxWidth
                break
              case 2:
                e.justifyOffset = -e.boxWidth / 2
                break
              default:
                e.justifyOffset = 0
            }
          e.lineWidths = g
          var F,
            R,
            D,
            O,
            V = h.a
          a = V.length
          var B = []
          for (s = 0; s < a; s += 1) {
            for (
              (F = V[s]).a.sc && (e.strokeColorAnim = !0),
                F.a.sw && (e.strokeWidthAnim = !0),
                (F.a.fc || F.a.fh || F.a.fs || F.a.fb) && (e.fillColorAnim = !0),
                O = 0,
                D = F.s.b,
                t = 0;
              t < r;
              t += 1
            )
              ((R = c[t]).anIndexes[s] = O),
                ((1 == D && '' !== R.val) ||
                  (2 == D && '' !== R.val && ' ' !== R.val) ||
                  (3 == D && (R.n || ' ' == R.val || t == r - 1)) ||
                  (4 == D && (R.n || t == r - 1))) &&
                  (1 === F.s.rn && B.push(O), (O += 1))
            h.a[s].s.totalChars = O
            var L,
              N = -1
            if (1 === F.s.rn)
              for (t = 0; t < r; t += 1)
                N != (R = c[t]).anIndexes[s] &&
                  ((N = R.anIndexes[s]), (L = B.splice(Math.floor(Math.random() * B.length), 1)[0])),
                  (R.anIndexes[s] = L)
          }
          ;(e.yOffset = e.finalLineHeight || 1.2 * e.finalSize),
            (e.ls = e.ls || 0),
            (e.ascent = (b.ascent * e.finalSize) / 100)
        }),
        (TextProperty.prototype.updateDocumentData = function (e, t) {
          t = void 0 === t ? this.keysIndex : t
          var r = this.copyData({}, this.data.d.k[t].s)
          ;(r = this.copyData(r, e)), (this.data.d.k[t].s = r), this.recalculate(t), this.elem.addDynamicProperty(this)
        }),
        (TextProperty.prototype.recalculate = function (e) {
          var t = this.data.d.k[e].s
          ;(t.__complete = !1), (this.keysIndex = 0), (this._isFirstFrame = !0), this.getValue(t)
        }),
        (TextProperty.prototype.canResizeFont = function (e) {
          ;(this.canResize = e), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
        }),
        (TextProperty.prototype.setMinimumFontSize = function (e) {
          ;(this.minimumFontSize = Math.floor(e) || 1),
            this.recalculate(this.keysIndex),
            this.elem.addDynamicProperty(this)
        })
      var TextSelectorProp = (function () {
        var e = Math.max,
          t = Math.min,
          r = Math.floor
        function n(e, t) {
          ;(this._currentTextLength = -1),
            (this.k = !1),
            (this.data = t),
            (this.elem = e),
            (this.comp = e.comp),
            (this.finalS = 0),
            (this.finalE = 0),
            this.initDynamicPropertyContainer(e),
            (this.s = PropertyFactory.getProp(e, t.s || { k: 0 }, 0, 0, this)),
            (this.e = 'e' in t ? PropertyFactory.getProp(e, t.e, 0, 0, this) : { v: 100 }),
            (this.o = PropertyFactory.getProp(e, t.o || { k: 0 }, 0, 0, this)),
            (this.xe = PropertyFactory.getProp(e, t.xe || { k: 0 }, 0, 0, this)),
            (this.ne = PropertyFactory.getProp(e, t.ne || { k: 0 }, 0, 0, this)),
            (this.sm = PropertyFactory.getProp(e, t.sm || { k: 100 }, 0, 0, this)),
            (this.a = PropertyFactory.getProp(e, t.a, 0, 0.01, this)),
            this.dynamicProperties.length || this.getValue()
        }
        return (
          (n.prototype = {
            getMult: function (n) {
              this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue()
              var i = 0,
                s = 0,
                a = 1,
                o = 1
              this.ne.v > 0 ? (i = this.ne.v / 100) : (s = -this.ne.v / 100),
                this.xe.v > 0 ? (a = 1 - this.xe.v / 100) : (o = 1 + this.xe.v / 100)
              var l = BezierFactory.getBezierEasing(i, s, a, o).get,
                h = 0,
                c = this.finalS,
                p = this.finalE,
                u = this.data.sh
              if (2 === u) h = l((h = p === c ? (n >= p ? 1 : 0) : e(0, t(0.5 / (p - c) + (n - c) / (p - c), 1))))
              else if (3 === u)
                h = l((h = p === c ? (n >= p ? 0 : 1) : 1 - e(0, t(0.5 / (p - c) + (n - c) / (p - c), 1))))
              else if (4 === u)
                p === c
                  ? (h = 0)
                  : (h = e(0, t(0.5 / (p - c) + (n - c) / (p - c), 1))) < 0.5
                  ? (h *= 2)
                  : (h = 1 - 2 * (h - 0.5)),
                  (h = l(h))
              else if (5 === u) {
                if (p === c) h = 0
                else {
                  var f = p - c,
                    d = -f / 2 + (n = t(e(0, n + 0.5 - c), p - c)),
                    m = f / 2
                  h = Math.sqrt(1 - (d * d) / (m * m))
                }
                h = l(h)
              } else
                6 === u
                  ? (p === c
                      ? (h = 0)
                      : ((n = t(e(0, n + 0.5 - c), p - c)),
                        (h = (1 + Math.cos(Math.PI + (2 * Math.PI * n) / (p - c))) / 2)),
                    (h = l(h)))
                  : (n >= r(c) && (h = e(0, t(n - c < 0 ? t(p, 1) - (c - n) : p - n, 1))), (h = l(h)))
              if (100 !== this.sm.v) {
                var g = 0.01 * this.sm.v
                0 === g && (g = 1e-8)
                var y = 0.5 - 0.5 * g
                h < y ? (h = 0) : (h = (h - y) / g) > 1 && (h = 1)
              }
              return h * this.a.v
            },
            getValue: function (e) {
              this.iterateDynamicProperties(),
                (this._mdf = e || this._mdf),
                (this._currentTextLength = this.elem.textProperty.currentData.l.length || 0),
                e && 2 === this.data.r && (this.e.v = this._currentTextLength)
              var t = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                r = this.o.v / t,
                n = this.s.v / t + r,
                i = this.e.v / t + r
              if (n > i) {
                var s = n
                ;(n = i), (i = s)
              }
              ;(this.finalS = n), (this.finalE = i)
            },
          }),
          extendPrototype([DynamicPropertyContainer], n),
          {
            getTextSelectorProp: function (e, t, r) {
              return new n(e, t, r)
            },
          }
        )
      })()
      function TextAnimatorDataProperty(e, t, r) {
        var n = { propType: !1 },
          i = PropertyFactory.getProp,
          s = t.a
        ;(this.a = {
          r: s.r ? i(e, s.r, 0, degToRads, r) : n,
          rx: s.rx ? i(e, s.rx, 0, degToRads, r) : n,
          ry: s.ry ? i(e, s.ry, 0, degToRads, r) : n,
          sk: s.sk ? i(e, s.sk, 0, degToRads, r) : n,
          sa: s.sa ? i(e, s.sa, 0, degToRads, r) : n,
          s: s.s ? i(e, s.s, 1, 0.01, r) : n,
          a: s.a ? i(e, s.a, 1, 0, r) : n,
          o: s.o ? i(e, s.o, 0, 0.01, r) : n,
          p: s.p ? i(e, s.p, 1, 0, r) : n,
          sw: s.sw ? i(e, s.sw, 0, 0, r) : n,
          sc: s.sc ? i(e, s.sc, 1, 0, r) : n,
          fc: s.fc ? i(e, s.fc, 1, 0, r) : n,
          fh: s.fh ? i(e, s.fh, 0, 0, r) : n,
          fs: s.fs ? i(e, s.fs, 0, 0.01, r) : n,
          fb: s.fb ? i(e, s.fb, 0, 0.01, r) : n,
          t: s.t ? i(e, s.t, 0, 0, r) : n,
        }),
          (this.s = TextSelectorProp.getTextSelectorProp(e, t.s, r)),
          (this.s.t = t.s.t)
      }
      function TextAnimatorProperty(e, t, r) {
        ;(this._isFirstFrame = !0),
          (this._hasMaskedPath = !1),
          (this._frameId = -1),
          (this._textData = e),
          (this._renderType = t),
          (this._elem = r),
          (this._animatorsData = createSizedArray(this._textData.a.length)),
          (this._pathData = {}),
          (this._moreOptions = { alignment: {} }),
          (this.renderedLetters = []),
          (this.lettersChangedFlag = !1),
          this.initDynamicPropertyContainer(r)
      }
      function ITextElement() {}
      ;(TextAnimatorProperty.prototype.searchProperties = function () {
        var e,
          t,
          r = this._textData.a.length,
          n = PropertyFactory.getProp
        for (e = 0; e < r; e += 1)
          (t = this._textData.a[e]), (this._animatorsData[e] = new TextAnimatorDataProperty(this._elem, t, this))
        this._textData.p && 'm' in this._textData.p
          ? ((this._pathData = {
              a: n(this._elem, this._textData.p.a, 0, 0, this),
              f: n(this._elem, this._textData.p.f, 0, 0, this),
              l: n(this._elem, this._textData.p.l, 0, 0, this),
              r: n(this._elem, this._textData.p.r, 0, 0, this),
              p: n(this._elem, this._textData.p.p, 0, 0, this),
              m: this._elem.maskManager.getMaskProperty(this._textData.p.m),
            }),
            (this._hasMaskedPath = !0))
          : (this._hasMaskedPath = !1),
          (this._moreOptions.alignment = n(this._elem, this._textData.m.a, 1, 0, this))
      }),
        (TextAnimatorProperty.prototype.getMeasures = function (e, t) {
          if (
            ((this.lettersChangedFlag = t),
            this._mdf || this._isFirstFrame || t || (this._hasMaskedPath && this._pathData.m._mdf))
          ) {
            this._isFirstFrame = !1
            var r,
              n,
              i,
              s,
              a,
              o,
              l,
              h,
              c,
              p,
              u,
              f,
              d,
              m,
              g,
              y,
              v,
              b,
              E,
              S = this._moreOptions.alignment.v,
              P = this._animatorsData,
              _ = this._textData,
              x = this.mHelper,
              C = this._renderType,
              A = this.renderedLetters.length,
              T = e.l
            if (this._hasMaskedPath) {
              if (((E = this._pathData.m), !this._pathData.n || this._pathData._mdf)) {
                var k,
                  w = E.v
                for (
                  this._pathData.r.v && (w = w.reverse()),
                    a = { tLength: 0, segments: [] },
                    s = w._length - 1,
                    y = 0,
                    i = 0;
                  i < s;
                  i += 1
                )
                  (k = bez.buildBezierData(
                    w.v[i],
                    w.v[i + 1],
                    [w.o[i][0] - w.v[i][0], w.o[i][1] - w.v[i][1]],
                    [w.i[i + 1][0] - w.v[i + 1][0], w.i[i + 1][1] - w.v[i + 1][1]]
                  )),
                    (a.tLength += k.segmentLength),
                    a.segments.push(k),
                    (y += k.segmentLength)
                ;(i = s),
                  E.v.c &&
                    ((k = bez.buildBezierData(
                      w.v[i],
                      w.v[0],
                      [w.o[i][0] - w.v[i][0], w.o[i][1] - w.v[i][1]],
                      [w.i[0][0] - w.v[0][0], w.i[0][1] - w.v[0][1]]
                    )),
                    (a.tLength += k.segmentLength),
                    a.segments.push(k),
                    (y += k.segmentLength)),
                  (this._pathData.pi = a)
              }
              if (
                ((a = this._pathData.pi),
                (o = this._pathData.f.v),
                (u = 0),
                (p = 1),
                (h = 0),
                (c = !0),
                (m = a.segments),
                o < 0 && E.v.c)
              )
                for (
                  a.tLength < Math.abs(o) && (o = -Math.abs(o) % a.tLength),
                    p = (d = m[(u = m.length - 1)].points).length - 1;
                  o < 0;

                )
                  (o += d[p].partialLength), (p -= 1) < 0 && (p = (d = m[(u -= 1)].points).length - 1)
              ;(f = (d = m[u].points)[p - 1]), (g = (l = d[p]).partialLength)
            }
            ;(s = T.length), (r = 0), (n = 0)
            var M,
              I,
              F,
              R,
              D,
              O = 1.2 * e.finalSize * 0.714,
              V = !0
            F = P.length
            var B,
              L,
              N,
              $,
              z,
              G,
              H,
              j,
              q,
              U,
              W,
              K,
              Y = -1,
              J = o,
              X = u,
              Q = p,
              Z = -1,
              ee = '',
              te = this.defaultPropsArray
            if (2 === e.j || 1 === e.j) {
              var re = 0,
                ne = 0,
                ie = 2 === e.j ? -0.5 : -1,
                se = 0,
                ae = !0
              for (i = 0; i < s; i += 1)
                if (T[i].n) {
                  for (re && (re += ne); se < i; ) (T[se].animatorJustifyOffset = re), (se += 1)
                  ;(re = 0), (ae = !0)
                } else {
                  for (I = 0; I < F; I += 1)
                    (M = P[I].a).t.propType &&
                      (ae && 2 === e.j && (ne += M.t.v * ie),
                      (D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)).length
                        ? (re += M.t.v * D[0] * ie)
                        : (re += M.t.v * D * ie))
                  ae = !1
                }
              for (re && (re += ne); se < i; ) (T[se].animatorJustifyOffset = re), (se += 1)
            }
            for (i = 0; i < s; i += 1) {
              if ((x.reset(), ($ = 1), T[i].n))
                (r = 0),
                  (n += e.yOffset),
                  (n += V ? 1 : 0),
                  (o = J),
                  (V = !1),
                  this._hasMaskedPath &&
                    ((p = Q), (f = (d = m[(u = X)].points)[p - 1]), (g = (l = d[p]).partialLength), (h = 0)),
                  (ee = ''),
                  (W = ''),
                  (q = ''),
                  (K = ''),
                  (te = this.defaultPropsArray)
              else {
                if (this._hasMaskedPath) {
                  if (Z !== T[i].line) {
                    switch (e.j) {
                      case 1:
                        o += y - e.lineWidths[T[i].line]
                        break
                      case 2:
                        o += (y - e.lineWidths[T[i].line]) / 2
                    }
                    Z = T[i].line
                  }
                  Y !== T[i].ind && (T[Y] && (o += T[Y].extra), (o += T[i].an / 2), (Y = T[i].ind)),
                    (o += S[0] * T[i].an * 0.005)
                  var oe = 0
                  for (I = 0; I < F; I += 1)
                    (M = P[I].a).p.propType &&
                      ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)).length
                        ? (oe += M.p.v[0] * D[0])
                        : (oe += M.p.v[0] * D)),
                      M.a.propType &&
                        ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)).length
                          ? (oe += M.a.v[0] * D[0])
                          : (oe += M.a.v[0] * D))
                  for (
                    c = !0,
                      this._pathData.a.v &&
                        ((o =
                          0.5 * T[0].an +
                          ((y - this._pathData.f.v - 0.5 * T[0].an - 0.5 * T[T.length - 1].an) * Y) / (s - 1)),
                        (o += this._pathData.f.v));
                    c;

                  )
                    h + g >= o + oe || !d
                      ? ((v = (o + oe - h) / l.partialLength),
                        (L = f.point[0] + (l.point[0] - f.point[0]) * v),
                        (N = f.point[1] + (l.point[1] - f.point[1]) * v),
                        x.translate(-S[0] * T[i].an * 0.005, -S[1] * O * 0.01),
                        (c = !1))
                      : d &&
                        ((h += l.partialLength),
                        (p += 1) >= d.length &&
                          ((p = 0),
                          m[(u += 1)]
                            ? (d = m[u].points)
                            : E.v.c
                            ? ((p = 0), (d = m[(u = 0)].points))
                            : ((h -= l.partialLength), (d = null))),
                        d && ((f = l), (g = (l = d[p]).partialLength)))
                  ;(B = T[i].an / 2 - T[i].add), x.translate(-B, 0, 0)
                } else
                  (B = T[i].an / 2 - T[i].add),
                    x.translate(-B, 0, 0),
                    x.translate(-S[0] * T[i].an * 0.005, -S[1] * O * 0.01, 0)
                for (I = 0; I < F; I += 1)
                  (M = P[I].a).t.propType &&
                    ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)),
                    (0 === r && 0 === e.j) ||
                      (this._hasMaskedPath
                        ? D.length
                          ? (o += M.t.v * D[0])
                          : (o += M.t.v * D)
                        : D.length
                        ? (r += M.t.v * D[0])
                        : (r += M.t.v * D)))
                for (
                  e.strokeWidthAnim && (G = e.sw || 0),
                    e.strokeColorAnim && (z = e.sc ? [e.sc[0], e.sc[1], e.sc[2]] : [0, 0, 0]),
                    e.fillColorAnim && e.fc && (H = [e.fc[0], e.fc[1], e.fc[2]]),
                    I = 0;
                  I < F;
                  I += 1
                )
                  (M = P[I].a).a.propType &&
                    ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)).length
                      ? x.translate(-M.a.v[0] * D[0], -M.a.v[1] * D[1], M.a.v[2] * D[2])
                      : x.translate(-M.a.v[0] * D, -M.a.v[1] * D, M.a.v[2] * D))
                for (I = 0; I < F; I += 1)
                  (M = P[I].a).s.propType &&
                    ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)).length
                      ? x.scale(1 + (M.s.v[0] - 1) * D[0], 1 + (M.s.v[1] - 1) * D[1], 1)
                      : x.scale(1 + (M.s.v[0] - 1) * D, 1 + (M.s.v[1] - 1) * D, 1))
                for (I = 0; I < F; I += 1) {
                  if (
                    ((M = P[I].a),
                    (D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)),
                    M.sk.propType &&
                      (D.length
                        ? x.skewFromAxis(-M.sk.v * D[0], M.sa.v * D[1])
                        : x.skewFromAxis(-M.sk.v * D, M.sa.v * D)),
                    M.r.propType && (D.length ? x.rotateZ(-M.r.v * D[2]) : x.rotateZ(-M.r.v * D)),
                    M.ry.propType && (D.length ? x.rotateY(M.ry.v * D[1]) : x.rotateY(M.ry.v * D)),
                    M.rx.propType && (D.length ? x.rotateX(M.rx.v * D[0]) : x.rotateX(M.rx.v * D)),
                    M.o.propType && (D.length ? ($ += (M.o.v * D[0] - $) * D[0]) : ($ += (M.o.v * D - $) * D)),
                    e.strokeWidthAnim && M.sw.propType && (D.length ? (G += M.sw.v * D[0]) : (G += M.sw.v * D)),
                    e.strokeColorAnim && M.sc.propType)
                  )
                    for (j = 0; j < 3; j += 1)
                      D.length ? (z[j] += (M.sc.v[j] - z[j]) * D[0]) : (z[j] += (M.sc.v[j] - z[j]) * D)
                  if (e.fillColorAnim && e.fc) {
                    if (M.fc.propType)
                      for (j = 0; j < 3; j += 1)
                        D.length ? (H[j] += (M.fc.v[j] - H[j]) * D[0]) : (H[j] += (M.fc.v[j] - H[j]) * D)
                    M.fh.propType && (H = D.length ? addHueToRGB(H, M.fh.v * D[0]) : addHueToRGB(H, M.fh.v * D)),
                      M.fs.propType &&
                        (H = D.length ? addSaturationToRGB(H, M.fs.v * D[0]) : addSaturationToRGB(H, M.fs.v * D)),
                      M.fb.propType &&
                        (H = D.length ? addBrightnessToRGB(H, M.fb.v * D[0]) : addBrightnessToRGB(H, M.fb.v * D))
                  }
                }
                for (I = 0; I < F; I += 1)
                  (M = P[I].a).p.propType &&
                    ((D = P[I].s.getMult(T[i].anIndexes[I], _.a[I].s.totalChars)),
                    this._hasMaskedPath
                      ? D.length
                        ? x.translate(0, M.p.v[1] * D[0], -M.p.v[2] * D[1])
                        : x.translate(0, M.p.v[1] * D, -M.p.v[2] * D)
                      : D.length
                      ? x.translate(M.p.v[0] * D[0], M.p.v[1] * D[1], -M.p.v[2] * D[2])
                      : x.translate(M.p.v[0] * D, M.p.v[1] * D, -M.p.v[2] * D))
                if (
                  (e.strokeWidthAnim && (q = G < 0 ? 0 : G),
                  e.strokeColorAnim &&
                    (U =
                      'rgb(' +
                      Math.round(255 * z[0]) +
                      ',' +
                      Math.round(255 * z[1]) +
                      ',' +
                      Math.round(255 * z[2]) +
                      ')'),
                  e.fillColorAnim &&
                    e.fc &&
                    (W =
                      'rgb(' +
                      Math.round(255 * H[0]) +
                      ',' +
                      Math.round(255 * H[1]) +
                      ',' +
                      Math.round(255 * H[2]) +
                      ')'),
                  this._hasMaskedPath)
                ) {
                  if ((x.translate(0, -e.ls), x.translate(0, S[1] * O * 0.01 + n, 0), this._pathData.p.v)) {
                    b = (l.point[1] - f.point[1]) / (l.point[0] - f.point[0])
                    var le = (180 * Math.atan(b)) / Math.PI
                    l.point[0] < f.point[0] && (le += 180), x.rotate((-le * Math.PI) / 180)
                  }
                  x.translate(L, N, 0),
                    (o -= S[0] * T[i].an * 0.005),
                    T[i + 1] && Y !== T[i + 1].ind && ((o += T[i].an / 2), (o += 0.001 * e.tr * e.finalSize))
                } else {
                  switch ((x.translate(r, n, 0), e.ps && x.translate(e.ps[0], e.ps[1] + e.ascent, 0), e.j)) {
                    case 1:
                      x.translate(
                        T[i].animatorJustifyOffset + e.justifyOffset + (e.boxWidth - e.lineWidths[T[i].line]),
                        0,
                        0
                      )
                      break
                    case 2:
                      x.translate(
                        T[i].animatorJustifyOffset + e.justifyOffset + (e.boxWidth - e.lineWidths[T[i].line]) / 2,
                        0,
                        0
                      )
                  }
                  x.translate(0, -e.ls),
                    x.translate(B, 0, 0),
                    x.translate(S[0] * T[i].an * 0.005, S[1] * O * 0.01, 0),
                    (r += T[i].l + 0.001 * e.tr * e.finalSize)
                }
                'html' === C
                  ? (ee = x.toCSS())
                  : 'svg' === C
                  ? (ee = x.to2dCSS())
                  : (te = [
                      x.props[0],
                      x.props[1],
                      x.props[2],
                      x.props[3],
                      x.props[4],
                      x.props[5],
                      x.props[6],
                      x.props[7],
                      x.props[8],
                      x.props[9],
                      x.props[10],
                      x.props[11],
                      x.props[12],
                      x.props[13],
                      x.props[14],
                      x.props[15],
                    ]),
                  (K = $)
              }
              A <= i
                ? ((R = new LetterProps(K, q, U, W, ee, te)),
                  this.renderedLetters.push(R),
                  (A += 1),
                  (this.lettersChangedFlag = !0))
                : ((R = this.renderedLetters[i]),
                  (this.lettersChangedFlag = R.update(K, q, U, W, ee, te) || this.lettersChangedFlag))
            }
          }
        }),
        (TextAnimatorProperty.prototype.getValue = function () {
          this._elem.globalData.frameId !== this._frameId &&
            ((this._frameId = this._elem.globalData.frameId), this.iterateDynamicProperties())
        }),
        (TextAnimatorProperty.prototype.mHelper = new Matrix()),
        (TextAnimatorProperty.prototype.defaultPropsArray = []),
        extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
        (ITextElement.prototype.initElement = function (e, t, r) {
          ;(this.lettersChangedFlag = !0),
            this.initFrame(),
            this.initBaseData(e, t, r),
            (this.textProperty = new TextProperty(this, e.t, this.dynamicProperties)),
            (this.textAnimator = new TextAnimatorProperty(e.t, this.renderType, this)),
            this.initTransform(e, t, r),
            this.initHierarchy(),
            this.initRenderable(),
            this.initRendererElement(),
            this.createContainerElements(),
            this.createRenderableComponents(),
            this.createContent(),
            this.hide(),
            this.textAnimator.searchProperties(this.dynamicProperties)
        }),
        (ITextElement.prototype.prepareFrame = function (e) {
          ;(this._mdf = !1),
            this.prepareRenderableFrame(e),
            this.prepareProperties(e, this.isInRange),
            (this.textProperty._mdf || this.textProperty._isFirstFrame) &&
              (this.buildNewText(), (this.textProperty._isFirstFrame = !1), (this.textProperty._mdf = !1))
        }),
        (ITextElement.prototype.createPathShape = function (e, t) {
          var r,
            n,
            i = t.length,
            s = ''
          for (r = 0; r < i; r += 1)
            'sh' === t[r].ty && ((n = t[r].ks.k), (s += buildShapeString(n, n.i.length, !0, e)))
          return s
        }),
        (ITextElement.prototype.updateDocumentData = function (e, t) {
          this.textProperty.updateDocumentData(e, t)
        }),
        (ITextElement.prototype.canResizeFont = function (e) {
          this.textProperty.canResizeFont(e)
        }),
        (ITextElement.prototype.setMinimumFontSize = function (e) {
          this.textProperty.setMinimumFontSize(e)
        }),
        (ITextElement.prototype.applyTextPropertiesToMatrix = function (e, t, r, n, i) {
          switch ((e.ps && t.translate(e.ps[0], e.ps[1] + e.ascent, 0), t.translate(0, -e.ls, 0), e.j)) {
            case 1:
              t.translate(e.justifyOffset + (e.boxWidth - e.lineWidths[r]), 0, 0)
              break
            case 2:
              t.translate(e.justifyOffset + (e.boxWidth - e.lineWidths[r]) / 2, 0, 0)
          }
          t.translate(n, i, 0)
        }),
        (ITextElement.prototype.buildColor = function (e) {
          return 'rgb(' + Math.round(255 * e[0]) + ',' + Math.round(255 * e[1]) + ',' + Math.round(255 * e[2]) + ')'
        }),
        (ITextElement.prototype.emptyProp = new LetterProps()),
        (ITextElement.prototype.destroy = function () {})
      var emptyShapeData = { shapes: [] }
      function SVGTextLottieElement(e, t, r) {
        ;(this.textSpans = []), (this.renderType = 'svg'), this.initElement(e, t, r)
      }
      function ISolidElement(e, t, r) {
        this.initElement(e, t, r)
      }
      function NullElement(e, t, r) {
        this.initFrame(),
          this.initBaseData(e, t, r),
          this.initFrame(),
          this.initTransform(e, t, r),
          this.initHierarchy()
      }
      function SVGRendererBase() {}
      function ICompElement() {}
      function SVGCompElement(e, t, r) {
        ;(this.layers = e.layers),
          (this.supports3d = !0),
          (this.completeLayers = !1),
          (this.pendingElements = []),
          (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
          this.initElement(e, t, r),
          (this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : { _placeholder: !0 })
      }
      function SVGRenderer(e, t) {
        ;(this.animationItem = e), (this.layers = null), (this.renderedFrame = -1), (this.svgElement = createNS('svg'))
        var r = ''
        if (t && t.title) {
          var n = createNS('title'),
            i = createElementID()
          n.setAttribute('id', i), (n.textContent = t.title), this.svgElement.appendChild(n), (r += i)
        }
        if (t && t.description) {
          var s = createNS('desc'),
            a = createElementID()
          s.setAttribute('id', a), (s.textContent = t.description), this.svgElement.appendChild(s), (r += ' ' + a)
        }
        r && this.svgElement.setAttribute('aria-labelledby', r)
        var o = createNS('defs')
        this.svgElement.appendChild(o)
        var l = createNS('g')
        this.svgElement.appendChild(l),
          (this.layerElement = l),
          (this.renderConfig = {
            preserveAspectRatio: (t && t.preserveAspectRatio) || 'xMidYMid meet',
            imagePreserveAspectRatio: (t && t.imagePreserveAspectRatio) || 'xMidYMid slice',
            contentVisibility: (t && t.contentVisibility) || 'visible',
            progressiveLoad: (t && t.progressiveLoad) || !1,
            hideOnTransparent: !(t && !1 === t.hideOnTransparent),
            viewBoxOnly: (t && t.viewBoxOnly) || !1,
            viewBoxSize: (t && t.viewBoxSize) || !1,
            className: (t && t.className) || '',
            id: (t && t.id) || '',
            focusable: t && t.focusable,
            filterSize: {
              width: (t && t.filterSize && t.filterSize.width) || '100%',
              height: (t && t.filterSize && t.filterSize.height) || '100%',
              x: (t && t.filterSize && t.filterSize.x) || '0%',
              y: (t && t.filterSize && t.filterSize.y) || '0%',
            },
          }),
          (this.globalData = { _mdf: !1, frameNum: -1, defs: o, renderConfig: this.renderConfig }),
          (this.elements = []),
          (this.pendingElements = []),
          (this.destroyed = !1),
          (this.rendererType = 'svg')
      }
      function CVContextData() {
        var e
        for (
          this.saved = [],
            this.cArrPos = 0,
            this.cTr = new Matrix(),
            this.cO = 1,
            this.savedOp = createTypedArray('float32', 15),
            e = 0;
          e < 15;
          e += 1
        )
          this.saved[e] = createTypedArray('float32', 16)
        this._length = 15
      }
      function ShapeTransformManager() {
        ;(this.sequences = {}), (this.sequenceList = []), (this.transform_key_count = 0)
      }
      function CVEffects() {}
      function CVMaskElement(e, t) {
        var r
        ;(this.data = e),
          (this.element = t),
          (this.masksProperties = this.data.masksProperties || []),
          (this.viewData = createSizedArray(this.masksProperties.length))
        var n = this.masksProperties.length,
          i = !1
        for (r = 0; r < n; r += 1)
          'n' !== this.masksProperties[r].mode && (i = !0),
            (this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3))
        ;(this.hasMasks = i), i && this.element.addRenderableComponent(this)
      }
      function CVBaseElement() {}
      function CVShapeData(e, t, r, n) {
        ;(this.styledShapes = []), (this.tr = [0, 0, 0, 0, 0, 0])
        var i,
          s = 4
        'rc' === t.ty ? (s = 5) : 'el' === t.ty ? (s = 6) : 'sr' === t.ty && (s = 7),
          (this.sh = ShapePropertyFactory.getShapeProp(e, t, s, e))
        var a,
          o = r.length
        for (i = 0; i < o; i += 1)
          r[i].closed ||
            ((a = { transforms: n.addTransformSequence(r[i].transforms), trNodes: [] }),
            this.styledShapes.push(a),
            r[i].elements.push(a))
      }
      function CVShapeElement(e, t, r) {
        ;(this.shapes = []),
          (this.shapesData = e.shapes),
          (this.stylesList = []),
          (this.itemsData = []),
          (this.prevViewData = []),
          (this.shapeModifiers = []),
          (this.processedElements = []),
          (this.transformsManager = new ShapeTransformManager()),
          this.initElement(e, t, r)
      }
      function CVTextElement(e, t, r) {
        ;(this.textSpans = []),
          (this.yOffset = 0),
          (this.fillColorAnim = !1),
          (this.strokeColorAnim = !1),
          (this.strokeWidthAnim = !1),
          (this.stroke = !1),
          (this.fill = !1),
          (this.justifyOffset = 0),
          (this.currentRender = null),
          (this.renderType = 'canvas'),
          (this.values = { fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', sWidth: 0, fValue: '' }),
          this.initElement(e, t, r)
      }
      function CVImageElement(e, t, r) {
        ;(this.assetData = t.getAssetData(e.refId)),
          (this.img = t.imageLoader.getAsset(this.assetData)),
          this.initElement(e, t, r)
      }
      function CVSolidElement(e, t, r) {
        this.initElement(e, t, r)
      }
      function CanvasRendererBase(e, t) {
        ;(this.animationItem = e),
          (this.renderConfig = {
            clearCanvas: !t || void 0 === t.clearCanvas || t.clearCanvas,
            context: (t && t.context) || null,
            progressiveLoad: (t && t.progressiveLoad) || !1,
            preserveAspectRatio: (t && t.preserveAspectRatio) || 'xMidYMid meet',
            imagePreserveAspectRatio: (t && t.imagePreserveAspectRatio) || 'xMidYMid slice',
            contentVisibility: (t && t.contentVisibility) || 'visible',
            className: (t && t.className) || '',
            id: (t && t.id) || '',
          }),
          (this.renderConfig.dpr = (t && t.dpr) || 1),
          this.animationItem.wrapper && (this.renderConfig.dpr = (t && t.dpr) || window.devicePixelRatio || 1),
          (this.renderedFrame = -1),
          (this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }),
          (this.contextData = new CVContextData()),
          (this.elements = []),
          (this.pendingElements = []),
          (this.transformMat = new Matrix()),
          (this.completeLayers = !1),
          (this.rendererType = 'canvas')
      }
      function CVCompElement(e, t, r) {
        ;(this.completeLayers = !1),
          (this.layers = e.layers),
          (this.pendingElements = []),
          (this.elements = createSizedArray(this.layers.length)),
          this.initElement(e, t, r),
          (this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : { _placeholder: !0 })
      }
      function CanvasRenderer(e, t) {
        ;(this.animationItem = e),
          (this.renderConfig = {
            clearCanvas: !t || void 0 === t.clearCanvas || t.clearCanvas,
            context: (t && t.context) || null,
            progressiveLoad: (t && t.progressiveLoad) || !1,
            preserveAspectRatio: (t && t.preserveAspectRatio) || 'xMidYMid meet',
            imagePreserveAspectRatio: (t && t.imagePreserveAspectRatio) || 'xMidYMid slice',
            contentVisibility: (t && t.contentVisibility) || 'visible',
            className: (t && t.className) || '',
            id: (t && t.id) || '',
          }),
          (this.renderConfig.dpr = (t && t.dpr) || 1),
          this.animationItem.wrapper && (this.renderConfig.dpr = (t && t.dpr) || window.devicePixelRatio || 1),
          (this.renderedFrame = -1),
          (this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }),
          (this.contextData = new CVContextData()),
          (this.elements = []),
          (this.pendingElements = []),
          (this.transformMat = new Matrix()),
          (this.completeLayers = !1),
          (this.rendererType = 'canvas')
      }
      function HBaseElement() {}
      function HSolidElement(e, t, r) {
        this.initElement(e, t, r)
      }
      function HShapeElement(e, t, r) {
        ;(this.shapes = []),
          (this.shapesData = e.shapes),
          (this.stylesList = []),
          (this.shapeModifiers = []),
          (this.itemsData = []),
          (this.processedElements = []),
          (this.animatedContents = []),
          (this.shapesContainer = createNS('g')),
          this.initElement(e, t, r),
          (this.prevViewData = []),
          (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 })
      }
      function HTextElement(e, t, r) {
        ;(this.textSpans = []),
          (this.textPaths = []),
          (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 }),
          (this.renderType = 'svg'),
          (this.isMasked = !1),
          this.initElement(e, t, r)
      }
      function HCameraElement(e, t, r) {
        this.initFrame(), this.initBaseData(e, t, r), this.initHierarchy()
        var n = PropertyFactory.getProp
        if (
          ((this.pe = n(this, e.pe, 0, 0, this)),
          e.ks.p.s
            ? ((this.px = n(this, e.ks.p.x, 1, 0, this)),
              (this.py = n(this, e.ks.p.y, 1, 0, this)),
              (this.pz = n(this, e.ks.p.z, 1, 0, this)))
            : (this.p = n(this, e.ks.p, 1, 0, this)),
          e.ks.a && (this.a = n(this, e.ks.a, 1, 0, this)),
          e.ks.or.k.length && e.ks.or.k[0].to)
        ) {
          var i,
            s = e.ks.or.k.length
          for (i = 0; i < s; i += 1) (e.ks.or.k[i].to = null), (e.ks.or.k[i].ti = null)
        }
        ;(this.or = n(this, e.ks.or, 1, degToRads, this)),
          (this.or.sh = !0),
          (this.rx = n(this, e.ks.rx, 0, degToRads, this)),
          (this.ry = n(this, e.ks.ry, 0, degToRads, this)),
          (this.rz = n(this, e.ks.rz, 0, degToRads, this)),
          (this.mat = new Matrix()),
          (this._prevMat = new Matrix()),
          (this._isFirstFrame = !0),
          (this.finalTransform = { mProp: this })
      }
      function HImageElement(e, t, r) {
        ;(this.assetData = t.getAssetData(e.refId)), this.initElement(e, t, r)
      }
      function HybridRendererBase(e, t) {
        ;(this.animationItem = e),
          (this.layers = null),
          (this.renderedFrame = -1),
          (this.renderConfig = {
            className: (t && t.className) || '',
            imagePreserveAspectRatio: (t && t.imagePreserveAspectRatio) || 'xMidYMid slice',
            hideOnTransparent: !(t && !1 === t.hideOnTransparent),
            filterSize: {
              width: (t && t.filterSize && t.filterSize.width) || '400%',
              height: (t && t.filterSize && t.filterSize.height) || '400%',
              x: (t && t.filterSize && t.filterSize.x) || '-100%',
              y: (t && t.filterSize && t.filterSize.y) || '-100%',
            },
          }),
          (this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }),
          (this.pendingElements = []),
          (this.elements = []),
          (this.threeDElements = []),
          (this.destroyed = !1),
          (this.camera = null),
          (this.supports3d = !0),
          (this.rendererType = 'html')
      }
      function HCompElement(e, t, r) {
        ;(this.layers = e.layers),
          (this.supports3d = !e.hasMask),
          (this.completeLayers = !1),
          (this.pendingElements = []),
          (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
          this.initElement(e, t, r),
          (this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : { _placeholder: !0 })
      }
      function HybridRenderer(e, t) {
        ;(this.animationItem = e),
          (this.layers = null),
          (this.renderedFrame = -1),
          (this.renderConfig = {
            className: (t && t.className) || '',
            imagePreserveAspectRatio: (t && t.imagePreserveAspectRatio) || 'xMidYMid slice',
            hideOnTransparent: !(t && !1 === t.hideOnTransparent),
            filterSize: {
              width: (t && t.filterSize && t.filterSize.width) || '400%',
              height: (t && t.filterSize && t.filterSize.height) || '400%',
              x: (t && t.filterSize && t.filterSize.x) || '-100%',
              y: (t && t.filterSize && t.filterSize.y) || '-100%',
            },
          }),
          (this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }),
          (this.pendingElements = []),
          (this.elements = []),
          (this.threeDElements = []),
          (this.destroyed = !1),
          (this.camera = null),
          (this.supports3d = !0),
          (this.rendererType = 'html')
      }
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
          ITextElement,
        ],
        SVGTextLottieElement
      ),
        (SVGTextLottieElement.prototype.createContent = function () {
          this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS('text'))
        }),
        (SVGTextLottieElement.prototype.buildTextContents = function (e) {
          for (var t = 0, r = e.length, n = [], i = ''; t < r; )
            e[t] === String.fromCharCode(13) || e[t] === String.fromCharCode(3) ? (n.push(i), (i = '')) : (i += e[t]),
              (t += 1)
          return n.push(i), n
        }),
        (SVGTextLottieElement.prototype.buildNewText = function () {
          var e, t
          this.addDynamicProperty(this)
          var r = this.textProperty.currentData
          ;(this.renderedLetters = createSizedArray(r ? r.l.length : 0)),
            r.fc
              ? this.layerElement.setAttribute('fill', this.buildColor(r.fc))
              : this.layerElement.setAttribute('fill', 'rgba(0,0,0,0)'),
            r.sc &&
              (this.layerElement.setAttribute('stroke', this.buildColor(r.sc)),
              this.layerElement.setAttribute('stroke-width', r.sw)),
            this.layerElement.setAttribute('font-size', r.finalSize)
          var n = this.globalData.fontManager.getFontByName(r.f)
          if (n.fClass) this.layerElement.setAttribute('class', n.fClass)
          else {
            this.layerElement.setAttribute('font-family', n.fFamily)
            var i = r.fWeight,
              s = r.fStyle
            this.layerElement.setAttribute('font-style', s), this.layerElement.setAttribute('font-weight', i)
          }
          this.layerElement.setAttribute('aria-label', r.t)
          var a,
            o = r.l || [],
            l = !!this.globalData.fontManager.chars
          t = o.length
          var h = this.mHelper,
            c = this.data.singleShape,
            p = 0,
            u = 0,
            f = !0,
            d = 0.001 * r.tr * r.finalSize
          if (!c || l || r.sz) {
            var m,
              g = this.textSpans.length
            for (e = 0; e < t; e += 1) {
              if (
                (this.textSpans[e] || (this.textSpans[e] = { span: null, childSpan: null, glyph: null }),
                !l || !c || 0 === e)
              ) {
                if (((a = g > e ? this.textSpans[e].span : createNS(l ? 'g' : 'text')), g <= e)) {
                  if (
                    (a.setAttribute('stroke-linecap', 'butt'),
                    a.setAttribute('stroke-linejoin', 'round'),
                    a.setAttribute('stroke-miterlimit', '4'),
                    (this.textSpans[e].span = a),
                    l)
                  ) {
                    var y = createNS('g')
                    a.appendChild(y), (this.textSpans[e].childSpan = y)
                  }
                  ;(this.textSpans[e].span = a), this.layerElement.appendChild(a)
                }
                a.style.display = 'inherit'
              }
              if (
                (h.reset(),
                h.scale(r.finalSize / 100, r.finalSize / 100),
                c &&
                  (o[e].n && ((p = -d), (u += r.yOffset), (u += f ? 1 : 0), (f = !1)),
                  this.applyTextPropertiesToMatrix(r, h, o[e].line, p, u),
                  (p += o[e].l || 0),
                  (p += d)),
                l)
              ) {
                var v
                if (
                  1 ===
                  (m = this.globalData.fontManager.getCharData(
                    r.finalText[e],
                    n.fStyle,
                    this.globalData.fontManager.getFontByName(r.f).fFamily
                  )).t
                )
                  v = new SVGCompElement(m.data, this.globalData, this)
                else {
                  var b = emptyShapeData
                  m.data && m.data.shapes && (b = m.data), (v = new SVGShapeElement(b, this.globalData, this))
                }
                ;(this.textSpans[e].glyph = v),
                  (v._debug = !0),
                  v.prepareFrame(0),
                  v.renderFrame(),
                  this.textSpans[e].childSpan.appendChild(v.layerElement),
                  this.textSpans[e].childSpan.setAttribute(
                    'transform',
                    'scale(' + r.finalSize / 100 + ',' + r.finalSize / 100 + ')'
                  )
              } else
                c && a.setAttribute('transform', 'translate(' + h.props[12] + ',' + h.props[13] + ')'),
                  (a.textContent = o[e].val),
                  a.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve')
            }
            c && a && a.setAttribute('d', '')
          } else {
            var E = this.textContainer,
              S = 'start'
            switch (r.j) {
              case 1:
                S = 'end'
                break
              case 2:
                S = 'middle'
                break
              default:
                S = 'start'
            }
            E.setAttribute('text-anchor', S), E.setAttribute('letter-spacing', d)
            var P = this.buildTextContents(r.finalText)
            for (t = P.length, u = r.ps ? r.ps[1] + r.ascent : 0, e = 0; e < t; e += 1)
              ((a = this.textSpans[e].span || createNS('tspan')).textContent = P[e]),
                a.setAttribute('x', 0),
                a.setAttribute('y', u),
                (a.style.display = 'inherit'),
                E.appendChild(a),
                this.textSpans[e] || (this.textSpans[e] = { span: null, glyph: null }),
                (this.textSpans[e].span = a),
                (u += r.finalLineHeight)
            this.layerElement.appendChild(E)
          }
          for (; e < this.textSpans.length; ) (this.textSpans[e].span.style.display = 'none'), (e += 1)
          this._sizeChanged = !0
        }),
        (SVGTextLottieElement.prototype.sourceRectAtTime = function () {
          if (
            (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged)
          ) {
            this._sizeChanged = !1
            var e = this.layerElement.getBBox()
            this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height }
          }
          return this.bbox
        }),
        (SVGTextLottieElement.prototype.getValue = function () {
          var e,
            t,
            r = this.textSpans.length
          for (this.renderedFrame = this.comp.renderedFrame, e = 0; e < r; e += 1)
            (t = this.textSpans[e].glyph) &&
              (t.prepareFrame(this.comp.renderedFrame - this.data.st), t._mdf && (this._mdf = !0))
        }),
        (SVGTextLottieElement.prototype.renderInnerContent = function () {
          if (
            (!this.data.singleShape || this._mdf) &&
            (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
            this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
          ) {
            var e, t
            this._sizeChanged = !0
            var r,
              n,
              i,
              s = this.textAnimator.renderedLetters,
              a = this.textProperty.currentData.l
            for (t = a.length, e = 0; e < t; e += 1)
              a[e].n ||
                ((r = s[e]),
                (n = this.textSpans[e].span),
                (i = this.textSpans[e].glyph) && i.renderFrame(),
                r._mdf.m && n.setAttribute('transform', r.m),
                r._mdf.o && n.setAttribute('opacity', r.o),
                r._mdf.sw && n.setAttribute('stroke-width', r.sw),
                r._mdf.sc && n.setAttribute('stroke', r.sc),
                r._mdf.fc && n.setAttribute('fill', r.fc))
          }
        }),
        extendPrototype([IImageElement], ISolidElement),
        (ISolidElement.prototype.createContent = function () {
          var e = createNS('rect')
          e.setAttribute('width', this.data.sw),
            e.setAttribute('height', this.data.sh),
            e.setAttribute('fill', this.data.sc),
            this.layerElement.appendChild(e)
        }),
        (NullElement.prototype.prepareFrame = function (e) {
          this.prepareProperties(e, !0)
        }),
        (NullElement.prototype.renderFrame = function () {}),
        (NullElement.prototype.getBaseElement = function () {
          return null
        }),
        (NullElement.prototype.destroy = function () {}),
        (NullElement.prototype.sourceRectAtTime = function () {}),
        (NullElement.prototype.hide = function () {}),
        extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
        extendPrototype([BaseRenderer], SVGRendererBase),
        (SVGRendererBase.prototype.createNull = function (e) {
          return new NullElement(e, this.globalData, this)
        }),
        (SVGRendererBase.prototype.createShape = function (e) {
          return new SVGShapeElement(e, this.globalData, this)
        }),
        (SVGRendererBase.prototype.createText = function (e) {
          return new SVGTextLottieElement(e, this.globalData, this)
        }),
        (SVGRendererBase.prototype.createImage = function (e) {
          return new IImageElement(e, this.globalData, this)
        }),
        (SVGRendererBase.prototype.createSolid = function (e) {
          return new ISolidElement(e, this.globalData, this)
        }),
        (SVGRendererBase.prototype.configAnimation = function (e) {
          this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
            this.renderConfig.viewBoxSize
              ? this.svgElement.setAttribute('viewBox', this.renderConfig.viewBoxSize)
              : this.svgElement.setAttribute('viewBox', '0 0 ' + e.w + ' ' + e.h),
            this.renderConfig.viewBoxOnly ||
              (this.svgElement.setAttribute('width', e.w),
              this.svgElement.setAttribute('height', e.h),
              (this.svgElement.style.width = '100%'),
              (this.svgElement.style.height = '100%'),
              (this.svgElement.style.transform = 'translate3d(0,0,0)'),
              (this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility)),
            this.renderConfig.className && this.svgElement.setAttribute('class', this.renderConfig.className),
            this.renderConfig.id && this.svgElement.setAttribute('id', this.renderConfig.id),
            void 0 !== this.renderConfig.focusable &&
              this.svgElement.setAttribute('focusable', this.renderConfig.focusable),
            this.svgElement.setAttribute('preserveAspectRatio', this.renderConfig.preserveAspectRatio),
            this.animationItem.wrapper.appendChild(this.svgElement)
          var t = this.globalData.defs
          this.setupGlobalData(e, t),
            (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
            (this.data = e)
          var r = createNS('clipPath'),
            n = createNS('rect')
          n.setAttribute('width', e.w), n.setAttribute('height', e.h), n.setAttribute('x', 0), n.setAttribute('y', 0)
          var i = createElementID()
          r.setAttribute('id', i),
            r.appendChild(n),
            this.layerElement.setAttribute('clip-path', 'url(' + getLocationHref() + '#' + i + ')'),
            t.appendChild(r),
            (this.layers = e.layers),
            (this.elements = createSizedArray(e.layers.length))
        }),
        (SVGRendererBase.prototype.destroy = function () {
          var e
          this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ''),
            (this.layerElement = null),
            (this.globalData.defs = null)
          var t = this.layers ? this.layers.length : 0
          for (e = 0; e < t; e += 1) this.elements[e] && this.elements[e].destroy()
          ;(this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null)
        }),
        (SVGRendererBase.prototype.updateContainerSize = function () {}),
        (SVGRendererBase.prototype.buildItem = function (e) {
          var t = this.elements
          if (!t[e] && 99 !== this.layers[e].ty) {
            t[e] = !0
            var r = this.createItem(this.layers[e])
            ;(t[e] = r),
              getExpressionsPlugin() &&
                (0 === this.layers[e].ty && this.globalData.projectInterface.registerComposition(r),
                r.initExpressions()),
              this.appendElementInPos(r, e),
              this.layers[e].tt &&
                (this.elements[e - 1] && !0 !== this.elements[e - 1]
                  ? r.setMatte(t[e - 1].layerId)
                  : (this.buildItem(e - 1), this.addPendingElement(r)))
          }
        }),
        (SVGRendererBase.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length; ) {
            var e = this.pendingElements.pop()
            if ((e.checkParenting(), e.data.tt))
              for (var t = 0, r = this.elements.length; t < r; ) {
                if (this.elements[t] === e) {
                  e.setMatte(this.elements[t - 1].layerId)
                  break
                }
                t += 1
              }
          }
        }),
        (SVGRendererBase.prototype.renderFrame = function (e) {
          if (this.renderedFrame !== e && !this.destroyed) {
            var t
            null === e ? (e = this.renderedFrame) : (this.renderedFrame = e),
              (this.globalData.frameNum = e),
              (this.globalData.frameId += 1),
              (this.globalData.projectInterface.currentFrame = e),
              (this.globalData._mdf = !1)
            var r = this.layers.length
            for (this.completeLayers || this.checkLayers(e), t = r - 1; t >= 0; t -= 1)
              (this.completeLayers || this.elements[t]) && this.elements[t].prepareFrame(e - this.layers[t].st)
            if (this.globalData._mdf)
              for (t = 0; t < r; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
          }
        }),
        (SVGRendererBase.prototype.appendElementInPos = function (e, t) {
          var r = e.getBaseElement()
          if (r) {
            for (var n, i = 0; i < t; )
              this.elements[i] &&
                !0 !== this.elements[i] &&
                this.elements[i].getBaseElement() &&
                (n = this.elements[i].getBaseElement()),
                (i += 1)
            n ? this.layerElement.insertBefore(r, n) : this.layerElement.appendChild(r)
          }
        }),
        (SVGRendererBase.prototype.hide = function () {
          this.layerElement.style.display = 'none'
        }),
        (SVGRendererBase.prototype.show = function () {
          this.layerElement.style.display = 'block'
        }),
        extendPrototype(
          [BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement],
          ICompElement
        ),
        (ICompElement.prototype.initElement = function (e, t, r) {
          this.initFrame(),
            this.initBaseData(e, t, r),
            this.initTransform(e, t, r),
            this.initRenderable(),
            this.initHierarchy(),
            this.initRendererElement(),
            this.createContainerElements(),
            this.createRenderableComponents(),
            (!this.data.xt && t.progressiveLoad) || this.buildAllItems(),
            this.hide()
        }),
        (ICompElement.prototype.prepareFrame = function (e) {
          if (
            ((this._mdf = !1),
            this.prepareRenderableFrame(e),
            this.prepareProperties(e, this.isInRange),
            this.isInRange || this.data.xt)
          ) {
            if (this.tm._placeholder) this.renderedFrame = e / this.data.sr
            else {
              var t = this.tm.v
              t === this.data.op && (t = this.data.op - 1), (this.renderedFrame = t)
            }
            var r,
              n = this.elements.length
            for (this.completeLayers || this.checkLayers(this.renderedFrame), r = n - 1; r >= 0; r -= 1)
              (this.completeLayers || this.elements[r]) &&
                (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st),
                this.elements[r]._mdf && (this._mdf = !0))
          }
        }),
        (ICompElement.prototype.renderInnerContent = function () {
          var e,
            t = this.layers.length
          for (e = 0; e < t; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
        }),
        (ICompElement.prototype.setElements = function (e) {
          this.elements = e
        }),
        (ICompElement.prototype.getElements = function () {
          return this.elements
        }),
        (ICompElement.prototype.destroyElements = function () {
          var e,
            t = this.layers.length
          for (e = 0; e < t; e += 1) this.elements[e] && this.elements[e].destroy()
        }),
        (ICompElement.prototype.destroy = function () {
          this.destroyElements(), this.destroyBaseElement()
        }),
        extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement),
        (SVGCompElement.prototype.createComp = function (e) {
          return new SVGCompElement(e, this.globalData, this)
        }),
        extendPrototype([SVGRendererBase], SVGRenderer),
        (SVGRenderer.prototype.createComp = function (e) {
          return new SVGCompElement(e, this.globalData, this)
        }),
        (CVContextData.prototype.duplicate = function () {
          var e = 2 * this._length,
            t = this.savedOp
          ;(this.savedOp = createTypedArray('float32', e)), this.savedOp.set(t)
          var r = 0
          for (r = this._length; r < e; r += 1) this.saved[r] = createTypedArray('float32', 16)
          this._length = e
        }),
        (CVContextData.prototype.reset = function () {
          ;(this.cArrPos = 0), this.cTr.reset(), (this.cO = 1)
        }),
        (ShapeTransformManager.prototype = {
          addTransformSequence: function (e) {
            var t,
              r = e.length,
              n = '_'
            for (t = 0; t < r; t += 1) n += e[t].transform.key + '_'
            var i = this.sequences[n]
            return (
              i ||
                ((i = { transforms: [].concat(e), finalTransform: new Matrix(), _mdf: !1 }),
                (this.sequences[n] = i),
                this.sequenceList.push(i)),
              i
            )
          },
          processSequence: function (e, t) {
            for (var r, n = 0, i = e.transforms.length, s = t; n < i && !t; ) {
              if (e.transforms[n].transform.mProps._mdf) {
                s = !0
                break
              }
              n += 1
            }
            if (s)
              for (e.finalTransform.reset(), n = i - 1; n >= 0; n -= 1)
                (r = e.transforms[n].transform.mProps.v.props),
                  e.finalTransform.transform(
                    r[0],
                    r[1],
                    r[2],
                    r[3],
                    r[4],
                    r[5],
                    r[6],
                    r[7],
                    r[8],
                    r[9],
                    r[10],
                    r[11],
                    r[12],
                    r[13],
                    r[14],
                    r[15]
                  )
            e._mdf = s
          },
          processSequences: function (e) {
            var t,
              r = this.sequenceList.length
            for (t = 0; t < r; t += 1) this.processSequence(this.sequenceList[t], e)
          },
          getNewKey: function () {
            return (this.transform_key_count += 1), '_' + this.transform_key_count
          },
        }),
        (CVEffects.prototype.renderFrame = function () {}),
        (CVMaskElement.prototype.renderFrame = function () {
          if (this.hasMasks) {
            var e,
              t,
              r,
              n,
              i = this.element.finalTransform.mat,
              s = this.element.canvasContext,
              a = this.masksProperties.length
            for (s.beginPath(), e = 0; e < a; e += 1)
              if ('n' !== this.masksProperties[e].mode) {
                var o
                this.masksProperties[e].inv &&
                  (s.moveTo(0, 0),
                  s.lineTo(this.element.globalData.compSize.w, 0),
                  s.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h),
                  s.lineTo(0, this.element.globalData.compSize.h),
                  s.lineTo(0, 0)),
                  (n = this.viewData[e].v),
                  (t = i.applyToPointArray(n.v[0][0], n.v[0][1], 0)),
                  s.moveTo(t[0], t[1])
                var l = n._length
                for (o = 1; o < l; o += 1)
                  (r = i.applyToTriplePoints(n.o[o - 1], n.i[o], n.v[o])),
                    s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
                ;(r = i.applyToTriplePoints(n.o[o - 1], n.i[0], n.v[0])),
                  s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
              }
            this.element.globalData.renderer.save(!0), s.clip()
          }
        }),
        (CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty),
        (CVMaskElement.prototype.destroy = function () {
          this.element = null
        }),
        (CVBaseElement.prototype = {
          createElements: function () {},
          initRendererElement: function () {},
          createContainerElements: function () {
            ;(this.canvasContext = this.globalData.canvasContext), (this.renderableEffectsManager = new CVEffects(this))
          },
          createContent: function () {},
          setBlendMode: function () {
            var e = this.globalData
            if (e.blendMode !== this.data.bm) {
              e.blendMode = this.data.bm
              var t = getBlendMode(this.data.bm)
              e.canvasContext.globalCompositeOperation = t
            }
          },
          createRenderableComponents: function () {
            this.maskManager = new CVMaskElement(this.data, this)
          },
          hideElement: function () {
            this.hidden || (this.isInRange && !this.isTransparent) || (this.hidden = !0)
          },
          showElement: function () {
            this.isInRange &&
              !this.isTransparent &&
              ((this.hidden = !1), (this._isFirstFrame = !0), (this.maskManager._isFirstFrame = !0))
          },
          renderFrame: function () {
            if (!this.hidden && !this.data.hd) {
              this.renderTransform(), this.renderRenderable(), this.setBlendMode()
              var e = 0 === this.data.ty
              this.globalData.renderer.save(e),
                this.globalData.renderer.ctxTransform(this.finalTransform.mat.props),
                this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v),
                this.renderInnerContent(),
                this.globalData.renderer.restore(e),
                this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
                this._isFirstFrame && (this._isFirstFrame = !1)
            }
          },
          destroy: function () {
            ;(this.canvasContext = null), (this.data = null), (this.globalData = null), this.maskManager.destroy()
          },
          mHelper: new Matrix(),
        }),
        (CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement),
        (CVBaseElement.prototype.show = CVBaseElement.prototype.showElement),
        (CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated),
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            IShapeElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          CVShapeElement
        ),
        (CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement),
        (CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: !1 }),
        (CVShapeElement.prototype.dashResetter = []),
        (CVShapeElement.prototype.createContent = function () {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
        }),
        (CVShapeElement.prototype.createStyleElement = function (e, t) {
          var r = {
              data: e,
              type: e.ty,
              preTransforms: this.transformsManager.addTransformSequence(t),
              transforms: [],
              elements: [],
              closed: !0 === e.hd,
            },
            n = {}
          if (
            ('fl' === e.ty || 'st' === e.ty
              ? ((n.c = PropertyFactory.getProp(this, e.c, 1, 255, this)),
                n.c.k || (r.co = 'rgb(' + bmFloor(n.c.v[0]) + ',' + bmFloor(n.c.v[1]) + ',' + bmFloor(n.c.v[2]) + ')'))
              : ('gf' !== e.ty && 'gs' !== e.ty) ||
                ((n.s = PropertyFactory.getProp(this, e.s, 1, null, this)),
                (n.e = PropertyFactory.getProp(this, e.e, 1, null, this)),
                (n.h = PropertyFactory.getProp(this, e.h || { k: 0 }, 0, 0.01, this)),
                (n.a = PropertyFactory.getProp(this, e.a || { k: 0 }, 0, degToRads, this)),
                (n.g = new GradientProperty(this, e.g, this))),
            (n.o = PropertyFactory.getProp(this, e.o, 0, 0.01, this)),
            'st' === e.ty || 'gs' === e.ty)
          ) {
            if (
              ((r.lc = lineCapEnum[e.lc || 2]),
              (r.lj = lineJoinEnum[e.lj || 2]),
              1 == e.lj && (r.ml = e.ml),
              (n.w = PropertyFactory.getProp(this, e.w, 0, null, this)),
              n.w.k || (r.wi = n.w.v),
              e.d)
            ) {
              var i = new DashProperty(this, e.d, 'canvas', this)
              ;(n.d = i), n.d.k || ((r.da = n.d.dashArray), (r.do = n.d.dashoffset[0]))
            }
          } else r.r = 2 === e.r ? 'evenodd' : 'nonzero'
          return this.stylesList.push(r), (n.style = r), n
        }),
        (CVShapeElement.prototype.createGroupElement = function () {
          return { it: [], prevViewData: [] }
        }),
        (CVShapeElement.prototype.createTransformElement = function (e) {
          return {
            transform: {
              opacity: 1,
              _opMdf: !1,
              key: this.transformsManager.getNewKey(),
              op: PropertyFactory.getProp(this, e.o, 0, 0.01, this),
              mProps: TransformPropertyFactory.getTransformProperty(this, e, this),
            },
          }
        }),
        (CVShapeElement.prototype.createShapeElement = function (e) {
          var t = new CVShapeData(this, e, this.stylesList, this.transformsManager)
          return this.shapes.push(t), this.addShapeToModifiers(t), t
        }),
        (CVShapeElement.prototype.reloadShapes = function () {
          var e
          this._isFirstFrame = !0
          var t = this.itemsData.length
          for (e = 0; e < t; e += 1) this.prevViewData[e] = this.itemsData[e]
          for (
            this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []),
              t = this.dynamicProperties.length,
              e = 0;
            e < t;
            e += 1
          )
            this.dynamicProperties[e].getValue()
          this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
        }),
        (CVShapeElement.prototype.addTransformToStyleList = function (e) {
          var t,
            r = this.stylesList.length
          for (t = 0; t < r; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.push(e)
        }),
        (CVShapeElement.prototype.removeTransformFromStyleList = function () {
          var e,
            t = this.stylesList.length
          for (e = 0; e < t; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.pop()
        }),
        (CVShapeElement.prototype.closeStyles = function (e) {
          var t,
            r = e.length
          for (t = 0; t < r; t += 1) e[t].closed = !0
        }),
        (CVShapeElement.prototype.searchShapes = function (e, t, r, n, i) {
          var s,
            a,
            o,
            l,
            h,
            c,
            p = e.length - 1,
            u = [],
            f = [],
            d = [].concat(i)
          for (s = p; s >= 0; s -= 1) {
            if (
              ((l = this.searchProcessedElement(e[s])) ? (t[s] = r[l - 1]) : (e[s]._shouldRender = n),
              'fl' === e[s].ty || 'st' === e[s].ty || 'gf' === e[s].ty || 'gs' === e[s].ty)
            )
              l ? (t[s].style.closed = !1) : (t[s] = this.createStyleElement(e[s], d)), u.push(t[s].style)
            else if ('gr' === e[s].ty) {
              if (l) for (o = t[s].it.length, a = 0; a < o; a += 1) t[s].prevViewData[a] = t[s].it[a]
              else t[s] = this.createGroupElement(e[s])
              this.searchShapes(e[s].it, t[s].it, t[s].prevViewData, n, d)
            } else
              'tr' === e[s].ty
                ? (l || ((c = this.createTransformElement(e[s])), (t[s] = c)),
                  d.push(t[s]),
                  this.addTransformToStyleList(t[s]))
                : 'sh' === e[s].ty || 'rc' === e[s].ty || 'el' === e[s].ty || 'sr' === e[s].ty
                ? l || (t[s] = this.createShapeElement(e[s]))
                : 'tm' === e[s].ty || 'rd' === e[s].ty || 'pb' === e[s].ty
                ? (l
                    ? ((h = t[s]).closed = !1)
                    : ((h = ShapeModifiers.getModifier(e[s].ty)).init(this, e[s]),
                      (t[s] = h),
                      this.shapeModifiers.push(h)),
                  f.push(h))
                : 'rp' === e[s].ty &&
                  (l
                    ? ((h = t[s]).closed = !0)
                    : ((h = ShapeModifiers.getModifier(e[s].ty)),
                      (t[s] = h),
                      h.init(this, e, s, t),
                      this.shapeModifiers.push(h),
                      (n = !1)),
                  f.push(h))
            this.addProcessedElement(e[s], s + 1)
          }
          for (this.removeTransformFromStyleList(), this.closeStyles(u), p = f.length, s = 0; s < p; s += 1)
            f[s].closed = !0
        }),
        (CVShapeElement.prototype.renderInnerContent = function () {
          ;(this.transformHelper.opacity = 1),
            (this.transformHelper._opMdf = !1),
            this.renderModifiers(),
            this.transformsManager.processSequences(this._isFirstFrame),
            this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
        }),
        (CVShapeElement.prototype.renderShapeTransform = function (e, t) {
          ;(e._opMdf || t.op._mdf || this._isFirstFrame) &&
            ((t.opacity = e.opacity), (t.opacity *= t.op.v), (t._opMdf = !0))
        }),
        (CVShapeElement.prototype.drawLayer = function () {
          var e,
            t,
            r,
            n,
            i,
            s,
            a,
            o,
            l,
            h = this.stylesList.length,
            c = this.globalData.renderer,
            p = this.globalData.canvasContext
          for (e = 0; e < h; e += 1)
            if (
              (('st' !== (o = (l = this.stylesList[e]).type) && 'gs' !== o) || 0 !== l.wi) &&
              l.data._shouldRender &&
              0 !== l.coOp &&
              0 !== this.globalData.currentGlobalAlpha
            ) {
              for (
                c.save(),
                  s = l.elements,
                  'st' === o || 'gs' === o
                    ? ((p.strokeStyle = 'st' === o ? l.co : l.grd),
                      (p.lineWidth = l.wi),
                      (p.lineCap = l.lc),
                      (p.lineJoin = l.lj),
                      (p.miterLimit = l.ml || 0))
                    : (p.fillStyle = 'fl' === o ? l.co : l.grd),
                  c.ctxOpacity(l.coOp),
                  'st' !== o && 'gs' !== o && p.beginPath(),
                  c.ctxTransform(l.preTransforms.finalTransform.props),
                  r = s.length,
                  t = 0;
                t < r;
                t += 1
              ) {
                for (
                  ('st' !== o && 'gs' !== o) ||
                    (p.beginPath(), l.da && (p.setLineDash(l.da), (p.lineDashOffset = l.do))),
                    i = (a = s[t].trNodes).length,
                    n = 0;
                  n < i;
                  n += 1
                )
                  'm' === a[n].t
                    ? p.moveTo(a[n].p[0], a[n].p[1])
                    : 'c' === a[n].t
                    ? p.bezierCurveTo(a[n].pts[0], a[n].pts[1], a[n].pts[2], a[n].pts[3], a[n].pts[4], a[n].pts[5])
                    : p.closePath()
                ;('st' !== o && 'gs' !== o) || (p.stroke(), l.da && p.setLineDash(this.dashResetter))
              }
              'st' !== o && 'gs' !== o && p.fill(l.r), c.restore()
            }
        }),
        (CVShapeElement.prototype.renderShape = function (e, t, r, n) {
          var i, s
          for (s = e, i = t.length - 1; i >= 0; i -= 1)
            'tr' === t[i].ty
              ? ((s = r[i].transform), this.renderShapeTransform(e, s))
              : 'sh' === t[i].ty || 'el' === t[i].ty || 'rc' === t[i].ty || 'sr' === t[i].ty
              ? this.renderPath(t[i], r[i])
              : 'fl' === t[i].ty
              ? this.renderFill(t[i], r[i], s)
              : 'st' === t[i].ty
              ? this.renderStroke(t[i], r[i], s)
              : 'gf' === t[i].ty || 'gs' === t[i].ty
              ? this.renderGradientFill(t[i], r[i], s)
              : 'gr' === t[i].ty
              ? this.renderShape(s, t[i].it, r[i].it)
              : t[i].ty
          n && this.drawLayer()
        }),
        (CVShapeElement.prototype.renderStyledShape = function (e, t) {
          if (this._isFirstFrame || t._mdf || e.transforms._mdf) {
            var r,
              n,
              i,
              s = e.trNodes,
              a = t.paths,
              o = a._length
            s.length = 0
            var l = e.transforms.finalTransform
            for (i = 0; i < o; i += 1) {
              var h = a.shapes[i]
              if (h && h.v) {
                for (n = h._length, r = 1; r < n; r += 1)
                  1 === r && s.push({ t: 'm', p: l.applyToPointArray(h.v[0][0], h.v[0][1], 0) }),
                    s.push({ t: 'c', pts: l.applyToTriplePoints(h.o[r - 1], h.i[r], h.v[r]) })
                1 === n && s.push({ t: 'm', p: l.applyToPointArray(h.v[0][0], h.v[0][1], 0) }),
                  h.c &&
                    n &&
                    (s.push({ t: 'c', pts: l.applyToTriplePoints(h.o[r - 1], h.i[0], h.v[0]) }), s.push({ t: 'z' }))
              }
            }
            e.trNodes = s
          }
        }),
        (CVShapeElement.prototype.renderPath = function (e, t) {
          if (!0 !== e.hd && e._shouldRender) {
            var r,
              n = t.styledShapes.length
            for (r = 0; r < n; r += 1) this.renderStyledShape(t.styledShapes[r], t.sh)
          }
        }),
        (CVShapeElement.prototype.renderFill = function (e, t, r) {
          var n = t.style
          ;(t.c._mdf || this._isFirstFrame) &&
            (n.co = 'rgb(' + bmFloor(t.c.v[0]) + ',' + bmFloor(t.c.v[1]) + ',' + bmFloor(t.c.v[2]) + ')'),
            (t.o._mdf || r._opMdf || this._isFirstFrame) && (n.coOp = t.o.v * r.opacity)
        }),
        (CVShapeElement.prototype.renderGradientFill = function (e, t, r) {
          var n,
            i = t.style
          if (!i.grd || t.g._mdf || t.s._mdf || t.e._mdf || (1 !== e.t && (t.h._mdf || t.a._mdf))) {
            var s,
              a = this.globalData.canvasContext,
              o = t.s.v,
              l = t.e.v
            if (1 === e.t) n = a.createLinearGradient(o[0], o[1], l[0], l[1])
            else {
              var h = Math.sqrt(Math.pow(o[0] - l[0], 2) + Math.pow(o[1] - l[1], 2)),
                c = Math.atan2(l[1] - o[1], l[0] - o[0]),
                p = t.h.v
              p >= 1 ? (p = 0.99) : p <= -1 && (p = -0.99)
              var u = h * p,
                f = Math.cos(c + t.a.v) * u + o[0],
                d = Math.sin(c + t.a.v) * u + o[1]
              n = a.createRadialGradient(f, d, 0, o[0], o[1], h)
            }
            var m = e.g.p,
              g = t.g.c,
              y = 1
            for (s = 0; s < m; s += 1)
              t.g._hasOpacity && t.g._collapsable && (y = t.g.o[2 * s + 1]),
                n.addColorStop(
                  g[4 * s] / 100,
                  'rgba(' + g[4 * s + 1] + ',' + g[4 * s + 2] + ',' + g[4 * s + 3] + ',' + y + ')'
                )
            i.grd = n
          }
          i.coOp = t.o.v * r.opacity
        }),
        (CVShapeElement.prototype.renderStroke = function (e, t, r) {
          var n = t.style,
            i = t.d
          i && (i._mdf || this._isFirstFrame) && ((n.da = i.dashArray), (n.do = i.dashoffset[0])),
            (t.c._mdf || this._isFirstFrame) &&
              (n.co = 'rgb(' + bmFloor(t.c.v[0]) + ',' + bmFloor(t.c.v[1]) + ',' + bmFloor(t.c.v[2]) + ')'),
            (t.o._mdf || r._opMdf || this._isFirstFrame) && (n.coOp = t.o.v * r.opacity),
            (t.w._mdf || this._isFirstFrame) && (n.wi = t.w.v)
        }),
        (CVShapeElement.prototype.destroy = function () {
          ;(this.shapesData = null),
            (this.globalData = null),
            (this.canvasContext = null),
            (this.stylesList.length = 0),
            (this.itemsData.length = 0)
        }),
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
            ITextElement,
          ],
          CVTextElement
        ),
        (CVTextElement.prototype.tHelper = createTag('canvas').getContext('2d')),
        (CVTextElement.prototype.buildNewText = function () {
          var e = this.textProperty.currentData
          this.renderedLetters = createSizedArray(e.l ? e.l.length : 0)
          var t = !1
          e.fc ? ((t = !0), (this.values.fill = this.buildColor(e.fc))) : (this.values.fill = 'rgba(0,0,0,0)'),
            (this.fill = t)
          var r = !1
          e.sc && ((r = !0), (this.values.stroke = this.buildColor(e.sc)), (this.values.sWidth = e.sw))
          var n,
            i,
            s,
            a,
            o,
            l,
            h,
            c,
            p,
            u,
            f,
            d,
            m = this.globalData.fontManager.getFontByName(e.f),
            g = e.l,
            y = this.mHelper
          ;(this.stroke = r),
            (this.values.fValue = e.finalSize + 'px ' + this.globalData.fontManager.getFontByName(e.f).fFamily),
            (i = e.finalText.length)
          var v = this.data.singleShape,
            b = 0.001 * e.tr * e.finalSize,
            E = 0,
            S = 0,
            P = !0,
            _ = 0
          for (n = 0; n < i; n += 1) {
            ;(a =
              ((s = this.globalData.fontManager.getCharData(
                e.finalText[n],
                m.fStyle,
                this.globalData.fontManager.getFontByName(e.f).fFamily
              )) &&
                s.data) ||
              {}),
              y.reset(),
              v && g[n].n && ((E = -b), (S += e.yOffset), (S += P ? 1 : 0), (P = !1)),
              (p = (h = a.shapes ? a.shapes[0].it : []).length),
              y.scale(e.finalSize / 100, e.finalSize / 100),
              v && this.applyTextPropertiesToMatrix(e, y, g[n].line, E, S),
              (f = createSizedArray(p - 1))
            var x = 0
            for (c = 0; c < p; c += 1)
              if ('sh' === h[c].ty) {
                for (l = h[c].ks.k.i.length, u = h[c].ks.k, d = [], o = 1; o < l; o += 1)
                  1 === o && d.push(y.applyToX(u.v[0][0], u.v[0][1], 0), y.applyToY(u.v[0][0], u.v[0][1], 0)),
                    d.push(
                      y.applyToX(u.o[o - 1][0], u.o[o - 1][1], 0),
                      y.applyToY(u.o[o - 1][0], u.o[o - 1][1], 0),
                      y.applyToX(u.i[o][0], u.i[o][1], 0),
                      y.applyToY(u.i[o][0], u.i[o][1], 0),
                      y.applyToX(u.v[o][0], u.v[o][1], 0),
                      y.applyToY(u.v[o][0], u.v[o][1], 0)
                    )
                d.push(
                  y.applyToX(u.o[o - 1][0], u.o[o - 1][1], 0),
                  y.applyToY(u.o[o - 1][0], u.o[o - 1][1], 0),
                  y.applyToX(u.i[0][0], u.i[0][1], 0),
                  y.applyToY(u.i[0][0], u.i[0][1], 0),
                  y.applyToX(u.v[0][0], u.v[0][1], 0),
                  y.applyToY(u.v[0][0], u.v[0][1], 0)
                ),
                  (f[x] = d),
                  (x += 1)
              }
            v && ((E += g[n].l), (E += b)),
              this.textSpans[_] ? (this.textSpans[_].elem = f) : (this.textSpans[_] = { elem: f }),
              (_ += 1)
          }
        }),
        (CVTextElement.prototype.renderInnerContent = function () {
          var e,
            t,
            r,
            n,
            i,
            s,
            a = this.canvasContext
          ;(a.font = this.values.fValue),
            (a.lineCap = 'butt'),
            (a.lineJoin = 'miter'),
            (a.miterLimit = 4),
            this.data.singleShape ||
              this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag)
          var o,
            l = this.textAnimator.renderedLetters,
            h = this.textProperty.currentData.l
          t = h.length
          var c,
            p,
            u = null,
            f = null,
            d = null
          for (e = 0; e < t; e += 1)
            if (!h[e].n) {
              if (
                ((o = l[e]) &&
                  (this.globalData.renderer.save(),
                  this.globalData.renderer.ctxTransform(o.p),
                  this.globalData.renderer.ctxOpacity(o.o)),
                this.fill)
              ) {
                for (
                  o && o.fc
                    ? u !== o.fc && ((u = o.fc), (a.fillStyle = o.fc))
                    : u !== this.values.fill && ((u = this.values.fill), (a.fillStyle = this.values.fill)),
                    n = (c = this.textSpans[e].elem).length,
                    this.globalData.canvasContext.beginPath(),
                    r = 0;
                  r < n;
                  r += 1
                )
                  for (s = (p = c[r]).length, this.globalData.canvasContext.moveTo(p[0], p[1]), i = 2; i < s; i += 6)
                    this.globalData.canvasContext.bezierCurveTo(p[i], p[i + 1], p[i + 2], p[i + 3], p[i + 4], p[i + 5])
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
              }
              if (this.stroke) {
                for (
                  o && o.sw
                    ? d !== o.sw && ((d = o.sw), (a.lineWidth = o.sw))
                    : d !== this.values.sWidth && ((d = this.values.sWidth), (a.lineWidth = this.values.sWidth)),
                    o && o.sc
                      ? f !== o.sc && ((f = o.sc), (a.strokeStyle = o.sc))
                      : f !== this.values.stroke && ((f = this.values.stroke), (a.strokeStyle = this.values.stroke)),
                    n = (c = this.textSpans[e].elem).length,
                    this.globalData.canvasContext.beginPath(),
                    r = 0;
                  r < n;
                  r += 1
                )
                  for (s = (p = c[r]).length, this.globalData.canvasContext.moveTo(p[0], p[1]), i = 2; i < s; i += 6)
                    this.globalData.canvasContext.bezierCurveTo(p[i], p[i + 1], p[i + 2], p[i + 3], p[i + 4], p[i + 5])
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
              }
              o && this.globalData.renderer.restore()
            }
        }),
        extendPrototype(
          [BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement],
          CVImageElement
        ),
        (CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement),
        (CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
        (CVImageElement.prototype.createContent = function () {
          if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
            var e = createTag('canvas')
            ;(e.width = this.assetData.w), (e.height = this.assetData.h)
            var t,
              r,
              n = e.getContext('2d'),
              i = this.img.width,
              s = this.img.height,
              a = i / s,
              o = this.assetData.w / this.assetData.h,
              l = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio
            ;(a > o && 'xMidYMid slice' === l) || (a < o && 'xMidYMid slice' !== l)
              ? (t = (r = s) * o)
              : (r = (t = i) / o),
              n.drawImage(this.img, (i - t) / 2, (s - r) / 2, t, r, 0, 0, this.assetData.w, this.assetData.h),
              (this.img = e)
          }
        }),
        (CVImageElement.prototype.renderInnerContent = function () {
          this.canvasContext.drawImage(this.img, 0, 0)
        }),
        (CVImageElement.prototype.destroy = function () {
          this.img = null
        }),
        extendPrototype(
          [BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement],
          CVSolidElement
        ),
        (CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement),
        (CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
        (CVSolidElement.prototype.renderInnerContent = function () {
          var e = this.canvasContext
          ;(e.fillStyle = this.data.sc), e.fillRect(0, 0, this.data.sw, this.data.sh)
        }),
        extendPrototype([BaseRenderer], CanvasRendererBase),
        (CanvasRendererBase.prototype.createShape = function (e) {
          return new CVShapeElement(e, this.globalData, this)
        }),
        (CanvasRendererBase.prototype.createText = function (e) {
          return new CVTextElement(e, this.globalData, this)
        }),
        (CanvasRendererBase.prototype.createImage = function (e) {
          return new CVImageElement(e, this.globalData, this)
        }),
        (CanvasRendererBase.prototype.createSolid = function (e) {
          return new CVSolidElement(e, this.globalData, this)
        }),
        (CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull),
        (CanvasRendererBase.prototype.ctxTransform = function (e) {
          if (1 !== e[0] || 0 !== e[1] || 0 !== e[4] || 1 !== e[5] || 0 !== e[12] || 0 !== e[13])
            if (this.renderConfig.clearCanvas) {
              this.transformMat.cloneFromProps(e)
              var t = this.contextData.cTr.props
              this.transformMat.transform(
                t[0],
                t[1],
                t[2],
                t[3],
                t[4],
                t[5],
                t[6],
                t[7],
                t[8],
                t[9],
                t[10],
                t[11],
                t[12],
                t[13],
                t[14],
                t[15]
              ),
                this.contextData.cTr.cloneFromProps(this.transformMat.props)
              var r = this.contextData.cTr.props
              this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
            } else this.canvasContext.transform(e[0], e[1], e[4], e[5], e[12], e[13])
        }),
        (CanvasRendererBase.prototype.ctxOpacity = function (e) {
          if (!this.renderConfig.clearCanvas)
            return (
              (this.canvasContext.globalAlpha *= e < 0 ? 0 : e),
              void (this.globalData.currentGlobalAlpha = this.contextData.cO)
            )
          ;(this.contextData.cO *= e < 0 ? 0 : e),
            this.globalData.currentGlobalAlpha !== this.contextData.cO &&
              ((this.canvasContext.globalAlpha = this.contextData.cO),
              (this.globalData.currentGlobalAlpha = this.contextData.cO))
        }),
        (CanvasRendererBase.prototype.reset = function () {
          this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
        }),
        (CanvasRendererBase.prototype.save = function (e) {
          if (this.renderConfig.clearCanvas) {
            e && this.canvasContext.save()
            var t,
              r = this.contextData.cTr.props
            this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate()
            var n = this.contextData.saved[this.contextData.cArrPos]
            for (t = 0; t < 16; t += 1) n[t] = r[t]
            ;(this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO), (this.contextData.cArrPos += 1)
          } else this.canvasContext.save()
        }),
        (CanvasRendererBase.prototype.restore = function (e) {
          if (this.renderConfig.clearCanvas) {
            e && (this.canvasContext.restore(), (this.globalData.blendMode = 'source-over')),
              (this.contextData.cArrPos -= 1)
            var t,
              r = this.contextData.saved[this.contextData.cArrPos],
              n = this.contextData.cTr.props
            for (t = 0; t < 16; t += 1) n[t] = r[t]
            this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]),
              (r = this.contextData.savedOp[this.contextData.cArrPos]),
              (this.contextData.cO = r),
              this.globalData.currentGlobalAlpha !== r &&
                ((this.canvasContext.globalAlpha = r), (this.globalData.currentGlobalAlpha = r))
          } else this.canvasContext.restore()
        }),
        (CanvasRendererBase.prototype.configAnimation = function (e) {
          if (this.animationItem.wrapper) {
            this.animationItem.container = createTag('canvas')
            var t = this.animationItem.container.style
            ;(t.width = '100%'), (t.height = '100%')
            var r = '0px 0px 0px'
            ;(t.transformOrigin = r),
              (t.mozTransformOrigin = r),
              (t.webkitTransformOrigin = r),
              (t['-webkit-transform'] = r),
              (t.contentVisibility = this.renderConfig.contentVisibility),
              this.animationItem.wrapper.appendChild(this.animationItem.container),
              (this.canvasContext = this.animationItem.container.getContext('2d')),
              this.renderConfig.className &&
                this.animationItem.container.setAttribute('class', this.renderConfig.className),
              this.renderConfig.id && this.animationItem.container.setAttribute('id', this.renderConfig.id)
          } else this.canvasContext = this.renderConfig.context
          ;(this.data = e),
            (this.layers = e.layers),
            (this.transformCanvas = { w: e.w, h: e.h, sx: 0, sy: 0, tx: 0, ty: 0 }),
            this.setupGlobalData(e, document.body),
            (this.globalData.canvasContext = this.canvasContext),
            (this.globalData.renderer = this),
            (this.globalData.isDashed = !1),
            (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
            (this.globalData.transformCanvas = this.transformCanvas),
            (this.elements = createSizedArray(e.layers.length)),
            this.updateContainerSize()
        }),
        (CanvasRendererBase.prototype.updateContainerSize = function () {
          var e, t, r, n
          if (
            (this.reset(),
            this.animationItem.wrapper && this.animationItem.container
              ? ((e = this.animationItem.wrapper.offsetWidth),
                (t = this.animationItem.wrapper.offsetHeight),
                this.animationItem.container.setAttribute('width', e * this.renderConfig.dpr),
                this.animationItem.container.setAttribute('height', t * this.renderConfig.dpr))
              : ((e = this.canvasContext.canvas.width * this.renderConfig.dpr),
                (t = this.canvasContext.canvas.height * this.renderConfig.dpr)),
            -1 !== this.renderConfig.preserveAspectRatio.indexOf('meet') ||
              -1 !== this.renderConfig.preserveAspectRatio.indexOf('slice'))
          ) {
            var i = this.renderConfig.preserveAspectRatio.split(' '),
              s = i[1] || 'meet',
              a = i[0] || 'xMidYMid',
              o = a.substr(0, 4),
              l = a.substr(4)
            ;(r = e / t),
              ((n = this.transformCanvas.w / this.transformCanvas.h) > r && 'meet' === s) || (n < r && 'slice' === s)
                ? ((this.transformCanvas.sx = e / (this.transformCanvas.w / this.renderConfig.dpr)),
                  (this.transformCanvas.sy = e / (this.transformCanvas.w / this.renderConfig.dpr)))
                : ((this.transformCanvas.sx = t / (this.transformCanvas.h / this.renderConfig.dpr)),
                  (this.transformCanvas.sy = t / (this.transformCanvas.h / this.renderConfig.dpr))),
              (this.transformCanvas.tx =
                'xMid' === o && ((n < r && 'meet' === s) || (n > r && 'slice' === s))
                  ? ((e - this.transformCanvas.w * (t / this.transformCanvas.h)) / 2) * this.renderConfig.dpr
                  : 'xMax' === o && ((n < r && 'meet' === s) || (n > r && 'slice' === s))
                  ? (e - this.transformCanvas.w * (t / this.transformCanvas.h)) * this.renderConfig.dpr
                  : 0),
              (this.transformCanvas.ty =
                'YMid' === l && ((n > r && 'meet' === s) || (n < r && 'slice' === s))
                  ? ((t - this.transformCanvas.h * (e / this.transformCanvas.w)) / 2) * this.renderConfig.dpr
                  : 'YMax' === l && ((n > r && 'meet' === s) || (n < r && 'slice' === s))
                  ? (t - this.transformCanvas.h * (e / this.transformCanvas.w)) * this.renderConfig.dpr
                  : 0)
          } else
            'none' === this.renderConfig.preserveAspectRatio
              ? ((this.transformCanvas.sx = e / (this.transformCanvas.w / this.renderConfig.dpr)),
                (this.transformCanvas.sy = t / (this.transformCanvas.h / this.renderConfig.dpr)),
                (this.transformCanvas.tx = 0),
                (this.transformCanvas.ty = 0))
              : ((this.transformCanvas.sx = this.renderConfig.dpr),
                (this.transformCanvas.sy = this.renderConfig.dpr),
                (this.transformCanvas.tx = 0),
                (this.transformCanvas.ty = 0))
          ;(this.transformCanvas.props = [
            this.transformCanvas.sx,
            0,
            0,
            0,
            0,
            this.transformCanvas.sy,
            0,
            0,
            0,
            0,
            1,
            0,
            this.transformCanvas.tx,
            this.transformCanvas.ty,
            0,
            1,
          ]),
            this.ctxTransform(this.transformCanvas.props),
            this.canvasContext.beginPath(),
            this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h),
            this.canvasContext.closePath(),
            this.canvasContext.clip(),
            this.renderFrame(this.renderedFrame, !0)
        }),
        (CanvasRendererBase.prototype.destroy = function () {
          var e
          for (
            this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ''),
              e = (this.layers ? this.layers.length : 0) - 1;
            e >= 0;
            e -= 1
          )
            this.elements[e] && this.elements[e].destroy()
          ;(this.elements.length = 0),
            (this.globalData.canvasContext = null),
            (this.animationItem.container = null),
            (this.destroyed = !0)
        }),
        (CanvasRendererBase.prototype.renderFrame = function (e, t) {
          if ((this.renderedFrame !== e || !0 !== this.renderConfig.clearCanvas || t) && !this.destroyed && -1 !== e) {
            var r
            ;(this.renderedFrame = e),
              (this.globalData.frameNum = e - this.animationItem._isFirstFrame),
              (this.globalData.frameId += 1),
              (this.globalData._mdf = !this.renderConfig.clearCanvas || t),
              (this.globalData.projectInterface.currentFrame = e)
            var n = this.layers.length
            for (this.completeLayers || this.checkLayers(e), r = 0; r < n; r += 1)
              (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(e - this.layers[r].st)
            if (this.globalData._mdf) {
              for (
                !0 === this.renderConfig.clearCanvas
                  ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h)
                  : this.save(),
                  r = n - 1;
                r >= 0;
                r -= 1
              )
                (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame()
              !0 !== this.renderConfig.clearCanvas && this.restore()
            }
          }
        }),
        (CanvasRendererBase.prototype.buildItem = function (e) {
          var t = this.elements
          if (!t[e] && 99 !== this.layers[e].ty) {
            var r = this.createItem(this.layers[e], this, this.globalData)
            ;(t[e] = r), r.initExpressions()
          }
        }),
        (CanvasRendererBase.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length; ) this.pendingElements.pop().checkParenting()
        }),
        (CanvasRendererBase.prototype.hide = function () {
          this.animationItem.container.style.display = 'none'
        }),
        (CanvasRendererBase.prototype.show = function () {
          this.animationItem.container.style.display = 'block'
        }),
        extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement),
        (CVCompElement.prototype.renderInnerContent = function () {
          var e,
            t = this.canvasContext
          for (
            t.beginPath(),
              t.moveTo(0, 0),
              t.lineTo(this.data.w, 0),
              t.lineTo(this.data.w, this.data.h),
              t.lineTo(0, this.data.h),
              t.lineTo(0, 0),
              t.clip(),
              e = this.layers.length - 1;
            e >= 0;
            e -= 1
          )
            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
        }),
        (CVCompElement.prototype.destroy = function () {
          var e
          for (e = this.layers.length - 1; e >= 0; e -= 1) this.elements[e] && this.elements[e].destroy()
          ;(this.layers = null), (this.elements = null)
        }),
        (CVCompElement.prototype.createComp = function (e) {
          return new CVCompElement(e, this.globalData, this)
        }),
        extendPrototype([CanvasRendererBase], CanvasRenderer),
        (CanvasRenderer.prototype.createComp = function (e) {
          return new CVCompElement(e, this.globalData, this)
        }),
        (HBaseElement.prototype = {
          checkBlendMode: function () {},
          initRendererElement: function () {
            ;(this.baseElement = createTag(this.data.tg || 'div')),
              this.data.hasMask
                ? ((this.svgElement = createNS('svg')),
                  (this.layerElement = createNS('g')),
                  (this.maskedElement = this.layerElement),
                  this.svgElement.appendChild(this.layerElement),
                  this.baseElement.appendChild(this.svgElement))
                : (this.layerElement = this.baseElement),
              styleDiv(this.baseElement)
          },
          createContainerElements: function () {
            ;(this.renderableEffectsManager = new CVEffects(this)),
              (this.transformedElement = this.baseElement),
              (this.maskedElement = this.layerElement),
              this.data.ln && this.layerElement.setAttribute('id', this.data.ln),
              this.data.cl && this.layerElement.setAttribute('class', this.data.cl),
              0 !== this.data.bm && this.setBlendMode()
          },
          renderElement: function () {
            var e = this.transformedElement ? this.transformedElement.style : {}
            if (this.finalTransform._matMdf) {
              var t = this.finalTransform.mat.toCSS()
              ;(e.transform = t), (e.webkitTransform = t)
            }
            this.finalTransform._opMdf && (e.opacity = this.finalTransform.mProp.o.v)
          },
          renderFrame: function () {
            this.data.hd ||
              this.hidden ||
              (this.renderTransform(),
              this.renderRenderable(),
              this.renderElement(),
              this.renderInnerContent(),
              this._isFirstFrame && (this._isFirstFrame = !1))
          },
          destroy: function () {
            ;(this.layerElement = null),
              (this.transformedElement = null),
              this.matteElement && (this.matteElement = null),
              this.maskManager && (this.maskManager.destroy(), (this.maskManager = null))
          },
          createRenderableComponents: function () {
            this.maskManager = new MaskElement(this.data, this, this.globalData)
          },
          addEffects: function () {},
          setMatte: function () {},
        }),
        (HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement),
        (HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy),
        (HBaseElement.prototype.buildElementParenting = BaseRenderer.prototype.buildElementParenting),
        extendPrototype(
          [BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement],
          HSolidElement
        ),
        (HSolidElement.prototype.createContent = function () {
          var e
          this.data.hasMask
            ? ((e = createNS('rect')).setAttribute('width', this.data.sw),
              e.setAttribute('height', this.data.sh),
              e.setAttribute('fill', this.data.sc),
              this.svgElement.setAttribute('width', this.data.sw),
              this.svgElement.setAttribute('height', this.data.sh))
            : (((e = createTag('div')).style.width = this.data.sw + 'px'),
              (e.style.height = this.data.sh + 'px'),
              (e.style.backgroundColor = this.data.sc)),
            this.layerElement.appendChild(e)
        }),
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            HSolidElement,
            SVGShapeElement,
            HBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          HShapeElement
        ),
        (HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent),
        (HShapeElement.prototype.createContent = function () {
          var e
          if (((this.baseElement.style.fontSize = 0), this.data.hasMask))
            this.layerElement.appendChild(this.shapesContainer), (e = this.svgElement)
          else {
            e = createNS('svg')
            var t = this.comp.data ? this.comp.data : this.globalData.compSize
            e.setAttribute('width', t.w),
              e.setAttribute('height', t.h),
              e.appendChild(this.shapesContainer),
              this.layerElement.appendChild(e)
          }
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0),
            this.filterUniqueShapes(),
            (this.shapeCont = e)
        }),
        (HShapeElement.prototype.getTransformedPoint = function (e, t) {
          var r,
            n = e.length
          for (r = 0; r < n; r += 1) t = e[r].mProps.v.applyToPointArray(t[0], t[1], 0)
          return t
        }),
        (HShapeElement.prototype.calculateShapeBoundingBox = function (e, t) {
          var r,
            n,
            i,
            s,
            a,
            o = e.sh.v,
            l = e.transformers,
            h = o._length
          if (!(h <= 1)) {
            for (r = 0; r < h - 1; r += 1)
              (n = this.getTransformedPoint(l, o.v[r])),
                (i = this.getTransformedPoint(l, o.o[r])),
                (s = this.getTransformedPoint(l, o.i[r + 1])),
                (a = this.getTransformedPoint(l, o.v[r + 1])),
                this.checkBounds(n, i, s, a, t)
            o.c &&
              ((n = this.getTransformedPoint(l, o.v[r])),
              (i = this.getTransformedPoint(l, o.o[r])),
              (s = this.getTransformedPoint(l, o.i[0])),
              (a = this.getTransformedPoint(l, o.v[0])),
              this.checkBounds(n, i, s, a, t))
          }
        }),
        (HShapeElement.prototype.checkBounds = function (e, t, r, n, i) {
          this.getBoundsOfCurve(e, t, r, n)
          var s = this.shapeBoundingBox
          ;(i.x = bmMin(s.left, i.x)),
            (i.xMax = bmMax(s.right, i.xMax)),
            (i.y = bmMin(s.top, i.y)),
            (i.yMax = bmMax(s.bottom, i.yMax))
        }),
        (HShapeElement.prototype.shapeBoundingBox = { left: 0, right: 0, top: 0, bottom: 0 }),
        (HShapeElement.prototype.tempBoundingBox = { x: 0, xMax: 0, y: 0, yMax: 0, width: 0, height: 0 }),
        (HShapeElement.prototype.getBoundsOfCurve = function (e, t, r, n) {
          for (
            var i,
              s,
              a,
              o,
              l,
              h,
              c,
              p = [
                [e[0], n[0]],
                [e[1], n[1]],
              ],
              u = 0;
            u < 2;
            ++u
          )
            (s = 6 * e[u] - 12 * t[u] + 6 * r[u]),
              (i = -3 * e[u] + 9 * t[u] - 9 * r[u] + 3 * n[u]),
              (a = 3 * t[u] - 3 * e[u]),
              (s |= 0),
              (a |= 0),
              (0 == (i |= 0) && 0 === s) ||
                (0 === i
                  ? (o = -a / s) > 0 && o < 1 && p[u].push(this.calculateF(o, e, t, r, n, u))
                  : (l = s * s - 4 * a * i) >= 0 &&
                    ((h = (-s + bmSqrt(l)) / (2 * i)) > 0 && h < 1 && p[u].push(this.calculateF(h, e, t, r, n, u)),
                    (c = (-s - bmSqrt(l)) / (2 * i)) > 0 && c < 1 && p[u].push(this.calculateF(c, e, t, r, n, u))))
          ;(this.shapeBoundingBox.left = bmMin.apply(null, p[0])),
            (this.shapeBoundingBox.top = bmMin.apply(null, p[1])),
            (this.shapeBoundingBox.right = bmMax.apply(null, p[0])),
            (this.shapeBoundingBox.bottom = bmMax.apply(null, p[1]))
        }),
        (HShapeElement.prototype.calculateF = function (e, t, r, n, i, s) {
          return (
            bmPow(1 - e, 3) * t[s] +
            3 * bmPow(1 - e, 2) * e * r[s] +
            3 * (1 - e) * bmPow(e, 2) * n[s] +
            bmPow(e, 3) * i[s]
          )
        }),
        (HShapeElement.prototype.calculateBoundingBox = function (e, t) {
          var r,
            n = e.length
          for (r = 0; r < n; r += 1)
            e[r] && e[r].sh
              ? this.calculateShapeBoundingBox(e[r], t)
              : e[r] && e[r].it && this.calculateBoundingBox(e[r].it, t)
        }),
        (HShapeElement.prototype.currentBoxContains = function (e) {
          return (
            this.currentBBox.x <= e.x &&
            this.currentBBox.y <= e.y &&
            this.currentBBox.width + this.currentBBox.x >= e.x + e.width &&
            this.currentBBox.height + this.currentBBox.y >= e.y + e.height
          )
        }),
        (HShapeElement.prototype.renderInnerContent = function () {
          if ((this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf))) {
            var e = this.tempBoundingBox,
              t = 999999
            if (
              ((e.x = t),
              (e.xMax = -t),
              (e.y = t),
              (e.yMax = -t),
              this.calculateBoundingBox(this.itemsData, e),
              (e.width = e.xMax < e.x ? 0 : e.xMax - e.x),
              (e.height = e.yMax < e.y ? 0 : e.yMax - e.y),
              this.currentBoxContains(e))
            )
              return
            var r = !1
            if (
              (this.currentBBox.w !== e.width &&
                ((this.currentBBox.w = e.width), this.shapeCont.setAttribute('width', e.width), (r = !0)),
              this.currentBBox.h !== e.height &&
                ((this.currentBBox.h = e.height), this.shapeCont.setAttribute('height', e.height), (r = !0)),
              r || this.currentBBox.x !== e.x || this.currentBBox.y !== e.y)
            ) {
              ;(this.currentBBox.w = e.width),
                (this.currentBBox.h = e.height),
                (this.currentBBox.x = e.x),
                (this.currentBBox.y = e.y),
                this.shapeCont.setAttribute(
                  'viewBox',
                  this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h
                )
              var n = this.shapeCont.style,
                i = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)'
              ;(n.transform = i), (n.webkitTransform = i)
            }
          }
        }),
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            HBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
            ITextElement,
          ],
          HTextElement
        ),
        (HTextElement.prototype.createContent = function () {
          if (((this.isMasked = this.checkMasks()), this.isMasked)) {
            ;(this.renderType = 'svg'),
              (this.compW = this.comp.data.w),
              (this.compH = this.comp.data.h),
              this.svgElement.setAttribute('width', this.compW),
              this.svgElement.setAttribute('height', this.compH)
            var e = createNS('g')
            this.maskedElement.appendChild(e), (this.innerElem = e)
          } else (this.renderType = 'html'), (this.innerElem = this.layerElement)
          this.checkParenting()
        }),
        (HTextElement.prototype.buildNewText = function () {
          var e = this.textProperty.currentData
          this.renderedLetters = createSizedArray(e.l ? e.l.length : 0)
          var t = this.innerElem.style,
            r = e.fc ? this.buildColor(e.fc) : 'rgba(0,0,0,0)'
          ;(t.fill = r), (t.color = r), e.sc && ((t.stroke = this.buildColor(e.sc)), (t.strokeWidth = e.sw + 'px'))
          var n,
            i,
            s = this.globalData.fontManager.getFontByName(e.f)
          if (!this.globalData.fontManager.chars)
            if (((t.fontSize = e.finalSize + 'px'), (t.lineHeight = e.finalSize + 'px'), s.fClass))
              this.innerElem.className = s.fClass
            else {
              t.fontFamily = s.fFamily
              var a = e.fWeight,
                o = e.fStyle
              ;(t.fontStyle = o), (t.fontWeight = a)
            }
          var l,
            h,
            c,
            p = e.l
          i = p.length
          var u,
            f = this.mHelper,
            d = '',
            m = 0
          for (n = 0; n < i; n += 1) {
            if (
              (this.globalData.fontManager.chars
                ? (this.textPaths[m]
                    ? (l = this.textPaths[m])
                    : ((l = createNS('path')).setAttribute('stroke-linecap', lineCapEnum[1]),
                      l.setAttribute('stroke-linejoin', lineJoinEnum[2]),
                      l.setAttribute('stroke-miterlimit', '4')),
                  this.isMasked ||
                    (this.textSpans[m]
                      ? (c = (h = this.textSpans[m]).children[0])
                      : (((h = createTag('div')).style.lineHeight = 0),
                        (c = createNS('svg')).appendChild(l),
                        styleDiv(h))))
                : this.isMasked
                ? (l = this.textPaths[m] ? this.textPaths[m] : createNS('text'))
                : this.textSpans[m]
                ? ((h = this.textSpans[m]), (l = this.textPaths[m]))
                : (styleDiv((h = createTag('span'))), styleDiv((l = createTag('span'))), h.appendChild(l)),
              this.globalData.fontManager.chars)
            ) {
              var g,
                y = this.globalData.fontManager.getCharData(
                  e.finalText[n],
                  s.fStyle,
                  this.globalData.fontManager.getFontByName(e.f).fFamily
                )
              if (
                ((g = y ? y.data : null),
                f.reset(),
                g &&
                  g.shapes &&
                  g.shapes.length &&
                  ((u = g.shapes[0].it),
                  f.scale(e.finalSize / 100, e.finalSize / 100),
                  (d = this.createPathShape(f, u)),
                  l.setAttribute('d', d)),
                this.isMasked)
              )
                this.innerElem.appendChild(l)
              else {
                if ((this.innerElem.appendChild(h), g && g.shapes)) {
                  document.body.appendChild(c)
                  var v = c.getBBox()
                  c.setAttribute('width', v.width + 2),
                    c.setAttribute('height', v.height + 2),
                    c.setAttribute('viewBox', v.x - 1 + ' ' + (v.y - 1) + ' ' + (v.width + 2) + ' ' + (v.height + 2))
                  var b = c.style,
                    E = 'translate(' + (v.x - 1) + 'px,' + (v.y - 1) + 'px)'
                  ;(b.transform = E), (b.webkitTransform = E), (p[n].yOffset = v.y - 1)
                } else c.setAttribute('width', 1), c.setAttribute('height', 1)
                h.appendChild(c)
              }
            } else if (
              ((l.textContent = p[n].val),
              l.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve'),
              this.isMasked)
            )
              this.innerElem.appendChild(l)
            else {
              this.innerElem.appendChild(h)
              var S = l.style,
                P = 'translate3d(0,' + -e.finalSize / 1.2 + 'px,0)'
              ;(S.transform = P), (S.webkitTransform = P)
            }
            this.isMasked ? (this.textSpans[m] = l) : (this.textSpans[m] = h),
              (this.textSpans[m].style.display = 'block'),
              (this.textPaths[m] = l),
              (m += 1)
          }
          for (; m < this.textSpans.length; ) (this.textSpans[m].style.display = 'none'), (m += 1)
        }),
        (HTextElement.prototype.renderInnerContent = function () {
          var e
          if (this.data.singleShape) {
            if (!this._isFirstFrame && !this.lettersChangedFlag) return
            if (this.isMasked && this.finalTransform._matMdf) {
              this.svgElement.setAttribute(
                'viewBox',
                -this.finalTransform.mProp.p.v[0] +
                  ' ' +
                  -this.finalTransform.mProp.p.v[1] +
                  ' ' +
                  this.compW +
                  ' ' +
                  this.compH
              ),
                (e = this.svgElement.style)
              var t =
                'translate(' + -this.finalTransform.mProp.p.v[0] + 'px,' + -this.finalTransform.mProp.p.v[1] + 'px)'
              ;(e.transform = t), (e.webkitTransform = t)
            }
          }
          if (
            (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
            this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
          ) {
            var r,
              n,
              i,
              s,
              a,
              o = 0,
              l = this.textAnimator.renderedLetters,
              h = this.textProperty.currentData.l
            for (n = h.length, r = 0; r < n; r += 1)
              h[r].n
                ? (o += 1)
                : ((s = this.textSpans[r]),
                  (a = this.textPaths[r]),
                  (i = l[o]),
                  (o += 1),
                  i._mdf.m &&
                    (this.isMasked
                      ? s.setAttribute('transform', i.m)
                      : ((s.style.webkitTransform = i.m), (s.style.transform = i.m))),
                  (s.style.opacity = i.o),
                  i.sw && i._mdf.sw && a.setAttribute('stroke-width', i.sw),
                  i.sc && i._mdf.sc && a.setAttribute('stroke', i.sc),
                  i.fc && i._mdf.fc && (a.setAttribute('fill', i.fc), (a.style.color = i.fc)))
            if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
              var c = this.innerElem.getBBox()
              if (
                (this.currentBBox.w !== c.width &&
                  ((this.currentBBox.w = c.width), this.svgElement.setAttribute('width', c.width)),
                this.currentBBox.h !== c.height &&
                  ((this.currentBBox.h = c.height), this.svgElement.setAttribute('height', c.height)),
                this.currentBBox.w !== c.width + 2 ||
                  this.currentBBox.h !== c.height + 2 ||
                  this.currentBBox.x !== c.x - 1 ||
                  this.currentBBox.y !== c.y - 1)
              ) {
                ;(this.currentBBox.w = c.width + 2),
                  (this.currentBBox.h = c.height + 2),
                  (this.currentBBox.x = c.x - 1),
                  (this.currentBBox.y = c.y - 1),
                  this.svgElement.setAttribute(
                    'viewBox',
                    this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h
                  ),
                  (e = this.svgElement.style)
                var p = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)'
                ;(e.transform = p), (e.webkitTransform = p)
              }
            }
          }
        }),
        extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement),
        (HCameraElement.prototype.setup = function () {
          var e,
            t,
            r,
            n,
            i = this.comp.threeDElements.length
          for (e = 0; e < i; e += 1)
            if ('3d' === (t = this.comp.threeDElements[e]).type) {
              ;(r = t.perspectiveElem.style), (n = t.container.style)
              var s = this.pe.v + 'px',
                a = '0px 0px 0px',
                o = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'
              ;(r.perspective = s),
                (r.webkitPerspective = s),
                (n.transformOrigin = a),
                (n.mozTransformOrigin = a),
                (n.webkitTransformOrigin = a),
                (r.transform = o),
                (r.webkitTransform = o)
            }
        }),
        (HCameraElement.prototype.createElements = function () {}),
        (HCameraElement.prototype.hide = function () {}),
        (HCameraElement.prototype.renderFrame = function () {
          var e,
            t,
            r = this._isFirstFrame
          if (this.hierarchy)
            for (t = this.hierarchy.length, e = 0; e < t; e += 1) r = this.hierarchy[e].finalTransform.mProp._mdf || r
          if (
            r ||
            this.pe._mdf ||
            (this.p && this.p._mdf) ||
            (this.px && (this.px._mdf || this.py._mdf || this.pz._mdf)) ||
            this.rx._mdf ||
            this.ry._mdf ||
            this.rz._mdf ||
            this.or._mdf ||
            (this.a && this.a._mdf)
          ) {
            if ((this.mat.reset(), this.hierarchy))
              for (e = t = this.hierarchy.length - 1; e >= 0; e -= 1) {
                var n = this.hierarchy[e].finalTransform.mProp
                this.mat.translate(-n.p.v[0], -n.p.v[1], n.p.v[2]),
                  this.mat.rotateX(-n.or.v[0]).rotateY(-n.or.v[1]).rotateZ(n.or.v[2]),
                  this.mat.rotateX(-n.rx.v).rotateY(-n.ry.v).rotateZ(n.rz.v),
                  this.mat.scale(1 / n.s.v[0], 1 / n.s.v[1], 1 / n.s.v[2]),
                  this.mat.translate(n.a.v[0], n.a.v[1], n.a.v[2])
              }
            if (
              (this.p
                ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2])
                : this.mat.translate(-this.px.v, -this.py.v, this.pz.v),
              this.a)
            ) {
              var i
              i = this.p
                ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]]
                : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]]
              var s = Math.sqrt(Math.pow(i[0], 2) + Math.pow(i[1], 2) + Math.pow(i[2], 2)),
                a = [i[0] / s, i[1] / s, i[2] / s],
                o = Math.sqrt(a[2] * a[2] + a[0] * a[0]),
                l = Math.atan2(a[1], o),
                h = Math.atan2(a[0], -a[2])
              this.mat.rotateY(h).rotateX(-l)
            }
            this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
              this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),
              this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0),
              this.mat.translate(0, 0, this.pe.v)
            var c = !this._prevMat.equals(this.mat)
            if ((c || this.pe._mdf) && this.comp.threeDElements) {
              var p, u, f
              for (t = this.comp.threeDElements.length, e = 0; e < t; e += 1)
                if ('3d' === (p = this.comp.threeDElements[e]).type) {
                  if (c) {
                    var d = this.mat.toCSS()
                    ;((f = p.container.style).transform = d), (f.webkitTransform = d)
                  }
                  this.pe._mdf &&
                    (((u = p.perspectiveElem.style).perspective = this.pe.v + 'px'),
                    (u.webkitPerspective = this.pe.v + 'px'))
                }
              this.mat.clone(this._prevMat)
            }
          }
          this._isFirstFrame = !1
        }),
        (HCameraElement.prototype.prepareFrame = function (e) {
          this.prepareProperties(e, !0)
        }),
        (HCameraElement.prototype.destroy = function () {}),
        (HCameraElement.prototype.getBaseElement = function () {
          return null
        }),
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            HBaseElement,
            HSolidElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          HImageElement
        ),
        (HImageElement.prototype.createContent = function () {
          var e = this.globalData.getAssetsPath(this.assetData),
            t = new Image()
          this.data.hasMask
            ? ((this.imageElem = createNS('image')),
              this.imageElem.setAttribute('width', this.assetData.w + 'px'),
              this.imageElem.setAttribute('height', this.assetData.h + 'px'),
              this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', e),
              this.layerElement.appendChild(this.imageElem),
              this.baseElement.setAttribute('width', this.assetData.w),
              this.baseElement.setAttribute('height', this.assetData.h))
            : this.layerElement.appendChild(t),
            (t.crossOrigin = 'anonymous'),
            (t.src = e),
            this.data.ln && this.baseElement.setAttribute('id', this.data.ln)
        }),
        extendPrototype([BaseRenderer], HybridRendererBase),
        (HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem),
        (HybridRendererBase.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length; ) this.pendingElements.pop().checkParenting()
        }),
        (HybridRendererBase.prototype.appendElementInPos = function (e, t) {
          var r = e.getBaseElement()
          if (r) {
            var n = this.layers[t]
            if (n.ddd && this.supports3d) this.addTo3dContainer(r, t)
            else if (this.threeDElements) this.addTo3dContainer(r, t)
            else {
              for (var i, s, a = 0; a < t; )
                this.elements[a] &&
                  !0 !== this.elements[a] &&
                  this.elements[a].getBaseElement &&
                  ((s = this.elements[a]),
                  (i = (this.layers[a].ddd ? this.getThreeDContainerByPos(a) : s.getBaseElement()) || i)),
                  (a += 1)
              i
                ? (n.ddd && this.supports3d) || this.layerElement.insertBefore(r, i)
                : (n.ddd && this.supports3d) || this.layerElement.appendChild(r)
            }
          }
        }),
        (HybridRendererBase.prototype.createShape = function (e) {
          return this.supports3d
            ? new HShapeElement(e, this.globalData, this)
            : new SVGShapeElement(e, this.globalData, this)
        }),
        (HybridRendererBase.prototype.createText = function (e) {
          return this.supports3d
            ? new HTextElement(e, this.globalData, this)
            : new SVGTextLottieElement(e, this.globalData, this)
        }),
        (HybridRendererBase.prototype.createCamera = function (e) {
          return (this.camera = new HCameraElement(e, this.globalData, this)), this.camera
        }),
        (HybridRendererBase.prototype.createImage = function (e) {
          return this.supports3d
            ? new HImageElement(e, this.globalData, this)
            : new IImageElement(e, this.globalData, this)
        }),
        (HybridRendererBase.prototype.createSolid = function (e) {
          return this.supports3d
            ? new HSolidElement(e, this.globalData, this)
            : new ISolidElement(e, this.globalData, this)
        }),
        (HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull),
        (HybridRendererBase.prototype.getThreeDContainerByPos = function (e) {
          for (var t = 0, r = this.threeDElements.length; t < r; ) {
            if (this.threeDElements[t].startPos <= e && this.threeDElements[t].endPos >= e)
              return this.threeDElements[t].perspectiveElem
            t += 1
          }
          return null
        }),
        (HybridRendererBase.prototype.createThreeDContainer = function (e, t) {
          var r,
            n,
            i = createTag('div')
          styleDiv(i)
          var s = createTag('div')
          if ((styleDiv(s), '3d' === t)) {
            ;((r = i.style).width = this.globalData.compSize.w + 'px'), (r.height = this.globalData.compSize.h + 'px')
            var a = '50% 50%'
            ;(r.webkitTransformOrigin = a), (r.mozTransformOrigin = a), (r.transformOrigin = a)
            var o = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'
            ;((n = s.style).transform = o), (n.webkitTransform = o)
          }
          i.appendChild(s)
          var l = { container: s, perspectiveElem: i, startPos: e, endPos: e, type: t }
          return this.threeDElements.push(l), l
        }),
        (HybridRendererBase.prototype.build3dContainers = function () {
          var e,
            t,
            r = this.layers.length,
            n = ''
          for (e = 0; e < r; e += 1)
            this.layers[e].ddd && 3 !== this.layers[e].ty
              ? ('3d' !== n && ((n = '3d'), (t = this.createThreeDContainer(e, '3d'))),
                (t.endPos = Math.max(t.endPos, e)))
              : ('2d' !== n && ((n = '2d'), (t = this.createThreeDContainer(e, '2d'))),
                (t.endPos = Math.max(t.endPos, e)))
          for (e = (r = this.threeDElements.length) - 1; e >= 0; e -= 1)
            this.resizerElem.appendChild(this.threeDElements[e].perspectiveElem)
        }),
        (HybridRendererBase.prototype.addTo3dContainer = function (e, t) {
          for (var r = 0, n = this.threeDElements.length; r < n; ) {
            if (t <= this.threeDElements[r].endPos) {
              for (var i, s = this.threeDElements[r].startPos; s < t; )
                this.elements[s] && this.elements[s].getBaseElement && (i = this.elements[s].getBaseElement()), (s += 1)
              i ? this.threeDElements[r].container.insertBefore(e, i) : this.threeDElements[r].container.appendChild(e)
              break
            }
            r += 1
          }
        }),
        (HybridRendererBase.prototype.configAnimation = function (e) {
          var t = createTag('div'),
            r = this.animationItem.wrapper,
            n = t.style
          ;(n.width = e.w + 'px'),
            (n.height = e.h + 'px'),
            (this.resizerElem = t),
            styleDiv(t),
            (n.transformStyle = 'flat'),
            (n.mozTransformStyle = 'flat'),
            (n.webkitTransformStyle = 'flat'),
            this.renderConfig.className && t.setAttribute('class', this.renderConfig.className),
            r.appendChild(t),
            (n.overflow = 'hidden')
          var i = createNS('svg')
          i.setAttribute('width', '1'), i.setAttribute('height', '1'), styleDiv(i), this.resizerElem.appendChild(i)
          var s = createNS('defs')
          i.appendChild(s),
            (this.data = e),
            this.setupGlobalData(e, i),
            (this.globalData.defs = s),
            (this.layers = e.layers),
            (this.layerElement = this.resizerElem),
            this.build3dContainers(),
            this.updateContainerSize()
        }),
        (HybridRendererBase.prototype.destroy = function () {
          var e
          this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ''),
            (this.animationItem.container = null),
            (this.globalData.defs = null)
          var t = this.layers ? this.layers.length : 0
          for (e = 0; e < t; e += 1) this.elements[e].destroy()
          ;(this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null)
        }),
        (HybridRendererBase.prototype.updateContainerSize = function () {
          var e,
            t,
            r,
            n,
            i = this.animationItem.wrapper.offsetWidth,
            s = this.animationItem.wrapper.offsetHeight,
            a = i / s
          this.globalData.compSize.w / this.globalData.compSize.h > a
            ? ((e = i / this.globalData.compSize.w),
              (t = i / this.globalData.compSize.w),
              (r = 0),
              (n = (s - this.globalData.compSize.h * (i / this.globalData.compSize.w)) / 2))
            : ((e = s / this.globalData.compSize.h),
              (t = s / this.globalData.compSize.h),
              (r = (i - this.globalData.compSize.w * (s / this.globalData.compSize.h)) / 2),
              (n = 0))
          var o = this.resizerElem.style
          ;(o.webkitTransform = 'matrix3d(' + e + ',0,0,0,0,' + t + ',0,0,0,0,1,0,' + r + ',' + n + ',0,1)'),
            (o.transform = o.webkitTransform)
        }),
        (HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame),
        (HybridRendererBase.prototype.hide = function () {
          this.resizerElem.style.display = 'none'
        }),
        (HybridRendererBase.prototype.show = function () {
          this.resizerElem.style.display = 'block'
        }),
        (HybridRendererBase.prototype.initItems = function () {
          if ((this.buildAllItems(), this.camera)) this.camera.setup()
          else {
            var e,
              t = this.globalData.compSize.w,
              r = this.globalData.compSize.h,
              n = this.threeDElements.length
            for (e = 0; e < n; e += 1) {
              var i = this.threeDElements[e].perspectiveElem.style
              ;(i.webkitPerspective = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2)) + 'px'),
                (i.perspective = i.webkitPerspective)
            }
          }
        }),
        (HybridRendererBase.prototype.searchExtraCompositions = function (e) {
          var t,
            r = e.length,
            n = createTag('div')
          for (t = 0; t < r; t += 1)
            if (e[t].xt) {
              var i = this.createComp(e[t], n, this.globalData.comp, null)
              i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
            }
        }),
        extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement),
        (HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements),
        (HCompElement.prototype.createContainerElements = function () {
          this._createBaseContainerElements(),
            this.data.hasMask
              ? (this.svgElement.setAttribute('width', this.data.w),
                this.svgElement.setAttribute('height', this.data.h),
                (this.transformedElement = this.baseElement))
              : (this.transformedElement = this.layerElement)
        }),
        (HCompElement.prototype.addTo3dContainer = function (e, t) {
          for (var r, n = 0; n < t; )
            this.elements[n] && this.elements[n].getBaseElement && (r = this.elements[n].getBaseElement()), (n += 1)
          r ? this.layerElement.insertBefore(e, r) : this.layerElement.appendChild(e)
        }),
        (HCompElement.prototype.createComp = function (e) {
          return this.supports3d
            ? new HCompElement(e, this.globalData, this)
            : new SVGCompElement(e, this.globalData, this)
        }),
        extendPrototype([HybridRendererBase], HybridRenderer),
        (HybridRenderer.prototype.createComp = function (e) {
          return this.supports3d
            ? new HCompElement(e, this.globalData, this)
            : new SVGCompElement(e, this.globalData, this)
        })
      var Expressions = (function () {
        var e = {
          initExpressions: function (e) {
            var t = 0,
              r = []
            ;(e.renderer.compInterface = CompExpressionInterface(e.renderer)),
              e.renderer.globalData.projectInterface.registerComposition(e.renderer),
              (e.renderer.globalData.pushExpression = function () {
                t += 1
              }),
              (e.renderer.globalData.popExpression = function () {
                0 == (t -= 1) &&
                  (function () {
                    var e,
                      t = r.length
                    for (e = 0; e < t; e += 1) r[e].release()
                    r.length = 0
                  })()
              }),
              (e.renderer.globalData.registerExpressionProperty = function (e) {
                ;-1 === r.indexOf(e) && r.push(e)
              })
          },
        }
        return e
      })()
      function _typeof$1(e) {
        return (_typeof$1 =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      function seedRandom(e, t) {
        var r = this,
          n = 256,
          i = t.pow(n, 6),
          s = t.pow(2, 52),
          a = 2 * s,
          o = 255
        function l(e) {
          var t,
            r = e.length,
            i = this,
            s = 0,
            a = (i.i = i.j = 0),
            l = (i.S = [])
          for (r || (e = [r++]); s < n; ) l[s] = s++
          for (s = 0; s < n; s++) (l[s] = l[(a = o & (a + e[s % r] + (t = l[s])))]), (l[a] = t)
          i.g = function (e) {
            for (var t, r = 0, s = i.i, a = i.j, l = i.S; e--; )
              (t = l[(s = o & (s + 1))]), (r = r * n + l[o & ((l[s] = l[(a = o & (a + t))]) + (l[a] = t))])
            return (i.i = s), (i.j = a), r
          }
        }
        function h(e, t) {
          return (t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t
        }
        function c(e, t) {
          var r,
            n = [],
            i = _typeof$1(e)
          if (t && 'object' == i)
            for (r in e)
              try {
                n.push(c(e[r], t - 1))
              } catch (s) {}
          return n.length ? n : 'string' == i ? e : e + '\0'
        }
        function p(e, t) {
          for (var r, n = e + '', i = 0; i < n.length; ) t[o & i] = o & ((r ^= 19 * t[o & i]) + n.charCodeAt(i++))
          return u(t)
        }
        function u(e) {
          return String.fromCharCode.apply(0, e)
        }
        ;(t.seedrandom = function (o, f, d) {
          var m = [],
            g = p(
              c(
                (f = !0 === f ? { entropy: !0 } : f || {}).entropy
                  ? [o, u(e)]
                  : null === o
                  ? (function () {
                      try {
                        var t = new Uint8Array(n)
                        return (r.crypto || r.msCrypto).getRandomValues(t), u(t)
                      } catch (a) {
                        var i = r.navigator,
                          s = i && i.plugins
                        return [+new Date(), r, s, r.screen, u(e)]
                      }
                    })()
                  : o,
                3
              ),
              m
            ),
            y = new l(m),
            v = function () {
              for (var e = y.g(6), t = i, r = 0; e < s; ) (e = (e + r) * n), (t *= n), (r = y.g(1))
              for (; e >= a; ) (e /= 2), (t /= 2), (r >>>= 1)
              return (e + r) / t
            }
          return (
            (v.int32 = function () {
              return 0 | y.g(4)
            }),
            (v.quick = function () {
              return y.g(4) / 4294967296
            }),
            (v.double = v),
            p(u(y.S), e),
            (
              f.pass ||
              d ||
              function (e, r, n, i) {
                return (
                  i &&
                    (i.S && h(i, y),
                    (e.state = function () {
                      return h(y, {})
                    })),
                  n ? ((t.random = e), r) : e
                )
              }
            )(v, g, 'global' in f ? f.global : this == t, f.state)
          )
        }),
          p(t.random(), e)
      }
      function initialize$2(e) {
        seedRandom([], e)
      }
      var propTypes = { SHAPE: 'shape' }
      function _typeof(e) {
        return (_typeof =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      var ExpressionManager = (function () {
          var ob = {},
            Math = BMMath,
            window = null,
            document = null,
            XMLHttpRequest = null,
            fetch = null,
            frames = null
          function $bm_isInstanceOfArray(e) {
            return e.constructor === Array || e.constructor === Float32Array
          }
          function isNumerable(e, t) {
            return 'number' === e || 'boolean' === e || 'string' === e || t instanceof Number
          }
          function $bm_neg(e) {
            var t = _typeof(e)
            if ('number' === t || 'boolean' === t || e instanceof Number) return -e
            if ($bm_isInstanceOfArray(e)) {
              var r,
                n = e.length,
                i = []
              for (r = 0; r < n; r += 1) i[r] = -e[r]
              return i
            }
            return e.propType ? e.v : -e
          }
          initialize$2(BMMath)
          var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, 'easeIn').get,
            easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, 'easeOut').get,
            easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, 'easeInOut').get
          function sum(e, t) {
            var r = _typeof(e),
              n = _typeof(t)
            if ('string' === r || 'string' === n) return e + t
            if (isNumerable(r, e) && isNumerable(n, t)) return e + t
            if ($bm_isInstanceOfArray(e) && isNumerable(n, t)) return ((e = e.slice(0))[0] += t), e
            if (isNumerable(r, e) && $bm_isInstanceOfArray(t)) return ((t = t.slice(0))[0] = e + t[0]), t
            if ($bm_isInstanceOfArray(e) && $bm_isInstanceOfArray(t)) {
              for (var i = 0, s = e.length, a = t.length, o = []; i < s || i < a; )
                ('number' == typeof e[i] || e[i] instanceof Number) &&
                ('number' == typeof t[i] || t[i] instanceof Number)
                  ? (o[i] = e[i] + t[i])
                  : (o[i] = void 0 === t[i] ? e[i] : e[i] || t[i]),
                  (i += 1)
              return o
            }
            return 0
          }
          var add = sum
          function sub(e, t) {
            var r = _typeof(e),
              n = _typeof(t)
            if (isNumerable(r, e) && isNumerable(n, t))
              return 'string' === r && (e = parseInt(e, 10)), 'string' === n && (t = parseInt(t, 10)), e - t
            if ($bm_isInstanceOfArray(e) && isNumerable(n, t)) return ((e = e.slice(0))[0] -= t), e
            if (isNumerable(r, e) && $bm_isInstanceOfArray(t)) return ((t = t.slice(0))[0] = e - t[0]), t
            if ($bm_isInstanceOfArray(e) && $bm_isInstanceOfArray(t)) {
              for (var i = 0, s = e.length, a = t.length, o = []; i < s || i < a; )
                ('number' == typeof e[i] || e[i] instanceof Number) &&
                ('number' == typeof t[i] || t[i] instanceof Number)
                  ? (o[i] = e[i] - t[i])
                  : (o[i] = void 0 === t[i] ? e[i] : e[i] || t[i]),
                  (i += 1)
              return o
            }
            return 0
          }
          function mul(e, t) {
            var r,
              n,
              i,
              s = _typeof(e),
              a = _typeof(t)
            if (isNumerable(s, e) && isNumerable(a, t)) return e * t
            if ($bm_isInstanceOfArray(e) && isNumerable(a, t)) {
              for (i = e.length, r = createTypedArray('float32', i), n = 0; n < i; n += 1) r[n] = e[n] * t
              return r
            }
            if (isNumerable(s, e) && $bm_isInstanceOfArray(t)) {
              for (i = t.length, r = createTypedArray('float32', i), n = 0; n < i; n += 1) r[n] = e * t[n]
              return r
            }
            return 0
          }
          function div(e, t) {
            var r,
              n,
              i,
              s = _typeof(e),
              a = _typeof(t)
            if (isNumerable(s, e) && isNumerable(a, t)) return e / t
            if ($bm_isInstanceOfArray(e) && isNumerable(a, t)) {
              for (i = e.length, r = createTypedArray('float32', i), n = 0; n < i; n += 1) r[n] = e[n] / t
              return r
            }
            if (isNumerable(s, e) && $bm_isInstanceOfArray(t)) {
              for (i = t.length, r = createTypedArray('float32', i), n = 0; n < i; n += 1) r[n] = e / t[n]
              return r
            }
            return 0
          }
          function mod(e, t) {
            return 'string' == typeof e && (e = parseInt(e, 10)), 'string' == typeof t && (t = parseInt(t, 10)), e % t
          }
          var $bm_sum = sum,
            $bm_sub = sub,
            $bm_mul = mul,
            $bm_div = div,
            $bm_mod = mod
          function clamp(e, t, r) {
            if (t > r) {
              var n = r
              ;(r = t), (t = n)
            }
            return Math.min(Math.max(e, t), r)
          }
          function radiansToDegrees(e) {
            return e / degToRads
          }
          var radians_to_degrees = radiansToDegrees
          function degreesToRadians(e) {
            return e * degToRads
          }
          var degrees_to_radians = radiansToDegrees,
            helperLengthArray = [0, 0, 0, 0, 0, 0]
          function length(e, t) {
            if ('number' == typeof e || e instanceof Number) return (t = t || 0), Math.abs(e - t)
            var r
            t || (t = helperLengthArray)
            var n = Math.min(e.length, t.length),
              i = 0
            for (r = 0; r < n; r += 1) i += Math.pow(t[r] - e[r], 2)
            return Math.sqrt(i)
          }
          function normalize(e) {
            return div(e, length(e))
          }
          function rgbToHsl(e) {
            var t,
              r,
              n = e[0],
              i = e[1],
              s = e[2],
              a = Math.max(n, i, s),
              o = Math.min(n, i, s),
              l = (a + o) / 2
            if (a === o) (t = 0), (r = 0)
            else {
              var h = a - o
              switch (((r = l > 0.5 ? h / (2 - a - o) : h / (a + o)), a)) {
                case n:
                  t = (i - s) / h + (i < s ? 6 : 0)
                  break
                case i:
                  t = (s - n) / h + 2
                  break
                case s:
                  t = (n - i) / h + 4
              }
              t /= 6
            }
            return [t, r, l, e[3]]
          }
          function hue2rgb(e, t, r) {
            return (
              r < 0 && (r += 1),
              r > 1 && (r -= 1),
              r < 1 / 6 ? e + 6 * (t - e) * r : r < 0.5 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e
            )
          }
          function hslToRgb(e) {
            var t,
              r,
              n,
              i = e[0],
              s = e[1],
              a = e[2]
            if (0 === s) (t = a), (n = a), (r = a)
            else {
              var o = a < 0.5 ? a * (1 + s) : a + s - a * s,
                l = 2 * a - o
              ;(t = hue2rgb(l, o, i + 1 / 3)), (r = hue2rgb(l, o, i)), (n = hue2rgb(l, o, i - 1 / 3))
            }
            return [t, r, n, e[3]]
          }
          function linear(e, t, r, n, i) {
            if (((void 0 !== n && void 0 !== i) || ((n = t), (i = r), (t = 0), (r = 1)), r < t)) {
              var s = r
              ;(r = t), (t = s)
            }
            if (e <= t) return n
            if (e >= r) return i
            var a,
              o = r === t ? 0 : (e - t) / (r - t)
            if (!n.length) return n + (i - n) * o
            var l = n.length,
              h = createTypedArray('float32', l)
            for (a = 0; a < l; a += 1) h[a] = n[a] + (i[a] - n[a]) * o
            return h
          }
          function random(e, t) {
            if ((void 0 === t && (void 0 === e ? ((e = 0), (t = 1)) : ((t = e), (e = void 0))), t.length)) {
              var r,
                n = t.length
              e || (e = createTypedArray('float32', n))
              var i = createTypedArray('float32', n),
                s = BMMath.random()
              for (r = 0; r < n; r += 1) i[r] = e[r] + s * (t[r] - e[r])
              return i
            }
            return void 0 === e && (e = 0), e + BMMath.random() * (t - e)
          }
          function createPath(e, t, r, n) {
            var i,
              s = e.length,
              a = shapePool.newElement()
            a.setPathData(!!n, s)
            var o,
              l,
              h = [0, 0]
            for (i = 0; i < s; i += 1)
              (o = t && t[i] ? t[i] : h),
                (l = r && r[i] ? r[i] : h),
                a.setTripleAt(e[i][0], e[i][1], l[0] + e[i][0], l[1] + e[i][1], o[0] + e[i][0], o[1] + e[i][1], i, !0)
            return a
          }
          function initiateExpression(elem, data, property) {
            var val = data.x,
              needsVelocity = /velocity(?![\w\d])/.test(val),
              _needsRandom = -1 !== val.indexOf('random'),
              elemType = elem.data.ty,
              transform,
              $bm_transform,
              content,
              effect,
              thisProperty = property
            ;(thisProperty.valueAtTime = thisProperty.getValueAtTime),
              Object.defineProperty(thisProperty, 'value', {
                get: function () {
                  return thisProperty.v
                },
              }),
              (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
              (elem.comp.displayStartTime = 0)
            var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
              outPoint = elem.data.op / elem.comp.globalData.frameRate,
              width = elem.data.sw ? elem.data.sw : 0,
              height = elem.data.sh ? elem.data.sh : 0,
              name = elem.data.nm,
              loopIn,
              loop_in,
              loopOut,
              loop_out,
              smooth,
              toWorld,
              fromWorld,
              fromComp,
              toComp,
              fromCompToSurface,
              position,
              rotation,
              anchorPoint,
              scale,
              thisLayer,
              thisComp,
              mask,
              valueAtTime,
              velocityAtTime,
              scoped_bm_rt,
              expression_function = eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0],
              numKeys = property.kf ? data.k.length : 0,
              active = !this.data || !0 !== this.data.hd,
              wiggle = function (e, t) {
                var r,
                  n,
                  i = this.pv.length ? this.pv.length : 1,
                  s = createTypedArray('float32', i),
                  a = Math.floor(5 * time)
                for (r = 0, n = 0; r < a; ) {
                  for (n = 0; n < i; n += 1) s[n] += -t + 2 * t * BMMath.random()
                  r += 1
                }
                var o = 5 * time,
                  l = o - Math.floor(o),
                  h = createTypedArray('float32', i)
                if (i > 1) {
                  for (n = 0; n < i; n += 1) h[n] = this.pv[n] + s[n] + (-t + 2 * t * BMMath.random()) * l
                  return h
                }
                return this.pv + s[0] + (-t + 2 * t * BMMath.random()) * l
              }.bind(this)
            function loopInDuration(e, t) {
              return loopIn(e, t, !0)
            }
            function loopOutDuration(e, t) {
              return loopOut(e, t, !0)
            }
            thisProperty.loopIn && ((loopIn = thisProperty.loopIn.bind(thisProperty)), (loop_in = loopIn)),
              thisProperty.loopOut && ((loopOut = thisProperty.loopOut.bind(thisProperty)), (loop_out = loopOut)),
              thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)),
              this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
              this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this))
            var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
              time,
              velocity,
              value,
              text,
              textIndex,
              textTotal,
              selectorValue
            function lookAt(e, t) {
              var r = [t[0] - e[0], t[1] - e[1], t[2] - e[2]],
                n = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads
              return [-Math.atan2(r[1], r[2]) / degToRads, n, 0]
            }
            function easeOut(e, t, r, n, i) {
              return applyEase(easeOutBez, e, t, r, n, i)
            }
            function easeIn(e, t, r, n, i) {
              return applyEase(easeInBez, e, t, r, n, i)
            }
            function ease(e, t, r, n, i) {
              return applyEase(easeInOutBez, e, t, r, n, i)
            }
            function applyEase(e, t, r, n, i, s) {
              void 0 === i ? ((i = r), (s = n)) : (t = (t - r) / (n - r)), t > 1 ? (t = 1) : t < 0 && (t = 0)
              var a = e(t)
              if ($bm_isInstanceOfArray(i)) {
                var o,
                  l = i.length,
                  h = createTypedArray('float32', l)
                for (o = 0; o < l; o += 1) h[o] = (s[o] - i[o]) * a + i[o]
                return h
              }
              return (s - i) * a + i
            }
            function nearestKey(e) {
              var t,
                r,
                n,
                i = data.k.length
              if (data.k.length && 'number' != typeof data.k[0])
                if (((r = -1), (e *= elem.comp.globalData.frameRate) < data.k[0].t)) (r = 1), (n = data.k[0].t)
                else {
                  for (t = 0; t < i - 1; t += 1) {
                    if (e === data.k[t].t) {
                      ;(r = t + 1), (n = data.k[t].t)
                      break
                    }
                    if (e > data.k[t].t && e < data.k[t + 1].t) {
                      e - data.k[t].t > data.k[t + 1].t - e
                        ? ((r = t + 2), (n = data.k[t + 1].t))
                        : ((r = t + 1), (n = data.k[t].t))
                      break
                    }
                  }
                  ;-1 === r && ((r = t + 1), (n = data.k[t].t))
                }
              else (r = 0), (n = 0)
              var s = {}
              return (s.index = r), (s.time = n / elem.comp.globalData.frameRate), s
            }
            function key(e) {
              var t, r, n
              if (!data.k.length || 'number' == typeof data.k[0])
                throw new Error('The property has no keyframe at index ' + e)
              ;(e -= 1), (t = { time: data.k[e].t / elem.comp.globalData.frameRate, value: [] })
              var i = Object.prototype.hasOwnProperty.call(data.k[e], 's') ? data.k[e].s : data.k[e - 1].e
              for (n = i.length, r = 0; r < n; r += 1) (t[r] = i[r]), (t.value[r] = i[r])
              return t
            }
            function framesToTime(e, t) {
              return t || (t = elem.comp.globalData.frameRate), e / t
            }
            function timeToFrames(e, t) {
              return e || 0 === e || (e = time), t || (t = elem.comp.globalData.frameRate), e * t
            }
            function seedRandom(e) {
              BMMath.seedrandom(randSeed + e)
            }
            function sourceRectAtTime() {
              return elem.sourceRectAtTime()
            }
            function substring(e, t) {
              return 'string' == typeof value ? (void 0 === t ? value.substring(e) : value.substring(e, t)) : ''
            }
            function substr(e, t) {
              return 'string' == typeof value ? (void 0 === t ? value.substr(e) : value.substr(e, t)) : ''
            }
            function posterizeTime(e) {
              ;(time = 0 === e ? 0 : Math.floor(time * e) / e), (value = valueAtTime(time))
            }
            var index = elem.data.ind,
              hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
              parent,
              randSeed = Math.floor(1e6 * Math.random()),
              globalData = elem.globalData
            function executeExpression(e) {
              return (
                (value = e),
                this.frameExpressionId === elem.globalData.frameId && 'textSelector' !== this.propType
                  ? value
                  : ('textSelector' === this.propType &&
                      ((textIndex = this.textIndex),
                      (textTotal = this.textTotal),
                      (selectorValue = this.selectorValue)),
                    thisLayer ||
                      ((text = elem.layerInterface.text),
                      (thisLayer = elem.layerInterface),
                      (thisComp = elem.comp.compInterface),
                      (toWorld = thisLayer.toWorld.bind(thisLayer)),
                      (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                      (fromComp = thisLayer.fromComp.bind(thisLayer)),
                      (toComp = thisLayer.toComp.bind(thisLayer)),
                      (mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null),
                      (fromCompToSurface = fromComp)),
                    transform ||
                      ((transform = elem.layerInterface('ADBE Transform Group')),
                      ($bm_transform = transform),
                      transform && (anchorPoint = transform.anchorPoint)),
                    4 !== elemType || content || (content = thisLayer('ADBE Root Vectors Group')),
                    effect || (effect = thisLayer(4)),
                    (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) &&
                      !parent &&
                      (parent = elem.hierarchy[0].layerInterface),
                    (time = this.comp.renderedFrame / this.comp.globalData.frameRate),
                    _needsRandom && seedRandom(randSeed + time),
                    needsVelocity && (velocity = velocityAtTime(time)),
                    expression_function(),
                    (this.frameExpressionId = elem.globalData.frameId),
                    (scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt))
              )
            }
            return (
              (executeExpression.__preventDeadCodeRemoval = [
                $bm_transform,
                anchorPoint,
                velocity,
                inPoint,
                outPoint,
                width,
                height,
                name,
                loop_in,
                loop_out,
                smooth,
                toComp,
                fromCompToSurface,
                toWorld,
                fromWorld,
                mask,
                position,
                rotation,
                scale,
                thisComp,
                numKeys,
                active,
                wiggle,
                loopInDuration,
                loopOutDuration,
                comp,
                lookAt,
                easeOut,
                easeIn,
                ease,
                nearestKey,
                key,
                text,
                textIndex,
                textTotal,
                selectorValue,
                framesToTime,
                timeToFrames,
                sourceRectAtTime,
                substring,
                substr,
                posterizeTime,
                index,
                globalData,
              ]),
              executeExpression
            )
          }
          return (
            (ob.initiateExpression = initiateExpression),
            (ob.__preventDeadCodeRemoval = [
              window,
              document,
              XMLHttpRequest,
              fetch,
              frames,
              $bm_neg,
              add,
              $bm_sum,
              $bm_sub,
              $bm_mul,
              $bm_div,
              $bm_mod,
              clamp,
              radians_to_degrees,
              degreesToRadians,
              degrees_to_radians,
              normalize,
              rgbToHsl,
              hslToRgb,
              linear,
              random,
              createPath,
            ]),
            ob
          )
        })(),
        expressionHelpers = {
          searchExpressions: function (e, t, r) {
            t.x &&
              ((r.k = !0),
              (r.x = !0),
              (r.initiateExpression = ExpressionManager.initiateExpression),
              r.effectsSequence.push(r.initiateExpression(e, t, r).bind(r)))
          },
          getSpeedAtTime: function (e) {
            var t = this.getValueAtTime(e),
              r = this.getValueAtTime(e + -0.01),
              n = 0
            if (t.length) {
              var i
              for (i = 0; i < t.length; i += 1) n += Math.pow(r[i] - t[i], 2)
              n = 100 * Math.sqrt(n)
            } else n = 0
            return n
          },
          getVelocityAtTime: function (e) {
            if (void 0 !== this.vel) return this.vel
            var t,
              r,
              n = -0.001,
              i = this.getValueAtTime(e),
              s = this.getValueAtTime(e + n)
            if (i.length)
              for (t = createTypedArray('float32', i.length), r = 0; r < i.length; r += 1) t[r] = (s[r] - i[r]) / n
            else t = (s - i) / n
            return t
          },
          getValueAtTime: function (e) {
            return (
              (e *= this.elem.globalData.frameRate),
              (e -= this.offsetTime) !== this._cachingAtTime.lastFrame &&
                ((this._cachingAtTime.lastIndex =
                  this._cachingAtTime.lastFrame < e ? this._cachingAtTime.lastIndex : 0),
                (this._cachingAtTime.value = this.interpolateValue(e, this._cachingAtTime)),
                (this._cachingAtTime.lastFrame = e)),
              this._cachingAtTime.value
            )
          },
          getStaticValueAtTime: function () {
            return this.pv
          },
          setGroupProperty: function (e) {
            this.propertyGroup = e
          },
        }
      function addPropertyDecorator() {
        function e(e, t, r) {
          if (!this.k || !this.keyframes) return this.pv
          e = e ? e.toLowerCase() : ''
          var n,
            i,
            s,
            a,
            o,
            l = this.comp.renderedFrame,
            h = this.keyframes,
            c = h[h.length - 1].t
          if (l <= c) return this.pv
          if (
            (r
              ? (i =
                  c -
                  (n = t ? Math.abs(c - this.elem.comp.globalData.frameRate * t) : Math.max(0, c - this.elem.data.ip)))
              : ((!t || t > h.length - 1) && (t = h.length - 1), (n = c - (i = h[h.length - 1 - t].t))),
            'pingpong' === e)
          ) {
            if (Math.floor((l - i) / n) % 2 != 0)
              return this.getValueAtTime((n - ((l - i) % n) + i) / this.comp.globalData.frameRate, 0)
          } else {
            if ('offset' === e) {
              var p = this.getValueAtTime(i / this.comp.globalData.frameRate, 0),
                u = this.getValueAtTime(c / this.comp.globalData.frameRate, 0),
                f = this.getValueAtTime((((l - i) % n) + i) / this.comp.globalData.frameRate, 0),
                d = Math.floor((l - i) / n)
              if (this.pv.length) {
                for (a = (o = new Array(p.length)).length, s = 0; s < a; s += 1) o[s] = (u[s] - p[s]) * d + f[s]
                return o
              }
              return (u - p) * d + f
            }
            if ('continue' === e) {
              var m = this.getValueAtTime(c / this.comp.globalData.frameRate, 0),
                g = this.getValueAtTime((c - 0.001) / this.comp.globalData.frameRate, 0)
              if (this.pv.length) {
                for (a = (o = new Array(m.length)).length, s = 0; s < a; s += 1)
                  o[s] = m[s] + ((m[s] - g[s]) * ((l - c) / this.comp.globalData.frameRate)) / 5e-4
                return o
              }
              return m + ((l - c) / 0.001) * (m - g)
            }
          }
          return this.getValueAtTime((((l - i) % n) + i) / this.comp.globalData.frameRate, 0)
        }
        function t(e, t, r) {
          if (!this.k) return this.pv
          e = e ? e.toLowerCase() : ''
          var n,
            i,
            s,
            a,
            o,
            l = this.comp.renderedFrame,
            h = this.keyframes,
            c = h[0].t
          if (l >= c) return this.pv
          if (
            (r
              ? (i =
                  c + (n = t ? Math.abs(this.elem.comp.globalData.frameRate * t) : Math.max(0, this.elem.data.op - c)))
              : ((!t || t > h.length - 1) && (t = h.length - 1), (n = (i = h[t].t) - c)),
            'pingpong' === e)
          ) {
            if (Math.floor((c - l) / n) % 2 == 0)
              return this.getValueAtTime((((c - l) % n) + c) / this.comp.globalData.frameRate, 0)
          } else {
            if ('offset' === e) {
              var p = this.getValueAtTime(c / this.comp.globalData.frameRate, 0),
                u = this.getValueAtTime(i / this.comp.globalData.frameRate, 0),
                f = this.getValueAtTime((n - ((c - l) % n) + c) / this.comp.globalData.frameRate, 0),
                d = Math.floor((c - l) / n) + 1
              if (this.pv.length) {
                for (a = (o = new Array(p.length)).length, s = 0; s < a; s += 1) o[s] = f[s] - (u[s] - p[s]) * d
                return o
              }
              return f - (u - p) * d
            }
            if ('continue' === e) {
              var m = this.getValueAtTime(c / this.comp.globalData.frameRate, 0),
                g = this.getValueAtTime((c + 0.001) / this.comp.globalData.frameRate, 0)
              if (this.pv.length) {
                for (a = (o = new Array(m.length)).length, s = 0; s < a; s += 1)
                  o[s] = m[s] + ((m[s] - g[s]) * (c - l)) / 0.001
                return o
              }
              return m + ((m - g) * (c - l)) / 0.001
            }
          }
          return this.getValueAtTime((n - (((c - l) % n) + c)) / this.comp.globalData.frameRate, 0)
        }
        function r(e, t) {
          if (!this.k) return this.pv
          if (((e = 0.5 * (e || 0.4)), (t = Math.floor(t || 5)) <= 1)) return this.pv
          var r,
            n,
            i = this.comp.renderedFrame / this.comp.globalData.frameRate,
            s = i - e,
            a = t > 1 ? (i + e - s) / (t - 1) : 1,
            o = 0,
            l = 0
          for (r = this.pv.length ? createTypedArray('float32', this.pv.length) : 0; o < t; ) {
            if (((n = this.getValueAtTime(s + o * a)), this.pv.length))
              for (l = 0; l < this.pv.length; l += 1) r[l] += n[l]
            else r += n
            o += 1
          }
          if (this.pv.length) for (l = 0; l < this.pv.length; l += 1) r[l] /= t
          else r /= t
          return r
        }
        function n(e) {
          this._transformCachingAtTime || (this._transformCachingAtTime = { v: new Matrix() })
          var t = this._transformCachingAtTime.v
          if ((t.cloneFromProps(this.pre.props), this.appliedTransformations < 1)) {
            var r = this.a.getValueAtTime(e)
            t.translate(-r[0] * this.a.mult, -r[1] * this.a.mult, r[2] * this.a.mult)
          }
          if (this.appliedTransformations < 2) {
            var n = this.s.getValueAtTime(e)
            t.scale(n[0] * this.s.mult, n[1] * this.s.mult, n[2] * this.s.mult)
          }
          if (this.sk && this.appliedTransformations < 3) {
            var i = this.sk.getValueAtTime(e),
              s = this.sa.getValueAtTime(e)
            t.skewFromAxis(-i * this.sk.mult, s * this.sa.mult)
          }
          if (this.r && this.appliedTransformations < 4) {
            var a = this.r.getValueAtTime(e)
            t.rotate(-a * this.r.mult)
          } else if (!this.r && this.appliedTransformations < 4) {
            var o = this.rz.getValueAtTime(e),
              l = this.ry.getValueAtTime(e),
              h = this.rx.getValueAtTime(e),
              c = this.or.getValueAtTime(e)
            t.rotateZ(-o * this.rz.mult)
              .rotateY(l * this.ry.mult)
              .rotateX(h * this.rx.mult)
              .rotateZ(-c[2] * this.or.mult)
              .rotateY(c[1] * this.or.mult)
              .rotateX(c[0] * this.or.mult)
          }
          if (this.data.p && this.data.p.s) {
            var p = this.px.getValueAtTime(e),
              u = this.py.getValueAtTime(e)
            if (this.data.p.z) {
              var f = this.pz.getValueAtTime(e)
              t.translate(p * this.px.mult, u * this.py.mult, -f * this.pz.mult)
            } else t.translate(p * this.px.mult, u * this.py.mult, 0)
          } else {
            var d = this.p.getValueAtTime(e)
            t.translate(d[0] * this.p.mult, d[1] * this.p.mult, -d[2] * this.p.mult)
          }
          return t
        }
        function i() {
          return this.v.clone(new Matrix())
        }
        var s = TransformPropertyFactory.getTransformProperty
        TransformPropertyFactory.getTransformProperty = function (e, t, r) {
          var a = s(e, t, r)
          return (
            a.dynamicProperties.length ? (a.getValueAtTime = n.bind(a)) : (a.getValueAtTime = i.bind(a)),
            (a.setGroupProperty = expressionHelpers.setGroupProperty),
            a
          )
        }
        var a = PropertyFactory.getProp
        PropertyFactory.getProp = function (n, i, s, o, l) {
          var h = a(n, i, s, o, l)
          h.kf
            ? (h.getValueAtTime = expressionHelpers.getValueAtTime.bind(h))
            : (h.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(h)),
            (h.setGroupProperty = expressionHelpers.setGroupProperty),
            (h.loopOut = e),
            (h.loopIn = t),
            (h.smooth = r),
            (h.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(h)),
            (h.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(h)),
            (h.numKeys = 1 === i.a ? i.k.length : 0),
            (h.propertyIndex = i.ix)
          var c = 0
          return (
            0 !== s && (c = createTypedArray('float32', 1 === i.a ? i.k[0].s.length : i.k.length)),
            (h._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: c }),
            expressionHelpers.searchExpressions(n, i, h),
            h.k && l.addDynamicProperty(h),
            h
          )
        }
        var o = ShapePropertyFactory.getConstructorFunction(),
          l = ShapePropertyFactory.getKeyframedConstructorFunction()
        function h() {}
        ;(h.prototype = {
          vertices: function (e, t) {
            this.k && this.getValue()
            var r,
              n = this.v
            void 0 !== t && (n = this.getValueAtTime(t, 0))
            var i = n._length,
              s = n[e],
              a = n.v,
              o = createSizedArray(i)
            for (r = 0; r < i; r += 1)
              o[r] = 'i' === e || 'o' === e ? [s[r][0] - a[r][0], s[r][1] - a[r][1]] : [s[r][0], s[r][1]]
            return o
          },
          points: function (e) {
            return this.vertices('v', e)
          },
          inTangents: function (e) {
            return this.vertices('i', e)
          },
          outTangents: function (e) {
            return this.vertices('o', e)
          },
          isClosed: function () {
            return this.v.c
          },
          pointOnPath: function (e, t) {
            var r = this.v
            void 0 !== t && (r = this.getValueAtTime(t, 0)),
              this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r))
            for (
              var n, i = this._segmentsLength, s = i.lengths, a = i.totalLength * e, o = 0, l = s.length, h = 0;
              o < l;

            ) {
              if (h + s[o].addedLength > a) {
                var c = o,
                  p = r.c && o === l - 1 ? 0 : o + 1,
                  u = (a - h) / s[o].addedLength
                n = bez.getPointInSegment(r.v[c], r.v[p], r.o[c], r.i[p], u, s[o])
                break
              }
              ;(h += s[o].addedLength), (o += 1)
            }
            return n || (n = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), n
          },
          vectorOnPath: function (e, t, r) {
            1 == e ? (e = this.v.c) : 0 == e && (e = 0.999)
            var n = this.pointOnPath(e, t),
              i = this.pointOnPath(e + 0.001, t),
              s = i[0] - n[0],
              a = i[1] - n[1],
              o = Math.sqrt(Math.pow(s, 2) + Math.pow(a, 2))
            return 0 === o ? [0, 0] : 'tangent' === r ? [s / o, a / o] : [-a / o, s / o]
          },
          tangentOnPath: function (e, t) {
            return this.vectorOnPath(e, t, 'tangent')
          },
          normalOnPath: function (e, t) {
            return this.vectorOnPath(e, t, 'normal')
          },
          setGroupProperty: expressionHelpers.setGroupProperty,
          getValueAtTime: expressionHelpers.getStaticValueAtTime,
        }),
          extendPrototype([h], o),
          extendPrototype([h], l),
          (l.prototype.getValueAtTime = function (e) {
            return (
              this._cachingAtTime ||
                (this._cachingAtTime = {
                  shapeValue: shapePool.clone(this.pv),
                  lastIndex: 0,
                  lastTime: initialDefaultFrame,
                }),
              (e *= this.elem.globalData.frameRate),
              (e -= this.offsetTime) !== this._cachingAtTime.lastTime &&
                ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < e ? this._caching.lastIndex : 0),
                (this._cachingAtTime.lastTime = e),
                this.interpolateShape(e, this._cachingAtTime.shapeValue, this._cachingAtTime)),
              this._cachingAtTime.shapeValue
            )
          }),
          (l.prototype.initiateExpression = ExpressionManager.initiateExpression)
        var c = ShapePropertyFactory.getShapeProp
        ShapePropertyFactory.getShapeProp = function (e, t, r, n, i) {
          var s = c(e, t, r, n, i)
          return (
            (s.propertyIndex = t.ix),
            (s.lock = !1),
            3 === r
              ? expressionHelpers.searchExpressions(e, t.pt, s)
              : 4 === r && expressionHelpers.searchExpressions(e, t.ks, s),
            s.k && e.addDynamicProperty(s),
            s
          )
        }
      }
      function initialize$1() {
        addPropertyDecorator()
      }
      function addDecorator() {
        ;(TextProperty.prototype.getExpressionValue = function (e, t) {
          var r = this.calculateExpression(t)
          if (e.t !== r) {
            var n = {}
            return this.copyData(n, e), (n.t = r.toString()), (n.__complete = !1), n
          }
          return e
        }),
          (TextProperty.prototype.searchProperty = function () {
            var e = this.searchKeyframes(),
              t = this.searchExpressions()
            return (this.kf = e || t), this.kf
          }),
          (TextProperty.prototype.searchExpressions = function () {
            return this.data.d.x
              ? ((this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(
                  this.elem,
                  this.data.d,
                  this
                )),
                this.addEffect(this.getExpressionValue.bind(this)),
                !0)
              : null
          })
      }
      function initialize() {
        addDecorator()
      }
      return (
        registerRenderer('canvas', CanvasRenderer),
        registerRenderer('html', HybridRenderer),
        registerRenderer('svg', SVGRenderer),
        ShapeModifiers.registerModifier('tm', TrimModifier),
        ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier),
        ShapeModifiers.registerModifier('rp', RepeaterModifier),
        ShapeModifiers.registerModifier('rd', RoundCornersModifier),
        setExpressionsPlugin(Expressions),
        initialize$1(),
        initialize(),
        registerEffect(20, SVGTintFilter, !0),
        registerEffect(21, SVGFillFilter, !0),
        registerEffect(22, SVGStrokeEffect, !1),
        registerEffect(23, SVGTritoneFilter, !0),
        registerEffect(24, SVGProLevelsFilter, !0),
        registerEffect(25, SVGDropShadowEffect, !0),
        registerEffect(28, SVGMatte3Effect, !1),
        registerEffect(29, SVGGaussianBlurEffect, !0),
        lottie
      )
    }),
    (module.exports = factory()))
})(lottie$1, lottie$1.exports)
var lottie = lottie$1.exports,
  axios$2 = { exports: {} },
  bind$2 = function (e, t) {
    return function () {
      for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n]
      return e.apply(t, r)
    }
  },
  bind$1 = bind$2,
  toString = Object.prototype.toString
function isArray(e) {
  return '[object Array]' === toString.call(e)
}
function isUndefined(e) {
  return void 0 === e
}
function isBuffer(e) {
  return (
    null !== e &&
    !isUndefined(e) &&
    null !== e.constructor &&
    !isUndefined(e.constructor) &&
    'function' == typeof e.constructor.isBuffer &&
    e.constructor.isBuffer(e)
  )
}
function isArrayBuffer(e) {
  return '[object ArrayBuffer]' === toString.call(e)
}
function isFormData(e) {
  return 'undefined' != typeof FormData && e instanceof FormData
}
function isArrayBufferView(e) {
  return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
    ? ArrayBuffer.isView(e)
    : e && e.buffer && e.buffer instanceof ArrayBuffer
}
function isString(e) {
  return 'string' == typeof e
}
function isNumber(e) {
  return 'number' == typeof e
}
function isObject$1(e) {
  return null !== e && 'object' == typeof e
}
function isPlainObject(e) {
  if ('[object Object]' !== toString.call(e)) return !1
  var t = Object.getPrototypeOf(e)
  return null === t || t === Object.prototype
}
function isDate(e) {
  return '[object Date]' === toString.call(e)
}
function isFile(e) {
  return '[object File]' === toString.call(e)
}
function isBlob(e) {
  return '[object Blob]' === toString.call(e)
}
function isFunction(e) {
  return '[object Function]' === toString.call(e)
}
function isStream(e) {
  return isObject$1(e) && isFunction(e.pipe)
}
function isURLSearchParams(e) {
  return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams
}
function trim(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '')
}
function isStandardBrowserEnv() {
  return (
    ('undefined' == typeof navigator ||
      ('ReactNative' !== navigator.product && 'NativeScript' !== navigator.product && 'NS' !== navigator.product)) &&
    'undefined' != typeof window &&
    'undefined' != typeof document
  )
}
function forEach(e, t) {
  if (null != e)
    if (('object' != typeof e && (e = [e]), isArray(e)))
      for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e)
    else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
}
function merge() {
  var e = {}
  function t(t, r) {
    isPlainObject(e[r]) && isPlainObject(t)
      ? (e[r] = merge(e[r], t))
      : isPlainObject(t)
      ? (e[r] = merge({}, t))
      : isArray(t)
      ? (e[r] = t.slice())
      : (e[r] = t)
  }
  for (var r = 0, n = arguments.length; r < n; r++) forEach(arguments[r], t)
  return e
}
function extend(e, t, r) {
  return (
    forEach(t, function (t, n) {
      e[n] = r && 'function' == typeof t ? bind$1(t, r) : t
    }),
    e
  )
}
function stripBOM(e) {
  return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
}
var utils$d = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject$1,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
  },
  utils$c = utils$d
function encode(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
var buildURL$2 = function (e, t, r) {
    if (!t) return e
    var n
    if (r) n = r(t)
    else if (utils$c.isURLSearchParams(t)) n = t.toString()
    else {
      var i = []
      utils$c.forEach(t, function (e, t) {
        null != e &&
          (utils$c.isArray(e) ? (t += '[]') : (e = [e]),
          utils$c.forEach(e, function (e) {
            utils$c.isDate(e) ? (e = e.toISOString()) : utils$c.isObject(e) && (e = JSON.stringify(e)),
              i.push(encode(t) + '=' + encode(e))
          }))
      }),
        (n = i.join('&'))
    }
    if (n) {
      var s = e.indexOf('#')
      ;-1 !== s && (e = e.slice(0, s)), (e += (-1 === e.indexOf('?') ? '?' : '&') + n)
    }
    return e
  },
  utils$b = utils$d
function InterceptorManager$1() {
  this.handlers = []
}
;(InterceptorManager$1.prototype.use = function (e, t, r) {
  return (
    this.handlers.push({ fulfilled: e, rejected: t, synchronous: !!r && r.synchronous, runWhen: r ? r.runWhen : null }),
    this.handlers.length - 1
  )
}),
  (InterceptorManager$1.prototype.eject = function (e) {
    this.handlers[e] && (this.handlers[e] = null)
  }),
  (InterceptorManager$1.prototype.forEach = function (e) {
    utils$b.forEach(this.handlers, function (t) {
      null !== t && e(t)
    })
  })
var InterceptorManager_1 = InterceptorManager$1,
  utils$a = utils$d,
  normalizeHeaderName$1 = function (e, t) {
    utils$a.forEach(e, function (r, n) {
      n !== t && n.toUpperCase() === t.toUpperCase() && ((e[t] = r), delete e[n])
    })
  },
  enhanceError$2 = function (e, t, r, n, i) {
    return (
      (e.config = t),
      r && (e.code = r),
      (e.request = n),
      (e.response = i),
      (e.isAxiosError = !0),
      (e.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null,
        }
      }),
      e
    )
  },
  enhanceError$1 = enhanceError$2,
  createError$2 = function (e, t, r, n, i) {
    var s = new Error(e)
    return enhanceError$1(s, t, r, n, i)
  },
  createError$1 = createError$2,
  settle$1 = function (e, t, r) {
    var n = r.config.validateStatus
    r.status && n && !n(r.status)
      ? t(createError$1('Request failed with status code ' + r.status, r.config, null, r.request, r))
      : e(r)
  },
  utils$9 = utils$d,
  cookies$1 = utils$9.isStandardBrowserEnv()
    ? {
        write: function (e, t, r, n, i, s) {
          var a = []
          a.push(e + '=' + encodeURIComponent(t)),
            utils$9.isNumber(r) && a.push('expires=' + new Date(r).toGMTString()),
            utils$9.isString(n) && a.push('path=' + n),
            utils$9.isString(i) && a.push('domain=' + i),
            !0 === s && a.push('secure'),
            (document.cookie = a.join('; '))
        },
        read: function (e) {
          var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'))
          return t ? decodeURIComponent(t[3]) : null
        },
        remove: function (e) {
          this.write(e, '', Date.now() - 864e5)
        },
      }
    : {
        write: function () {},
        read: function () {
          return null
        },
        remove: function () {},
      },
  isAbsoluteURL$1 = function (e) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
  },
  combineURLs$1 = function (e, t) {
    return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
  },
  isAbsoluteURL = isAbsoluteURL$1,
  combineURLs = combineURLs$1,
  buildFullPath$1 = function (e, t) {
    return e && !isAbsoluteURL(t) ? combineURLs(e, t) : t
  },
  utils$8 = utils$d,
  ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ],
  parseHeaders$1 = function (e) {
    var t,
      r,
      n,
      i = {}
    return e
      ? (utils$8.forEach(e.split('\n'), function (e) {
          if (
            ((n = e.indexOf(':')),
            (t = utils$8.trim(e.substr(0, n)).toLowerCase()),
            (r = utils$8.trim(e.substr(n + 1))),
            t)
          ) {
            if (i[t] && ignoreDuplicateOf.indexOf(t) >= 0) return
            i[t] = 'set-cookie' === t ? (i[t] ? i[t] : []).concat([r]) : i[t] ? i[t] + ', ' + r : r
          }
        }),
        i)
      : i
  },
  utils$7 = utils$d,
  isURLSameOrigin$1 = utils$7.isStandardBrowserEnv()
    ? (function () {
        var e,
          t = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement('a')
        function n(e) {
          var n = e
          return (
            t && (r.setAttribute('href', n), (n = r.href)),
            r.setAttribute('href', n),
            {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, '') : '',
              hash: r.hash ? r.hash.replace(/^#/, '') : '',
              hostname: r.hostname,
              port: r.port,
              pathname: '/' === r.pathname.charAt(0) ? r.pathname : '/' + r.pathname,
            }
          )
        }
        return (
          (e = n(window.location.href)),
          function (t) {
            var r = utils$7.isString(t) ? n(t) : t
            return r.protocol === e.protocol && r.host === e.host
          }
        )
      })()
    : function () {
        return !0
      }
function Cancel$3(e) {
  this.message = e
}
;(Cancel$3.prototype.toString = function () {
  return 'Cancel' + (this.message ? ': ' + this.message : '')
}),
  (Cancel$3.prototype.__CANCEL__ = !0)
var Cancel_1 = Cancel$3,
  utils$6 = utils$d,
  settle = settle$1,
  cookies = cookies$1,
  buildURL$1 = buildURL$2,
  buildFullPath = buildFullPath$1,
  parseHeaders = parseHeaders$1,
  isURLSameOrigin = isURLSameOrigin$1,
  createError = createError$2,
  defaults$4 = defaults_1,
  Cancel$2 = Cancel_1,
  xhr = function (e) {
    return new Promise(function (t, r) {
      var n,
        i = e.data,
        s = e.headers,
        a = e.responseType
      function o() {
        e.cancelToken && e.cancelToken.unsubscribe(n), e.signal && e.signal.removeEventListener('abort', n)
      }
      utils$6.isFormData(i) && delete s['Content-Type']
      var l = new XMLHttpRequest()
      if (e.auth) {
        var h = e.auth.username || '',
          c = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ''
        s.Authorization = 'Basic ' + btoa(h + ':' + c)
      }
      var p = buildFullPath(e.baseURL, e.url)
      function u() {
        if (l) {
          var n = 'getAllResponseHeaders' in l ? parseHeaders(l.getAllResponseHeaders()) : null,
            i = {
              data: a && 'text' !== a && 'json' !== a ? l.response : l.responseText,
              status: l.status,
              statusText: l.statusText,
              headers: n,
              config: e,
              request: l,
            }
          settle(
            function (e) {
              t(e), o()
            },
            function (e) {
              r(e), o()
            },
            i
          ),
            (l = null)
        }
      }
      if (
        (l.open(e.method.toUpperCase(), buildURL$1(p, e.params, e.paramsSerializer), !0),
        (l.timeout = e.timeout),
        'onloadend' in l
          ? (l.onloadend = u)
          : (l.onreadystatechange = function () {
              l &&
                4 === l.readyState &&
                (0 !== l.status || (l.responseURL && 0 === l.responseURL.indexOf('file:'))) &&
                setTimeout(u)
            }),
        (l.onabort = function () {
          l && (r(createError('Request aborted', e, 'ECONNABORTED', l)), (l = null))
        }),
        (l.onerror = function () {
          r(createError('Network Error', e, null, l)), (l = null)
        }),
        (l.ontimeout = function () {
          var t = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded',
            n = e.transitional || defaults$4.transitional
          e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
            r(createError(t, e, n.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', l)),
            (l = null)
        }),
        utils$6.isStandardBrowserEnv())
      ) {
        var f = (e.withCredentials || isURLSameOrigin(p)) && e.xsrfCookieName ? cookies.read(e.xsrfCookieName) : void 0
        f && (s[e.xsrfHeaderName] = f)
      }
      'setRequestHeader' in l &&
        utils$6.forEach(s, function (e, t) {
          void 0 === i && 'content-type' === t.toLowerCase() ? delete s[t] : l.setRequestHeader(t, e)
        }),
        utils$6.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials),
        a && 'json' !== a && (l.responseType = e.responseType),
        'function' == typeof e.onDownloadProgress && l.addEventListener('progress', e.onDownloadProgress),
        'function' == typeof e.onUploadProgress &&
          l.upload &&
          l.upload.addEventListener('progress', e.onUploadProgress),
        (e.cancelToken || e.signal) &&
          ((n = function (e) {
            l && (r(!e || (e && e.type) ? new Cancel$2('canceled') : e), l.abort(), (l = null))
          }),
          e.cancelToken && e.cancelToken.subscribe(n),
          e.signal && (e.signal.aborted ? n() : e.signal.addEventListener('abort', n))),
        i || (i = null),
        l.send(i)
    })
  },
  utils$5 = utils$d,
  normalizeHeaderName = normalizeHeaderName$1,
  enhanceError = enhanceError$2,
  DEFAULT_CONTENT_TYPE = { 'Content-Type': 'application/x-www-form-urlencoded' }
function setContentTypeIfUnset(e, t) {
  !utils$5.isUndefined(e) && utils$5.isUndefined(e['Content-Type']) && (e['Content-Type'] = t)
}
function getDefaultAdapter() {
  var e
  return (
    ('undefined' != typeof XMLHttpRequest ||
      ('undefined' != typeof process && '[object process]' === Object.prototype.toString.call(process))) &&
      (e = xhr),
    e
  )
}
function stringifySafely(e, t, r) {
  if (utils$5.isString(e))
    try {
      return (t || JSON.parse)(e), utils$5.trim(e)
    } catch (n) {
      if ('SyntaxError' !== n.name) throw n
    }
  return (r || JSON.stringify)(e)
}
var defaults$3 = {
  transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
  adapter: getDefaultAdapter(),
  transformRequest: [
    function (e, t) {
      return (
        normalizeHeaderName(t, 'Accept'),
        normalizeHeaderName(t, 'Content-Type'),
        utils$5.isFormData(e) ||
        utils$5.isArrayBuffer(e) ||
        utils$5.isBuffer(e) ||
        utils$5.isStream(e) ||
        utils$5.isFile(e) ||
        utils$5.isBlob(e)
          ? e
          : utils$5.isArrayBufferView(e)
          ? e.buffer
          : utils$5.isURLSearchParams(e)
          ? (setContentTypeIfUnset(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
          : utils$5.isObject(e) || (t && 'application/json' === t['Content-Type'])
          ? (setContentTypeIfUnset(t, 'application/json'), stringifySafely(e))
          : e
      )
    },
  ],
  transformResponse: [
    function (e) {
      var t = this.transitional || defaults$3.transitional,
        r = t && t.silentJSONParsing,
        n = t && t.forcedJSONParsing,
        i = !r && 'json' === this.responseType
      if (i || (n && utils$5.isString(e) && e.length))
        try {
          return JSON.parse(e)
        } catch (s) {
          if (i) {
            if ('SyntaxError' === s.name) throw enhanceError(s, this, 'E_JSON_PARSE')
            throw s
          }
        }
      return e
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function (e) {
    return e >= 200 && e < 300
  },
  headers: { common: { Accept: 'application/json, text/plain, */*' } },
}
utils$5.forEach(['delete', 'get', 'head'], function (e) {
  defaults$3.headers[e] = {}
}),
  utils$5.forEach(['post', 'put', 'patch'], function (e) {
    defaults$3.headers[e] = utils$5.merge(DEFAULT_CONTENT_TYPE)
  })
var defaults_1 = defaults$3,
  utils$4 = utils$d,
  defaults$2 = defaults_1,
  transformData$1 = function (e, t, r) {
    var n = this || defaults$2
    return (
      utils$4.forEach(r, function (r) {
        e = r.call(n, e, t)
      }),
      e
    )
  },
  isCancel$1 = function (e) {
    return !(!e || !e.__CANCEL__)
  },
  utils$3 = utils$d,
  transformData = transformData$1,
  isCancel = isCancel$1,
  defaults$1 = defaults_1,
  Cancel$1 = Cancel_1
function throwIfCancellationRequested(e) {
  if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new Cancel$1('canceled')
}
var dispatchRequest$1 = function (e) {
    return (
      throwIfCancellationRequested(e),
      (e.headers = e.headers || {}),
      (e.data = transformData.call(e, e.data, e.headers, e.transformRequest)),
      (e.headers = utils$3.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
      utils$3.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
        delete e.headers[t]
      }),
      (e.adapter || defaults$1.adapter)(e).then(
        function (t) {
          return (
            throwIfCancellationRequested(e), (t.data = transformData.call(e, t.data, t.headers, e.transformResponse)), t
          )
        },
        function (t) {
          return (
            isCancel(t) ||
              (throwIfCancellationRequested(e),
              t &&
                t.response &&
                (t.response.data = transformData.call(e, t.response.data, t.response.headers, e.transformResponse))),
            Promise.reject(t)
          )
        }
      )
    )
  },
  utils$2 = utils$d,
  mergeConfig$2 = function (e, t) {
    t = t || {}
    var r = {}
    function n(e, t) {
      return utils$2.isPlainObject(e) && utils$2.isPlainObject(t)
        ? utils$2.merge(e, t)
        : utils$2.isPlainObject(t)
        ? utils$2.merge({}, t)
        : utils$2.isArray(t)
        ? t.slice()
        : t
    }
    function i(r) {
      return utils$2.isUndefined(t[r]) ? (utils$2.isUndefined(e[r]) ? void 0 : n(void 0, e[r])) : n(e[r], t[r])
    }
    function s(e) {
      if (!utils$2.isUndefined(t[e])) return n(void 0, t[e])
    }
    function a(r) {
      return utils$2.isUndefined(t[r]) ? (utils$2.isUndefined(e[r]) ? void 0 : n(void 0, e[r])) : n(void 0, t[r])
    }
    function o(r) {
      return r in t ? n(e[r], t[r]) : r in e ? n(void 0, e[r]) : void 0
    }
    var l = {
      url: s,
      method: s,
      data: s,
      baseURL: a,
      transformRequest: a,
      transformResponse: a,
      paramsSerializer: a,
      timeout: a,
      timeoutMessage: a,
      withCredentials: a,
      adapter: a,
      responseType: a,
      xsrfCookieName: a,
      xsrfHeaderName: a,
      onUploadProgress: a,
      onDownloadProgress: a,
      decompress: a,
      maxContentLength: a,
      maxBodyLength: a,
      transport: a,
      httpAgent: a,
      httpsAgent: a,
      cancelToken: a,
      socketPath: a,
      responseEncoding: a,
      validateStatus: o,
    }
    return (
      utils$2.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
        var t = l[e] || i,
          n = t(e)
        ;(utils$2.isUndefined(n) && t !== o) || (r[e] = n)
      }),
      r
    )
  },
  data = { version: '0.24.0' },
  VERSION = data.version,
  validators$1 = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (e, t) {
  validators$1[e] = function (r) {
    return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e
  }
})
var deprecatedWarnings = {}
function assertOptions(e, t, r) {
  if ('object' != typeof e) throw new TypeError('options must be an object')
  for (var n = Object.keys(e), i = n.length; i-- > 0; ) {
    var s = n[i],
      a = t[s]
    if (a) {
      var o = e[s],
        l = void 0 === o || a(o, s, e)
      if (!0 !== l) throw new TypeError('option ' + s + ' must be ' + l)
    } else if (!0 !== r) throw Error('Unknown option ' + s)
  }
}
validators$1.transitional = function (e, t, r) {
  return function (n, i, s) {
    if (!1 === e)
      throw new Error(
        (function (e, t) {
          return '[Axios v' + VERSION + "] Transitional option '" + e + "'" + t + (r ? '. ' + r : '')
        })(i, ' has been removed' + (t ? ' in ' + t : ''))
      )
    return t && !deprecatedWarnings[i] && (deprecatedWarnings[i] = !0), !e || e(n, i, s)
  }
}
var validator$1 = { assertOptions: assertOptions, validators: validators$1 },
  utils$1 = utils$d,
  buildURL = buildURL$2,
  InterceptorManager = InterceptorManager_1,
  dispatchRequest = dispatchRequest$1,
  mergeConfig$1 = mergeConfig$2,
  validator = validator$1,
  validators = validator.validators
function Axios$1(e) {
  ;(this.defaults = e), (this.interceptors = { request: new InterceptorManager(), response: new InterceptorManager() })
}
;(Axios$1.prototype.request = function (e) {
  'string' == typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
    (e = mergeConfig$1(this.defaults, e)).method
      ? (e.method = e.method.toLowerCase())
      : this.defaults.method
      ? (e.method = this.defaults.method.toLowerCase())
      : (e.method = 'get')
  var t = e.transitional
  void 0 !== t &&
    validator.assertOptions(
      t,
      {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean),
      },
      !1
    )
  var r = [],
    n = !0
  this.interceptors.request.forEach(function (t) {
    ;('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
      ((n = n && t.synchronous), r.unshift(t.fulfilled, t.rejected))
  })
  var i,
    s = []
  if (
    (this.interceptors.response.forEach(function (e) {
      s.push(e.fulfilled, e.rejected)
    }),
    !n)
  ) {
    var a = [dispatchRequest, void 0]
    for (Array.prototype.unshift.apply(a, r), a = a.concat(s), i = Promise.resolve(e); a.length; )
      i = i.then(a.shift(), a.shift())
    return i
  }
  for (var o = e; r.length; ) {
    var l = r.shift(),
      h = r.shift()
    try {
      o = l(o)
    } catch (c) {
      h(c)
      break
    }
  }
  try {
    i = dispatchRequest(o)
  } catch (c) {
    return Promise.reject(c)
  }
  for (; s.length; ) i = i.then(s.shift(), s.shift())
  return i
}),
  (Axios$1.prototype.getUri = function (e) {
    return (e = mergeConfig$1(this.defaults, e)), buildURL(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
  }),
  utils$1.forEach(['delete', 'get', 'head', 'options'], function (e) {
    Axios$1.prototype[e] = function (t, r) {
      return this.request(mergeConfig$1(r || {}, { method: e, url: t, data: (r || {}).data }))
    }
  }),
  utils$1.forEach(['post', 'put', 'patch'], function (e) {
    Axios$1.prototype[e] = function (t, r, n) {
      return this.request(mergeConfig$1(n || {}, { method: e, url: t, data: r }))
    }
  })
var Axios_1 = Axios$1,
  Cancel = Cancel_1
function CancelToken(e) {
  if ('function' != typeof e) throw new TypeError('executor must be a function.')
  var t
  this.promise = new Promise(function (e) {
    t = e
  })
  var r = this
  this.promise.then(function (e) {
    if (r._listeners) {
      var t,
        n = r._listeners.length
      for (t = 0; t < n; t++) r._listeners[t](e)
      r._listeners = null
    }
  }),
    (this.promise.then = function (e) {
      var t,
        n = new Promise(function (e) {
          r.subscribe(e), (t = e)
        }).then(e)
      return (
        (n.cancel = function () {
          r.unsubscribe(t)
        }),
        n
      )
    }),
    e(function (e) {
      r.reason || ((r.reason = new Cancel(e)), t(r.reason))
    })
}
;(CancelToken.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason
}),
  (CancelToken.prototype.subscribe = function (e) {
    this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e])
  }),
  (CancelToken.prototype.unsubscribe = function (e) {
    if (this._listeners) {
      var t = this._listeners.indexOf(e)
      ;-1 !== t && this._listeners.splice(t, 1)
    }
  }),
  (CancelToken.source = function () {
    var e
    return {
      token: new CancelToken(function (t) {
        e = t
      }),
      cancel: e,
    }
  })
var CancelToken_1 = CancelToken,
  spread = function (e) {
    return function (t) {
      return e.apply(null, t)
    }
  },
  isAxiosError = function (e) {
    return 'object' == typeof e && !0 === e.isAxiosError
  },
  utils = utils$d,
  bind = bind$2,
  Axios = Axios_1,
  mergeConfig = mergeConfig$2,
  defaults = defaults_1
function createInstance(e) {
  var t = new Axios(e),
    r = bind(Axios.prototype.request, t)
  return (
    utils.extend(r, Axios.prototype, t),
    utils.extend(r, t),
    (r.create = function (t) {
      return createInstance(mergeConfig(e, t))
    }),
    r
  )
}
var axios$1 = createInstance(defaults)
;(axios$1.Axios = Axios),
  (axios$1.Cancel = Cancel_1),
  (axios$1.CancelToken = CancelToken_1),
  (axios$1.isCancel = isCancel$1),
  (axios$1.VERSION = data.version),
  (axios$1.all = function (e) {
    return Promise.all(e)
  }),
  (axios$1.spread = spread),
  (axios$1.isAxiosError = isAxiosError),
  (axios$2.exports = axios$1),
  (axios$2.exports.default = axios$1)
var axios = axios$2.exports,
  storeKey = 'store'
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */ function forEachValue(e, t) {
  Object.keys(e).forEach(function (r) {
    return t(e[r], r)
  })
}
function isObject(e) {
  return null !== e && 'object' == typeof e
}
function isPromise(e) {
  return e && 'function' == typeof e.then
}
function partial(e, t) {
  return function () {
    return e(t)
  }
}
function genericSubscribe(e, t, r) {
  return (
    t.indexOf(e) < 0 && (r && r.prepend ? t.unshift(e) : t.push(e)),
    function () {
      var r = t.indexOf(e)
      r > -1 && t.splice(r, 1)
    }
  )
}
function resetStore(e, t) {
  ;(e._actions = Object.create(null)),
    (e._mutations = Object.create(null)),
    (e._wrappedGetters = Object.create(null)),
    (e._modulesNamespaceMap = Object.create(null))
  var r = e.state
  installModule(e, r, [], e._modules.root, !0), resetStoreState(e, r, t)
}
function resetStoreState(e, t, r) {
  var n = e._state
  ;(e.getters = {}), (e._makeLocalGettersCache = Object.create(null))
  var i = e._wrappedGetters,
    s = {}
  forEachValue(i, function (t, r) {
    ;(s[r] = partial(t, e)),
      Object.defineProperty(e.getters, r, {
        get: function () {
          return s[r]()
        },
        enumerable: !0,
      })
  }),
    (e._state = reactive({ data: t })),
    e.strict && enableStrictMode(e),
    n &&
      r &&
      e._withCommit(function () {
        n.data = null
      })
}
function installModule(e, t, r, n, i) {
  var s = !r.length,
    a = e._modules.getNamespace(r)
  if ((n.namespaced && (e._modulesNamespaceMap[a], (e._modulesNamespaceMap[a] = n)), !s && !i)) {
    var o = getNestedState(t, r.slice(0, -1)),
      l = r[r.length - 1]
    e._withCommit(function () {
      o[l] = n.state
    })
  }
  var h = (n.context = makeLocalContext(e, a, r))
  n.forEachMutation(function (t, r) {
    registerMutation(e, a + r, t, h)
  }),
    n.forEachAction(function (t, r) {
      var n = t.root ? r : a + r,
        i = t.handler || t
      registerAction(e, n, i, h)
    }),
    n.forEachGetter(function (t, r) {
      registerGetter(e, a + r, t, h)
    }),
    n.forEachChild(function (n, s) {
      installModule(e, t, r.concat(s), n, i)
    })
}
function makeLocalContext(e, t, r) {
  var n = '' === t,
    i = {
      dispatch: n
        ? e.dispatch
        : function (r, n, i) {
            var s = unifyObjectStyle(r, n, i),
              a = s.payload,
              o = s.options,
              l = s.type
            return (o && o.root) || (l = t + l), e.dispatch(l, a)
          },
      commit: n
        ? e.commit
        : function (r, n, i) {
            var s = unifyObjectStyle(r, n, i),
              a = s.payload,
              o = s.options,
              l = s.type
            ;(o && o.root) || (l = t + l), e.commit(l, a, o)
          },
    }
  return (
    Object.defineProperties(i, {
      getters: {
        get: n
          ? function () {
              return e.getters
            }
          : function () {
              return makeLocalGetters(e, t)
            },
      },
      state: {
        get: function () {
          return getNestedState(e.state, r)
        },
      },
    }),
    i
  )
}
function makeLocalGetters(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var r = {},
      n = t.length
    Object.keys(e.getters).forEach(function (i) {
      if (i.slice(0, n) === t) {
        var s = i.slice(n)
        Object.defineProperty(r, s, {
          get: function () {
            return e.getters[i]
          },
          enumerable: !0,
        })
      }
    }),
      (e._makeLocalGettersCache[t] = r)
  }
  return e._makeLocalGettersCache[t]
}
function registerMutation(e, t, r, n) {
  ;(e._mutations[t] || (e._mutations[t] = [])).push(function (t) {
    r.call(e, n.state, t)
  })
}
function registerAction(e, t, r, n) {
  ;(e._actions[t] || (e._actions[t] = [])).push(function (t) {
    var i = r.call(
      e,
      {
        dispatch: n.dispatch,
        commit: n.commit,
        getters: n.getters,
        state: n.state,
        rootGetters: e.getters,
        rootState: e.state,
      },
      t
    )
    return (
      isPromise(i) || (i = Promise.resolve(i)),
      e._devtoolHook
        ? i.catch(function (t) {
            throw (e._devtoolHook.emit('vuex:error', t), t)
          })
        : i
    )
  })
}
function registerGetter(e, t, r, n) {
  e._wrappedGetters[t] ||
    (e._wrappedGetters[t] = function (e) {
      return r(n.state, n.getters, e.state, e.getters)
    })
}
function enableStrictMode(e) {
  watch(
    function () {
      return e._state.data
    },
    function () {},
    { deep: !0, flush: 'sync' }
  )
}
function getNestedState(e, t) {
  return t.reduce(function (e, t) {
    return e[t]
  }, e)
}
function unifyObjectStyle(e, t, r) {
  return isObject(e) && e.type && ((r = t), (t = e), (e = e.type)), { type: e, payload: t, options: r }
}
var LABEL_VUEX_BINDINGS = 'vuex bindings',
  MUTATIONS_LAYER_ID = 'vuex:mutations',
  ACTIONS_LAYER_ID = 'vuex:actions',
  INSPECTOR_ID = 'vuex',
  actionId = 0
function addDevtools(e, t) {
  setupDevtoolsPlugin(
    {
      id: 'org.vuejs.vuex',
      app: e,
      label: 'Vuex',
      homepage: 'https://next.vuex.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      packageName: 'vuex',
      componentStateTypes: [LABEL_VUEX_BINDINGS],
    },
    function (r) {
      r.addTimelineLayer({ id: MUTATIONS_LAYER_ID, label: 'Vuex Mutations', color: COLOR_LIME_500 }),
        r.addTimelineLayer({ id: ACTIONS_LAYER_ID, label: 'Vuex Actions', color: COLOR_LIME_500 }),
        r.addInspector({ id: INSPECTOR_ID, label: 'Vuex', icon: 'storage', treeFilterPlaceholder: 'Filter stores...' }),
        r.on.getInspectorTree(function (r) {
          if (r.app === e && r.inspectorId === INSPECTOR_ID)
            if (r.filter) {
              var n = []
              flattenStoreForInspectorTree(n, t._modules.root, r.filter, ''), (r.rootNodes = n)
            } else r.rootNodes = [formatStoreForInspectorTree(t._modules.root, '')]
        }),
        r.on.getInspectorState(function (r) {
          if (r.app === e && r.inspectorId === INSPECTOR_ID) {
            var n = r.nodeId
            makeLocalGetters(t, n),
              (r.state = formatStoreForInspectorState(
                getStoreModule(t._modules, n),
                'root' === n ? t.getters : t._makeLocalGettersCache,
                n
              ))
          }
        }),
        r.on.editInspectorState(function (r) {
          if (r.app === e && r.inspectorId === INSPECTOR_ID) {
            var n = r.nodeId,
              i = r.path
            'root' !== n && (i = n.split('/').filter(Boolean).concat(i)),
              t._withCommit(function () {
                r.set(t._state.data, i, r.state.value)
              })
          }
        }),
        t.subscribe(function (e, t) {
          var n = {}
          e.payload && (n.payload = e.payload),
            (n.state = t),
            r.notifyComponentUpdate(),
            r.sendInspectorTree(INSPECTOR_ID),
            r.sendInspectorState(INSPECTOR_ID),
            r.addTimelineEvent({ layerId: MUTATIONS_LAYER_ID, event: { time: Date.now(), title: e.type, data: n } })
        }),
        t.subscribeAction({
          before: function (e, t) {
            var n = {}
            e.payload && (n.payload = e.payload),
              (e._id = actionId++),
              (e._time = Date.now()),
              (n.state = t),
              r.addTimelineEvent({
                layerId: ACTIONS_LAYER_ID,
                event: { time: e._time, title: e.type, groupId: e._id, subtitle: 'start', data: n },
              })
          },
          after: function (e, t) {
            var n = {},
              i = Date.now() - e._time
            ;(n.duration = { _custom: { type: 'duration', display: i + 'ms', tooltip: 'Action duration', value: i } }),
              e.payload && (n.payload = e.payload),
              (n.state = t),
              r.addTimelineEvent({
                layerId: ACTIONS_LAYER_ID,
                event: { time: Date.now(), title: e.type, groupId: e._id, subtitle: 'end', data: n },
              })
          },
        })
    }
  )
}
var COLOR_LIME_500 = 8702998,
  COLOR_DARK = 6710886,
  COLOR_WHITE = 16777215,
  TAG_NAMESPACED = { label: 'namespaced', textColor: COLOR_WHITE, backgroundColor: COLOR_DARK }
function extractNameFromPath(e) {
  return e && 'root' !== e ? e.split('/').slice(-2, -1)[0] : 'Root'
}
function formatStoreForInspectorTree(e, t) {
  return {
    id: t || 'root',
    label: extractNameFromPath(t),
    tags: e.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(e._children).map(function (r) {
      return formatStoreForInspectorTree(e._children[r], t + r + '/')
    }),
  }
}
function flattenStoreForInspectorTree(e, t, r, n) {
  n.includes(r) &&
    e.push({
      id: n || 'root',
      label: n.endsWith('/') ? n.slice(0, n.length - 1) : n || 'Root',
      tags: t.namespaced ? [TAG_NAMESPACED] : [],
    }),
    Object.keys(t._children).forEach(function (i) {
      flattenStoreForInspectorTree(e, t._children[i], r, n + i + '/')
    })
}
function formatStoreForInspectorState(e, t, r) {
  t = 'root' === r ? t : t[r]
  var n = Object.keys(t),
    i = {
      state: Object.keys(e.state).map(function (t) {
        return { key: t, editable: !0, value: e.state[t] }
      }),
    }
  if (n.length) {
    var s = transformPathsToObjectTree(t)
    i.getters = Object.keys(s).map(function (e) {
      return {
        key: e.endsWith('/') ? extractNameFromPath(e) : e,
        editable: !1,
        value: canThrow(function () {
          return s[e]
        }),
      }
    })
  }
  return i
}
function transformPathsToObjectTree(e) {
  var t = {}
  return (
    Object.keys(e).forEach(function (r) {
      var n = r.split('/')
      if (n.length > 1) {
        var i = t,
          s = n.pop()
        n.forEach(function (e) {
          i[e] || (i[e] = { _custom: { value: {}, display: e, tooltip: 'Module', abstract: !0 } }),
            (i = i[e]._custom.value)
        }),
          (i[s] = canThrow(function () {
            return e[r]
          }))
      } else
        t[r] = canThrow(function () {
          return e[r]
        })
    }),
    t
  )
}
function getStoreModule(e, t) {
  var r = t.split('/').filter(function (e) {
    return e
  })
  return r.reduce(
    function (e, n, i) {
      var s = e[n]
      if (!s) throw new Error('Missing module "' + n + '" for path "' + t + '".')
      return i === r.length - 1 ? s : s._children
    },
    'root' === t ? e : e.root._children
  )
}
function canThrow(e) {
  try {
    return e()
  } catch (t) {
    return t
  }
}
var Module = function (e, t) {
    ;(this.runtime = t), (this._children = Object.create(null)), (this._rawModule = e)
    var r = e.state
    this.state = ('function' == typeof r ? r() : r) || {}
  },
  prototypeAccessors$1 = { namespaced: { configurable: !0 } }
;(prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
}),
  (Module.prototype.addChild = function (e, t) {
    this._children[e] = t
  }),
  (Module.prototype.removeChild = function (e) {
    delete this._children[e]
  }),
  (Module.prototype.getChild = function (e) {
    return this._children[e]
  }),
  (Module.prototype.hasChild = function (e) {
    return e in this._children
  }),
  (Module.prototype.update = function (e) {
    ;(this._rawModule.namespaced = e.namespaced),
      e.actions && (this._rawModule.actions = e.actions),
      e.mutations && (this._rawModule.mutations = e.mutations),
      e.getters && (this._rawModule.getters = e.getters)
  }),
  (Module.prototype.forEachChild = function (e) {
    forEachValue(this._children, e)
  }),
  (Module.prototype.forEachGetter = function (e) {
    this._rawModule.getters && forEachValue(this._rawModule.getters, e)
  }),
  (Module.prototype.forEachAction = function (e) {
    this._rawModule.actions && forEachValue(this._rawModule.actions, e)
  }),
  (Module.prototype.forEachMutation = function (e) {
    this._rawModule.mutations && forEachValue(this._rawModule.mutations, e)
  }),
  Object.defineProperties(Module.prototype, prototypeAccessors$1)
var ModuleCollection = function (e) {
  this.register([], e, !1)
}
function update(e, t, r) {
  if ((t.update(r), r.modules))
    for (var n in r.modules) {
      if (!t.getChild(n)) return
      update(e.concat(n), t.getChild(n), r.modules[n])
    }
}
function createStore(e) {
  return new Store(e)
}
;(ModuleCollection.prototype.get = function (e) {
  return e.reduce(function (e, t) {
    return e.getChild(t)
  }, this.root)
}),
  (ModuleCollection.prototype.getNamespace = function (e) {
    var t = this.root
    return e.reduce(function (e, r) {
      return e + ((t = t.getChild(r)).namespaced ? r + '/' : '')
    }, '')
  }),
  (ModuleCollection.prototype.update = function (e) {
    update([], this.root, e)
  }),
  (ModuleCollection.prototype.register = function (e, t, r) {
    var n = this
    void 0 === r && (r = !0)
    var i = new Module(t, r)
    0 === e.length ? (this.root = i) : this.get(e.slice(0, -1)).addChild(e[e.length - 1], i)
    t.modules &&
      forEachValue(t.modules, function (t, i) {
        n.register(e.concat(i), t, r)
      })
  }),
  (ModuleCollection.prototype.unregister = function (e) {
    var t = this.get(e.slice(0, -1)),
      r = e[e.length - 1],
      n = t.getChild(r)
    n && n.runtime && t.removeChild(r)
  }),
  (ModuleCollection.prototype.isRegistered = function (e) {
    var t = this.get(e.slice(0, -1)),
      r = e[e.length - 1]
    return !!t && t.hasChild(r)
  })
var Store = function (e) {
    var t = this
    void 0 === e && (e = {})
    var r = e.plugins
    void 0 === r && (r = [])
    var n = e.strict
    void 0 === n && (n = !1)
    var i = e.devtools
    ;(this._committing = !1),
      (this._actions = Object.create(null)),
      (this._actionSubscribers = []),
      (this._mutations = Object.create(null)),
      (this._wrappedGetters = Object.create(null)),
      (this._modules = new ModuleCollection(e)),
      (this._modulesNamespaceMap = Object.create(null)),
      (this._subscribers = []),
      (this._makeLocalGettersCache = Object.create(null)),
      (this._devtools = i)
    var s = this,
      a = this.dispatch,
      o = this.commit
    ;(this.dispatch = function (e, t) {
      return a.call(s, e, t)
    }),
      (this.commit = function (e, t, r) {
        return o.call(s, e, t, r)
      }),
      (this.strict = n)
    var l = this._modules.root.state
    installModule(this, l, [], this._modules.root),
      resetStoreState(this, l),
      r.forEach(function (e) {
        return e(t)
      })
  },
  prototypeAccessors = { state: { configurable: !0 } }
;(Store.prototype.install = function (e, t) {
  e.provide(t || storeKey, this),
    (e.config.globalProperties.$store = this),
    void 0 !== this._devtools && this._devtools && addDevtools(e, this)
}),
  (prototypeAccessors.state.get = function () {
    return this._state.data
  }),
  (prototypeAccessors.state.set = function (e) {}),
  (Store.prototype.commit = function (e, t, r) {
    var n = this,
      i = unifyObjectStyle(e, t, r),
      s = i.type,
      a = i.payload,
      o = { type: s, payload: a },
      l = this._mutations[s]
    l &&
      (this._withCommit(function () {
        l.forEach(function (e) {
          e(a)
        })
      }),
      this._subscribers.slice().forEach(function (e) {
        return e(o, n.state)
      }))
  }),
  (Store.prototype.dispatch = function (e, t) {
    var r = this,
      n = unifyObjectStyle(e, t),
      i = n.type,
      s = n.payload,
      a = { type: i, payload: s },
      o = this._actions[i]
    if (o) {
      try {
        this._actionSubscribers
          .slice()
          .filter(function (e) {
            return e.before
          })
          .forEach(function (e) {
            return e.before(a, r.state)
          })
      } catch (h) {}
      var l =
        o.length > 1
          ? Promise.all(
              o.map(function (e) {
                return e(s)
              })
            )
          : o[0](s)
      return new Promise(function (e, t) {
        l.then(
          function (t) {
            try {
              r._actionSubscribers
                .filter(function (e) {
                  return e.after
                })
                .forEach(function (e) {
                  return e.after(a, r.state)
                })
            } catch (h) {}
            e(t)
          },
          function (e) {
            try {
              r._actionSubscribers
                .filter(function (e) {
                  return e.error
                })
                .forEach(function (t) {
                  return t.error(a, r.state, e)
                })
            } catch (h) {}
            t(e)
          }
        )
      })
    }
  }),
  (Store.prototype.subscribe = function (e, t) {
    return genericSubscribe(e, this._subscribers, t)
  }),
  (Store.prototype.subscribeAction = function (e, t) {
    return genericSubscribe('function' == typeof e ? { before: e } : e, this._actionSubscribers, t)
  }),
  (Store.prototype.watch = function (e, t, r) {
    var n = this
    return watch(
      function () {
        return e(n.state, n.getters)
      },
      t,
      Object.assign({}, r)
    )
  }),
  (Store.prototype.replaceState = function (e) {
    var t = this
    this._withCommit(function () {
      t._state.data = e
    })
  }),
  (Store.prototype.registerModule = function (e, t, r) {
    void 0 === r && (r = {}),
      'string' == typeof e && (e = [e]),
      this._modules.register(e, t),
      installModule(this, this.state, e, this._modules.get(e), r.preserveState),
      resetStoreState(this, this.state)
  }),
  (Store.prototype.unregisterModule = function (e) {
    var t = this
    'string' == typeof e && (e = [e]),
      this._modules.unregister(e),
      this._withCommit(function () {
        delete getNestedState(t.state, e.slice(0, -1))[e[e.length - 1]]
      }),
      resetStore(this)
  }),
  (Store.prototype.hasModule = function (e) {
    return 'string' == typeof e && (e = [e]), this._modules.isRegistered(e)
  }),
  (Store.prototype.hotUpdate = function (e) {
    this._modules.update(e), resetStore(this, !0)
  }),
  (Store.prototype._withCommit = function (e) {
    var t = this._committing
    ;(this._committing = !0), e(), (this._committing = t)
  }),
  Object.defineProperties(Store.prototype, prototypeAccessors)
export {
  createRouter as A,
  createWebHistory as B,
  createStore as C,
  createApp as D,
  computed as E,
  Fragment as F,
  ref as a,
  onMounted as b,
  createBlock as c,
  defineComponent as d,
  createElementBlock as e,
  createBaseVNode as f,
  renderSlot as g,
  createTextVNode as h,
  createCommentVNode as i,
  reactive as j,
  createVNode as k,
  lottie as l,
  withCtx as m,
  unref as n,
  openBlock as o,
  axios as p,
  useRoute as q,
  resolveComponent as r,
  watch as s,
  themeChange as t,
  useRouter as u,
  vShow as v,
  withDirectives as w,
  vModelText as x,
  vModelRadio as y,
  toDisplayString as z,
}
