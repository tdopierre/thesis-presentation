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
})({"plugin/reveal.js-plugins/chart/plugin.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*****************************************************************
** Author: Asvin Goel, goel@telematique.eu
** Fixed for Reveal4: kotborealis@awooo.ru
**
** A plugin for reveal.js allowing to integrate Chart.js
**
** Version: 1.3.0
**
** License: MIT license (see LICENSE.md)
**
******************************************************************/

/**
 * Reveal Plugin
 * https://revealjs.com/creating-plugins/
 */
window.RevealChart = window.RevealChart || {
  id: 'RevealChart',
  init: function init(deck) {
    initChart(deck);
  },
  update: function (_update) {
    function update(_x, _x2, _x3) {
      return _update.apply(this, arguments);
    }

    update.toString = function () {
      return _update.toString();
    };

    return update;
  }(function (canvas, idx, data) {
    update(canvas, idx, data);
  })
};

var initChart = function initChart(Reveal) {
  function parseJSON(str) {
    var json;

    try {
      json = JSON.parse(str);
    } catch (e) {
      return null;
    }

    return json;
  }
  /*
  * Recursively merge properties of two objects
  */


  function mergeRecursive(obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj1[p] !== null && _typeof(obj1[p]) === 'object' && _typeof(obj2[p]) === 'object') {
          obj1[p] = mergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }

    return obj1;
  }

  function createChart(canvas, CSV, comments) {
    canvas.chart = null;
    var ctx = canvas.getContext("2d");
    var chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    var chartData = {
      labels: null,
      datasets: []
    };
    if (comments !== null) for (var j = 0; j < comments.length; j++) {
      comments[j] = comments[j].replace(/<!--/, '');
      comments[j] = comments[j].replace(/-->/, '');
      var config = parseJSON(comments[j]);

      if (config) {
        if (config.data) {
          mergeRecursive(chartData, config.data);
        }

        if (config.options) {
          mergeRecursive(chartOptions, config.options);
        }
      }
    }
    var lines = CSV.split('\n').filter(function (v) {
      return v !== '';
    }); // if labels are not defined, get them from first line

    if (chartData.labels === null && lines.length > 0) {
      chartData.labels = lines[0].split(',');
      chartData.labels.shift();
      lines.shift();
    } // get data values


    for (var j = 0; j < lines.length; j++) {
      if (chartData.datasets.length <= j) chartData.datasets[j] = {};
      chartData.datasets[j].data = lines[j].split(','); //.filter(function(v){return v!==''});

      chartData.datasets[j].label = chartData.datasets[j].data[0];
      chartData.datasets[j].data.shift();

      for (var k = 0; k < chartData.datasets[j].data.length; k++) {
        chartData.datasets[j].data[k] = Number(chartData.datasets[j].data[k]);
      }
    } // add chart options


    var config = chartConfig[canvas.getAttribute("data-chart")];

    if (config) {
      for (var j = 0; j < chartData.datasets.length; j++) {
        for (var attrname in config) {
          if (!chartData.datasets[j][attrname]) {
            chartData.datasets[j][attrname] = config[attrname][j % config[attrname].length];
          }
        }
      }
    }

    canvas.chart = new Chart(ctx, {
      type: canvas.getAttribute("data-chart"),
      data: chartData,
      options: chartOptions
    });
  }

  function updateChart(canvas, idx, data) {
    canvas.chart.data.datasets[idx].data = data;
    canvas.chart.update();
    Reveal.layout();
  }

  var initializeCharts = function initializeCharts() {
    // Get all canvases
    var canvases = document.querySelectorAll("canvas");

    for (var i = 0; i < canvases.length; i++) {
      // check if canvas has data-chart attribute
      if (canvases[i].hasAttribute("data-chart")) {
        var CSV = canvases[i].innerHTML.trim();
        var comments = CSV.match(/<!--[\s\S]*?-->/g);
        CSV = CSV.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*\n/gm, "");

        if (!canvases[i].hasAttribute("data-chart-src")) {
          createChart(canvases[i], CSV, comments);
        } else {
          var canvas = canvases[i];
          var xhr = new XMLHttpRequest();

          xhr.onload = function () {
            if (xhr.readyState === 4) {
              createChart(canvas, xhr.responseText, comments);
            } else {
              console.warn('Failed to get file ' + canvas.getAttribute("data-chart-src") + ". ReadyState: " + xhr.readyState + ", Status: " + xhr.status);
            }
          };

          xhr.open('GET', canvas.getAttribute("data-chart-src"), false);

          try {
            xhr.send();
          } catch (error) {
            console.warn('Failed to get file ' + canvas.getAttribute("data-chart-src") + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + error);
          }
        }
      }
    }
  };

  function recreateChart(canvas) {
    // clear data to redraw animation
    var data = canvas.chart.data.datasets;
    canvas.chart.data.datasets = [];
    canvas.chart.update();
    canvas.style.visibility = "hidden";
    setTimeout(function (canvas, data) {
      canvas.chart.data.datasets = data;
      canvas.style.visibility = "visible";
      canvas.chart.update();
    }, 500, canvas, data); // wait for slide transition to re-add data and animation

    /*
    		var config = canvas.chart.config;
    		canvas.chart.destroy();
    		setTimeout( function() { canvas.chart = new Chart(canvas, config);}, 500); // wait for slide transition
    */
  } // check if chart option is given or not


  var chartConfig = Reveal.getConfig().chart || {}; // set global chart options

  var config = chartConfig.defaults;

  if (config) {
    mergeRecursive(Chart.defaults, config);
  }

  Reveal.addEventListener('ready', function () {
    initializeCharts();
    Reveal.addEventListener('slidechanged', function () {
      var canvases = Reveal.getCurrentSlide().querySelectorAll("canvas[data-chart]");

      for (var i = 0; i < canvases.length; i++) {
        if (canvases[i].chart && canvases[i].chart.config.options.animation !== false) {
          recreateChart(canvases[i]);
        }
      }
    });
  });
  this.update = updateChart;
  return this;
};
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/reveal.js-plugins/chart/plugin.js"], null)
//# sourceMappingURL=/plugin.9626e28f.js.map