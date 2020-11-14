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
})({"slider.js":[function(require,module,exports) {
// Elements
var bannerEl = document.querySelector(".banner");
var sliderEl = document.querySelectorAll(".slider");
var previousEl = document.querySelector(".previous");
var nextEl = document.querySelector(".next");
var linksEl = document.querySelector(".links");
var imgLinks = linksEl.getElementsByTagName("a"); // Data attributes

var height = bannerEl.getAttribute("data-height");
var width = bannerEl.getAttribute("data-width");
var slideSpeed = bannerEl.getAttribute("data-slide-speed");
var autoSlide = bannerEl.getAttribute("data-autoslide");
var nextCursor = nextEl.getAttribute("data-next-cursor");
var previousCursor = previousEl.getAttribute("data-previous-cursor"); // Slider variables

var totalImgs = imgLinks.length;
var currentImgNumber = 1;
var nextImgNumber = currentImgNumber + 1;
var previousImgNumber = totalImgs;
var randomImgNumber = 3;
var currentImg = bannerEl.querySelector("img:nth-of-type(" + currentImgNumber + ")");
var nextImg = bannerEl.querySelector("img:nth-of-type(" + nextImgNumber + ")");
var previousImg = bannerEl.querySelector("img:nth-of-type(" + previousImgNumber + ")");
var randomImg = bannerEl.querySelector("img:nth-of-type(" + randomImgNumber + ")"); // Set CSS to element or elements

function setCSS(styles, elements) {
  if (elements.length > 1) {
    for (var i = 0; i < elements.length; i++) {
      Object.assign(elements[i].style, styles);
    }
  } else {
    Object.assign(elements.style, styles);
  }
} // Set CSS before elements appear


document.body.style.margin = "0";
setCSS({
  width: width,
  height: height + "px",
  margin: "0 auto",
  position: "relative"
}, bannerEl);
setCSS({
  position: "absolute",
  width: "50%",
  height: height + "px",
  top: "0"
}, [previousEl, nextEl]);
setCSS({
  cursor: totalImgs <= 1 ? "default" : previousCursor ? "url(" + previousCursor + "), auto" : "w-resize",
  width: "50%",
  left: "0"
}, previousEl);
setCSS({
  cursor: totalImgs <= 1 ? "default" : nextCursor ? "url(" + nextCursor + "), auto" : "e-resize",
  right: "0"
}, nextEl);
setCSS({
  "text-align": "center",
  position: "relative",
  top: "400px",
  left: "0",
  right: "0",
  margin: "auto",
  cursor: "default",
  width: imgLinks.length * 30 + "px"
}, linksEl); // For multiple elements of same class
// Iterate over and set individual element's CSS

for (var i = 0; i < sliderEl.length; i++) {
  setCSS({
    width: width,
    height: height + "px",
    margin: "0 auto"
  }, sliderEl[i]);
  setCSS({
    position: "absolute",
    opacity: "0",
    "object-fit": "cover"
  }, sliderEl[i]);
}

for (var i = 0; i < imgLinks.length; i++) {
  setCSS({
    color: "#000",
    display: "inline-block",
    "text-decoration": "none",
    background: "#FFF",
    "border-radius": "50%",
    height: "15px",
    width: "15px",
    margin: "10px 5px",
    transition: "all 0.5s"
  }, imgLinks[i]);
}

(function () {
  function fadeTo(element, speed, opacity) {
    setCSS({
      transition: "opacity " + speed + "ms",
      opacity: opacity
    }, element);
  }

  function loadImg() {
    fadeTo(currentImg, slideSpeed, 1);
  }

  function nextImgFade() {
    fadeTo(currentImg, slideSpeed, 0);
    fadeTo(nextImg, slideSpeed, 1);
  }

  function previousImgFade() {
    fadeTo(currentImg, slideSpeed, 0);
    fadeTo(previousImg, slideSpeed, 1);
  }

  function randomImgFade() {
    fadeTo(currentImg, slideSpeed, 0);
    fadeTo(randomImg, slideSpeed, 1);
  }

  function boldText() {
    for (var i = 0; i < imgLinks.length; i++) {
      var currentHref = imgLinks[i].getAttribute("href");
      var opacity = currentImgNumber == currentHref ? 0.8 : 0.4;
      setCSS({
        opacity: opacity
      }, imgLinks[i]);
    }
  }

  function imgLoop() {
    nextImgNumber = currentImgNumber + 1;
    previousImgNumber = currentImgNumber - 1;

    if (currentImgNumber == totalImgs) {
      nextImgNumber = 1;
    }

    if (currentImgNumber == 1) {
      previousImgNumber = totalImgs;
    }
  }

  function refreshImgs() {
    currentImg = bannerEl.querySelector("img:nth-of-type(" + currentImgNumber + ")");
    nextImg = bannerEl.querySelector("img:nth-of-type(" + nextImgNumber + ")");
    previousImg = bannerEl.querySelector("img:nth-of-type(" + previousImgNumber + ")");
    randomImg = bannerEl.querySelector("img:nth-of-type(" + randomImgNumber + ")");
  }

  function callFunctions() {
    boldText();
    imgLoop();
    refreshImgs();
  }

  function restartInterval() {
    clearInterval(interval);
    interval = setInterval(loopImages, autoSlide);
  }

  function loopImages() {
    var event = document.createEvent("HTMLEvents");
    event.initEvent("click", 1, 0);
    nextEl.dispatchEvent(event);
  } // Iterate over all links
  // On link click, restart interval, and fade in that image


  for (var i = 0; i < imgLinks.length; i++) {
    imgLinks[i].onclick = function () {
      restartInterval();
      randomImgNumber = parseInt(this.getAttribute("href"));
      randomImg = bannerEl.querySelector("img:nth-of-type(" + randomImgNumber + ")");
      randomImgFade();
      currentImgNumber = randomImgNumber;
      callFunctions();
      return false;
    };
  } // Iterate over previous and next elements
  // On click, check direction, fade next image in and assign current image number


  var previousAndNext = [previousEl, nextEl];

  for (var t = 0; t < previousAndNext.length; t++) {
    if (totalImgs > 1) {
      previousAndNext[t].onclick = function (e) {
        var direction = e.target.getAttribute("class");

        if (direction == "next") {
          nextImgFade();
          currentImgNumber = nextImgNumber;
        } else {
          previousImgFade();
          currentImgNumber = previousImgNumber;
        }

        restartInterval();
        callFunctions();
      };
    }
  }

  boldText();
  loadImg(); // Only set interval if there is more than 1 image

  if (totalImgs > 1) {
    var interval = setInterval(loopImages, autoSlide);
  }
})();
},{}],"../.nvm/versions/node/v14.12.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39833" + '/');

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
},{}]},{},["../.nvm/versions/node/v14.12.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","slider.js"], null)
//# sourceMappingURL=/slider.ab09d017.js.map