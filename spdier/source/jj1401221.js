//2014-1-22 13:44 ww
this.Mix = {
    version: "1.0.0"
}, Mix.extend = function(e, t, n) {
    n && Mix.extend(e, n);
    if (t && typeof t == "object")
        for (var r in t) e[r] = t[r];
    return e
},
function(e, t) {
    var n = Object.prototype.toString,
        r = Array.prototype.slice,
        i = navigator.userAgent,
        s = !! e.ActiveXObject,
        o = s && !e.XMLHttpRequest,
        u = i.indexOf("msie 7") > -1,
        a = i.indexOf("msie 7") > -1;
    Mix.extend(Mix, {
        isIE: s,
        isIE6: o,
        isIE7: u,
        isIE8: a,
        emptyFn: function() {},
        error: function(e) {
            throw new Error(e)
        },
        isArray: function(e) {
            return e && n.call(e) == "[object Array]"
        },
        isNumber: function(e) {
            return e && n.call(e) == "[object Number]"
        },
        isObject: function(e) {
            return e && n.call(e) == "[object Object]"
        },
        each: function(e, t) {
            !Mix.isArray(e) && !Mix.isObject(e) && Mix.error("\u7b2c\u4e00\u4e2a\u53c2\u6570\u5fc5\u987b\u662f\u6570\u7ec4\u6216\u5bf9\u8c61"), t = t || Mix.emptyFn;
            if (Mix.isArray(e))
                for (var n = 0, r = e.length; n < r; n++) {
                    var i = t.call(e[n], e[n], n);
                    if (i === !1) return
                } else if (Mix.isObject(e))
                    for (var s in e) {
                        var i = t.call(e[s], e[s], s);
                        if (i === !1) return
                    }
        },
        namespace: function() {
            var t = r.call(arguments);
            Mix.each(t, function(t, n) {
                var r = t.split(".");
                typeof e[r[0]] == "undefined" && (e[r[0]] = {});
                var i = e[r[0]];
                for (var s = 1, o = r.length; s < o; s++) i[r[s]] = i[r[s]] || {}, i = i[r[s]]
            })
        },
        inherit: function(e, t, n) {
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e, e.prototype.superClass = t.prototype, n = n || {}, Mix.extend(e.prototype, n), t.prototype.constructor === Object.prototype.constructor && (t.prototype.constructor = t)
        },
        equals: function(e, t) {
            if (typeof arguments[0] != typeof arguments[1]) return !1;
            if (arguments[0] instanceof Array) {
                if (arguments[0].length != arguments[1].length) return !1;
                var n = !0;
                for (var r = 0; r < arguments[0].length; ++r) {
                    if (typeof arguments[0][r] != typeof arguments[1][r]) return !1;
                    typeof arguments[0][r] == "number" && typeof arguments[1][r] == "number" ? n = arguments[0][r] === arguments[1][r] : n = arguments.callee(arguments[0][r], arguments[1][r])
                }
                return n
            }
            if (arguments[0] instanceof Object && arguments[1] instanceof Object) {
                var i = !0,
                    s = 0,
                    o = 0;
                for (var u in arguments[0]) {
                    if (typeof arguments[0][u] == "number" || typeof arguments[0][u] == "string") i = arguments[0][u] == arguments[1][u];
                    else if (!arguments.callee(arguments[0][u], arguments[1][u])) return i = !1, i;
                    ++s
                }
                for (u in arguments[1])++o;
                return s != o && (i = !1), i
            }
            return arguments[0] == arguments[1]
        },
        clone: function(e, t) {
            if (typeof e == "object") {
                var r = e instanceof Array ? [] : {};
                for (var i in e) i != t && (r[i] = arguments.callee(e[i], t));
                return r
            }
            return n.call(e) === "[object Function]" ? (new e).constructor : e
        },
        strSub: function(e, t, n, r) {
            var i = /[^\x00-\xff]/g;
            n = n || !1, r = r || "...";
            if (t > 0 && e.replace(i, "mm").length > t) {
                var s = Math.floor(t / 2);
                for (var o = s; o < e.length; o++)
                    if (e.substr(0, o).replace(i, "mm").length >= t) return e.substr(0, o) + (n ? r : "")
            }
            return e
        }
    })
}(this, this.undefined),
function(e) {
    e.namespace("Mix.dom");
    var t = Mix.dom,
        n = function(e) {
            return Object.prototype.toString.call(e) == "[object String]" && (e = document.createTextNode(e)), e
        };
    Mix.extend(Mix.dom, {
        create: function(t, n, r) {
            var i = document.createElement(t);
            return n && typeof n == "object" && e.css.setStyle(i, n), r && typeof r == "object" && e.dom.setAttrs(i, r), i
        },
        prev: function(e) {
            do e = e.previousSibling; while (e && e.nodeType != 1);
            return e
        },
        next: function(e) {
            do e = e.nextSibling; while (e && e.nodeType != 1);
            return e
        },
        firstChild: function(e) {
            return e = e.firstChild, e && e.nodeType != 1 ? t.next(e) : e
        },
        lastChild: function(e) {
            return e = e.lastChild, e && e.nodeType != 1 ? t.prev(e) : e
        },
        getById: function(e) {
            return document.getElementById(e)
        },
        getByTag: function(e, t) {
            var n = (t || document).getElementsByTagName(e || "*") || [],
                r = [];
            for (var i = 0; i < n.length; i++) r.push(n[i]);
            return r
        },
        getByClassName: function(e, n) {
            var r = [],
                i, s = new RegExp("(^|\\s*)" + e + "(\\s*|$)");
            if (document.getElementsByClassName) {
                i = (n || document).getElementsByClassName(e);
                for (var o = 0, u = i.length; o < u; o++) r.push(i.item(o))
            } else {
                i = t.getByTag(null, n);
                for (var o = 0, u = i.length; o < u; o++) s.test(t.attr(i[o], "class")) && r.push(i[o])
            }
            return r
        },
        text: function(e) {
            var e = e.childNodes || e,
                n = "";
            for (var r = 0, i = e.length; r < i; r++) n += e[r].nodeType != 1 ? e[r].nodeValue : t.text(e[r]);
            return n
        },
        html: function(e, t) {
            if (!t) return e.innerHTML;
            e.innerHTML = t
        },
        attr: function(e, t, n) {
            var r = {
                "class": "className",
                "for": "htmlFor"
            };
            return t = r[t] || t, typeof n != "undefined" && (e[t] = n, e.setAttribute && e.setAttribute(t, n)), e[t] || e.getAttribute(t) || ""
        },
        setAttrs: function(t, n) {
            if (n && typeof n == "object") {
                var r = this;
                e.each(n, function(e, n) {
                    r.attr(t, n, e)
                })
            }
        },
        append: function(e, t) {
            e.appendChild(n(t))
        },
        before: function(e, t) {
            var r = t.parentNode;
            r.insertBefore(n(e), t)
        },
        after: function(e, n) {
            n.nextSibling ? t.before(e, n.nextSibling) : append(n.parent, e)
        }
    })
}(Mix),
function(e) {
    e.namespace("Mix.css");
    var t = Mix.css;
    e.extend(t, {
        styleName: function(e) {
            e = e.toLowerCase().split("-");
            var t = e[0];
            for (var n = 1, r = e.length; n < r; n++) t += e[n].replace(/\b(\w)|\s+(\w)/g, function(e) {
                return e.toUpperCase()
            });
            return t
        },
        getStyle: function(e, n) {
            n = n.toLowerCase();
            var r = t.styleName(n),
                i = null;
            return e.style[r] ? i = e.style[r] : e.currentStyle ? i = e.currentStyle[r] : document.defaultView && document.defaultView.getComputedStyle && (i = document.defaultView.getComputedStyle(e, null), i && (i = i.getPropertyValue(n))), i
        },
        setStyle: function() {
            if (arguments.length <= 1) return;
            var e = arguments[0],
                n = arguments[1],
                r = {};
            if (typeof n == "object")
                for (var i in n) r[i] = t.getStyle(e, i), i.toLowerCase() == "opacity" ? t.opacity(e, n[i]) : e.style[t.styleName(i)] = n[i];
            else r[arguments[1]] = t.getStyle(e, arguments[1]), arguments[1].toLowerCase() == "opacity" ? t.opacity(e, arguments[2]) : e.style[t.styleName(arguments[1])] = arguments[2]
        },
        offset: function(e) {
            var t = function(e) {
                return e.offsetParent ? e.offsetLeft + arguments.callee(e.offsetParent) : e.offsetLeft
            }(e),
                n = function(e) {
                    return e.offsetParent ? e.offsetTop + arguments.callee(e.offsetParent) : e.offsetTop
                }(e);
            return {
                left: t,
                top: n
            }
        },
        pos: function(t) {
            var n = t.getBoundingClientRect().left,
                r = t.getBoundingClientRect().top;
            if (e.isIE6 || e.isIE7) n -= 2, r -= 2;
            return {
                left: n,
                top: r
            }
        },
        offsetToParent: function(e) {
            var n, r;
            if (e.parentNode == e.offsetParent) n = e.offsetLeft, r = e.offsetTop;
            else {
                var i = t.offset(e),
                    s = t.offset(e.parentNode);
                n = i.left - s.left, r = i.top - s.top
            }
            return {
                left: n,
                top: r
            }
        },
        height: function() {
            var e = Array.prototype.slice.call(arguments);
            if (e.length < 1) return;
            var n = e[0];
            if (e.length == 1) {
                if (t.getStyle(n, "display") != "none") return n.offsetHeight || parseInt(t.getStyle(n, "height"));
                var r = t.setStyle(n, {
                    display: "",
                    visibility: "hidden",
                    position: "absolute"
                }),
                    i = n.clientHeight || parseInt(t.getStyle(n, "height"));
                return t.setStyle(n, r), i
            }
            var i = "" + e[1];
            i.indexOf("px") == -1 && (i += "px"), t.setStyle(n, "height", i)
        },
        width: function() {
            var e = Array.prototype.slice.call(arguments);
            if (e.length < 1) return;
            var n = e[0];
            if (e.length == 1) {
                if (t.getStyle(n, "display") != "none") return n.offsetWidth || parseInt(t.getStyle(n, "width"));
                var r = t.setStyle(n, {
                    display: "",
                    visibility: "hidden",
                    position: "absolute"
                }),
                    i = n.clientWidth || parseInt(t.getStyle(n, "width"));
                return t.setStyle(n, r), i
            }
            var i = "" + e[1];
            i.indexOf("px") == -1 && (i += "px"), t.setStyle(n, "width", i)
        },
        hide: function(e) {
            var n = t.getStyle(e, "display");
            n != "none" && (e._display = n), t.setStyle(e, "display", "none")
        },
        show: function(e) {
            t.setStyle(e, "display", e._display || "")
        },
        opacity: function(t, n) {
            e.isIE ? t.style.filters = "alpha(opacity=" + n * 100 + ")" : t.style.opacity = n
        },
        winHeight: function() {
            var e = document.documentElement;
            return window.innerHeight || e && e.clientHeight || document.body.clientHeight
        },
        winWidth: function() {
            var e = document.documentElement;
            return window.innerWidth || e && e.clientWidth || document.body.clientWidth
        },
        pageHeight: function() {
            var e;
            return document.documentElement ? e = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) : e = Math.max(document.body.scrollHeight, document.body.clientHeight), e
        },
        pageWidth: function() {
            var e;
            return document.documentElement ? e = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) : e = Math.max(document.body.scrollWidth, document.body.clientWidth), e
        },
        scrollX: function() {
            var e = document.documentElement;
            return window.pageXOffset || e && e.scrollLeft || document.body.scrollLeft
        },
        scrollY: function() {
            var e = document.documentElement;
            return window.pageYOffset || e && e.scrollTop || document.body.scrollTop
        },
        hasClass: function(e, t) {
            var n = e.className;
            return !n || !t ? !1 : n == t ? !0 : n.search(new RegExp("\\b" + t + "\\b")) != -1
        },
        addClass: function(e, t) {
            if (this.hasClass(e, t)) return;
            e.className && (t = " " + t), e.className = e.className + t
        },
        removeClass: function(e, t) {
            e.className && t && (e.className = e.className.replace(new RegExp("\\b" + t + "\\b", "g"), ""))
        }
    })
}(Mix),
function(e) {
    e.namespace("Mix.event");
    var t = Mix.event;
    e.extend(t, {
        addEvent: function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n) : e.attachEvent ? (e["e" + t + n] = n, e[t + n] = function() {
                e["e" + t + n](window.event)
            }, e.attachEvent("on" + t, e[t + n])) : e["on" + t] = n
        },
        removeEvent: function(e, t, n) {
            e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? (e.detachEvent("on" + t, e[t + n]), e[t + n] = null, e["e" + t + n] = null) : e["on" + t] = null
        }
    })
}(Mix), Mix.dom.animate = function(e, t, n, r, i) {
    function f() {
        function n(e, t) {
            var n = {
                init: function() {
                    var n = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
                        r = n.exec(t),
                        i = r[3] || "px",
                        u = parseFloat(r[2]),
                        f = parseFloat(Mix.css.getStyle(s.elem, e)),
                        l = this;
                    r[1] && (u = (r[1] == "+=" ? 1 : -1) * u + f), this.startTime = this.creatTime(), this.end = u, this.now = this.start = f, this.pos = this.state = 0, this.prop = e, this.unit = i, this.skip() && o.push(function() {
                        return l.skip()
                    }) && !a && (a = setInterval(function() {
                        l.tick()
                    }, s.interval))
                },
                tick: function() {
                    var e = o,
                        t;
                    for (var n = 0, r = e.length; n < r; n++) t = e[n], t && !t() && e.splice(n--, 1);
                    e.length || this.stop()
                },
                stop: function() {
                    clearInterval(a), a = null, l()
                },
                skip: function() {
                    var e = this.creatTime(),
                        t;
                    return e > s.duration + this.startTime ? (s.complete && s.complete.call(s.elem), !1) : (t = e - this.startTime, this.state = t / s.duration, this.pos = this.easing[s.easing](this.state, t, 0, 1, s.duration), this.now = (this.end - this.start) * this.pos + this.start, this.update(), !0)
                },
                update: function() {
                    Mix.css.setStyle(s.elem, this.prop, this.now + this.unit)
                },
                creatTime: function() {
                    return (new Date).getTime()
                },
                easing: {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return -Math.cos(e * Math.PI) / 2 + .5
                    },
                    easeInOutBack: function(e, t, n, r, i, s) {
                        return s == undefined && (s = 1.70158), (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
                    },
                    easeOutBounce: function(e, t, n, r, i) {
                        return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
                    }
                }
            };
            n.init()
        }
        for (var e in t) n(e, t[e])
    }

    function l() {
        u.length ? u.shift()() : e.sohuFxProgress = "done"
    }
    var s = {
        elem: e,
        duration: n,
        complete: i,
        easing: r,
        interval: 13
    }, o = [],
        u, a;
    u = e.sohuFx || (e.sohuFx = []), u.push(f), setTimeout(function() {
        e.sohuFxProgress !== "inprogress" && (e.sohuFxProgress = "inprogress", l())
    }, 0)
},
function(e) {
    function u(e, t, n) {
        n && u(e, n);
        if (e && t && typeof t == "object")
            for (var r in t) e[r] = t[r];
        return e
    }

    function a(e, t) {
        if (e && t && typeof t == "object")
            for (var n in t) typeof e[n] == "undefined" && (e[n] = t[n])
    }

    function f() {
        return "ad_flash_" + o++
    }

    function p(e) {
        this.major = parseInt(e[0]) || 0, this.minor = parseInt(e[1]) || 0, this.rev = parseInt(e[2]) || 0
    }
    var t = new MessageBus;
    e.namespace("sohuHD.AD");
    var n = {
        length: 0
    }, r = {
            length: 0
        }, i = {}, s = 0;
    e.extend(sohuHD.AD, {
        allCss: {},
        url: "http://p.aty.sohu.com/p",
        cssUrl: "http://css.tv.itc.cn/global/gg.css",
        setUrl: function(e) {
            this.url = e
        },
        ready: function(e) {
            e && e()
        },
        getUID: function() {
            return ++s
        },
        setCssUrl: function(e) {
            this.cssUrl = e
        },
        registType: function(e, t) {
            if (!t) return;
            n[e] || ++n.length, n[e] = t
        },
        unRegistType: function(e) {
            n[e] && --n.length, delete n[e]
        },
        getType: function(t) {
            var r;
            return e.each(n, function(e, n) {
                if (n != "length" && (new RegExp(n)).test(t)) return r = e, !1
            }), r
        },
        _registAD: function(e, t) {
            r["" + e] || ++r.length, r["" + e] = t
        },
        getAD: function() {
            var t = Array.prototype.slice.call(arguments);
            if (!t.length) return r;
            var n = {
                length: 0
            };
            return e.each(t, function(e) {
                r["" + e] && (n.length++, n["" + e] = r["" + e])
            }), n
        },
        registContentType: function(e, t) {
            i[e] = t
        },
        getContentType: function(e) {
            return i[e]
        },
        cookie: function(e, t, n) {
            if (typeof t == "undefined") {
                var a = (new RegExp("(?:^|; )" + e + "=([^;]*)")).exec(document.cookie);
                return a ? a[1] || "" : ""
            }
            n = n || {}, t === null && (t = "", n.expires = -1);
            var r = "";
            if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
                var i;
                typeof n.expires == "number" ? (i = new Date, i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : i = n.expires, r = "; expires=" + i.toUTCString()
            }
            var s = n.path ? "; path=" + n.path : "",
                o = n.domain ? "; domain=" + n.domain : "",
                u = n.secure ? "; secure" : "";
            document.cookie = [e, "=", t, r, s, o, u].join("")
        },
        getUrl: function() {
            var e = window._ad_control_url || this.url;
            e.indexOf("?") == -1 ? e += "?" : e += "&", e = e + "cat=" + (window.category || "") + "&pos=" + window._sohuHD_page_ads.join("|");
            var t = /.+#(adreview[^#]*)/,
                n = location.href,
                r = t.exec(n);
            r && r.length > 1 && (e += "&review=" + r[1]);
            var i = window.playlistId || "";
            return /[\?&]al=(\d+)/.test(e) || (e = e + "&al=" + i), e = e + "&qd=" + this.cookie("ch_key"), e + "&pageUrl=" + escape(n)
        },
        getCssFile: function(e) {
            var t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = e;
            var n = document.getElementsByTagName("head")[0] || document.documentElement || document.body;
            n.appendChild(t)
        },
        getScript: function(e, t, n, r, i) {
            var s = document.getElementsByTagName("head")[0] || document.documentElement,
                o = document.createElement("script");
            o.src = e, o.charset = n || "GBK", i = i || [];
            var u = !1;
            o.onload = o.onreadystatechange = function() {
                !u && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (u = !0, t && t.apply(this, i), o.onload = o.onreadystatechange = null, r && (o.onerror = r), s && o.parentNode && s.removeChild(o))
            }, s.insertBefore(o, s.firstChild)
        },
        loadCss: function(t) {
            if (!t || !t.length) return;
            var n = this;
            e.each(t, function(e) {
                n.allCss[e] || (n.getCssFile(e), n.allCss[e] = !0)
            })
        },
        init: function() {
            var t = Array.prototype.slice.call(arguments),
                n = this;
            e.each(t, function(e) {
                n.subscribe("" + e, function(e, t) {
                    try {
                        n._initAD(t)
                    } catch (r) {}
                }, null, null, {
                    cache: !0
                })
            })
        },
        _initAD: function(t) {
            t.css && this.loadCss(t.css);
            if (this.getType(t.type) && this.getContentType(t.ctype)) {
                var n = this.getType(t.type),
                    r = this.getContentType(t.ctype);
                e.extend(t, {
                    content: new r
                });
                var i = new n(t);
                this._registAD(i.id, i), i.init()
            }
        },
        publish: function(e, n) {
            t.publish(e, n)
        },
        subscribe: function(e, n, r, i) {
            i = typeof i == "undefined" ? null : i, r = r || {}, t.subscribe(e, n, i, r, {
                cache: !0
            })
        },
        getFlashObject: function() {
            return h
        },
        run: function() {
            if (!window._sohuHD_page_ads || !window._sohuHD_page_ads.length) return;
            var t = this;
            this.getCssFile(this.cssUrl), this.getScript(this.getUrl(), function() {
                var n = window._sohuHD_page_adsContent;
                n && n.length && e.each(n, function(e) {
                    try {
                        t.publish(e.elid, e)
                    } catch (n) {}
                })
            })
        }
    }), sohuHD.AD.on = sohuHD.AD.subscribe, window._sohuHD = window.sohuHD;
    var o = 0,
        l = {
            getRequestParameter: function(e) {
                var t = document.location.search || document.location.href.hash;
                if (t) {
                    var n = t.indexOf(e + "="),
                        r = t.indexOf("&", n) > -1 ? t.indexOf("&", n) : t.length;
                    if (t.length > 1 && n > -1) return t.substring(t.indexOf("=", n) + 1, r)
                }
                return ""
            }
        }, c = {
            getPlayerVersion: function(e, t) {
                var n = new p(0, 0, 0);
                if (navigator.plugins && navigator.mimeTypes.length) {
                    var r = navigator.plugins["Shockwave Flash"];
                    r && r.description && (n = new p(r.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")))
                } else {
                    try {
                        try {
                            var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                        } catch (s) {
                            i = !1
                        }
                        for (var o = 3; i != null; o++) i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + o), n = new p([o, 0, 0])
                    } catch (s) {}
                    if (e && n.major > e.major) return n;
                    if (!e || (e.minor != 0 || e.rev != 0) && n.major == e.major || n.major != 6 || t) try {
                        n = new p(i.GetVariable("$version").split(" ")[1].split(","))
                    } catch (s) {}
                }
                return n
            }
        }, h = function(e) {
            if (!document.createElement || !document.getElementById) return;
            this.DETECT_KEY = window.detectKey ? window.detectKey : "detectflash", this.skipDetect = l.getRequestParameter(this.DETECT_KEY);
            var t = {
                wmode: "transparent",
                quality: "high",
                id: f()
            };
            this.config = e || {}, e.id = undefined, a(this.config, t), e = this.config, this.params = {}, this.variables = {}, this.attributes = {}, this.id = e.id, this.useExpressInstall = !! e.useExpressInstall, e.src && this.setAttribute("swf", e.src), e.id && this.setAttribute("id", e.id), e.width && this.setAttribute("width", e.width), e.height && this.setAttribute("height", e.height), e.version && this.setAttribute("version", new p(e.version.toString().split("."))), this.installedVer = c.getPlayerVersion(this.getAttribute("version"), e.useExpressInstall), e.c && this.addParam("bgcolor", e.c), this.addParam("quality", e.quality), this.addParam("wmode", e.wmode), e.allowscriptaccess && this.addParam("allowscriptaccess", e.allowscriptaccess);
            var n = e.xiRedirectUrl ? e.xiRedirectUrl : window.location;
            this.setAttribute("xiRedirectUrl", n), this.setAttribute("redirectUrl", ""), e.redirectUrl && this.setAttribute("redirectUrl", e.redirectUrl), e.link && this.addVariable("clickthru", escape(e.link))
        };
    h.prototype = {
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
        getAttribute: function(e) {
            return this.attributes[e]
        },
        addParam: function(e, t) {
            this.params[e] = t
        },
        getParams: function() {
            return this.params
        },
        addVariable: function(e, t) {
            this.variables[e] = t
        },
        getVariable: function(e) {
            return this.variables[e]
        },
        getVariables: function() {
            return this.variables
        },
        createParamTag: function(e, t) {
            var n = document.createElement("param");
            return n.setAttribute("name", e), n.setAttribute("value", t), n
        },
        getVariablePairs: function() {
            var e = [],
                t, n = this.getVariables();
            for (t in n) e.push(t + "=" + n[t]);
            return e
        },
        getFlashHTML: function() {
            var e = "";
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                this.getAttribute("doExpressInstall") && this.addVariable("MMplayerType", "PlugIn"), e = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '"', e += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
                var t = this.getParams();
                for (var n in t) e += [n] + '="' + t[n] + '" ';
                var r = this.getVariablePairs().join("&");
                r.length > 0 && (e += 'flashvars="' + r + '"'), e += "/>"
            } else {
                this.getAttribute("doExpressInstall") && this.addVariable("MMplayerType", "ActiveX"), e = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '">', e += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
                var t = this.getParams();
                for (var n in t) e += '<param name="' + n + '" value="' + t[n] + '" />';
                var r = this.getVariablePairs().join("&");
                r.length > 0 && (e += '<param name="flashvars" value="' + r + '" />'), e += "</object>"
            }
            return e
        },
        write: function(e) {
            if (this.useExpressInstall) {
                var t = new p([6, 0, 65]);
                this.installedVer.versionIsValid(t) && !this.installedVer.versionIsValid(this.getAttribute("version")) && (this.setAttribute("doExpressInstall", !0), this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl"))), document.title = document.title.slice(0, 47) + " - Flash Player Installation", this.addVariable("MMdoctitle", document.title))
            } else this.setAttribute("doExpressInstall", !1); if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
                var n = typeof e == "string" ? document.getElementById(e) : e;
                n.innerHTML = this.getFlashHTML()
            } else this.getAttribute("redirectUrl") != "" && document.location.replace(this.getAttribute("redirectUrl"))
        }
    }, u(p.prototype, {
        versionIsValid: function(e) {
            return this.major < e.major ? !1 : this.major > e.major ? !0 : this.minor < e.minor ? !1 : this.minor > e.minor ? !0 : this.rev < e.rev ? !1 : !0
        }
    }), e.namespace("sohuHD.AD.content"), sohuHD.AD.content.BasicContent = function() {}, e.extend(sohuHD.AD.content.BasicContent.prototype, {
        init: function(e) {
            this.type = e, this.config = this.type.config
        },
        addCloseBtn: function() {
            var t = this.config,
                n = this;
            t.closeable && (this.type.closeContainer = e.dom.create("div", null, {
                "class": "close-container"
            }), this.type.closeBtn = e.dom.create("a", null, {
                "class": "close-btn",
                href: "javascript:void(0)",
                title: "\u5173\u95ed"
            }), this.type.closeBtn.innerHTML = "\u5173\u95ed", e.dom.append(this.type.el, this.type.closeContainer), e.dom.append(this.type.closeContainer, this.type.closeBtn), e.event.addEvent(this.type.closeBtn, "click", function(e) {
                return n.type.close(), !1
            }))
        }
    });
    var d = 0,
        v = {};
    e.namespace("sohuHD.AD.type"), sohuHD.AD.type.BasicType = function(t) {
        t = t || {}, this.originalConfig = t, this.config = t, this.id = t.elid, this.el = e.dom.getById(t.elid), this.content = t.content, this.contentEl = this.el, this.className = "", this.initialed = !1, this.autoHideTimer = null
    }, e.extend(sohuHD.AD.type.BasicType.prototype, {
        cookie: sohuHD.AD.cookie,
        isVip: function() {
            var e = /\bfee_status\b=(.*?)(?:$|;)/.exec(document.cookie),
                t = !1;
            return e && e.length && e[1] && (t = !0), t
        },
        selectValue: function() {
            var t = Array.prototype.slice.call(arguments);
            if (t.length < 3) return null;
            var n = t[0],
                r = t.length,
                i = t[t.length - 1];
            return t.pop(), t.shift(), e.each(t, function(e) {
                if (e && typeof e[n] != "undefined") return i = e[n], !1
            }), i
        },
        pingback: function(e) {
            var t = new Image,
                n = "advping_" + d++,
                r = (new Date).getTime();
            v[n] = t, t.onload = t.onerror = t.onabort = function() {
                v[n] = null
            }, e.indexOf("?") > -1 ? t.src = [e, "&_=", r].join("") : t.src = [e, "?_=", r].join("")
        },
        publish: function(e, n) {
            t.publish(e, n)
        },
        subscribe: function(e, n, r, i) {
            i = typeof i == "undefined" ? null : i, r = r || {}, t.subscribe(e, n, i, r, {
                cache: !0
            })
        },
        show: function() {
            this.isClosed() && e.css.show(this.el)
        },
        hide: function() {
            e.css.hide(this.el)
        },
        close: function() {
            clearTimeout(this.autoHideTimer), this.hide(), this.publish(this.id + "_close")
        },
        isClosed: function() {
            return e.css.getStyle(this.el, "display") == "none"
        },
        autoClose: function(e, t) {
            clearTimeout(this.autoHideTimer);
            var n = this;
            e / 1 >= 0 && (this.autoHideTimer = setTimeout(function() {
                n.close(), t && t.call(this)
            }, e * 1e3))
        },
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this.config;
            t.width && e.css.width(this.el, t.width), t.height && e.css.height(this.el, t.height)
        },
        initContent: function() {
            this.content.init(this)
        },
        beforeLayout: e.emptyFn,
        afterLayout: e.emptyFn,
        beforeContent: e.emptyFn,
        afterContent: e.emptyFn,
        beforeInit: e.emptyFn,
        afterInit: e.emptyFn,
        exposurePingback: function() {
            var t = this.config.pingback,
                n = this;
            if (!t) return;
            t = t.split("|"), e.each(t, function(e) {
                n.pingback(e)
            })
        },
        setAutoClose: function() {
            this.config.durationtime && this.autoClose(this.config.durationtime)
        },
        init: function() {
            this.beforeInit(), this.beforeLayout(), this.initLayout(), this.afterLayout(), this.beforeContent(), this.initContent(), this.afterContent(), this.config.effect && typeof this.config.effect == "function" && this.config.effect.call(this), this.setAutoClose(), this.exposurePingback(), this.afterInit(), this.publish(this.id + "_init")
        }
    })
}(Mix),
function(e) {
    sohuHD.AD.content.ImgContent = function() {}, e.inherit(sohuHD.AD.content.ImgContent, sohuHD.AD.content.BasicContent, {
        typeName: "img",
        init: function(e) {
            this.superClass.init.call(this, e);
            var t = this.config,
                n = this;
            t.link ? this.type.contentEl.innerHTML = ['<a target="_blank" style="display:block;" href="', t.link, '" title="', t.title, '">', '<img border="0" src="', t.src, '"', t.width ? ' width="' + t.width + '"' : "", t.height ? ' height="' + t.height + '"' : "", ' alt="', t.title, '" /></a>'].join("") : this.type.contentEl.innerHTML = ['<img border="0" src="', t.src, '"', t.width ? ' width="' + t.width + '"' : "", t.height ? ' height="' + t.height + '"' : "", ' alt="', t.title, '" />'].join(""), t.closeable && this.addCloseBtn(), t.src || this.type.hide()
        }
    }), sohuHD.AD.content.FlashContent = function() {}, e.inherit(sohuHD.AD.content.FlashContent, sohuHD.AD.content.BasicContent, {
        typeName: "flash",
        init: function(t) {
            this.superClass.init.call(this, t);
            var n = this.type.config,
                r = this;
            e.extend(n, {
                version: "7"
            });
            var i = sohuHD.AD.getFlashObject(),
                s = new i(n);
            s.write(this.type.contentEl), n.closeable && this.addCloseBtn()
        }
    }), sohuHD.AD.content.CodeContent = function() {}, e.inherit(sohuHD.AD.content.CodeContent, sohuHD.AD.content.BasicContent, {
        typeName: "code",
        init: function(t) {
            this.superClass.init.call(this, t);
            var n = this.config;
            this.type.iframe = e.dom.create("iframe", null, {
                scrolling: "no",
                frameBorder: 0,
                border: 0
            }), n.width && (this.type.iframe.width = n.width), n.height && (this.type.iframe.height = n.height);
            var r = n.src.indexOf("?") == -1 ? "?ref=" : "&ref=",
                i = n.src + r + escape(window.location.href);
            n.clickpingback && (i = i + "&clickping=" + escape(n.clickpingback)), this.type.iframe.src = i, e.dom.append(this.type.contentEl, this.type.iframe), n.closeable && this.addCloseBtn()
        }
    }), sohuHD.AD.content.TextContent = function() {}, e.inherit(sohuHD.AD.content.TextContent, sohuHD.AD.content.BasicContent, {
        typeName: "text",
        init: function(t) {
            this.superClass.init.call(this, t);
            var n = this.config;
            this.type.link = e.dom.create("a", null, {
                target: "_blank",
                href: n.link,
                title: n.title
            }), this.type.link.innerHTML = n.length ? e.strSub(n.title, n.length) : n.title, n.width && (this.type.link.width = n.width), n.height && (this.type.link.height = n.height), e.dom.append(this.type.contentEl, this.type.link), n.closeable && this.addCloseBtn(), n.display === !1 && e.css.setStyle(this.type.link, "display", "none")
        }
    }), sohuHD.AD.registContentType("img", sohuHD.AD.content.ImgContent), sohuHD.AD.registContentType("flash", sohuHD.AD.content.FlashContent), sohuHD.AD.registContentType("code", sohuHD.AD.content.CodeContent), sohuHD.AD.registContentType("text", sohuHD.AD.content.TextContent)
}(Mix),
function(e) {
    sohuHD.AD.type.CrossPage = function(e) {
        this.superClass.constructor.call(this, e), this.className = "crossPage"
    }, e.inherit(sohuHD.AD.type.CrossPage, sohuHD.AD.type.BasicType, {
        typeName: "cp"
    }), sohuHD.AD.type.Rectangle = function(e) {
        this.superClass.constructor.call(this, e), this.className = "rectangle"
    }, e.inherit(sohuHD.AD.type.Rectangle, sohuHD.AD.type.BasicType, {
        typeName: "rec"
    }), sohuHD.AD.type.RectangleExpand = function(e) {
        this.superClass.constructor.call(this, e), this.className = "rectangleExtend"
    }, e.inherit(sohuHD.AD.type.RectangleExpand, sohuHD.AD.type.BasicType, {
        typeName: "rece",
        initContent: e.emptyFn,
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this.config,
                n = window._AD_opt ? window._AD_opt.rectangleExtend : null;
            t.sheight = this.selectValue("sheight", t, n, 60), t.bheight = this.selectValue("bheight", t, n, 210), t.width = this.selectValue("width", t, n, 260), e.css.height(this.el, t.sheight);
            var r = e.dom.create("div");
            e.dom.appendChild(this.el, r), e.css.hide(r), t.height = t.bheight, t.src = t.bsrc, this.contentEl = r, this.content.init(this);
            var i = e.dom.create("div");
            e.dom.appendChild(this.el, r), t.height = t.sheight, t.src = t.ssrc, this.contentEl = r, this.content.init(this);
            var s = this;
            e.event.addEvent(this.el, "mouseover", function() {
                e.css.height(s.el, s.config.bheight), e.css.show(r), e.css.hide(i)
            }), e.event.addEvent(this.el, "mouseout", function() {
                e.css.height(s.el, s.config.sheight), e.css.show(i), e.css.hide(r)
            })
        }
    }), sohuHD.AD.type.FullScreen = function(e) {
        this.superClass.constructor.call(this, e), this.className = "fullscreen"
    }, e.inherit(sohuHD.AD.type.FullScreen, sohuHD.AD.type.BasicType, {
        typeName: "fs",
        initContent: e.emptyFn,
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this,
                n = this.config,
                r = window._AD_opt ? window._AD_opt.fullscreen : null,
                i = function(t) {
                    var r = (e.css.pageWidth() - n.width) / 2;
                    e.css.setStyle(t, "left", r + "px")
                };
            this.cookieName = "adfullscreen" + this.id;
            var s = this.cookie(this.cookieName);
            s = s ? s / 1 : 0;
            var o = this.selectValue("showtimes", n, r, 4);
            if (s >= o) {
                this.publish("" + this.id + "_overtime"), this.close();
                return
            }
            var u = this.selectValue("durationtime ", n, r, 8),
                a = this.selectValue("top", n, r, 150);
            e.css.setStyle(this.el, {
                top: a + "px"
            }), typeof n.opacity != "undefined" && e.css.opacity(this.el, n.opacity), n.width && e.css.width(this.el, n.width), n.height && e.css.height(this.el, n.height), i(this.el);
            var f = this.selectValue("fixed", n, r, !1);
            f ? e.isIE & e.isIE6 ? (e.css.setStyle(this.el, {
                position: "absolute"
            }), e.event.addEvent(window, "scroll", function() {
                e.css.setStyle(t.el, "top", a + e.css.scrollY() + "px")
            })) : e.css.setStyle(this.el, {
                position: "fixed"
            }) : e.css.setStyle(this.el, {
                position: "absolute"
            }), e.event.addEvent(window, "resize", function() {
                i(t.el)
            });
            var l = function() {
                var e = t.cookie(t.cookieName);
                e = e ? e / 1 : 0, t.cookie(t.cookieName, ++e)
            }, c = function() {
                    l(), t.close()
                };
            window._fullscreenCloseHook = c, this.autoClose(u / 1 * 1e3, function() {
                l()
            }), this.content.init(this)
        }
    }), sohuHD.AD.type.VideoLeft = function(t) {
        this.superClass.constructor.call(this, t), this.className = "video-couplet video-couplet-left", this.contentEl = e.dom.create("div", null, {
            "class": "content"
        }), e.dom.append(this.el, this.contentEl)
    }, e.inherit(sohuHD.AD.type.VideoLeft, sohuHD.AD.type.BasicType, {
        typeName: "vcl",
        setAutoClose: function() {
            this.autoClose(60)
        },
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this.config;
            "" + t.width && e.css.width(this.contentEl, t.width), "" + t.height && e.css.height(this.contentEl, t.height)
        },
        afterLayout: function() {
            e.css.setStyle(this.el, "left", this.config.width * -1 + "px"), (!window.isWideMod || this.isVip()) && this.hide(), window.messagebus && messagebus.subscribe("player.normal", function() {
                this.isClosed() || this.close()
            }, this)
        }
    }), sohuHD.AD.type.VideoRight = function(t) {
        this.superClass.constructor.call(this, t), this.className = "video-couplet video-couplet-right", this.contentEl = e.dom.create("div", null, {
            "class": "content"
        }), e.dom.append(this.el, this.contentEl)
    }, e.inherit(sohuHD.AD.type.VideoRight, sohuHD.AD.type.BasicType, {
        typeName: "vcr",
        setAutoClose: function() {
            this.autoClose(60)
        },
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this.config;
            "" + t.width && e.css.width(this.contentEl, t.width), "" + t.height && e.css.height(this.contentEl, t.height)
        },
        afterLayout: function() {
            e.css.setStyle(this.el, "right", this.config.width * -1 + "px"), (!window.isWideMod || this.isVip()) && this.hide(), window.messagebus && messagebus.subscribe("player.normal", function() {
                this.isClosed() || this.close()
            }, this)
        }
    }), sohuHD.AD.type.FocusExpand = function(e) {
        this.superClass.constructor.call(this, e), this.className = "focusExpand"
    }, e.inherit(sohuHD.AD.type.FocusExpand, sohuHD.AD.type.BasicType, {
        typeName: "fe",
        initContent: e.emptyFn,
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this,
                n = this.config,
                r = window._AD_opt ? window._AD_opt.focusExpand : null,
                i = this.selectValue("hideTypeWidth", n, r, 980),
                s = this.selectValue("hideTypeHeigth", n, r, 60);
            e.css.setStyle(this.el, {
                width: i + "px",
                position: "relative"
            });
            var o = e.dom.create("div", {
                display: "none",
                height: s + "px",
                width: i + "px"
            }),
                u = this.selectValue("mainTypeWidth", n, r, 260),
                a = this.selectValue("mainTypeHeight", n, r, 110),
                f = this.selectValue("top", n, r, -140),
                l = this.selectValue("left", n, r, 520),
                c = e.dom.create("div", {
                    height: a + "px",
                    width: u + "px",
                    position: "absolute",
                    left: l + "px",
                    top: f + "px",
                    "z-index": 999999
                });
            n.ctype = n.mainType, n.src = n.mainTypeSrc, n.link = n.mainTypeLink, n.width = u, n.height = a, this.content.init(this), n.ctype = n.hideType, n.src = n.hideTypeSrc, n.link = n.hideTypeLink, n.width = i, n.height = s, this.content.init(this), e.dom.append(this.el, o), e.dom.append(this.el, c), e.event.addEvent(c, "mouseover", function() {
                e.css.show(o)
            }), e.event.addEvent(c, "mouseout", function() {
                e.css.hide(o)
            })
        }
    }), sohuHD.AD.type.PageLeft = function(e) {
        this.superClass.constructor.call(this, e), this.className = "page-couplet-left page-couplet"
    }, e.inherit(sohuHD.AD.type.PageLeft, sohuHD.AD.type.BasicType, {
        typeName: "pcl",
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this,
                n = this.config,
                r = this.el,
                i = function(t) {
                    var n = 0;
                    e.css.setStyle(t, "left", n + e.css.scrollX() + "px")
                }, s = window._AD_opt ? window._AD_opt.pageCoupletLeft : null;
            e.css.setStyle(r, "top", n.top + "px"), i(r), e.event.addEvent(window, "resize", function() {
                i(r)
            }), e.event.addEvent(window, "scroll", function() {
                i(r)
            })
        },
        exposurePingback: function() {}
    }), sohuHD.AD.type.PageRight = function(e) {
        this.superClass.constructor.call(this, e), this.className = "page-couplet-right page-couplet"
    }, e.inherit(sohuHD.AD.type.PageRight, sohuHD.AD.type.BasicType, {
        typeName: "pcr",
        initLayout: function() {
            e.css.addClass(this.el, this.className);
            var t = this,
                n = this.config,
                r = this.el,
                i = document.compatMode == "CSS1Compat" ? document.documentElement : document.body,
                s = function(t) {
                    var r = 980;
                    window._AD_opt && window._AD_opt.couplet_door_width && (r = window._AD_opt.couplet_door_width);
                    var s = n.width,
                        o = i.clientWidth,
                        u = (o - r) / 2,
                        a;
                    u = u > 0 ? u : 0, a = o - s, a += i.scrollLeft, a = Math.ceil(Math.max(a, 260)), e.css.setStyle(t, "left", a + "px")
                }, o = window._AD_opt ? window._AD_opt.pageCoupletRight : null;
            e.css.setStyle(r, "top", n.top + "px"), s(r), e.event.addEvent(window, "resize", function() {
                s(r)
            }), e.event.addEvent(window, "scroll", function() {
                s(r)
            })
        },
        exposurePingback: function() {}
    }), sohuHD.AD.type.PageCouple = function(e) {
        this.superClass.constructor.call(this, e), this.className = "page-couplet"
    }, e.inherit(sohuHD.AD.type.PageCouple, sohuHD.AD.type.BasicType, {
        typeName: "pc",
        initContent: e.emptyFn,
        initLayout: function() {
            var t = sohuHD.AD,
                n = "pc-" + t.getUID(),
                r = "pc-" + t.getUID(),
                i = e.dom.create("div", null, {
                    id: n
                }),
                s = e.dom.create("div", null, {
                    id: r
                });
            e.dom.append(this.el, i), e.dom.append(this.el, s);
            var o = this.config,
                u = this,
                a = t.getContentType(o.ctype);
            o.elid = n, o.content = new a;
            var f = new sohuHD.AD.type.PageLeft(o);
            f.init(), o.elid = r, o.content = new a;
            var l = new sohuHD.AD.type.PageRight(o);
            l.init(), o.closeCascade !== !1 && (this.subscribe("" + n + "_close", function() {
                u.close()
            }), this.subscribe("" + r + "_close", function() {
                u.close()
            }))
        }
    }), sohuHD.AD.type.TextField = function(e) {
        this.superClass.constructor.call(this, e), this.className = "tf"
    }, e.inherit(sohuHD.AD.type.TextField, sohuHD.AD.type.BasicType, {
        typeName: "tf"
    }), sohuHD.AD.registType("cp", sohuHD.AD.type.CrossPage), sohuHD.AD.registType("rec", sohuHD.AD.type.Rectangle), sohuHD.AD.registType("rece", sohuHD.AD.type.RectangleExpand), sohuHD.AD.registType("fs", sohuHD.AD.type.FullScreen), sohuHD.AD.registType("vcl", sohuHD.AD.type.VideoLeft), sohuHD.AD.registType("vcr", sohuHD.AD.type.VideoRight), sohuHD.AD.registType("fe", sohuHD.AD.type.FocusExpand), sohuHD.AD.registType("pcl", sohuHD.AD.type.PageLeft), sohuHD.AD.registType("pcr", sohuHD.AD.type.PageRight), sohuHD.AD.registType("pc", sohuHD.AD.type.PageCouple), sohuHD.AD.registType("tf", sohuHD.AD.type.TextField)
}(Mix),
function(e) {
    sohuHD.AD.type.ExType = function(e) {
        this.superClass.constructor.call(this, e), this.className = "ex-type"
    }, e.inherit(sohuHD.AD.type.ExType, sohuHD.AD.type.BasicType, {
        initContent: e.emptyFn,
        initLayout: e.emptyFn
    }), sohuHD.AD.registType("^ex_.*", sohuHD.AD.type.ExType)
}(Mix), _sohuHD.AD.openBroswer = function(e) {
    if (sohuHD.OpenIfoxBroswer) {
        sohuHD.OpenIfoxBroswer(e);
        return
    }
    var t = '\\WholeNetPlay={"live":1, "url":"' + e + '","vtype":4}';
    try {
        var n = new ActiveXObject("SoHuVA.SoHuDector.1");
        n.RunSohuPlayer(t)
    } catch (r) {
        try {
            window.external.RunSohuPlayer(t)
        } catch (r) {}
    }
},
function() {
    var e = /\bfee_status\b=(.*?)(?:$|;)/.exec(document.cookie),
        t = !1;
    e && e.length && e[1] && (t = !0), (!window.nid && !window._videoInfo || !t) && sohuHD.AD.run()
}()