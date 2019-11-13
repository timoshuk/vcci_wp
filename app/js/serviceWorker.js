"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var staticAssets = ["../", "../css/fontawesome/all.min.css", "../css/bootstrap.min.css", "../css/styles.css", "../js/custom.js", "../js/lazyImg.js"];
self.addEventListener("install",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event) {
    var cache;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return caches.open("static-cache");

          case 2:
            cache = _context.sent;
            cache.addAll(staticAssets);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
self.addEventListener("fetch", function (event) {
  var req = event.request;
  var url = new URL(req.url);

  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(newtorkFirst(req));
  }
});

function cacheFirst(_x2) {
  return _cacheFirst.apply(this, arguments);
}

function _cacheFirst() {
  _cacheFirst = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req) {
    var cachedResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cachedResponse = caches.match(req);
            return _context2.abrupt("return", cachedResponse || fetch(req));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _cacheFirst.apply(this, arguments);
}

function newtorkFirst(_x3) {
  return _newtorkFirst.apply(this, arguments);
}

function _newtorkFirst() {
  _newtorkFirst = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req) {
    var cache, res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return caches.open("dynamic-cache");

          case 2:
            cache = _context3.sent;
            _context3.prev = 3;
            _context3.next = 6;
            return fetch(req);

          case 6:
            res = _context3.sent;
            cache.put(req, res.clone());
            return _context3.abrupt("return", res);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            _context3.next = 15;
            return cache.match(req);

          case 15:
            return _context3.abrupt("return", _context3.sent);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 11]]);
  }));
  return _newtorkFirst.apply(this, arguments);
}