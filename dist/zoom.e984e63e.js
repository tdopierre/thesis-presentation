// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"plugin/zoom/zoom.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, o) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).RevealZoom = o();
}(this, function () {
  "use strict";
  /*!
  	 * reveal.js Zoom plugin
  	 */

  var e = {
    id: "zoom",
    init: function init(e) {
      e.getRevealElement().addEventListener("mousedown", function (t) {
        var n = /Linux/.test(window.navigator.platform) ? "ctrl" : "alt",
            i = (e.getConfig().zoomKey ? e.getConfig().zoomKey : n) + "Key",
            d = e.getConfig().zoomLevel ? e.getConfig().zoomLevel : 2;
        t[i] && !e.isOverview() && (t.preventDefault(), o.to({
          x: t.clientX,
          y: t.clientY,
          scale: d,
          pan: !1
        }));
      });
    }
  },
      o = function () {
    var e = 1,
        t = 0,
        n = 0,
        i = -1,
        d = -1,
        s = "WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "msTransform" in document.body.style || "OTransform" in document.body.style || "transform" in document.body.style;

    function r(o, t) {
      var n = l();
      if (o.width = o.width || 1, o.height = o.height || 1, o.x -= (window.innerWidth - o.width * t) / 2, o.y -= (window.innerHeight - o.height * t) / 2, s) {
        if (1 === t) document.body.style.transform = "", document.body.style.OTransform = "", document.body.style.msTransform = "", document.body.style.MozTransform = "", document.body.style.WebkitTransform = "";else {
          var i = n.x + "px " + n.y + "px",
              d = "translate(" + -o.x + "px," + -o.y + "px) scale(" + t + ")";
          document.body.style.transformOrigin = i, document.body.style.OTransformOrigin = i, document.body.style.msTransformOrigin = i, document.body.style.MozTransformOrigin = i, document.body.style.WebkitTransformOrigin = i, document.body.style.transform = d, document.body.style.OTransform = d, document.body.style.msTransform = d, document.body.style.MozTransform = d, document.body.style.WebkitTransform = d;
        }
      } else 1 === t ? (document.body.style.position = "", document.body.style.left = "", document.body.style.top = "", document.body.style.width = "", document.body.style.height = "", document.body.style.zoom = "") : (document.body.style.position = "relative", document.body.style.left = -(n.x + o.x) / t + "px", document.body.style.top = -(n.y + o.y) / t + "px", document.body.style.width = 100 * t + "%", document.body.style.height = 100 * t + "%", document.body.style.zoom = t);
      e = t, document.documentElement.classList && (1 !== e ? document.documentElement.classList.add("zoomed") : document.documentElement.classList.remove("zoomed"));
    }

    function m() {
      var o = .12 * window.innerWidth,
          i = .12 * window.innerHeight,
          d = l();
      n < i ? window.scroll(d.x, d.y - 14 / e * (1 - n / i)) : n > window.innerHeight - i && window.scroll(d.x, d.y + (1 - (window.innerHeight - n) / i) * (14 / e)), t < o ? window.scroll(d.x - 14 / e * (1 - t / o), d.y) : t > window.innerWidth - o && window.scroll(d.x + (1 - (window.innerWidth - t) / o) * (14 / e), d.y);
    }

    function l() {
      return {
        x: void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
        y: void 0 !== window.scrollY ? window.scrollY : window.pageYOffset
      };
    }

    return s && (document.body.style.transition = "transform 0.8s ease", document.body.style.OTransition = "-o-transform 0.8s ease", document.body.style.msTransition = "-ms-transform 0.8s ease", document.body.style.MozTransition = "-moz-transform 0.8s ease", document.body.style.WebkitTransition = "-webkit-transform 0.8s ease"), document.addEventListener("keyup", function (t) {
      1 !== e && 27 === t.keyCode && o.out();
    }), document.addEventListener("mousemove", function (o) {
      1 !== e && (t = o.clientX, n = o.clientY);
    }), {
      to: function to(t) {
        if (1 !== e) o.out();else {
          if (t.x = t.x || 0, t.y = t.y || 0, t.element) {
            var n = t.element.getBoundingClientRect();
            t.x = n.left - 20, t.y = n.top - 20, t.width = n.width + 40, t.height = n.height + 40;
          }

          void 0 !== t.width && void 0 !== t.height && (t.scale = Math.max(Math.min(window.innerWidth / t.width, window.innerHeight / t.height), 1)), t.scale > 1 && (t.x *= t.scale, t.y *= t.scale, r(t, t.scale), !1 !== t.pan && (i = setTimeout(function () {
            d = setInterval(m, 1e3 / 60);
          }, 800)));
        }
      },
      out: function out() {
        clearTimeout(i), clearInterval(d), r({
          x: 0,
          y: 0
        }, 1), e = 1;
      },
      magnify: function magnify(e) {
        this.to(e);
      },
      reset: function reset() {
        this.out();
      },
      zoomLevel: function zoomLevel() {
        return e;
      }
    };
  }();

  return function () {
    return e;
  };
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36345" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/zoom/zoom.js"], null)
//# sourceMappingURL=/zoom.e984e63e.js.map