/* w2ui 1.5.x (nightly) (c) http://w2ui.com, vitmalina@gmail.com */
/* edited by mirza ramadhany 
	add : 
	show.selectColumn_All [variable show grid] 02 18 2015
*/
var w2ui = w2ui || {};
var w2obj = w2obj || {};
var w2utils = function () {
	function n(e) {
		var t = /^[-+]?[0-9]+$/;
		return t.test(e)
	}
	function r(e) {
		if (typeof e == "string") e = e.replace(w2utils.settings.decimalSymbol, ".");
		return (typeof e === "number" || typeof e === "string" && e !== "") && !isNaN(Number(e))
	}
	function i(e) {
		var t = w2utils.settings;
		var n = new RegExp("^" + (t.currencyPrefix ? "\\" + t.currencyPrefix + "?" : "") + "[-+]?[0-9]*[\\" + t.decimalSymbol + "]?[0-9]+" + (t.currencySuffix ? "\\" + t.currencySuffix + "?" : "") + "$", "i");
		if (typeof e === "string") {
			e = e.replace(new RegExp(t.groupSymbol, "g"), "")
		}
		if (typeof e === "object" || e === "") return false;
		return n.test(e)
	}
	function s(e) {
		var t = /^[a-fA-F0-9]+$/;
		return t.test(e)
	}
	function o(e) {
		var t = /^[a-zA-Z0-9_-]+$/;
		return t.test(e)
	}
	function u(e) {
		var t = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return t.test(e)
	}
	function a(e, t, r) {
		if (!e) return false;
		var i = "Invalid Date";
		var s, o, u;
		if (t == null) t = w2utils.settings.date_format;
		if (typeof e.getUTCFullYear === "function" && typeof e.getUTCMonth === "function" && typeof e.getUTCDate === "function") {
			u = e.getUTCFullYear();
			s = e.getUTCMonth();
			o = e.getUTCDate()
		} else if (typeof e.getFullYear === "function" && typeof e.getMonth === "function" && typeof e.getDate === "function") {
			u = e.getFullYear();
			s = e.getMonth();
			o = e.getDate()
		} else {
			e = String(e);
			if ((new RegExp("mon", "ig")).test(t)) {
				t = t.replace(/month/ig, "m").replace(/mon/ig, "m").replace(/dd/ig, "d").replace(/[, ]/ig, "/").replace(/\/\//g, "/").toLowerCase();
				e = e.replace(/[, ]/ig, "/").replace(/\/\//g, "/").toLowerCase();
				for (var a = 0, f = w2utils.settings.fullmonths.length; a < f; a++) {
					var l = w2utils.settings.fullmonths[a];
					e = e.replace(new RegExp(l, "ig"), parseInt(a) + 1).replace(new RegExp(l.substr(0, 3), "ig"), parseInt(a) + 1)
				}
			}
			var c = e.replace(/-/g, "/").replace(/\./g, "/").toLowerCase().split("/");
			var h = t.replace(/-/g, "/").replace(/\./g, "/").toLowerCase();
			if (h === "mm/dd/yyyy") {
				s = c[0];
				o = c[1];
				u = c[2]
			}
			if (h === "m/d/yyyy") {
				s = c[0];
				o = c[1];
				u = c[2]
			}
			if (h === "dd/mm/yyyy") {
				s = c[1];
				o = c[0];
				u = c[2]
			}
			if (h === "d/m/yyyy") {
				s = c[1];
				o = c[0];
				u = c[2]
			}
			if (h === "yyyy/dd/mm") {
				s = c[2];
				o = c[1];
				u = c[0]
			}
			if (h === "yyyy/d/m") {
				s = c[2];
				o = c[1];
				u = c[0]
			}
			if (h === "yyyy/mm/dd") {
				s = c[1];
				o = c[2];
				u = c[0]
			}
			if (h === "yyyy/m/d") {
				s = c[1];
				o = c[2];
				u = c[0]
			}
			if (h === "mm/dd/yy") {
				s = c[0];
				o = c[1];
				u = c[2]
			}
			if (h === "m/d/yy") {
				s = c[0];
				o = c[1];
				u = parseInt(c[2]) + 1900
			}
			if (h === "dd/mm/yy") {
				s = c[1];
				o = c[0];
				u = parseInt(c[2]) + 1900
			}
			if (h === "d/m/yy") {
				s = c[1];
				o = c[0];
				u = parseInt(c[2]) + 1900
			}
			if (h === "yy/dd/mm") {
				s = c[2];
				o = c[1];
				u = parseInt(c[0]) + 1900
			}
			if (h === "yy/d/m") {
				s = c[2];
				o = c[1];
				u = parseInt(c[0]) + 1900
			}
			if (h === "yy/mm/dd") {
				s = c[1];
				o = c[2];
				u = parseInt(c[0]) + 1900
			}
			if (h === "yy/m/d") {
				s = c[1];
				o = c[2];
				u = parseInt(c[0]) + 1900
			}
		}
		if (!n(u)) return false;
		if (!n(s)) return false;
		if (!n(o)) return false;
		u = +u;
		s = +s;
		o = +o;
		i = new Date(u, s - 1, o);
		if (s == null) return false;
		if (String(i) == "Invalid Date") return false;
		if (i.getMonth() + 1 !== s || i.getDate() !== o || i.getFullYear() !== u) return false;
		if (r === true) return i;
		else return true
	}
	function f(e, t) {
		if (e == null) return false;
		var n, r;
		e = String(e);
		e = e.toUpperCase();
		r = e.indexOf("PM") >= 0;
		var i = r || e.indexOf("AM") >= 0;
		if (i) n = 12;
		else n = 24;
		e = e.replace("AM", "").replace("PM", "");
		e = $.trim(e);
		var s = e.split(":");
		var o = parseInt(s[0] || 0),
			u = parseInt(s[1] || 0);
		if ((!i || s.length !== 1) && s.length !== 2) {
			return false
		}
		if (s[0] === "" || o < 0 || o > n || !this.isInt(s[0]) || s[0].length > 2) {
			return false
		}
		if (s.length === 2 && (s[1] === "" || u < 0 || u > 59 || !this.isInt(s[1]) || s[1].length !== 2)) {
			return false
		}
		if (!i && n === o && u !== 0) {
			return false
		}
		if (i && s.length === 1 && o === 0) {
			return false
		}
		if (t === true) {
			if (r) o += 12;
			return {
				hours: o,
				minutes: u
			}
		}
		return true
	}
	function l(e) {
		if (e === "" || e == null || typeof e == "object" && !e.getMonth) return "";
		var t = new Date(e);
		if (w2utils.isInt(e)) t = new Date(Number(e));
		if (String(t) == "Invalid Date") return "";
		var n = new Date;
		var r = (n.getTime() - t.getTime()) / 1e3;
		var i = "";
		var s = "";
		if (r < 0) {
			i = '<span style="color: #aaa">0 sec</span>';
			s = ""
		} else if (r < 60) {
			i = Math.floor(r);
			s = "sec";
			if (r < 0) {
				i = 0;
				s = "sec"
			}
		} else if (r < 60 * 60) {
			i = Math.floor(r / 60);
			s = "min"
		} else if (r < 24 * 60 * 60) {
			i = Math.floor(r / 60 / 60);
			s = "hour"
		} else if (r < 30 * 24 * 60 * 60) {
			i = Math.floor(r / 24 / 60 / 60);
			s = "day"
		} else if (r < 365 * 24 * 60 * 60) {
			i = Math.floor(r / 30 / 24 / 60 / 60 * 10) / 10;
			s = "month"
		} else if (r < 365 * 4 * 24 * 60 * 60) {
			i = Math.floor(r / 365 / 24 / 60 / 60 * 10) / 10;
			s = "year"
		} else if (r >= 365 * 4 * 24 * 60 * 60) {
			i = Math.floor(r / 365.25 / 24 / 60 / 60 * 10) / 10;
			s = "year"
		}
		return i + " " + s + (i > 1 ? "s" : "")
	}
	function c(e) {
		if (e === "" || e == null || typeof e == "object" && !e.getMonth) return "";
		var t = new Date(e);
		if (w2utils.isInt(e)) t = new Date(Number(e));
		if (String(t) == "Invalid Date") return "";
		var n = w2utils.settings.shortmonths;
		var r = new Date;
		var i = new Date;
		i.setTime(i.getTime() - 864e5);
		var s = n[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
		var o = n[r.getMonth()] + " " + r.getDate() + ", " + r.getFullYear();
		var u = n[i.getMonth()] + " " + i.getDate() + ", " + i.getFullYear();
		var a = t.getHours() - (t.getHours() > 12 ? 12 : 0) + ":" + (t.getMinutes() < 10 ? "0" : "") + t.getMinutes() + " " + (t.getHours() >= 12 ? "pm" : "am");
		var f = t.getHours() - (t.getHours() > 12 ? 12 : 0) + ":" + (t.getMinutes() < 10 ? "0" : "") + t.getMinutes() + ":" + (t.getSeconds() < 10 ? "0" : "") + t.getSeconds() + " " + (t.getHours() >= 12 ? "pm" : "am");
		var l = s;
		if (s === o) l = a;
		if (s === u) l = w2utils.lang("Yesterday");
		return '<span title="' + s + " " + f + '">' + l + "</span>"
	}
	function h(e) {
		if (!w2utils.isFloat(e) || e === "") return "";
		e = parseFloat(e);
		if (e === 0) return 0;
		var t = ["Bt", "KB", "MB", "GB", "TB"];
		var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
		return (Math.floor(e / Math.pow(1024, n) * 10) / 10).toFixed(n === 0 ? 0 : 1) + " " + t[n]
	}
	function p(t, n, r) {
		var i = "";
		if (n == null) n = w2utils.settings.groupSymbol || ",";
		if (r == null) r = w2utils.settings.decimalSymbol || ".";
		if (w2utils.isFloat(t) || w2utils.isInt(t) || w2utils.isMoney(t)) {
			e = String(t).split(".");
			i = String(e[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n);
			if (e[1] != null) i += r + e[1]
		}
		return i
	}
	function d(e, t) {
		if (!t) t = this.settings.date_format;
		if (e === "" || e == null || typeof e == "object" && !e.getMonth) return "";
		var n = new Date(e);
		if (w2utils.isInt(e)) n = new Date(Number(e));
		if (String(n) == "Invalid Date") return "";
		var r = n.getFullYear();
		var i = n.getMonth();
		var s = n.getDate();
		return t.toLowerCase().replace("month", w2utils.settings.fullmonths[i]).replace("mon", w2utils.settings.shortmonths[i]).replace(/yyyy/g, r).replace(/yyy/g, r).replace(/yy/g, r > 2e3 ? 100 + parseInt(String(r).substr(2)) : String(r).substr(2)).replace(/(^|[^a-z$])y/g, "$1" + r).replace(/mm/g, (i + 1 < 10 ? "0" : "") + (i + 1)).replace(/dd/g, (s < 10 ? "0" : "") + s).replace(/th/g, s == 1 ? "st" : "th").replace(/th/g, s == 2 ? "nd" : "th").replace(/th/g, s == 3 ? "rd" : "th").replace(/(^|[^a-z$])m/g, "$1" + (i + 1)).replace(/(^|[^a-z$])d/g, "$1" + s)
	}
	function v(e, t) {
		var n = w2utils.settings.shortmonths;
		var r = w2utils.settings.fullmonths;
		if (!t) t = this.settings.time_format;
		if (e === "" || e == null || typeof e == "object" && !e.getMonth) return "";
		var i = new Date(e);
		if (w2utils.isInt(e)) i = new Date(Number(e));
		if (w2utils.isTime(e)) {
			var s = w2utils.isTime(e, true);
			i = new Date;
			i.setHours(s.hours);
			i.setMinutes(s.minutes)
		}
		if (String(i) == "Invalid Date") return "";
		var o = "am";
		var u = i.getHours();
		var a = i.getHours();
		var f = i.getMinutes();
		var l = i.getSeconds();
		if (f < 10) f = "0" + f;
		if (l < 10) l = "0" + l;
		if (t.indexOf("am") !== -1 || t.indexOf("pm") !== -1) {
			if (u >= 12) o = "pm";
			if (u > 12) u = u - 12
		}
		return t.toLowerCase().replace("am", o).replace("pm", o).replace("hhh", u < 10 ? "0" + u : u).replace("hh24", a < 10 ? "0" + a : a).replace("h24", a).replace("hh", u).replace("mm", f).replace("mi", f).replace("ss", l).replace(/(^|[^a-z$])h/g, "$1" + u).replace(/(^|[^a-z$])m/g, "$1" + f).replace(/(^|[^a-z$])s/g, "$1" + l)
	}
	function m(e, t) {
		var n;
		if (e === "" || e == null || typeof e == "object" && !e.getMonth) return "";
		if (typeof t !== "string") {
			n = [this.settings.date_format, this.settings.time_format]
		} else {
			n = t.split("|")
		}
		return this.formatDate(e, n[0]) + " " + this.formatTime(e, n[1])
	}
	function g(e) {
		if (e === null) return e;
		switch (typeof e) {
		case "number":
			break;
		case "string":
			e = $.trim(String(e).replace(/(<([^>]+)>)/ig, ""));
			break;
		case "object":
			for (var t in e) e[t] = this.stripTags(e[t]);
			break
		}
		return e
	}
	function y(e) {
		if (e === null) return e;
		switch (typeof e) {
		case "number":
			break;
		case "string":
			e = String(e).replace(/&/g, "&").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
			break;
		case "object":
			for (var t in e) e[t] = this.encodeTags(e[t]);
			break
		}
		return e
	}
	function b(e) {
		if (e === "" || e == null) return "";
		return String(e).replace(/([;&,\.\+\*\~'`:"\!\^#$%@\[\]\(\)=<>\|\/? {}\\])/g, "\\$1")
	}
	function w(e) {
		function c(e) {
			e = String(e).replace(/\r\n/g, "\n");
			var t = "";
			for (var n = 0; n < e.length; n++) {
				var r = e.charCodeAt(n);
				if (r < 128) {
					t += String.fromCharCode(r)
				} else if (r > 127 && r < 2048) {
					t += String.fromCharCode(r >> 6 | 192);
					t += String.fromCharCode(r & 63 | 128)
				} else {
					t += String.fromCharCode(r >> 12 | 224);
					t += String.fromCharCode(r >> 6 & 63 | 128);
					t += String.fromCharCode(r & 63 | 128)
				}
			}
			return t
		}
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		var l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		e = c(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN(r)) {
				u = a = 64
			} else if (isNaN(i)) {
				a = 64
			}
			t = t + l.charAt(s) + l.charAt(o) + l.charAt(u) + l.charAt(a)
		}
		return t
	}
	function E(e) {
		function c(e) {
			var t = "";
			var n = 0;
			var r = 0,
				i, s;
			while (n < e.length) {
				r = e.charCodeAt(n);
				if (r < 128) {
					t += String.fromCharCode(r);
					n++
				} else if (r > 191 && r < 224) {
					i = e.charCodeAt(n + 1);
					t += String.fromCharCode((r & 31) << 6 | i & 63);
					n += 2
				} else {
					i = e.charCodeAt(n + 1);
					s = e.charCodeAt(n + 2);
					t += String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | s & 63);
					n += 3
				}
			}
			return t
		}
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		var l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (f < e.length) {
			s = l.indexOf(e.charAt(f++));
			o = l.indexOf(e.charAt(f++));
			u = l.indexOf(e.charAt(f++));
			a = l.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if (u !== 64) {
				t = t + String.fromCharCode(r)
			}
			if (a !== 64) {
				t = t + String.fromCharCode(i)
			}
		}
		t = c(t);
		return t
	}
	function S(e, t, n, r) {
		function u(e, t, n) {
			var r = !! window.webkitURL;
			if (!r && typeof n !== "undefined") t = n;
			return ";" + e + ": " + t + "; -webkit-" + e + ": " + t + "; -moz-" + e + ": " + t + "; " + "-ms-" + e + ": " + t + "; -o-" + e + ": " + t + ";"
		}
		var i = $(e).width();
		var s = $(e).height();
		var o = .5;
		if (!e || !t) {
			console.log("ERROR: Cannot do transition when one of the divs is null");
			return
		}
		e.parentNode.style.cssText += u("perspective", "700px") + "; overflow: hidden;";
		e.style.cssText += "; position: absolute; z-index: 1019; " + u("backface-visibility", "hidden");
		t.style.cssText += "; position: absolute; z-index: 1020; " + u("backface-visibility", "hidden");
		switch (n) {
		case "slide-left":
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(" + i + "px, 0, 0)", "translate(" + i + "px, 0)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + ";" + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
				e.style.cssText += u("transition", o + "s") + ";" + u("transform", "translate3d(-" + i + "px, 0, 0)", "translate(-" + i + "px, 0)")
			}, 1);
			break;
		case "slide-right":
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(-" + i + "px, 0, 0)", "translate(-" + i + "px, 0)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(0px, 0, 0)", "translate(0px, 0)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(" + i + "px, 0, 0)", "translate(" + i + "px, 0)")
			}, 1);
			break;
		case "slide-down":
			e.style.cssText += "overflow: hidden; z-index: 1; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; z-index: 0; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(0, " + s + "px, 0)", "translate(0, " + s + "px)")
			}, 1);
			break;
		case "slide-up":
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, " + s + "px, 0)", "translate(0, " + s + "px)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)")
			}, 1);
			break;
		case "flip-left":
			e.style.cssText += "overflow: hidden; " + u("transform", "rotateY(0deg)");
			t.style.cssText += "overflow: hidden; " + u("transform", "rotateY(-180deg)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateY(0deg)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateY(180deg)")
			}, 1);
			break;
		case "flip-right":
			e.style.cssText += "overflow: hidden; " + u("transform", "rotateY(0deg)");
			t.style.cssText += "overflow: hidden; " + u("transform", "rotateY(180deg)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateY(0deg)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateY(-180deg)")
			}, 1);
			break;
		case "flip-down":
			e.style.cssText += "overflow: hidden; " + u("transform", "rotateX(0deg)");
			t.style.cssText += "overflow: hidden; " + u("transform", "rotateX(180deg)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateX(0deg)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateX(-180deg)")
			}, 1);
			break;
		case "flip-up":
			e.style.cssText += "overflow: hidden; " + u("transform", "rotateX(0deg)");
			t.style.cssText += "overflow: hidden; " + u("transform", "rotateX(-180deg)");
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateX(0deg)");
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "rotateX(180deg)")
			}, 1);
			break;
		case "pop-in":
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)") + "; " + u("transform", "scale(.8)") + "; opacity: 0;";
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; " + u("transform", "scale(1)") + "; opacity: 1;";
				e.style.cssText += u("transition", o + "s") + ";"
			}, 1);
			break;
		case "pop-out":
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)") + "; " + u("transform", "scale(1)") + "; opacity: 1;";
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)") + "; opacity: 0;";
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; opacity: 1;";
				e.style.cssText += u("transition", o + "s") + "; " + u("transform", "scale(1.7)") + "; opacity: 0;"
			}, 1);
			break;
		default:
			e.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)");
			t.style.cssText += "overflow: hidden; " + u("transform", "translate3d(0, 0, 0)", "translate(0, 0)") + "; opacity: 0;";
			$(t).show();
			window.setTimeout(function () {
				t.style.cssText += u("transition", o + "s") + "; opacity: 1;";
				e.style.cssText += u("transition", o + "s")
			}, 1);
			break
		}
		setTimeout(function () {
			if (n === "slide-down") {
				$(e).css("z-index", "1019");
				$(t).css("z-index", "1020")
			}
			if (t) {
				$(t).css({
					opacity: "1"
				}).css(w2utils.cssPrefix({
					transition: "",
					transform: "",
					"backface-visibility": ""
				}))
			}
			if (e) {
				$(e).css({
					opacity: "1"
				}).css(w2utils.cssPrefix({
					transition: "",
					transform: "",
					"backface-visibility": ""
				}));
				if (e.parentNode) $(e.parentNode).css(w2utils.cssPrefix("perspective", ""))
			}
			if (typeof r === "function") r()
		}, o * 1e3)
	}
	function x(e, t, n) {
		var r = {};
		if (typeof t === "object") {
			r = t
		} else {
			r.msg = t;
			r.spinner = n
		}
		if (!r.msg && r.msg !== 0) r.msg = "";
		w2utils.unlock(e);
		$(e).prepend('<div class="w2ui-lock"></div>' + '<div class="w2ui-lock-msg"></div>');
		var i = $(e).find(".w2ui-lock");
		var s = $(e).find(".w2ui-lock-msg");
		if (!r.msg) s.css({
			"background-color": "transparent",
			border: "0px"
		});
		if (r.spinner === true) r.msg = '<div class="w2ui-spinner" ' + (!r.msg ? 'style="width: 35px; height: 35px"' : "") + "></div>" + r.msg;
		if (r.opacity != null) i.css("opacity", r.opacity);
		if (typeof i.fadeIn == "function") {
			i.fadeIn(200);
			s.html(r.msg).fadeIn(200)
		} else {
			i.show();
			s.html(r.msg).show(0)
		}
		$().w2tag()
	}
	function T(e, t) {
		if (n(t)) {
			$(e).find(".w2ui-lock").fadeOut(t);
			setTimeout(function () {
				$(e).find(".w2ui-lock").remove();
				$(e).find(".w2ui-lock-msg").remove()
			}, t)
		} else {
			$(e).find(".w2ui-lock").remove();
			$(e).find(".w2ui-lock-msg").remove()
		}
	}
	function N(e, t) {
		var n = $(e);
		var r = {
			left: parseInt(n.css("border-left-width")) || 0,
			right: parseInt(n.css("border-right-width")) || 0,
			top: parseInt(n.css("border-top-width")) || 0,
			bottom: parseInt(n.css("border-bottom-width")) || 0
		};
		var i = {
			left: parseInt(n.css("margin-left")) || 0,
			right: parseInt(n.css("margin-right")) || 0,
			top: parseInt(n.css("margin-top")) || 0,
			bottom: parseInt(n.css("margin-bottom")) || 0
		};
		var s = {
			left: parseInt(n.css("padding-left")) || 0,
			right: parseInt(n.css("padding-right")) || 0,
			top: parseInt(n.css("padding-top")) || 0,
			bottom: parseInt(n.css("padding-bottom")) || 0
		};
		switch (t) {
		case "top":
			return r.top + i.top + s.top;
		case "bottom":
			return r.bottom + i.bottom + s.bottom;
		case "left":
			return r.left + i.left + s.left;
		case "right":
			return r.right + i.right + s.right;
		case "width":
			return r.left + r.right + i.left + i.right + s.left + s.right + parseInt(n.width());
		case "height":
			return r.top + r.bottom + i.top + i.bottom + s.top + s.bottom + parseInt(n.height());
		case "+width":
			return r.left + r.right + i.left + i.right + s.left + s.right;
		case "+height":
			return r.top + r.bottom + i.top + i.bottom + s.top + s.bottom
		}
		return 0
	}
	function C(e) {
		var t = this.settings.phrases[e];
		if (t == null) return e;
		else return t
	}
	function k(e) {
		if (!e) e = "en-us";
		if (e.length === 5) e = "locale/" + e + ".json";
		w2utils.settings.phrases = {};
		$.ajax({
			url: e,
			type: "GET",
			dataType: "JSON",
			async: false,
			cache: false,
			success: function (e, t, n) {
				w2utils.settings = $.extend(true, w2utils.settings, e);
				var r = w2obj.grid.prototype;
				for (var i in r.buttons) {
					r.buttons[i].caption = w2utils.lang(r.buttons[i].caption);
					r.buttons[i].hint = w2utils.lang(r.buttons[i].hint)
				}
				r.msgDelete = w2utils.lang(r.msgDelete);
				r.msgNotJSON = w2utils.lang(r.msgNotJSON);
				r.msgRefresh = w2utils.lang(r.msgRefresh)
			},
			error: function (t, n, r) {
				console.log("ERROR: Cannot load locale " + e)
			}
		})
	}
	function L() {
		if (e.scrollBarSize) return e.scrollBarSize;
		var t = '<div id="_scrollbar_width" style="position: absolute; top: -300px; width: 100px; height: 100px; overflow-y: scroll;">' + '    <div style="height: 120px">1</div>' + "</div>";
		$("body").append(t);
		e.scrollBarSize = 100 - $("#_scrollbar_width > div").width();
		$("#_scrollbar_width").remove();
		if (String(navigator.userAgent).indexOf("MSIE") >= 0) e.scrollBarSize = e.scrollBarSize / 2;
		return e.scrollBarSize
	}
	function A(e, t) {
		if (!e || typeof e.name === "undefined") {
			console.log('ERROR: The parameter "name" is required but not supplied in $().' + t + "().");
			return false
		}
		if (typeof w2ui[e.name] !== "undefined") {
			console.log('ERROR: The parameter "name" is not unique. There are other objects already created with the same name (obj: ' + e.name + ").");
			return false
		}
		if (!w2utils.isAlphaNumeric(e.name)) {
			console.log('ERROR: The parameter "name" has to be alpha-numeric (a-z, 0-9, dash and underscore). ');
			return false
		}
		return true
	}
	function O(e, t, n, r) {
		if (!$.isArray(t)) t = [t];
		for (var i = 0; i < t.length; i++) {
			if (t[i].id === e) {
				console.log('ERROR: The parameter "id=' + e + '" is not unique within the current ' + n + ". (obj: " + r + ")");
				return false
			}
		}
		return true
	}
	function M(e) {
		var t = [];
		var n = e.replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (e, n, r, i, s, o) {
			t.push({
				name: i,
				optional: !! o
			});
			n = n || "";
			return "" + (o ? "" : n) + "(?:" + (o ? n : "") + (r || "") + (s || r && "([^/.]+?)" || "([^/]+?)") + ")" + (o || "")
		}).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)");
		return {
			path: new RegExp("^" + n + "$", "i"),
			keys: t
		}
	}
	function _(e, t, n) {
		var r = {};
		var i = {};
		var s = "";
		if (!$.isPlainObject(e)) {
			r[e] = t
		} else {
			r = e;
			if (t === true) n = true
		}
		for (var o in r) {
			i[o] = r[o];
			i["-webkit-" + o] = r[o];
			i["-moz-" + o] = r[o].replace("-webkit-", "-moz-");
			i["-ms-" + o] = r[o].replace("-webkit-", "-ms-");
			i["-o-" + o] = r[o].replace("-webkit-", "-o-")
		}
		if (n === true) {
			for (var o in i) {
				s += o + ": " + i[o] + "; "
			}
		} else {
			s = i
		}
		return s
	}
	var e = {};
	var t = {
		version: "1.5.x",
		settings: {
			locale: "en-us",
			date_format: "m/d/yyyy",
			date_display: "Mon d, yyyy",
			time_format: "hh:mi pm",
			currencyPrefix: "$",
			currencySuffix: "",
			currencyPrecision: 2,
			groupSymbol: ",",
			decimalSymbol: ".",
			shortmonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			fullmonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			shortdays: ["M", "T", "W", "T", "F", "S", "S"],
			fulldays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			weekStarts: "M",
			dataType: "HTTP",
			phrases: {}
		},
		isInt: n,
		isFloat: r,
		isMoney: i,
		isHex: s,
		isAlphaNumeric: o,
		isEmail: u,
		isDate: a,
		isTime: f,
		age: l,
		date: c,
		formatSize: h,
		formatNumber: p,
		formatDate: d,
		formatTime: v,
		formatDateTime: m,
		stripTags: g,
		encodeTags: y,
		escapeId: b,
		base64encode: w,
		base64decode: E,
		transition: S,
		lock: x,
		unlock: T,
		lang: C,
		locale: k,
		getSize: N,
		scrollBarSize: L,
		checkName: A,
		checkUniqueId: O,
		parseRoute: M,
		cssPrefix: _,
		isIOS: navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1 || navigator.userAgent.toLowerCase().indexOf("ipad") != -1 ? true : false,
		isIE: navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1 ? true : false
	};
	return t
}();
w2utils.event = {
	on: function (e, t) {
		if (!$.isPlainObject(e)) e = {
			type: e
		};
		e = $.extend({
			type: null,
			execute: "before",
			target: null,
			onComplete: null
		}, e);
		if (!e.type) {
			console.log("ERROR: You must specify event type when calling .on() method of " + this.name);
			return
		}
		if (!t) {
			console.log("ERROR: You must specify event handler function when calling .on() method of " + this.name);
			return
		}
		if (!$.isArray(this.handlers)) this.handlers = [];
		this.handlers.push({
			event: e,
			handler: t
		})
	},
	off: function (e, t) {
		if (!$.isPlainObject(e)) e = {
			type: e
		};
		e = $.extend({}, {
			type: null,
			execute: "before",
			target: null,
			onComplete: null
		}, e);
		if (!e.type) {
			console.log("ERROR: You must specify event type when calling .off() method of " + this.name);
			return
		}
		if (!t) {
			t = null
		}
		var n = [];
		for (var r = 0, i = this.handlers.length; r < i; r++) {
			var s = this.handlers[r];
			if ((s.event.type === e.type || e.type === "*") && (s.event.target === e.target || e.target === null) && (s.handler === t || t === null)) {} else {
				n.push(s)
			}
		}
		this.handlers = n
	},
	trigger: function (e) {
		var e = $.extend({
			type: null,
			phase: "before",
			target: null
		}, e, {
			isStopped: false,
			isCancelled: false,
			preventDefault: function () {
				this.isCancelled = true
			},
			stopPropagation: function () {
				this.isStopped = true
			}
		});
		if (e.phase === "before") e.onComplete = null;
		var t, n, r;
		if (e.target == null) e.target = null;
		if (!$.isArray(this.handlers)) this.handlers = [];
		for (var i = this.handlers.length - 1; i >= 0; i--) {
			var s = this.handlers[i];
			if ((s.event.type === e.type || s.event.type === "*") && (s.event.target === e.target || s.event.target === null) && (s.event.execute === e.phase || s.event.execute === "*" || s.event.phase === "*")) {
				e = $.extend({}, s.event, e);
				t = [];
				r = (new RegExp(/\((.*?)\)/)).exec(s.handler);
				if (r) t = r[1].split(/\s*,\s*/);
				if (t.length === 2) {
					s.handler.call(this, e.target, e)
				} else {
					s.handler.call(this, e)
				}
				if (e.isStopped === true || e.stop === true) return e
			}
		}
		var o = "on" + e.type.substr(0, 1).toUpperCase() + e.type.substr(1);
		if (e.phase === "before" && typeof this[o] === "function") {
			n = this[o];
			t = [];
			r = (new RegExp(/\((.*?)\)/)).exec(n);
			if (r) t = r[1].split(/\s*,\s*/);
			if (t.length === 2) {
				n.call(this, e.target, e)
			} else {
				n.call(this, e)
			}
			if (e.isStopped === true || e.stop === true) return e
		}
		if (e.object != null && e.phase === "before" && typeof e.object[o] === "function") {
			n = e.object[o];
			t = [];
			r = (new RegExp(/\((.*?)\)/)).exec(n);
			if (r) t = r[1].split(/\s*,\s*/);
			if (t.length === 2) {
				n.call(this, e.target, e)
			} else {
				n.call(this, e)
			}
			if (e.isStopped === true || e.stop === true) return e
		}
		if (e.phase === "after" && typeof e.onComplete === "function") e.onComplete.call(this, e);
		return e
	}
};
w2utils.keyboard = function (e) {
	function n() {
		$(document).on("keydown", r);
		$(document).on("mousedown", i)
	}
	function r(e) {
		var n = e.target.tagName;
		if ($.inArray(n, ["INPUT", "SELECT", "TEXTAREA"]) !== -1) return;
		if ($(e.target).prop("contenteditable") === "true") return;
		if (!t) return;
		if (w2ui[t] && typeof w2ui[t].keydown === "function") {
			w2ui[t].keydown.call(w2ui[t], e)
		}
	}
	function i(e) {
		var n = e.target.tagName;
		var r = $(e.target).parents(".w2ui-grid, .w2ui-sidebar, .w2ui-popup");
		if (r.length > 0) {
			var i = r.attr("name");
			var u = w2ui[i];
			if (i != t) {
				if (o(e) === false) return;
				if (s(i, e) === false) return
			}
			if (u && u.keyboard) t = i
		} else {
			o(e)
		}
	}
	function s(e, n) {
		if (e == null) return t;
		var r = w2ui[e];
		if (r && r.focus) {
			if (r.focus.call(r, n) === false) return false
		}
		t = e;
		return true
	}
	function o(e) {
		if (t != null && w2ui[t].blur) {
			if (w2ui[t].blur.call(w2ui[t], e) === false) return false
		}
		t = null;
		return true
	}
	var t = null;
	e.active = s;
	e.clear = o;
	n();
	return e
}({});
(function () {
	$.fn.w2render = function (e) {
		if ($(this).length > 0) {
			if (typeof e === "string" && w2ui[e]) w2ui[e].render($(this)[0]);
			if (typeof e === "object") e.render($(this)[0])
		}
	};
	$.fn.w2destroy = function (e) {
		if (!e && this.length > 0) e = this.attr("name");
		if (typeof e === "string" && w2ui[e]) w2ui[e].destroy();
		if (typeof e === "object") e.destroy()
	};
	$.fn.w2marker = function () {
		var e = Array.prototype.slice.call(arguments, 0);
		if (e.length == 0 || !e[0]) {
			return $(this).each(function (e, t) {
				t.innerHTML = t.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/ig, "$1")
			})
		} else {
			return $(this).each(function (t, n) {
				function o(e) {
					return '<span class="w2ui-marker">' + e + "</span>"
				}
				n.innerHTML = n.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/ig, "$1");
				for (var r = 0; r < e.length; r++) {
					var i = e[r];
					if (typeof i !== "string") i = String(i);
					i = i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").replace(/&/g, "&").replace(/</g, "&gt;").replace(/>/g, "&lt;");
					var s = new RegExp(i + "(?!([^<]+)?>)", "gi");
					n.innerHTML = n.innerHTML.replace(s, o)
				}
			})
		}
	};
	$.fn.w2tag = function (e, t) {
		if (!$.isPlainObject(t)) t = {};
		if (!$.isPlainObject(t.css)) t.css = {};
		if (typeof t["class"] === "undefined") t["class"] = "";
		if ($(this).length === 0) {
			$(".w2ui-tag").each(function (e, t) {
				var n = $(t).data("options");
				if (n == null) n = {};
				$($(t).data("taged-el")).removeClass(n["class"]);
				clearInterval($(t).data("timer"));
				$(t).remove()
			});
			return
		}
		return $(this).each(function (n, r) {
			var i = t.id ? t.id : r.id;
			var s = w2utils.escapeId(i);
			if (e === "" || e == null) {
				$("#w2ui-tag-" + s).css("opacity", 0);
				clearInterval($("#w2ui-tag-" + s).data("timer"));
				$("#w2ui-tag-" + s).remove()
			} else {
				clearInterval($("#w2ui-tag-" + s).data("timer"));
				$("#w2ui-tag-" + s).remove();
				$("body").append('<div id="w2ui-tag-' + i + '" class="w2ui-tag ' + ($(r).parents(".w2ui-popup").length > 0 ? "w2ui-tag-popup" : "") + '" style=""></div>');
				var o = setInterval(function () {
					if ($(r).length === 0 || $(r).offset().left === 0 && $(r).offset().top === 0) {
						clearInterval($("#w2ui-tag-" + s).data("timer"));
						a();
						return
					}
					if ($("#w2ui-tag-" + s).data("position") !== $(r).offset().left + r.offsetWidth + "x" + $(r).offset().top) {
						$("#w2ui-tag-" + s).css(w2utils.cssPrefix({
							transition: ".2s"
						})).css({
							left: $(r).offset().left + r.offsetWidth + (t.left ? t.left : 0) + "px",
							top: $(r).offset().top + (t.top ? t.top : 0) + "px"
						}).data("position", $(r).offset().left + r.offsetWidth + "x" + $(r).offset().top)
					}
				}, 100);
				setTimeout(function () {
					if (!$(r).offset()) return;
					$("#w2ui-tag-" + s).css({
						opacity: "1",
						left: $(r).offset().left + r.offsetWidth + (t.left ? t.left : 0) + "px",
						top: $(r).offset().top + (t.top ? t.top : 0) + "px"
					}).html('<div style="margin-top: -2px 0px 0px -2px; white-space: nowrap;"> <div class="w2ui-tag-body">' + e + "</div> </div>").data("text", e).data("taged-el", r).data("options", t).data("position", $(r).offset().left + r.offsetWidth + "x" + $(r).offset().top).data("timer", o);
					$(r).off("keypress", a).on("keypress", a).off("change", a).on("change", a).css(t.css).addClass(t["class"]);
					if (typeof t.onShow === "function") t.onShow()
				}, 1);
				var u = "";
				if ($(r).length > 0) u = $(r)[0].style.cssText;

				function a() {
					$tag = $("#w2ui-tag-" + s);
					if ($tag.length <= 0) return;
					clearInterval($tag.data("timer"));
					$tag.remove();
					$(r).off("keypress", a).removeClass(t["class"]);
					if ($(r).length > 0) $(r)[0].style.cssText = u;
					if (typeof t.onHide === "function") t.onHide()
				}
			}
		})
	};
	$.fn.w2overlay = function (e, t) {
		function f() {
			var e = $("#w2ui-overlay" + r);
			if (e.data("element") !== n[0]) return;
			if (e.length === 0) return;
			var t = $(n).offset().left + "x" + $(n).offset().top;
			if (e.data("position") !== t) {
				l()
			} else {
				setTimeout(f, 250)
			}
		}
		function l() {
			var e = $("#w2ui-overlay" + r);
			if (e.data("keepOpen") === true) {
				e.removeData("keepOpen");
				return
			}
			var n;
			if (typeof t.onHide === "function") n = t.onHide();
			if (n === false) return;
			e.remove();
			$(document).off("click", l);
			clearInterval(e.data("timer"))
		}
		function c() {
			var e = $("#w2ui-overlay" + r);
			var i = e.find(" > div");
			if (e.length > 0) {
				i.height("auto").width("auto");
				var s = false;
				var o = false;
				var u = i.height();
				var a = i.width();
				if (t.width && t.width < a) a = t.width;
				if (a < 30) a = 30;
				if (t.tmp.contentHeight) {
					u = parseInt(t.tmp.contentHeight);
					i.height(u);
					setTimeout(function () {
						if (u > i.find("div.menu > table").height()) {
							i.find("div.menu").css("overflow-y", "hidden")
						}
					}, 1);
					setTimeout(function () {
						i.find("div.menu").css("overflow-y", "auto")
					}, 10)
				}
				if (t.tmp.contentWidth) {
					a = parseInt(t.tmp.contentWidth);
					i.width(a);
					setTimeout(function () {
						if (a > i.find("div.menu > table").width()) {
							i.find("div.menu").css("overflow-x", "hidden")
						}
					}, 1);
					setTimeout(function () {
						i.find("div.menu").css("overflow-x", "auto")
					}, 10)
				}
				switch (t.align) {
				case "both":
					t.left = 17;
					if (t.width === 0) t.width = w2utils.getSize($(n), "width");
					break;
				case "left":
					t.left = 17;
					break;
				case "right":
					t.tipLeft = a - 45;
					t.left = w2utils.getSize($(n), "width") - a + 10;
					break
				}
				var f = (a - 17) / 2;
				var l = t.left;
				var h = t.width;
				var p = t.tipLeft;
				if (a === 30 && !h) h = 30;
				else h = t.width ? t.width : "auto";
				if (f < 25) {
					l = 25 - f;
					p = Math.floor(f)
				}
				e.css({
					top: n.offset().top + w2utils.getSize(n, "height") + t.top + 7 + "px",
					left: (n.offset().left > 25 ? n.offset().left : 25) + l + "px",
					"min-width": h,
					"min-height": t.height ? t.height : "auto"
				});
				var d = window.innerHeight + $(document).scrollTop() - i.offset().top - 7;
				var v = window.innerWidth + $(document).scrollLeft() - i.offset().left - 7;
				if (d > -50 && d < 210 || t.openAbove === true) {
					d = i.offset().top - $(document).scrollTop() - 7;
					if (t.maxHeight && d > t.maxHeight) d = t.maxHeight;
					if (u > d) {
						o = true;
						i.height(d).width(a).css({
							"overflow-y": "auto"
						});
						u = d
					}
					e.css("top", $(n).offset().top - u - 24 + t.top + "px");
					e.find(">style").html("#w2ui-overlay" + r + ":before { display: none; margin-left: " + parseInt(p) + "px; }" + "#w2ui-overlay" + r + ":after { display: block; margin-left: " + parseInt(p) + "px; }")
				} else {
					if (t.maxHeight && d > t.maxHeight) d = t.maxHeight;
					if (u > d) {
						o = true;
						i.height(d).width(a).css({
							"overflow-y": "auto"
						})
					}
					e.find(">style").html("#w2ui-overlay" + r + ":before { display: block; margin-left: " + parseInt(p) + "px; }" + "#w2ui-overlay" + r + ":after { display: none; margin-left: " + parseInt(p) + "px; }")
				}
				a = i.width();
				v = window.innerWidth + $(document).scrollLeft() - i.offset().left - 7;
				if (t.maxWidth && v > t.maxWidth) v = t.maxWidth;
				if (a > v && t.align !== "both") {
					t.align = "right";
					setTimeout(function () {
						c()
					}, 1)
				}
				if (o && s) i.width(a + w2utils.scrollBarSize() + 2)
			}
		}
		var n = this;
		var r = "";
		var i = {
			name: null,
			html: "",
			align: "none",
			left: 0,
			top: 0,
			tipLeft: 30,
			width: 0,
			height: 0,
			maxWidth: null,
			maxHeight: null,
			style: "",
			"class": "",
			onShow: null,
			onHide: null,
			openAbove: false,
			tmp: {}
		};
		if (arguments.length == 1) {
			if (typeof e == "object") {
				t = e
			} else {
				t = {
					html: e
				}
			}
		}
		if (arguments.length == 2) t.html = e;
		if (!$.isPlainObject(t)) t = {};
		t = $.extend({}, i, t);
		if (t.name) r = "-" + t.name;
		var s;
		if (this.length === 0 || t.html === "" || t.html == null) {
			if ($("#w2ui-overlay" + r).length > 0) {
				s = $("#w2ui-overlay" + r)[0].hide;
				if (typeof s === "function") s()
			} else {
				$("#w2ui-overlay" + r).remove()
			}
			return $(this)
		}
		if ($("#w2ui-overlay" + r).length > 0) {
			s = $("#w2ui-overlay" + r)[0].hide;
			$(document).off("click", s);
			if (typeof s === "function") s()
		}
		$("body").append('<div id="w2ui-overlay' + r + '" style="display: none"' + '        class="w2ui-reset w2ui-overlay ' + ($(this).parents(".w2ui-popup, .w2ui-overlay-popup").length > 0 ? "w2ui-overlay-popup" : "") + '">' + "    <style></style>" + '    <div style="' + t.style + '" class="' + t["class"] + '"></div>' + "</div>");
		var o = $("#w2ui-overlay" + r);
		var u = o.find(" > div");
		u.html(t.html);
		var a = u.css("background-color");
		if (a != null && a !== "rgba(0, 0, 0, 0)" && a !== "transparent") o.css("background-color", a);
		o.data("element", n.length > 0 ? n[0] : null).data("options", t).data("position", $(n).offset().left + "x" + $(n).offset().top).fadeIn("fast").on("click", function (e) {
			if (e.target.tagName == "LABEL") e.stopPropagation()
		}).on("mousedown", function (e) {
			$("#w2ui-overlay" + r).data("keepOpen", true);
			if (["INPUT", "TEXTAREA", "SELECT"].indexOf(e.target.tagName) == -1) e.preventDefault()
		});
		o[0].hide = l;
		o[0].resize = c;
		c();
		setTimeout(function () {
			c();
			$(document).off("click", l).on("click", l);
			if (typeof t.onShow === "function") t.onShow()
		}, 10);
		f();
		return $(this)
	};
	$.fn.w2menu = function (e, t) {
		function p() {
			setTimeout(function () {
				$("#w2ui-overlay" + i + " tr.w2ui-selected").removeClass("w2ui-selected");
				var e = $("#w2ui-overlay" + i + " tr[index=" + t.index + "]");
				var n = $("#w2ui-overlay" + i + " div.menu").scrollTop();
				e.addClass("w2ui-selected");
				if (t.tmp) t.tmp.contentHeight = $("#w2ui-overlay" + i + " table").height() + (t.search ? 50 : 10);
				if (t.tmp) t.tmp.contentWidth = $("#w2ui-overlay" + i + " table").width();
				if ($("#w2ui-overlay" + i).length > 0) $("#w2ui-overlay" + i)[0].resize();
				if (e.length > 0) {
					var r = e[0].offsetTop - 5;
					var s = $("#w2ui-overlay" + i + " div.menu");
					var o = s.height();
					$("#w2ui-overlay" + i + " div.menu").scrollTop(n);
					if (r < n || r + e.height() > n + o) {
						$("#w2ui-overlay" + i + " div.menu").animate({
							scrollTop: r - (o - e.height() * 2) / 2
						}, 200, "linear")
					}
				}
			}, 1)
		}
		function d(e) {
			var n = this.value;
			var s = e.keyCode;
			var o = false;
			switch (s) {
			case 13:
				$("#w2ui-overlay" + i).remove();
				$.fn.w2menuHandler(e, t.index);
				break;
			case 9:
			case 27:
				$("#w2ui-overlay" + i).remove();
				$.fn.w2menuHandler(e, -1);
				break;
			case 38:
				t.index = w2utils.isInt(t.index) ? parseInt(t.index) : 0;
				t.index--;
				while (t.index > 0 && t.items[t.index].hidden) t.index--;
				if (t.index === 0 && t.items[t.index].hidden) {
					while (t.items[t.index] && t.items[t.index].hidden) t.index++
				}
				if (t.index < 0) t.index = 0;
				o = true;
				break;
			case 40:
				t.index = w2utils.isInt(t.index) ? parseInt(t.index) : 0;
				t.index++;
				while (t.index < t.items.length - 1 && t.items[t.index].hidden) t.index++;
				if (t.index === t.items.length - 1 && t.items[t.index].hidden) {
					while (t.items[t.index] && t.items[t.index].hidden) t.index--
				}
				if (t.index >= t.items.length) t.index = t.items.length - 1;
				o = true;
				break
			}
			if (!o) {
				var u = 0;
				for (var a = 0; a < t.items.length; a++) {
					var f = t.items[a];
					var l = "";
					var c = "";
					if (["is", "begins with"].indexOf(t.match) !== -1) l = "^";
					if (["is", "ends with"].indexOf(t.match) !== -1) c = "$";
					try {
						var h = new RegExp(l + n + c, "i");
						if (h.test(f.text) || f.text === "...") f.hidden = false;
						else f.hidden = true
					} catch (d) {}
					if (r.type === "enum" && $.inArray(f.id, ids) !== -1) f.hidden = true;
					if (f.hidden !== true) u++
				}
				t.index = 0;
				while (t.index < t.items.length - 1 && t.items[t.index].hidden) t.index++;
				if (u <= 0) t.index = -1
			}
			$(r).w2menu("refresh", t);
			p()
		}
		function v() {
			if (t.spinner) {
				return '<table class="w2ui-drop-menu"><tr><td style="padding: 5px 10px 10px 10px; text-align: center">' + '    <div class="w2ui-spinner" style="width: 18px; height: 18px; position: relative; top: 5px;"></div> ' + '    <div style="display: inline-block; padding: 3px; color: #999;">' + w2utils.lang("Loading...") + "</div>" + "</td></tr></table>"
			}
			var e = 0;
			var n = '<table cellspacing="0" cellpadding="0" class="w2ui-drop-menu">';
			var r = null,
				s = null;
			for (var o = 0; o < t.items.length; o++) {
				var u = t.items[o];
				if (typeof u === "string") {
					u = {
						id: u,
						text: u
					}
				} else {
					if (u.text != null && u.id == null) u.id = u.text;
					if (u.text == null && u.id != null) u.text = u.id;
					if (u.caption != null) u.text = u.caption;
					r = u.img;
					s = u.icon;
					if (r == null) r = null;
					if (s == null) s = null
				}
				if (u.hidden !== true) {
					var a = "";
					var f = u.text;
					if (typeof t.render === "function") f = t.render(u, t);
					if (r) a = '<td class="menu-icon"><div class="w2ui-tb-image w2ui-icon ' + r + '"></div></td>';
					if (s) a = '<td class="menu-icon" align="center"><span class="w2ui-icon ' + s + '"></span></td>';
					if (typeof f !== "undefined" && f !== "" && !/^-+$/.test(f)) {
						var l = e % 2 === 0 ? "w2ui-item-even" : "w2ui-item-odd";
						if (t.altRows !== true) l = "";
						var c = 1;
						if (a == "") c++;
						if (u.count == null) c++;
						n += '<tr index="' + o + '" style="' + (u.style ? u.style : "") + '" ' + (u.hint ? 'title="' + u.hint + '"' : "") + '        class="' + l + " " + (t.index === o ? "w2ui-selected" : "") + " " + (u.disabled === true ? "w2ui-disabled" : "") + '"' + "        onmousedown=\"$(this).parent().find('tr').removeClass('w2ui-selected'); $(this).addClass('w2ui-selected');\"" + '        onclick="event.stopPropagation(); ' + "               if (" + (u.disabled === true ? "true" : "false") + ") return;" + "               $('#w2ui-overlay" + i + "').remove(); " + "               $.fn.w2menuHandler(event, '" + o + "');\">" + a + '   <td class="menu-text" colspan="' + c + '">' + f + "</td>" + '   <td class="menu-count">' + (u.count != null ? "<span>" + u.count + "</span>" : "") + "</td>" + "</tr>";
						e++
					} else {
						n += '<tr><td colspan="2" style="padding: 6px; pointer-events: none"><div style="border-top: 1px solid silver;"></div></td></tr>'
					}
				}
				t.items[o] = u
			}
			if (e === 0) {
				n += '<tr><td style="padding: 13px; color: #999; text-align: center">' + t.msgNoItems + "</div></td></tr>"
			}
			n += "</table>";
			return n
		}
		var n = {
			index: null,
			items: [],
			render: null,
			msgNoItems: "No items",
			onSelect: null,
			tmp: {}
		};
		var r = this;
		var i = "";
		if (e === "refresh") {
			if ($("#w2ui-overlay" + i).length > 0) {
				t = $.extend($.fn.w2menuOptions, t);
				var s = $("#w2ui-overlay" + i + " div.menu").scrollTop();
				$("#w2ui-overlay" + i + " div.menu").html(v());
				$("#w2ui-overlay" + i + " div.menu").scrollTop(s);
				setTimeout(function () {
					p()
				}, 1)
			} else {
				$(this).w2menu(t)
			}
		} else if (e === "refresh-index") {
			var o = $("#w2ui-overlay" + i + " div.menu");
			var u = o.find("tr[index=" + t.index + "]");
			var s = o.scrollTop();
			o.find("tr.w2ui-selected").removeClass("w2ui-selected");
			u.addClass("w2ui-selected");
			if (u.length > 0) {
				var a = u[0].offsetTop - 5;
				var f = o.height();
				o.scrollTop(s);
				if (a < s || a + u.height() > s + f) {
					o.animate({
						scrollTop: a - (f - u.height() * 2) / 2
					}, 200, "linear")
				}
			}
			return
		} else {
			if (arguments.length === 1) t = e;
			else t.items = e;
			if (typeof t !== "object") t = {};
			t = $.extend({}, n, t);
			$.fn.w2menuOptions = t;
			if (t.name) i = "-" + t.name;
			if (typeof t.select === "function" && typeof t.onSelect !== "function") t.onSelect = t.select;
			if (typeof t.onRender === "function" && typeof t.render !== "function") t.render = t.onRender;
			$.fn.w2menuHandler = function (e, n) {
				if (typeof t.onSelect === "function") {
					setTimeout(function () {
						t.onSelect({
							index: n,
							item: t.items[n],
							originalEvent: e
						})
					}, 10)
				}
			};
			var l = "";
			if (t.search) {
				l += '<div style="position: absolute; top: 0px; height: 40px; left: 0px; right: 0px; border-bottom: 1px solid silver; background-color: #ECECEC; padding: 8px 5px;">' + '    <div class="w2ui-icon icon-search" style="position: absolute; margin-top: 4px; margin-left: 6px; width: 11px; background-position: left !important;"></div>' + '    <input id="menu-search" type="text" style="width: 100%; outline: none; padding-left: 20px;" onclick="event.stopPropagation();">' + "</div>";
				t.style += ";background-color: #ECECEC";
				t.index = 0;
				for (var c = 0; c < t.items.length; c++) t.items[c].hidden = false
			}
			l += '<div class="menu" style="position: absolute; top: ' + (t.search ? 40 : 0) + 'px; bottom: 0px; width: 100%; overflow: auto;">' + v() + "</div>";
			var h = $(this).w2overlay(l, t);
			setTimeout(function () {
				$("#w2ui-overlay" + i + " #menu-search").on("keyup", d).on("keydown", function (e) {
					if (e.keyCode === 9) {
						e.stopPropagation();
						e.preventDefault()
					}
				});
				if (t.search) {
					if (["text", "password"].indexOf($(r)[0].type) != -1 || $(r)[0].tagName == "texarea") return;
					$("#w2ui-overlay" + i + " #menu-search").focus()
				}
			}, 200);
			p();
			return h
		}
	}
})();
(function () {
	var w2grid = function (e) {
		this.name = null;
		this.box = null;
		this.header = "";
		this.url = "";
		this.routeData = {};
		this.columns = [];
		this.columnGroups = [];
		this.records = [];
		this.summary = [];
		this.searches = [];
		this.searchData = [];
		this.sortData = [];
		this.postData = {};
		this.toolbar = {};
		this.show = {
			header: false,
			toolbar: false,
			footer: false,
			columnHeaders: true,
			lineNumbers: false,
			expandColumn: false,
			selectColumn: false,
			selectColumn_All:true,
			emptyRecords: true,
			toolbarReload: true,
			toolbarColumns: true,
			toolbarSearch: true,
			toolbarAdd: false,
			toolbarEdit: false,
			toolbarDelete: false,
			toolbarSave: false,
			statusRange: true,
			statusBuffered: false,
			statusRecordID: true,
			statusSelection: true,
			statusResponse: true,
			statusSort: true,
			statusSearch: true,
			recordTitles: true,
			selectionBorder: true,
			skipRecords: true
		};
		this.autoLoad = true;
		this.autoLoad_Show	= true
		this.fixedBody = true;
		this.recordHeight = 24;
		this.vs_start = 300;
		this.vs_extra = 15;
		this.keyboard = true;
		this.selectType = "row";
		this.multiSearch = true;
		this.multiSelect = true;
		this.multiSort = true;
		this.reorderColumns = false;
		this.reorderRows = false;
		this.markSearch = true;
		this.total = 0;
		this.limit = 100;
		this.offset = 0;
		this.style = "";
		this.ranges = [];
		this.menu = [];
		this.method = null;
		this.recid = null;
		this.parser = null;
		this.onAdd = null;
		this.onEdit = null;
		this.onRequest = null;
		this.onLoad = null;
		this.onDelete = null;
		this.onDeleted = null;
		this.onSubmit = null;
		this.onSave = null;
		this.onSelect = null;
		this.onUnselect = null;
		this.onClick = null;
		this.onDblClick = null;
		this.onContextMenu = null;
		this.onMenuClick = null;
		this.onColumnClick = null;
		this.onColumnResize = null;
		this.onSort = null;
		this.onSearch = null;
		this.onChange = null;
		this.onRestore = null;
		this.onExpand = null;
		this.onCollapse = null;
		this.onError = null;
		this.onKeydown = null;
		this.onToolbar = null;
		this.onColumnOnOff = null;
		this.onCopy = null;
		this.onPaste = null;
		this.onSelectionExtend = null;
		this.onEditField = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onReload = null;
		this.onResize = null;
		this.onDestroy = null;
		this.onStateSave = null;
		this.onStateRestore = null;
		this.onFocus = null;
		this.onBlur = null;
		this.last = {
			field: "all",
			caption: w2utils.lang("All Fields"),
			logic: "OR",
			search: "",
			searchIds: [],
			selection: {
				indexes: [],
				columns: {}
			},
			multi: false,
			scrollTop: 0,
			scrollLeft: 0,
			sortData: null,
			sortCount: 0,
			xhr: null,
			range_start: null,
			range_end: null,
			sel_ind: null,
			sel_col: null,
			sel_type: null,
			edit_col: null
		};
		$.extend(true, this, w2obj.grid, e)
	};
	$.fn.w2grid = function (e) {
		if ($.isPlainObject(e)) {
			if (!w2utils.checkName(e, "w2grid")) return;
			var t = e.columns;
			var n = e.columnGroups;
			var r = e.records;
			var i = e.searches;
			var s = e.searchData;
			var o = e.sortData;
			var u = e.postData;
			var a = e.toolbar;
			var f = new w2grid(e);
			$.extend(f, {
				postData: {},
				records: [],
				columns: [],
				searches: [],
				toolbar: {},
				sortData: [],
				searchData: [],
				handlers: []
			});
			if (f.onExpand != null) f.show.expandColumn = true;
			$.extend(true, f.toolbar, a);
			if (t) for (var l = 0; l < t.length; l++) f.columns[l] = $.extend(true, {}, t[l]);
			if (n) for (var l = 0; l < n.length; l++) f.columnGroups[l] = $.extend(true, {}, n[l]);
			if (i) for (var l = 0; l < i.length; l++) f.searches[l] = $.extend(true, {}, i[l]);
			if (s) for (var l = 0; l < s.length; l++) f.searchData[l] = $.extend(true, {}, s[l]);
			if (o) for (var l = 0; l < o.length; l++) f.sortData[l] = $.extend(true, {}, o[l]);
			f.postData = $.extend(true, {}, u);
			if (r) for (var c = 0; c < r.length; c++) {
				if (r[c].recid == null || typeof r[c].recid == "undefined") {
					console.log("ERROR: Cannot add records without recid. (obj: " + f.name + ")");
					return
				}
				f.records[c] = $.extend(true, {}, r[c])
			}
			for (var h in f.columns) {
				var p = f.columns[h];
				if (typeof p.searchable == "undefined" || f.getSearch(p.field) != null) continue;
				var d = p.searchable;
				var v = "";
				if (p.searchable === true) {
					d = "text";
					v = 'size="20"'
				}
				f.addSearch({
					field: p.field,
					caption: p.caption,
					type: d,
					attr: v
				})
			}
			f.initToolbar();
			if ($(this).length !== 0) {
				f.render($(this)[0])
			}
			w2ui[f.name] = f;
			return f
		} else {
			var m = w2ui[$(this).attr("name")];
			if (!m) return null;
			if (arguments.length > 0) {
				if (m[e]) m[e].apply(m, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return m
			}
		}
	};
	w2grid.prototype = {
		msgDelete: w2utils.lang("Are you sure you want to delete selected records?"),
		msgNotJSON: w2utils.lang("Returned data is not in valid JSON format."),
		msgAJAXerror: w2utils.lang("AJAX error. See console for more details."),
		msgRefresh: w2utils.lang("Refreshing..."),
		msgNeedReload: w2utils.lang("Your remove data source record count has changed, reloading from the first record."),
		buttons: {
			reload: {
				type: "button",
				id: "w2ui-reload",
				icon: "w2ui-icon-reload",
				hint: w2utils.lang("Reload data in the list")
			},
			columns: {
				type: "drop",
				id: "w2ui-column-on-off",
				icon: "w2ui-icon-columns",
				hint: w2utils.lang("Show/hide columns"),
				arrow: false,
				html: ""
			},
			search: {
				type: "html",
				id: "w2ui-search",
				html: '<div class="w2ui-icon icon-search-down w2ui-search-down" title="' + w2utils.lang("Select Search Field") + '" ' + "onclick=\"var obj = w2ui[$(this).parents('div.w2ui-grid').attr('name')]; obj.searchShowFields();\"></div>"
			},
			"search-go": {
				type: "drop",
				id: "w2ui-search-advanced",
				icon: "w2ui-icon-search",
				caption: w2utils.lang("Search"),
				hint: w2utils.lang("Open Search Fields")
			},
			add: {
				type: "button",
				id: "w2ui-add",
				caption: w2utils.lang("Add New"),
				hint: w2utils.lang("Add new record"),
				icon: "w2ui-icon-plus"
			},
			edit: {
				type: "button",
				id: "w2ui-edit",
				caption: w2utils.lang("Edit"),
				hint: w2utils.lang("Edit selected record"),
				icon: "w2ui-icon-pencil",
				disabled: true
			},
			"delete": {
				type: "button",
				id: "w2ui-delete",
				caption: w2utils.lang("Delete"),
				hint: w2utils.lang("Delete selected records"),
				icon: "w2ui-icon-cross",
				disabled: true
			},
			save: {
				type: "button",
				id: "w2ui-save",
				caption: w2utils.lang("Save"),
				hint: w2utils.lang("Save changed records"),
				icon: "w2ui-icon-check"
			}
		},
		add: function (e) {
			if (!$.isArray(e)) e = [e];
			var t = 0;
			for (var n in e) {
				if (this.recid && typeof e[n].recid == "undefined") e[n].recid = e[n][this.recid];
				if (e[n].recid == null || typeof e[n].recid == "undefined") {
					console.log("ERROR: Cannot add record without recid. (obj: " + this.name + ")");
					continue
				}
				this.records.push(e[n]);
				t++
			}
			var r = typeof this.url != "object" ? this.url : this.url.get;
			if (!r) {
				this.total = this.records.length;
				this.localSort();
				this.localSearch()
			}
			this.refresh();
			return t
		},
		find: function (e, t) {
			if (typeof e == "undefined" || e == null) e = {};
			var n = [];
			var r = false;
			for (var i in e) if (String(i).indexOf(".") != -1) r = true;
			for (var s = 0; s < this.records.length; s++) {
				var o = true;
				for (var i in e) {
					var u = this.records[s][i];
					if (r && String(i).indexOf(".") != -1) u = this.parseField(this.records[s], i);
					if (e[i] != u) o = false
				}
				if (o && t !== true) n.push(this.records[s].recid);
				if (o && t === true) n.push(s)
			}
			return n
		},
		set: function (e, t, n) {
			if (typeof e == "object") {
				n = t;
				t = e;
				e = null
			}
			if (e == null) {
				for (var r in this.records) {
					$.extend(true, this.records[r], t)
				}
				if (n !== true) this.refresh()
			} else {
				var i = this.get(e, true);
				if (i == null) return false;
				var s = this.records[i] && this.records[i].recid == e ? false : true;
				if (s) {
					$.extend(true, this.summary[i], t)
				} else {
					$.extend(true, this.records[i], t)
				}
				if (n !== true) this.refreshRow(e)
			}
			return true
		},
		get: function (e, t) {
			for (var n = 0; n < this.records.length; n++) {
				if (this.records[n].recid == e) {
					if (t === true) return n;
					else return this.records[n]
				}
			}
			for (var n = 0; n < this.summary.length; n++) {
				if (this.summary[n].recid == e) {
					if (t === true) return n;
					else return this.summary[n]
				}
			}
			return null
		},
		remove: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.records.length - 1; n >= 0; n--) {
					if (this.records[n].recid == arguments[t]) {
						this.records.splice(n, 1);
						e++
					}
				}
				for (var n = this.summary.length - 1; n >= 0; n--) {
					if (this.summary[n].recid == arguments[t]) {
						this.summary.splice(n, 1);
						e++
					}
				}
			}
			var r = typeof this.url != "object" ? this.url : this.url.get;
			if (!r) {
				this.localSort();
				this.localSearch()
			}
			this.refresh();
			return e
		},
		addColumn: function (e, t) {
			var n = 0;
			if (arguments.length == 1) {
				t = e;
				e = this.columns.length
			} else {
				if (typeof e == "string") e = this.getColumn(e, true);
				if (e === null) e = this.columns.length
			}
			if (!$.isArray(t)) t = [t];
			for (var r in t) {
				this.columns.splice(e, 0, t[r]);
				if (t[r].searchable) {
					var i = t[r].searchable;
					var s = "";
					if (t[r].searchable === true) {
						i = "text";
						s = 'size="20"'
					}
					this.addSearch({
						field: t[r].field,
						caption: t[r].caption,
						type: i,
						attr: s
					})
				}
				e++;
				n++
			}
			this.refresh();
			return n
		},
		removeColumn: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.columns.length - 1; n >= 0; n--) {
					if (this.columns[n].field == arguments[t]) {
						if (this.columns[n].searchable) this.removeSearch(arguments[t]);
						this.columns.splice(n, 1);
						e++
					}
				}
			}
			this.refresh();
			return e
		},
		getColumn: function (e, t) {
			for (var n = 0; n < this.columns.length; n++) {
				if (this.columns[n].field == e) {
					if (t === true) return n;
					else return this.columns[n]
				}
			}
			return null
		},
		toggleColumn: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.columns.length - 1; n >= 0; n--) {
					var r = this.columns[n];
					if (r.field == arguments[t]) {
						r.hidden = !r.hidden;
						e++
					}
				}
			}
			this.refresh();
			return e
		},
		showColumn: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.columns.length - 1; n >= 0; n--) {
					var r = this.columns[n];
					if (r.gridMinWidth) delete r.gridMinWidth;
					if (r.field == arguments[t] && r.hidden !== false) {
						r.hidden = false;
						e++
					}
				}
			}
			this.refresh();
			return e
		},
		hideColumn: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.columns.length - 1; n >= 0; n--) {
					var r = this.columns[n];
					if (r.field == arguments[t] && r.hidden !== true) {
						r.hidden = true;
						e++
					}
				}
			}
			this.refresh();
			return e
		},
		addSearch: function (e, t) {
			var n = 0;
			if (arguments.length == 1) {
				t = e;
				e = this.searches.length
			} else {
				if (typeof e == "string") e = this.getSearch(e, true);
				if (e === null) e = this.searches.length
			}
			if (!$.isArray(t)) t = [t];
			for (var r in t) {
				this.searches.splice(e, 0, t[r]);
				e++;
				n++
			}
			this.searchClose();
			return n
		},
		removeSearch: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.searches.length - 1; n >= 0; n--) {
					if (this.searches[n].field == arguments[t]) {
						this.searches.splice(n, 1);
						e++
					}
				}
			}
			this.searchClose();
			return e
		},
		getSearch: function (e, t) {
			for (var n = 0; n < this.searches.length; n++) {
				if (this.searches[n].field == e) {
					if (t === true) return n;
					else return this.searches[n]
				}
			}
			return null
		},
		toggleSearch: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.searches.length - 1; n >= 0; n--) {
					if (this.searches[n].field == arguments[t]) {
						this.searches[n].hidden = !this.searches[n].hidden;
						e++
					}
				}
			}
			this.searchClose();
			return e
		},
		showSearch: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.searches.length - 1; n >= 0; n--) {
					if (this.searches[n].field == arguments[t] && this.searches[n].hidden !== false) {
						this.searches[n].hidden = false;
						e++
					}
				}
			}
			this.searchClose();
			return e
		},
		hideSearch: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				for (var n = this.searches.length - 1; n >= 0; n--) {
					if (this.searches[n].field == arguments[t] && this.searches[n].hidden !== true) {
						this.searches[n].hidden = true;
						e++
					}
				}
			}
			this.searchClose();
			return e
		},
		getSearchData: function (e) {
			for (var t in this.searchData) {
				if (this.searchData[t].field == e) return this.searchData[t]
			}
			return null
		},
		localSort: function (e) {
			var t = typeof this.url != "object" ? this.url : this.url.get;
			if (t) {
				console.log("ERROR: grid.localSort can only be used on local data source, grid.url should be empty.");
				return
			}
			if ($.isEmptyObject(this.sortData)) return;
			var n = (new Date).getTime();
			var r = this;
			r.prepareData();
			for (var i in this.sortData) {
				var s = this.getColumn(this.sortData[i].field);
				if (!s) return;
				if (typeof s.render == "string") {
					if (["date", "age"].indexOf(s.render.split(":")[0]) != -1) {
						this.sortData[i]["field_"] = s.field + "_"
					}
					if (["time"].indexOf(s.render.split(":")[0]) != -1) {
						this.sortData[i]["field_"] = s.field + "_"
					}
				}
			}
			this.records.sort(function (e, t) {
				var n = 0;
				for (var i in r.sortData) {
					var s = r.sortData[i].field;
					if (r.sortData[i].field_) s = r.sortData[i].field_;
					var o = e[s];
					var u = t[s];
					if (String(s).indexOf(".") != -1) {
						o = r.parseField(e, s);
						u = r.parseField(t, s)
					}
					if (typeof o == "string") o = $.trim(o.toLowerCase());
					if (typeof u == "string") u = $.trim(u.toLowerCase());
					if (o > u) n = r.sortData[i].direction == "asc" ? 1 : -1;
					if (o < u) n = r.sortData[i].direction == "asc" ? -1 : 1;
					if (typeof o != "object" && typeof u == "object") n = -1;
					if (typeof u != "object" && typeof o == "object") n = 1;
					if (o == null && u != null) n = 1;
					if (o != null && u == null) n = -1;
					if (n != 0) break
				}
				return n
			});
			n = (new Date).getTime() - n;
			if (e !== true && r.show.statusSort) {
				setTimeout(function () {
					r.status(w2utils.lang("Sorting took") + " " + n / 1e3 + " " + w2utils.lang("sec"))
				}, 10)
			}
			return n
		},
		localSearch: function (e) {
			var t = typeof this.url != "object" ? this.url : this.url.get;
			if (t) {
				console.log("ERROR: grid.localSearch can only be used on local data source, grid.url should be empty.");
				return
			}
			var n = (new Date).getTime();
			var r = this;
			this.total = this.records.length;
			this.last.searchIds = [];
			this.prepareData();
			if (this.searchData.length > 0 && !t) {
				this.total = 0;
				for (var i in this.records) {
					var s = this.records[i];
					var o = 0;
					for (var u in this.searchData) {
						var a = this.searchData[u];
						var f = this.getSearch(a.field);
						if (a == null) continue;
						if (f == null) f = {
							field: a.field,
							type: a.type
						};
						var l = String(r.parseField(s, f.field)).toLowerCase();
						if (typeof a.value != "undefined") {
							if (!$.isArray(a.value)) {
								var c = String(a.value).toLowerCase()
							} else {
								var c = a.value[0];
								var h = a.value[1]
							}
						}
						switch (a.operator) {
						case "is":
							if (s[f.field] == a.value) o++;
							if (f.type == "date") {
								var p = s[f.field + "_"] instanceof Date ? s[f.field + "_"] : s[f.field];
								var l = w2utils.formatDate(p, "yyyy-mm-dd");
								var c = w2utils.formatDate(c, "yyyy-mm-dd");
								if (l == c) o++
							}
							if (f.type == "time") {
								var p = s[f.field + "_"] instanceof Date ? s[f.field + "_"] : s[f.field];
								var l = w2utils.formatTime(p, "h24:mi");
								var c = w2utils.formatTime(c, "h24:mi");
								if (l == c) o++
							}
							break;
						case "between":
							if (["int", "float", "money", "currency", "percent"].indexOf(f.type) != -1) {
								if (parseFloat(s[f.field]) >= parseFloat(c) && parseFloat(s[f.field]) <= parseFloat(h)) o++
							}
							if (f.type == "date") {
								var l = s[f.field + "_"] instanceof Date ? s[f.field + "_"] : s[f.field];
								var c = w2utils.isDate(c, w2utils.settings.date_format, true);
								var h = w2utils.isDate(h, w2utils.settings.date_format, true);
								if (h != null) h = new Date(h.getTime() + 864e5);
								if (l >= c && l < h) o++
							}
							if (f.type == "time") {
								var l = s[f.field + "_"] instanceof Date ? s[f.field + "_"] : s[f.field];
								var c = w2utils.isTime(c, true);
								var h = w2utils.isTime(h, true);
								c = (new Date).setHours(c.hours, c.minutes, c.seconds ? c.seconds : 0, 0);
								h = (new Date).setHours(h.hours, h.minutes, h.seconds ? h.seconds : 0, 0);
								if (l >= c && l < h) o++
							}
							break;
						case "in":
							var p = a.value;
							if (a.svalue) p = a.svalue;
							if (p.indexOf(w2utils.isFloat(l) ? parseFloat(l) : l) !== -1) o++;
							break;
						case "not in":
							var p = a.value;
							if (a.svalue) p = a.svalue;
							if (p.indexOf(w2utils.isFloat(l) ? parseFloat(l) : l) == -1) o++;
							break;
						case "begins":
						case "begins with":
							if (l.indexOf(c) == 0) o++;
							break;
						case "contains":
							if (l.indexOf(c) >= 0) o++;
							break;
						case "ends":
						case "ends with":
							if (l.indexOf(c) == l.length - c.length) o++;
							break
						}
					}
					if (this.last.logic == "OR" && o != 0 || this.last.logic == "AND" && o == this.searchData.length) this.last.searchIds.push(parseInt(i))
				}
				this.total = this.last.searchIds.length
			}
			n = (new Date).getTime() - n;
			if (e !== true && r.show.statusSearch) {
				setTimeout(function () {
					r.status(w2utils.lang("Search took") + " " + n / 1e3 + " " + w2utils.lang("sec"))
				}, 10)
			}
			return n
		},
		getRangeData: function (e, t) {
			var n = this.get(e[0].recid, true);
			var r = this.get(e[1].recid, true);
			var i = e[0].column;
			var s = e[1].column;
			var o = [];
			if (i == s) {
				for (var u = n; u <= r; u++) {
					var a = this.records[u];
					var f = a[this.columns[i].field] || null;
					if (t !== true) {
						o.push(f)
					} else {
						o.push({
							data: f,
							column: i,
							index: u,
							record: a
						})
					}
				}
			} else if (n == r) {
				var a = this.records[n];
				for (var l = i; l <= s; l++) {
					var f = a[this.columns[l].field] || null;
					if (t !== true) {
						o.push(f)
					} else {
						o.push({
							data: f,
							column: l,
							index: n,
							record: a
						})
					}
				}
			} else {
				for (var u = n; u <= r; u++) {
					var a = this.records[u];
					o.push([]);
					for (var l = i; l <= s; l++) {
						var f = a[this.columns[l].field];
						if (t !== true) {
							o[o.length - 1].push(f)
						} else {
							o[o.length - 1].push({
								data: f,
								column: l,
								index: u,
								record: a
							})
						}
					}
				}
			}
			return o
		},
		addRange: function (e) {
			var t = 0;
			if (this.selectType == "row") return t;
			if (!$.isArray(e)) e = [e];
			for (var n in e) {
				if (typeof e[n] != "object") e[n] = {
					name: "selection"
				};
				if (e[n].name == "selection") {
					if (this.show.selectionBorder === false) continue;
					var r = this.getSelection();
					if (r.length == 0) {
						this.removeRange(e[n].name);
						continue
					} else {
						var i = r[0];
						var s = r[r.length - 1];
						var o = $("#grid_" + this.name + "_rec_" + i.recid + " td[col=" + i.column + "]");
						var u = $("#grid_" + this.name + "_rec_" + s.recid + " td[col=" + s.column + "]")
					}
				} else {
					var i = e[n].range[0];
					var s = e[n].range[1];
					var o = $("#grid_" + this.name + "_rec_" + i.recid + " td[col=" + i.column + "]");
					var u = $("#grid_" + this.name + "_rec_" + s.recid + " td[col=" + s.column + "]")
				}
				if (i) {
					var a = {
						name: e[n].name,
						range: [{
							recid: i.recid,
							column: i.column
						},
						{
							recid: s.recid,
							column: s.column
						}],
						style: e[n].style || ""
					};
					var f = false;
					for (var l in this.ranges) if (this.ranges[l].name == e[n].name) {
						f = n;
						break
					}
					if (f !== false) {
						this.ranges[f] = a
					} else {
						this.ranges.push(a)
					}
					t++
				}
			}
			this.refreshRanges();
			return t
		},
		removeRange: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = arguments[t];
				$("#grid_" + this.name + "_" + n).remove();
				for (var r = this.ranges.length - 1; r >= 0; r--) {
					if (this.ranges[r].name == n) {
						this.ranges.splice(r, 1);
						e++
					}
				}
			}
			return e
		},
		refreshRanges: function () {
			function h(t) {
				var n = e.getSelection();
				e.last.move = {
					type: "expand",
					x: t.screenX,
					y: t.screenY,
					divX: 0,
					divY: 0,
					recid: n[0].recid,
					column: n[0].column,
					originalRange: [{
						recid: n[0].recid,
						column: n[0].column
					},
					{
						recid: n[n.length - 1].recid,
						column: n[n.length - 1].column
					}],
					newRange: [{
						recid: n[0].recid,
						column: n[0].column
					},
					{
						recid: n[n.length - 1].recid,
						column: n[n.length - 1].column
					}]
				};
				$(document).off("mousemove", p).on("mousemove", p);
				$(document).off("mouseup", d).on("mouseup", d)
			}
			function p(t) {
				var n = e.last.move;
				if (!n || n.type != "expand") return;
				n.divX = t.screenX - n.x;
				n.divY = t.screenY - n.y;
				var r, i;
				var s = t.originalEvent.target;
				if (s.tagName != "TD") s = $(s).parents("td")[0];
				if (typeof $(s).attr("col") != "undefined") i = parseInt($(s).attr("col"));
				s = $(s).parents("tr")[0];
				r = $(s).attr("recid");
				if (n.newRange[1].recid == r && n.newRange[1].column == i) return;
				var o = $.extend({}, n.newRange);
				n.newRange = [{
					recid: n.recid,
					column: n.column
				},
				{
					recid: r,
					column: i
				}];
				c = e.trigger($.extend(c, {
					originalRange: n.originalRange,
					newRange: n.newRange
				}));
				if (c.isCancelled === true) {
					n.newRange = o;
					c.newRange = o;
					return
				} else {
					e.removeRange("grid-selection-expand");
					e.addRange({
						name: "grid-selection-expand",
						range: c.newRange,
						style: "background-color: rgba(100,100,100,0.1); border: 2px dotted rgba(100,100,100,0.5);"
					})
				}
			}
			function d(t) {
				e.removeRange("grid-selection-expand");
				delete e.last.move;
				$(document).off("mousemove", p);
				$(document).off("mouseup", d);
				e.trigger($.extend(c, {
					phase: "after"
				}))
			}
			var e = this;
			var t = (new Date).getTime();
			var n = $("#grid_" + this.name + "_records");
			for (var r in this.ranges) {
				var i = this.ranges[r];
				var s = i.range[0];
				var o = i.range[1];
				var u = $("#grid_" + this.name + "_rec_" + s.recid + " td[col=" + s.column + "]");
				var a = $("#grid_" + this.name + "_rec_" + o.recid + " td[col=" + o.column + "]");
				var f = $("#grid_" + this.name + "_rec_top").next().find("td.w2ui-selected");
				var l = $("#grid_" + this.name + "_rec_bottom").prev().find("td.w2ui-selected");
				if ($("#grid_" + this.name + "_" + i.name).length == 0) {
					n.append('<div id="grid_' + this.name + "_" + i.name + '" class="w2ui-selection" style="' + i.style + '">' + (i.name == "selection" ? '<div id="grid_' + this.name + '_resizer" class="w2ui-selection-resizer"></div>' : "") + "</div>")
				} else {
					$("#grid_" + this.name + "_" + i.name).attr("style", i.style)
				}
				if (u.length == 0 && a.length != 0 || f.length > 0) {
					u = $("#grid_" + this.name + "_rec_top").next().find("td[col=" + s.column + "]")
				}
				if (a.length == 0 && u.length != 0 || l.length > 0) {
					a = $("#grid_" + this.name + "_rec_bottom").prev().find("td[col=" + o.column + "]")
				}
				if (u.length > 0 && a.length > 0) {
					$("#grid_" + this.name + "_" + i.name).show().css({
						left: u.position().left - 1 + n.scrollLeft() + "px",
						top: u.position().top - 1 + n.scrollTop() + "px",
						width: a.position().left - u.position().left + a.width() + 3 + "px",
						height: a.position().top - u.position().top + a.height() + 3 + "px"
					})
				} else {
					$("#grid_" + this.name + "_" + i.name).hide()
				}
			}
			$(this.box).find("#grid_" + this.name + "_resizer").off("mousedown").on("mousedown", h);
			var c = {
				phase: "before",
				type: "selectionExtend",
				target: e.name,
				originalRange: null,
				newRange: null
			};
			return (new Date).getTime() - t
		},
		select: function () {
			if (arguments.length == 0) return 0;
			var e = (new Date).getTime();
			var t = 0;
			var n = this.last.selection;
			if (!this.multiSelect) this.selectNone();
			var r = {
				phase: "before",
				type: "select",
				target: this.name
			};
			if (arguments.length == 1) {
				r.multiple = false;
				if ($.isPlainObject(arguments[0])) {
					r.recid = arguments[0].recid;
					r.column = arguments[0].column
				} else {
					r.recid = arguments[0]
				}
			} else {
				r.multiple = true;
				r.recids = Array.prototype.slice.call(arguments, 0)
			}
			var i = this.trigger(r);
			if (i.isCancelled === true) return 0;
			if (this.selectType == "row") {
				for (var s = 0; s < arguments.length; s++) {
					var o = typeof arguments[s] == "object" ? arguments[s].recid : arguments[s];
					var u = this.get(o, true);
					if (u == null) continue;
					var a = null;
					if (this.searchData.length !== 0 || u + 1 >= this.last.range_start && u + 1 <= this.last.range_end) {
						a = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(o))
					}
					if (this.selectType == "row") {
						if (n.indexes.indexOf(u) != -1) continue;
						n.indexes.push(u);
						if (a) {
							a.addClass("w2ui-selected").data("selected", "yes").find(".w2ui-col-number").addClass("w2ui-row-selected");
							a.find(".w2ui-grid-select-check").prop("checked", true)
						}
						t++
					}
				}
			} else {
				var f = {};
				for (var s = 0; s < arguments.length; s++) {
					var o = typeof arguments[s] == "object" ? arguments[s].recid : arguments[s];
					var l = typeof arguments[s] == "object" ? arguments[s].column : null;
					f[o] = f[o] || [];
					if (w2utils.isInt(l)) {
						f[o].push(l)
					} else {
						for (var c in this.columns) {
							if (this.columns[c].hidden) continue;
							f[o].push(parseInt(c))
						}
					}
				}
				var h = [];
				for (var o in f) {
					var u = this.get(o, true);
					if (u == null) continue;
					var a = null;
					if (u + 1 >= this.last.range_start && u + 1 <= this.last.range_end) {
						a = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(o))
					}
					var p = n.columns[u] || [];
					if (n.indexes.indexOf(u) == -1) {
						n.indexes.push(u)
					}
					for (var d = 0; d < f[o].length; d++) {
						if (p.indexOf(f[o][d]) == -1) p.push(f[o][d])
					}
					p.sort(function (e, t) {
						return e - t
					});
					for (var d = 0; d < f[o].length; d++) {
						var v = f[o][d];
						if (h.indexOf(v) == -1) h.push(v);
						if (a) {
							a.find("#grid_" + this.name + "_data_" + u + "_" + v).addClass("w2ui-selected");
							a.find(".w2ui-col-number").addClass("w2ui-row-selected");
							a.data("selected", "yes");
							a.find(".w2ui-grid-select-check").prop("checked", true)
						}
						t++
					}
					n.columns[u] = p
				}
				for (var c = 0; c < h.length; c++) {
					$(this.box).find("#grid_" + this.name + "_column_" + h[c] + " .w2ui-col-header").addClass("w2ui-col-selected")
				}
			}
			n.indexes.sort(function (e, t) {
				return e - t
			});
			if (n.indexes.length == this.records.length || this.searchData.length !== 0 && n.indexes.length == this.last.searchIds.length) {
				$("#grid_" + this.name + "_check_all").prop("checked", true)
			} else {
				$("#grid_" + this.name + "_check_all").prop("checked", false)
			}
			this.status();
			this.addRange("selection");
			this.trigger($.extend(i, {
				phase: "after"
			}));
			return t
		},
		unselect: function () {
			var e = 0;
			var t = this.last.selection;
			for (var n = 0; n < arguments.length; n++) {
				var r = typeof arguments[n] == "object" ? arguments[n].recid : arguments[n];
				var i = this.get(r);
				if (i == null) continue;
				var s = this.get(i.recid, true);
				var o = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(r));
				if (this.selectType == "row") {
					if (t.indexes.indexOf(s) == -1) continue;
					var u = this.trigger({
						phase: "before",
						type: "unselect",
						target: this.name,
						recid: r,
						index: s
					});
					if (u.isCancelled === true) continue;
					t.indexes.splice(t.indexes.indexOf(s), 1);
					o.removeClass("w2ui-selected").removeData("selected").find(".w2ui-col-number").removeClass("w2ui-row-selected");
					if (o.length != 0) o[0].style.cssText = "height: " + this.recordHeight + "px; " + o.attr("custom_style");
					o.find(".w2ui-grid-select-check").prop("checked", false);
					e++
				} else {
					var a = arguments[n].column;
					if (!w2utils.isInt(a)) {
						var f = [];
						for (var l in this.columns) {
							if (this.columns[l].hidden) continue;
							f.push({
								recid: r,
								column: parseInt(l)
							})
						}
						return this.unselect.apply(this, f)
					}
					var c = t.columns[s];
					if (!$.isArray(c) || c.indexOf(a) == -1) continue;
					var u = this.trigger({
						phase: "before",
						type: "unselect",
						target: this.name,
						recid: r,
						column: a
					});
					if (u.isCancelled === true) continue;
					c.splice(c.indexOf(a), 1);
					$("#grid_" + this.name + "_rec_" + w2utils.escapeId(r)).find(" > td[col=" + a + "]").removeClass("w2ui-selected");
					var h = false;
					var p = false;
					var d = this.getSelection();
					for (var v in d) {
						if (d[v].column == a) h = true;
						if (d[v].recid == r) p = true
					}
					if (!h) {
						$(this.box).find(".w2ui-grid-columns td[col=" + a + "] .w2ui-col-header").removeClass("w2ui-col-selected")
					}
					if (!p) {
						$("#grid_" + this.name + "_rec_" + w2utils.escapeId(r)).find(".w2ui-col-number").removeClass("w2ui-row-selected")
					}
					e++;
					if (c.length == 0) {
						delete t.columns[s];
						t.indexes.splice(t.indexes.indexOf(s), 1);
						o.removeData("selected");
						o.find(".w2ui-grid-select-check").prop("checked", false)
					}
				}
				this.trigger($.extend(u, {
					phase: "after"
				}))
			}
			if (t.indexes.length == this.records.length || this.searchData.length !== 0 && t.indexes.length == this.last.searchIds.length) {
				$("#grid_" + this.name + "_check_all").prop("checked", true)
			} else {
				$("#grid_" + this.name + "_check_all").prop("checked", false)
			}
			this.status();
			this.addRange("selection");
			return e
		},
		selectAll: function () {
			var e = (new Date).getTime();
			if (this.multiSelect === false) return;
			var t = this.trigger({
				phase: "before",
				type: "select",
				target: this.name,
				all: true
			});
			if (t.isCancelled === true) return;
			var n = typeof this.url != "object" ? this.url : this.url.get;
			var r = this.last.selection;
			var i = [];
			for (var s in this.columns) i.push(parseInt(s));
			r.indexes = [];
			if (!n && this.searchData.length !== 0) {
				for (var o = 0; o < this.last.searchIds.length; o++) {
					r.indexes.push(this.last.searchIds[o]);
					if (this.selectType != "row") r.columns[this.last.searchIds[o]] = i.slice()
				}
			} else {
				var u = this.records.length;
				if (this.searchData.length != 0 && !this.url) u = this.last.searchIds.length;
				for (var o = 0; o < u; o++) {
					r.indexes.push(o);
					if (this.selectType != "row") r.columns[o] = i.slice()
				}
			}
			if (this.selectType == "row") {
				//console.log("fdddd");  
				$(this.box).find(".w2ui-grid-records tr").not(".w2ui-empty-record").addClass("w2ui-selected").data("selected", "yes").find(".w2ui-col-number").addClass("w2ui-row-selected");
				$(this.box).find("input.w2ui-grid-select-check").prop("checked", true)
			} else {
				$(this.box).find(".w2ui-grid-columns td .w2ui-col-header").addClass("w2ui-col-selected");
				$(this.box).find(".w2ui-grid-records tr .w2ui-col-number").addClass("w2ui-row-selected");
				$(this.box).find(".w2ui-grid-records tr").not(".w2ui-empty-record").find(".w2ui-grid-data").not(".w2ui-col-select").addClass("w2ui-selected").data("selected", "yes");
				$(this.box).find("input.w2ui-grid-select-check").prop("checked", true)
			}
			var r = this.getSelection();
			if (r.length == 1) this.toolbar.enable("w2ui-edit");
			else this.toolbar.disable("w2ui-edit");
			if (r.length >= 1) this.toolbar.enable("w2ui-delete");
			else this.toolbar.disable("w2ui-delete");
			this.addRange("selection");
			$("#grid_" + this.name + "_check_all").prop("checked", true);
			this.trigger($.extend(t, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		selectNone: function () {
			var e = (new Date).getTime();
			var t = this.trigger({
				phase: "before",
				type: "unselect",
				target: this.name,
				all: true
			});
			if (t.isCancelled === true) return;
			var n = this.last.selection;
			if (this.selectType == "row") {
				$(this.box).find(".w2ui-grid-records tr.w2ui-selected").removeClass("w2ui-selected").removeData("selected").find(".w2ui-col-number").removeClass("w2ui-row-selected");
				$(this.box).find("input.w2ui-grid-select-check").prop("checked", false)
			} else {
				$(this.box).find(".w2ui-grid-columns td .w2ui-col-header").removeClass("w2ui-col-selected");
				$(this.box).find(".w2ui-grid-records tr .w2ui-col-number").removeClass("w2ui-row-selected");
				$(this.box).find(".w2ui-grid-data.w2ui-selected").removeClass("w2ui-selected").removeData("selected");
				$(this.box).find("input.w2ui-grid-select-check").prop("checked", false)
			}
			n.indexes = [];
			n.columns = {};
			this.toolbar.disable("w2ui-edit", "w2ui-delete");
			this.removeRange("selection");
			$("#grid_" + this.name + "_check_all").prop("checked", false);
			this.trigger($.extend(t, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		getSelection: function (e) {
			var t = [];
			var n = this.last.selection;
			if (this.selectType == "row") {
				for (var r in n.indexes) {
					if (!this.records[n.indexes[r]]) continue;
					if (e === true) t.push(n.indexes[r]);
					else t.push(this.records[n.indexes[r]].recid)
				}
				return t
			} else {
				for (var r in n.indexes) {
					var i = n.columns[n.indexes[r]];
					if (!this.records[n.indexes[r]]) continue;
					for (var s in i) {
						t.push({
							recid: this.records[n.indexes[r]].recid,
							index: parseInt(n.indexes[r]),
							column: i[s]
						})
					}
				}
				return t
			}
		},
		search: function (e, t) {
			var n = this;
			var r = typeof this.url != "object" ? this.url : this.url.get;
			var i = [];
			var s = this.last.multi;
			var o = this.last.logic;
			var u = this.last.field;
			var a = this.last.search;
			if (arguments.length == 0) {
				a = "";
				for (var f in this.searches) {
					var l = this.searches[f];
					var c = $("#grid_" + this.name + "_operator_" + f).val();
					var h = $("#grid_" + this.name + "_field_" + f);
					var p = $("#grid_" + this.name + "_field2_" + f);
					var d = h.val();
					var v = p.val();
					var m = null;
					if (["int", "float", "money", "currency", "percent"].indexOf(l.type) != -1) {
						var g = h.data("w2field");
						var y = p.data("w2field");
						if (g) d = g.clean(d);
						if (y) v = y.clean(v)
					}
					if (["list", "enum"].indexOf(l.type) != -1) {
						d = h.data("selected") || {};
						if ($.isArray(d)) {
							m = [];
							for (var b in d) {
								m.push(w2utils.isFloat(d[b].id) ? parseFloat(d[b].id) : String(d[b].id).toLowerCase());
								delete d[b].hidden
							}
						} else {
							d = d.id || ""
						}
						if ($.isEmptyObject(d)) d = ""
					}
					if (d !== "" && d != null || typeof v != "undefined" && v !== "") {
						var w = {
							field: l.field,
							type: l.type,
							operator: c
						};
						if (c == "between") {
							$.extend(w, {
								value: [d, v]
							})
						} else if (c == "in" && typeof d == "string") {
							$.extend(w, {
								value: d.split(",")
							})
						} else if (c == "not in" && typeof d == "string") {
							$.extend(w, {
								value: d.split(",")
							})
						} else {
							$.extend(w, {
								value: d
							})
						}
						if (m) $.extend(w, {
							svalue: m
						});
						try {
							if (l.type == "date" && c == "between") {
								w.value[0] = d;
								w.value[1] = v
							}
							if (l.type == "date" && c == "is") {
								w.value = d
							}
						} catch (E) {}
						i.push(w)
					}
				}
				if (i.length > 0 && !r) {
					s = true;
					o = "AND"
				} else {
					s = true;
					o = "AND"
				}
			}
			if (typeof e == "string") {
				u = e;
				a = t;
				s = false;
				o = "OR";
				if (typeof t != "undefined") {
					if (e.toLowerCase() == "all") {
						if (this.searches.length > 0) {
							for (var f in this.searches) {
								var l = this.searches[f];
								if (l.type == "text" || l.type == "alphanumeric" && w2utils.isAlphaNumeric(t) || l.type == "int" && w2utils.isInt(t) || l.type == "float" && w2utils.isFloat(t) || l.type == "percent" && w2utils.isFloat(t) || l.type == "hex" && w2utils.isHex(t) || l.type == "currency" && w2utils.isMoney(t) || l.type == "money" && w2utils.isMoney(t) || l.type == "date" && w2utils.isDate(t)) {
									var w = {
										field: l.field,
										type: l.type,
										operator: l.type == "text" ? "contains" : "is",
										value: t
									};
									i.push(w)
								}
								if (["int", "float", "money", "currency", "percent"].indexOf(l.type) != -1 && String(t).indexOf("-") != -1) {
									var S = String(t).split("-");
									var w = {
										field: l.field,
										type: l.type,
										operator: "between",
										value: [S[0], S[1]]
									};
									i.push(w)
								}
							}
						} else {
							for (var x in this.columns) {
								var w = {
									field: this.columns[x].field,
									type: "text",
									operator: "contains",
									value: t
								};
								i.push(w)
							}
						}
					} else {
						var T = $("#grid_" + this.name + "_search_all");
						var l = this.getSearch(e);
						if (l == null) l = {
							field: e,
							type: "text"
						};
						if (l.field == e) this.last.caption = l.caption;
						if (t !== "") {
							var N = "contains";
							var C = t;
							if (["date", "time"].indexOf(l.type) != -1) N = "is";
							if (["list", "enum"].indexOf(l.type) != -1) {
								N = "is";
								var w = T.data("selected");
								if (w && !$.isEmptyObject(w)) C = w.id;
								else C = ""
							}
							if (l.type == "int" && t !== "") {
								N = "is";
								if (String(t).indexOf("-") != -1) {
									var w = t.split("-");
									if (w.length == 2) {
										N = "between";
										C = [parseInt(w[0]), parseInt(w[1])]
									}
								}
								if (String(t).indexOf(",") != -1) {
									var w = t.split(",");
									N = "in";
									C = [];
									for (var S in w) C.push(w[S])
								}
							}
							var w = {
								field: l.field,
								type: l.type,
								operator: N,
								value: C
							};
							i.push(w)
						}
					}
				}
			}
			if ($.isArray(e)) {
				var k = "AND";
				if (typeof t == "string") {
					k = t.toUpperCase();
					if (k != "OR" && k != "AND") k = "AND"
				}
				a = "";
				s = true;
				o = k;
				for (var L in e) {
					var A = e[L];
					var l = this.getSearch(A.field);
					if (l == null) l = {
						type: "text",
						operator: "contains"
					};
					if ($.isArray(A.value)) {
						for (var b in A.value) {
							if (typeof A.value[b] == "string") A.value[b] = A.value[b].toLowerCase()
						}
					}
					i.push($.extend(true, {}, l, A))
				}
			}
			var O = this.trigger({
				phase: "before",
				type: "search",
				target: this.name,
				searchData: i,
				searchField: e ? e : "multi",
				searchValue: t ? t : "multi"
			});
			if (O.isCancelled === true) return;
			this.searchData = O.searchData;
			this.last.field = u;
			this.last.search = a;
			this.last.multi = s;
			this.last.logic = o;
			this.last.scrollTop = 0;
			this.last.scrollLeft = 0;
			this.last.selection.indexes = [];
			this.last.selection.columns = {};
			this.searchClose();
			this.set({
				expanded: false
			}, true);
			if (r) {
				this.last.xhr_offset = 0;
				this.reload()
			} else {
				this.localSearch();
				this.refresh()
			}
			this.trigger($.extend(O, {
				phase: "after"
			}))
		},
		searchOpen: function () {
			if (!this.box) return;
			if (this.searches.length == 0) return;
			var e = this;
			$("#tb_" + this.name + "_toolbar_item_w2ui-search-advanced").w2overlay(this.getSearchesHTML(), {
				name: "searches-" + this.name,
				left: -10,
				"class": "w2ui-grid-searches",
				onShow: function () {
					if (e.last.logic == "OR") e.searchData = [];
					e.initSearches();
					$("#w2ui-overlay-searches-" + this.name + " .w2ui-grid-searches").data("grid-name", e.name);
					var t = $("#w2ui-overlay-searches-" + this.name + " .w2ui-grid-searches *[rel=search]");
					if (t.length > 0) t[0].focus()
				}
			})
		},
		searchClose: function () {
			if (!this.box) return;
			if (this.searches.length == 0) return;
			if (this.toolbar) this.toolbar.uncheck("w2ui-search-advanced");
			if ($("#w2ui-overlay-searches-" + this.name + " .w2ui-grid-searches").length > 0) {
				$().w2overlay("", {
					name: "searches-" + this.name
				})
			}
		},
		searchReset: function (e) {
			var t = this.trigger({
				phase: "before",
				type: "search",
				target: this.name,
				searchData: []
			});
			if (t.isCancelled === true) return;
			this.searchData = [];
			this.last.search = "";
			this.last.logic = "OR";
			if (this.last.multi) {
				if (!this.multiSearch) {
					this.last.field = this.searches[0].field;
					this.last.caption = this.searches[0].caption
				} else {
					this.last.field = "all";
					this.last.caption = w2utils.lang("All Fields")
				}
			}
			this.last.multi = false;
			this.last.xhr_offset = 0;
			this.last.scrollTop = 0;
			this.last.scrollLeft = 0;
			this.last.selection.indexes = [];
			this.last.selection.columns = {};
			this.searchClose();
			$("#grid_" + this.name + "_search_all").val("");
			if (!e) this.reload();
			this.trigger($.extend(t, {
				phase: "after"
			}))
		},
		searchShowFields: function () {
			var e = $("#grid_" + this.name + "_search_all");
			var t = '<div class="w2ui-select-field"><table>';
			for (var n = -1; n < this.searches.length; n++) {
				var r = this.searches[n];
				if (n == -1) {
					if (!this.multiSearch) continue;
					r = {
						field: "all",
						caption: w2utils.lang("All Fields")
					}
				} else {
					if (this.searches[n].hidden === true) continue
				}
				t += "<tr " + (w2utils.isIOS ? "onTouchStart" : "onClick") + "=\"w2ui['" + this.name + "'].initAllField('" + r.field + "')\">" + '    <td><input type="radio" tabIndex="-1" ' + (r.field == this.last.field ? "checked" : "") + "></td>" + "    <td>" + r.caption + "</td>" + "</tr>"
			}
			t += "</table></div>";
			setTimeout(function () {
				$(e).w2overlay(t, {
					left: -10
				})
			}, 1)
		},
		initAllField: function (e, t) {
			var n = $("#grid_" + this.name + "_search_all");
			if (e == "all") {
				var r = {
					field: "all",
					caption: w2utils.lang("All Fields")
				};
				n.w2field("clear");
				n.change().focus()
			} else {
				var r = this.getSearch(e);
				if (r == null) return;
				var i = r.type;
				if (["enum", "select"].indexOf(i) != -1) i = "list";
				n.w2field(i, $.extend({}, r.options, {
					suffix: "",
					autoFormat: false,
					selected: t
				}));
				if (["list", "enum", "date", "time"].indexOf(r.type) != -1) {
					this.last.search = "";
					this.last.item = "";
					n.val("")
				}
				setTimeout(function () {
					if (t !== null) n.focus()
				}, 1)
			}
			if (this.last.search != "") {
				this.search(r.field, this.last.search)
			} else {
				this.last.field = r.field;
				this.last.caption = r.caption
			}
			n.attr("placeholder", r.caption);
			$().w2overlay()
		},
		clear: function (e) {
			this.records = [];
			this.summary = [];
			this.last.scrollTop = 0;
			this.last.scrollLeft = 0;
			this.last.selection.indexes = [];
			this.last.selection.columns = {};
			this.last.range_start = null;
			this.last.range_end = null;
			this.last.xhr_offset = 0;
			if (!e) this.refresh()
		},
		reset: function (e) {
			this.last.scrollTop = 0;
			this.last.scrollLeft = 0;
			this.last.selection.indexes = [];
			this.last.selection.columns = {};
			this.last.range_start = null;
			this.last.range_end = null;
			this.last.xhr_offset = 0;
			if (this.last.sortData != null) this.sortData = this.last.sortData;
			this.set({
				expanded: false
			}, true);
			if (!e) this.refresh()
		},
		skip: function (e) {
			var t = typeof this.url != "object" ? this.url : this.url.get;
			if (t) {
				this.offset = parseInt(e);
				if (this.offset > this.total) this.offset = this.total - this.limit;
				if (this.offset < 0 || !w2utils.isInt(this.offset)) this.offset = 0;
				this.records = [];
				this.last.xhr_offset = 0;
				this.last.pull_more = true;
				this.last.scrollTop = 0;
				this.last.scrollLeft = 0;
				$("#grid_" + this.name + "_records").prop("scrollTop", 0);
				this.reload()
			} else {
				console.log("ERROR: grid.skip() can only be called when you have remote data source.")
			}
		},
		load: function (e, t) {
			if (typeof e == "undefined") {
				console.log('ERROR: You need to provide url argument when calling .load() method of "' + this.name + '" object.');
				return
			}
			this.request("get-records", {}, e, t)
		},
		reload: function (e) {
			var t = typeof this.url != "object" ? this.url : this.url.get;
			if (t) {
				this.clear(true);
				this.request("get-records", {}, null, e)
			} else {
				this.last.scrollTop = 0;
				this.last.scrollLeft = 0;
				this.last.range_start = null;
				this.last.range_end = null;
				this.localSearch();
				this.refresh();
				if (typeof e == "function") e({
					status: "success"
				})
			}
		},
		request: function (e, t, n, r) {
			if (typeof t == "undefined") t = {};
			if (typeof n == "undefined" || n == "" || n == null) n = this.url;
			if (n == "" || n == null) return;
			var i = {};
			if (!w2utils.isInt(this.offset)) this.offset = 0;
			if (!w2utils.isInt(this.last.xhr_offset)) this.last.xhr_offset = 0;
			i["cmd"] = e;
			i["selected"] = this.getSelection();
			i["limit"] = this.limit;
			i["offset"] = parseInt(this.offset) + this.last.xhr_offset;
			i["search"] = this.searchData;
			i["searchLogic"] = this.last.logic;
			i["sort"] = this.sortData;
			if (this.searchData.length == 0) {
				delete i["search"];
				delete i["searchLogic"]
			}
			if (this.sortData.length == 0) {
				delete i["sort"]
			}
			$.extend(i, this.postData);
			$.extend(i, t);
			if (e == "get-records") {
				var s = this.trigger({
					phase: "before",
					type: "request",
					target: this.name,
					url: n,
					postData: i
				});
				if (s.isCancelled === true) {
					if (typeof r == "function") r({
						status: "error",
						message: "Request aborted."
					});
					return
				}
			} else {
				var s = {
					url: n,
					postData: i
				}
			}
			var o = this;
			if (this.last.xhr_offset == 0) {
				this.lock(this.msgRefresh, true)
			} else {
				var u = $("#grid_" + this.name + "_rec_more");
				if (this.autoLoad === true) {
					u.show().find("td").html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>')
				} else {  
					u.find("td").html("<div>" + w2utils.lang("Load") + " " + o.limit + " " + w2utils.lang("More") + "...</div>")
				}
			}
			if (this.last.xhr) try {
				this.last.xhr.abort()
			} catch (a) {}
			var n = typeof s.url != "object" ? s.url : s.url.get;
			if (i.cmd == "save-records" && typeof s.url == "object") n = s.url.save;
			if (i.cmd == "delete-records" && typeof s.url == "object") n = s.url.remove;
			if (!$.isEmptyObject(o.routeData)) {
				var f = w2utils.parseRoute(n);
				if (f.keys.length > 0) {
					for (var l = 0; l < f.keys.length; l++) {
						if (o.routeData[f.keys[l].name] == null) continue;
						n = n.replace(new RegExp(":" + f.keys[l].name, "g"), o.routeData[f.keys[l].name])
					}
				}
			}
			var c = {
				type: "POST",
				url: n,
				data: s.postData,
				dataType: "text"
			};
			if (w2utils.settings.dataType == "HTTP") {
				c.data = typeof c.data == "object" ? String($.param(c.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]") : c.data
			}
			if (w2utils.settings.dataType == "RESTFULL") {
				c.type = "GET";
				if (i.cmd == "save-records") c.type = "PUT";
				if (i.cmd == "delete-records") c.type = "DELETE";
				c.data = typeof c.data == "object" ? String($.param(c.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]") : c.data
			}
			if (w2utils.settings.dataType == "JSON") {
				c.type = "POST";
				c.data = JSON.stringify(c.data);
				c.contentType = "application/json"
			}
			if (this.method) c.type = this.method;
			this.last.xhr_cmd = i.cmd;
			this.last.xhr_start = (new Date).getTime();
			this.last.xhr = $.ajax(c).done(function (t, n, i) {
				o.requestComplete(n, e, r)
			}).fail(function (t, n, i) {
				var s = {
					status: n,
					error: i,
					rawResponseText: t.responseText
				};
				var u = o.trigger({
					phase: "before",
					type: "error",
					error: s,
					xhr: t
				});
				if (u.isCancelled === true) return;
				if (n != "abort") {
					var a;
					try {
						a = $.parseJSON(t.responseText)
					} catch (f) {}
					console.log("ERROR: Server communication failed.", "\n   EXPECTED:", {
						status: "success",
						total: 5,
						records: [{
							recid: 1,
							field: "value"
						}]
					}, "\n         OR:", {
						status: "error",
						message: "error message"
					}, "\n   RECEIVED:", typeof a == "object" ? a : t.responseText);
					o.requestComplete("error", e, r)
				}
				o.trigger($.extend(u, {
					phase: "after"
				}))
			});
			if (e == "get-records") {
				this.trigger($.extend(s, {
					phase: "after"
				}))
			}
		},
		requestComplete: function (status, cmd, callBack) {
			var obj = this;
			this.unlock();
			setTimeout(function () {
				if (obj.show.statusResponse) obj.status(w2utils.lang("Server Response") + " " + ((new Date).getTime() - obj.last.xhr_start) / 1e3 + " " + w2utils.lang("sec"))
			}, 10);
			this.last.pull_more = false;
			this.last.pull_refresh = true;
			var event_name = "load";
			if (this.last.xhr_cmd == "save-records") event_name = "save";
			if (this.last.xhr_cmd == "delete-records") event_name = "deleted";
			var eventData = this.trigger({
				phase: "before",
				target: this.name,
				type: event_name,
				xhr: this.last.xhr,
				status: status
			});
			if (eventData.isCancelled === true) {
				if (typeof callBack == "function") callBack({
					status: "error",
					message: "Request aborted."
				});
				return
			}
			var data;
			var responseText = this.last.xhr.responseText;
			if (status != "error") {
				if (typeof responseText != "undefined" && responseText != "") {
					if (typeof responseText == "object") {
						data = responseText
					} else {
						if (typeof obj.parser == "function") {
							data = obj.parser(responseText);
							if (typeof data != "object") {
								console.log("ERROR: Your parser did not return proper object")
							}
						} else {
							try {
								eval("data = " + responseText)
							} catch (e) {}
						}
					}
					if (obj.recid) {
						for (var r in data.records) {
							data.records[r]["recid"] = data.records[r][obj.recid]
						}
					}
					if (typeof data == "undefined") {
						data = {
							status: "error",
							message: this.msgNotJSON,
							responseText: responseText
						}
					}
					if (data["status"] == "error") {
						obj.error(data["message"])
					} else {
						if (cmd == "get-records") {
							if (this.last.xhr_offset == 0) {
								this.records = [];
								this.summary = [];
								delete data.status;
								$.extend(true, this, data)
							} else {
								if (parseInt(data.total) != parseInt(this.total)) {
									w2alert(this.msgNeedReload);
									delete this.last.xhr_offset;
									this.reload();
									return
								}
								var records = data.records;
								delete data.records;
								delete data.status;
								$.extend(true, this, data);
								for (var r = 0; r < records.length; r++) {
									this.records.push(records[r])
								}
							}
						}
						if (cmd == "delete-records") {
							this.reset();
							this.reload();
							return
						}
					}
				}
			} else {
				data = {
					status: "error",
					message: this.msgAJAXerror,
					responseText: responseText
				};
				obj.error(this.msgAJAXerror)
			}
			var url = typeof this.url != "object" ? this.url : this.url.get;
			if (!url) {
				this.localSort();
				this.localSearch()
			}
			this.total = parseInt(this.total);
			this.trigger($.extend(eventData, {
				phase: "after"
			}));
			if (this.last.xhr_offset == 0) this.refresh();
			else this.scroll();
			if (typeof callBack == "function") callBack(data)
		},
		error: function (e) {
			var t = this;
			var n = this.trigger({
				target: this.name,
				type: "error",
				message: e,
				xhr: this.last.xhr
			});
			if (n.isCancelled === true) {
				if (typeof callBack == "function") callBack({
					status: "error",
					message: "Request aborted."
				});
				return
			}
			w2alert(e, "Error");
			this.trigger($.extend(n, {
				phase: "after"
			}))
		},
		getChanges: function () {
			var e = [];
			for (var t = 0; t < this.records.length; t++) {
				var n = this.records[t];
				if (typeof n["changes"] != "undefined") {
					e.push($.extend(true, {
						recid: n.recid
					}, n.changes))
				}
			}
			return e
		},
		mergeChanges: function () {
			var changes = this.getChanges();
			for (var c = 0; c < changes.length; c++) {
				var record = this.get(changes[c].recid);
				for (var s in changes[c]) {
					if (s == "recid") continue;
					try {
						eval("record." + s + " = changes[c][s]")
					} catch (e) {}
					delete record.changes
				}
			}
			this.refresh()
		},
		save: function () {
			var e = this;
			var t = this.getChanges();
			var n = this.trigger({
				phase: "before",
				target: this.name,
				type: "submit",
				changes: t
			});
			if (n.isCancelled === true) return;
			var r = typeof this.url != "object" ? this.url : this.url.save;
			if (r) {
				this.request("save-records", {
					changes: n.changes
				}, null, function (t) {
					if (t.status !== "error") {
						e.mergeChanges()
					}
					e.trigger($.extend(n, {
						phase: "after"
					}))
				})
			} else {
				this.mergeChanges();
				this.trigger($.extend(n, {
					phase: "after"
				}))
			}
		},
		editField: function (e, t, n, r) {
			var i = this;
			var s = i.get(e, true);
			var o = i.records[s];
			var u = i.columns[t];
			var a = u ? u.editable : null;
			if (!o || !u || !a || o.editable === false) return;
			if (["enum", "file"].indexOf(a.type) != -1) {
				console.log('ERROR: input types "enum" and "file" are not supported in inline editing.');
				return
			}
			var f = i.trigger({
				phase: "before",
				type: "editField",
				target: i.name,
				recid: e,
				column: t,
				value: n,
				index: s,
				originalEvent: r
			});
			if (f.isCancelled === true) return;
			n = f.value;
			this.selectNone();
			this.select({
				recid: e,
				column: t
			});
			this.last.edit_col = t;
			if (["checkbox", "check"].indexOf(a.type) != -1) return;
			var l = $("#grid_" + i.name + "_rec_" + w2utils.escapeId(e));
			var c = l.find("[col=" + t + "] > div");
			if (typeof a.inTag == "undefined") a.inTag = "";
			if (typeof a.outTag == "undefined") a.outTag = "";
			if (typeof a.style == "undefined") a.style = "";
			if (typeof a.items == "undefined") a.items = [];
			var h = o.changes && typeof o.changes[u.field] != "undefined" ? w2utils.stripTags(o.changes[u.field]) : w2utils.stripTags(o[u.field]);
			if (h == null || typeof h == "undefined") h = "";
			if (typeof n != "undefined" && n != null) h = n;
			var p = typeof u.style != "undefined" ? u.style + ";" : "";
			if (typeof u.render == "string" && ["number", "int", "float", "money", "percent"].indexOf(u.render.split(":")[0]) != -1) {
				p += "text-align: right;"
			}
			if (a.items.length > 0 && !$.isPlainObject(a.items[0])) {
				a.items = w2obj.field.prototype.normMenu(a.items)
			}
			if (a.type == "select") {
				var d = "";
				for (var v = 0; v < a.items.length; v++) {
					d += '<option value="' + a.items[v].id + '" ' + (a.items[v].id == h ? "selected" : "") + ">" + a.items[v].text + "</option>"
				}
				c.addClass("w2ui-editable").html('<select id="grid_' + i.name + "_edit_" + e + "_" + t + '" column="' + t + '" ' + '    style="width: 100%; ' + p + a.style + '" field="' + u.field + '" recid="' + e + '" ' + "    " + a.inTag + ">" + d + "</select>" + a.outTag);
				c.find("select").focus().on("change", function (e) {
					delete i.last.move
				}).on("blur", function (e) {
					i.editChange.call(i, this, s, t, e)
				})
			} else {
				c.addClass("w2ui-editable").html('<input id="grid_' + i.name + "_edit_" + e + "_" + t + '" ' + '    type="text" style="font-family: inherit; font-size: inherit; outline: none; ' + p + a.style + '" field="' + u.field + '" recid="' + e + '" ' + '    column="' + t + '" ' + a.inTag + ">" + a.outTag);
				if (typeof h == "number") {
					h = w2utils.formatNumber(h)
				}
				if (n == null) c.find("input").val(typeof h != "object" ? h : "");
				var m = c.find("input").get(0);
				$(m).w2field(a.type, $.extend(a, {
					selected: h
				}));
				setTimeout(function () {
					var e = m;
					if (a.type == "list") {
						e = $($(m).data("w2field").helpers.focus).find("input");
						if (typeof h != "object" && h != "") e.val(h).css({
							opacity: 1
						}).prev().css({
							opacity: 1
						})
					}
					$(e).on("blur", function (e) {
						i.editChange.call(i, m, s, t, e)
					})
				}, 10);
				if (n != null) $(m).val(typeof h != "object" ? h : "")
			}
			setTimeout(function () {
				c.find("input, select").on("click", function (e) {
					e.stopPropagation()
				}).on("keydown", function (n) {
					var r = false;
					switch (n.keyCode) {
					case 9:
						r = true;
						var a = e;
						var f = n.shiftKey ? i.prevCell(t, true) : i.nextCell(t, true);
						if (f == null) {
							var l = n.shiftKey ? i.prevRow(s) : i.nextRow(s);
							if (l != null && l != s) {
								a = i.records[l].recid;
								for (var c = 0; c < i.columns.length; c++) {
									var l = i.columns[c].editable;
									if (typeof l != "undefined" && ["checkbox", "check"].indexOf(l.type) == -1) {
										f = parseInt(c);
										if (!n.shiftKey) break
									}
								}
							}
						}
						if (a === false) a = e;
						if (f == null) f = t;
						this.blur();
						setTimeout(function () {
							if (i.selectType != "row") {
								i.selectNone();
								i.select({
									recid: a,
									column: f
								})
							} else {
								i.editField(a, f, null, n)
							}
						}, 1);
						break;
					case 13:
						this.blur();
						var h = n.shiftKey ? i.prevRow(s) : i.nextRow(s);
						if (h != null && h != s) {
							setTimeout(function () {
								if (i.selectType != "row") {
									i.selectNone();
									i.select({
										recid: i.records[h].recid,
										column: t
									})
								} else {
									i.editField(i.records[h].recid, t, null, n)
								}
							}, 100)
						}
						break;
					case 38:
						if (!n.shiftKey) break;
						r = true;
						var h = i.prevRow(s);
						if (h != s) {
							this.blur();
							setTimeout(function () {
								if (i.selectType != "row") {
									i.selectNone();
									i.select({
										recid: i.records[h].recid,
										column: t
									})
								} else {
									i.editField(i.records[h].recid, t, null, n)
								}
							}, 1)
						}
						break;
					case 40:
						if (!n.shiftKey) break;
						r = true;
						var h = i.nextRow(s);
						if (h != null && h != s) {
							this.blur();
							setTimeout(function () {
								if (i.selectType != "row") {
									i.selectNone();
									i.select({
										recid: i.records[h].recid,
										column: t
									})
								} else {
									i.editField(i.records[h].recid, t, null, n)
								}
							}, 1)
						}
						break;
					case 27:
						var p = i.parseField(o, u.field);
						if (o.changes && typeof o.changes[u.field] != "undefined") p = o.changes[u.field];
						this.value = typeof p != "undefined" ? p : "";
						this.blur();
						setTimeout(function () {
							i.select({
								recid: e,
								column: t
							})
						}, 1);
						break
					}
					if (r) if (n.preventDefault) n.preventDefault()
				});
				var r = c.find("input").focus();
				if (n != null) {
					r[0].setSelectionRange(r.val().length, r.val().length)
				} else {
					r.select()
				}
			}, 1);
			i.trigger($.extend(f, {
				phase: "after"
			}))
		},
		editChange: function (e, t, n, r) {
			var i = t < 0;
			t = t < 0 ? -t - 1 : t;
			var s = i ? this.summary : this.records;
			var o = s[t];
			var u = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(o.recid));
			var a = this.columns[n];
			var f = e.value;
			var l = this.parseField(o, a.field);
			var c = $(e).data("w2field");
			if (c) {
				f = c.clean(f);
				if (c.type == "list" && f != "") f = $(e).data("selected")
			}
			if (e.type == "checkbox") f = e.checked;
			var h = {
				phase: "before",
				type: "change",
				target: this.name,
				input_id: e.id,
				recid: o.recid,
				index: t,
				column: n,
				value_new: f,
				value_previous: o.changes && o.changes.hasOwnProperty(a.field) ? o.changes[a.field] : l,
				value_original: l
			};
			while (true) {
				f = h.value_new;
				if (typeof f != "object" && String(l) != String(f) || typeof f == "object" && (typeof l != "object" || l === null || f.id != l.id)) {
					h = this.trigger($.extend(h, {
						type: "change",
						phase: "before"
					}));
					if (h.isCancelled !== true) {
						if (f !== h.value_new) {
							continue
						}
						o.changes = o.changes || {};
						o.changes[a.field] = h.value_new;
						this.trigger($.extend(h, {
							phase: "after"
						}))
					}
				} else {
					h = this.trigger($.extend(h, {
						type: "restore",
						phase: "before"
					}));
					if (h.isCancelled !== true) {
						if (f !== h.value_new) {
							continue
						}
						if (o.changes) delete o.changes[a.field];
						if ($.isEmptyObject(o.changes)) delete o.changes;
						this.trigger($.extend(h, {
							phase: "after"
						}))
					}
				}
				break
			}
			var p = this.getCellHTML(t, n, i);
			if (!i) {
				if (o.changes && typeof o.changes[a.field] != "undefined") {
					$(u).find("[col=" + n + "]").addClass("w2ui-changed").html(p)
				} else {
					$(u).find("[col=" + n + "]").removeClass("w2ui-changed").html(p)
				}
			}
		},
		"delete": function (e) {
			var t = (new Date).getTime();
			var n = this;
			var r = this.trigger({
				phase: "before",
				target: this.name,
				type: "delete",
				force: e
			});
			if (r.isCancelled === true) return;
			e = r.force;
			var i = this.getSelection();
			if (i.length == 0) return;
			if (this.msgDelete != "" && !e) {
				w2confirm({
					title: w2utils.lang("Delete Confirmation"),
					msg: n.msgDelete,
					yes_class: "btn-red",
					callBack: function (e) {
						if (e == "Yes") w2ui[n.name]["delete"](true)
					}
				});
				return
			}
			var s = typeof this.url != "object" ? this.url : this.url.remove;
			if (s) {
				this.request("delete-records")
			} else {
				this.selectNone();
				if (typeof i[0] != "object") {
					this.remove.apply(this, i)
				} else {
					for (var o = 0; o < i.length; o++) {
						var u = this.columns[i[o].column].field;
						var a = this.get(i[o].recid, true);
						var f = this.records[a];
						if (a != null && u != "recid") {
							this.records[a][u] = "";
							if (f.changes) delete f.changes[u]
						}
					}
					this.update()
				}
			}
			this.trigger($.extend(r, {
				phase: "after"
			}))
		},
		click: function (e, t) {
			var n = (new Date).getTime();
			var r = null;
			if (this.last.cancelClick == true || t && t.altKey) return;
			if (typeof e == "object") {
				r = e.column;
				e = e.recid
			}
			if (typeof t == "undefined") t = {};
			if (n - parseInt(this.last.click_time) < 350 && t.type == "click") {
				this.dblClick(e, t);
				return
			}
			this.last.click_time = n;
			if (r == null && t.target) {
				var i = t.target;
				if (i.tagName != "TD") i = $(i).parents("td")[0];
				if (typeof $(i).attr("col") != "undefined") r = parseInt($(i).attr("col"))
			}
			var s = this.trigger({
				phase: "before",
				target: this.name,
				type: "click",
				recid: e,
				column: r,
				originalEvent: t
			});
			if (s.isCancelled === true) return;
			var o = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(e)).parents("tr");
			if (o.length > 0 && String(o.attr("id")).indexOf("expanded_row") != -1) {
				var u = o.parents(".w2ui-grid").attr("name");
				w2ui[u].selectNone();
				o.parents(".w2ui-grid").find(".w2ui-expanded-row .w2ui-grid").each(function (e, t) {
					var n = $(t).attr("name");
					if (w2ui[n]) w2ui[n].selectNone()
				})
			}
			$(this.box).find(".w2ui-expanded-row .w2ui-grid").each(function (e, t) {
				var n = $(t).attr("name");
				if (w2ui[n]) w2ui[n].selectNone()
			});
			var a = this;
			var f = this.getSelection();
			$("#grid_" + this.name + "_check_all").prop("checked", false);
			var l = this.get(e, true);
			var c = this.records[l];
			var h = [];
			a.last.sel_ind = l;
			a.last.sel_col = r;
			a.last.sel_recid = e;
			a.last.sel_type = "click";
			if (t.shiftKey && f.length > 0 && a.multiSelect) {
				if (f[0].recid) {
					var p = this.get(f[0].recid, true);
					var d = this.get(e, true);
					if (r > f[0].column) {
						var v = f[0].column;
						var m = r
					} else {
						var v = r;
						var m = f[0].column
					}
					for (var g = v; g <= m; g++) h.push(g)
				} else {
					var p = this.get(f[0], true);
					var d = this.get(e, true)
				}
				var y = [];
				if (p > d) {
					var i = p;
					p = d;
					d = i
				}
				var b = typeof this.url != "object" ? this.url : this.url.get;
				for (var w = p; w <= d; w++) {
					if (this.searchData.length > 0 && !b && $.inArray(w, this.last.searchIds) == -1) continue;
					if (this.selectType == "row") {
						y.push(this.records[w].recid)
					} else {
						for (var E = 0; E < h.length; E++) {
							y.push({
								recid: this.records[w].recid,
								column: h[E]
							})
						}
					}
				}
				this.select.apply(this, y)
			} else {
				var S = this.last.selection;
				var x = S.indexes.indexOf(l) != -1 ? true : false;
				if ((!t.ctrlKey && !t.shiftKey && !t.metaKey || !this.multiSelect) && !this.showSelectColumn) {
					if (this.selectType != "row" && $.inArray(r, S.columns[l]) == -1) x = false;
					if (f.length > 300) this.selectNone();
					else this.unselect.apply(this, f);
					if (x === true) {
						this.unselect({
							recid: e,
							column: r
						})
					} else {
						this.select({
							recid: e,
							column: r
						})
					}
				} else {
					if (this.selectType != "row" && $.inArray(r, S.columns[l]) == -1) x = false;
					if (x === true) {
						this.unselect({
							recid: e,
							column: r
						})
					} else {
						this.select({
							recid: e,
							column: r
						})
					}
				}
			}
			this.status();
			a.initResize();
			this.trigger($.extend(s, {
				phase: "after"
			}))
		},
		columnClick: function (e, t) {
			var n = this.trigger({
				phase: "before",
				type: "columnClick",
				target: this.name,
				field: e,
				originalEvent: t
			});
			if (n.isCancelled === true) return;
			var r = this.getColumn(e);
			if (r && r.sortable) this.sort(e, null, t && (t.ctrlKey || t.metaKey) ? true : false);
			this.trigger($.extend(n, {
				phase: "after"
			}))
		},
		focus: function (e) {
			var t = this.trigger({
				phase: "before",
				type: "focus",
				target: this.name,
				originalEvent: e
			});
			if (t.isCancelled === true) return false;
			$(this.box).find(".w2ui-selected").removeClass("w2ui-inactive");
			this.trigger($.extend(t, {
				phase: "after"
			}))
		},
		blur: function (e) {
			var t = this.trigger({
				phase: "before",
				type: "blur",
				target: this.name,
				originalEvent: e
			});
			if (t.isCancelled === true) return false;
			$(this.box).find(".w2ui-selected").addClass("w2ui-inactive");
			this.trigger($.extend(t, {
				phase: "after"
			}))
		},
		keydown: function (e) {
			function M() {
				var e = Math.floor((i[0].scrollTop + i.height() / 2.1) / t.recordHeight);
				if (!t.records[e]) e = 0;
				t.select({
					recid: t.records[e].recid,
					column: 0
				})
			}
			function _() {
				if (t.last.sel_type != "click") return false;
				if (t.selectType != "row") {
					t.last.sel_type = "key";
					if (s.length > 1) {
						for (var e = 0; e < s.length; e++) {
							if (s[e].recid == t.last.sel_recid && s[e].column == t.last.sel_col) {
								s.splice(e, 1);
								break
							}
						}
						t.unselect.apply(t, s);
						return true
					}
					return false
				} else {
					t.last.sel_type = "key";
					if (s.length > 1) {
						s.splice(s.indexOf(t.records[t.last.sel_ind].recid), 1);
						t.unselect.apply(t, s);
						return true
					}
					return false
				}
			}
			var t = this;
			if (t.keyboard !== true) return;
			var n = t.trigger({
				phase: "before",
				type: "keydown",
				target: t.name,
				originalEvent: e
			});
			if (n.isCancelled === true) return;
			var r = false;
			var i = $("#grid_" + t.name + "_records");
			var s = t.getSelection();
			if (s.length == 0) r = true;
			var o = s[0] || null;
			var u = [];
			var a = s[s.length - 1];
			if (typeof o == "object" && o != null) {
				o = s[0].recid;
				u = [];
				var f = 0;
				while (true) {
					if (!s[f] || s[f].recid != o) break;
					u.push(s[f].column);
					f++
				}
				a = s[s.length - 1].recid
			}
			var l = t.get(o, true);
			var c = t.get(a, true);
			var h = t.get(o);
			var p = $("#grid_" + t.name + "_rec_" + (l !== null ? w2utils.escapeId(t.records[l].recid) : "none"));
			var d = false;
			var v = e.keyCode;
			var m = e.shiftKey;
			if (v == 9) {
				if (e.shiftKey) v = 37;
				else v = 39;
				m = false;
				d = true
			}
			switch (v) {
			case 8:
			case 46:
				if (this.show.toolbarDelete || this.onDelete) t["delete"]();
				d = true;
				e.stopPropagation();
				break;
			case 27:
				t.selectNone();
				if (s.length > 0 && typeof s[0] == "object") {
					t.select({
						recid: s[0].recid,
						column: s[0].column
					})
				}
				d = true;
				break;
			case 65:
				if (!e.metaKey && !e.ctrlKey) break;
				t.selectAll();
				d = true;
				break;
			case 70:
				if (!e.metaKey && !e.ctrlKey) break;
				$("#grid_" + t.name + "_search_all").focus();
				d = true;
				break;
			case 13:
				if (this.selectType == "row" && t.show.expandColumn === true) {
					if (p.length <= 0) break;
					t.toggle(o, e);
					d = true
				} else {
					for (var g = 0; g < this.columns.length; g++) {
						if (this.columns[g].editable) {
							u.push(parseInt(g));
							break
						}
					}
					if (this.selectType == "row" && this.last.edit_col) u = [this.last.edit_col];
					if (u.length > 0) {
						t.editField(o, u[0], null, e);
						d = true
					}
				}
				break;
			case 37:
				if (r) break;
				var y = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(t.records[l].recid)).parents("tr");
				if (y.length > 0 && String(y.attr("id")).indexOf("expanded_row") != -1) {
					var o = y.prev().attr("recid");
					var b = y.parents(".w2ui-grid").attr("name");
					t.selectNone();
					w2utils.keyboard.active(b, e);
					w2ui[b].set(o, {
						expanded: false
					});
					w2ui[b].collapse(o);
					w2ui[b].click(o);
					d = true;
					break
				}
				if (this.selectType == "row") {
					if (p.length <= 0 || h.expanded !== true) break;
					t.set(o, {
						expanded: false
					}, true);
					t.collapse(o, e)
				} else {
					var w = t.prevCell(u[0]);
					if (w != null) {
						if (m && t.multiSelect) {
							if (_()) return;
							var E = [];
							var S = [];
							var x = [];
							if (u.indexOf(this.last.sel_col) == 0 && u.length > 1) {
								for (var T = 0; T < s.length; T++) {
									if (E.indexOf(s[T].recid) == -1) E.push(s[T].recid);
									x.push({
										recid: s[T].recid,
										column: u[u.length - 1]
									})
								}
							} else {
								for (var T = 0; T < s.length; T++) {
									if (E.indexOf(s[T].recid) == -1) E.push(s[T].recid);
									S.push({
										recid: s[T].recid,
										column: w
									})
								}
							}
							t.unselect.apply(t, x);
							t.select.apply(t, S)
						} else {
							e.shiftKey = false;
							t.click({
								recid: o,
								column: w
							}, e)
						}
					} else {
						if (!m) {
							if (s.length > 1) {
								t.selectNone()
							} else {
								for (var N = 1; N < s.length; N++) t.unselect(s[N])
							}
						}
					}
				}
				d = true;
				break;
			case 39:
				if (r) break;
				if (this.selectType == "row") {
					if (p.length <= 0 || h.expanded === true || t.show.expandColumn !== true) break;
					t.expand(o, e)
				} else {
					var C = t.nextCell(u[u.length - 1]);
					if (C !== null) {
						if (m && v == 39 && t.multiSelect) {
							if (_()) return;
							var E = [];
							var S = [];
							var x = [];
							if (u.indexOf(this.last.sel_col) == u.length - 1 && u.length > 1) {
								for (var T = 0; T < s.length; T++) {
									if (E.indexOf(s[T].recid) == -1) E.push(s[T].recid);
									x.push({
										recid: s[T].recid,
										column: u[0]
									})
								}
							} else {
								for (var T = 0; T < s.length; T++) {
									if (E.indexOf(s[T].recid) == -1) E.push(s[T].recid);
									S.push({
										recid: s[T].recid,
										column: C
									})
								}
							}
							t.unselect.apply(t, x);
							t.select.apply(t, S)
						} else {
							t.click({
								recid: o,
								column: C
							}, e)
						}
					} else {
						if (!m) {
							if (s.length > 1) {
								t.selectNone()
							} else {
								for (var N = 0; N < s.length - 1; N++) t.unselect(s[N])
							}
						}
					}
				}
				d = true;
				break;
			case 38:
				if (r) M();
				if (p.length <= 0) break;
				var w = t.prevRow(l);
				if (w != null) {
					if (t.records[w].expanded) {
						var k = $("#grid_" + t.name + "_rec_" + w2utils.escapeId(t.records[w].recid) + "_expanded_row").find(".w2ui-grid");
						if (k.length > 0 && w2ui[k.attr("name")]) {
							t.selectNone();
							var b = k.attr("name");
							var L = w2ui[b].records;
							w2utils.keyboard.active(b, e);
							w2ui[b].click(L[L.length - 1].recid);
							d = true;
							break
						}
					}
					if (m && t.multiSelect) {
						if (_()) return;
						if (t.selectType == "row") {
							if (t.last.sel_ind > w && t.last.sel_ind != c) {
								t.unselect(t.records[c].recid)
							} else {
								t.select(t.records[w].recid)
							}
						} else {
							if (t.last.sel_ind > w && t.last.sel_ind != c) {
								w = c;
								var E = [];
								for (var g = 0; g < u.length; g++) E.push({
									recid: t.records[w].recid,
									column: u[g]
								});
								t.unselect.apply(t, E)
							} else {
								var E = [];
								for (var g = 0; g < u.length; g++) E.push({
									recid: t.records[w].recid,
									column: u[g]
								});
								t.select.apply(t, E)
							}
						}
					} else {
						t.selectNone();
						t.click({
							recid: t.records[w].recid,
							column: u[0]
						}, e)
					}
					t.scrollIntoView(w);
					if (e.preventDefault) e.preventDefault()
				} else {
					if (!m) {
						if (s.length > 1) {
							t.selectNone()
						} else {
							for (var N = 1; N < s.length; N++) t.unselect(s[N])
						}
					}
					var y = $("#grid_" + t.name + "_rec_" + w2utils.escapeId(t.records[l].recid)).parents("tr");
					if (y.length > 0 && String(y.attr("id")).indexOf("expanded_row") != -1) {
						var o = y.prev().attr("recid");
						var b = y.parents(".w2ui-grid").attr("name");
						t.selectNone();
						w2utils.keyboard.active(b, e);
						w2ui[b].click(o);
						d = true;
						break
					}
				}
				break;
			case 40:
				if (r) M();
				if (p.length <= 0) break;
				if (t.records[c].expanded) {
					var k = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(t.records[c].recid) + "_expanded_row").find(".w2ui-grid");
					if (k.length > 0 && w2ui[k.attr("name")]) {
						t.selectNone();
						var b = k.attr("name");
						var L = w2ui[b].records;
						w2utils.keyboard.active(b, e);
						w2ui[b].click(L[0].recid);
						d = true;
						break
					}
				}
				var C = t.nextRow(c);
				if (C != null) {
					if (m && t.multiSelect) {
						if (_()) return;
						if (t.selectType == "row") {
							if (this.last.sel_ind < C && this.last.sel_ind != l) {
								t.unselect(t.records[l].recid)
							} else {
								t.select(t.records[C].recid)
							}
						} else {
							if (this.last.sel_ind < C && this.last.sel_ind != l) {
								C = l;
								var E = [];
								for (var g = 0; g < u.length; g++) E.push({
									recid: t.records[C].recid,
									column: u[g]
								});
								t.unselect.apply(t, E)
							} else {
								var E = [];
								for (var g = 0; g < u.length; g++) E.push({
									recid: t.records[C].recid,
									column: u[g]
								});
								t.select.apply(t, E)
							}
						}
					} else {
						t.selectNone();
						t.click({
							recid: t.records[C].recid,
							column: u[0]
						}, e)
					}
					t.scrollIntoView(C);
					d = true
				} else {
					if (!m) {
						if (s.length > 1) {
							t.selectNone()
						} else {
							for (var N = 0; N < s.length - 1; N++) t.unselect(s[N])
						}
					}
					var y = $("#grid_" + this.name + "_rec_" + w2utils.escapeId(t.records[c].recid)).parents("tr");
					if (y.length > 0 && String(y.attr("id")).indexOf("expanded_row") != -1) {
						var o = y.next().attr("recid");
						var b = y.parents(".w2ui-grid").attr("name");
						t.selectNone();
						w2utils.keyboard.active(b, e);
						w2ui[b].click(o);
						d = true;
						break
					}
				}
				break;
			case 17:
			case 91:
				if (r) break;
				var A = t.copy();
				$("body").append('<textarea id="_tmp_copy_data" ' + "   onpaste=\"var obj = this; setTimeout(function () { w2ui['" + t.name + "'].paste(obj.value); }, 1);\" " + "   onkeydown=\"w2ui['" + t.name + "'].keydown(event)\"" + '   style="position: absolute; top: -100px; height: 1px; width: 1px">' + A + "</textarea>");
				$("#_tmp_copy_data").focus().select();
				$(document).on("keyup", O);

				function O() {
					$("#_tmp_copy_data").remove();
					$(document).off("keyup", O)
				}
				break;
			case 88:
				if (r) break;
				if (e.ctrlKey || e.metaKey) {
					setTimeout(function () {
						t["delete"](true)
					}, 100)
				}
				break
			}
			var E = [187, 189, 32];
			for (var T = 48; T <= 90; T++) E.push(T);
			if (E.indexOf(v) != -1 && !e.ctrlKey && !e.metaKey && !d) {
				if (u.length == 0) u.push(0);
				var E = String.fromCharCode(v);
				if (v == 187) E = "=";
				if (v == 189) E = "-";
				if (!m) E = E.toLowerCase();
				t.editField(o, u[0], E, e);
				d = true
			}
			if (d) {
				if (e.preventDefault) e.preventDefault()
			}
			t.trigger($.extend(n, {
				phase: "after"
			}))
		},
		scrollIntoView: function (e) {
			var t = this.records.length;
			if (this.searchData.length != 0 && !this.url) t = this.last.searchIds.length;
			if (typeof e == "undefined") {
				var n = this.getSelection();
				if (n.length == 0) return;
				e = this.get(n[0], true)
			}
			var r = $("#grid_" + this.name + "_records");
			if (t == 0) return;
			var i = this.last.searchIds.length;
			if (r.height() > this.recordHeight * (i > 0 ? i : t)) return;
			if (i > 0) e = this.last.searchIds.indexOf(e);
			var s = Math.floor(r[0].scrollTop / this.recordHeight);
			var o = s + Math.floor(r.height() / this.recordHeight);
			if (e == s) r.animate({
				scrollTop: r.scrollTop() - r.height() / 1.3
			}, 250, "linear");
			if (e == o) r.animate({
				scrollTop: r.scrollTop() + r.height() / 1.3
			}, 250, "linear");
			if (e < s || e > o) r.animate({
				scrollTop: (e - 1) * this.recordHeight
			})
		},
		dblClick: function (e, t) {
			var n = null;
			if (typeof e == "object") {
				n = e.column;
				e = e.recid
			}
			if (typeof t == "undefined") t = {};
			if (n == null && t.target) {
				var r = t.target;
				if (r.tagName != "TD") r = $(r).parents("td")[0];
				n = parseInt($(r).attr("col"))
			}
			var i = this.trigger({
				phase: "before",
				target: this.name,
				type: "dblClick",
				recid: e,
				column: n,
				originalEvent: t
			});
			if (i.isCancelled === true) return;
			this.selectNone();
			var s = this.columns[n];
			if (s && $.isPlainObject(s.editable)) {
				this.editField(e, n, null, t)
			} else {
				this.select({
					recid: e,
					column: n
				})
			}
			this.trigger($.extend(i, {
				phase: "after"
			}))
		},
		contextMenu: function (e, t) {
			var n = this;
			if (n.last.userSelect == "text") return;
			if (typeof t == "undefined") t = {
				offsetX: 0,
				offsetY: 0,
				target: $("#grid_" + n.name + "_rec_" + e)[0]
			};
			if (typeof t.offsetX === "undefined") {
				t.offsetX = t.layerX - t.target.offsetLeft;
				t.offsetY = t.layerY - t.target.offsetTop
			}
			if (w2utils.isFloat(e)) e = parseFloat(e);
			if (this.getSelection().indexOf(e) == -1) n.click(e);
			setTimeout(function () {
				var r = n.trigger({
					phase: "before",
					type: "contextMenu",
					target: n.name,
					originalEvent: t,
					recid: e
				});
				if (r.isCancelled === true) return;
				if (n.menu.length > 0) {
					$(n.box).find(t.target).w2menu(n.menu, {
						left: t.offsetX,
						onSelect: function (t) {
							n.menuClick(e, parseInt(t.index), t.originalEvent)
						}
					})
				}
				n.trigger($.extend(r, {
					phase: "after"
				}))
			}, 150);
			if (t.preventDefault) t.preventDefault()
		},
		menuClick: function (e, t, n) {
			var r = this;
			var i = r.trigger({
				phase: "before",
				type: "menuClick",
				target: r.name,
				originalEvent: n,
				recid: e,
				menuIndex: t,
				menuItem: r.menu[t]
			});
			if (i.isCancelled === true) return;
			r.trigger($.extend(i, {
				phase: "after"
			}))
		},
		toggle: function (e) {
			var t = this.get(e);
			if (t.expanded === true) return this.collapse(e);
			else return this.expand(e)
		},
		expand: function (e) {
			function u() {
				var t = $("#grid_" + n.name + "_rec_" + r + "_expanded");
				var i = $("#grid_" + n.name + "_rec_" + r + "_expanded_row .w2ui-expanded1 > div");
				if (t.height() < 5) return;
				t.css("opacity", 1);
				i.show().css("opacity", 1);
				$("#grid_" + n.name + "_cell_" + n.get(e, true) + "_expand div").html("-")
			}
			var t = this.get(e);
			var n = this;
			var r = w2utils.escapeId(e);
			if ($("#grid_" + this.name + "_rec_" + r + "_expanded_row").length > 0) return false;
			if (t.expanded == "none") return false;
			var i = 1 + (this.show.selectColumn ? 1 : 0);
			var s = "";
			$("#grid_" + this.name + "_rec_" + r).after('<tr id="grid_' + this.name + "_rec_" + e + '_expanded_row" class="w2ui-expanded-row ' + s + '">' + (this.show.lineNumbers ? '<td class="w2ui-col-number"></td>' : "") + '    <td class="w2ui-grid-data w2ui-expanded1" colspan="' + i + '"><div style="display: none"></div></td>' + '    <td colspan="100" class="w2ui-expanded2">' + '        <div id="grid_' + this.name + "_rec_" + e + '_expanded" style="opacity: 0"></div>' + "    </td>" + "</tr>");
			var o = this.trigger({
				phase: "before",
				type: "expand",
				target: this.name,
				recid: e,
				box_id: "grid_" + this.name + "_rec_" + e + "_expanded",
				ready: u
			});
			if (o.isCancelled === true) {
				$("#grid_" + this.name + "_rec_" + r + "_expanded_row").remove();
				return
			}
			$("#grid_" + this.name + "_rec_" + r).attr("expanded", "yes").addClass("w2ui-expanded");
			$("#grid_" + this.name + "_rec_" + r + "_expanded_row").show();
			$("#grid_" + this.name + "_cell_" + this.get(e, true) + "_expand div").html('<div class="w2ui-spinner" style="width: 16px; height: 16px; margin: -2px 2px;"></div>');
			t.expanded = true;
			setTimeout(u, 300);
			this.trigger($.extend(o, {
				phase: "after"
			}));
			this.resizeRecords();
			return true
		},
		collapse: function (e) {
			var t = this.get(e);
			var n = this;
			var r = w2utils.escapeId(e);
			if ($("#grid_" + this.name + "_rec_" + r + "_expanded_row").length == 0) return false;
			var i = this.trigger({
				phase: "before",
				type: "collapse",
				target: this.name,
				recid: e,
				box_id: "grid_" + this.name + "_rec_" + r + "_expanded"
			});
			if (i.isCancelled === true) return;
			$("#grid_" + this.name + "_rec_" + r).removeAttr("expanded").removeClass("w2ui-expanded");
			$("#grid_" + this.name + "_rec_" + r + "_expanded").css("opacity", 0);
			$("#grid_" + this.name + "_cell_" + this.get(e, true) + "_expand div").html("+");
			setTimeout(function () {
				$("#grid_" + n.name + "_rec_" + r + "_expanded").height("0px");
				setTimeout(function () {
					$("#grid_" + n.name + "_rec_" + r + "_expanded_row").remove();
					delete t.expanded;
					n.trigger($.extend(i, {
						phase: "after"
					}));
					n.resizeRecords()
				}, 300)
			}, 200);
			return true
		},
		sort: function (e, t, n) {
			var r = this.trigger({
				phase: "before",
				type: "sort",
				target: this.name,
				field: e,
				direction: t,
				multiField: n
			});
			if (r.isCancelled === true) return;
			if (typeof e != "undefined") {
				var i = this.sortData.length;
				for (var s = 0; s < this.sortData.length; s++) {
					if (this.sortData[s].field == e) {
						i = s;
						break
					}
				}
				if (typeof t == "undefined" || t == null) {
					if (typeof this.sortData[i] == "undefined") {
						t = "asc"
					} else {
						switch (String(this.sortData[i].direction)) {
						case "asc":
							t = "desc";
							break;
						case "desc":
							t = "asc";
							break;
						default:
							t = "asc";
							break
						}
					}
				}
				if (this.multiSort === false) {
					this.sortData = [];
					i = 0
				}
				if (n != true) {
					this.sortData = [];
					i = 0
				}
				if (typeof this.sortData[i] == "undefined") this.sortData[i] = {};
				this.sortData[i].field = e;
				this.sortData[i].direction = t
			} else {
				this.sortData = []
			}
			this.selectNone();
			var o = typeof this.url != "object" ? this.url : this.url.get;
			if (!o) {
				this.localSort();
				if (this.searchData.length > 0) this.localSearch(true);
				this.trigger($.extend(r, {
					phase: "after"
				}));
				this.refresh()
			} else {
				this.trigger($.extend(r, {
					phase: "after"
				}));
				this.last.xhr_offset = 0;
				this.reload()
			}
		},
		copy: function () {
			var e = this.getSelection();
			if (e.length == 0) return "";
			var t = "";
			if (typeof e[0] == "object") {
				var n = e[0].column;
				var r = e[0].column;
				var i = [];
				for (var s = 0; s < e.length; s++) {
					if (e[s].column < n) n = e[s].column;
					if (e[s].column > r) r = e[s].column;
					if (i.indexOf(e[s].index) == -1) i.push(e[s].index)
				}
				i.sort(function (e, t) {
					return e - t
				});
				for (var o = 0; o < i.length; o++) {
					var u = i[o];
					for (var a = n; a <= r; a++) {
						var f = this.columns[a];
						if (f.hidden === true) continue;
						t += w2utils.stripTags(this.getCellHTML(u, a)) + "	"
					}
					t = t.substr(0, t.length - 1);
					t += "\n"
				}
			} else {
				for (var a = 0; a < this.columns.length; a++) {
					var f = this.columns[a];
					if (f.hidden === true) continue;
					t += '"' + w2utils.stripTags(f.caption ? f.caption : f.field) + '"	'
				}
				t = t.substr(0, t.length - 1);
				t += "\n";
				for (var s = 0; s < e.length; s++) {
					var u = this.get(e[s], true);
					for (var a = 0; a < this.columns.length; a++) {
						var f = this.columns[a];
						if (f.hidden === true) continue;
						t += '"' + w2utils.stripTags(this.getCellHTML(u, a)) + '"	'
					}
					t = t.substr(0, t.length - 1);
					t += "\n"
				}
			}
			t = t.substr(0, t.length - 1);
			var l = this.trigger({
				phase: "before",
				type: "copy",
				target: this.name,
				text: t
			});
			if (l.isCancelled === true) return "";
			t = l.text;
			this.trigger($.extend(l, {
				phase: "after"
			}));
			return t
		},
		paste: function (e) {
			var t = this.getSelection();
			var n = this.get(t[0].recid, true);
			var r = t[0].column;
			var i = this.trigger({
				phase: "before",
				type: "paste",
				target: this.name,
				text: e,
				index: n,
				column: r
			});
			if (i.isCancelled === true) return;
			e = i.text;
			if (this.selectType == "row" || t.length == 0) {
				console.log("ERROR: You can paste only if grid.selectType = 'cell' and when at least one cell selected.");
				this.trigger($.extend(i, {
					phase: "after"
				}));
				return
			}
			var s = [];
			var e = e.split("\n");
			for (var o = 0; o < e.length; o++) {
				var u = e[o].split("	");
				var a = 0;
				var f = this.records[n];
				var l = [];
				for (var c = 0; c < u.length; c++) {
					if (!this.columns[r + a]) continue;
					var h = this.columns[r + a].field;
					f.changes = f.changes || {};
					f.changes[h] = u[c];
					l.push(r + a);
					a++
				}
				for (var p = 0; p < l.length; p++) s.push({
					recid: f.recid,
					column: l[p]
				});
				n++
			}
			this.selectNone();
			this.select.apply(this, s);
			this.refresh();
			this.trigger($.extend(i, {
				phase: "after"
			}))
		},
		resize: function () {
			var e = this;
			var t = (new Date).getTime();
			if (!this.box || $(this.box).attr("name") != this.name) return;
			$(this.box).find("> div").css("width", $(this.box).width()).css("height", $(this.box).height());
			var n = this.trigger({
				phase: "before",
				type: "resize",
				target: this.name
			});
			if (n.isCancelled === true) return;
			e.resizeBoxes();
			e.resizeRecords();
			this.trigger($.extend(n, {
				phase: "after"
			}));
			return (new Date).getTime() - t
		},
		update: function () {
			var e = (new Date).getTime();
			if (this.box == null) return 0;
			for (var t = this.last.range_start - 1; t <= this.last.range_end - 1; t++) {
				if (t < 0) continue;
				var n = this.records[t];
				for (var r = 0; r < this.columns.length; r++) {
					var i = $(this.box).find("#grid_" + this.name + "_data_" + t + "_" + r);
					i.html(this.getCellHTML(t, r, false));
					if (n.style != null && !$.isEmptyObject(n.style)) {
						if (typeof n.style == "string") {
							$(this.box).find("#grid_" + this.name + "_rec_" + w2utils.escapeId(n.recid)).attr("style", n.style)
						}
						if ($.isPlainObject(n.style) && typeof n.style[r] == "string") {
							i.attr("style", n.style[r])
						}
					} else {
						i.attr("style", "")
					}
				}
			}
			return (new Date).getTime() - e
		},
		refreshCell: function (e, t) {
			var n = this.get(e, true);
			var r = this.records[n] && this.records[n].recid == e ? false : true;
			var i = this.getColumn(t, true);
			var s = r ? this.summary[n] : this.records[n];
			var o = this.columns[i];
			var u = $(this.box).find("#grid_" + this.name + "_data_" + n + "_" + i);
			u.html(this.getCellHTML(n, i, r));
			if (s.changes && typeof s.changes[o.field] != "undefined") {
				u.addClass("w2ui-changed")
			} else {
				u.removeClass("w2ui-changed")
			}
			if (s.style != null && !$.isEmptyObject(s.style)) {
				if (typeof s.style == "string") {
					$(this.box).find("#grid_" + this.name + "_rec_" + w2utils.escapeId(s.recid)).attr("style", s.style)
				}
				if ($.isPlainObject(s.style) && typeof s.style[i] == "string") {
					u.attr("style", s.style[i])
				}
			} else {
				u.attr("style", "")
			}
		},
		refreshRow: function (e) {
			var t = $(this.box).find("#grid_" + this.name + "_rec_" + w2utils.escapeId(e));
			if (t.length != 0) {
				var n = this.get(e, true);
				var r = t.attr("line");
				var i = this.records[n] && this.records[n].recid == e ? false : true;
				var s = typeof this.url != "object" ? this.url : this.url.get;
				if (this.searchData.length > 0 && !s) for (var o = 0; o < this.last.searchIds.length; o++) if (this.last.searchIds[o] == n) n = o;
				$(t).replaceWith(this.getRecordHTML(n, r, i));
				if (i) this.resize()
			}
		},
		refresh: function () {
			var e = this;
			var t = (new Date).getTime();
			var n = typeof this.url != "object" ? this.url : this.url.get;
			if (this.total <= 0 && !n && this.searchData.length == 0) {
				this.total = this.records.length
			}
			this.toolbar.disable("w2ui-edit", "w2ui-delete");
			if (!this.box) return;
			var r = this.trigger({
				phase: "before",
				target: this.name,
				type: "refresh"
			});
			if (r.isCancelled === true) return;
			if (this.show.header) {
				$("#grid_" + this.name + "_header").html(this.header + "&nbsp;").show()
			} else {
				$("#grid_" + this.name + "_header").hide()
			}
			if (this.show.toolbar) {
				if (this.toolbar && this.toolbar.get("w2ui-column-on-off") && this.toolbar.get("w2ui-column-on-off").checked) {} else {
					$("#grid_" + this.name + "_toolbar").show();
					if (typeof this.toolbar == "object") {
						var i = this.toolbar.items;
						for (var s = 0; s < i.length; s++) {
							if (i[s].id == "w2ui-search" || i[s].type == "break") continue;
							this.toolbar.refresh(i[s].id)
						}
					}
				}
			} else {
				$("#grid_" + this.name + "_toolbar").hide()
			}
			this.searchClose();
			var o = $("#grid_" + e.name + "_search_all");
			if (!this.multiSearch && this.last.field == "all" && this.searches.length > 0) {
				this.last.field = this.searches[0].field;
				this.last.caption = this.searches[0].caption
			}
			for (var u = 0; u < this.searches.length; u++) {
				if (this.searches[u].field == this.last.field) this.last.caption = this.searches[u].caption
			}
			if (this.last.multi) {
				o.attr("placeholder", "[" + w2utils.lang("Multiple Fields") + "]")
			} else {
				o.attr("placeholder", this.last.caption)
			}
			if (o.val() != this.last.search) {
				var a = this.last.search;
				var i = o.data("w2field");
				if (i) a = i.format(a);
				o.val(a)
			}
			var i = this.find({
				summary: true
			}, true);
			if (i.length > 0) {
				for (var s = 0; s < i.length; s++) this.summary.push(this.records[i[s]]);
				for (var s = i.length - 1; s >= 0; s--) this.records.splice(i[s], 1);
				this.total = this.total - i.length
			}
			var f = "";
			f += '<div id="grid_' + this.name + '_records" class="w2ui-grid-records"' + "    onscroll=\"var obj = w2ui['" + this.name + "']; " + "        obj.last.scrollTop  = this.scrollTop; " + "        obj.last.scrollLeft = this.scrollLeft; " + "        $('#grid_" + this.name + "_columns')[0].scrollLeft = this.scrollLeft;" + "        $('#grid_" + this.name + "_summary')[0].scrollLeft = this.scrollLeft;" + '        obj.scroll(event);">' + this.getRecordsHTML() + "</div>" + '<div id="grid_' + this.name + '_columns" class="w2ui-grid-columns">' + "    <table>" + this.getColumnsHTML() + "</table>" + "</div>";
			$("#grid_" + this.name + "_body").html(f);
			if (this.summary.length > 0) {
				$("#grid_" + this.name + "_summary").html(this.getSummaryHTML()).show()
			} else {
				$("#grid_" + this.name + "_summary").hide()
			}
			if (this.show.footer) {
				$("#grid_" + this.name + "_footer").html(this.getFooterHTML()).show()
			} else {
				$("#grid_" + this.name + "_footer").hide()
			}
			if (this.searchData.length > 0) {
				$("#grid_" + this.name + "_searchClear").show()
			} else {
				$("#grid_" + this.name + "_searchClear").hide()
			}
			var l = this.last.selection;
			if (l.indexes.length == this.records.length || this.searchData.length !== 0 && l.indexes.length == this.last.searchIds.length) {
				$("#grid_" + this.name + "_check_all").prop("checked", true)
			} else {
				$("#grid_" + this.name + "_check_all").prop("checked", false)
			}
			this.status();
			var c = e.find({
				expanded: true
			}, true);
			for (var h = 0; h < c.length; h++) e.records[c[h]].expanded = false;
			setTimeout(function () {
				var t = $.trim($("#grid_" + e.name + "_search_all").val());
				if (t != "" && e.markSearch) $(e.box).find(".w2ui-grid-data > div").w2marker(t)
			}, 50);
			this.trigger($.extend(r, {
				phase: "after"
			}));
			e.resize();
			e.addRange("selection");
			setTimeout(function () {
				e.resize();
				e.scroll()
			}, 1);
			if (e.reorderColumns && !e.last.columnDrag) {
				e.last.columnDrag = e.initColumnDrag()
			} else if (!e.reorderColumns && e.last.columnDrag) {
				e.last.columnDrag.remove()
			}
			return (new Date).getTime() - t
		},
		render: function (e) {
			function s(e) {
				if (e.which != 1) return;
				if (t.last.userSelect == "text") {
					delete t.last.userSelect;
					$(t.box).find(".w2ui-grid-body").css(w2utils.cssPrefix("user-select", "none"));
					$(this.box).on("selectstart", function () {
						return false
					})
				}
				if ($(e.target).parents().hasClass("w2ui-head") || $(e.target).hasClass("w2ui-head")) return;
				if (t.last.move && t.last.move.type == "expand") return;
				if (e.altKey) {
					$(t.box).off("selectstart");
					$(t.box).find(".w2ui-grid-body").css(w2utils.cssPrefix("user-select", "text"));
					t.selectNone();
					t.last.move = {
						type: "text-select"
					};
					t.last.userSelect = "text"
				} else {
					if (!t.multiSelect) return;
					t.last.move = {
						x: e.screenX,
						y: e.screenY,
						divX: 0,
						divY: 0,
						recid: $(e.target).parents("tr").attr("recid"),
						column: e.target.tagName == "TD" ? $(e.target).attr("col") : $(e.target).parents("td").attr("col"),
						type: "select",
						ghost: false,
						start: true
					}
				}
				$(document).on("mousemove", o);
				$(document).on("mouseup", u)
			}
			function o(e) {
				var n = t.last.move;
				if (!n || n.type != "select") return;
				n.divX = e.screenX - n.x;
				n.divY = e.screenY - n.y;
				if (Math.abs(n.divX) <= 1 && Math.abs(n.divY) <= 1) return;
				t.last.cancelClick = true;
				if (t.reorderRows == true) {
					if (!n.ghost) {
						var r = $("#grid_" + t.name + "_rec_" + n.recid);
						var i = r.parents("table").find("tr:first-child").clone();
						n.offsetY = e.offsetY;
						n.from = n.recid;
						n.pos = r.position();
						n.ghost = $(r).clone(true);
						n.ghost.removeAttr("id");
						r.find("td:first-child").replaceWith('<td colspan="1000" style="height: ' + t.recordHeight + 'px; background-color: #ddd"></td>');
						var s = $(t.box).find(".w2ui-grid-records");
						s.append('<table id="grid_' + t.name + '_ghost" style="position: absolute; z-index: 999999; opacity: 0.8; border-bottom: 2px dashed #aaa; border-top: 2px dashed #aaa; pointer-events: none;"></table>');
						$("#grid_" + t.name + "_ghost").append(i).append(n.ghost)
					}
					var o = $(e.target).parents("tr").attr("recid");
					if (o != n.from) {
						var u = $("#grid_" + t.name + "_rec_" + n.recid);
						var a = $("#grid_" + t.name + "_rec_" + o);
						if (e.screenY - n.lastY < 0) u.after(a);
						else a.after(u);
						n.lastY = e.screenY;
						n.to = o
					}
					var f = $("#grid_" + t.name + "_ghost");
					var s = $(t.box).find(".w2ui-grid-records");
					f.css({
						top: n.pos.top + n.divY + s.scrollTop(),
						left: n.pos.left
					});
					return
				}
				if (n.start && n.recid) {
					t.selectNone();
					n.start = false
				}
				var l = [];
				var o = e.target.tagName == "TR" ? $(e.target).attr("recid") : $(e.target).parents("tr").attr("recid");
				if (typeof o == "undefined") return;
				var c = t.get(n.recid, true);
				if (c === null) return;
				var h = t.get(o, true);
				if (h === null) return;
				var p = parseInt(n.column);
				var d = parseInt(e.target.tagName == "TD" ? $(e.target).attr("col") : $(e.target).parents("td").attr("col"));
				if (c > h) {
					var i = c;
					c = h;
					h = i
				}
				var i = "ind1:" + c + ",ind2;" + h + ",col1:" + p + ",col2:" + d;
				if (n.range == i) return;
				n.range = i;
				for (var v = c; v <= h; v++) {
					if (t.last.searchIds.length > 0 && t.last.searchIds.indexOf(v) == -1) continue;
					if (t.selectType != "row") {
						if (p > d) {
							var i = p;
							p = d;
							d = i
						}
						var i = [];
						for (var m = p; m <= d; m++) {
							if (t.columns[m].hidden) continue;
							l.push({
								recid: t.records[v].recid,
								column: parseInt(m)
							})
						}
					} else {
						l.push(t.records[v].recid)
					}
				}
				if (t.selectType != "row") {
					var g = t.getSelection();
					var i = [];
					for (var y = 0; y < l.length; y++) {
						var b = false;
						for (var w = 0; w < g.length; w++) if (l[y].recid == g[w].recid && l[y].column == g[w].column) b = true;
						if (!b) i.push({
							recid: l[y].recid,
							column: l[y].column
						})
					}
					t.select.apply(t, i);
					var i = [];
					for (var w = 0; w < g.length; w++) {
						var b = false;
						for (var y = 0; y < l.length; y++) if (l[y].recid == g[w].recid && l[y].column == g[w].column) b = true;
						if (!b) i.push({
							recid: g[w].recid,
							column: g[w].column
						})
					}
					t.unselect.apply(t, i)
				} else {
					if (t.multiSelect) {
						var g = t.getSelection();
						for (var y = 0; y < l.length; y++) if (g.indexOf(l[y]) == -1) t.select(l[y]);
						for (var w = 0; w < g.length; w++) if (l.indexOf(g[w]) == -1) t.unselect(g[w])
					}
				}
			}
			function u(e) {
				var n = t.last.move;
				setTimeout(function () {
					delete t.last.cancelClick
				}, 1);
				if ($(e.target).parents().hasClass(".w2ui-head") || $(e.target).hasClass(".w2ui-head")) return;
				if (n && n.type == "select") {
					if (t.reorderRows == true) {
						var r = t.get(n.from, true);
						var i = t.records[r];
						t.records.splice(r, 1);
						var s = t.get(n.to, true);
						if (r > s) t.records.splice(s, 0, i);
						else t.records.splice(s + 1, 0, i);
						$("#grid_" + t.name + "_ghost").remove();
						t.refresh()
					}
				}
				delete t.last.move;
				$(document).off("mousemove", o);
				$(document).off("mouseup", u)
			}
			var t = this;
			var n = (new Date).getTime();
			if (e != null) {
				if ($(this.box).find("#grid_" + this.name + "_body").length > 0) {
					$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-grid").html("")
				}
				this.box = e
			}
			if (!this.box) return;
			if (this.last.sortData == null) this.last.sortData = this.sortData;
			var r = this.trigger({
				phase: "before",
				target: this.name,
				type: "render",
				box: e
			});
			if (r.isCancelled === true) return;
			this.reset(true);
			$(this.box).attr("name", this.name).addClass("w2ui-reset w2ui-grid").html("<div>" + '    <div id="grid_' + this.name + '_header" class="w2ui-grid-header"></div>' + '    <div id="grid_' + this.name + '_toolbar" class="w2ui-grid-toolbar"></div>' + '    <div id="grid_' + this.name + '_body" class="w2ui-grid-body"></div>' + '    <div id="grid_' + this.name + '_summary" class="w2ui-grid-body w2ui-grid-summary"></div>' + '    <div id="grid_' + this.name + '_footer" class="w2ui-grid-footer"></div>' + "</div>");
			if (this.selectType != "row") $(this.box).addClass("w2ui-ss");
			if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
			this.initToolbar();
			if (this.toolbar != null) this.toolbar.render($("#grid_" + this.name + "_toolbar")[0]);
			if (this.last.field && this.last.field != "all") {
				var i = this.searchData;
				setTimeout(function () {
					t.initAllField(t.last.field, i.length == 1 ? i[0].value : null)
				}, 1)
			}
			$("#grid_" + this.name + "_footer").html(this.getFooterHTML());
			if (!this.last.state) this.last.state = this.stateSave(true);
			this.stateRestore();
			if (this.url) this.refresh();
			this.reload();
			$(this.box).on("mousedown", s);
			$(this.box).on("selectstart", function () {
				return false
			});
			this.trigger($.extend(r, {
				phase: "after"
			}));
			if ($(".w2ui-layout").length == 0) {
				this.tmp_resize = function (e) {
					w2ui[t.name].resize()
				};
				$(window).off("resize", this.tmp_resize).on("resize", this.tmp_resize)
			}
			return (new Date).getTime() - n
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				target: this.name,
				type: "destroy"
			});
			if (e.isCancelled === true) return;
			if (this.tmp_resize) $(window).off("resize", this.tmp_resize);
			if (typeof this.toolbar == "object" && this.toolbar.destroy) this.toolbar.destroy();
			if ($(this.box).find("#grid_" + this.name + "_body").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-grid").html("")
			}
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}))
		},
		initColumnOnOff: function () {
			if (!this.show.toolbarColumns) return;
			var e = this;
			var t = '<div class="w2ui-col-on-off">' + "<table><tr>" + '<td style="width: 30px">' + '    <input id="grid_' + this.name + '_column_ln_check" type="checkbox" tabIndex="-1" ' + (e.show.lineNumbers ? "checked" : "") + "        onclick=\"w2ui['" + e.name + "'].columnOnOff(this, event, 'line-numbers');\">" + "</td>" + "<td onclick=\"w2ui['" + e.name + "'].columnOnOff(this, event, 'line-numbers'); $(document).click();\">" + '    <label for="grid_' + this.name + '_column_ln_check">' + w2utils.lang("Line #") + "</label>" + "</td></tr>";
			for (var n = 0; n < this.columns.length; n++) {
				var r = this.columns[n];
				var i = this.columns[n].caption;
				if (r.hideable === false) continue;
				if (!i && this.columns[n].hint) i = this.columns[n].hint;
				if (!i) i = "- column " + (parseInt(n) + 1) + " -";
				t += "<tr>" + '<td style="width: 30px">' + '    <input id="grid_' + this.name + "_column_" + n + '_check" type="checkbox" tabIndex="-1" ' + (r.hidden ? "" : "checked") + "        onclick=\"w2ui['" + e.name + "'].columnOnOff(this, event, '" + r.field + "');\">" + "</td>" + "<td>" + '    <label for="grid_' + this.name + "_column_" + n + '_check">' + i + "</label>" + "</td>" + "</tr>"
			}
			t += '<tr><td colspan="2"><div style="border-top: 1px solid #ddd;"></div></td></tr>';
			var s = typeof this.url != "object" ? this.url : this.url.get;
			if (s && e.show.skipRecords) {
				t += '<tr><td colspan="2" style="padding: 0px">' + '    <div style="cursor: pointer; padding: 2px 8px; cursor: default">' + w2utils.lang("Skip") + '        <input type="text" style="width: 45px" value="' + this.offset + '" ' + '            onkeypress="if (event.keyCode == 13) { ' + "               w2ui['" + e.name + "'].skip(this.value); " + "               $(document).click(); " + '            }"> ' + w2utils.lang("Records") + "    </div>" + "</td></tr>"
			}
			t += '<tr><td colspan="2" onclick="w2ui[\'' + e.name + "'].stateSave(); $(document).click();\">" + '    <div style="cursor: pointer; padding: 4px 8px; cursor: default">' + w2utils.lang("Save Grid State") + "</div>" + "</td></tr>" + '<tr><td colspan="2" onclick="w2ui[\'' + e.name + "'].stateReset(); $(document).click();\">" + '    <div style="cursor: pointer; padding: 4px 8px; cursor: default">' + w2utils.lang("Restore Default State") + "</div>" + "</td></tr>";
			t += "</table></div>";
			this.toolbar.get("w2ui-column-on-off").html = t
		},
		initColumnDrag: function (e) {
			function r() {
				n.pressed = false;
				clearTimeout(n.timeout)
			}
			function i(e) {
				if (n.timeout) clearTimeout(n.timeout);
				var r = this;
				n.pressed = true;
				n.timeout = setTimeout(function () {
					if (!n.pressed) return;
					var i, u, a, f, l, c = ["w2ui-col-number", "w2ui-col-expand", "w2ui-col-select"],
						h = ["w2ui-head-last"],
						p = c.concat(h),
						d = ".w2ui-col-number, .w2ui-col-expand, .w2ui-col-select",
						v = ".w2ui-head.w2ui-col-number, .w2ui-head.w2ui-col-expand, .w2ui-head.w2ui-col-select";
					if (!$(e.originalEvent.target).parents().hasClass("w2ui-head")) return;
					for (var m = 0, g = p.length; m < g; m++) {
						if ($(e.originalEvent.target).parents().hasClass(p[m])) return
					}
					n.numberPreColumnsPresent = $(t.box).find(v).length;
					n.columnHead = f = $(e.originalEvent.target).parents(".w2ui-head");
					l = parseInt(f.attr("col"), 10);
					i = t.trigger({
						type: "columnDragStart",
						phase: "before",
						originalEvent: e,
						origColumnNumber: l,
						target: f[0]
					});
					if (i.isCancelled === true) return false;
					u = n.columns = $(t.box).find(".w2ui-head:not(.w2ui-head-last)");
					$(document).on("mouseup", o);
					$(document).on("mousemove", s);
					n.originalPos = parseInt($(e.originalEvent.target).parent(".w2ui-head").attr("col"), 10);
					n.ghost = $(r).clone(true);
					$(n.ghost).find('[col]:not([col="' + n.originalPos + '"]), .w2ui-toolbar, .w2ui-grid-header').remove();
					$(n.ghost).find(d).remove();
					$(n.ghost).find(".w2ui-grid-body").css({
						top: 0
					});
					a = $(n.ghost).find('[col="' + n.originalPos + '"]');
					$(document.body).append(n.ghost);
					$(n.ghost).css({
						width: 0,
						height: 0,
						margin: 0,
						position: "fixed",
						zIndex: 999999,
						opacity: 0
					}).addClass(".w2ui-grid-ghost").animate({
						width: a.width(),
						height: $(t.box).find(".w2ui-grid-body:first").height(),
						left: e.pageX,
						top: e.pageY,
						opacity: .8
					}, 0);
					n.offsets = [];
					for (var m = 0, g = u.length; m < g; m++) {
						n.offsets.push($(u[m]).offset().left)
					}
					t.trigger($.extend(i, {
						phase: "after"
					}))
				}, 150)
			}
			function s(e) {
				if (!n.pressed) return;
				var t = e.originalEvent.pageX,
					r = e.originalEvent.pageY,
					i = n.offsets,
					s = $(".w2ui-head:not(.w2ui-head-last)").width();
				n.targetInt = Math.max(n.numberPreColumnsPresent, a(t, i, s));
				u(n.targetInt);
				f(t, r)
			}
			function o(e) {
				n.pressed = false;
				var r, i, u, a, f, l = $(".w2ui-grid-ghost");
				r = t.trigger({
					type: "columnDragEnd",
					phase: "before",
					originalEvent: e,
					target: n.columnHead[0]
				});
				if (r.isCancelled === true) return false;
				u = t.columns[n.originalPos];
				a = t.columns;
				f = $(n.columns[Math.min(n.lastInt, n.columns.length - 1)]);
				i = n.lastInt < n.columns.length ? parseInt(f.attr("col")) : a.length;
				if (i !== n.originalPos + 1 && i !== n.originalPos && f && f.length) {
					$(n.ghost).animate({
						top: $(t.box).offset().top,
						left: f.offset().left,
						width: 0,
						height: 0,
						opacity: .2
					}, 300, function () {
						$(this).remove();
						l.remove()
					});
					a.splice(i, 0, $.extend({}, u));
					a.splice(a.indexOf(u), 1)
				} else {
					$(n.ghost).remove();
					l.remove()
				}
				$(document).off("mouseup", o);
				$(document).off("mousemove", s);
				if (n.marker) n.marker.remove();
				n = {};
				t.refresh();
				t.trigger($.extend(r, {
					phase: "after",
					targetColumnNumber: i - 1
				}))
			}
			function u(e) {
				if (!n.marker && !n.markerLeft) {
					n.marker = $('<div class="col-intersection-marker">' + '<div class="top-marker"></div>' + '<div class="bottom-marker"></div>' + "</div>");
					n.markerLeft = $('<div class="col-intersection-marker">' + '<div class="top-marker"></div>' + '<div class="bottom-marker"></div>' + "</div>")
				}
				if (!n.lastInt || n.lastInt !== e) {
					n.lastInt = e;
					n.marker.remove();
					n.markerLeft.remove();
					$(".w2ui-head").removeClass("w2ui-col-intersection");
					if (e >= n.columns.length) {
						$(n.columns[n.columns.length - 1]).children("div:last").append(n.marker.addClass("right").removeClass("left"));
						$(n.columns[n.columns.length - 1]).addClass("w2ui-col-intersection")
					} else if (e <= n.numberPreColumnsPresent) {
						$(n.columns[n.numberPreColumnsPresent]).prepend(n.marker.addClass("left").removeClass("right")).css({
							position: "relative"
						});
						$(n.columns[n.numberPreColumnsPresent]).prev().addClass("w2ui-col-intersection")
					} else {
						$(n.columns[e]).children("div:last").prepend(n.marker.addClass("left").removeClass("right"));
						$(n.columns[e]).prev().children("div:last").append(n.markerLeft.addClass("right").removeClass("left")).css({
							position: "relative"
						});
						$(n.columns[e - 1]).addClass("w2ui-col-intersection")
					}
				}
			}
			function a(e, t, n) {
				if (e <= t[0]) {
					return 0
				} else if (e >= t[t.length - 1] + n) {
					return t.length
				} else {
					for (var r = 0, i = t.length; r < i; r++) {
						var s = t[r];
						var o = t[r + 1] || t[r] + n;
						var u = (o - t[r]) / 2 + t[r];
						if (e > s && e <= u) {
							return r
						} else if (e > u && e <= o) {
							return r + 1
						}
					}
					return intersection
				}
			}
			function f(e, t) {
				$(n.ghost).css({
					left: e - 10,
					top: t - 10
				})
			}
			if (this.columnGroups && this.columnGroups.length) throw "Draggable columns are not currently supported with column groups.";
			var t = this,
				n = {};
			n.lastInt = null;
			n.pressed = false;
			n.timeout = null;
			n.columnHead = null;
			$(t.box).on("mousedown", i);
			$(t.box).on("mouseup", r);
			return {
				remove: function () {
					$(t.box).off("mousedown", i);
					$(t.box).off("mouseup", r);
					$(t.box).find(".w2ui-head").removeAttr("draggable");
					t.last.columnDrag = false
				}
			}
		},
		columnOnOff: function (e, t, n) {
			var r = this.trigger({
				phase: "before",
				target: this.name,
				type: "columnOnOff",
				checkbox: e,
				field: n,
				originalEvent: t
			});
			if (r.isCancelled === true) return;
			var i = this;
			for (var s = 0; s < this.records.length; s++) {
				if (this.records[s].expanded === true) this.records[s].expanded = false
			}
			var o = true;
			if (n == "line-numbers") {
				this.show.lineNumbers = !this.show.lineNumbers;
				this.refresh()
			} else {
				var u = this.getColumn(n);
				if (u.hidden) {
					$(e).prop("checked", true);
					this.showColumn(u.field)
				} else {
					$(e).prop("checked", false);
					this.hideColumn(u.field)
				}
				o = false
			}
			if (o) {
				setTimeout(function () {
					$().w2overlay("", {
						name: "searches-" + this.name
					});
					i.toolbar.uncheck("column-on-off")
				}, 100)
			}
			this.trigger($.extend(r, {
				phase: "after"
			}))
		},
		initToolbar: function () {
			if (typeof this.toolbar["render"] == "undefined") {
				var e = this.toolbar.items;
				this.toolbar.items = [];
				this.toolbar = $().w2toolbar($.extend(true, {}, this.toolbar, {
					name: this.name + "_toolbar",
					owner: this
				}));
				if (this.show.toolbarReload) {
					this.toolbar.items.push($.extend(true, {}, this.buttons["reload"]))
				}
				if (this.show.toolbarColumns) {
					this.toolbar.items.push($.extend(true, {}, this.buttons["columns"]))
				}
				if (this.show.toolbarReload || this.show.toolbarColumn) {
					this.toolbar.items.push({
						type: "break",
						id: "w2ui-break0"
					})
				}
				if (this.show.toolbarSearch) {
					var t = '<div class="w2ui-toolbar-search">' + '<table cellpadding="0" cellspacing="0"><tr>' + "    <td>" + this.buttons["search"].html + "</td>" + "    <td>" + '        <input id="grid_' + this.name + '_search_all" class="w2ui-search-all" ' + '            placeholder="' + this.last.caption + '" value="' + this.last.search + '"' + '            onkeydown="if (event.keyCode == 13 && w2utils.isIE) this.onchange();"' + '            onchange="' + "                var grid = w2ui['" + this.name + "']; " + "                var val = this.value; " + "                var sel = $(this).data('selected');" + "                var fld = $(this).data('w2field'); " + "                if (fld) val = fld.clean(val);" + "                if (fld && fld.type == 'list' && sel && typeof sel.id == 'undefined') {" + "                   grid.searchReset();" + "                } else {" + "                   grid.search(grid.last.field, val);" + "                }" + '            ">' + "    </td>" + "    <td>" + '        <div title="' + w2utils.lang("Clear Search") + '" class="w2ui-search-clear" id="grid_' + this.name + '_searchClear"  ' + "             onclick=\"var obj = w2ui['" + this.name + "']; obj.searchReset();\" " + "        >&nbsp;&nbsp;</div>" + "    </td>" + "</tr></table>" + "</div>";
					this.toolbar.items.push({
						type: "html",
						id: "w2ui-search",
						html: t
					});
					if (this.multiSearch && this.searches.length > 0) {
						this.toolbar.items.push($.extend(true, {}, this.buttons["search-go"]))
					}
				}
				if (this.show.toolbarSearch && (this.show.toolbarAdd || this.show.toolbarEdit || this.show.toolbarDelete || this.show.toolbarSave)) {
					this.toolbar.items.push({
						type: "break",
						id: "w2ui-break1"
					})
				}
				if (this.show.toolbarAdd) {
					this.toolbar.items.push($.extend(true, {}, this.buttons["add"]))
				}
				if (this.show.toolbarEdit) {
					this.toolbar.items.push($.extend(true, {}, this.buttons["edit"]))
				}
				if (this.show.toolbarDelete) {
					this.toolbar.items.push($.extend(true, {}, this.buttons["delete"]))
				}
				if (this.show.toolbarSave) {
					if (this.show.toolbarAdd || this.show.toolbarDelete || this.show.toolbarEdit) {
						this.toolbar.items.push({
							type: "break",
							id: "w2ui-break2"
						})
					}
					this.toolbar.items.push($.extend(true, {}, this.buttons["save"]))
				}
				if (e) for (var n = 0; n < e.length; n++) this.toolbar.items.push(e[n]);
				var r = this;
				this.toolbar.on("click", function (e) {
					var t = r.trigger({
						phase: "before",
						type: "toolbar",
						target: e.target,
						originalEvent: e
					});
					if (t.isCancelled === true) return;
					var n = e.target;
					switch (n) {
					case "w2ui-reload":
						var i = r.trigger({
							phase: "before",
							type: "reload",
							target: r.name
						});
						if (i.isCancelled === true) return false;
						r.reload();
						r.trigger($.extend(i, {
							phase: "after"
						}));
						break;
					case "w2ui-column-on-off":
						r.initColumnOnOff();
						r.initResize();
						r.resize();
						break;
					case "w2ui-search-advanced":
						var s = this;
						var o = this.get(n);
						if (o.checked) {
							r.searchClose();
							setTimeout(function () {
								s.uncheck(n)
							}, 1)
						} else {
							r.searchOpen();
							e.originalEvent.stopPropagation();

							function u() {
								if ($("#w2ui-overlay-searches-" + r.name).data("keepOpen") === true) return;
								s.uncheck(n);
								$(document).off("click", "body", u)
							}
							$(document).on("click", "body", u)
						}
						break;
					case "w2ui-add":
						var t = r.trigger({
							phase: "before",
							target: r.name,
							type: "add",
							recid: null
						});
						r.trigger($.extend(t, {
							phase: "after"
						}));
						break;
					case "w2ui-edit":
						var a = r.getSelection();
						var f = null;
						if (a.length == 1) f = a[0];
						var t = r.trigger({
							phase: "before",
							target: r.name,
							type: "edit",
							recid: f
						});
						r.trigger($.extend(t, {
							phase: "after"
						}));
						break;
					case "w2ui-delete":
						r["delete"]();
						break;
					case "w2ui-save":
						r.save();
						break
					}
					r.trigger($.extend(t, {
						phase: "after"
					}))
				})
			}
			return
		},
		initResize: function () {
			var e = this;
			$(this.box).find(".w2ui-resizer").off("click").on("click", function (e) {
				if (e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
				if (e.preventDefault) e.preventDefault()
			}).off("mousedown").on("mousedown", function (t) {
				if (!t) t = window.event;
				if (!window.addEventListener) {
					window.document.attachEvent("onselectstart", function () {
						return false
					})
				}
				e.resizing = true;
				e.last.tmp = {
					x: t.screenX,
					y: t.screenY,
					gx: t.screenX,
					gy: t.screenY,
					col: parseInt($(this).attr("name"))
				};
				if (t.stopPropagation) t.stopPropagation();
				else t.cancelBubble = true;
				if (t.preventDefault) t.preventDefault();
				for (var n = 0; n < e.columns.length; n++) {
					if (typeof e.columns[n].sizeOriginal == "undefined") e.columns[n].sizeOriginal = e.columns[n].size;
					e.columns[n].size = e.columns[n].sizeCalculated
				}
				var r = {
					phase: "before",
					type: "columnResize",
					target: e.name,
					column: e.last.tmp.col,
					field: e.columns[e.last.tmp.col].field
				};
				r = e.trigger($.extend(r, {
					resizeBy: 0,
					originalEvent: t
				}));
				var i = function (t) {
					if (e.resizing != true) return;
					if (!t) t = window.event;
					r = e.trigger($.extend(r, {
						resizeBy: t.screenX - e.last.tmp.gx,
						originalEvent: t
					}));
					if (r.isCancelled === true) {
						r.isCancelled = false;
						return
					}
					e.last.tmp.x = t.screenX - e.last.tmp.x;
					e.last.tmp.y = t.screenY - e.last.tmp.y;
					e.columns[e.last.tmp.col].size = parseInt(e.columns[e.last.tmp.col].size) + e.last.tmp.x + "px";
					e.resizeRecords();
					e.last.tmp.x = t.screenX;
					e.last.tmp.y = t.screenY
				};
				var s = function (t) {
					delete e.resizing;
					$(document).off("mousemove", "body");
					$(document).off("mouseup", "body");
					e.resizeRecords();
					e.trigger($.extend(r, {
						phase: "after",
						originalEvent: t
					}))
				};
				$(document).on("mousemove", "body", i);
				$(document).on("mouseup", "body", s)
			}).each(function (e, t) {
				var n = $(t).parent();
				$(t).css({
					height: "25px",
					"margin-left": n.width() - 3 + "px"
				})
			})
		},
		resizeBoxes: function () {
			var e = $(this.box).find("> div");
			var t = $("#grid_" + this.name + "_header");
			var n = $("#grid_" + this.name + "_toolbar");
			var r = $("#grid_" + this.name + "_summary");
			var i = $("#grid_" + this.name + "_footer");
			var s = $("#grid_" + this.name + "_body");
			var o = $("#grid_" + this.name + "_columns");
			var u = $("#grid_" + this.name + "_records");
			if (this.show.header) {
				t.css({
					top: "0px",
					left: "0px",
					right: "0px"
				})
			}
			if (this.show.toolbar) {
				n.css({
					top: 0 + (this.show.header ? w2utils.getSize(t, "height") : 0) + "px",
					left: "0px",
					right: "0px"
				})
			}
			if (this.show.footer) {
				i.css({
					bottom: "0px",
					left: "0px",
					right: "0px"
				})
			}
			if (this.summary.length > 0) {
				r.css({
					bottom: 0 + (this.show.footer ? w2utils.getSize(i, "height") : 0) + "px",
					left: "0px",
					right: "0px"
				})
			}
			s.css({
				top: 0 + (this.show.header ? w2utils.getSize(t, "height") : 0) + (this.show.toolbar ? w2utils.getSize(n, "height") : 0) + "px",
				bottom: 0 + (this.show.footer ? w2utils.getSize(i, "height") : 0) + (this.summary.length > 0 ? w2utils.getSize(r, "height") : 0) + "px",
				left: "0px",
				right: "0px"
			})
		},
		resizeRecords: function () {
			var e = this;
			$(this.box).find(".w2ui-empty-record").remove();
			var t = $(this.box);
			var n = $(this.box).find("> div");
			var r = $("#grid_" + this.name + "_header");
			var i = $("#grid_" + this.name + "_toolbar");
			var s = $("#grid_" + this.name + "_summary");
			var o = $("#grid_" + this.name + "_footer");
			var u = $("#grid_" + this.name + "_body");
			var a = $("#grid_" + this.name + "_columns");
			var f = $("#grid_" + this.name + "_records");
			var l = String(this.total).length * 8 + 10;
			if (l < 34) l = 34;
			if (!this.fixedBody) {
				var c = w2utils.getSize(a, "height") + w2utils.getSize($("#grid_" + e.name + "_records table"), "height");
				e.height = c + w2utils.getSize(n, "+height") + (e.show.header ? w2utils.getSize(r, "height") : 0) + (e.show.toolbar ? w2utils.getSize(i, "height") : 0) + (s.css("display") != "none" ? w2utils.getSize(s, "height") : 0) + (e.show.footer ? w2utils.getSize(o, "height") : 0);
				n.css("height", e.height);
				u.css("height", c);
				t.css("height", w2utils.getSize(n, "height") + w2utils.getSize(t, "+height"))
			} else {
				var c = n.height() - (this.show.header ? w2utils.getSize(r, "height") : 0) - (this.show.toolbar ? w2utils.getSize(i, "height") : 0) - (s.css("display") != "none" ? w2utils.getSize(s, "height") : 0) - (this.show.footer ? w2utils.getSize(o, "height") : 0);
				u.css("height", c)
			}
			var h = this.records.length;
			if (this.searchData.length != 0 && !this.url) h = this.last.searchIds.length;
			var p = false;
			var d = false;
			if (u.width() < $(f).find(">table").width()) p = true;
			if (u.height() - a.height() < $(f).find(">table").height() + (p ? w2utils.scrollBarSize() : 0)) d = true;
			if (!this.fixedBody) {
				d = false;
				p = false
			}
			if (p || d) {
				a.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").css("width", w2utils.scrollBarSize()).show();
				f.css({
					top: (this.columnGroups.length > 0 && this.show.columns ? 1 : 0) + w2utils.getSize(a, "height") + "px",
					"-webkit-overflow-scrolling": "touch",
					"overflow-x": p ? "auto" : "hidden",
					"overflow-y": d ? "auto" : "hidden"
				})
			} else {
				a.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").hide();
				f.css({
					top: (this.columnGroups.length > 0 && this.show.columns ? 1 : 0) + w2utils.getSize(a, "height") + "px",
					overflow: "hidden"
				});
				if (f.length > 0) {
					this.last.scrollTop = 0;
					this.last.scrollLeft = 0
				}
			}
			if (this.show.emptyRecords && !d) {
				var v = Math.floor(f.height() / this.recordHeight) + 1;
				if (this.fixedBody) {
					for (var m = h; m <= v; m++) {
						var g = "";
						g += '<tr class="' + (m % 2 ? "w2ui-even" : "w2ui-odd") + ' w2ui-empty-record" style="height: ' + this.recordHeight + 'px">';
						if (this.show.lineNumbers) g += '<td class="w2ui-col-number"></td>';
						if (this.show.selectColumn) g += '<td class="w2ui-grid-data w2ui-col-select"></td>';
						if (this.show.expandColumn) g += '<td class="w2ui-grid-data w2ui-col-expand"></td>';
						var y = 0;
						while (this.columns.length > 0) {
							var b = this.columns[y];
							if (b.hidden) {
								y++;
								if (typeof this.columns[y] == "undefined") break;
								else continue
							}
							g += '<td class="w2ui-grid-data" ' + (typeof b.attr != "undefined" ? b.attr : "") + ' col="' + y + '"></td>';
							y++;
							if (typeof this.columns[y] == "undefined") break
						}
						g += '<td class="w2ui-grid-data-last"></td>';
						g += "</tr>";
						$("#grid_" + this.name + "_records > table").append(g)
					}
				}
			}
			if (u.length > 0) {
				var w = parseInt(u.width()) - (d ? w2utils.scrollBarSize() : 0) - (this.show.lineNumbers ? l : 0) - (this.show.selectColumn ? 26 : 0) - (this.show.expandColumn ? 26 : 0);
				var E = w;
				var S = 0;
				var x = false;
				for (var T = 0; T < this.columns.length; T++) {
					var b = this.columns[T];
					if (b.gridMinWidth > 0) {
						if (b.gridMinWidth > E && b.hidden !== true) {
							b.hidden = true;
							x = true
						}
						if (b.gridMinWidth < E && b.hidden === true) {
							b.hidden = false;
							x = true
						}
					}
				}
				if (x === true) {
					this.refresh();
					return
				}
				for (var T = 0; T < this.columns.length; T++) {
					var b = this.columns[T];
					if (b.hidden) continue;
					if (String(b.size).substr(String(b.size).length - 2).toLowerCase() == "px") {
						w -= parseFloat(b.size);
						this.columns[T].sizeCalculated = b.size;
						this.columns[T].sizeType = "px"
					} else {
						S += parseFloat(b.size);
						this.columns[T].sizeType = "%";
						delete b.sizeCorrected
					}
				}
				if (S != 100 && S > 0) {
					for (var T = 0; T < this.columns.length; T++) {
						var b = this.columns[T];
						if (b.hidden) continue;
						if (b.sizeType == "%") {
							b.sizeCorrected = Math.round(parseFloat(b.size) * 100 * 100 / S) / 100 + "%"
						}
					}
				}
				for (var T = 0; T < this.columns.length; T++) {
					var b = this.columns[T];
					if (b.hidden) continue;
					if (b.sizeType == "%") {
						if (typeof this.columns[T].sizeCorrected != "undefined") {
							this.columns[T].sizeCalculated = Math.floor(w * parseFloat(b.sizeCorrected) / 100) - 1 + "px"
						} else {
							this.columns[T].sizeCalculated = Math.floor(w * parseFloat(b.size) / 100) - 1 + "px"
						}
					}
				}
			}
			var N = 0;
			for (var T = 0; T < this.columns.length; T++) {
				var b = this.columns[T];
				if (b.hidden) continue;
				if (typeof b.min == "undefined") b.min = 20;
				if (parseInt(b.sizeCalculated) < parseInt(b.min)) b.sizeCalculated = b.min + "px";
				if (parseInt(b.sizeCalculated) > parseInt(b.max)) b.sizeCalculated = b.max + "px";
				N += parseInt(b.sizeCalculated)
			}
			var C = parseInt(E) - parseInt(N);
			if (C > 0 && S > 0) {
				var T = 0;
				while (true) {
					var b = this.columns[T];
					if (typeof b == "undefined") {
						T = 0;
						continue
					}
					if (b.hidden || b.sizeType == "px") {
						T++;
						continue
					}
					b.sizeCalculated = parseInt(b.sizeCalculated) + 1 + "px";
					C--;
					if (C == 0) break;
					T++
				}
			} else if (C > 0) {
				a.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").css("width", w2utils.scrollBarSize()).show()
			}
			a.find("> table > tbody > tr:nth-child(1) td").each(function (t, n) {
				if ($(n).hasClass("w2ui-col-number")) {
					$(n).css("width", l)
				}
				var r = $(n).attr("col");
				if (typeof r != "undefined" && e.columns[r]) {
					$(n).css("width", e.columns[r].sizeCalculated)
				}
				if ($(n).hasClass("w2ui-head-last")) {
					$(n).css("width", w2utils.scrollBarSize() + (C > 0 && S == 0 ? C : 0) + "px")
				}
			});
			if (a.find("> table > tbody > tr").length == 3) {
				a.find("> table > tbody > tr:nth-child(1) td").html("").css({
					height: "0px",
					border: "0px",
					padding: "0px",
					margin: "0px"
				})
			}
			f.find("> table > tbody > tr:nth-child(1) td").each(function (t, n) {
				if ($(n).hasClass("w2ui-col-number")) {
					$(n).css("width", l)
				}
				var r = $(n).attr("col");
				if (typeof r != "undefined" && e.columns[r]) {
					$(n).css("width", e.columns[r].sizeCalculated)
				}
				if ($(n).hasClass("w2ui-grid-data-last")) {
					$(n).css("width", (C > 0 && S == 0 ? C : 0) + "px")
				}
			});
			s.find("> table > tbody > tr:nth-child(1) td").each(function (t, n) {
				if ($(n).hasClass("w2ui-col-number")) {
					$(n).css("width", l)
				}
				var r = $(n).attr("col");
				if (typeof r != "undefined" && e.columns[r]) {
					$(n).css("width", e.columns[r].sizeCalculated)
				}
				if ($(n).hasClass("w2ui-grid-data-last")) {
					$(n).css("width", w2utils.scrollBarSize() + (C > 0 && S == 0 ? C : 0) + "px")
				}
			});
			this.initResize();
			this.refreshRanges();
			if ((this.last.scrollTop || this.last.scrollLeft) && f.length > 0) {
				a.prop("scrollLeft", this.last.scrollLeft);
				f.prop("scrollTop", this.last.scrollTop);
				f.prop("scrollLeft", this.last.scrollLeft)
			}
		},
		getSearchesHTML: function () {
			var e = '<table cellspacing="0">';
			var t = false;
			for (var n = 0; n < this.searches.length; n++) {
				var r = this.searches[n];
				r.type = String(r.type).toLowerCase();
				if (r.hidden) continue;
				var i = "";
				if (t == false) {
					i = '<button class="w2ui-btn close-btn" onclick="obj = w2ui[\'' + this.name + "']; if (obj) { obj.searchClose(); }\">X</button";
					t = true
				}
				if (typeof r.inTag == "undefined") r.inTag = "";
				if (typeof r.outTag == "undefined") r.outTag = "";
				if (typeof r.type == "undefined") r.type = "text";
				if (["text", "alphanumeric", "combo"].indexOf(r.type) != -1) {
					var s = '<select id="grid_' + this.name + "_operator_" + n + '" onclick="event.stopPropagation();">' + '    <option value="is">' + w2utils.lang("is") + "</option>" + '    <option value="begins">' + w2utils.lang("begins") + "</option>" + '    <option value="contains">' + w2utils.lang("contains") + "</option>" + '    <option value="ends">' + w2utils.lang("ends") + "</option>" + "</select>"
				}
				if (["int", "float", "money", "currency", "percent", "date", "time"].indexOf(r.type) != -1) {
					var s = '<select id="grid_' + this.name + "_operator_" + n + '" ' + "        onchange=\"w2ui['" + this.name + "'].initOperator(this, " + n + ');" onclick="event.stopPropagation();">' + '    <option value="is">' + w2utils.lang("is") + "</option>" + (["int"].indexOf(r.type) != -1 ? '<option value="in">' + w2utils.lang("in") + "</option>" : "") + (["int"].indexOf(r.type) != -1 ? '<option value="not in">' + w2utils.lang("not in") + "</option>" : "") + '<option value="between">' + w2utils.lang("between") + "</option>" + "</select>"
				}
				if (["select", "list", "hex"].indexOf(r.type) != -1) {
					var s = '<select id="grid_' + this.name + "_operator_" + n + '" onclick="event.stopPropagation();">' + '    <option value="is">' + w2utils.lang("is") + "</option>" + "</select>"
				}
				if (["enum"].indexOf(r.type) != -1) {
					var s = '<select id="grid_' + this.name + "_operator_" + n + '" onclick="event.stopPropagation();">' + '    <option value="in">' + w2utils.lang("in") + "</option>" + '    <option value="not in">' + w2utils.lang("not in") + "</option>" + "</select>"
				}
				e += "<tr>" + '    <td class="close-btn">' + i + "</td>" + '    <td class="caption">' + r.caption + "</td>" + '    <td class="operator">' + s + "</td>" + '    <td class="value">';
				switch (r.type) {
				case "text":
				case "alphanumeric":
				case "hex":
				case "list":
				case "combo":
				case "enum":
					e += '<input rel="search" type="text" style="width: 300px;" id="grid_' + this.name + "_field_" + n + '" name="' + r.field + '" ' + r.inTag + ">";
					break;
				case "int":
				case "float":
				case "money":
				case "currency":
				case "percent":
				case "date":
				case "time":
					e += '<input rel="search" type="text" size="12" id="grid_' + this.name + "_field_" + n + '" name="' + r.field + '" ' + r.inTag + ">" + '<span id="grid_' + this.name + "_range_" + n + '" style="display: none">' + '&nbsp;-&nbsp;&nbsp;<input rel="search" type="text" style="width: 90px" id="grid_' + this.name + "_field2_" + n + '" name="' + r.field + '" ' + r.inTag + ">" + "</span>";
					break;
				case "select":
					e += '<select rel="search" id="grid_' + this.name + "_field_" + n + '" name="' + r.field + '" ' + r.inTag + '  onclick="event.stopPropagation();"></select>';
					break
				}
				e += r.outTag + "    </td>" + "</tr>"
			}
			e += "<tr>" + '    <td colspan="4" class="actions">' + "        <div>" + '        <button class="w2ui-btn" onclick="obj = w2ui[\'' + this.name + "']; if (obj) { obj.searchReset(); }\">" + w2utils.lang("Reset") + "</button>" + '        <button class="w2ui-btn w2ui-btn-blue" onclick="obj = w2ui[\'' + this.name + "']; if (obj) { obj.search(); }\">" + w2utils.lang("Search") + "</button>" + "        </div>" + "    </td>" + "</tr></table>";
			return e
		},
		initOperator: function (e, t) {
			var n = this;
			var r = n.searches[t];
			var i = $("#grid_" + n.name + "_range_" + t);
			var s = $("#grid_" + n.name + "_field_" + t);
			var o = s.parent().find("span input");
			if ($(e).val() == "in" || $(e).val() == "not in") {
				s.w2field("clear")
			} else {
				s.w2field(r.type)
			}
			if ($(e).val() == "between") {
				i.show();
				o.w2field(r.type)
			} else {
				i.hide()
			}
		},
		initSearches: function () {
			var e = this;
			for (var t = 0; t < this.searches.length; t++) {
				var n = this.searches[t];
				var r = this.getSearchData(n.field);
				var i = null;
				n.type = String(n.type).toLowerCase();
				if (typeof n.options != "object") n.options = {};
				switch (n.type) {
				case "text":
				case "alphanumeric":
					i = "begins";
					if (n.operator && ["is", "begins", "contains", "ends"].indexOf(n.operator) != -1) i = n.operator;
					if (["alphanumeric", "hex"].indexOf(n.type) != -1) {
						$("#grid_" + this.name + "_field_" + t).w2field(n.type, n.options)
					}
					break;
				case "int":
				case "float":
				case "money":
				case "currency":
				case "percent":
				case "date":
				case "time":
					if (r && r.type == "int" && ["in", "not in"].indexOf(r.operator) != -1) break;
					i = "is";
					if (n.operator && ["is", "between"].indexOf(n.operator) != -1) i = n.operator;
					$("#grid_" + this.name + "_field_" + t).w2field(n.type, n.options);
					$("#grid_" + this.name + "_field2_" + t).w2field(n.type, n.options);
					setTimeout(function () {
						$("#grid_" + e.name + "_field_" + t).keydown();
						$("#grid_" + e.name + "_field2_" + t).keydown()
					}, 1);
					break;
				case "hex":
					i = "is";
					if (n.operator && ["is", "between"].indexOf(n.operator) != -1) i = n.operator;
					break;
				case "list":
				case "combo":
				case "enum":
					if (n.type == "list") i = "is";
					if (n.type == "combo") {
						i = "begins";
						if (n.operator && ["is", "begins", "contains", "ends"].indexOf(n.operator) != -1) i = n.operator
					}
					if (n.type == "enum") {
						i = "in";
						if (n.operator && ["in", "not in"].indexOf(n.operator) != -1) i = n.operator
					}
					var s = n.options;
					if (n.type == "list") s.selected = {};
					if (n.type == "enum") s.selected = [];
					if (r) s.selected = r.value;
					$("#grid_" + this.name + "_field_" + t).w2field(n.type, $.extend({
						openOnFocus: true
					}, s));
					break;
				case "select":
					i = "is";
					var s = '<option value="">--</option>';
					for (var o = 0; o < n.options.items; o++) {
						var u = n.options.items[o];
						if ($.isPlainObject(n.options.items[o])) {
							var a = u.id;
							var f = u.text;
							if (typeof a == "undefined" && typeof u.value != "undefined") a = u.value;
							if (typeof f == "undefined" && typeof u.caption != "undefined") f = u.caption;
							if (a == null) a = "";
							s += '<option value="' + a + '">' + f + "</option>"
						} else {
							s += '<option value="' + u + '">' + u + "</option>"
						}
					}
					$("#grid_" + this.name + "_field_" + t).html(s);
					break
				}
				if (r != null) {
					if (r.type == "int" && ["in", "not in"].indexOf(r.operator) != -1) {
						$("#grid_" + this.name + "_field_" + t).w2field("clear").val(r.value)
					}
					$("#grid_" + this.name + "_operator_" + t).val(r.operator).trigger("change");
					if (!$.isArray(r.value)) {
						if (typeof r.value != "udefined") $("#grid_" + this.name + "_field_" + t).val(r.value).trigger("change")
					} else {
						if (["in", "not in"].indexOf(r.operator) != -1) {
							$("#grid_" + this.name + "_field_" + t).val(r.value).trigger("change")
						} else {
							$("#grid_" + this.name + "_field_" + t).val(r.value[0]).trigger("change");
							$("#grid_" + this.name + "_field2_" + t).val(r.value[1]).trigger("change")
						}
					}
				} else {
					$("#grid_" + this.name + "_operator_" + t).val(i).trigger("change")
				}
			}
			$("#w2ui-overlay-searches-" + this.name + " .w2ui-grid-searches *[rel=search]").on("keypress", function (t) {
				if (t.keyCode == 13) {
					e.search();
					$().w2overlay()
				}
			})
		},
		getColumnsHTML: function () {
			function n() {
				var t = "<tr>";
				if (e.columnGroups[e.columnGroups.length - 1].caption != "") e.columnGroups.push({
					caption: ""
				});
				if (e.show.lineNumbers) {
					t += '<td class="w2ui-head w2ui-col-number">' + "    <div>&nbsp;</div>" + "</td>"
				}
				if (e.show.selectColumn) {
					t += '<td class="w2ui-head w2ui-col-select">' + "    <div>&nbsp;</div>" + "</td>"
				}
				if (e.show.expandColumn) {
					t += '<td class="w2ui-head w2ui-col-expand">' + "    <div>&nbsp;</div>" + "</td>"
				}
				var n = 0;
				for (var r = 0; r < e.columnGroups.length; r++) {
					var i = e.columnGroups[r];
					var s = e.columns[n];
					if (typeof i.span == "undefined" || i.span != parseInt(i.span)) i.span = 1;
					if (typeof i.colspan != "undefined") i.span = i.colspan;
					if (i.master === true) {
						var o = "";
						for (var u = 0; u < e.sortData.length; u++) {
							if (e.sortData[u].field == s.field) {
								if ((new RegExp("asc", "i")).test(e.sortData[u].direction)) o = "w2ui-sort-up";
								if ((new RegExp("desc", "i")).test(e.sortData[u].direction)) o = "w2ui-sort-down"
							}
						}
						var a = "";
						if (s.resizable !== false) {
							a = '<div class="w2ui-resizer" name="' + n + '"></div>'
						}
						t += '<td id="grid_' + e.name + "_column_" + n + '" class="w2ui-head ' + o + '" col="' + n + '" rowspan="2" colspan="' + (i.span + (r == e.columnGroups.length - 1 ? 1 : 0)) + '" ' + "    onclick=\"w2ui['" + e.name + "'].columnClick('" + s.field + "', event);\">" + a + '    <div class="w2ui-col-group w2ui-col-header ' + (o ? "w2ui-col-sorted" : "") + '">' + '        <div class="' + o + '"></div>' + (!s.caption ? "&nbsp;" : s.caption) + "    </div>" + "</td>"
					} else {
						t += '<td id="grid_' + e.name + "_column_" + n + '" class="w2ui-head" col="' + n + '" ' + '        colspan="' + (i.span + (r == e.columnGroups.length - 1 ? 1 : 0)) + '">' + '    <div class="w2ui-col-group">' + (!i.caption ? "&nbsp;" : i.caption) + "    </div>" + "</td>"
					}
					n += i.span
				}
				t += "</tr>";
				return t
			}
			function r(t) {
				var n = "<tr>",
					r = e.reorderColumns && (!e.columnGroups || !e.columnGroups.length) ? " w2ui-reorder-cols-head " : "";
				if (e.show.lineNumbers) {
					n += '<td class="w2ui-head w2ui-col-number" onclick="w2ui[\'' + e.name + "'].columnClick('line-number', event);\">" + "    <div>#</div>" + "</td>"
				}
				if (e.show.selectColumn && e.show.selectColumn_All) {
					n += '<td class="w2ui-head w2ui-col-select" ' + 
						 '        onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + 
						 "    <div>" + 
						 '        <input type="checkbox" id="grid_' + e.name + '_check_all" tabIndex="-1"' + 
						 '            style="' + (e.multiSelect == false ? "display: none;" : "") + '"' + 
						 "            onclick=\"if (this.checked) w2ui['" + e.name + "'].selectAll(); " + 
						 "                     else w2ui['" + e.name + "'].selectNone(); " + 
						 '                     if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + 
						 "    </div>" + 
						 "</td>"
				}else if(e.show.selectColumn && !e.show.selectColumn_All){
					n += '<td class="w2ui-head w2ui-col-select" ' + 
						 '        onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + 
						 "    &nbsp;" + 
						 "</td>"
				}
				if (e.show.expandColumn) {
					n += '<td class="w2ui-head w2ui-col-expand">' + "    <div>&nbsp;</div>" + "</td>"
				}
				var i = 0;
				var s = 0;
				for (var o = 0; o < e.columns.length; o++) {
					var u = e.columns[o];
					var a = {};
					if (o == s) {
						s = s + (typeof e.columnGroups[i] != "undefined" ? parseInt(e.columnGroups[i].span) : 0);
						i++
					}
					if (typeof e.columnGroups[i - 1] != "undefined") var a = e.columnGroups[i - 1];
					if (u.hidden) continue;
					var f = "";
					for (var l = 0; l < e.sortData.length; l++) {
						if (e.sortData[l].field == u.field) {
							if ((new RegExp("asc", "i")).test(e.sortData[l].direction)) f = "w2ui-sort-up";
							if ((new RegExp("desc", "i")).test(e.sortData[l].direction)) f = "w2ui-sort-down"
						}
					}
					if (a["master"] !== true || t) {
						var c = "";
						if (u.resizable !== false) {
							c = '<div class="w2ui-resizer" name="' + o + '"></div>'
						}
						n += '<td id="grid_' + e.name + "_column_" + o + '" col="' + o + '" class="w2ui-head ' + f + r + '" ' + "    onclick=\"w2ui['" + e.name + "'].columnClick('" + u.field + "', event);\">" + c + '    <div class="w2ui-col-header ' + (f ? "w2ui-col-sorted" : "") + '">' + '        <div class="' + f + '"></div>' + (!u.caption ? "&nbsp;" : u.caption) + "    </div>" + "</td>"
					}
				}
				n += '<td class="w2ui-head w2ui-head-last"><div>&nbsp;</div></td>';
				n += "</tr>";
				return n
			}
			var e = this;
			var t = "";
			if (this.show.columnHeaders) {
				if (this.columnGroups.length > 0) {
					t = r(true) + n() + r(false)
				} else {
					t = r(true)
				}
			}
			return t
		},
		getRecordsHTML: function () {
			var e = this.records.length;
			if (this.searchData.length != 0 && !this.url) e = this.last.searchIds.length;
			if (e > this.vs_start) this.last.show_extra = this.vs_extra;
			else this.last.show_extra = this.vs_start;
			var t = $("#grid_" + this.name + "_records");
			var n = Math.floor(t.height() / this.recordHeight) + this.last.show_extra + 1;
			if (!this.fixedBody || n > e) n = e;
			var r = "<table>" + this.getRecordHTML(-1, 0);
			r += '<tr id="grid_' + this.name + '_rec_top" line="top" style="height: ' + 0 + 'px">' + '    <td colspan="200"></td>' + "</tr>";
			for (var i = 0; i < n; i++) {
				r += this.getRecordHTML(i, i + 1)
			}
			
			r += '<tr id="grid_' + this.name + '_rec_bottom" line="bottom" style="height: ' + (e - n) * this.recordHeight + 'px">' + '    <td colspan="200"></td>' + "</tr>" ;
			if(this.autoLoad_Show === true) r += '<tr id="grid_' + this.name + '_rec_more" style="display: none">' + '    <td colspan="200" class="w2ui-load-more"></td>' + "</tr>" ;
			r += "</table>";
			
			this.last.range_start = 0;
			this.last.range_end = n; 
			return r
		},
		getSummaryHTML: function () {
			if (this.summary.length == 0) return;
			var e = "<table>";
			for (var t = 0; t < this.summary.length; t++) {
				e += this.getRecordHTML(t, t + 1, true)
			}
			e += "</table>";
			return e
		},
		scroll: function (e) {
			function S() {
				if (!n.markSearch) return;
				clearTimeout(n.last.marker_timer);
				n.last.marker_timer = setTimeout(function () {
					var e = [];
					for (var t = 0; t < n.searchData.length; t++) {
						var r = n.searchData[t];
						if ($.inArray(r.value, e) == -1) e.push(r.value)
					}
					if (e.length > 0) $(n.box).find(".w2ui-grid-data > div").w2marker(e)
				}, 50)
			}
			var t = (new Date).getTime();
			var n = this;
			var r = $("#grid_" + this.name + "_records");
			var i = this.records.length;
			if (this.searchData.length != 0 && !this.url) i = this.last.searchIds.length;
			if (i == 0 || r.length == 0 || r.height() == 0) return;
			if (i > this.vs_start) this.last.show_extra = this.vs_extra;
			else this.last.show_extra = this.vs_start;
			if (r.height() < i * this.recordHeight && r.css("overflow-y") == "hidden") {
				if (this.total > 0) this.refresh();
				return
			}
			var s = Math.round(r[0].scrollTop / this.recordHeight + 1);
			var o = s + (Math.round(r.height() / this.recordHeight) - 1);
			if (s > i) s = i;
			if (o >= i - 1) o = i;
			var u = typeof this.url != "object" ? this.url : this.url.get;
			$("#grid_" + this.name + "_footer .w2ui-footer-right").html((n.show.statusRange ? w2utils.formatNumber(this.offset + s) + "-" + w2utils.formatNumber(this.offset + o) + " " + w2utils.lang("of") + " " + w2utils.formatNumber(this.total) : "") + (u && n.show.statusBuffered ? " (" + w2utils.lang("buffered") + " " + w2utils.formatNumber(i) + (this.offset > 0 ? ", skip " + w2utils.formatNumber(this.offset) : "") + ")" : ""));
			if (!u && (!this.fixedBody || this.total <= 300)) return;
			var a = Math.floor(r[0].scrollTop / this.recordHeight) - this.last.show_extra;
			var f = a + Math.floor(r.height() / this.recordHeight) + this.last.show_extra * 2 + 1;
			if (a < 1) a = 1;
			if (f > this.total) f = this.total;
			var l = r.find("#grid_" + this.name + "_rec_top");
			var c = r.find("#grid_" + this.name + "_rec_bottom");
			if (String(l.next().prop("id")).indexOf("_expanded_row") != -1) l.next().remove();
			if (this.total > f && String(c.prev().prop("id")).indexOf("_expanded_row") != -1) c.prev().remove();
			var h = parseInt(l.next().attr("line"));
			var p = parseInt(c.prev().attr("line"));
			if (h < a || h == 1 || this.last.pull_refresh) {
				if (f <= p + this.last.show_extra - 2 && f != this.total) return;
				this.last.pull_refresh = false;
				while (true) {
					var d = r.find("#grid_" + this.name + "_rec_top").next();
					if (d.attr("line") == "bottom") break;
					if (parseInt(d.attr("line")) < a) d.remove();
					else break
				}
				var d = r.find("#grid_" + this.name + "_rec_bottom").prev();
				var v = d.attr("line");
				if (v == "top") v = a;
				for (var m = parseInt(v) + 1; m <= f; m++) {
					if (!this.records[m - 1]) continue;
					if (this.records[m - 1].expanded === true) this.records[m - 1].expanded = false;
					c.before(this.getRecordHTML(m - 1, m))
				}
				S();
				setTimeout(function () {
					n.refreshRanges()
				}, 0)
			} else {
				if (a >= h - this.last.show_extra + 2 && a > 1) return;
				while (true) {
					var d = r.find("#grid_" + this.name + "_rec_bottom").prev();
					if (d.attr("line") == "top") break;
					if (parseInt(d.attr("line")) > f) d.remove();
					else break
				}
				var d = r.find("#grid_" + this.name + "_rec_top").next();
				var v = d.attr("line");
				if (v == "bottom") v = f;
				for (var m = parseInt(v) - 1; m >= a; m--) {
					if (!this.records[m - 1]) continue;
					if (this.records[m - 1].expanded === true) this.records[m - 1].expanded = false;
					l.after(this.getRecordHTML(m - 1, m))
				}
				S();
				setTimeout(function () {
					n.refreshRanges()
				}, 0)
			}
			var g = (a - 1) * n.recordHeight;
			var y = (i - f) * n.recordHeight;
			if (y < 0) y = 0;
			l.css("height", g + "px");
			c.css("height", y + "px");
			n.last.range_start = a;
			n.last.range_end = f;
			var b = Math.floor(r[0].scrollTop / this.recordHeight);
			var w = b + Math.floor(r.height() / this.recordHeight);
			if (w + 10 > i && this.last.pull_more !== true && i < this.total - this.offset) {
				if (this.autoLoad === true) {
					this.last.pull_more = true;
					this.last.xhr_offset += this.limit;
					this.request("get-records")
				} else {
					var E = $("#grid_" + this.name + "_rec_more");
					if (E.css("display") == "none") {
						E.show().on("click", function () {
							n.last.pull_more = true;
							n.last.xhr_offset += n.limit;
							n.request("get-records");
							$(this).find("td").html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>')
						})
					}
					if (E.find("td").text().indexOf("Load") == -1) {
						E.find("td").html("<div>" + w2utils.lang("Load") + " " + n.limit + " " + w2utils.lang("More") + "...</div>")
					}
				}
			}
			if (i >= this.total - this.offset) $("#grid_" + this.name + "_rec_more").hide();
			return
		},
		getRecordHTML: function (e, t, n) {
			var r = "";
			var i = this.last.selection;
			var s;
			if (e == -1) {
				r += '<tr line="0">';
				if (this.show.lineNumbers) r += '<td class="w2ui-col-number" style="height: 0px;"></td>';
				if (this.show.selectColumn) r += '<td class="w2ui-col-select" style="height: 0px;"></td>';
				if (this.show.expandColumn) r += '<td class="w2ui-col-expand" style="height: 0px;"></td>';
				for (var o = 0; o < this.columns.length; o++) {
					if (this.columns[o].hidden) continue;
					r += '<td class="w2ui-grid-data" col="' + o + '" style="height: 0px;"></td>'
				}
				r += '<td class="w2ui-grid-data-last" style="height: 0px;"></td>';
				r += "</tr>";
				return r
			}
			var u = typeof this.url != "object" ? this.url : this.url.get;
			if (n !== true) {
				if (this.searchData.length > 0 && !u) {
					if (e >= this.last.searchIds.length) return "";
					e = this.last.searchIds[e];
					s = this.records[e]
				} else {
					if (e >= this.records.length) return "";
					s = this.records[e]
				}
			} else {
				if (e >= this.summary.length) return "";
				s = this.summary[e]
			}
			if (!s) return "";
			var a = w2utils.escapeId(s.recid);
			var f = false;
			if (i.indexes.indexOf(e) != -1) f = true;
			r += '<tr id="grid_' + this.name + "_rec_" + s.recid + '" recid="' + s.recid + '" line="' + t + '" ' + ' class="' + (t % 2 == 0 ? "w2ui-even" : "w2ui-odd") + (f && this.selectType == "row" ? " w2ui-selected" : "") + (s.expanded === true ? " w2ui-expanded" : "") + '" ' + (n !== true ? w2utils.isIOS ? "    onclick  = \"var obj = w2ui['" + this.name + "']; obj.dblClick('" + s.recid + "', event);\"" : "    onclick  = \"var obj = w2ui['" + this.name + "']; obj.click('" + s.recid + "', event);\"" + "    oncontextmenu = \"var obj = w2ui['" + this.name + "']; obj.contextMenu('" + s.recid + "', event);\"" : "") + ' style="height: ' + this.recordHeight + "px; " + (!f && typeof s["style"] == "string" ? s["style"] : "") + '" ' + (typeof s["style"] == "string" ? 'custom_style="' + s["style"] + '"' : "") + ">";
			if (this.show.lineNumbers) {
				r += '<td id="grid_' + this.name + "_cell_" + e + "_number" + (n ? "_s" : "") + '" ' + '   class="w2ui-col-number ' + (f ? " w2ui-row-selected" : "") + '">' + (n !== true ? "<div>" + t + "</div>" : "") + "</td>"
			}
			if (this.show.selectColumn) {
				r += '<td id="grid_' + this.name + "_cell_" + e + "_select" + (n ? "_s" : "") + '" class="w2ui-grid-data w2ui-col-select" ' + '        onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + (n !== true ? "    <div>" + '        <input class="w2ui-grid-select-check" type="checkbox" tabIndex="-1"' + "            " + (f ? 'checked="checked"' : "") + "            onclick=\"var obj = w2ui['" + this.name + "']; " + "                if (!obj.multiSelect) { obj.selectNone(); }" + "                if (this.checked) obj.select('" + s.recid + "'); else obj.unselect('" + s.recid + "'); " + '                if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + "    </div>" : "") + "</td>"
			}
			if (this.show.expandColumn) {
				var l = "";
				if (s.expanded === true) l = "-";
				else l = "+";
				if (s.expanded == "none") l = "";
				if (s.expanded == "spinner") l = '<div class="w2ui-spinner" style="width: 16px; margin: -2px 2px;"></div>';
				r += '<td id="grid_' + this.name + "_cell_" + e + "_expand" + (n ? "_s" : "") + '" class="w2ui-grid-data w2ui-col-expand">' + (n !== true ? '    <div ondblclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;" ' + "            onclick=\"w2ui['" + this.name + "'].toggle('" + s.recid + "', event); " + '                if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + "        " + l + " </div>" : "") + "</td>"
			}
			var c = 0;
			while (true) {
				var h = this.columns[c];
				if (h.hidden) {
					c++;
					if (typeof this.columns[c] == "undefined") break;
					else continue
				}
				var p = !n && s.changes && typeof s.changes[h.field] != "undefined";
				var d = this.getCellHTML(e, c, n);
				var v = "";
				if (typeof h.render == "string") {
					var m = h.render.toLowerCase().split(":");
					if (["number", "int", "float", "money", "currency", "percent"].indexOf(m[0]) != -1) v += "text-align: right;"
				}
				if (typeof s.style == "object") {
					if (typeof s.style[c] == "string") v += s.style[c] + ";";
					if (typeof s.style[h.field] == "string") v += s.style[h.field] + ";"
				}
				var g = false;
				if (f && $.inArray(c, i.columns[e]) != -1) g = true;
				r += '<td class="w2ui-grid-data' + (g ? " w2ui-selected" : "") + (p ? " w2ui-changed" : "") + '" ' + '    id="grid_' + this.name + "_data_" + e + "_" + c + '" col="' + c + '" ' + '    style="' + v + (typeof h.style != "undefined" ? h.style : "") + '" ' + (typeof h.attr != "undefined" ? h.attr : "") + ">" + d + "</td>";
				c++;
				if (typeof this.columns[c] == "undefined") break
			}
			r += '<td class="w2ui-grid-data-last"></td>';
			r += "</tr>";
			return r
		},
		getCellHTML: function (e, t, n) {
			var r = this.columns[t];
			var i = n !== true ? this.records[e] : this.summary[e];
			var s = this.getCellValue(e, t, n);
			var o = r.editable;
			if (typeof r.render != "undefined") {
				if (typeof r.render == "function") {
					s = $.trim(r.render.call(this, i, e, t));
					if (s.length < 4 || s.substr(0, 4).toLowerCase() != "<div") s = "<div>" + s + "</div>"
				}
				if (typeof r.render == "object") s = "<div>" + (r.render[s] || "") + "</div>";
				if (typeof r.render == "string") {
					var u = r.render.toLowerCase().indexOf(":");
					var a = [];
					if (u == -1) {
						a[0] = r.render.toLowerCase();
						a[1] = ""
					} else {
						a[0] = r.render.toLowerCase().substr(0, u);
						a[1] = r.render.toLowerCase().substr(u + 1)
					}
					var f = "";
					var l = "";
					if (["number", "int", "float", "money", "currency", "percent"].indexOf(a[0]) != -1) {
						if (typeof a[1] == "undefined" || !w2utils.isInt(a[1])) a[1] = 0;
						if (a[1] > 20) a[1] = 20;
						if (a[1] < 0) a[1] = 0;
						if (["money", "currency"].indexOf(a[0]) != -1) {
							a[1] = w2utils.settings.currencyPrecision;
							f = w2utils.settings.currencyPrefix;
							l = w2utils.settings.currencySuffix
						}
						if (a[0] == "percent") {
							l = "%";
							if (a[1] !== "0") a[1] = 1
						}
						if (a[0] == "int") {
							a[1] = 0
						}
						s = "<div>" + (s !== "" ? f + w2utils.formatNumber(Number(s).toFixed(a[1])) + l : "") + "</div>"
					}
					if (a[0] == "time") {
						if (typeof a[1] == "undefined" || a[1] == "") a[1] = w2utils.settings.time_format;
						if (a[1] == "h12") a[1] = "hh:mi pm";
						if (a[1] == "h24") a[1] = "h24:mi";
						s = "<div>" + f + w2utils.formatTime(s, a[1]) + l + "</div>"
					}
					if (a[0] == "date") {
						if (typeof a[1] == "undefined" || a[1] == "") a[1] = w2utils.settings.date_display;
						s = "<div>" + f + w2utils.formatDate(s, a[1]) + l + "</div>"
					}
					if (a[0] == "datetime") {
						if (typeof a[1] == "undefined" || a[1] == "") a[1] = w2utils.settings.date_display + "|" + w2utils.settings.time_format;
						s = "<div>" + f + w2utils.formatDateTime(s, a[1]) + l + "</div>"
					}
					if (a[0] == "age") {
						s = "<div>" + f + w2utils.age(s) + l + "</div>"
					}
					if (a[0] == "toggle") {
						s = "<div>" + f + (s ? "Yes" : "") + l + "</div>"
					}
				}
			} else {
				var c = "";
				if (o && ["checkbox", "check"].indexOf(o.type) != -1) {
					var h = n ? -(e + 1) : e;
					c = "text-align: center";
					s = '<input type="checkbox" ' + (s ? "checked" : "") + ' onclick="' + "    var obj = w2ui['" + this.name + "']; " + "    obj.editChange.call(obj, this, " + h + ", " + t + ", event); " + '">'
				}
				if (!this.show.recordTitles) {
					var s = '<div style="' + c + '">' + s + "</div>"
				} else {
					var p = String(s).replace(/"/g, "''");
					if (typeof r.title != "undefined") {
						if (typeof r.title == "function") p = r.title.call(this, i, e, t);
						if (typeof r.title == "string") p = r.title
					}
					var s = '<div title="' + w2utils.stripTags(p) + '" style="' + c + '">' + s + "</div>"
				}
			}
			if (s == null || typeof s == "undefined") s = "";
			return s
		},
		getCellValue: function (e, t, n) {
			var r = this.columns[t];
			var i = n !== true ? this.records[e] : this.summary[e];
			var s = this.parseField(i, r.field);
			if (i.changes && typeof i.changes[r.field] != "undefined") s = i.changes[r.field];
			if (s == null || typeof s == "undefined") s = "";
			return s
		},
		getFooterHTML: function () {
			return "<div>" + '    <div class="w2ui-footer-left"></div>' + '    <div class="w2ui-footer-right"></div>' + '    <div class="w2ui-footer-center"></div>' + "</div>"
		},
		status: function (e) {
			if (typeof e != "undefined") {
				$("#grid_" + this.name + "_footer").find(".w2ui-footer-left").html(e)
			} else {
				var t = "";
				var n = this.getSelection();
				if (n.length > 0) {
					if (this.show.statusSelection && n.length > 1) {
						t = String(n.length).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " " + w2utils.lang("selected")
					}
					if (this.show.statusRecordID && n.length == 1) {
						var r = n[0];
						if (typeof r == "object") r = r.recid + ", " + w2utils.lang("Column") + ": " + r.column;
						t = w2utils.lang("Record ID") + ": " + r + " "
					}
				}
				$("#grid_" + this.name + "_footer .w2ui-footer-left").html(t);
				if (n.length == 1) this.toolbar.enable("w2ui-edit");
				else this.toolbar.disable("w2ui-edit");
				if (n.length >= 1) this.toolbar.enable("w2ui-delete");
				else this.toolbar.disable("w2ui-delete")
			}
		},
		lock: function (e, t) {
			var n = $(this.box).find("> div:first-child");
			var r = Array.prototype.slice.call(arguments, 0);
			r.unshift(n);
			setTimeout(function () {
				w2utils.lock.apply(window, r)
			}, 10)
		},
		unlock: function (e) {
			var t = this.box;
			setTimeout(function () {
				w2utils.unlock(t, e)
			}, 25)
		},
		stateSave: function (e) {
			if (!localStorage) return null;
			var t = {
				columns: [],
				show: $.extend({}, this.show),
				last: {
					search: this.last.search,
					multi: this.last.multi,
					logic: this.last.logic,
					caption: this.last.caption,
					field: this.last.field,
					scrollTop: this.last.scrollTop,
					scrollLeft: this.last.scrollLeft
				},
				sortData: [],
				searchData: []
			};
			for (var n = 0; n < this.columns.length; n++) {
				var r = this.columns[n];
				t.columns.push({
					field: r.field,
					hidden: r.hidden,
					size: r.size,
					sizeCalculated: r.sizeCalculated,
					sizeOriginal: r.sizeOriginal,
					sizeType: r.sizeType
				})
			}
			for (var n = 0; n < this.sortData.length; n++) t.sortData.push($.extend({}, this.sortData[n]));
			for (var n = 0; n < this.searchData.length; n++) t.searchData.push($.extend({}, this.searchData[n]));
			if (e !== true) {
				var i = this.trigger({
					phase: "before",
					type: "stateSave",
					target: this.name,
					state: t
				});
				if (i.isCancelled === true) {
					if (typeof callBack == "function") callBack({
						status: "error",
						message: "Request aborted."
					});
					return
				}
				try {
					var s = $.parseJSON(localStorage.w2ui || "{}");
					if (!s) s = {};
					if (!s.states) s.states = {};
					s.states[this.name] = t;
					localStorage.w2ui = JSON.stringify(s)
				} catch (o) {
					delete localStorage.w2ui;
					return null
				}
				this.trigger($.extend(i, {
					phase: "after"
				}))
			}
			return t
		},
		stateRestore: function (e) {
			var t = this;
			if (!e) {
				try {
					if (!localStorage) return false;
					var n = $.parseJSON(localStorage.w2ui || "{}");
					if (!n) n = {};
					if (!n.states) n.states = {};
					e = n.states[this.name]
				} catch (r) {
					delete localStorage.w2ui;
					return null
				}
			}
			var i = this.trigger({
				phase: "before",
				type: "stateRestore",
				target: this.name,
				state: e
			});
			if (i.isCancelled === true) {
				if (typeof callBack == "function") callBack({
					status: "error",
					message: "Request aborted."
				});
				return
			}
			if ($.isPlainObject(e)) {
				$.extend(this.show, e.show);
				$.extend(this.last, e.last);
				var s = this.last.scrollTop;
				var o = this.last.scrollLeft;
				for (var u = 0; u < e.columns.length; u++) {
					var n = e.columns[u];
					var a = this.getColumn(n.field);
					if (a) $.extend(a, n)
				}
				this.sortData.splice(0, this.sortData.length);
				for (var u = 0; u < e.sortData.length; u++) this.sortData.push(e.sortData[u]);
				this.searchData.splice(0, this.searchData.length);
				for (var u = 0; u < e.searchData.length; u++) this.searchData.push(e.searchData[u]);
				setTimeout(function () {
					if (!(typeof t.url != "object" ? t.url : t.url.get)) {
						if (t.sortData.length > 0) t.localSort();
						if (t.searchData.length > 0) t.localSearch()
					}
					t.last.scrollTop = s;
					t.last.scrollLeft = o;
					t.refresh()
				}, 1)
			}
			this.trigger($.extend(i, {
				phase: "after"
			}));
			return true
		},
		stateReset: function () {
			this.stateRestore(this.last.state);
			if (localStorage) {
				try {
					var e = $.parseJSON(localStorage.w2ui || "{}");
					if (e.states && e.states[this.name]) {
						delete e.states[this.name]
					}
					localStorage.w2ui = JSON.stringify(e)
				} catch (t) {
					delete localStorage.w2ui;
					return null
				}
			}
		},
		parseField: function (e, t) {
			var n = "";
			try {
				n = e;
				var r = String(t).split(".");
				for (var i = 0; i < r.length; i++) {
					n = n[r[i]]
				}
			} catch (s) {
				n = ""
			}
			return n
		},
		prepareData: function () {
			for (var e = 0; e < this.records.length; e++) {
				var t = this.records[e];
				for (var n = 0; n < this.columns.length; n++) {
					var r = this.columns[n];
					if (t[r.field] == null || typeof r.render != "string") continue;
					if (["number", "int", "float", "money", "currency", "percent"].indexOf(r.render.split(":")[0]) != -1) {
						if (typeof t[r.field] != "number") t[r.field] = parseFloat(t[r.field])
					}
					if (["date", "age"].indexOf(r.render.split(":")[0]) != -1) {
						if (!t[r.field + "_"]) {
							var i = t[r.field];
							if (w2utils.isInt(i)) i = parseInt(i);
							t[r.field + "_"] = new Date(i)
						}
					}
					if (["time"].indexOf(r.render) != -1) {
						if (w2utils.isTime(t[r.field])) {
							var s = w2utils.isTime(t[r.field], true);
							var i = new Date;
							i.setHours(s.hours, s.minutes, s.seconds ? s.seconds : 0, 0);
							if (!t[r.field + "_"]) t[r.field + "_"] = i
						} else {
							var s = t[r.field];
							if (w2utils.isInt(s)) s = parseInt(s);
							var s = s != null ? new Date(s) : new Date;
							var i = new Date;
							i.setHours(s.getHours(), s.getMinutes(), s.getSeconds(), 0);
							if (!t[r.field + "_"]) t[r.field + "_"] = i
						}
					}
				}
			}
		},
		nextCell: function (e, t) {
			var n = e + 1;
			if (this.columns.length == n) return null;
			if (t === true) {
				var r = this.columns[n].editable;
				if (this.columns[n].hidden || typeof r == "undefined" || r && ["checkbox", "check"].indexOf(r.type) != -1) return this.nextCell(n, t)
			}
			return n
		},
		prevCell: function (e, t) {
			var n = e - 1;
			if (n < 0) return null;
			if (t === true) {
				var r = this.columns[n].editable;
				if (this.columns[n].hidden || typeof r == "undefined" || r && ["checkbox", "check"].indexOf(r.type) != -1) return this.prevCell(n, t)
			}
			return n
		},
		nextRow: function (e) {
			if (e + 1 < this.records.length && this.last.searchIds.length == 0 || this.last.searchIds.length > 0 && e < this.last.searchIds[this.last.searchIds.length - 1]) {
				e++;
				if (this.last.searchIds.length > 0) {
					while (true) {
						if ($.inArray(e, this.last.searchIds) != -1 || e > this.records.length) break;
						e++
					}
				}
				return e
			} else {
				return null
			}
		},
		prevRow: function (e) {
			if (e > 0 && this.last.searchIds.length == 0 || this.last.searchIds.length > 0 && e > this.last.searchIds[0]) {
				e--;
				if (this.last.searchIds.length > 0) {
					while (true) {
						if ($.inArray(e, this.last.searchIds) != -1 || e < 0) break;
						e--
					}
				}
				return e
			} else {
				return null
			}
		}
	};
	$.extend(w2grid.prototype, w2utils.event);
	w2obj.grid = w2grid
})();
(function () {
	var e = function (e) {
		this.box = null;
		this.name = null;
		this.panels = [];
		this.tmp = {};
		this.padding = 1;
		this.resizer = 4;
		this.style = "";
		this.onShow = null;
		this.onHide = null;
		this.onResizing = null;
		this.onResizerClick = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onResize = null;
		this.onDestroy = null;
		$.extend(true, this, w2obj.layout, e)
	};
	var t = ["top", "left", "main", "preview", "right", "bottom"];
	$.fn.w2layout = function (n) {
		function f(e, t, n) {
			var r = e.get(t);
			if (r !== null && typeof n == "undefined") n = r.tabs;
			if (r === null || n === null) return false;
			if ($.isArray(n)) n = {
				tabs: n
			};
			$().w2destroy(e.name + "_" + t + "_tabs");
			r.tabs = $().w2tabs($.extend({}, n, {
				owner: e,
				name: e.name + "_" + t + "_tabs"
			}));
			r.show.tabs = true;
			return true
		}
		function l(e, t, n) {
			var r = e.get(t);
			if (r !== null && typeof n == "undefined") n = r.toolbar;
			if (r === null || n === null) return false;
			if ($.isArray(n)) n = {
				items: n
			};
			$().w2destroy(e.name + "_" + t + "_toolbar");
			r.toolbar = $().w2toolbar($.extend({}, n, {
				owner: e,
				name: e.name + "_" + t + "_toolbar"
			}));
			r.show.toolbar = true;
			return true
		}
		if ($.isPlainObject(n)) {
			if (!w2utils.checkName(n, "w2layout")) return;
			var r = n.panels || [];
			var i = new e(n);
			$.extend(i, {
				handlers: [],
				panels: []
			});
			for (var s = 0, o = r.length; s < o; s++) {
				i.panels[s] = $.extend(true, {}, e.prototype.panel, r[s]);
				if ($.isPlainObject(i.panels[s].tabs) || $.isArray(i.panels[s].tabs)) f(i, r[s].type);
				if ($.isPlainObject(i.panels[s].toolbar) || $.isArray(i.panels[s].toolbar)) l(i, r[s].type)
			}
			for (var u = 0; u < t.length; u++) {
				if (i.get(t[u]) !== null) continue;
				i.panels.push($.extend(true, {}, e.prototype.panel, {
					type: t[u],
					hidden: t[u] !== "main",
					size: 50
				}))
			}
			if ($(this).length > 0) {
				i.render($(this)[0])
			}
			w2ui[i.name] = i;
			return i
		} else {
			var a = w2ui[$(this).attr("name")];
			if (!a) return null;
			if (arguments.length > 0) {
				if (a[n]) a[n].apply(a, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return a
			}
		}
	};
	e.prototype = {
		panel: {
			type: null,
			title: "",
			size: 100,
			minSize: 20,
			maxSize: false,
			hidden: false,
			resizable: false,
			overflow: "auto",
			style: "",
			content: "",
			tabs: null,
			toolbar: null,
			width: null,
			height: null,
			show: {
				toolbar: false,
				tabs: false
			},
			onRefresh: null,
			onShow: null,
			onHide: null
		},
		html: function (e, t, n) {
			return this.content(e, t, n)
		},
		content: function (e, t, n) {
			var r = this;
			var i = this.get(e);
			if (e == "css") {
				$("#layout_" + r.name + "_panel_css").html("<style>" + t + "</style>");
				return true
			}
			if (i === null) return false;
			if (typeof t == "undefined" || t === null) {
				return i.content
			} else {
				if (t instanceof jQuery) {
					console.log("ERROR: You can not pass jQuery object to w2layout.content() method");
					return false
				}
				var s = "#layout_" + this.name + "_panel_" + i.type;
				var o = $(s + "> .w2ui-panel-content");
				var u = 0;
				if (o.length > 0) {
					$(s).scrollTop(0);
					u = $(o).position().top
				}
				if (i.content === "") {
					i.content = t;
					this.refresh(e)
				} else {
					i.content = t;
					if (!i.hidden) {
						if (n !== null && n !== "" && typeof n != "undefined") {
							var a = $(s + "> .w2ui-panel-content");
							a.after('<div class="w2ui-panel-content new-panel" style="' + a[0].style.cssText + '"></div>');
							var f = $(s + "> .w2ui-panel-content.new-panel");
							a.css("top", u);
							f.css("top", u);
							if (typeof t == "object") {
								t.box = f[0];
								t.render()
							} else {
								f.html(t)
							}
							w2utils.transition(a[0], f[0], n, function () {
								a.remove();
								f.removeClass("new-panel");
								f.css("overflow", i.overflow);
								r.resize();
								if (window.navigator.userAgent.indexOf("MSIE") != -1) setTimeout(function () {
									r.resize()
								}, 100)
							})
						}
					}
					this.refresh(e)
				}
			}
			r.resize();
			if (window.navigator.userAgent.indexOf("MSIE") != -1) setTimeout(function () {
				r.resize()
			}, 100);
			return true
		},
		load: function (e, t, n, r) {
			var i = this;
			if (e == "css") {
				$.get(t, function (t, n, s) {
					i.content(e, s.responseText);
					if (r) r()
				});
				return true
			}
			if (this.get(e) !== null) {
				$.get(t, function (t, s, o) {
					i.content(e, o.responseText, n);
					if (r) r();
					i.resize();
					if (window.navigator.userAgent.indexOf("MSIE") != -1) setTimeout(function () {
						i.resize()
					}, 100)
				});
				return true
			}
			return false
		},
		sizeTo: function (e, t) {
			var n = this;
			var r = n.get(e);
			if (r === null) return false;
			$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", ".2s"));
			setTimeout(function () {
				n.set(e, {
					size: t
				})
			}, 1);
			setTimeout(function () {
				$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", "0s"));
				n.resize()
			}, 500);
			return true
		},
		show: function (e, t) {
			var n = this;
			var r = this.trigger({
				phase: "before",
				type: "show",
				target: e,
				object: this.get(e),
				immediate: t
			});
			if (r.isCancelled === true) return;
			var i = n.get(e);
			if (i === null) return false;
			i.hidden = false;
			if (t === true) {
				$("#layout_" + n.name + "_panel_" + e).css({
					opacity: "1"
				});
				if (i.resizable) $("#layout_" + n.name + "_resizer_" + e).show();
				n.trigger($.extend(r, {
					phase: "after"
				}));
				n.resize()
			} else {
				if (i.resizable) $("#layout_" + n.name + "_resizer_" + e).show();
				$("#layout_" + n.name + "_panel_" + e).css({
					opacity: "0"
				});
				$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", ".2s"));
				setTimeout(function () {
					n.resize()
				}, 1);
				setTimeout(function () {
					$("#layout_" + n.name + "_panel_" + e).css({
						opacity: "1"
					})
				}, 250);
				setTimeout(function () {
					$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", "0s"));
					n.trigger($.extend(r, {
						phase: "after"
					}));
					n.resize()
				}, 500)
			}
			return true
		},
		hide: function (e, t) {
			var n = this;
			var r = this.trigger({
				phase: "before",
				type: "hide",
				target: e,
				object: this.get(e),
				immediate: t
			});
			if (r.isCancelled === true) return;
			var i = n.get(e);
			if (i === null) return false;
			i.hidden = true;
			if (t === true) {
				$("#layout_" + n.name + "_panel_" + e).css({
					opacity: "0"
				});
				$("#layout_" + n.name + "_resizer_" + e).hide();
				n.trigger($.extend(r, {
					phase: "after"
				}));
				n.resize()
			} else {
				$("#layout_" + n.name + "_resizer_" + e).hide();
				$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", ".2s"));
				$("#layout_" + n.name + "_panel_" + e).css({
					opacity: "0"
				});
				setTimeout(function () {
					n.resize()
				}, 1);
				setTimeout(function () {
					$(n.box).find(" > div > .w2ui-panel").css(w2utils.cssPrefix("transition", "0s"));
					n.trigger($.extend(r, {
						phase: "after"
					}));
					n.resize()
				}, 500)
			}
			return true
		},
		toggle: function (e, t) {
			var n = this.get(e);
			if (n === null) return false;
			if (n.hidden) return this.show(e, t);
			else return this.hide(e, t)
		},
		set: function (e, t) {
			var n = this.get(e, true);
			if (n === null) return false;
			$.extend(this.panels[n], t);
			if (typeof t["content"] != "undefined") this.refresh(e);
			var r = $("#layout_" + this.name + "_resizer_" + e);
			if (t.resizable) r.show();
			else r.hide();
			this.resize();
			return true
		},
		get: function (e, t) {
			for (var n = 0; n < this.panels.length; n++) {
				if (this.panels[n].type == e) {
					if (t === true) return n;
					else return this.panels[n]
				}
			}
			return null
		},
		el: function (e) {
			var t = $("#layout_" + this.name + "_panel_" + e + "> .w2ui-panel-content");
			if (t.length != 1) return null;
			return t[0]
		},
		hideToolbar: function (e) {
			var t = this.get(e);
			if (!t) return;
			t.show.toolbar = false;
			$("#layout_" + this.name + "_panel_" + e + "> .w2ui-panel-toolbar").hide();
			this.resize()
		},
		showToolbar: function (e) {
			var t = this.get(e);
			if (!t) return;
			t.show.toolbar = true;
			$("#layout_" + this.name + "_panel_" + e + "> .w2ui-panel-toolbar").show();
			this.resize()
		},
		toggleToolbar: function (e) {
			var t = this.get(e);
			if (!t) return;
			if (t.show.toolbar) this.hideToolbar(e);
			else this.showToolbar(e)
		},
		hideTabs: function (e) {
			var t = this.get(e);
			if (!t) return;
			t.show.tabs = false;
			$("#layout_" + this.name + "_panel_" + e + "> .w2ui-panel-tabs").hide();
			this.resize()
		},
		showTabs: function (e) {
			var t = this.get(e);
			if (!t) return;
			t.show.tabs = true;
			$("#layout_" + this.name + "_panel_" + e + "> .w2ui-panel-tabs").show();
			this.resize()
		},
		toggleTabs: function (e) {
			var t = this.get(e);
			if (!t) return;
			if (t.show.tabs) this.hideTabs(e);
			else this.showTabs(e)
		},
		render: function (e) {
			function a() {
				n.tmp.events = {
					resize: function (e) {
						w2ui[n.name].resize()
					},
					resizeStart: f,
					mouseMove: c,
					mouseUp: l
				};
				$(window).on("resize", n.tmp.events.resize)
			}
			function f(e, r) {
				if (!n.box) return;
				if (!r) r = window.event;
				if (!window.addEventListener) {
					window.document.attachEvent("onselectstart", function () {
						return false
					})
				}
				$(document).off("mousemove", n.tmp.events.mouseMove).on("mousemove", n.tmp.events.mouseMove);
				$(document).off("mouseup", n.tmp.events.mouseUp).on("mouseup", n.tmp.events.mouseUp);
				n.tmp.resize = {
					type: e,
					x: r.screenX,
					y: r.screenY,
					diff_x: 0,
					diff_y: 0,
					value: 0
				};
				for (var i = 0; i < t.length; i++) {
					var s = $(n.el(t[i])).parent().find(".w2ui-lock");
					if (s.length > 0) {
						s.attr("locked", "previous")
					} else {
						n.lock(t[i], {
							opacity: 0
						})
					}
				}
				if (e == "left" || e == "right") {
					n.tmp.resize.value = parseInt($("#layout_" + n.name + "_resizer_" + e)[0].style.left)
				}
				if (e == "top" || e == "preview" || e == "bottom") {
					n.tmp.resize.value = parseInt($("#layout_" + n.name + "_resizer_" + e)[0].style.top)
				}
			}
			function l(e) {
				if (!n.box) return;
				if (!e) e = window.event;
				if (!window.addEventListener) {
					window.document.attachEvent("onselectstart", function () {
						return false
					})
				}
				$(document).off("mousemove", n.tmp.events.mouseMove);
				$(document).off("mouseup", n.tmp.events.mouseUp);
				if (typeof n.tmp.resize == "undefined") return;
				for (var r = 0; r < t.length; r++) {
					var i = $(n.el(t[r])).parent().find(".w2ui-lock");
					if (i.attr("locked") == "previous") {
						i.removeAttr("locked")
					} else {
						n.unlock(t[r])
					}
				}
				if (n.tmp.diff_x !== 0 || n.tmp.resize.diff_y !== 0) {
					var s = n.get("top");
					var o = n.get("bottom");
					var u = n.get(n.tmp.resize.type);
					var a = parseInt($(n.box).height());
					var f = parseInt($(n.box).width());
					var l = String(u.size);
					var c, h;
					switch (n.tmp.resize.type) {
					case "top":
						c = parseInt(u.sizeCalculated) + n.tmp.resize.diff_y;
						h = 0;
						break;
					case "bottom":
						c = parseInt(u.sizeCalculated) - n.tmp.resize.diff_y;
						h = 0;
						break;
					case "preview":
						c = parseInt(u.sizeCalculated) - n.tmp.resize.diff_y;
						h = (s && !s.hidden ? s.sizeCalculated : 0) + (o && !o.hidden ? o.sizeCalculated : 0);
						break;
					case "left":
						c = parseInt(u.sizeCalculated) + n.tmp.resize.diff_x;
						h = 0;
						break;
					case "right":
						c = parseInt(u.sizeCalculated) - n.tmp.resize.diff_x;
						h = 0;
						break
					}
					if (l.substr(l.length - 1) == "%") {
						u.size = Math.floor(c * 100 / (u.type == "left" || u.type == "right" ? f : a - h) * 100) / 100 + "%"
					} else {
						u.size = c
					}
					n.resize()
				}
				$("#layout_" + n.name + "_resizer_" + n.tmp.resize.type).removeClass("active");
				delete n.tmp.resize
			}
			function c(e) {
				if (!n.box) return;
				if (!e) e = window.event;
				if (typeof n.tmp.resize == "undefined") return;
				var t = n.get(n.tmp.resize.type);
				var r = n.tmp.resize;
				var i = n.trigger({
					phase: "before",
					type: "resizing",
					target: n.name,
					object: t,
					originalEvent: e,
					panel: r ? r.type : "all",
					diff_x: r ? r.diff_x : 0,
					diff_y: r ? r.diff_y : 0
				});
				if (i.isCancelled === true) return;
				var s = $("#layout_" + n.name + "_resizer_" + r.type);
				var o = e.screenX - r.x;
				var u = e.screenY - r.y;
				var a = n.get("main");
				if (!s.hasClass("active")) s.addClass("active");
				switch (r.type) {
				case "left":
					if (t.minSize - o > t.width) {
						o = t.minSize - t.width
					}
					if (t.maxSize && t.width + o > t.maxSize) {
						o = t.maxSize - t.width
					}
					if (a.minSize + o > a.width) {
						o = a.width - a.minSize
					}
					break;
				case "right":
					if (t.minSize + o > t.width) {
						o = t.width - t.minSize
					}
					if (t.maxSize && t.width - o > t.maxSize) {
						o = t.width - t.maxSize
					}
					if (a.minSize - o > a.width) {
						o = a.minSize - a.width
					}
					break;
				case "top":
					if (t.minSize - u > t.height) {
						u = t.minSize - t.height
					}
					if (t.maxSize && t.height + u > t.maxSize) {
						u = t.maxSize - t.height
					}
					if (a.minSize + u > a.height) {
						u = a.height - a.minSize
					}
					break;
				case "preview":
				case "bottom":
					if (t.minSize + u > t.height) {
						u = t.height - t.minSize
					}
					if (t.maxSize && t.height - u > t.maxSize) {
						u = t.height - t.maxSize
					}
					if (a.minSize - u > a.height) {
						u = a.minSize - a.height
					}
					break
				}
				r.diff_x = o;
				r.diff_y = u;
				switch (r.type) {
				case "top":
				case "preview":
				case "bottom":
					r.diff_x = 0;
					if (s.length > 0) s[0].style.top = r.value + r.diff_y + "px";
					break;
				case "left":
				case "right":
					r.diff_y = 0;
					if (s.length > 0) s[0].style.left = r.value + r.diff_x + "px";
					break
				}
				n.trigger($.extend(i, {
					phase: "after"
				}))
			}
			var n = this;
			var r = (new Date).getTime();
			var i = n.trigger({
				phase: "before",
				type: "render",
				target: n.name,
				box: e
			});
			if (i.isCancelled === true) return;
			if (typeof e != "undefined" && e !== null) {
				if ($(n.box).find("#layout_" + n.name + "_panel_main").length > 0) {
					$(n.box).removeAttr("name").removeClass("w2ui-layout").html("")
				}
				n.box = e
			}
			if (!n.box) return false;
			$(n.box).attr("name", n.name).addClass("w2ui-layout").html("<div></div>");
			if ($(n.box).length > 0) $(n.box)[0].style.cssText += n.style;
			for (var s = 0; s < t.length; s++) {
				var o = n.get(t[s]);
				var u = '<div id="layout_' + n.name + "_panel_" + t[s] + '" class="w2ui-panel">' + '    <div class="w2ui-panel-title"></div>' + '    <div class="w2ui-panel-tabs"></div>' + '    <div class="w2ui-panel-toolbar"></div>' + '    <div class="w2ui-panel-content"></div>' + "</div>" + '<div id="layout_' + n.name + "_resizer_" + t[s] + '" class="w2ui-resizer"></div>';
				$(n.box).find(" > div").append(u)
			}
			$(n.box).find(" > div").append('<div id="layout_' + n.name + '_panel_css" style="position: absolute; top: 10000px;"></div');
			n.refresh();
			n.trigger($.extend(i, {
				phase: "after"
			}));
			setTimeout(function () {
				a();
				n.resize()
			}, 0);
			return (new Date).getTime() - r
		},
		refresh: function (e) {
			var t = this;
			if (typeof e == "undefined") e = null;
			var n = (new Date).getTime();
			var r = t.trigger({
				phase: "before",
				type: "refresh",
				target: typeof e != "undefined" ? e : t.name,
				object: t.get(e)
			});
			if (r.isCancelled === true) return;
			if (typeof e == "string") {
				var i = t.get(e);
				if (i === null) return;
				var s = "#layout_" + t.name + "_panel_" + i.type;
				var o = "#layout_" + t.name + "_resizer_" + i.type;
				$(s).css({
					display: i.hidden ? "none" : "block"
				});
				if (i.resizable) $(o).show();
				else $(o).hide();
				if (typeof i.content == "object" && typeof i.content.render === "function") {
					i.content.box = $(s + "> .w2ui-panel-content")[0];
					setTimeout(function () {
						if ($(s + "> .w2ui-panel-content").length > 0) {
							$(s + "> .w2ui-panel-content").removeClass().removeAttr("name").addClass("w2ui-panel-content").css("overflow", i.overflow)[0].style.cssText += ";" + i.style
						}
						i.content.render()
					}, 1)
				} else {
					if ($(s + "> .w2ui-panel-content").length > 0) {
						$(s + "> .w2ui-panel-content").removeClass().removeAttr("name").addClass("w2ui-panel-content").html(i.content).css("overflow", i.overflow)[0].style.cssText += ";" + i.style
					}
				}
				var u = $(t.box).find(s + "> .w2ui-panel-tabs");
				if (i.show.tabs) {
					if (u.find("[name=" + i.tabs.name + "]").length === 0 && i.tabs !== null) u.w2render(i.tabs);
					else i.tabs.refresh()
				} else {
					u.html("").removeClass("w2ui-tabs").hide()
				}
				u = $(t.box).find(s + "> .w2ui-panel-toolbar");
				if (i.show.toolbar) {
					if (u.find("[name=" + i.toolbar.name + "]").length === 0 && i.toolbar !== null) u.w2render(i.toolbar);
					else i.toolbar.refresh()
				} else {
					u.html("").removeClass("w2ui-toolbar").hide()
				}
				u = $(t.box).find(s + "> .w2ui-panel-title");
				if (i.title) {
					u.html(i.title).show()
				} else {
					u.html("").hide()
				}
			} else {
				if ($("#layout_" + t.name + "_panel_main").length == 0) {
					t.render();
					return
				}
				t.resize();
				for (var a = 0; a < this.panels.length; a++) {
					t.refresh(this.panels[a].type)
				}
			}
			t.trigger($.extend(r, {
				phase: "after"
			}));
			return (new Date).getTime() - n
		},
		resize: function () {
			if (!this.box) return false;
			var e = (new Date).getTime();
			var n = this.tmp.resize;
			var r = this.trigger({
				phase: "before",
				type: "resize",
				target: this.name,
				panel: n ? n.type : "all",
				diff_x: n ? n.diff_x : 0,
				diff_y: n ? n.diff_y : 0
			});
			if (r.isCancelled === true) return;
			if (this.padding < 0) this.padding = 0;
			var i = parseInt($(this.box).width());
			var s = parseInt($(this.box).height());
			$(this.box).find(" > div").css({
				width: i + "px",
				height: s + "px"
			});
			var o = this;
			var u = this.get("main");
			var a = this.get("preview");
			var f = this.get("left");
			var l = this.get("right");
			var c = this.get("top");
			var h = this.get("bottom");
			var p = true;
			var d = a !== null && a.hidden !== true ? true : false;
			var v = f !== null && f.hidden !== true ? true : false;
			var m = l !== null && l.hidden !== true ? true : false;
			var g = c !== null && c.hidden !== true ? true : false;
			var y = h !== null && h.hidden !== true ? true : false;
			var b, w, E, S, x;
			for (var T = 0; T < t.length; T++) {
				if (t[T] === "main") continue;
				var n = this.get(t[T]);
				if (!n) continue;
				var N = String(n.size || 0);
				if (N.substr(N.length - 1) == "%") {
					var C = s;
					if (n.type == "preview") {
						C = C - (c && !c.hidden ? c.sizeCalculated : 0) - (h && !h.hidden ? h.sizeCalculated : 0)
					}
					n.sizeCalculated = parseInt((n.type == "left" || n.type == "right" ? i : C) * parseFloat(n.size) / 100)
				} else {
					n.sizeCalculated = parseInt(n.size)
				}
				n.sizeCalculated = Math.max(n.sizeCalculated, parseInt(n.minSize))
			}
			if (c !== null && c.hidden !== true) {
				b = 0;
				w = 0;
				E = i;
				S = c.sizeCalculated;
				$("#layout_" + this.name + "_panel_top").css({
					display: "block",
					left: b + "px",
					top: w + "px",
					width: E + "px",
					height: S + "px"
				}).show();
				c.width = E;
				c.height = S;
				if (c.resizable) {
					w = c.sizeCalculated - (this.padding === 0 ? this.resizer : 0);
					S = this.resizer > this.padding ? this.resizer : this.padding;
					$("#layout_" + this.name + "_resizer_top").show().css({
						display: "block",
						left: b + "px",
						top: w + "px",
						width: E + "px",
						height: S + "px",
						cursor: "ns-resize"
					}).off("mousedown").on("mousedown", function (e) {
						var t = o.trigger({
							phase: "before",
							type: "resizerClick",
							target: "top",
							originalEvent: e
						});
						if (t.isCancelled === true) return;
						w2ui[o.name].tmp.events.resizeStart("top", e);
						o.trigger($.extend(t, {
							phase: "after"
						}));
						return false
					})
				}
			} else {
				$("#layout_" + this.name + "_panel_top").hide()
			}
			if (f !== null && f.hidden !== true) {
				b = 0;
				w = 0 + (g ? c.sizeCalculated + this.padding : 0);
				E = f.sizeCalculated;
				S = s - (g ? c.sizeCalculated + this.padding : 0) - (y ? h.sizeCalculated + this.padding : 0);
				x = $("#layout_" + this.name + "_panel_left");
				if (window.navigator.userAgent.indexOf("MSIE") != -1 && x.length > 0 && x[0].clientHeight < x[0].scrollHeight) E += 17;
				x.css({
					display: "block",
					left: b + "px",
					top: w + "px",
					width: E + "px",
					height: S + "px"
				}).show();
				f.width = E;
				f.height = S;
				if (f.resizable) {
					b = f.sizeCalculated - (this.padding === 0 ? this.resizer : 0);
					E = this.resizer > this.padding ? this.resizer : this.padding;
					$("#layout_" + this.name + "_resizer_left").show().css({
						display: "block",
						left: b + "px",
						top: w + "px",
						width: E + "px",
						height: S + "px",
						cursor: "ew-resize"
					}).off("mousedown").on("mousedown", function (e) {
						var t = o.trigger({
							phase: "before",
							type: "resizerClick",
							target: "left",
							originalEvent: e
						});
						if (t.isCancelled === true) return;
						w2ui[o.name].tmp.events.resizeStart("left", e);
						o.trigger($.extend(t, {
							phase: "after"
						}));
						return false
					})
				}
			} else {
				$("#layout_" + this.name + "_panel_left").hide();
				$("#layout_" + this.name + "_resizer_left").hide()
			}
			if (l !== null && l.hidden !== true) {
				b = i - l.sizeCalculated;
				w = 0 + (g ? c.sizeCalculated + this.padding : 0);
				E = l.sizeCalculated;
				S = s - (g ? c.sizeCalculated + this.padding : 0) - (y ? h.sizeCalculated + this.padding : 0);
				$("#layout_" + this.name + "_panel_right").css({
					display: "block",
					left: b + "px",
					top: w + "px",
					width: E + "px",
					height: S + "px"
				}).show();
				l.width = E;
				l.height = S;
				if (l.resizable) {
					b = b - this.padding;
					E = this.resizer > this.padding ? this.resizer : this.padding;
					$("#layout_" + this.name + "_resizer_right").show().css({
						display: "block",
						left: b + "px",
						top: w + "px",
						width: E + "px",
						height: S + "px",
						cursor: "ew-resize"
					}).off("mousedown").on("mousedown", function (e) {
						var t = o.trigger({
							phase: "before",
							type: "resizerClick",
							target: "right",
							originalEvent: e
						});
						if (t.isCancelled === true) return;
						w2ui[o.name].tmp.events.resizeStart("right", e);
						o.trigger($.extend(t, {
							phase: "after"
						}));
						return false
					})
				}
			} else {
				$("#layout_" + this.name + "_panel_right").hide()
			}
			if (h !== null && h.hidden !== true) {
				b = 0;
				w = s - h.sizeCalculated;
				E = i;
				S = h.sizeCalculated;
				$("#layout_" + this.name + "_panel_bottom").css({
					display: "block",
					left: b + "px",
					top: w + "px",
					width: E + "px",
					height: S + "px"
				}).show();
				h.width = E;
				h.height = S;
				if (h.resizable) {
					w = w - (this.padding === 0 ? 0 : this.padding);
					S = this.resizer > this.padding ? this.resizer : this.padding;
					$("#layout_" + this.name + "_resizer_bottom").show().css({
						display: "block",
						left: b + "px",
						top: w + "px",
						width: E + "px",
						height: S + "px",
						cursor: "ns-resize"
					}).off("mousedown").on("mousedown", function (e) {
						var t = o.trigger({
							phase: "before",
							type: "resizerClick",
							target: "bottom",
							originalEvent: e
						});
						if (t.isCancelled === true) return;
						w2ui[o.name].tmp.events.resizeStart("bottom", e);
						o.trigger($.extend(t, {
							phase: "after"
						}));
						return false
					})
				}
			} else {
				$("#layout_" + this.name + "_panel_bottom").hide()
			}
			b = 0 + (v ? f.sizeCalculated + this.padding : 0);
			w = 0 + (g ? c.sizeCalculated + this.padding : 0);
			E = i - (v ? f.sizeCalculated + this.padding : 0) - (m ? l.sizeCalculated + this.padding : 0);
			S = s - (g ? c.sizeCalculated + this.padding : 0) - (y ? h.sizeCalculated + this.padding : 0) - (d ? a.sizeCalculated + this.padding : 0);
			x = $("#layout_" + this.name + "_panel_main");
			if (window.navigator.userAgent.indexOf("MSIE") != -1 && x.length > 0 && x[0].clientHeight < x[0].scrollHeight) E += 17;
			x.css({
				display: "block",
				left: b + "px",
				top: w + "px",
				width: E + "px",
				height: S + "px"
			});
			u.width = E;
			u.height = S;
			if (a !== null && a.hidden !== true) {
				b = 0 + (v ? f.sizeCalculated + this.padding : 0);
				w = s - (y ? h.sizeCalculated + this.padding : 0) - a.sizeCalculated;
				E = i - (v ? f.sizeCalculated + this.padding : 0) - (m ? l.sizeCalculated + this.padding : 0);
				S = a.sizeCalculated;
				x = $("#layout_" + this.name + "_panel_preview");
				if (window.navigator.userAgent.indexOf("MSIE") != -1 && x.length > 0 && x[0].clientHeight < x[0].scrollHeight) E += 17;
				x.css({
					display: "block",
					left: b + "px",
					top: w + "px",
					width: E + "px",
					height: S + "px"
				}).show();
				a.width = E;
				a.height = S;
				if (a.resizable) {
					w = w - (this.padding === 0 ? 0 : this.padding);
					S = this.resizer > this.padding ? this.resizer : this.padding;
					$("#layout_" + this.name + "_resizer_preview").show().css({
						display: "block",
						left: b + "px",
						top: w + "px",
						width: E + "px",
						height: S + "px",
						cursor: "ns-resize"
					}).off("mousedown").on("mousedown", function (e) {
						var t = o.trigger({
							phase: "before",
							type: "resizerClick",
							target: "preview",
							originalEvent: e
						});
						if (t.isCancelled === true) return;
						w2ui[o.name].tmp.events.resizeStart("preview", e);
						o.trigger($.extend(t, {
							phase: "after"
						}));
						return false
					})
				}
			} else {
				$("#layout_" + this.name + "_panel_preview").hide()
			}
			for (var k = 0; k < t.length; k++) {
				var L = this.get(t[k]);
				var A = "#layout_" + this.name + "_panel_" + t[k] + " > .w2ui-panel-";
				var O = 0;
				if (L) {
					if (L.title) {
						O += w2utils.getSize($(A + "title").css({
							top: O + "px",
							display: "block"
						}), "height")
					}
					if (L.show.tabs) {
						if (L.tabs !== null && w2ui[this.name + "_" + t[k] + "_tabs"]) w2ui[this.name + "_" + t[k] + "_tabs"].resize();
						O += w2utils.getSize($(A + "tabs").css({
							top: O + "px",
							display: "block"
						}), "height")
					}
					if (L.show.toolbar) {
						if (L.toolbar !== null && w2ui[this.name + "_" + t[k] + "_toolbar"]) w2ui[this.name + "_" + t[k] + "_toolbar"].resize();
						O += w2utils.getSize($(A + "toolbar").css({
							top: O + "px",
							display: "block"
						}), "height")
					}
				}
				$(A + "content").css({
					display: "block"
				}).css({
					top: O + "px"
				})
			}
			clearTimeout(this._resize_timer);
			this._resize_timer = setTimeout(function () {
				for (var e in w2ui) {
					if (typeof w2ui[e].resize == "function") {
						if (w2ui[e].panels == "undefined") w2ui[e].resize();
						var t = $(w2ui[e].box).parents(".w2ui-layout");
						if (t.length > 0 && t.attr("name") == o.name) w2ui[e].resize()
					}
				}
			}, 100);
			this.trigger($.extend(r, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				type: "destroy",
				target: this.name
			});
			if (e.isCancelled === true) return;
			if (typeof w2ui[this.name] == "undefined") return false;
			if ($(this.box).find("#layout_" + this.name + "_panel_main").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-layout").html("")
			}
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}));
			if (this.tmp.events && this.tmp.events.resize) $(window).off("resize", this.tmp.events.resize);
			return true
		},
		lock: function (e, n, r) {
			if (t.indexOf(e) == -1) {
				console.log("ERROR: First parameter needs to be the a valid panel name.");
				return
			}
			var i = Array.prototype.slice.call(arguments, 0);
			i[0] = "#layout_" + this.name + "_panel_" + e;
			w2utils.lock.apply(window, i)
		},
		unlock: function (e, n) {
			if (t.indexOf(e) == -1) {
				console.log("ERROR: First parameter needs to be the a valid panel name.");
				return
			}
			var r = "#layout_" + this.name + "_panel_" + e;
			w2utils.unlock(r, n)
		}
	};
	$.extend(e.prototype, w2utils.event);
	w2obj.layout = e
})();
var w2popup = {};
(function () {
	$.fn.w2popup = function (e, t) {
		if (typeof e === "undefined") {
			t = {};
			e = "open"
		}
		if ($.isPlainObject(e)) {
			t = e;
			e = "open"
		}
		e = e.toLowerCase();
		if (e === "load" && typeof t === "string") {
			t = $.extend({
				url: t
			}, arguments.length > 2 ? arguments[2] : {})
		}
		if (e === "open" && t.url != null) e = "load";
		t = t || {};
		var n = {};
		if ($(this).length > 0) {
			if ($(this).find("div[rel=title], div[rel=body], div[rel=buttons]").length > 0) {
				if ($(this).find("div[rel=title]").length > 0) {
					n["title"] = $(this).find("div[rel=title]").html()
				}
				if ($(this).find("div[rel=body]").length > 0) {
					n["body"] = $(this).find("div[rel=body]").html();
					n["style"] = $(this).find("div[rel=body]")[0].style.cssText
				}
				if ($(this).find("div[rel=buttons]").length > 0) {
					n["buttons"] = $(this).find("div[rel=buttons]").html()
				}
			} else {
				n["title"] = "&nbsp;";
				n["body"] = $(this).html()
			}
			if (parseInt($(this).css("width")) != 0) n["width"] = parseInt($(this).css("width"));
			if (parseInt($(this).css("height")) != 0) n["height"] = parseInt($(this).css("height"))
		}
		return w2popup[e]($.extend({}, n, t))
	};
	w2popup = {
		defaults: {
			title: "",
			body: "",
			buttons: "",
			style: "",
			color: "#000",
			opacity: .4,
			speed: .3,
			modal: false,
			maximized: false,
			keyboard: true,
			width: 500,
			height: 300,
			showClose: true,
			showMax: false,
			transition: null
		},
		status: "closed",
		handlers: [],
		onOpen: null,
		onClose: null,
		onMax: null,
		onMin: null,
		onToggle: null,
		onKeydown: null,
		open: function (e) {
			function d(e) {
				if (!e) e = window.event;
				if (!window.addEventListener) {
					window.document.attachEvent("onselectstart", function () {
						return false
					})
				}
				w2popup.status = "moving";
				p.resizing = true;
				p.isLocked = $("#w2ui-popup > .w2ui-lock").length == 1 ? true : false;
				p.x = e.screenX;
				p.y = e.screenY;
				p.pos_x = $("#w2ui-popup").position().left;
				p.pos_y = $("#w2ui-popup").position().top;
				if (!p.isLocked) w2popup.lock({
					opacity: 0
				});
				$(document).on("mousemove", p.mvMove);
				$(document).on("mouseup", p.mvStop);
				if (e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
				if (e.preventDefault) e.preventDefault();
				else return false
			}
			function v(e) {
				if (p.resizing != true) return;
				if (!e) e = window.event;
				p.div_x = e.screenX - p.x;
				p.div_y = e.screenY - p.y;
				$("#w2ui-popup").css(w2utils.cssPrefix({
					transition: "none",
					transform: "translate3d(" + p.div_x + "px, " + p.div_y + "px, 0px)"
				}))
			}
			function m(e) {
				if (p.resizing != true) return;
				if (!e) e = window.event;
				w2popup.status = "open";
				p.div_x = e.screenX - p.x;
				p.div_y = e.screenY - p.y;
				$("#w2ui-popup").css({
					left: p.pos_x + p.div_x + "px",
					top: p.pos_y + p.div_y + "px"
				}).css(w2utils.cssPrefix({
					transition: "none",
					transform: "translate3d(0px, 0px, 0px)"
				}));
				p.resizing = false;
				$(document).off("mousemove", p.mvMove);
				$(document).off("mouseup", p.mvStop);
				if (!p.isLocked) w2popup.unlock()
			}
			var t = this;
			if (w2popup.status == "closing") {
				setTimeout(function () {
					t.open.call(t, e)
				}, 100);
				return
			}
			var n = $("#w2ui-popup").data("options");
			var e = $.extend({}, this.defaults, n, {
				title: "",
				body: "",
				buttons: ""
			}, e, {
				maximized: false
			});
			setTimeout(function () {
				$("#w2ui-popup").data("options", e)
			}, 100);
			if ($("#w2ui-popup").length == 0) {
				w2popup.handlers = [];
				w2popup.onMax = null;
				w2popup.onMin = null;
				w2popup.onToggle = null;
				w2popup.onOpen = null;
				w2popup.onClose = null;
				w2popup.onKeydown = null
			}
			if (e.onOpen) w2popup.onOpen = e.onOpen;
			if (e.onClose) w2popup.onClose = e.onClose;
			if (e.onMax) w2popup.onMax = e.onMax;
			if (e.onMin) w2popup.onMin = e.onMin;
			if (e.onToggle) w2popup.onToggle = e.onToggle;
			if (e.onKeydown) w2popup.onKeydown = e.onKeydown;
			if (window.innerHeight == undefined) {
				var r = document.documentElement.offsetWidth;
				var i = document.documentElement.offsetHeight;
				if (w2utils.engine === "IE7") {
					r += 21;
					i += 4
				}
			} else {
				var r = window.innerWidth;
				var i = window.innerHeight
			}
			if (parseInt(r) - 10 < parseInt(e.width)) e.width = parseInt(r) - 10;
			if (parseInt(i) - 10 < parseInt(e.height)) e.height = parseInt(i) - 10;
			var s = parseInt((parseInt(i) - parseInt(e.height)) / 2 * .6);
			var o = parseInt((parseInt(r) - parseInt(e.width)) / 2);
			if ($("#w2ui-popup").length == 0) {
				var u = this.trigger({
					phase: "before",
					type: "open",
					target: "popup",
					options: e,
					present: false
				});
				if (u.isCancelled === true) return;
				w2popup.status = "opening";
				w2popup.lockScreen(e);
				var a = "";
				if (e.showClose) {
					a += '<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>'
				}
				if (e.showMax) {
					a += '<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>'
				}
				var f = '<div id="w2ui-popup" class="w2ui-popup" style="opacity: 0; left: ' + o + "px; top: " + s + "px;" + "     width: " + parseInt(e.width) + "px; height: " + parseInt(e.height) + "px; " + w2utils.cssPrefix("transform", "scale(0.8)", true) + '"' + ">" + '   <div class="w2ui-msg-title" style="' + (e.title == "" ? "display: none" : "") + '">' + a + e.title + "</div>" + '   <div class="w2ui-box1" style="' + (e.title == "" ? "top: 0px !important;" : "") + (e.buttons == "" ? "bottom: 0px !important;" : "") + '">' + '       <div class="w2ui-msg-body' + (!e.title != "" ? " w2ui-msg-no-title" : "") + (!e.buttons != "" ? " w2ui-msg-no-buttons" : "") + '" style="' + e.style + '">' + e.body + "</div>" + "   </div>" + '   <div class="w2ui-box2" style="' + (e.title == "" ? "top: 0px !important;" : "") + (e.buttons == "" ? "bottom: 0px !important;" : "") + '">' + '       <div class="w2ui-msg-body' + (!e.title != "" ? " w2ui-msg-no-title" : "") + (!e.buttons != "" ? " w2ui-msg-no-buttons" : "") + '" style="' + e.style + '"></div>' + "       </div>" + '   <div class="w2ui-msg-buttons" style="' + (e.buttons == "" ? "display: none" : "") + '">' + e.buttons + "</div>" + "</div>";
				$("body").append(f);
				setTimeout(function () {
					$("#w2ui-popup .w2ui-box2").hide();
					$("#w2ui-popup").css("opacity", "1").css(w2utils.cssPrefix({
						transition: e.speed + "s opacity, " + e.speed + "s -webkit-transform",
						transform: "scale(1)"
					}))
				}, 1);
				setTimeout(function () {
					$("#w2ui-popup").css(w2utils.cssPrefix("transform", ""));
					w2popup.status = "open";
					setTimeout(function () {
						t.trigger($.extend(u, {
							phase: "after"
						}))
					}, 100)
				}, e.speed * 1e3)
			} else {
				var u = this.trigger({
					phase: "before",
					type: "open",
					target: "popup",
					options: e,
					present: true
				});
				if (u.isCancelled === true) return;
				w2popup.status = "opening";
				if (typeof n != "undefined") {
					if (!n.maximized && (n["width"] != e["width"] || n["height"] != e["height"])) {
						w2popup.resize(e.width, e.height)
					}
					e.prevSize = e.width + "px:" + e.height + "px";
					e.maximized = n.maximized
				}
				var l = $("#w2ui-popup .w2ui-box2 > .w2ui-msg-body").html(e.body);
				if (l.length > 0) l[0].style.cssText = e.style;
				if (e.buttons != "") {
					$("#w2ui-popup .w2ui-msg-buttons").show().html(e.buttons);
					$("#w2ui-popup .w2ui-msg-body").removeClass("w2ui-msg-no-buttons");
					$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("bottom", "")
				} else {
					$("#w2ui-popup .w2ui-msg-buttons").hide().html("");
					$("#w2ui-popup .w2ui-msg-body").addClass("w2ui-msg-no-buttons");
					$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("bottom", "0px")
				}
				if (e.title != "") {
					$("#w2ui-popup .w2ui-msg-title").show().html((e.showClose ? '<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>' : "") + (e.showMax ? '<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>' : "") + e.title);
					$("#w2ui-popup .w2ui-msg-body").removeClass("w2ui-msg-no-title");
					$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("top", "")
				} else {
					$("#w2ui-popup .w2ui-msg-title").hide().html("");
					$("#w2ui-popup .w2ui-msg-body").addClass("w2ui-msg-no-title");
					$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("top", "0px")
				}
				var c = $("#w2ui-popup .w2ui-box1")[0];
				var h = $("#w2ui-popup .w2ui-box2")[0];
				w2utils.transition(c, h, e.transition);
				h.className = "w2ui-box1";
				c.className = "w2ui-box2";
				$(h).addClass("w2ui-current-box");
				$("#w2ui-popup").data("prev-size", null);
				setTimeout(function () {
					w2popup.status = "open";
					t.trigger($.extend(u, {
						phase: "after"
					}))
				}, 100)
			}
			e._last_w2ui_name = w2utils.keyboard.active();
			w2utils.keyboard.clear();
			if (e.keyboard) $(document).on("keydown", this.keydown);
			var p = {
				resizing: false,
				mvMove: v,
				mvStop: m
			};
			$("#w2ui-popup .w2ui-msg-title").on("mousedown", function (e) {
				if (!w2popup.get().maximized) d(e)
			});
			return this
		},
		keydown: function (e) {
			var t = $("#w2ui-popup").data("options");
			if (t && !t.keyboard) return;
			var n = w2popup.trigger({
				phase: "before",
				type: "keydown",
				target: "popup",
				options: t,
				originalEvent: e
			});
			if (n.isCancelled === true) return;
			switch (e.keyCode) {
			case 27:
				e.preventDefault();
				if ($("#w2ui-popup .w2ui-popup-message").length > 0) w2popup.message();
				else w2popup.close();
				break
			}
			w2popup.trigger($.extend(n, {
				phase: "after"
			}))
		},
		close: function (e) {
			var t = this;
			var e = $.extend({}, $("#w2ui-popup").data("options"), e);
			if ($("#w2ui-popup").length == 0) return;
			var n = this.trigger({
				phase: "before",
				type: "close",
				target: "popup",
				options: e
			});
			if (n.isCancelled === true) return;
			w2popup.status = "closing";
			$("#w2ui-popup").css("opacity", "0").css(w2utils.cssPrefix({
				transition: e.speed + "s opacity, " + e.speed + "s -webkit-transform",
				transform: "scale(0.9)"
			}));
			w2popup.unlockScreen(e);
			setTimeout(function () {
				$("#w2ui-popup").remove();
				w2popup.status = "closed";
				t.trigger($.extend(n, {
					phase: "after"
				}))
			}, e.speed * 1e3);
			w2utils.keyboard.active(e._last_w2ui_name, {});
			if (e.keyboard) $(document).off("keydown", this.keydown)
		},
		toggle: function () {
			var e = this;
			var t = $("#w2ui-popup").data("options");
			var n = this.trigger({
				phase: "before",
				type: "toggle",
				target: "popup",
				options: t
			});
			if (n.isCancelled === true) return;
			if (t.maximized === true) w2popup.min();
			else w2popup.max();
			setTimeout(function () {
				e.trigger($.extend(n, {
					phase: "after"
				}))
			}, t.speed * 1e3 + 50)
		},
		max: function () {
			var e = this;
			var t = $("#w2ui-popup").data("options");
			if (t.maximized === true) return;
			var n = this.trigger({
				phase: "before",
				type: "max",
				target: "popup",
				options: t
			});
			if (n.isCancelled === true) return;
			w2popup.status = "resizing";
			t.prevSize = $("#w2ui-popup").css("width") + ":" + $("#w2ui-popup").css("height");
			w2popup.resize(1e4, 1e4, function () {
				w2popup.status = "open";
				t.maximized = true;
				e.trigger($.extend(n, {
					phase: "after"
				}));
				$("#w2ui-popup .w2ui-grid, #w2ui-popup .w2ui-form, #w2ui-popup .w2ui-layout").each(function () {
					var e = $(this).attr("name");
					if (w2ui[e] && w2ui[e].resize) w2ui[e].resize()
				})
			})
		},
		min: function () {
			var e = this;
			var t = $("#w2ui-popup").data("options");
			if (t.maximized !== true) return;
			var n = t.prevSize.split(":");
			var r = this.trigger({
				phase: "before",
				type: "min",
				target: "popup",
				options: t
			});
			if (r.isCancelled === true) return;
			w2popup.status = "resizing";
			w2popup.resize(parseInt(n[0]), parseInt(n[1]), function () {
				w2popup.status = "open";
				t.maximized = false;
				t.prevSize = null;
				e.trigger($.extend(r, {
					phase: "after"
				}));
				$("#w2ui-popup .w2ui-grid, #w2ui-popup .w2ui-form, #w2ui-popup .w2ui-layout").each(function () {
					var e = $(this).attr("name");
					if (w2ui[e] && w2ui[e].resize) w2ui[e].resize()
				})
			})
		},
		get: function () {
			return $("#w2ui-popup").data("options")
		},
		set: function (e) {
			w2popup.open(e)
		},
		clear: function () {
			$("#w2ui-popup .w2ui-msg-title").html("");
			$("#w2ui-popup .w2ui-msg-body").html("");
			$("#w2ui-popup .w2ui-msg-buttons").html("")
		},
		reset: function () {
			w2popup.open(w2popup.defaults)
		},
		load: function (e) {
			function s(t, n) {
				delete e.url;
				$("body").append('<div id="w2ui-tmp" style="display: none">' + t + "</div>");
				if (typeof n != "undefined" && $("#w2ui-tmp #" + n).length > 0) {
					$("#w2ui-tmp #" + n).w2popup(e)
				} else {
					$("#w2ui-tmp > div").w2popup(e)
				}
				if ($("#w2ui-tmp > style").length > 0) {
					var r = $("<div>").append($("#w2ui-tmp > style").clone()).html();
					if ($("#w2ui-popup #div-style").length == 0) {
						$("#w2ui-popup").append('<div id="div-style" style="position: absolute; left: -100; width: 1px"></div>')
					}
					$("#w2ui-popup #div-style").html(r)
				}
				$("#w2ui-tmp").remove()
			}
			w2popup.status = "loading";
			if (String(e.url) == "undefined") {
				console.log("ERROR: The url parameter is empty.");
				return
			}
			var t = String(e.url).split("#");
			var n = t[0];
			var r = t[1];
			if (String(e) == "undefined") e = {};
			var i = $("#w2ui-popup").data(n);
			if (typeof i != "undefined" && i != null) {
				s(i, r)
			} else {
				$.get(n, function (e, t, i) {
					s(i.responseText, r);
					$("#w2ui-popup").data(n, i.responseText)
				})
			}
		},
		message: function (e) {
			$().w2tag();
			if (!e) e = {
				width: 200,
				height: 100
			};
			var t = parseInt($("#w2ui-popup").width());
			var n = parseInt($("#w2ui-popup").height());
			e.originalWidth = e.width;
			e.originalHeight = e.height;
			if (parseInt(e.width) < 10) e.width = 10;
			if (parseInt(e.height) < 10) e.height = 10;
			if (typeof e.hideOnClick == "undefined") e.hideOnClick = false;
			var r = $("#w2ui-popup").data("options") || {};
			var i = parseInt($("#w2ui-popup > .w2ui-msg-title").css("height"));
			if (typeof e.width == "undefined" || e.width > r.width - 10) {
				e.width = r.width - 10
			}
			if (typeof e.height == "undefined" || e.height > r.height - i - 5) {
				e.height = r.height - i - 5
			}
			if (e.originalHeight < 0) e.height = n + e.originalHeight - i;
			if (e.originalWidth < 0) e.width = t + e.originalWidth * 2;
			var s = $("#w2ui-popup .w2ui-msg-title");
			var o = $("#w2ui-popup .w2ui-popup-message").length;
			if ($.trim(e.html) == "" && $.trim(e.body) == "" && $.trim(e.buttons) == "") {
				var u = $("#w2ui-popup #w2ui-message" + (o - 1));
				var e = u.data("options") || {};
				u.css(w2utils.cssPrefix({
					transition: "0.15s",
					transform: "translateY(-" + e.height + "px)"
				}));
				if (o == 1) {
					w2popup.unlock(150)
				} else {
					$("#w2ui-popup #w2ui-message" + (o - 2)).css("z-index", 1500)
				}
				setTimeout(function () {
					u.remove();
					if (typeof e.onClose == "function") e.onClose()
				}, 150)
			} else {
				if ($.trim(e.body) != "" || $.trim(e.buttons) != "") {
					e.html = '<div class="w2ui-popup-message-body">' + e.body + "</div>" + '<div class="w2ui-popup-message-buttons">' + e.buttons + "</div>"
				}
				$("#w2ui-popup .w2ui-popup-message").css("z-index", 1390);
				s.css("z-index", 1501);
				$("#w2ui-popup .w2ui-box1").before('<div id="w2ui-message' + o + '" class="w2ui-popup-message" style="display: none; z-index: 1500; ' + (s.length == 0 ? "top: 0px;" : "top: " + w2utils.getSize(s, "height") + "px;") + (typeof e.width != "undefined" ? "width: " + e.width + "px; left: " + (t - e.width) / 2 + "px;" : "left: 10px; right: 10px;") + (typeof e.height != "undefined" ? "height: " + e.height + "px;" : "bottom: 6px;") + w2utils.cssPrefix("transition", ".3s", true) + '"' + (e.hideOnClick === true ? 'onclick="w2popup.message();"' : "") + ">" + "</div>");
				$("#w2ui-popup #w2ui-message" + o).data("options", e);
				var a = $("#w2ui-popup #w2ui-message" + o).css("display");
				$("#w2ui-popup #w2ui-message" + o).css(w2utils.cssPrefix({
					transform: a == "none" ? "translateY(-" + e.height + "px)" : "translateY(0px)"
				}));
				if (a == "none") {
					$("#w2ui-popup #w2ui-message" + o).show().html(e.html);
					setTimeout(function () {
						$("#w2ui-popup #w2ui-message" + o).css(w2utils.cssPrefix({
							transform: a == "none" ? "translateY(0px)" : "translateY(-" + e.height + "px)"
						}))
					}, 1);
					if (o == 0) w2popup.lock();
					setTimeout(function () {
						$("#w2ui-popup #w2ui-message" + o).css(w2utils.cssPrefix({
							transition: "0s"
						}));
						if (typeof e.onOpen == "function") e.onOpen()
					}, 350)
				}
			}
		},
		lock: function (e, t) {
			var n = Array.prototype.slice.call(arguments, 0);
			n.unshift($("#w2ui-popup"));
			w2utils.lock.apply(window, n)
		},
		unlock: function (e) {
			w2utils.unlock($("#w2ui-popup"), e)
		},
		lockScreen: function (e) {
			if ($("#w2ui-lock").length > 0) return false;
			if (typeof e == "undefined") e = $("#w2ui-popup").data("options");
			if (typeof e == "undefined") e = {};
			e = $.extend({}, w2popup.defaults, e);
			$("body").append('<div id="w2ui-lock" ' + '    onmousewheel="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true; if (event.preventDefault) event.preventDefault(); else return false;"' + '    style="position: ' + (w2utils.engine == "IE5" ? "absolute" : "fixed") + "; z-Index: 1199; left: 0px; top: 0px; " + "           padding: 0px; margin: 0px; background-color: " + e.color + '; width: 100%; height: 100%; opacity: 0;"></div>');
			setTimeout(function () {
				$("#w2ui-lock").css("opacity", e.opacity).css(w2utils.cssPrefix("transition", e.speed + "s opacity"))
			}, 1);
			if (e.modal == true) {
				$("#w2ui-lock").on("mousedown", function () {
					$("#w2ui-lock").css("opacity", "0.6").css(w2utils.cssPrefix("transition", ".1s"))
				});
				$("#w2ui-lock").on("mouseup", function () {
					setTimeout(function () {
						$("#w2ui-lock").css("opacity", e.opacity).css(w2utils.cssPrefix("transition", ".1s"))
					}, 100)
				})
			} else {
				$("#w2ui-lock").on("mousedown", function () {
					w2popup.close()
				})
			}
			return true
		},
		unlockScreen: function (e) {
			if ($("#w2ui-lock").length == 0) return false;
			if (typeof e == "undefined") e = $("#w2ui-popup").data("options");
			if (typeof e == "undefined") e = {};
			e = $.extend({}, w2popup.defaults, e);
			$("#w2ui-lock").css("opacity", "0").css(w2utils.cssPrefix("transition", e.speed + "s opacity"));
			setTimeout(function () {
				$("#w2ui-lock").remove()
			}, e.speed * 1e3);
			return true
		},
		resizeMessages: function () {
			var e = this;
			var t = $("#w2ui-popup").data("options");
			$("#w2ui-popup .w2ui-popup-message").each(function () {
				var e = $(this).data("options");
				var t = $("#w2ui-popup");
				if (parseInt(e.width) < 10) e.width = 10;
				if (parseInt(e.height) < 10) e.height = 10;
				var n = parseInt(t.find("> .w2ui-msg-title").css("height"));
				var r = parseInt(t.width());
				var i = parseInt(t.height());
				e.width = e.originalWidth;
				if (e.width > r - 10) {
					e.width = r - 10
				}
				e.height = e.originalHeight;
				if (e.height > i - n - 5) {
					e.height = i - n - 5
				}
				if (e.originalHeight < 0) e.height = i + e.originalHeight - n;
				if (e.originalWidth < 0) e.width = r + e.originalWidth * 2;
				$(this).css({
					left: (r - e.width) / 2 + "px",
					width: e.width + "px",
					height: e.height + "px"
				})
			})
		},
		resize: function (e, t, n) {
			var r = this;
			var i = $("#w2ui-popup").data("options");
			e = parseInt(e);
			t = parseInt(t);
			if ($(window).width() - 10 < e) e = $(window).width() - 10;
			if ($(window).height() - 10 < t) t = $(window).height() - 10;
			var s = ($(window).height() - t) / 2 * .8;
			var o = ($(window).width() - e) / 2;
			$("#w2ui-popup").css(w2utils.cssPrefix({
				transition: i.speed + "s width, " + i.speed + "s height, " + i.speed + "s left, " + i.speed + "s top"
			})).css({
				top: s,
				left: o,
				width: e,
				height: t
			});
			var u = setInterval(function () {
				r.resizeMessages()
			}, 10);
			setTimeout(function () {
				clearInterval(u);
				i.width = e;
				i.height = t;
				r.resizeMessages();
				if (typeof n == "function") n()
			}, i.speed * 1e3 + 50)
		}
	};
	$.extend(w2popup, w2utils.event)
})();
var w2alert = function (e, t, n) {
	if (t == null) t = w2utils.lang("Notification");
	if ($("#w2ui-popup").length > 0 && w2popup.status != "closing") {
		w2popup.message({
			width: 400,
			height: 170,
			body: '<div class="w2ui-centered" style="font-size: 13px;">' + e + "</div>",
			buttons: '<button onclick="w2popup.message();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang("Ok") + "</button>",
			onOpen: function () {
				$("#w2ui-popup .w2ui-popup-message .w2ui-popup-btn").focus()
			},
			onClose: function () {
				if (typeof n == "function") n()
			}
		})
	} else {
		w2popup.open({
			width: 450,
			height: 220,
			showMax: false,
			showClose: false,
			title: t,
			body: '<div class="w2ui-centered" style="font-size: 13px;">' + e + "</div>",
			buttons: '<button onclick="w2popup.close();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang("Ok") + "</button>",
			onOpen: function (e) {
				setTimeout(function () {
					$("#w2ui-popup .w2ui-popup-btn").focus()
				}, 1)
			},
			onKeydown: function (e) {
				$("#w2ui-popup .w2ui-popup-btn").focus().addClass("clicked")
			},
			onClose: function () {
				if (typeof n == "function") n()
			}
		})
	}
};
var w2confirm = function (e, t, n) {
	var r = {};
	var i = {
		msg: "",
		title: w2utils.lang("Confirmation"),
		width: $("#w2ui-popup").length > 0 ? 400 : 450,
		height: $("#w2ui-popup").length > 0 ? 170 : 220,
		yes_text: "Yes",
		yes_class: "",
		yes_style: "",
		yes_callBack: null,
		no_text: "No",
		no_class: "",
		no_style: "",
		no_callBack: null,
		callBack: null
	};
	if (arguments.length == 1 && typeof e == "object") {
		$.extend(r, i, e)
	} else {
		if (typeof t == "function") {
			$.extend(r, i, {
				msg: e,
				callBack: t
			})
		} else {
			$.extend(r, i, {
				msg: e,
				title: t,
				callBack: n
			})
		}
	}
	if (typeof r.btn_yes == "object") {
		r.yes_text = r.btn_yes.text || r.yes_text;
		r.yes_class = r.btn_yes["class"] || r.yes_class;
		r.yes_style = r.btn_yes.style || r.yes_style;
		r.yes_callBack = r.btn_yes.callBack || r.yes_callBack
	}
	if (typeof r.btn_no == "object") {
		r.no_text = r.btn_no.text || r.no_text;
		r.no_class = r.btn_no["class"] || r.no_class;
		r.no_style = r.btn_no.style || r.no_style;
		r.no_callBack = r.btn_no.callBack || r.no_callBack
	}
	if ($("#w2ui-popup").length > 0 && w2popup.status != "closing") {
		if (r.width > w2popup.get().width) r.width = w2popup.get().width;
		if (r.height > w2popup.get().height - 50) r.height = w2popup.get().height - 50;
		w2popup.message({
			width: r.width,
			height: r.height,
			body: '<div class="w2ui-centered" style="font-size: 13px;">' + r.msg + "</div>",
			buttons: '<button id="Yes" class="w2ui-popup-btn w2ui-btn ' + r.yes_class + '" style="' + r.yes_style + '">' + w2utils.lang(r.yes_text) + "</button>" + '<button id="No" class="w2ui-popup-btn w2ui-btn ' + r.no_class + '" style="' + r.no_style + '">' + w2utils.lang(r.no_text) + "</button>",
			onOpen: function () {
				$("#w2ui-popup .w2ui-popup-message .w2ui-btn").on("click", function (e) {
					w2popup.message();
					if (typeof r.callBack == "function") r.callBack(e.target.id);
					if (e.target.id == "Yes" && typeof r.yes_callBack == "function") r.yes_callBack();
					if (e.target.id == "No" && typeof r.no_callBack == "function") r.no_callBack()
				})
			}
		})
	} else {
		if (!w2utils.isInt(r.height)) r.height = r.height + 50;
		w2popup.open({
			width: r.width,
			height: r.height,
			title: r.title,
			modal: true,
			showClose: false,
			body: '<div class="w2ui-centered" style="font-size: 13px;">' + r.msg + "</div>",
			buttons: '<button id="Yes" class="w2ui-popup-btn w2ui-btn ' + r.yes_class + '" style="' + r.yes_style + '">' + w2utils.lang(r.yes_text) + "</button>" + '<button id="No" class="w2ui-popup-btn w2ui-btn ' + r.no_class + '" style="' + r.no_style + '">' + w2utils.lang(r.no_text) + "</button>",
			onOpen: function (e) {
				setTimeout(function () {
					$("#w2ui-popup .w2ui-popup-btn").on("click", function (e) {
						w2popup.close();
						if (typeof r.callBack == "function") r.callBack(e.target.id);
						if (e.target.id == "Yes" && typeof r.yes_callBack == "function") r.yes_callBack();
						if (e.target.id == "No" && typeof r.no_callBack == "function") r.no_callBack()
					});
					$("#w2ui-popup .w2ui-popup-btn#No").focus()
				}, 1)
			},
			onKeydown: function (e) {
				if ($("#w2ui-popup .w2ui-popup-message").length == 0) {
					switch (e.originalEvent.keyCode) {
					case 13:
						$("#w2ui-popup .w2ui-popup-btn#Yes").focus().addClass("clicked");
						w2popup.close();
						break;
					case 27:
						$("#w2ui-popup .w2ui-popup-btn#No").focus().click();
						w2popup.close();
						break
					}
				}
			}
		})
	}
	return {
		yes: function (e) {
			r.yes_callBack = e;
			return this
		},
		no: function (e) {
			r.no_callBack = e;
			return this
		}
	}
};
(function () {
	var e = function (e) {
		this.box = null;
		this.name = null;
		this.active = null;
		this.flow = "down";
		this.tabs = [];
		this.routeData = {};
		this.right = "";
		this.style = "";
		this.onClick = null;
		this.onClose = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onResize = null;
		this.onDestroy = null;
		$.extend(this, {
			handlers: []
		});
		$.extend(true, this, w2obj.tabs, e)
	};
	$.fn.w2tabs = function (t) {
		if ($.isPlainObject(t)) {
			if (!w2utils.checkName(t, "w2tabs")) return;
			var n = t.tabs || [];
			var r = new e(t);
			for (var i = 0; i < n.length; i++) {
				r.tabs[i] = $.extend({}, e.prototype.tab, n[i])
			}
			if ($(this).length !== 0) {
				r.render($(this)[0])
			}
			w2ui[r.name] = r;
			return r
		} else {
			var s = w2ui[$(this).attr("name")];
			if (!s) return null;
			if (arguments.length > 0) {
				if (s[t]) s[t].apply(s, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return s
			}
		}
	};
	e.prototype = {
		tab: {
			id: null,
			text: "",
			route: null,
			hidden: false,
			disabled: false,
			closable: false,
			hint: "",
			style: "",
			onClick: null,
			onRefresh: null,
			onClose: null
		},
		add: function (e) {
			return this.insert(null, e)
		},
		insert: function (t, n) {
			if (!$.isArray(n)) n = [n];
			for (var r = 0; r < n.length; r++) {
				if (typeof n[r].id === "undefined") {
					console.log('ERROR: The parameter "id" is required but not supplied. (obj: ' + this.name + ")");
					return
				}
				if (!w2utils.checkUniqueId(n[r].id, this.tabs, "tabs", this.name)) return;
				var i = $.extend({}, e.prototype.tab, n[r]);
				if (t === null || typeof t === "undefined") {
					this.tabs.push(i)
				} else {
					var s = this.get(t, true);
					this.tabs = this.tabs.slice(0, s).concat([i], this.tabs.slice(s))
				}
				this.refresh(n[r].id)
			}
		},
		remove: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (!n) return false;
				e++;
				this.tabs.splice(this.get(n.id, true), 1);
				$(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(n.id)).remove()
			}
			return e
		},
		select: function (e) {
			if (this.active == e || this.get(e) === null) return false;
			this.active = e;
			this.refresh();
			return true
		},
		set: function (e, t) {
			var n = this.get(e, true);
			if (n === null) return false;
			$.extend(this.tabs[n], t);
			this.refresh(e);
			return true
		},
		get: function (e, t) {
			if (arguments.length === 0) {
				var n = [];
				for (var r = 0; r < this.tabs.length; r++) {
					if (this.tabs[r].id != null) {
						n.push(this.tabs[r].id)
					}
				}
				return n
			} else {
				for (var i = 0; i < this.tabs.length; i++) {
					if (this.tabs[i].id == e) {
						return t === true ? i : this.tabs[i]
					}
				}
			}
			return null
		},
		show: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i || i.hidden === false) continue;
				t++;
				i.hidden = false;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		hide: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i || i.hidden === true) continue;
				t++;
				i.hidden = true;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		enable: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i || i.disabled === false) continue;
				t++;
				i.disabled = false;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		disable: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i || i.disabled === true) continue;
				t++;
				i.disabled = true;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		refresh: function (e) {
			var t = (new Date).getTime();
			if (this.flow == "up") $(this.box).addClass("w2ui-tabs-up");
			else $(this.box).removeClass("w2ui-tabs-up");
			var n = this.trigger({
				phase: "before",
				type: "refresh",
				target: typeof e !== "undefined" ? e : this.name,
				object: this.get(e)
			});
			if (n.isCancelled === true) return;
			if (typeof e === "undefined") {
				for (var r = 0; r < this.tabs.length; r++) this.refresh(this.tabs[r].id)
			} else {
				var i = this.get(e);
				if (i === null) return false;
				if (typeof i.caption !== "undefined") i.text = i.caption;
				var s = $(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(i.id));
				var o = (i.closable ? '<div class="w2ui-tab-close" onclick="w2ui[\'' + this.name + "'].animateClose('" + i.id + "', event);\"></div>" : "") + '    <div class="w2ui-tab' + (this.active === i.id ? " active" : "") + (i.closable ? " closable" : "") + '" ' + '        title="' + (typeof i.hint !== "undefined" ? i.hint : "") + '" style="' + i.style + '" ' + "        onclick=\"w2ui['" + this.name + "'].click('" + i.id + "', event);\">" + i.text + "</div>";
				if (s.length === 0) {
					var u = "";
					if (i.hidden) {
						u += "display: none;"
					}
					if (i.disabled) {
						u += "opacity: 0.2;"
					}
					var a = '<td id="tabs_' + this.name + "_tab_" + i.id + '" style="' + u + '" valign="middle">' + o + "</td>";
					if (this.get(e, true) !== this.tabs.length - 1 && $(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(this.tabs[parseInt(this.get(e, true)) + 1].id)).length > 0) {
						$(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(this.tabs[parseInt(this.get(e, true)) + 1].id)).before(a)
					} else {
						$(this.box).find("#tabs_" + this.name + "_right").before(a)
					}
				} else {
					s.html(o);
					if (i.hidden) {
						s.css("display", "none")
					} else {
						s.css("display", "")
					}
					if (i.disabled) {
						s.css({
							opacity: "0.2"
						})
					} else {
						s.css({
							opacity: "1"
						})
					}
				}
			}
			$("#tabs_" + this.name + "_right").html(this.right);
			this.trigger($.extend(n, {
				phase: "after"
			}));
			return (new Date).getTime() - t
		},
		render: function (e) {
			var t = (new Date).getTime();
			var n = this.trigger({
				phase: "before",
				type: "render",
				target: this.name,
				box: e
			});
			if (n.isCancelled === true) return;
			if (typeof e !== "undefined" && e !== null) {
				if ($(this.box).find("> table #tabs_" + this.name + "_right").length > 0) {
					$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-tabs").html("")
				}
				this.box = e
			}
			if (!this.box) return false;
			var r = '<table cellspacing="0" cellpadding="1" width="100%">' + '    <tr><td width="100%" id="tabs_' + this.name + '_right" align="right">' + this.right + "</td></tr>" + "</table>";
			$(this.box).attr("name", this.name).addClass("w2ui-reset w2ui-tabs").html(r);
			if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
			this.trigger($.extend(n, {
				phase: "after"
			}));
			this.refresh();
			return (new Date).getTime() - t
		},
		resize: function () {
			var e = (new Date).getTime();
			var t = this.trigger({
				phase: "before",
				type: "resize",
				target: this.name
			});
			if (t.isCancelled === true) return;
			this.trigger($.extend(t, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				type: "destroy",
				target: this.name
			});
			if (e.isCancelled === true) return;
			if ($(this.box).find("> table #tabs_" + this.name + "_right").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-tabs").html("")
			}
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}))
		},
		click: function (e, t) {
			var n = this.get(e);
			if (n === null || n.disabled) return false;
			var r = this.trigger({
				phase: "before",
				type: "click",
				target: e,
				tab: n,
				object: n,
				originalEvent: t
			});
			if (r.isCancelled === true) return;
			$(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(this.active) + " .w2ui-tab").removeClass("active");
			this.active = n.id;
			if (n.route) {
				var i = String("/" + n.route).replace(/\/{2,}/g, "/");
				var s = w2utils.parseRoute(i);
				if (s.keys.length > 0) {
					for (var o = 0; o < s.keys.length; o++) {
						if (this.routeData[s.keys[o].name] == null) continue;
						i = i.replace(new RegExp(":" + s.keys[o].name, "g"), this.routeData[s.keys[o].name])
					}
				}
				setTimeout(function () {
					window.location.hash = i
				}, 1)
			}
			this.trigger($.extend(r, {
				phase: "after"
			}));
			this.refresh(e)
		},
		animateClose: function (e, t) {
			var n = this.get(e);
			if (n === null || n.disabled) return false;
			var r = this.trigger({
				phase: "before",
				type: "close",
				target: e,
				object: this.get(e),
				originalEvent: t
			});
			if (r.isCancelled === true) return;
			var i = this;
			$(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(n.id)).css(w2utils.cssPrefix("transition", ".2s")).css("opacity", "0");
			setTimeout(function () {
				var e = $(i.box).find("#tabs_" + i.name + "_tab_" + w2utils.escapeId(n.id)).width();
				$(i.box).find("#tabs_" + i.name + "_tab_" + w2utils.escapeId(n.id)).html('<div style="width: ' + e + "px; " + w2utils.cssPrefix("transition", ".2s", true) + '"></div>');
				setTimeout(function () {
					$(i.box).find("#tabs_" + i.name + "_tab_" + w2utils.escapeId(n.id)).find(":first-child").css({
						width: "0px"
					})
				}, 50)
			}, 200);
			setTimeout(function () {
				i.remove(e)
			}, 450);
			this.trigger($.extend(r, {
				phase: "after"
			}));
			this.refresh()
		},
		animateInsert: function (e, t) {
			if (this.get(e) === null) return;
			if (!$.isPlainObject(t)) return;
			if (!w2utils.checkUniqueId(t.id, this.tabs, "tabs", this.name)) return;
			var n = $(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(t.id));
			if (n.length !== 0) return;
			if (typeof t.caption !== "undefined") t.text = t.caption;
			var r = '<div id="_tmp_tabs" class="w2ui-reset w2ui-tabs" style="position: absolute; top: -1000px;">' + '<table cellspacing="0" cellpadding="1" width="100%"><tr>' + '<td id="_tmp_simple_tab" style="" valign="middle">' + (t.closable ? '<div class="w2ui-tab-close"></div>' : "") + '    <div class="w2ui-tab ' + (this.active === t.id ? "active" : "") + '">' + t.text + "</div>" + "</td></tr></table>" + "</div>";
			$("body").append(r);
			var i = '<div style="width: 1px; ' + w2utils.cssPrefix("transition", ".2s", true) + '">&nbsp;</div>';
			var s = "";
			if (t.hidden) {
				s += "display: none;"
			}
			if (t.disabled) {
				s += "opacity: 0.2;"
			}
			var o = '<td id="tabs_' + this.name + "_tab_" + t.id + '" style="' + s + '" valign="middle">' + i + "</td>";
			if (this.get(e, true) !== this.tabs.length && $(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(this.tabs[parseInt(this.get(e, true))].id)).length > 0) {
				$(this.box).find("#tabs_" + this.name + "_tab_" + w2utils.escapeId(this.tabs[parseInt(this.get(e, true))].id)).before(o)
			} else {
				$(this.box).find("#tabs_" + this.name + "_right").before(o)
			}
			var u = this;
			setTimeout(function () {
				var e = $("#_tmp_simple_tab").width();
				$("#_tmp_tabs").remove();
				$("#tabs_" + u.name + "_tab_" + w2utils.escapeId(t.id) + " > div").css("width", e + "px")
			}, 1);
			setTimeout(function () {
				u.insert(e, t)
			}, 200)
		}
	};
	$.extend(e.prototype, w2utils.event);
	w2obj.tabs = e
})();
(function () {
	var e = function (e) {
		this.box = null;
		this.name = null;
		this.routeData = {};
		this.items = [];
		this.right = "";
		this.onClick = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onResize = null;
		this.onDestroy = null;
		$.extend(true, this, w2obj.toolbar, e)
	};
	$.fn.w2toolbar = function (t) {
		if ($.isPlainObject(t)) {
			if (!w2utils.checkName(t, "w2toolbar")) return;
			var n = t.items || [];
			var r = new e(t);
			$.extend(r, {
				items: [],
				handlers: []
			});
			for (var i = 0; i < n.length; i++) {
				r.items[i] = $.extend({}, e.prototype.item, n[i])
			}
			if ($(this).length !== 0) {
				r.render($(this)[0])
			}
			w2ui[r.name] = r;
			return r
		} else {
			var s = w2ui[$(this).attr("name")];
			if (!s) return null;
			if (arguments.length > 0) {
				if (s[t]) s[t].apply(s, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return s
			}
		}
	};
	e.prototype = {
		item: {
			id: null,
			type: "button",
			text: "",
			route: null,
			html: "",
			img: null,
			icon: null,
			count: null,
			hidden: false,
			disabled: false,
			checked: false,
			arrow: true,
			hint: "",
			group: null,
			items: null,
			overlay: {},
			onClick: null
		},
		add: function (e) {
			this.insert(null, e)
		},
		insert: function (t, n) {
			if (!$.isArray(n)) n = [n];
			for (var r = 0; r < n.length; r++) {
				if (typeof n[r].type === "undefined") {
					console.log('ERROR: The parameter "type" is required but not supplied in w2toolbar.add() method.');
					return
				}
				if ($.inArray(String(n[r].type), ["button", "check", "radio", "drop", "menu", "break", "html", "spacer"]) === -1) {
					console.log('ERROR: The parameter "type" should be one of the following [button, check, radio, drop, menu, break, html, spacer] ' + "in w2toolbar.add() method.");
					return
				}
				if (typeof n[r].id === "undefined") {
					console.log('ERROR: The parameter "id" is required but not supplied in w2toolbar.add() method.');
					return
				}
				if (!w2utils.checkUniqueId(n[r].id, this.items, "toolbar items", this.name)) return;
				var i = $.extend({}, e.prototype.item, n[r]);
				if (t == null) {
					this.items.push(i)
				} else {
					var s = this.get(t, true);
					this.items = this.items.slice(0, s).concat([i], this.items.slice(s))
				}
				this.refresh(i.id)
			}
		},
		remove: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (!n) continue;
				e++;
				$(this.box).find("#tb_" + this.name + "_item_" + w2utils.escapeId(n.id)).remove();
				var r = this.get(n.id, true);
				if (r != null) this.items.splice(r, 1)
			}
			return e
		},
		set: function (e, t) {
			var n = this.get(e, true);
			if (n === null) return false;
			$.extend(this.items[n], t);
			this.refresh(e);
			return true
		},
		get: function (e, t) {
			if (arguments.length === 0) {
				var n = [];
				for (var r = 0; r < this.items.length; r++) if (this.items[r].id !== null) n.push(this.items[r].id);
				return n
			}
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i].id === e) {
					if (t === true) return i;
					else return this.items[i]
				}
			}
			return null
		},
		show: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i) continue;
				t++;
				i.hidden = false;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		hide: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i) continue;
				t++;
				i.hidden = true;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		enable: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				var s = arguments[r].split(":");
				var i = this.get(s[0]);
				if (!i) continue;
				t++;
				n.push(i.id);
				if (i.type == "menu" && s.length == 2) {
					for (var o = 0; o < i.items.length; o++) {
						var u = i.items[o];
						if (u.id == s[1] || u.id == null && u.text == s[1]) {
							u.disabled = false
						}
					}
				} else {
					i.disabled = false
				}
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		disable: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = arguments[r].split(":");
				var s = this.get(i[0]);
				if (!s) continue;
				t++;
				n.push(s.id);
				if (s.type == "menu" && i.length == 2) {
					for (var o = 0; o < s.items.length; o++) {
						var u = s.items[o];
						if (u.id == i[1] || u.id == null && u.text == i[1]) {
							u.disabled = true
						}
					}
				} else {
					s.disabled = true
				}
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		check: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i) continue;
				t++;
				i.checked = true;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		uncheck: function () {
			var e = this;
			var t = 0;
			var n = [];
			for (var r = 0; r < arguments.length; r++) {
				var i = this.get(arguments[r]);
				if (!i) continue;
				t++;
				i.checked = false;
				n.push(i.id)
			}
			setTimeout(function () {
				for (var t = 0; t < n.length; t++) e.refresh(n[t])
			}, 15);
			return t
		},
		render: function (e) {
			var t = (new Date).getTime();
			var n = this.trigger({
				phase: "before",
				type: "render",
				target: this.name,
				box: e
			});
			if (n.isCancelled === true) return;
			if (e != null) {
				if ($(this.box).find("> table #tb_" + this.name + "_right").length > 0) {
					$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-toolbar").html("")
				}
				this.box = e
			}
			if (!this.box) return;
			var r = '<table cellspacing="0" cellpadding="0" width="100%">' + "<tr>";
			for (var i = 0; i < this.items.length; i++) {
				var s = this.items[i];
				if (s.id == null) s.id = "item_" + i;
				if (s === null) continue;
				if (s.type === "spacer") {
					r += '<td width="100%" id="tb_' + this.name + "_item_" + s.id + '" align="right"></td>'
				} else {
					r += '<td id="tb_' + this.name + "_item_" + s.id + '" style="' + (s.hidden ? "display: none" : "") + '" ' + '    class="' + (s.disabled ? "disabled" : "") + '" valign="middle">' + this.getItemHTML(s) + "</td>"
				}
			}
			r += '<td width="100%" id="tb_' + this.name + '_right" align="right">' + this.right + "</td>";
			r += "</tr>" + "</table>";
			$(this.box).attr("name", this.name).addClass("w2ui-reset w2ui-toolbar").html(r);
			if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
			this.trigger($.extend(n, {
				phase: "after"
			}));
			return (new Date).getTime() - t
		},
		refresh: function (e) {
			var t = (new Date).getTime();
			var n = this.trigger({
				phase: "before",
				type: "refresh",
				target: typeof e !== "undefined" ? e : this.name,
				item: this.get(e)
			});
			if (n.isCancelled === true) return;
			if (e == null) {
				for (var r = 0; r < this.items.length; r++) {
					var i = this.items[r];
					if (i.id == null) i.id = "item_" + r;
					this.refresh(i.id)
				}
			}
			var s = this.get(e);
			if (s === null) return false;
			var o = $(this.box).find("#tb_" + this.name + "_item_" + w2utils.escapeId(s.id));
			var u = this.getItemHTML(s);
			if (o.length === 0) {
				if (s.type === "spacer") {
					u = '<td width="100%" id="tb_' + this.name + "_item_" + s.id + '" align="right"></td>'
				} else {
					u = '<td id="tb_' + this.name + "_item_" + s.id + '" style="' + (s.hidden ? "display: none" : "") + '" ' + '    class="' + (s.disabled ? "disabled" : "") + '" valign="middle">' + u + "</td>"
				}
				if (this.get(e, true) === this.items.length - 1) {
					$(this.box).find("#tb_" + this.name + "_right").before(u)
				} else {
					$(this.box).find("#tb_" + this.name + "_item_" + w2utils.escapeId(this.items[parseInt(this.get(e, true)) + 1].id)).before(u)
				}
			} else {
				o.html(u);
				if (s.hidden) {
					o.css("display", "none")
				} else {
					o.css("display", "")
				}
				if (s.disabled) {
					o.addClass("disabled")
				} else {
					o.removeClass("disabled")
				}
			}
			this.trigger($.extend(n, {
				phase: "after"
			}));
			return (new Date).getTime() - t
		},
		resize: function () {
			var e = (new Date).getTime();
			var t = this.trigger({
				phase: "before",
				type: "resize",
				target: this.name
			});
			if (t.isCancelled === true) return;
			this.trigger($.extend(t, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				type: "destroy",
				target: this.name
			});
			if (e.isCancelled === true) return;
			if ($(this.box).find("> table #tb_" + this.name + "_right").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-toolbar").html("")
			}
			$(this.box).html("");
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}))
		},
		getItemHTML: function (e) {
			var t = "";
			if (typeof e.caption !== "undefined") e.text = e.caption;
			if (typeof e.hint === "undefined") e.hint = "";
			if (typeof e.text === "undefined") e.text = "";
			switch (e.type) {
			case "menu":
			case "button":
			case "check":
			case "radio":
			case "drop":
				var n = "<td>&nbsp;</td>";
				if (e.img) n = '<td><div class="w2ui-tb-image w2ui-icon ' + e.img + '"></div></td>';
				if (e.icon) n = '<td><div class="w2ui-tb-image"><span class="' + e.icon + '"></span></div></td>';
				t += '<table cellpadding="0" cellspacing="0" title="' + e.hint + '" class="w2ui-button ' + (e.checked ? "checked" : "") + '" ' + "       onclick     = \"var el=w2ui['" + this.name + "']; if (el) el.click('" + e.id + "', event);\" " + '       onmouseover = "' + (!e.disabled ? "$(this).addClass('over');" : "") + '"' + '       onmouseout  = "' + (!e.disabled ? "$(this).removeClass('over').removeClass('down');" : "") + '"' + '       onmousedown = "' + (!e.disabled ? "$(this).addClass('down');" : "") + '"' + '       onmouseup   = "' + (!e.disabled ? "$(this).removeClass('down');" : "") + '"' + ">" + "<tr><td>" + '  <table cellpadding="1" cellspacing="0">' + "  <tr>" + n + (e.text !== "" ? '<td class="w2ui-tb-caption" nowrap>' + e.text + "</td>" : "") + (e.count != null ? '<td class="w2ui-tb-count" nowrap><span>' + e.count + "</span></td>" : "") + ((e.type === "drop" || e.type === "menu") && e.arrow !== false ? '<td class="w2ui-tb-down" nowrap><div></div></td>' : "") + "  </tr></table>" + "</td></tr></table>";
				break;
			case "break":
				t += '<table cellpadding="0" cellspacing="0"><tr>' + '    <td><div class="w2ui-break">&nbsp;</div></td>' + "</tr></table>";
				break;
			case "html":
				t += '<table cellpadding="0" cellspacing="0"><tr>' + "    <td nowrap>" + e.html + "</td>" + "</tr></table>";
				break
			}
			var r = "";
			if (typeof e.onRender === "function") r = e.onRender.call(this, e.id, t);
			if (typeof this.onRender === "function") r = this.onRender(e.id, t);
			if (r !== "" && r != null) t = r;
			return t
		},
		menuClick: function (e) {
			var t = this;
			if (e.item && !e.item.disabled) {
				var n = this.trigger({
					phase: "before",
					type: "click",
					target: e.item.id + ":" + e.subItem.id,
					item: e.item,
					subItem: e.subItem,
					originalEvent: e.originalEvent
				});
				if (n.isCancelled === true) return;
				var r = e.subItem;
				if (r.route) {
					var i = String("/" + r.route).replace(/\/{2,}/g, "/");
					var s = w2utils.parseRoute(i);
					if (s.keys.length > 0) {
						for (var o = 0; o < s.keys.length; o++) {
							if (t.routeData[s.keys[o].name] == null) continue;
							i = i.replace(new RegExp(":" + s.keys[o].name, "g"), this.routeData[s.keys[o].name])
						}
					}
					setTimeout(function () {
						window.location.hash = i
					}, 1)
				}
				this.trigger($.extend(n, {
					phase: "after"
				}))
			}
		},
		click: function (e, t) {
			var n = this;
			var r = this.get(e);
			if (r && !r.disabled) {
				var i = this.trigger({
					phase: "before",
					type: "click",
					target: typeof e !== "undefined" ? e : this.name,
					item: r,
					object: r,
					originalEvent: t
				});
				if (i.isCancelled === true) return;
				var s = "#tb_" + this.name + "_item_" + w2utils.escapeId(r.id) + " table.w2ui-button";
				$(s).removeClass("down");
				if (r.type === "radio") {
					for (var o = 0; o < this.items.length; o++) {
						var u = this.items[o];
						if (u == null || u.id === r.id || u.type !== "radio") continue;
						if (u.group === r.group && u.checked) {
							u.checked = false;
							this.refresh(u.id)
						}
					}
					r.checked = true;
					$(s).addClass("checked")
				}
				if (r.type === "drop" || r.type === "menu") {
					if (r.checked) {
						r.checked = false
					} else {
						setTimeout(function () {
							function i(e) {
								r.checked = false;
								$(s).removeClass("checked")
							}
							var e = $("#tb_" + n.name + "_item_" + w2utils.escapeId(r.id));
							if (!$.isPlainObject(r.overlay)) r.overlay = {};
							var t = (e.width() - 50) / 2;
							if (t > 19) t = 19;
							if (r.type === "drop") {
								e.w2overlay(r.html, $.extend({
									name: n.name,
									left: t,
									top: 3
								}, r.overlay, {
									onHide: function () {
										i()
									}
								}))
							}
							if (r.type === "menu") {
								e.w2menu(r.items, $.extend({
									left: t,
									top: 3
								}, r.overlay, {
									select: function (e) {
										n.menuClick({
											name: n.name,
											item: r,
											subItem: e.item,
											originalEvent: e.originalEvent
										});
										i()
									},
									onHide: function () {
										i()
									}
								}))
							}
						}, 1)
					}
				}
				if (r.type === "check" || r.type === "drop" || r.type === "menu") {
					r.checked = !r.checked;
					if (r.checked) {
						$(s).addClass("checked")
					} else {
						$(s).removeClass("checked")
					}
				}
				if (r.route) {
					var a = String("/" + r.route).replace(/\/{2,}/g, "/");
					var f = w2utils.parseRoute(a);
					if (f.keys.length > 0) {
						for (var l = 0; l < f.keys.length; l++) {
							a = a.replace(new RegExp(":" + f.keys[l].name, "g"), this.routeData[f.keys[l].name])
						}
					}
					setTimeout(function () {
						window.location.hash = a
					}, 1)
				}
				this.trigger($.extend(i, {
					phase: "after"
				}))
			}
		}
	};
	$.extend(e.prototype, w2utils.event);
	w2obj.toolbar = e
})();
(function () {
	var e = function (e) {
		this.name = null;
		this.box = null;
		this.sidebar = null;
		this.parent = null;
		this.nodes = [];
		this.menu = [];
		this.routeData = {};
		this.selected = null;
		this.img = null;
		this.icon = null;
		this.style = "";
		this.topHTML = "";
		this.bottomHTML = "";
		this.keyboard = true;
		this.flat = false;
		this.onClick = null;
		this.onDblClick = null;
		this.onContextMenu = null;
		this.onMenuClick = null;
		this.onExpand = null;
		this.onCollapse = null;
		this.onKeydown = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onResize = null;
		this.onDestroy = null;
		this.onFocus = null;
		this.onBlur = null;
		$.extend(true, this, w2obj.sidebar, e)
	};
	$.fn.w2sidebar = function (t) {
		if ($.isPlainObject(t)) {
			if (!w2utils.checkName(t, "w2sidebar")) return;
			var n = t.nodes;
			var r = new e(t);
			$.extend(r, {
				handlers: [],
				nodes: []
			});
			if (typeof n != "undefined") {
				r.add(r, n)
			}
			if ($(this).length !== 0) {
				r.render($(this)[0])
			}
			r.sidebar = r;
			w2ui[r.name] = r;
			return r
		} else {
			var i = w2ui[$(this).attr("name")];
			if (!i) return null;
			if (arguments.length > 0) {
				if (i[t]) i[t].apply(i, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return i
			}
		}
	};
	e.prototype = {
		node: {
			id: null,
			text: "",
			count: null,
			img: null,
			icon: null,
			nodes: [],
			style: "",
			route: null,
			selected: false,
			expanded: false,
			hidden: false,
			disabled: false,
			group: false,
			groupShowHide: true,
			plus: false,
			onClick: null,
			onDblClick: null,
			onContextMenu: null,
			onExpand: null,
			onCollapse: null,
			parent: null,
			sidebar: null
		},
		add: function (e, t) {
			if (arguments.length == 1) {
				t = arguments[0];
				e = this
			}
			if (typeof e == "string") e = this.get(e);
			return this.insert(e, null, t)
		},
		insert: function (t, n, r) {
			var i, s, o, u, a;
			if (arguments.length == 2) {
				r = arguments[1];
				n = arguments[0];
				if (n != null) {
					s = this.get(n);
					if (s === null) {
						if (!$.isArray(r)) r = [r];
						i = r[0].caption != null ? r[0].caption : r[0].text;
						console.log('ERROR: Cannot insert node "' + i + '" because cannot find node "' + n + '" to insert before.');
						return null
					}
					t = this.get(n).parent
				} else {
					t = this
				}
			}
			if (typeof t == "string") t = this.get(t);
			if (!$.isArray(r)) r = [r];
			for (var f = 0; f < r.length; f++) {
				u = r[f];
				if (typeof u.id == null) {
					i = u.caption != null ? u.caption : u.text;
					console.log('ERROR: Cannot insert node "' + i + '" because it has no id.');
					continue
				}
				if (this.get(this, u.id) !== null) {
					i = u.caption != null ? u.caption : u.text;
					console.log("ERROR: Cannot insert node with id=" + u.id + " (text: " + i + ") because another node with the same id already exists.");
					continue
				}
				o = $.extend({}, e.prototype.node, u);
				o.sidebar = this;
				o.parent = t;
				a = o.nodes || [];
				o.nodes = [];
				if (n === null) {
					t.nodes.push(o)
				} else {
					s = this.get(t, n, true);
					if (s === null) {
						i = u.caption != null ? u.caption : u.text;
						console.log('ERROR: Cannot insert node "' + i + '" because cannot find node "' + n + '" to insert before.');
						return null
					}
					t.nodes.splice(s, 0, o)
				}
				if (a.length > 0) {
					this.insert(o, null, a)
				}
			}
			this.refresh(t.id);
			return o
		},
		remove: function () {
			var e = 0;
			var t;
			for (var n = 0; n < arguments.length; n++) {
				t = this.get(arguments[n]);
				if (t === null) continue;
				if (this.selected !== null && this.selected === t.id) {
					this.selected = null
				}
				var r = this.get(t.parent, arguments[n], true);
				if (r === null) continue;
				if (t.parent.nodes[r].selected) t.sidebar.unselect(t.id);
				t.parent.nodes.splice(r, 1);
				e++
			}
			if (e > 0 && arguments.length == 1) this.refresh(t.parent.id);
			else this.refresh();
			return e
		},
		set: function (e, t, n) {
			if (arguments.length == 2) {
				n = t;
				t = e;
				e = this
			}
			if (typeof e == "string") e = this.get(e);
			if (e.nodes == null) return null;
			for (var r = 0; r < e.nodes.length; r++) {
				if (e.nodes[r].id === t) {
					var i = n.nodes;
					$.extend(e.nodes[r], n, {
						nodes: []
					});
					if (i != null) {
						this.add(e.nodes[r], i)
					}
					this.refresh(t);
					return true
				} else {
					var s = this.set(e.nodes[r], t, n);
					if (s) return true
				}
			}
			return false
		},
		get: function (e, t, n) {
			if (arguments.length === 0) {
				var r = [];
				var i = this.find({});
				for (var s = 0; s < i.length; s++) {
					if (i[s].id != null) r.push(i[s].id)
				}
				return r
			} else {
				if (arguments.length == 1 || arguments.length == 2 && t === true) {
					n = t;
					t = e;
					e = this
				}
				if (typeof e == "string") e = this.get(e);
				if (e.nodes == null) return null;
				for (var o = 0; o < e.nodes.length; o++) {
					if (e.nodes[o].id == t) {
						if (n === true) return o;
						else return e.nodes[o]
					} else {
						var u = this.get(e.nodes[o], t, n);
						if (u || u === 0) return u
					}
				}
				return null
			}
		},
		find: function (e, t, n) {
			if (arguments.length == 1) {
				t = e;
				e = this
			}
			if (!n) n = [];
			if (typeof e == "string") e = this.get(e);
			if (e.nodes == null) return n;
			for (var r = 0; r < e.nodes.length; r++) {
				var i = true;
				for (var s in t) {
					if (e.nodes[r][s] != t[s]) i = false
				}
				if (i) n.push(e.nodes[r]);
				if (e.nodes[r].nodes.length > 0) n = this.find(e.nodes[r], t, n)
			}
			return n
		},
		hide: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n === null) continue;
				n.hidden = true;
				e++
			}
			if (arguments.length == 1) this.refresh(arguments[0]);
			else this.refresh();
			return e
		},
		show: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n === null) continue;
				n.hidden = false;
				e++
			}
			if (arguments.length == 1) this.refresh(arguments[0]);
			else this.refresh();
			return e
		},
		disable: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n === null) continue;
				n.disabled = true;
				if (n.selected) this.unselect(n.id);
				e++
			}
			if (arguments.length == 1) this.refresh(arguments[0]);
			else this.refresh();
			return e
		},
		enable: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n === null) continue;
				n.disabled = false;
				e++
			}
			if (arguments.length == 1) this.refresh(arguments[0]);
			else this.refresh();
			return e
		},
		select: function (e) {
			var t = this.get(e);
			if (!t) return false;
			if (this.selected == e && t.selected) return false;
			this.unselect(this.selected);
			$(this.box).find("#node_" + w2utils.escapeId(e)).addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected");
			t.selected = true;
			this.selected = e;
			return true
		},
		unselect: function (e) {
			var t = this.get(e);
			if (!t) return false;
			t.selected = false;
			$(this.box).find("#node_" + w2utils.escapeId(e)).removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected");
			if (this.selected == e) this.selected = null;
			return true
		},
		toggle: function (e) {
			var t = this.get(e);
			if (t === null) return false;
			if (t.plus) {
				this.set(e, {
					plus: false
				});
				this.expand(e);
				this.refresh(e);
				return
			}
			if (t.nodes.length === 0) return false;
			if (this.get(e).expanded) return this.collapse(e);
			else return this.expand(e)
		},
		collapse: function (e) {
			var t = this;
			var n = this.get(e);
			var r = this.trigger({
				phase: "before",
				type: "collapse",
				target: e,
				object: n
			});
			if (r.isCancelled === true) return;
			$(this.box).find("#node_" + w2utils.escapeId(e) + "_sub").slideUp(200);
			$(this.box).find("#node_" + w2utils.escapeId(e) + " .w2ui-node-dots:first-child").html('<div class="w2ui-expand">+</div>');
			n.expanded = false;
			this.trigger($.extend(r, {
				phase: "after"
			}));
			setTimeout(function () {
				t.refresh(e)
			}, 200);
			return true
		},
		collapseAll: function (e) {
			if (typeof e == "undefined") e = this;
			if (typeof e == "string") e = this.get(e);
			if (e.nodes == null) return false;
			for (var t = 0; t < e.nodes.length; t++) {
				if (e.nodes[t].expanded === true) e.nodes[t].expanded = false;
				if (e.nodes[t].nodes && e.nodes[t].nodes.length > 0) this.collapseAll(e.nodes[t])
			}
			this.refresh(e.id);
			return true
		},
		expand: function (e) {
			var t = this;
			var n = this.get(e);
			var r = this.trigger({
				phase: "before",
				type: "expand",
				target: e,
				object: n
			});
			if (r.isCancelled === true) return;
			$(this.box).find("#node_" + w2utils.escapeId(e) + "_sub").slideDown(200);
			$(this.box).find("#node_" + w2utils.escapeId(e) + " .w2ui-node-dots:first-child").html('<div class="w2ui-expand">-</div>');
			n.expanded = true;
			this.trigger($.extend(r, {
				phase: "after"
			}));
			setTimeout(function () {
				t.refresh(e)
			}, 200);
			return true
		},
		expandAll: function (e) {
			if (typeof e == "undefined") e = this;
			if (typeof e == "string") e = this.get(e);
			if (e.nodes == null) return false;
			for (var t = 0; t < e.nodes.length; t++) {
				if (e.nodes[t].expanded === false) e.nodes[t].expanded = true;
				if (e.nodes[t].nodes && e.nodes[t].nodes.length > 0) this.collapseAll(e.nodes[t])
			}
			this.refresh(e.id)
		},
		expandParents: function (e) {
			var t = this.get(e);
			if (t === null) return false;
			if (t.parent) {
				t.parent.expanded = true;
				this.expandParents(t.parent.id)
			}
			this.refresh(e);
			return true
		},
		click: function (e, t) {
			var n = this;
			var r = this.get(e);
			if (r === null) return;
			if (r.disabled || r.group) return;
			$(n.box).find(".w2ui-node.w2ui-selected").each(function (e, t) {
				var r = $(t).attr("id").replace("node_", "");
				var i = n.get(r);
				if (i != null) i.selected = false;
				$(t).removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected")
			});
			var i = $(n.box).find("#node_" + w2utils.escapeId(e));
			var s = $(n.box).find("#node_" + w2utils.escapeId(n.selected));
			i.addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected");
			setTimeout(function () {
				var o = n.trigger({
					phase: "before",
					type: "click",
					target: e,
					originalEvent: t,
					node: r,
					object: r
				});
				if (o.isCancelled === true) {
					i.removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected");
					s.addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected");
					return
				}
				if (s !== null) s.selected = false;
				n.get(e).selected = true;
				n.selected = e;
				if (r.route) {
					var u = String("/" + r.route).replace(/\/{2,}/g, "/");
					var a = w2utils.parseRoute(u);
					if (a.keys.length > 0) {
						for (var f = 0; f < a.keys.length; f++) {
							if (n.routeData[a.keys[f].name] == null) continue;
							u = u.replace(new RegExp(":" + a.keys[f].name, "g"), n.routeData[a.keys[f].name])
						}
					}
					setTimeout(function () {
						window.location.hash = u
					}, 1)
				}
				n.trigger($.extend(o, {
					phase: "after"
				}))
			}, 1)
		},
		focus: function (e) {
			var t = this.trigger({
				phase: "before",
				type: "focus",
				target: this.name,
				originalEvent: e
			});
			if (t.isCancelled === true) return false;
			$(this.box).find(".w2ui-selected").removeClass("w2ui-inactive");
			this.trigger($.extend(t, {
				phase: "after"
			}))
		},
		blur: function (e) {
			var t = this.trigger({
				phase: "before",
				type: "blur",
				target: this.name,
				originalEvent: e
			});
			if (t.isCancelled === true) return false;
			$(this.box).find(".w2ui-selected").addClass("w2ui-inactive");
			this.trigger($.extend(t, {
				phase: "after"
			}))
		},
		keydown: function (e) {
			function i(e, n) {
				if (e !== null && !e.hidden && !e.disabled && !e.group) {
					t.click(e.id, n);
					setTimeout(function () {
						t.scrollIntoView()
					}, 50)
				}
			}
			function s(e, t) {
				e = t(e);
				while (e !== null && (e.hidden || e.disabled)) {
					if (e.group) break;
					else e = t(e)
				}
				return e
			}
			function o(e, n) {
				if (e === null) return null;
				var r = e.parent;
				var i = t.get(e.id, true);
				var s = null;
				if (e.expanded && e.nodes.length > 0 && n !== true) {
					var u = e.nodes[0];
					if (u.hidden || u.disabled || u.group) s = o(u);
					else s = u
				} else {
					if (r && i + 1 < r.nodes.length) {
						s = r.nodes[i + 1]
					} else {
						s = o(r, true)
					}
				}
				if (s !== null && (s.hidden || s.disabled || s.group)) s = o(s);
				return s
			}
			function u(e) {
				if (e === null) return null;
				var n = e.parent;
				var r = t.get(e.id, true);
				var i = r > 0 ? a(n.nodes[r - 1]) : n;
				if (i !== null && (i.hidden || i.disabled || i.group)) i = u(i);
				return i
			}
			function a(e) {
				if (e.expanded && e.nodes.length > 0) {
					var t = e.nodes[e.nodes.length - 1];
					if (t.hidden || t.disabled || t.group) return u(t);
					else return a(t)
				}
				return e
			}
			var t = this;
			var n = t.get(t.selected);
			if (!n || t.keyboard !== true) return;
			var r = t.trigger({
				phase: "before",
				type: "keydown",
				target: t.name,
				originalEvent: e
			});
			if (r.isCancelled === true) return;
			if (e.keyCode == 13 || e.keyCode == 32) {
				if (n.nodes.length > 0) t.toggle(t.selected)
			}
			if (e.keyCode == 37) {
				if (n.nodes.length > 0 && n.expanded) {
					t.collapse(t.selected)
				} else {
					i(n.parent);
					if (!n.parent.group) t.collapse(n.parent.id)
				}
			}
			if (e.keyCode == 39) {
				if ((n.nodes.length > 0 || n.plus) && !n.expanded) t.expand(t.selected)
			}
			if (e.keyCode == 38) {
				i(s(n, u))
			}
			if (e.keyCode == 40) {
				i(s(n, o))
			}
			if ($.inArray(e.keyCode, [13, 32, 37, 38, 39, 40]) != -1) {
				if (e.preventDefault) e.preventDefault();
				if (e.stopPropagation) e.stopPropagation()
			}
			t.trigger($.extend(r, {
				phase: "after"
			}))
		},
		scrollIntoView: function (e) {
			if (typeof e == "undefined") e = this.selected;
			var t = this.get(e);
			if (t === null) return;
			var n = $(this.box).find(".w2ui-sidebar-div");
			var r = $(this.box).find("#node_" + w2utils.escapeId(e));
			var i = r.offset().top - n.offset().top;
			if (i + r.height() > n.height()) {
				n.animate({
					scrollTop: n.scrollTop() + n.height() / 1.3
				}, 250, "linear")
			}
			if (i <= 0) {
				n.animate({
					scrollTop: n.scrollTop() - n.height() / 1.3
				}, 250, "linear")
			}
		},
		dblClick: function (e, t) {
			var n = this.get(e);
			var r = this.trigger({
				phase: "before",
				type: "dblClick",
				target: e,
				originalEvent: t,
				object: n
			});
			if (r.isCancelled === true) return;
			this.toggle(e);
			this.trigger($.extend(r, {
				phase: "after"
			}))
		},
		contextMenu: function (e, t) {
			var n = this;
			var r = n.get(e);
			if (e != n.selected) n.click(e);
			setTimeout(function () {
				var i = n.trigger({
					phase: "before",
					type: "contextMenu",
					target: e,
					originalEvent: t,
					object: r
				});
				if (i.isCancelled === true) return;
				if (r.group || r.disabled) return;
				if (n.menu.length > 0) {
					$(n.box).find("#node_" + w2utils.escapeId(e)).w2menu(n.menu, {
						left: (t ? t.offsetX || t.pageX : 50) - 25,
						onSelect: function (t) {
							n.menuClick(e, parseInt(t.index), t.originalEvent)
						}
					})
				}
				n.trigger($.extend(i, {
					phase: "after"
				}))
			}, 150)
		},
		menuClick: function (e, t, n) {
			var r = this;
			var i = r.trigger({
				phase: "before",
				type: "menuClick",
				target: e,
				originalEvent: n,
				menuIndex: t,
				menuItem: r.menu[t]
			});
			if (i.isCancelled === true) return;
			r.trigger($.extend(i, {
				phase: "after"
			}))
		},
		render: function (e) {
			var t = (new Date).getTime();
			var n = this.trigger({
				phase: "before",
				type: "render",
				target: this.name,
				box: e
			});
			if (n.isCancelled === true) return;
			if (typeof e != "undefined" && e !== null) {
				if ($(this.box).find("> div > div.w2ui-sidebar-div").length > 0) {
					$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-sidebar").html("")
				}
				this.box = e
			}
			if (!this.box) return;
			$(this.box).attr("name", this.name).addClass("w2ui-reset w2ui-sidebar").html("<div>" + '<div class="w2ui-sidebar-top"></div>' + '<div class="w2ui-sidebar-div"></div>' + '<div class="w2ui-sidebar-bottom"></div>' + "</div>");
			$(this.box).find("> div").css({
				width: $(this.box).width() + "px",
				height: $(this.box).height() + "px"
			});
			if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
			if (this.topHTML !== "") {
				$(this.box).find(".w2ui-sidebar-top").html(this.topHTML);
				$(this.box).find(".w2ui-sidebar-div").css("top", $(this.box).find(".w2ui-sidebar-top").height() + "px")
			}
			if (this.bottomHTML !== "") {
				$(this.box).find(".w2ui-sidebar-bottom").html(this.bottomHTML);
				$(this.box).find(".w2ui-sidebar-div").css("bottom", $(this.box).find(".w2ui-sidebar-bottom").height() + "px")
			}
			this.trigger($.extend(n, {
				phase: "after"
			}));
			this.refresh();
			return (new Date).getTime() - t
		},
		refresh: function (e) {
			function l(e) {
				var t = "";
				var n = e.img;
				if (n === null) n = this.img;
				var i = e.icon;
				if (i === null) i = this.icon;
				var s = e.parent;
				var o = 0;
				while (s && s.parent !== null) {
					if (s.group) o--;
					s = s.parent;
					o++
				}
				if (typeof e.caption != "undefined") e.text = e.caption;
				if (e.group) {
					t = '<div class="w2ui-node-group" id="node_' + e.id + '"' + "        onclick=\"w2ui['" + r.name + "'].toggle('" + e.id + "')\"" + "        onmouseout=\"$(this).find('span:nth-child(1)').css('color', 'transparent')\" " + "        onmouseover=\"$(this).find('span:nth-child(1)').css('color', 'inherit')\">" + (e.groupShowHide ? "<span>" + (!e.hidden && e.expanded ? w2utils.lang("Hide") : w2utils.lang("Show")) + "</span>" : "<span></span>") + "    <span>" + e.text + "</span>" + "</div>" + '<div class="w2ui-node-sub" id="node_' + e.id + '_sub" style="' + e.style + ";" + (!e.hidden && e.expanded ? "" : "display: none;") + '"></div>';
					if (r.flat) {
						t = '<div class="w2ui-node-group" id="node_' + e.id + '"><span>&nbsp;</span></div>' + '<div id="node_' + e.id + '_sub" style="' + e.style + ";" + (!e.hidden && e.expanded ? "" : "display: none;") + '"></div>'
					}
				} else {
					if (e.selected && !e.disabled) r.selected = e.id;
					s = "";
					if (n) s = '<div class="w2ui-node-image w2ui-icon ' + n + (e.selected && !e.disabled ? " w2ui-icon-selected" : "") + '"></div>';
					if (i) s = '<div class="w2ui-node-image"><span class="' + i + '"></span></div>';
					t = '<div class="w2ui-node ' + (e.selected ? "w2ui-selected" : "") + " " + (e.disabled ? "w2ui-disabled" : "") + '" id="node_' + e.id + '" style="' + (e.hidden ? "display: none;" : "") + '"' + "    ondblclick=\"w2ui['" + r.name + "'].dblClick('" + e.id + "', event);\"" + "    oncontextmenu=\"w2ui['" + r.name + "'].contextMenu('" + e.id + "', event); " + '        if (event.preventDefault) event.preventDefault();"' + "    onClick=\"w2ui['" + r.name + "'].click('" + e.id + "', event); \">" + '<table cellpadding="0" cellspacing="0" style="margin-left:' + o * 18 + "px; padding-right:" + o * 18 + 'px"><tr>' + '<td class="w2ui-node-dots" nowrap onclick="w2ui[\'' + r.name + "'].toggle('" + e.id + "'); " + '        if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">' + '    <div class="w2ui-expand">' + (e.nodes.length > 0 ? e.expanded ? "-" : "+" : e.plus ? "+" : "") + "</div>" + "</td>" + '<td class="w2ui-node-data" nowrap>' + s + (e.count || e.count === 0 ? '<div class="w2ui-node-count">' + e.count + "</div>" : "") + '<div class="w2ui-node-caption">' + e.text + "</div>" + "</td>" + "</tr></table>" + "</div>" + '<div class="w2ui-node-sub" id="node_' + e.id + '_sub" style="' + e.style + ";" + (!e.hidden && e.expanded ? "" : "display: none;") + '"></div>';
					if (r.flat) {
						t = '<div class="w2ui-node ' + (e.selected ? "w2ui-selected" : "") + " " + (e.disabled ? "w2ui-disabled" : "") + '" id="node_' + e.id + '" style="' + (e.hidden ? "display: none;" : "") + '"' + "    onmouseover=\"$(this).find('.w2ui-node-data').w2tag(w2utils.base64decode('" + w2utils.base64encode(e.text + (e.count || e.count === 0 ? ' - <span class="w2ui-node-count">' + e.count + "</span>" : "")) + "'), " + "               { id: '" + e.id + "', left: -5 })\"" + "    onmouseout=\"$(this).find('.w2ui-node-data').w2tag(null, { id: '" + e.id + "' })\"" + "    ondblclick=\"w2ui['" + r.name + "'].dblClick('" + e.id + "', event);\"" + "    oncontextmenu=\"w2ui['" + r.name + "'].contextMenu('" + e.id + "', event); " + '        if (event.preventDefault) event.preventDefault();"' + "    onClick=\"w2ui['" + r.name + "'].click('" + e.id + "', event); \">" + '<div class="w2ui-node-data w2ui-node-flat">' + s + "</div>" + "</div>" + '<div class="w2ui-node-sub" id="node_' + e.id + '_sub" style="' + e.style + ";" + (!e.hidden && e.expanded ? "" : "display: none;") + '"></div>'
					}
				}
				return t
			}
			var t = (new Date).getTime();
			var n = this.trigger({
				phase: "before",
				type: "refresh",
				target: typeof e != "undefined" ? e : this.name
			});
			if (n.isCancelled === true) return;
			if (this.topHTML !== "") {
				$(this.box).find(".w2ui-sidebar-top").html(this.topHTML);
				$(this.box).find(".w2ui-sidebar-div").css("top", $(this.box).find(".w2ui-sidebar-top").height() + "px")
			}
			if (this.bottomHTML !== "") {
				$(this.box).find(".w2ui-sidebar-bottom").html(this.bottomHTML);
				$(this.box).find(".w2ui-sidebar-div").css("bottom", $(this.box).find(".w2ui-sidebar-bottom").height() + "px")
			}
			$(this.box).find("> div").css({
				width: $(this.box).width() + "px",
				height: $(this.box).height() + "px"
			});
			var r = this;
			var i, s;
			var o;
			if (typeof e == "undefined") {
				i = this;
				o = ".w2ui-sidebar-div"
			} else {
				i = this.get(e);
				if (i === null) return;
				o = "#node_" + w2utils.escapeId(i.id) + "_sub"
			}
			var u;
			if (i !== this) {
				var a = "#node_" + w2utils.escapeId(i.id);
				u = l(i);
				$(this.box).find(a).before('<div id="sidebar_' + this.name + '_tmp"></div>');
				$(this.box).find(a).remove();
				$(this.box).find(o).remove();
				$("#sidebar_" + this.name + "_tmp").before(u);
				$("#sidebar_" + this.name + "_tmp").remove()
			}
			$(this.box).find(o).html("");
			for (var f = 0; f < i.nodes.length; f++) {
				s = i.nodes[f];
				u = l(s);
				$(this.box).find(o).append(u);
				if (s.nodes.length !== 0) {
					this.refresh(s.id)
				}
			}
			this.trigger($.extend(n, {
				phase: "after"
			}));
			return (new Date).getTime() - t
		},
		resize: function () {
			var e = (new Date).getTime();
			var t = this.trigger({
				phase: "before",
				type: "resize",
				target: this.name
			});
			if (t.isCancelled === true) return;
			$(this.box).css("overflow", "hidden");
			$(this.box).find("> div").css({
				width: $(this.box).width() + "px",
				height: $(this.box).height() + "px"
			});
			this.trigger($.extend(t, {
				phase: "after"
			}));
			return (new Date).getTime() - e
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				type: "destroy",
				target: this.name
			});
			if (e.isCancelled === true) return;
			if ($(this.box).find("> div > div.w2ui-sidebar-div").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-sidebar").html("")
			}
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}))
		},
		lock: function (e, t) {
			var n = $(this.box).find("> div:first-child");
			var r = Array.prototype.slice.call(arguments, 0);
			r.unshift(n);
			w2utils.lock.apply(window, r)
		},
		unlock: function (e) {
			w2utils.unlock(this.box, e)
		}
	};
	$.extend(e.prototype, w2utils.event);
	w2obj.sidebar = e
})();
(function (e) {
	var t = function (t) {
		this.el = null;
		this.helpers = {};
		this.type = t.type || "text";
		this.options = e.extend(true, {}, t);
		this.onSearch = t.onSearch || null;
		this.onRequest = t.onRequest || null;
		this.onLoad = t.onLoad || null;
		this.onError = t.onError || null;
		this.onClick = t.onClick || null;
		this.onAdd = t.onAdd || null;
		this.onNew = t.onNew || null;
		this.onRemove = t.onRemove || null;
		this.onMouseOver = t.onMouseOver || null;
		this.onMouseOut = t.onMouseOut || null;
		this.onIconClick = t.onIconClick || null;
		this.tmp = {};
		delete this.options.type;
		delete this.options.onSearch;
		delete this.options.onRequest;
		delete this.options.onLoad;
		delete this.options.onError;
		delete this.options.onClick;
		delete this.options.onMouseOver;
		delete this.options.onMouseOut;
		delete this.options.onIconClick;
		e.extend(true, this, w2obj.field)
	};
	e.fn.w2field = function (n, r) {
		if (this.length == 0) {
			var i = t.prototype;
			if (i[n]) {
				return i[n].apply(i, Array.prototype.slice.call(arguments, 1))
			}
		} else {
			if (arguments.length == 0) {
				var s = e(this).data("w2field");
				return s
			}
			if (typeof n == "string" && typeof r == "object") {
				n = e.extend(true, {}, r, {
					type: n
				})
			}
			if (typeof n == "string" && typeof r == "undefined") {
				n = {
					type: n
				}
			}
			n.type = String(n.type).toLowerCase();
			return this.each(function (r, i) {
				var s = e(i).data("w2field");
				if (typeof s == "undefined") {
					var s = new t(n);
					e.extend(s, {
						handlers: []
					});
					if (i) s.el = e(i)[0];
					s.init();
					e(i).data("w2field", s);
					return s
				} else {
					s.clear();
					if (n.type == "clear") return;
					var s = new t(n);
					e.extend(s, {
						handlers: []
					});
					if (i) s.el = e(i)[0];
					s.init();
					e(i).data("w2field", s);
					return s
				}
				return null
			})
		}
	};
	t.prototype = {
		custom: {},
		pallete: [
			["000000", "444444", "666666", "999999", "CCCCCC", "EEEEEE", "F3F3F3", "FFFFFF"],
			["FF011B", "FF9838", "FFFD59", "01FD55", "00FFFE", "0424F3", "9B24F4", "FF21F5"],
			["F4CCCC", "FCE5CD", "FFF2CC", "D9EAD3", "D0E0E3", "CFE2F3", "D9D1E9", "EAD1DC"],
			["EA9899", "F9CB9C", "FEE599", "B6D7A8", "A2C4C9", "9FC5E8", "B4A7D6", "D5A6BD"],
			["E06666", "F6B26B", "FED966", "93C47D", "76A5AF", "6FA8DC", "8E7CC3", "C27BA0"],
			["CC0814", "E69138", "F1C232", "6AA84F", "45818E", "3D85C6", "674EA7", "A54D79"],
			["99050C", "B45F17", "BF901F", "37761D", "124F5C", "0A5394", "351C75", "741B47"],
			["660205", "783F0B", "7F6011", "274E12", "0C343D", "063762", "20124D", "4C1030"]
		],
		addType: function (e, t) {
			e = String(e).toLowerCase();
			this.custom[e] = t;
			return true
		},
		removeType: function (e) {
			e = String(e).toLowerCase();
			if (!this.custom[e]) return false;
			delete this.custom[e];
			return true
		},
		init: function () {
			var t = this;
			var n = this.options;
			var r;
			if (typeof this.custom[this.type] == "function") {
				this.custom[this.type].call(this, n);
				return
			}
			if (["INPUT", "TEXTAREA"].indexOf(this.el.tagName) == -1) {
				console.log("ERROR: w2field could only be applied to INPUT or TEXTAREA.", this.el);
				return
			}
			switch (this.type) {
			case "text":
			case "int":
			case "float":
			case "money":
			case "currency":
			case "percent":
			case "alphanumeric":
			case "hex":
				r = {
					min: null,
					max: null,
					step: 1,
					autoFormat: true,
					currencyPrefix: w2utils.settings.currencyPrefix,
					currencySuffix: w2utils.settings.currencySuffix,
					currencyPrecision: w2utils.settings.currencyPrecision,
					decimalSymbol: w2utils.settings.decimalSymbol,
					groupSymbol: w2utils.settings.groupSymbol,
					arrows: false,
					keyboard: true,
					precision: null,
					silent: true,
					prefix: "",
					suffix: ""
				};
				this.options = e.extend(true, {}, r, n);
				n = this.options;
				n.numberRE = new RegExp("[" + n.groupSymbol + "]", "g");
				n.moneyRE = new RegExp("[" + n.currencyPrefix + n.currencySuffix + n.groupSymbol + "]", "g");
				n.percentRE = new RegExp("[" + n.groupSymbol + "%]", "g");
				if (["text", "alphanumeric", "hex"].indexOf(this.type) != -1) {
					n.arrows = false;
					n.keyboard = false
				}
				this.addPrefix();
				this.addSuffix();
				break;
			case "color":
				r = {
					prefix: "#",
					suffix: '<div style="width: ' + (parseInt(e(this.el).css("font-size")) || 12) + 'px">&nbsp;</div>',
					arrows: false,
					keyboard: false
				};
				e.extend(n, r);
				this.addPrefix();
				this.addSuffix();
				e(this.el).attr("maxlength", 6);
				if (e(this.el).val() != "") setTimeout(function () {
					t.change()
				}, 1);
				break;
			case "date":
				r = {
					format: w2utils.settings.date_format,
					keyboard: true,
					silent: true,
					start: "",
					end: "",
					blocked: {},
					colored: {}
				};
				this.options = e.extend(true, {}, r, n);
				n = this.options;
				if (e(this.el).attr("placeholder") == null) e(this.el).attr("placeholder", n.format);
				break;
			case "time":
				r = {
					format: w2utils.settings.time_format,
					keyboard: true,
					silent: true,
					start: "",
					end: ""
				};
				this.options = e.extend(true, {}, r, n);
				n = this.options;
				if (e(this.el).attr("placeholder") == null) e(this.el).attr("placeholder", n.format);
				break;
			case "datetime":
				break;
			case "list":
			case "combo":
				r = {
					items: [],
					selected: {},
					url: null,
					postData: {},
					minLength: 1,
					cacheMax: 250,
					maxDropHeight: 350,
					match: "begins",
					silent: true,
					icon: null,
					iconStyle: "",
					onSearch: null,
					onRequest: null,
					onLoad: null,
					onError: null,
					onIconClick: null,
					renderDrop: null,
					compare: null,
					prefix: "",
					suffix: "",
					openOnFocus: false,
					markSearch: false
				};
				n.items = this.normMenu(n.items);
				if (this.type == "list") {
					r.openOnFocus = true;
					r.suffix = '<div class="arrow-down" style="margin-top: ' + (parseInt(e(this.el).height()) - 6) / 2 + 'px;"></div>';
					e(this.el).addClass("w2ui-select");
					if (!e.isPlainObject(n.selected) && n.items) {
						for (var i = 0; i < n.items.length; i++) {
							var s = n.items[i];
							if (s && s.id == n.selected) {
								n.selected = e.extend(true, {}, s);
								break
							}
						}
					}
					this.watchSize()
				}
				n = e.extend({}, r, n, {
					align: "both",
					altRows: true
				});
				this.options = n;
				if (!e.isPlainObject(n.selected)) n.selected = {};
				e(this.el).data("selected", n.selected);
				if (n.url) this.request(0);
				if (this.type == "list") this.addFocus();
				this.addPrefix();
				this.addSuffix();
				setTimeout(function () {
					t.refresh()
				}, 10);
				e(this.el).attr("autocomplete", "off");
				if (typeof n.selected.text != "undefined") e(this.el).val(n.selected.text);
				break;
			case "enum":
				r = {
					items: [],
					selected: [],
					max: 0,
					url: null,
					postData: {},
					minLength: 1,
					cacheMax: 250,
					maxWidth: 250,
					maxHeight: 350,
					maxDropHeight: 350,
					match: "contains",
					silent: true,
					openOnFocus: false,
					markSearch: true,
					renderDrop: null,
					renderItem: null,
					compare: null,
					style: "",
					onSearch: null,
					onRequest: null,
					onLoad: null,
					onError: null,
					onClick: null,
					onAdd: null,
					onNew: null,
					onRemove: null,
					onMouseOver: null,
					onMouseOut: null
				};
				n = e.extend({}, r, n, {
					align: "both",
					suffix: "",
					altRows: true
				});
				n.items = this.normMenu(n.items);
				n.selected = this.normMenu(n.selected);
				this.options = n;
				if (!e.isArray(n.selected)) n.selected = [];
				e(this.el).data("selected", n.selected);
				if (n.url) this.request(0);
				this.addSuffix();
				this.addMulti();
				this.watchSize();
				break;
			case "file":
				r = {
					selected: [],
					max: 0,
					maxSize: 0,
					maxFileSize: 0,
					maxWidth: 250,
					maxHeight: 350,
					maxDropHeight: 350,
					silent: true,
					renderItem: null,
					style: "",
					onClick: null,
					onAdd: null,
					onRemove: null,
					onMouseOver: null,
					onMouseOut: null
				};
				n = e.extend({}, r, n, {
					align: "both",
					altRows: true
				});
				this.options = n;
				if (!e.isArray(n.selected)) n.selected = [];
				e(this.el).data("selected", n.selected);
				if (e(this.el).attr("placeholder") == null) {
					e(this.el).attr("placeholder", w2utils.lang("Attach files by dragging and dropping or Click to Select"))
				}
				this.addMulti();
				this.watchSize();
				break
			}
			this.tmp = {
				onChange: function (e) {
					t.change.call(t, e)
				},
				onClick: function (e) {
					t.click.call(t, e)
				},
				onFocus: function (e) {
					t.focus.call(t, e)
				},
				onBlur: function (e) {
					t.blur.call(t, e)
				},
				onKeydown: function (e) {
					t.keyDown.call(t, e)
				},
				onKeyup: function (e) {
					t.keyUp.call(t, e)
				},
				onKeypress: function (e) {
					t.keyPress.call(t, e)
				}
			};
			e(this.el).addClass("w2field").data("w2field", this).on("change", this.tmp.onChange).on("click", this.tmp.onClick).on("focus", this.tmp.onFocus).on("blur", this.tmp.onBlur).on("keydown", this.tmp.onKeydown).on("keyup", this.tmp.onKeyup).on("keypress", this.tmp.onKeypress).css(w2utils.cssPrefix("box-sizing", "border-box"));
			this.change(e.Event("change"))
		},
		watchSize: function () {
			var t = this;
			var n = e(t.el).data("tmp") || {};
			n.sizeTimer = setInterval(function () {
				if (e(t.el).parents("body").length > 0) {
					t.resize()
				} else {
					clearInterval(n.sizeTimer)
				}
			}, 200);
			e(t.el).data("tmp", n)
		},
		get: function () {
			var t;
			if (["list", "enum", "file"].indexOf(this.type) != -1) {
				t = e(this.el).data("selected")
			} else {
				t = e(this.el).val()
			}
			return t
		},
		set: function (t) {
			if (["list", "enum", "file"].indexOf(this.type) != -1) {
				e(this.el).data("selected", t).change();
				this.refresh()
			} else {
				e(this.el).val(t)
			}
		},
		setIndex: function (t) {
			var n = this.options.items;
			if (n && n[t]) {
				e(this.el).data("selected", n[t]).change();
				this.refresh();
				return true
			}
			return false
		},
		clear: function () {
			var t = this;
			var n = this.options;
			if (["money", "currency"].indexOf(this.type) != -1) {
				e(this.el).val(e(this.el).val().replace(n.moneyRE, ""))
			}
			if (this.type == "percent") {
				e(this.el).val(e(this.el).val().replace(/%/g, ""))
			}
			if (this.type == "color") {
				e(this.el).removeAttr("maxlength")
			}
			if (this.type == "list") {
				e(this.el).removeClass("w2ui-select")
			}
			this.type = "clear";
			var r = e(this.el).data("tmp");
			if (!this.tmp) return;
			if (typeof r != "undefined") {
				e(this.el).height("auto");
				if (r && r["old-padding-left"]) e(this.el).css("padding-left", r["old-padding-left"]);
				if (r && r["old-padding-right"]) e(this.el).css("padding-right", r["old-padding-right"]);
				if (r && r["old-background-color"]) e(this.el).css("background-color", r["old-background-color"]);
				if (r && r["old-border-color"]) e(this.el).css("border-color", r["old-border-color"]);
				clearInterval(r.sizeTimer)
			}
			e(this.el).val(this.clean(e(this.el).val())).removeClass("w2field").removeData().off("change", this.tmp.onChange).off("click", this.tmp.onClick).off("focus", this.tmp.onFocus).off("blur", this.tmp.onBlur).off("keydown", this.tmp.onKeydown).off("keyup", this.tmp.onKeyup).off("keypress", this.tmp.onKeypress);
			for (var i in this.helpers) e(this.helpers[i]).remove();
			this.helpers = {}
		},
		refresh: function () {
			var t = this;
			var n = this.options;
			var r = e(this.el).data("selected");
			var i = (new Date).getTime();
			if (["list"].indexOf(this.type) != -1) {
				e(t.el).parent().css("white-space", "nowrap");
				if (t.helpers.prefix) t.helpers.prefix.hide();
				setTimeout(function () {
					if (!t.helpers.focus) return;
					if (!e.isEmptyObject(r) && n.icon) {
						n.prefix = '<span class="w2ui-icon ' + n.icon + '"style="cursor: pointer; font-size: 14px;' + " display: inline-block; margin-top: -1px; color: #7F98AD;" + n.iconStyle + '">' + "</span>";
						t.addPrefix()
					} else {
						n.prefix = "";
						t.addPrefix()
					}
					var i = t.helpers.focus.find("input");
					if (e(i).val() == "") {
						e(i).css("opacity", 0).prev().css("opacity", 0);
						e(t.el).val(r && r.text != null ? r.text : "")
					} else {
						e(i).css("opacity", 1).prev().css("opacity", 1);
						e(t.el).val("");
						setTimeout(function () {
							if (t.helpers.prefix) t.helpers.prefix.hide();
							var r = "position: absolute; opacity: 0; margin: 4px 0px 0px 2px; background-position: left !important;";
							if (n.icon) {
								e(i).css("margin-left", "17px");
								e(t.helpers.focus).find(".icon-search").attr("style", r + "width: 11px !important; opacity: 1")
							} else {
								e(i).css("margin-left", "0px");
								e(t.helpers.focus).find(".icon-search").attr("style", r + "width: 0px !important; opacity: 0")
							}
						}, 1)
					}
					if (e(t.el).prop("readonly") || e(t.el).prop("disabled")) {
						setTimeout(function () {
							e(t.helpers.prefix).css("opacity", "0.6");
							e(t.helpers.suffix).css("opacity", "0.6")
						}, 1)
					} else {
						setTimeout(function () {
							e(t.helpers.prefix).css("opacity", "1");
							e(t.helpers.suffix).css("opacity", "1")
						}, 1)
					}
				}, 1)
			}
			if (["enum", "file"].indexOf(this.type) != -1) {
				var s = "";
				for (var o in r) {
					var u = r[o];
					var a = "";
					if (typeof n.renderItem == "function") {
						a = n.renderItem(u, o, '<div class="w2ui-list-remove" title="' + w2utils.lang("Remove") + '" index="' + o + '">&nbsp;&nbsp;</div>')
					} else {
						a = '<div class="w2ui-list-remove" title="' + w2utils.lang("Remove") + '" index="' + o + '">&nbsp;&nbsp;</div>' + (t.type == "enum" ? u.text : u.name + '<span class="file-size"> - ' + w2utils.formatSize(u.size) + "</span>")
					}
					s += '<li index="' + o + '" style="max-width: ' + parseInt(n.maxWidth) + "px; " + (u.style ? u.style : "") + '">' + a + "</li>"
				}
				var f = t.helpers.multi;
				var l = f.find("ul");
				f.attr("style", f.attr("style") + ";" + n.style);
				if (e(t.el).prop("readonly") || e(t.el).prop("disabled")) {
					f.addClass("w2ui-readonly");
					f.css("pointer-events", "none").find("li").css("opacity", "0.6");
					e(t.helpers.multi).find("input").prop("readonly", true)
				} else {
					f.removeClass("w2ui-readonly");
					f.css("pointer-events", "auto").find("li").css("opacity", "1");
					e(t.helpers.multi).find("input").prop("readonly", false)
				}
				f.find(".w2ui-enum-placeholder").remove();
				l.find("li").not("li.nomouse").remove();
				if (s != "") {
					l.prepend(s)
				} else if (e(t.el).attr("placeholder") != null) {
					var c = "padding-top: " + e(this.el).css("padding-top") + ";" + "padding-left: " + e(this.el).css("padding-left") + "; " + "box-sizing: " + e(this.el).css("box-sizing") + "; " + "line-height: " + e(this.el).css("line-height") + "; " + "font-size: " + e(this.el).css("font-size") + "; " + "font-family: " + e(this.el).css("font-family") + "; ";
					f.prepend('<div class="w2ui-enum-placeholder" style="' + c + '">' + e(t.el).attr("placeholder") + "</div>")
				}
				f.find("li").data("mouse", "out").on("click", function (n) {
					var i = r[e(n.target).attr("index")];
					if (e(n.target).hasClass("nomouse")) return;
					n.stopPropagation();
					var s = t.trigger({
						phase: "before",
						type: "click",
						target: t.el,
						originalEvent: n.originalEvent,
						item: i
					});
					if (s.isCancelled === true) return;
					if (e(n.target).hasClass("w2ui-list-remove")) {
						if (e(t.el).attr("readonly") || e(t.el).attr("disabled")) return;
						var s = t.trigger({
							phase: "before",
							type: "remove",
							target: t.el,
							originalEvent: n.originalEvent,
							item: i
						});
						if (s.isCancelled === true) return;
						e().w2overlay();
						r.splice(e(n.target).attr("index"), 1);
						e(t.el).trigger("change");
						e(n.target).parent().fadeOut("fast");
						setTimeout(function () {
							t.refresh();
							t.trigger(e.extend(s, {
								phase: "after"
							}))
						}, 300)
					}
					if (t.type == "file" && !e(n.target).hasClass("w2ui-list-remove")) {
						var o = "";
						if (/image/i.test(i.type)) {
							o = '<div style="padding: 3px;">' + '    <img src="' + (i.content ? "data:" + i.type + ";base64," + i.content : "") + '" style="max-width: 300px;" ' + '        onload="var w = $(this).width(); var h = $(this).height(); ' + "            if (w < 300 & h < 300) return; " + "            if (w >= h && w > 300) $(this).width(300);" + '            if (w < h && h > 300) $(this).height(300);"' + "        onerror=\"this.style.display = 'none'\"" + "    >" + "</div>"
						}
						var u = 'style="padding: 3px; text-align: right; color: #777;"';
						var a = 'style="padding: 3px"';
						o += '<div style="padding: 8px;">' + '    <table cellpadding="2">' + "    <tr><td " + u + ">" + w2utils.lang("Name") + ":</td><td " + a + ">" + i.name + "</td></tr>" + "    <tr><td " + u + ">" + w2utils.lang("Size") + ":</td><td " + a + ">" + w2utils.formatSize(i.size) + "</td></tr>" + "    <tr><td " + u + ">" + w2utils.lang("Type") + ":</td><td " + a + ">" + '        <span style="width: 200px; display: block-inline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + i.type + "</span>" + "    </td></tr>" + "    <tr><td " + u + ">" + w2utils.lang("Modified") + ":</td><td " + a + ">" + w2utils.date(i.modified) + "</td></tr>" + "    </table>" + "</div>";
						e("#w2ui-overlay").remove();
						e(n.target).w2overlay(o)
					}
					t.trigger(e.extend(s, {
						phase: "after"
					}))
				}).on("mouseover", function (n) {
					var i = n.target;
					if (i.tagName != "LI") i = i.parentNode;
					if (e(i).hasClass("nomouse")) return;
					if (e(i).data("mouse") == "out") {
						var s = r[e(i).attr("index")];
						var o = t.trigger({
							phase: "before",
							type: "mouseOver",
							target: t.el,
							originalEvent: n.originalEvent,
							item: s
						});
						if (o.isCancelled === true) return;
						t.trigger(e.extend(o, {
							phase: "after"
						}))
					}
					e(i).data("mouse", "over")
				}).on("mouseout", function (n) {
					var i = n.target;
					if (i.tagName != "LI") i = i.parentNode;
					if (e(i).hasClass("nomouse")) return;
					e(i).data("mouse", "leaving");
					setTimeout(function () {
						if (e(i).data("mouse") == "leaving") {
							e(i).data("mouse", "out");
							var s = r[e(i).attr("index")];
							var o = t.trigger({
								phase: "before",
								type: "f",
								target: t.el,
								originalEvent: n.originalEvent,
								item: s
							});
							if (o.isCancelled === true) return;
							t.trigger(e.extend(o, {
								phase: "after"
							}))
						}
					}, 0)
				});
				e(this.el).height("auto");
				var h = e(f).find("> div.w2ui-multi-items").height() + w2utils.getSize(f, "+height") * 2;
				if (h < 26) h = 26;
				if (h > n.maxHeight) h = n.maxHeight;
				if (f.length > 0) f[0].scrollTop = 1e3;
				var p = w2utils.getSize(e(this.el), "height") - 2;
				if (p > h) h = p;
				e(f).css({
					height: h + "px",
					overflow: h == n.maxHeight ? "auto" : "hidden"
				});
				if (h < n.maxHeight) e(f).prop("scrollTop", 0);
				e(this.el).css({
					height: h + 2 + "px"
				})
			}
			return (new Date).getTime() - i
		},
		reset: function () {
			var e = this;
			var t = this.type;
			this.clear();
			this.type = t;
			this.init()
		},
		resize: function () {
			var t = this;
			var n = e(t.el).width();
			var r = e(t.el).height();
			if (t.tmp.current_width == n && r > 0) return;
			var i = this.helpers.focus;
			var s = this.helpers.multi;
			var o = this.helpers.suffix;
			var u = this.helpers.prefix;
			if (i) {
				i.width(e(t.el).width())
			}
			if (s) {
				var a = w2utils.getSize(t.el, "width") - parseInt(e(t.el).css("margin-left"), 10) - parseInt(e(t.el).css("margin-right"), 10);
				e(s).width(a)
			}
			if (o) {
				t.options.suffix = '<div class="arrow-down" style="margin-top: ' + (parseInt(e(t.el).height()) - 6) / 2 + 'px;"></div>';
				t.addSuffix()
			}
			if (u) {
				t.addPrefix()
			}
			t.tmp.current_width = n
		},
		clean: function (t) {
			if (typeof t == "number") {
				return t
			}
			var n = this.options;
			t = String(t).trim();
			if (["int", "float", "money", "currency", "percent"].indexOf(this.type) != -1) {
				if (typeof t == "string") {
					if (n.autoFormat && ["money", "currency"].indexOf(this.type) != -1) t = String(t).replace(n.moneyRE, "");
					if (n.autoFormat && this.type == "percent") t = String(t).replace(n.percentRE, "");
					if (n.autoFormat && ["int", "float"].indexOf(this.type) != -1) t = String(t).replace(n.numberRE, "");
					t = t.replace(n.decimalSymbol, ".")
				}
				if (parseFloat(t) == t) {
					if (n.min !== null && t < n.min) {
						t = n.min;
						e(this.el).val(n.min)
					}
					if (n.max !== null && t > n.max) {
						t = n.max;
						e(this.el).val(n.max)
					}
				}
				if (t !== "" && w2utils.isFloat(t)) t = Number(t);
				else t = ""
			}
			return t
		},
		format: function (e) {
			var t = this.options;
			if (t.autoFormat && e != "") {
				switch (this.type) {
				case "money":
				case "currency":
					e = w2utils.formatNumber(Number(e).toFixed(t.currencyPrecision), t.groupSymbol);
					if (e != "") e = t.currencyPrefix + e + t.currencySuffix;
					break;
				case "percent":
					e = w2utils.formatNumber(t.precision ? Number(e).toFixed(t.precision) : e, t.groupSymbol);
					if (e != "") e += "%";
					break;
				case "float":
					e = w2utils.formatNumber(t.precision ? Number(e).toFixed(t.precision) : e, t.groupSymbol);
					break;
				case "int":
					e = w2utils.formatNumber(e, t.groupSymbol);
					break
				}
			}
			return e
		},
		change: function (t) {
			var n = this;
			var r = n.options;
			if (["int", "float", "money", "currency", "percent"].indexOf(this.type) != -1) {
				var i = e(this.el).val();
				var s = this.format(this.clean(e(this.el).val()));
				if (i != "" && i != s) {
					e(this.el).val(s).change();
					t.stopPropagation();
					t.preventDefault();
					return false
				}
			}
			if (this.type == "color") {
				var o = "#" + e(this.el).val();
				if (e(this.el).val().length != 6 && e(this.el).val().length != 3) o = "";
				e(this.el).next().find("div").css("background-color", o);
				if (e(n.el).is(":focus")) this.updateOverlay()
			}
			if (["list", "enum", "file"].indexOf(this.type) != -1) {
				n.refresh();
				setTimeout(function () {
					n.refresh()
				}, 5)
			}
			if (["date", "time"].indexOf(this.type) != -1) {
				var u = parseInt(n.el.value);
				if (w2utils.isInt(n.el.value) && u > 3e3) {
					if (this.type == "time") e(n.el).val(w2utils.formatTime(new Date(u), r.format)).change();
					if (this.type == "date") e(n.el).val(w2utils.formatDate(new Date(u), r.format)).change()
				}
			}
		},
		click: function (t) {
			t.stopPropagation();
			if (["list", "combo", "enum"].indexOf(this.type) != -1) {
				if (!e(this.el).is(":focus")) this.focus(t)
			}
			if (["date", "time", "color"].indexOf(this.type) != -1) {
				this.updateOverlay()
			}
		},
		focus: function (t) {
			var n = this;
			var r = this.options;
			if (["color", "date", "time"].indexOf(n.type) !== -1) {
				if (e(n.el).attr("readonly") || e(n.el).attr("disabled")) return;
				if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay")[0].hide();
				setTimeout(function () {
					n.updateOverlay()
				}, 150)
			}
			if (["list", "combo", "enum"].indexOf(n.type) != -1) {
				if (e(n.el).attr("readonly") || e(n.el).attr("disabled")) return;
				if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay")[0].hide();
				n.resize();
				setTimeout(function () {
					if (n.type == "list" && e(n.el).is(":focus")) {
						e(n.helpers.focus).find("input").focus();
						return
					}
					n.search();
					setTimeout(function () {
						n.updateOverlay()
					}, 1)
				}, 1)
			}
			if (n.type == "file") {
				e(n.helpers.multi).css({
					outline: "auto 5px #7DB4F3",
					"outline-offset": "-2px"
				})
			}
		},
		blur: function (t) {
			var n = this;
			var r = n.options;
			var i = e(n.el).val().trim();
			if (["color", "date", "time", "list", "combo", "enum"].indexOf(n.type) != -1) {
				if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay")[0].hide()
			}
			if (["int", "float", "money", "currency", "percent"].indexOf(n.type) != -1) {
				if (i !== "" && !n.checkType(i)) {
					e(n.el).val("").change();
					if (r.silent === false) {
						e(n.el).w2tag("Not a valid number");
						setTimeout(function () {
							e(n.el).w2tag("")
						}, 3e3)
					}
				}
			}
			if (["date", "time"].indexOf(n.type) != -1) {
				if (i !== "" && !n.inRange(n.el.value)) {
					e(n.el).val("").removeData("selected").change();
					if (r.silent === false) {
						e(n.el).w2tag("Not in range");
						setTimeout(function () {
							e(n.el).w2tag("")
						}, 3e3)
					}
				} else {
					if (n.type == "date" && i !== "" && !w2utils.isDate(n.el.value, r.format)) {
						e(n.el).val("").removeData("selected").change();
						if (r.silent === false) {
							e(n.el).w2tag("Not a valid date");
							setTimeout(function () {
								e(n.el).w2tag("")
							}, 3e3)
						}
					}
					if (n.type == "time" && i !== "" && !w2utils.isTime(n.el.value)) {
						e(n.el).val("").removeData("selected").change();
						if (r.silent === false) {
							e(n.el).w2tag("Not a valid time");
							setTimeout(function () {
								e(n.el).w2tag("")
							}, 3e3)
						}
					}
				}
			}
			if (n.type == "enum") {
				e(n.helpers.multi).find("input").val("").width(20)
			}
			if (n.type == "file") {
				e(n.helpers.multi).css({
					outline: "none"
				})
			}
		},
		keyPress: function (e) {
			var t = this;
			var n = t.options;
			if (["int", "float", "money", "currency", "percent", "hex", "color", "alphanumeric"].indexOf(t.type) != -1) {
				if (e.metaKey || e.ctrlKey || e.altKey || e.charCode != e.keyCode && e.keyCode > 0) return;
				var r = String.fromCharCode(e.charCode);
				if (!t.checkType(r, true) && e.keyCode != 13) {
					e.preventDefault();
					if (e.stopPropagation) e.stopPropagation();
					else e.cancelBubble = true;
					return false
				}
			}
			if (["date", "time"].indexOf(t.type) != -1) {
				setTimeout(function () {
					t.updateOverlay()
				}, 1)
			}
		},
		keyDown: function (t, n) {
			var r = this;
			var i = r.options;
			var s = t.keyCode || n && n.keyCode;
			if (["int", "float", "money", "currency", "percent"].indexOf(r.type) != -1) {
				if (!i.keyboard || e(r.el).attr("readonly")) return;
				var o = false;
				var u = parseFloat(e(r.el).val().replace(i.moneyRE, "")) || 0;
				var a = i.step;
				if (t.ctrlKey || t.metaKey) a = 10;
				switch (s) {
				case 38:
					if (t.shiftKey) break;
					e(r.el).val(u + a <= i.max || i.max === null ? Number((u + a).toFixed(12)) : i.max).change();
					o = true;
					break;
				case 40:
					if (t.shiftKey) break;
					e(r.el).val(u - a >= i.min || i.min === null ? Number((u - a).toFixed(12)) : i.min).change();
					o = true;
					break
				}
				if (o) {
					t.preventDefault();
					setTimeout(function () {
						r.el.setSelectionRange(r.el.value.length, r.el.value.length)
					}, 0)
				}
			}
			if (r.type == "date") {
				if (!i.keyboard || e(r.el).attr("readonly")) return;
				var o = false;
				var f = 24 * 60 * 60 * 1e3;
				var a = 1;
				if (t.ctrlKey || t.metaKey) a = 10;
				var l = w2utils.isDate(e(r.el).val(), i.format, true);
				if (!l) {
					l = new Date;
					f = 0
				}
				switch (s) {
				case 38:
					if (t.shiftKey) break;
					var c = w2utils.formatDate(l.getTime() + f, i.format);
					if (a == 10) c = w2utils.formatDate(new Date(l.getFullYear(), l.getMonth() + 1, l.getDate()), i.format);
					e(r.el).val(c).change();
					o = true;
					break;
				case 40:
					if (t.shiftKey) break;
					var c = w2utils.formatDate(l.getTime() - f, i.format);
					if (a == 10) c = w2utils.formatDate(new Date(l.getFullYear(), l.getMonth() - 1, l.getDate()), i.format);
					e(r.el).val(c).change();
					o = true;
					break
				}
				if (o) {
					t.preventDefault();
					setTimeout(function () {
						r.el.setSelectionRange(r.el.value.length, r.el.value.length);
						r.updateOverlay()
					}, 0)
				}
			}
			if (r.type == "time") {
				if (!i.keyboard || e(r.el).attr("readonly")) return;
				var o = false;
				var a = t.ctrlKey || t.metaKey ? 60 : 1;
				var u = e(r.el).val();
				var h = r.toMin(u) || r.toMin((new Date).getHours() + ":" + ((new Date).getMinutes() - 1));
				switch (s) {
				case 38:
					if (t.shiftKey) break;
					h += a;
					o = true;
					break;
				case 40:
					if (t.shiftKey) break;
					h -= a;
					o = true;
					break
				}
				if (o) {
					e(r.el).val(r.fromMin(h)).change();
					t.preventDefault();
					setTimeout(function () {
						r.el.setSelectionRange(r.el.value.length, r.el.value.length)
					}, 0)
				}
			}
			if (r.type == "color") {
				if (e(r.el).attr("readonly")) return;
				if (t.keyCode == 86 && (t.ctrlKey || t.metaKey)) {
					e(r.el).prop("maxlength", 7);
					setTimeout(function () {
						var t = e(r).val();
						if (t.substr(0, 1) == "#") t = t.substr(1);
						if (!w2utils.isHex(t)) t = "";
						e(r).val(t).prop("maxlength", 6).change()
					}, 20)
				}
				if ((t.ctrlKey || t.metaKey) && !t.shiftKey) {
					if (typeof r.tmp.cind1 == "undefined") {
						r.tmp.cind1 = -1;
						r.tmp.cind2 = -1
					} else {
						switch (s) {
						case 38:
							r.tmp.cind1--;
							break;
						case 40:
							r.tmp.cind1++;
							break;
						case 39:
							r.tmp.cind2++;
							break;
						case 37:
							r.tmp.cind2--;
							break
						}
						if (r.tmp.cind1 < 0) r.tmp.cind1 = 0;
						if (r.tmp.cind1 > this.pallete.length - 1) r.tmp.cind1 = this.pallete.length - 1;
						if (r.tmp.cind2 < 0) r.tmp.cind2 = 0;
						if (r.tmp.cind2 > this.pallete[0].length - 1) r.tmp.cind2 = this.pallete[0].length - 1
					}
					if ([37, 38, 39, 40].indexOf(s) != -1) {
						e(r.el).val(this.pallete[r.tmp.cind1][r.tmp.cind2]).change();
						t.preventDefault()
					}
				}
			}
			if (["list", "combo", "enum"].indexOf(r.type) != -1) {
				if (e(r.el).attr("readonly")) return;
				var p = e(r.el).data("selected");
				var d = e(r.helpers.focus).find("input");
				var v = false;
				if (r.type == "list") {
					if ([37, 38, 39, 40].indexOf(s) == -1) r.refresh()
				}
				switch (s) {
				case 27:
					if (r.type == "list") {
						if (e(d).val() != "") e(d).val("");
						t.stopPropagation()
					}
					break;
				case 37:
				case 39:
					break;
				case 13:
					if (e("#w2ui-overlay").length == 0) break;
					var m = i.items[i.index];
					var g = e(r.helpers.multi).find("input");
					if (r.type == "enum") {
						if (m != null) {
							var y = r.trigger({
								phase: "before",
								type: "add",
								target: r.el,
								originalEvent: t.originalEvent,
								item: m
							});
							if (y.isCancelled === true) return;
							m = y.item;
							if (p.length >= i.max && i.max > 0) p.pop();
							delete m.hidden;
							delete r.tmp.force_open;
							p.push(m);
							e(r.el).change();
							g.val("").width(20);
							r.refresh();
							r.trigger(e.extend(y, {
								phase: "after"
							}))
						} else {
							m = {
								id: g.val(),
								text: g.val()
							};
							var y = r.trigger({
								phase: "before",
								type: "new",
								target: r.el,
								originalEvent: t.originalEvent,
								item: m
							});
							if (y.isCancelled === true) return;
							m = y.item;
							if (typeof r.onNew == "function") {
								if (p.length >= i.max && i.max > 0) p.pop();
								delete r.tmp.force_open;
								p.push(m);
								e(r.el).change();
								g.val("").width(20);
								r.refresh()
							}
							r.trigger(e.extend(y, {
								phase: "after"
							}))
						}
					} else {
						if (m) e(r.el).data("selected", m).val(m.text).change();
						if (e(r.el).val() == "" && e(r.el).data("selected")) e(r.el).removeData("selected").val("").change();
						if (r.type == "list") {
							d.val("");
							r.refresh()
						}
						r.tmp.force_hide = true
					}
					break;
				case 8:
				case 46:
					if (r.type == "enum" && s == 8) {
						if (e(r.helpers.multi).find("input").val() == "" && p.length > 0) {
							var m = p[p.length - 1];
							var y = r.trigger({
								phase: "before",
								type: "remove",
								target: r.el,
								originalEvent: t.originalEvent,
								item: m
							});
							if (y.isCancelled === true) return;
							p.pop();
							e(r.el).trigger("change");
							r.refresh();
							r.trigger(e.extend(y, {
								phase: "after"
							}))
						}
					}
					if (r.type == "list" && e(d).val() == "") {
						e(r.el).data("selected", {}).change();
						r.refresh()
					}
					break;
				case 38:
					i.index = w2utils.isInt(i.index) ? parseInt(i.index) : 0;
					i.index--;
					while (i.index > 0 && i.items[i.index].hidden) i.index--;
					if (i.index == 0 && i.items[i.index].hidden) {
						while (i.items[i.index] && i.items[i.index].hidden) i.index++
					}
					v = true;
					break;
				case 40:
					i.index = w2utils.isInt(i.index) ? parseInt(i.index) : -1;
					i.index++;
					while (i.index < i.items.length - 1 && i.items[i.index].hidden) i.index++;
					if (i.index == i.items.length - 1 && i.items[i.index].hidden) {
						while (i.items[i.index] && i.items[i.index].hidden) i.index--
					}
					var b = r.el;
					if (["enum"].indexOf(r.type) != -1) b = r.helpers.multi.find("input");
					if (e(b).val() == "" && e("#w2ui-overlay").length == 0) {
						r.tmp.force_open = true
					} else {
						v = true
					}
					break
				}
				if (v) {
					if (i.index < 0) i.index = 0;
					if (i.index >= i.items.length) i.index = i.items.length - 1;
					r.updateOverlay(v);
					t.preventDefault();
					setTimeout(function () {
						if (r.type == "enum") {
							var e = r.helpers.multi.find("input").get(0);
							e.setSelectionRange(e.value.length, e.value.length)
						} else if (r.type == "list") {
							var e = r.helpers.focus.find("input").get(0);
							e.setSelectionRange(e.value.length, e.value.length)
						} else {
							r.el.setSelectionRange(r.el.value.length, r.el.value.length)
						}
					}, 0);
					return
				}
				if (r.type == "enum") {
					var b = r.helpers.multi.find("input");
					var w = b.val();
					b.width((w.length + 2) * 8 + "px")
				}
				if ([16, 17, 18, 20, 37, 39, 91].indexOf(s) == -1) {
					setTimeout(function () {
						if (!r.tmp.force_hide) r.request();
						r.search()
					}, 1)
				}
			}
		},
		keyUp: function (t) {
			if (this.type == "color") {
				if (t.keyCode == 86 && (t.ctrlKey || t.metaKey)) e(this).prop("maxlength", 6)
			}
		},
		clearCache: function () {
			var e = this.options;
			e.items = [];
			this.tmp.xhr_loading = false;
			this.tmp.xhr_search = "";
			this.tmp.xhr_total = -1;
			this.search()
		},
		request: function (t) {
			var n = this;
			var r = this.options;
			var i = e(n.el).val() || "";
			if (!r.url) return;
			if (n.type == "enum") {
				var s = e(n.helpers.multi).find("input");
				if (s.length == 0) i = "";
				else i = s.val()
			}
			if (n.type == "list") {
				var s = e(n.helpers.focus).find("input");
				if (s.length == 0) i = "";
				else i = s.val()
			}
			if (r.minLength != 0 && i.length < r.minLength) {
				r.items = [];
				this.updateOverlay();
				return
			}
			if (typeof t == "undefined") t = 350;
			if (typeof n.tmp.xhr_search == "undefined") n.tmp.xhr_search = "";
			if (typeof n.tmp.xhr_total == "undefined") n.tmp.xhr_total = -1;
			if (r.url && e(n.el).prop("readonly") != true && (r.items.length === 0 && n.tmp.xhr_total !== 0 || n.tmp.xhr_total == r.cacheMax && i.length > n.tmp.xhr_search.length || i.length >= n.tmp.xhr_search.length && i.substr(0, n.tmp.xhr_search.length) != n.tmp.xhr_search || i.length < n.tmp.xhr_search.length)) {
				if (n.tmp.xhr) n.tmp.xhr.abort();
				n.tmp.xhr_loading = true;
				n.search();
				clearTimeout(n.tmp.timeout);
				n.tmp.timeout = setTimeout(function () {
					var t = r.url;
					var s = {
						search: i,
						max: r.cacheMax
					};
					e.extend(s, r.postData);
					var o = n.trigger({
						phase: "before",
						type: "request",
						target: n.el,
						url: t,
						postData: s
					});
					if (o.isCancelled === true) return;
					t = o.url;
					s = o.postData;
					var u = {
						type: "GET",
						url: t,
						data: s,
						dataType: "JSON"
					};
					if (w2utils.settings.dataType == "JSON") {
						u.type = "POST";
						u.data = JSON.stringify(u.data);
						u.contentType = "application/json"
					}
					n.tmp.xhr = e.ajax(u).done(function (t, o, u) {
						var a = n.trigger({
							phase: "before",
							type: "load",
							target: n.el,
							search: s.search,
							data: t,
							xhr: u
						});
						if (a.isCancelled === true) return;
						t = a.data;
						if (typeof t == "string") t = JSON.parse(t);
						if (t.status != "success") {
							console.log("ERROR: server did not return proper structure. It should return", {
								status: "success",
								items: [{
									id: 1,
									text: "item"
								}]
							});
							return
						}
						if (t.items.length > r.cacheMax) t.items.splice(r.cacheMax, 1e5);
						n.tmp.xhr_loading = false;
						n.tmp.xhr_search = i;
						n.tmp.xhr_total = t.items.length;
						r.items = n.normMenu(t.items);
						if (i == "" && t.items.length == 0) n.tmp.emptySet = true;
						else n.tmp.emptySet = false;
						n.search();
						n.trigger(e.extend(a, {
							phase: "after"
						}))
					}).fail(function (t, r, s) {
						var o = {
							status: r,
							error: s,
							rawResponseText: t.responseText
						};
						var u = n.trigger({
							phase: "before",
							type: "error",
							target: n.el,
							search: i,
							error: o,
							xhr: t
						});
						if (u.isCancelled === true) return;
						if (r != "abort") {
							var a;
							try {
								a = e.parseJSON(t.responseText)
							} catch (f) {}
							console.log("ERROR: Server communication failed.", "\n   EXPECTED:", {
								status: "success",
								items: [{
									id: 1,
									text: "item"
								}]
							}, "\n         OR:", {
								status: "error",
								message: "error message"
							}, "\n   RECEIVED:", typeof a == "object" ? a : t.responseText)
						}
						n.clearCache();
						n.trigger(e.extend(u, {
							phase: "after"
						}))
					});
					n.trigger(e.extend(o, {
						phase: "after"
					}))
				}, t)
			}
		},
		search: function () {
			var t = this;
			var n = this.options;
			var r = e(t.el).val();
			var i = t.el;
			var s = [];
			var o = e(t.el).data("selected");
			if (t.type == "enum") {
				i = e(t.helpers.multi).find("input");
				r = i.val();
				for (var u in o) {
					if (o[u]) s.push(o[u].id)
				}
			}
			if (t.type == "list") {
				i = e(t.helpers.focus).find("input");
				r = i.val();
				for (var u in o) {
					if (o[u]) s.push(o[u].id)
				}
			}
			var a = t.trigger({
				phase: "before",
				type: "search",
				target: i,
				search: r
			});
			if (a.isCancelled === true) return;
			if (t.tmp.xhr_loading !== true) {
				var f = 0;
				for (var l = 0; l < n.items.length; l++) {
					var c = n.items[l];
					if (typeof n.compare == "function") {
						c.hidden = n.compare.call(this, c, r) === false ? true : false
					} else {
						var h = "";
						var p = "";
						if (["is", "begins"].indexOf(n.match) != -1) h = "^";
						if (["is", "ends"].indexOf(n.match) != -1) p = "$";
						try {
							var d = new RegExp(h + r + p, "i");
							if (d.test(c.text) || c.text == "...") c.hidden = false;
							else c.hidden = true
						} catch (v) {}
					}
					if (t.type == "enum" && e.inArray(c.id, s) != -1) c.hidden = true;
					if (c.hidden !== true) {
						f++;
						delete c.hidden
					}
				}
				n.index = 0;
				while (n.items[n.index] && n.items[n.index].hidden) n.index++;
				if (f <= 0) n.index = -1;
				n.spinner = false;
				t.updateOverlay();
				setTimeout(function () {
					var t = e("#w2ui-overlay").html() || "";
					if (n.markSearch && t.indexOf("$.fn.w2menuHandler") != -1) {
						e("#w2ui-overlay").w2marker(r)
					}
				}, 1)
			} else {
				n.items.splice(0, n.cacheMax);
				n.spinner = true;
				t.updateOverlay()
			}
			t.trigger(e.extend(a, {
				phase: "after"
			}))
		},
		updateOverlay: function (t) {
			var n = this;
			var r = this.options;
			if (this.type == "color") {
				if (e(n.el).attr("readonly")) return;
				if (e("#w2ui-overlay").length == 0) {
					e(n.el).w2overlay(n.getColorHTML())
				} else {
					e("#w2ui-overlay > div").html(n.getColorHTML())
				}
				e("#w2ui-overlay .color").on("mousedown", function (t) {
					var r = e(t.originalEvent.target).attr("name");
					var i = e(t.originalEvent.target).attr("index").split(":");
					n.tmp.cind1 = i[0];
					n.tmp.cind2 = i[1];
					e(n.el).val(r).change();
					e(this).html("&#149;")
				}).on("mouseup", function () {
					setTimeout(function () {
						if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay").removeData("keepOpen")[0].hide()
					}, 10)
				})
			}
			if (this.type == "date") {
				if (e(n.el).attr("readonly")) return;
				if (e("#w2ui-overlay").length == 0) {
					e(n.el).w2overlay('<div class="w2ui-reset w2ui-calendar" onclick="event.stopPropagation();"></div>', {
						css: {
							"background-color": "#f5f5f5"
						}
					})
				}
				var i, s;
				var o = w2utils.isDate(e(n.el).val(), n.options.format, true);
				if (o) {
					i = o.getMonth() + 1;
					s = o.getFullYear()
				}(function c(t, r) {
					e("#w2ui-overlay > div > div").html(n.getMonthHTML(t, r));
					e("#w2ui-overlay .w2ui-calendar-title").on("mousedown", function () {
						if (e(this).next().hasClass("w2ui-calendar-jump")) {
							e(this).next().remove()
						} else {
							var t, r;
							e(this).after('<div class="w2ui-calendar-jump" style=""></div>');
							e(this).next().hide().html(n.getYearHTML()).fadeIn(200);
							setTimeout(function () {
								e("#w2ui-overlay .w2ui-calendar-jump").find(".w2ui-jump-month, .w2ui-jump-year").on("click", function () {
									if (e(this).hasClass("w2ui-jump-month")) {
										e(this).parent().find(".w2ui-jump-month").removeClass("selected");
										e(this).addClass("selected");
										r = e(this).attr("name")
									}
									if (e(this).hasClass("w2ui-jump-year")) {
										e(this).parent().find(".w2ui-jump-year").removeClass("selected");
										e(this).addClass("selected");
										t = e(this).attr("name")
									}
									if (t != null && r != null) {
										e("#w2ui-overlay .w2ui-calendar-jump").fadeOut(100);
										setTimeout(function () {
											c(parseInt(r) + 1, t)
										}, 100)
									}
								});
								e("#w2ui-overlay .w2ui-calendar-jump >:last-child").prop("scrollTop", 2e3)
							}, 1)
						}
					});
					e("#w2ui-overlay .w2ui-date").on("mousedown", function () {
						var t = e(this).attr("date");
						e(n.el).val(t).change();
						e(this).css({
							"background-color": "#B6D5FB",
							"border-color": "#aaa"
						})
					}).on("mouseup", function () {
						setTimeout(function () {
							if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay").removeData("keepOpen")[0].hide()
						}, 10)
					});
					e("#w2ui-overlay .previous").on("mousedown", function () {
						var e = n.options.current.split("/");
						e[0] = parseInt(e[0]) - 1;
						c(e[0], e[1])
					});
					e("#w2ui-overlay .next").on("mousedown", function () {
						var e = n.options.current.split("/");
						e[0] = parseInt(e[0]) + 1;
						c(e[0], e[1])
					})
				})(i, s)
			}
			if (this.type == "time") {
				if (e(n.el).attr("readonly")) return;
				if (e("#w2ui-overlay").length == 0) {
					e(n.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time" onclick="event.stopPropagation();"></div>', {
						css: {
							"background-color": "#fff"
						}
					})
				}
				var u = this.options.format == "h24";
				e("#w2ui-overlay > div").html(n.getHourHTML());
				e("#w2ui-overlay .w2ui-time").on("mousedown", function (t) {
					e(this).css({
						"background-color": "#B6D5FB",
						"border-color": "#aaa"
					});
					var r = e(this).attr("hour");
					e(n.el).val((r > 12 && !u ? r - 12 : r) + ":00" + (!u ? r < 12 ? " am" : " pm" : "")).change()
				}).on("mouseup", function () {
					var t = e(this).attr("hour");
					if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay")[0].hide();
					e(n.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time"></div>', {
						css: {
							"background-color": "#fff"
						}
					});
					e("#w2ui-overlay > div").html(n.getMinHTML(t));
					e("#w2ui-overlay .w2ui-time").on("mousedown", function () {
						e(this).css({
							"background-color": "#B6D5FB",
							"border-color": "#aaa"
						});
						var r = e(this).attr("min");
						e(n.el).val((t > 12 && !u ? t - 12 : t) + ":" + (r < 10 ? 0 : "") + r + (!u ? t < 12 ? " am" : " pm" : "")).change()
					}).on("mouseup", function () {
						setTimeout(function () {
							if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay").removeData("keepOpen")[0].hide()
						}, 10)
					})
				})
			}
			if (["list", "combo", "enum"].indexOf(this.type) != -1) {
				var a = this.el;
				var f = this.el;
				if (this.type == "enum") {
					a = e(this.helpers.multi);
					f = e(a).find("input")
				}
				if (this.type == "list") {
					f = e(this.helpers.focus).find("input")
				}
				if (e(f).is(":focus")) {
					if (r.openOnFocus === false && e(f).val() == "" && n.tmp.force_open !== true) {
						e().w2overlay();
						return
					}
					if (n.tmp.force_hide) {
						e().w2overlay();
						setTimeout(function () {
							delete n.tmp.force_hide
						}, 1);
						return
					}
					if (e(f).val() != "") delete n.tmp.force_open;
					var l = w2utils.lang("No matches");
					if (r.url != null && e(f).val().length < r.minLength && n.tmp.emptySet !== true) l = r.minLength + " " + w2utils.lang("letters or more...");
					if (r.url != null && e(f).val() == "" && n.tmp.emptySet !== true) l = w2utils.lang("Type to search....");
					e(a).w2menu(!t ? "refresh" : "refresh-index", e.extend(true, {}, r, {
						search: false,
						render: r.renderDrop,
						maxHeight: r.maxDropHeight,
						msgNoItems: l,
						onSelect: function (t) {
							if (n.type == "enum") {
								var i = e(n.el).data("selected");
								if (t.item) {
									var s = n.trigger({
										phase: "before",
										type: "add",
										target: n.el,
										originalEvent: t.originalEvent,
										item: t.item
									});
									if (s.isCancelled === true) return;
									if (i.length >= r.max && r.max > 0) i.pop();
									delete t.item.hidden;
									i.push(t.item);
									e(n.el).data("selected", i).change();
									e(n.helpers.multi).find("input").val("").width(20);
									n.refresh();
									if (e("#w2ui-overlay").length > 0) e("#w2ui-overlay")[0].hide();
									n.trigger(e.extend(s, {
										phase: "after"
									}))
								}
							} else {
								e(n.el).data("selected", t.item).val(t.item.text).change();
								if (n.helpers.focus) n.helpers.focus.find("input").val("")
							}
						}
					}))
				}
			}
		},
		inRange: function (t) {
			var n = false;
			if (this.type == "date") {
				var r = w2utils.isDate(t, this.options.format, true);
				if (r) {
					if (this.options.start || this.options.end) {
						var i = typeof this.options.start == "string" ? this.options.start : e(this.options.start).val();
						var s = typeof this.options.end == "string" ? this.options.end : e(this.options.end).val();
						var o = w2utils.isDate(i, this.options.format, true);
						var u = w2utils.isDate(s, this.options.format, true);
						var a = new Date(r);
						if (!o) o = a;
						if (!u) u = a;
						if (a >= o && a <= u) n = true
					} else {
						n = true
					}
					if (this.options.blocked && e.inArray(t, this.options.blocked) != -1) n = false
				}
			}
			if (this.type == "time") {
				if (this.options.start || this.options.end) {
					var f = this.toMin(t);
					var l = this.toMin(this.options.start);
					var c = this.toMin(this.options.end);
					if (!l) l = f;
					if (!c) c = f;
					if (f >= l && f <= c) n = true
				} else {
					n = true
				}
			}
			return n
		},
		checkType: function (e, t) {
			var n = this;
			switch (n.type) {
			case "int":
				if (t && ["-", n.options.groupSymbol].indexOf(e) != -1) return true;
				return w2utils.isInt(e.replace(n.options.numberRE, ""));
			case "percent":
				e = e.replace(/%/g, "");
			case "float":
				if (t && ["-", w2utils.settings.decimalSymbol, n.options.groupSymbol].indexOf(e) != -1) return true;
				return w2utils.isFloat(e.replace(n.options.numberRE, ""));
			case "money":
			case "currency":
				if (t && ["-", n.options.decimalSymbol, n.options.groupSymbol, n.options.currencyPrefix, n.options.currencySuffix].indexOf(e) != -1) return true;
				return w2utils.isFloat(e.replace(n.options.moneyRE, ""));
			case "hex":
			case "color":
				return w2utils.isHex(e);
			case "alphanumeric":
				return w2utils.isAlphaNumeric(e)
			}
			return true
		},
		addPrefix: function () {
			var t = this;
			setTimeout(function () {
				if (t.type === "clear") return;
				var n;
				var r = e(t.el).data("tmp") || {};
				if (r["old-padding-left"]) e(t.el).css("padding-left", r["old-padding-left"]);
				r["old-padding-left"] = e(t.el).css("padding-left");
				e(t.el).data("tmp", r);
				if (t.helpers.prefix) e(t.helpers.prefix).remove();
				if (t.options.prefix !== "") {
					e(t.el).before('<div class="w2ui-field-helper">' + t.options.prefix + "</div>");
					n = e(t.el).prev();
					n.css({
						color: e(t.el).css("color"),
						"font-family": e(t.el).css("font-family"),
						"font-size": e(t.el).css("font-size"),
						"padding-top": e(t.el).css("padding-top"),
						"padding-bottom": e(t.el).css("padding-bottom"),
						"padding-left": e(t.el).css("padding-left"),
						"padding-right": 0,
						"margin-top": parseInt(e(t.el).css("margin-top"), 10) + 2 + "px",
						"margin-bottom": parseInt(e(t.el).css("margin-bottom"), 10) + 1 + "px",
						"margin-left": e(t.el).css("margin-left"),
						"margin-right": 0
					}).on("click", function (n) {
						if (t.options.icon && typeof t.onIconClick == "function") {
							var r = t.trigger({
								phase: "before",
								type: "iconClick",
								target: t.el,
								el: e(this).find("span.w2ui-icon")[0]
							});
							if (r.isCancelled === true) return;
							t.trigger(e.extend(r, {
								phase: "after"
							}))
						} else {
							if (t.type == "list") {
								e(t.helpers.focus).find("input").focus()
							} else {
								e(t.el).focus()
							}
						}
					});
					e(t.el).css("padding-left", n.width() + parseInt(e(t.el).css("padding-left"), 10) + "px");
					t.helpers.prefix = n
				}
			}, 1)
		},
		addSuffix: function () {
			var t = this;
			var n, r;
			setTimeout(function () {
				if (t.type === "clear") return;
				var i = e(t.el).data("tmp") || {};
				if (i["old-padding-right"]) e(t.el).css("padding-right", i["old-padding-right"]);
				i["old-padding-right"] = e(t.el).css("padding-right");
				e(t.el).data("tmp", i);
				r = parseInt(e(t.el).css("padding-right"), 10);
				if (t.options.arrows) {
					if (t.helpers.arrows) e(t.helpers.arrows).remove();
					e(t.el).after('<div class="w2ui-field-helper" style="border: 1px solid transparent">&nbsp;' + '    <div class="w2ui-field-up" type="up">' + '        <div class="arrow-up" type="up"></div>' + "    </div>" + '    <div class="w2ui-field-down" type="down">' + '        <div class="arrow-down" type="down"></div>' + "    </div>" + "</div>");
					var s = w2utils.getSize(t.el, "height");
					n = e(t.el).next();
					n.css({
						color: e(t.el).css("color"),
						"font-family": e(t.el).css("font-family"),
						"font-size": e(t.el).css("font-size"),
						height: e(t.el).height() + parseInt(e(t.el).css("padding-top"), 10) + parseInt(e(t.el).css("padding-bottom"), 10) + "px",
						padding: 0,
						"margin-top": parseInt(e(t.el).css("margin-top"), 10) + 1 + "px",
						"margin-bottom": 0,
						"border-left": "1px solid silver"
					}).css("margin-left", "-" + (n.width() + parseInt(e(t.el).css("margin-right"), 10) + 12) + "px").on("mousedown", function (n) {
						function i() {
							clearTimeout(r.data("_field_update_timer"));
							r.off("mouseup", i)
						}
						function s(r) {
							e(t.el).focus();
							t.keyDown(e.Event("keydown"), {
								keyCode: e(n.target).attr("type") == "up" ? 38 : 40
							});
							if (r !== false) e("body").data("_field_update_timer", setTimeout(s, 60))
						}
						var r = e("body");
						r.on("mouseup", i);
						r.data("_field_update_timer", setTimeout(s, 700));
						s(false)
					});
					r += n.width() + 12;
					e(t.el).css("padding-right", r + "px");
					t.helpers.arrows = n
				}
				if (t.options.suffix !== "") {
					if (t.helpers.suffix) e(t.helpers.suffix).remove();
					e(t.el).after('<div class="w2ui-field-helper">' + t.options.suffix + "</div>");
					n = e(t.el).next();
					n.css({
						color: e(t.el).css("color"),
						"font-family": e(t.el).css("font-family"),
						"font-size": e(t.el).css("font-size"),
						"padding-top": e(t.el).css("padding-top"),
						"padding-bottom": e(t.el).css("padding-bottom"),
						"padding-left": "3px",
						"padding-right": e(t.el).css("padding-right"),
						"margin-top": parseInt(e(t.el).css("margin-top"), 10) + 2 + "px",
						"margin-bottom": parseInt(e(t.el).css("margin-bottom"), 10) + 1 + "px"
					}).on("click", function (n) {
						if (t.type == "list") {
							e(t.helpers.focus).find("input").focus()
						} else {
							e(t.el).focus()
						}
					});
					n.css("margin-left", "-" + (w2utils.getSize(n, "width") + parseInt(e(t.el).css("margin-right"), 10) + 2) + "px");
					r += n.width() + 3;
					e(t.el).css("padding-right", r + "px");
					t.helpers.suffix = n
				}
			}, 1)
		},
		addFocus: function () {
			var t = this;
			var n = this.options;
			var r = 0;
			var i;
			e(t.helpers.focus).remove();
			var s = '<div class="w2ui-field-helper">' + '    <div class="w2ui-icon icon-search" style="opacity: 0"></div>' + '    <input type="text" autocomplete="off">' + "<div>";
			e(t.el).attr("tabindex", -1).before(s);
			var o = e(t.el).prev();
			t.helpers.focus = o;
			o.css({
				width: e(t.el).width(),
				"margin-top": e(t.el).css("margin-top"),
				"margin-left": parseInt(e(t.el).css("margin-left")) + parseInt(e(t.el).css("padding-left")) + "px",
				"margin-bottom": e(t.el).css("margin-bottom"),
				"margin-right": e(t.el).css("margin-right")
			}).find("input").css({
				cursor: "default",
				width: "100%",
				outline: "none",
				opacity: 1,
				margin: 0,
				border: "1px solid transparent",
				padding: e(t.el).css("padding-top"),
				"padding-left": 0,
				"margin-left": r > 0 ? r + 6 : 0,
				"background-color": "transparent"
			});
			o.find("input").on("click", function (n) {
				if (e("#w2ui-overlay").length == 0) t.focus(n);
				n.stopPropagation()
			}).on("focus", function (n) {
				i = e(t.el).attr("placeholder");
				e(t.el).css({
					outline: "auto 5px #7DB4F3",
					"outline-offset": "-2px"
				});
				e(this).val("");
				e(t.el).triggerHandler("focus");
				if (n.stopPropagation) n.stopPropagation();
				else n.cancelBubble = true
			}).on("blur", function (n) {
				e(t.el).css("outline", "none");
				e(this).val("");
				t.refresh();
				e(t.el).triggerHandler("blur");
				if (n.stopPropagation) n.stopPropagation();
				else n.cancelBubble = true;
				if (i != null) e(t.el).attr("placeholder", i)
			}).on("keydown", function (n) {
				var r = this;
				t.keyDown(n);
				setTimeout(function () {
					if (r.value == "") e(t.el).attr("placeholder", i);
					else e(t.el).attr("placeholder", "")
				}, 10)
			}).on("keyup", function (e) {
				t.keyUp(e)
			}).on("keypress", function (e) {
				t.keyPress(e)
			});
			o.on("click", function (t) {
				e(this).find("input").focus()
			});
			t.refresh()
		},
		addMulti: function () {
			var t = this;
			var n = this.options;
			e(t.helpers.multi).remove();
			var r = "";
			var i = "margin-top     : 0px; " + "margin-bottom  : 0px; " + "margin-left    : " + e(t.el).css("margin-left") + "; " + "margin-right   : " + e(t.el).css("margin-right") + "; " + "width          : " + (w2utils.getSize(t.el, "width") - parseInt(e(t.el).css("margin-left"), 10) - parseInt(e(t.el).css("margin-right"), 10)) + "px;";
			if (t.type == "enum") {
				r = '<div class="w2ui-field-helper w2ui-list" style="' + i + '; box-sizing: border-box">' + '    <div style="padding: 0px; margin: 0px; display: inline-block" class="w2ui-multi-items">' + "    <ul>" + '        <li style="padding-left: 0px; padding-right: 0px" class="nomouse">' + '            <input type="text" style="width: 20px" autocomplete="off" ' + (e(t.el).attr("readonly") ? "readonly" : "") + ">" + "        </li>" + "    </ul>" + "    </div>" + "</div>"
			}
			if (t.type == "file") {
				r = '<div class="w2ui-field-helper w2ui-list" style="' + i + '; box-sizing: border-box">' + '   <div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px;">' + '       <input class="file-input" type="file" style="width: 100%; height: 100%; opacity: 0;" name="attachment" multiple tabindex="-1">' + "   </div>" + '    <div style="position: absolute; padding: 0px; margin: 0px; display: inline-block" class="w2ui-multi-items">' + '        <ul><li style="padding-left: 0px; padding-right: 0px" class="nomouse"></li></ul>' + "    </div>" + "</div>"
			}
			var s = e(t.el).data("tmp") || {};
			s["old-background-color"] = e(t.el).css("background-color");
			s["old-border-color"] = e(t.el).css("border-color");
			e(t.el).data("tmp", s);
			e(t.el).before(r).css({
				"background-color": "transparent",
				"border-color": "transparent"
			});
			var o = e(t.el).prev();
			t.helpers.multi = o;
			if (t.type == "enum") {
				e(t.el).attr("tabindex", -1);
				o.find("input").on("click", function (n) {
					if (e("#w2ui-overlay").length == 0) t.focus(n);
					e(t.el).triggerHandler("click")
				}).on("focus", function (n) {
					e(o).css({
						outline: "auto 5px #7DB4F3",
						"outline-offset": "-2px"
					});
					e(t.el).triggerHandler("focus");
					if (n.stopPropagation) n.stopPropagation();
					else n.cancelBubble = true
				}).on("blur", function (n) {
					e(o).css("outline", "none");
					e(t.el).triggerHandler("blur");
					if (n.stopPropagation) n.stopPropagation();
					else n.cancelBubble = true
				}).on("keyup", function (e) {
					t.keyUp(e)
				}).on("keydown", function (e) {
					t.keyDown(e)
				}).on("keypress", function (e) {
					o.find(".w2ui-enum-placeholder").remove();
					t.keyPress(e)
				});
				o.on("click", function (t) {
					e(this).find("input").focus()
				})
			}
			if (t.type == "file") {
				e(t.el).css("outline", "none");
				o.on("click", function (n) {
					e(t.el).focus();
					if (e(t.el).attr("readonly")) return;
					t.blur(n);
					t.resize();
					setTimeout(function () {
						o.find("input").click()
					}, 10)
				}).on("dragenter", function (n) {
					if (e(t.el).attr("readonly")) return;
					e(o).addClass("w2ui-file-dragover")
				}).on("dragleave", function (n) {
					if (e(t.el).attr("readonly")) return;
					var r = e(n.target).parents(".w2ui-field-helper");
					if (r.length == 0) e(o).removeClass("w2ui-file-dragover")
				}).on("drop", function (n) {
					if (e(t.el).attr("readonly")) return;
					e(o).removeClass("w2ui-file-dragover");
					var r = n.originalEvent.dataTransfer.files;
					for (var i = 0, s = r.length; i < s; i++) t.addFile.call(t, r[i]);
					n.preventDefault();
					n.stopPropagation()
				}).on("dragover", function (e) {
					e.preventDefault();
					e.stopPropagation()
				});
				o.find("input").on("click", function (e) {
					e.stopPropagation()
				}).on("change", function () {
					if (typeof this.files !== "undefined") {
						for (var e = 0, n = this.files.length; e < n; e++) {
							t.addFile.call(t, this.files[e])
						}
					}
				})
			}
			t.refresh()
		},
		addFile: function (t) {
			var n = this;
			var r = this.options;
			var i = e(n.el).data("selected");
			var s = {
				name: t.name,
				type: t.type,
				modified: t.lastModifiedDate,
				size: t.size,
				content: null,
				file: t
			};
			var o = 0;
			var u = 0;
			var a;
			for (var f in i) {
				if (i[f].name == t.name && i[f].size == t.size) return;
				o += i[f].size;
				u++
			}
			var l = n.trigger({
				phase: "before",
				type: "add",
				target: n.el,
				file: s,
				total: u,
				totalSize: o
			});
			if (l.isCancelled === true) return;
			if (r.maxFileSize !== 0 && s.size > r.maxFileSize) {
				a = "Maximum file size is " + w2utils.formatSize(r.maxFileSize);
				if (r.silent === false) e(n.el).w2tag(a);
				console.log("ERROR: " + a);
				return
			}
			if (r.maxSize !== 0 && o + s.size > r.maxSize) {
				a = "Maximum total size is " + w2utils.formatSize(r.maxSize);
				if (r.silent === false) e(n.el).w2tag(a);
				console.log("ERROR: " + a);
				return
			}
			if (r.max !== 0 && u >= r.max) {
				a = "Maximum number of files is " + r.max;
				if (r.silent === false) e(n.el).w2tag(a);
				console.log("ERROR: " + a);
				return
			}
			i.push(s);
			if (typeof FileReader !== "undefined") {
				var c = new FileReader;
				c.onload = function () {
					return function (t) {
						var r = t.target.result;
						var i = r.indexOf(",");
						s.content = r.substr(i + 1);
						n.refresh();
						e(n.el).trigger("change");
						n.trigger(e.extend(l, {
							phase: "after"
						}))
					}
				}();
				c.readAsDataURL(t)
			} else {
				n.refresh();
				e(n.el).trigger("change")
			}
		},
		normMenu: function (t) {
			if (e.isArray(t)) {
				for (var n = 0; n < t.length; n++) {
					if (typeof t[n] == "string") {
						t[n] = {
							id: t[n],
							text: t[n]
						}
					} else {
						if (typeof t[n].text != "undefined" && typeof t[n].id == "undefined") t[n].id = t[n].text;
						if (typeof t[n].text == "undefined" && typeof t[n].id != "undefined") t[n].text = t[n].id;
						if (typeof t[n].caption != "undefined") t[n].text = t[n].caption
					}
				}
				return t
			} else if (typeof t == "object") {
				var r = [];
				for (var n in t) r.push({
					id: n,
					text: t[n]
				});
				return r
			}
		},
		getColorHTML: function () {
			var t = '<div class="w2ui-color">' + '<table cellspacing="5">';
			for (var n = 0; n < 8; n++) {
				t += "<tr>";
				for (var r = 0; r < 8; r++) {
					t += "<td>" + '    <div class="color" style="background-color: #' + this.pallete[n][r] + ';" name="' + this.pallete[n][r] + '" index="' + n + ":" + r + '">' + "        " + (e(this.el).val() == this.pallete[n][r] ? "&#149;" : "&nbsp;") + "    </div>" + "</td>"
				}
				t += "</tr>";
				if (n < 2) t += '<tr><td style="height: 8px" colspan="8"></td></tr>'
			}
			t += "</table></div>";
			return t
		},
		getMonthHTML: function (e, t) {
			var n = new Date;
			var r = w2utils.settings.fullmonths;
			var i = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
			var s = n.getFullYear() + "/" + (Number(n.getMonth()) + 1) + "/" + n.getDate();
			var o = w2utils.settings.fulldays.slice();
			var u = w2utils.settings.shortdays.slice();
			if (w2utils.settings.weekStarts != "M") {
				o.unshift(o.pop());
				u.unshift(u.pop())
			}
			t = w2utils.isInt(t) ? parseInt(t) : n.getFullYear();
			e = w2utils.isInt(e) ? parseInt(e) : n.getMonth() + 1;
			if (e > 12) {
				e -= 12;
				t++
			}
			if (e < 1 || e === 0) {
				e += 12;
				t--
			}
			if (t / 4 == Math.floor(t / 4)) {
				i[1] = "29"
			} else {
				i[1] = "28"
			}
			this.options.current = e + "/" + t;
			n = new Date(t, e - 1, 1);
			var a = n.getDay();
			var f = "";
			for (var l = 0; l < u.length; l++) f += '<td title="' + o[l] + '">' + u[l] + "</td>";
			var c = '<div class="w2ui-calendar-title title">' + '    <div class="w2ui-calendar-previous previous"> <div></div> </div>' + '    <div class="w2ui-calendar-next next"> <div></div> </div> ' + r[e - 1] + ", " + t + "</div>" + '<table class="w2ui-calendar-days" cellspacing="0">' + '    <tr class="w2ui-day-title">' + f + "</tr>" + "    <tr>";
			var h = 1;
			if (w2utils.settings.weekStarts != "M") a++;
			for (var p = 1; p < 43; p++) {
				if (a === 0 && p == 1) {
					for (var d = 0; d < 6; d++) c += '<td class="w2ui-day-empty">&nbsp;</td>';
					p += 6
				} else {
					if (p < a || h > i[e - 1]) {
						c += '<td class="w2ui-day-empty">&nbsp;</td>';
						if (p % 7 === 0) c += "</tr><tr>";
						continue
					}
				}
				var v = t + "/" + e + "/" + h;
				var m = new Date(v);
				var g = "";
				if (m.getDay() == 6) g = " w2ui-saturday";
				if (m.getDay() == 0) g = " w2ui-sunday";
				if (v == s) g += " w2ui-today";
				var y = h;
				var b = "";
				var w = "";
				var E = w2utils.formatDate(v, this.options.format);
				if (this.options.colored && this.options.colored[E] !== undefined) {
					var S = this.options.colored[E].split(":");
					w = "background-color: " + S[0] + ";";
					b = "color: " + S[1] + ";"
				}
				c += '<td class="' + (this.inRange(E) ? "w2ui-date " : "w2ui-blocked") + g + '" style="' + b + w + '" date="' + E + '">' + y + "</td>";
				if (p % 7 === 0 || a === 0 && p == 1) c += "</tr><tr>";
				h++
			}
			c += "</tr></table>";
			return c
		},
		getYearHTML: function () {
			var e = w2utils.settings.shortmonths;
			var t = "";
			var n = "";
			for (var r = 0; r < e.length; r++) {
				t += '<div class="w2ui-jump-month" name="' + r + '">' + e[r] + "</div>"
			}
			for (var i = 1950; i <= 2020; i++) {
				n += '<div class="w2ui-jump-year" name="' + i + '">' + i + "</div>"
			}
			return "<div>" + t + "</div><div>" + n + "</div>"
		},
		getHourHTML: function () {
			var e = [];
			var t = this.options.format == "h24";
			for (var n = 0; n < 24; n++) {
				var r = (n >= 12 && !t ? n - 12 : n) + ":00" + (!t ? n < 12 ? " am" : " pm" : "");
				if (n == 12 && !t) r = "12:00 pm";
				if (!e[Math.floor(n / 8)]) e[Math.floor(n / 8)] = "";
				var i = this.fromMin(this.toMin(r));
				var s = this.fromMin(this.toMin(r) + 59);
				e[Math.floor(n / 8)] += '<div class="' + (this.inRange(i) || this.inRange(s) ? "w2ui-time " : "w2ui-blocked") + '" hour="' + n + '">' + r + "</div>"
			}
			var o = '<div class="w2ui-calendar-time"><table><tr>' + "    <td>" + e[0] + "</td>" + "    <td>" + e[1] + "</td>" + "    <td>" + e[2] + "</td>" + "</tr></table></div>";
			return o
		},
		getMinHTML: function (e) {
			if (typeof e == "undefined") e = 0;
			var t = this.options.format == "h24";
			var n = [];
			for (var r = 0; r < 60; r += 5) {
				var i = (e > 12 && !t ? e - 12 : e) + ":" + (r < 10 ? 0 : "") + r + " " + (!t ? e < 12 ? "am" : "pm" : "");
				var s = r < 20 ? 0 : r < 40 ? 1 : 2;
				if (!n[s]) n[s] = "";
				n[s] += '<div class="' + (this.inRange(i) ? "w2ui-time " : "w2ui-blocked") + '" min="' + r + '">' + i + "</div>"
			}
			var o = '<div class="w2ui-calendar-time"><table><tr>' + "    <td>" + n[0] + "</td>" + "    <td>" + n[1] + "</td>" + "    <td>" + n[2] + "</td>" + "</tr></table></div>";
			return o
		},
		toMin: function (e) {
			if (typeof e != "string") return null;
			var t = e.split(":");
			if (t.length == 2) {
				t[0] = parseInt(t[0]);
				t[1] = parseInt(t[1]);
				if (e.indexOf("pm") != -1 && t[0] != 12) t[0] += 12
			} else {
				return null
			}
			return t[0] * 60 + t[1]
		},
		fromMin: function (e) {
			var t = "";
			if (e >= 24 * 60) e = e % (24 * 60);
			if (e < 0) e = 24 * 60 + e;
			var n = Math.floor(e / 60);
			var r = (e % 60 < 10 ? "0" : "") + e % 60;
			if (this.options.format.indexOf("h24") != -1) {
				t = n + ":" + r
			} else {
				t = (n <= 12 ? n : n - 12) + ":" + r + " " + (n >= 12 ? "pm" : "am")
			}
			return t
		}
	};
	e.extend(t.prototype, w2utils.event);
	w2obj.field = t
})(jQuery);
(function () {
	var w2form = function (e) {
		this.name = null;
		this.header = "";
		this.box = null;
		this.url = "";
		this.routeData = {};
		this.formURL = "";
		this.formHTML = "";
		this.page = 0;
		this.recid = 0;
		this.fields = [];
		this.actions = {};
		this.record = {};
		this.original = {};
		this.postData = {};
		this.toolbar = {};
		this.tabs = {};
		this.style = "";
		this.focus = 0;
		this.msgNotJSON = w2utils.lang("Return data is not in JSON format.");
		this.msgAJAXerror = w2utils.lang("AJAX error. See console for more details.");
		this.msgRefresh = w2utils.lang("Refreshing...");
		this.msgSaving = w2utils.lang("Saving...");
		this.onRequest = null;
		this.onLoad = null;
		this.onValidate = null;
		this.onSubmit = null;
		this.onProgress = null;
		this.onSave = null;
		this.onChange = null;
		this.onRender = null;
		this.onRefresh = null;
		this.onResize = null;
		this.onDestroy = null;
		this.onAction = null;
		this.onToolbar = null;
		this.onError = null;
		this.isGenerated = false;
		this.last = {
			xhr: null
		};
		$.extend(true, this, w2obj.form, e)
	};
	$.fn.w2form = function (e) {
		if ($.isPlainObject(e)) {
			var t = this;
			if (!w2utils.checkName(e, "w2form")) return;
			var n = e.record;
			var r = e.original;
			var i = e.fields;
			var s = e.toolbar;
			var o = e.tabs;
			var u = new w2form(e);
			$.extend(u, {
				record: {},
				original: {},
				fields: [],
				tabs: {},
				toolbar: {},
				handlers: []
			});
			if ($.isArray(o)) {
				$.extend(true, u.tabs, {
					tabs: []
				});
				for (var a = 0; a < o.length; a++) {
					var f = o[a];
					if (typeof f === "object") u.tabs.tabs.push(f);
					else u.tabs.tabs.push({
						id: f,
						caption: f
					})
				}
			} else {
				$.extend(true, u.tabs, o)
			}
			$.extend(true, u.toolbar, s);
			if (i) for (var l = 0; l < i.length; l++) {
				var c = $.extend(true, {}, i[l]);
				if (typeof c.name == "undefined" && typeof c.field != "undefined") c.name = c.field;
				if (typeof c.field == "undefined" && typeof c.name != "undefined") c.field = c.name;
				u.fields[l] = c
			}
			for (var l in n) {
				if ($.isPlainObject(n[l])) {
					u.record[l] = $.extend(true, {}, n[l])
				} else {
					u.record[l] = n[l]
				}
			}
			for (var l in r) {
				if ($.isPlainObject(r[l])) {
					u.original[l] = $.extend(true, {}, r[l])
				} else {
					u.original[l] = r[l]
				}
			}
			if (t.length > 0) u.box = t[0];
			if (u.formURL != "") {
				$.get(u.formURL, function (e) {
					u.formHTML = e;
					u.isGenerated = true;
					if ($(u.box).length != 0 || e.length != 0) {
						$(u.box).html(e);
						u.render(u.box)
					}
				})
			} else if (u.formHTML != "") {} else if ($(this).length != 0 && $.trim($(this).html()) != "") {
				u.formHTML = $(this).html()
			} else {
				u.formHTML = u.generateHTML()
			}
			w2ui[u.name] = u;
			if (u.formURL == "") {
				if (String(u.formHTML).indexOf("w2ui-page") == -1) {
					u.formHTML = '<div class="w2ui-page page-0">' + u.formHTML + "</div>"
				}
				$(u.box).html(u.formHTML);
				u.isGenerated = true;
				u.render(u.box)
			}
			return u
		} else {
			var t = w2ui[$(this).attr("name")];
			if (!t) return null;
			if (arguments.length > 0) {
				if (t[e]) t[e].apply(t, Array.prototype.slice.call(arguments, 1));
				return this
			} else {
				return t
			}
		}
	};
	w2form.prototype = {
		get: function (e, t) {
			if (arguments.length === 0) {
				var n = [];
				for (var r = 0; r < this.fields.length; r++) {
					if (this.fields[r].name != null) n.push(this.fields[r].name)
				}
				return n
			} else {
				for (var i = 0; i < this.fields.length; i++) {
					if (this.fields[i].name == e) {
						if (t === true) return i;
						else return this.fields[i]
					}
				}
				return null
			}
		},
		set: function (e, t) {
			for (var n = 0; n < this.fields.length; n++) {
				if (this.fields[n].name == e) {
					$.extend(this.fields[n], t);
					this.refresh();
					return true
				}
			}
			return false
		},
		show: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n && n.hidden) {
					n.hidden = false;
					e++
				}
			}
			if (e > 0) this.refresh();
			return e
		},
		hide: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n && !n.hidden) {
					n.hidden = true;
					e++
				}
			}
			if (e > 0) this.refresh();
			return e
		},
		enable: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n && n.disabled) {
					n.disabled = false;
					e++
				}
			}
			if (e > 0) this.refresh();
			return e
		},
		disable: function () {
			var e = 0;
			for (var t = 0; t < arguments.length; t++) {
				var n = this.get(arguments[t]);
				if (n && !n.disabled) {
					n.disabled = true;
					e++
				}
			}
			if (e > 0) this.refresh();
			return e
		},
		reload: function (e) {
			var t = typeof this.url != "object" ? this.url : this.url.get;
			if (t && this.recid != 0 && this.recid != null) {
				this.request(e)
			} else {
				if (typeof e == "function") e()
			}
		},
		clear: function () {
			this.recid = 0;
			this.record = {};
			$().w2tag();
			this.refresh()
		},
		error: function (e) {
			var t = this;
			var n = this.trigger({
				target: this.name,
				type: "error",
				message: e,
				xhr: this.last.xhr
			});
			if (n.isCancelled === true) {
				if (typeof callBack == "function") callBack();
				return
			}
			setTimeout(function () {
				w2alert(e, "Error")
			}, 1);
			this.trigger($.extend(n, {
				phase: "after"
			}))
		},
		validate: function (e) {
			if (typeof e == "undefined") e = true;
			$().w2tag();
			var t = [];
			for (var n = 0; n < this.fields.length; n++) {
				var r = this.fields[n];
				if (this.record[r.name] == null) this.record[r.name] = "";
				switch (r.type) {
				case "int":
					if (this.record[r.name] && !w2utils.isInt(this.record[r.name])) {
						t.push({
							field: r,
							error: w2utils.lang("Not an integer")
						})
					}
					break;
				case "float":
					if (this.record[r.name] && !w2utils.isFloat(this.record[r.name])) {
						t.push({
							field: r,
							error: w2utils.lang("Not a float")
						})
					}
					break;
				case "money":
					if (this.record[r.name] && !w2utils.isMoney(this.record[r.name])) {
						t.push({
							field: r,
							error: w2utils.lang("Not in money format")
						})
					}
					break;
				case "color":
				case "hex":
					if (this.record[r.name] && !w2utils.isHex(this.record[r.name])) {
						t.push({
							field: r,
							error: w2utils.lang("Not a hex number")
						})
					}
					break;
				case "email":
					if (this.record[r.name] && !w2utils.isEmail(this.record[r.name])) {
						t.push({
							field: r,
							error: w2utils.lang("Not a valid email")
						})
					}
					break;
				case "checkbox":
					if (this.record[r.name] == true) this.record[r.name] = 1;
					else this.record[r.name] = 0;
					break;
				case "date":
					if (!r.options.format) r.options.format = w2utils.settings.date_format;
					if (this.record[r.name] && !w2utils.isDate(this.record[r.name], r.options.format)) {
						t.push({
							field: r,
							error: w2utils.lang("Not a valid date") + ": " + r.options.format
						})
					} else {}
					break;
				case "list":
				case "combo":
					break;
				case "enum":
					break
				}
				var i = this.record[r.name];
				if (r.required && (i === "" || $.isArray(i) && i.length == 0 || $.isPlainObject(i) && $.isEmptyObject(i))) {
					t.push({
						field: r,
						error: w2utils.lang("Required field")
					})
				}
				if (r.equalto && this.record[r.name] != this.record[r.equalto]) {
					t.push({
						field: r,
						error: w2utils.lang("Field should be equal to ") + r.equalto
					})
				}
			}
			var s = this.trigger({
				phase: "before",
				target: this.name,
				type: "validate",
				errors: t
			});
			if (s.isCancelled === true) return;
			if (e) for (var o in s.errors) {
				var u = s.errors[o];
				if (u.field.type == "radio") {
					$($(u.field.el).parents("div")[0]).w2tag(u.error, {
						"class": "w2ui-error"
					})
				} else if (["enum", "file"].indexOf(u.field.type) != -1) {
					(function (e) {
						setTimeout(function () {
							var t = $(e.field.el).data("w2field").helpers.multi;
							$(e.field.el).w2tag(e.error);
							$(t).addClass("w2ui-error")
						}, 1)
					})(u)
				} else {
					$(u.field.el).w2tag(u.error, {
						"class": "w2ui-error"
					})
				}
				this.goto(t[0].field.page)
			}
			this.trigger($.extend(s, {
				phase: "after"
			}));
			return t
		},
		getChanges: function () {
			var e = function (t, n, r) {
				for (var i in t) {
					if (typeof t[i] == "object") {
						r[i] = e(t[i], n[i] || {}, {});
						if (!r[i] || $.isEmptyObject(r[i])) delete r[i]
					} else if (t[i] != n[i]) {
						r[i] = t[i]
					}
				}
				return r
			};
			return e(this.record, this.original, {})
		},
		request: function (postData, callBack) {
			var obj = this;
			if (typeof postData == "function") {
				callBack = postData;
				postData = null
			}
			if (typeof postData == "undefined" || postData == null) postData = {};
			if (!this.url || typeof this.url == "object" && !this.url.get) return;
			if (this.recid == null || typeof this.recid == "undefined") this.recid = 0;
			var params = {};
			params["cmd"] = "get-record";
			params["recid"] = this.recid;
			$.extend(params, this.postData);
			$.extend(params, postData);
			var eventData = this.trigger({
				phase: "before",
				type: "request",
				target: this.name,
				url: this.url,
				postData: params
			});
			if (eventData.isCancelled === true) {
				if (typeof callBack == "function") callBack({
					status: "error",
					message: "Request aborted."
				});
				return
			}
			this.record = {};
			this.original = {};
			this.lock(this.msgRefresh);
			var url = eventData.url;
			if (typeof eventData.url == "object" && eventData.url.get) url = eventData.url.get;
			if (this.last.xhr) try {
				this.last.xhr.abort()
			} catch (e) {}
			if (!$.isEmptyObject(obj.routeData)) {
				var info = w2utils.parseRoute(url);
				if (info.keys.length > 0) {
					for (var k = 0; k < info.keys.length; k++) {
						if (obj.routeData[info.keys[k].name] == null) continue;
						url = url.replace(new RegExp(":" + info.keys[k].name, "g"), obj.routeData[info.keys[k].name])
					}
				}
			}
			var ajaxOptions = {
				type: "POST",
				url: url,
				data: eventData.postData,
				dataType: "text"
			};
			if (w2utils.settings.dataType == "HTTP") {
				ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]")
			}
			if (w2utils.settings.dataType == "RESTFULL") {
				ajaxOptions.type = "GET";
				ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]")
			}
			if (w2utils.settings.dataType == "JSON") {
				ajaxOptions.type = "POST";
				ajaxOptions.data = JSON.stringify(ajaxOptions.data);
				ajaxOptions.contentType = "application/json"
			}
			this.last.xhr = $.ajax(ajaxOptions).done(function (data, status, xhr) {
				obj.unlock();
				var eventData = obj.trigger({
					phase: "before",
					target: obj.name,
					type: "load",
					xhr: xhr
				});
				if (eventData.isCancelled === true) {
					if (typeof callBack == "function") callBack({
						status: "error",
						message: "Request aborted."
					});
					return
				}
				var data;
				var responseText = obj.last.xhr.responseText;
				if (status != "error") {
					if (typeof responseText != "undefined" && responseText != "") {
						if (typeof responseText == "object") {
							data = responseText
						} else {
							try {
								eval("data = " + responseText)
							} catch (e) {}
						}
						if (typeof data == "undefined") {
							data = {
								status: "error",
								message: obj.msgNotJSON,
								responseText: responseText
							}
						}
						if (data["status"] == "error") {
							obj.error(data["message"])
						} else {
							obj.record = $.extend({}, data.record);
							obj.original = $.extend({}, data.record)
						}
					}
				} else {
					obj.error("AJAX Error " + xhr.status + ": " + xhr.statusText);
					data = {
						status: "error",
						message: obj.msgAJAXerror,
						responseText: responseText
					}
				}
				obj.trigger($.extend(eventData, {
					phase: "after"
				}));
				obj.refresh();
				if (typeof callBack == "function") callBack(data)
			}).fail(function (e, t, n) {
				var r = {
					status: t,
					error: n,
					rawResponseText: e.responseText
				};
				var i = obj.trigger({
					phase: "before",
					type: "error",
					error: r,
					xhr: e
				});
				if (i.isCancelled === true) return;
				if (t != "abort") {
					var s;
					try {
						s = $.parseJSON(e.responseText)
					} catch (o) {}
					console.log("ERROR: Server communication failed.", "\n   EXPECTED:", {
						status: "success",
						items: [{
							id: 1,
							text: "item"
						}]
					}, "\n         OR:", {
						status: "error",
						message: "error message"
					}, "\n   RECEIVED:", typeof s == "object" ? s : e.responseText)
				}
				obj.trigger($.extend(i, {
					phase: "after"
				}))
			});
			this.trigger($.extend(eventData, {
				phase: "after"
			}))
		},
		submit: function (e, t) {
			return this.save(e, t)
		},
		save: function (postData, callBack) {
			var obj = this;
			$(this.box).find(":focus").change();
			if (typeof postData == "function") {
				callBack = postData;
				postData = null
			}
			var errors = obj.validate(true);
			if (errors.length !== 0) return;
			if (typeof postData == "undefined" || postData == null) postData = {};
			if (!obj.url || typeof obj.url == "object" && !obj.url.save) {
				console.log("ERROR: Form cannot be saved because no url is defined.");
				return
			}
			obj.lock(obj.msgSaving + ' <span id="' + obj.name + '_progress"></span>');
			setTimeout(function () {
				var params = {};
				params["cmd"] = "save-record";
				params["recid"] = obj.recid;
				$.extend(params, obj.postData);
				$.extend(params, postData);
				params.record = $.extend(true, {}, obj.record);
				var eventData = obj.trigger({
					phase: "before",
					type: "submit",
					target: obj.name,
					url: obj.url,
					postData: params
				});
				if (eventData.isCancelled === true) return;
				var url = eventData.url;
				if (typeof eventData.url == "object" && eventData.url.save) url = eventData.url.save;
				if (obj.last.xhr) try {
					obj.last.xhr.abort()
				} catch (e) {}
				if (!$.isEmptyObject(obj.routeData)) {
					var info = w2utils.parseRoute(url);
					if (info.keys.length > 0) {
						for (var k = 0; k < info.keys.length; k++) {
							if (obj.routeData[info.keys[k].name] == null) continue;
							url = url.replace(new RegExp(":" + info.keys[k].name, "g"), obj.routeData[info.keys[k].name])
						}
					}
				}
				var ajaxOptions = {
					type: "POST",
					url: url,
					data: eventData.postData,
					dataType: "text",
					xhr: function () {
						var e = new window.XMLHttpRequest;
						e.upload.addEventListener("progress", function (e) {
							if (e.lengthComputable) {
								var t = obj.trigger({
									phase: "before",
									type: "progress",
									total: e.total,
									loaded: e.loaded,
									originalEvent: e
								});
								if (t.isCancelled === true) return;
								var n = Math.round(e.loaded / e.total * 100);
								$("#" + obj.name + "_progress").text("" + n + "%");
								obj.trigger($.extend(t, {
									phase: "after"
								}))
							}
						}, false);
						return e
					}
				};
				if (w2utils.settings.dataType == "HTTP") {
					ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]")
				}
				if (w2utils.settings.dataType == "RESTFULL") {
					if (obj.recid != 0 && obj.recid != null) ajaxOptions.type = "PUT";
					ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, "[").replace(/%5D/g, "]")
				}
				if (w2utils.settings.dataType == "JSON") {
					ajaxOptions.type = "POST";
					ajaxOptions.data = JSON.stringify(ajaxOptions.data);
					ajaxOptions.contentType = "application/json"
				}
				obj.last.xhr = $.ajax(ajaxOptions).done(function (data, status, xhr) {
					obj.unlock();
					var eventData = obj.trigger({
						phase: "before",
						target: obj.name,
						type: "save",
						xhr: xhr,
						status: status
					});
					if (eventData.isCancelled === true) return;
					var data;
					var responseText = xhr.responseText;
					if (status != "error") {
						if (typeof responseText != "undefined" && responseText != "") {
							if (typeof responseText == "object") {
								data = responseText
							} else {
								try {
									eval("data = " + responseText)
								} catch (e) {}
							}
							if (typeof data == "undefined") {
								data = {
									status: "error",
									message: obj.msgNotJSON,
									responseText: responseText
								}
							}
							if (data["status"] == "error") {
								obj.error(data["message"])
							} else {
								obj.original = $.extend({}, obj.record)
							}
						}
					} else {
						obj.error("AJAX Error " + xhr.status + ": " + xhr.statusText);
						data = {
							status: "error",
							message: obj.msgAJAXerror,
							responseText: responseText
						}
					}
					obj.trigger($.extend(eventData, {
						phase: "after"
					}));
					obj.refresh();
					if (data.status == "success" && typeof callBack == "function") callBack(data)
				}).fail(function (e, t, n) {
					var r = {
						status: t,
						error: n,
						rawResponseText: e.responseText
					};
					var i = obj.trigger({
						phase: "before",
						type: "error",
						error: r,
						xhr: e
					});
					if (i.isCancelled === true) return;
					console.log("ERROR: server communication failed. The server should return", {
						status: "success"
					}, "OR", {
						status: "error",
						message: "error message"
					}, ", instead the AJAX request produced this: ", r);
					obj.trigger($.extend(i, {
						phase: "after"
					}))
				});
				obj.trigger($.extend(eventData, {
					phase: "after"
				}))
			}, 50)
		},
		lock: function (e, t) {
			var n = $(this.box).find("> div:first-child");
			var r = Array.prototype.slice.call(arguments, 0);
			r.unshift(n);
			w2utils.lock.apply(window, r)
		},
		unlock: function (e) {
			var t = this;
			setTimeout(function () {
				w2utils.unlock(t.box, e)
			}, 25)
		},
		"goto": function (e) {
			if (typeof e != "undefined") this.page = e;
			if ($(this.box).data("auto-size") === true) $(this.box).height(0);
			this.refresh()
		},
		generateHTML: function () {
			var e = [];
			var t = "";
			var n;
			for (var r = 0; r < this.fields.length; r++) {
				var i = "";
				var s = this.fields[r];
				if (typeof s.html == "undefined") s.html = {};
				s.html = $.extend(true, {
					caption: "",
					span: 6,
					attr: "",
					text: "",
					style: "",
					page: 0
				}, s.html);
				if (typeof n == "undefined") n = s.html.page;
				if (s.html.caption == "") s.html.caption = s.name;
				var o = '<input name="' + s.name + '" type="text" ' + s.html.attr + "/>";
				if (s.type === "pass" || s.type === "password") {
					o = '<input name="' + s.name + '" type = "password" ' + s.html.attr + "/>"
				}
				if (s.type == "checkbox") o = '<input name="' + s.name + '" type="checkbox" ' + s.html.attr + "/>";
				if (s.type == "textarea") o = '<textarea name="' + s.name + '" ' + s.html.attr + "></textarea>";
				if (s.type == "toggle") o = '<input name="' + s.name + '" type="checkbox" ' + s.html.attr + ' class="w2ui-toggle"/><div><div></div></div>';
				if (s.html.group) {
					if (t != "") i += "\n   </div>";
					i += '\n   <div class="w2ui-group-title">' + s.html.group + '</div>\n   <div class="w2ui-group">';
					t = s.html.group
				}
				if (s.html.page != n && t != "") {
					e[e.length - 1] += "\n   </div>";
					t = ""
				}
				i += '\n      <div class="w2ui-field ' + (typeof s.html.span != "undefined" ? "w2ui-span" + s.html.span : "") + '" style="' + s.html.style + '">' + "\n         <label>" + w2utils.lang(s.html.caption) + "</label>" + "\n         <div>" + o + w2utils.lang(s.html.text) + "</div>" + "\n      </div>";
				if (typeof e[s.html.page] == "undefined") e[s.html.page] = "";
				e[s.html.page] += i;
				n = s.html.page
			}
			if (t != "") e[e.length - 1] += "\n   </div>";
			if (this.tabs.tabs) {
				for (var u = 0; u < this.tabs.tabs.length; u++) if (typeof e[u] == "undefined") e[u] = ""
			}
			for (var a = 0; a < e.length; a++) e[a] = '<div class="w2ui-page page-' + a + '">' + e[a] + "\n</div>";
			var f = "";
			if (!$.isEmptyObject(this.actions)) {
				var l = "";
				f += '\n<div class="w2ui-buttons">';
				for (var c in this.actions) {
					var h = this.actions[c];
					var p = {
						caption: "",
						style: "",
						"class": ""
					};
					if ($.isPlainObject(h)) {
						if (h.caption) p.caption = h.caption;
						if (h.style) p.style = h.style;
						if (h["class"]) p["class"] = h["class"]
					} else {
						p.caption = c;
						if (["save", "update", "create"].indexOf(c.toLowerCase()) != -1) p["class"] = "w2ui-btn-green";
						else p["class"] = ""
					}
					f += '\n    <button name="' + c + '" class="w2ui-btn ' + p["class"] + '" style="' + p.style + '">' + w2utils.lang(p.caption) + "</button>"
				}
				f += "\n</div>"
			}
			return e.join("") + f
		},
		action: function (e, t) {
			var n = null;
			var r = this.actions[e];
			var n = r;
			if ($.isPlainObject(r) && r.onClick) n = r.onClick;
			var i = this.trigger({
				phase: "before",
				target: e,
				type: "action",
				click: n,
				originalEvent: t
			});
			if (i.isCancelled === true) return;
			if (typeof n == "function") n.call(this, t);
			this.trigger($.extend(i, {
				phase: "after"
			}))
		},
		resize: function () {
			function l() {
				n.width($(e.box).width()).height($(e.box).height());
				i.css("top", e.header != "" ? w2utils.getSize(r, "height") : 0);
				s.css("top", (e.header != "" ? w2utils.getSize(r, "height") : 0) + (typeof e.toolbar == "object" && $.isArray(e.toolbar.items) && e.toolbar.items.length > 0 ? w2utils.getSize(i, "height") : 0));
				o.css("top", (e.header != "" ? w2utils.getSize(r, "height") : 0) + (typeof e.toolbar == "object" && $.isArray(e.toolbar.items) && e.toolbar.items.length > 0 ? w2utils.getSize(i, "height") + 5 : 0) + (typeof e.tabs === "object" && $.isArray(e.tabs.tabs) && e.tabs.tabs.length > 0 ? w2utils.getSize(s, "height") + 5 : 0));
				o.css("bottom", f.length > 0 ? w2utils.getSize(f, "height") : 0)
			}
			var e = this;
			var t = this.trigger({
				phase: "before",
				target: this.name,
				type: "resize"
			});
			if (t.isCancelled === true) return;
			var n = $(this.box).find("> div");
			var r = $(this.box).find("> div .w2ui-form-header");
			var i = $(this.box).find("> div .w2ui-form-toolbar");
			var s = $(this.box).find("> div .w2ui-form-tabs");
			var o = $(this.box).find("> div .w2ui-page");
			var u = $(this.box).find("> div .w2ui-page.page-" + this.page);
			var a = $(this.box).find("> div .w2ui-page.page-" + this.page + " > div");
			var f = $(this.box).find("> div .w2ui-buttons");
			l();
			if (parseInt($(this.box).height()) == 0 || $(this.box).data("auto-size") === true) {
				$(this.box).height((r.length > 0 ? w2utils.getSize(r, "height") : 0) + (typeof this.tabs === "object" && $.isArray(this.tabs.tabs) && this.tabs.tabs.length > 0 ? w2utils.getSize(s, "height") : 0) + (typeof this.toolbar == "object" && $.isArray(this.toolbar.items) && this.toolbar.items.length > 0 ? w2utils.getSize(i, "height") : 0) + (o.length > 0 ? w2utils.getSize(a, "height") + w2utils.getSize(u, "+height") + 12 : 0) + (f.length > 0 ? w2utils.getSize(f, "height") : 0));
				$(this.box).data("auto-size", true)
			}
			l();
			e.trigger($.extend(t, {
				phase: "after"
			}))
		},
		refresh: function () {
			var e = (new Date).getTime();
			var t = this;
			if (!this.box) return;
			if (!this.isGenerated || typeof $(this.box).html() == "undefined") return;
			$(this.box).find("input, textarea, select").each(function (e, n) {
				var r = typeof $(n).attr("name") != "undefined" ? $(n).attr("name") : $(n).attr("id");
				var i = t.get(r);
				if (i) {
					var s = $(n).parents(".w2ui-page");
					if (s.length > 0) {
						for (var o = 0; o < 100; o++) {
							if (s.hasClass("page-" + o)) {
								i.page = o;
								break
							}
						}
					}
				}
			});
			var n = this.trigger({
				phase: "before",
				target: this.name,
				type: "refresh",
				page: this.page
			});
			if (n.isCancelled === true) return;
			$(this.box).find(".w2ui-page").hide();
			$(this.box).find(".w2ui-page.page-" + this.page).show();
			$(this.box).find(".w2ui-form-header").html(this.header);
			if (typeof this.tabs === "object" && $.isArray(this.tabs.tabs) && this.tabs.tabs.length > 0) {
				$("#form_" + this.name + "_tabs").show();
				this.tabs.active = this.tabs.tabs[this.page].id;
				this.tabs.refresh()
			} else {
				$("#form_" + this.name + "_tabs").hide()
			}
			if (typeof this.toolbar == "object" && $.isArray(this.toolbar.items) && this.toolbar.items.length > 0) {
				$("#form_" + this.name + "_toolbar").show();
				this.toolbar.refresh()
			} else {
				$("#form_" + this.name + "_toolbar").hide()
			}
			for (var r = 0; r < this.fields.length; r++) {
				var i = this.fields[r];
				if (typeof i.name == "undefined" && typeof i.field != "undefined") i.name = i.field;
				if (typeof i.field == "undefined" && typeof i.name != "undefined") i.field = i.name;
				i.$el = $(this.box).find('[name="' + String(i.name).replace(/\\/g, "\\\\") + '"]');
				i.el = i.$el[0];
				if (typeof i.el == "undefined") {
					console.log('ERROR: Cannot associate field "' + i.name + '" with html control. Make sure html control exists with the same name.')
				}
				if (i.el) i.el.id = i.name;
				var s = $(i).data("w2field");
				if (s) s.clear();
				$(i.$el).off("change").on("change", function () {
					var e = this.value;
					var n = t.record[this.name] ? t.record[this.name] : "";
					var r = t.get(this.name);
					if (["list", "enum", "file"].indexOf(r.type) != -1 && $(this).data("selected")) {
						var i = $(this).data("selected");
						var s = t.record[this.name];
						if ($.isArray(i)) {
							e = [];
							for (var o = 0; o < i.length; o++) e[o] = $.extend(true, {}, i[o])
						}
						if ($.isPlainObject(i)) {
							e = $.extend(true, {}, i)
						}
						if ($.isArray(s)) {
							n = [];
							for (var o = 0; o < s.length; o++) n[o] = $.extend(true, {}, s[o])
						}
						if ($.isPlainObject(s)) {
							n = $.extend(true, {}, s)
						}
					}
					if (r.type == "toggle") e = $(this).prop("checked") ? 1 : 0;
					if (["int", "float", "percent", "money", "currency"].indexOf(r.type) != -1) {
						e = $(this).data("w2field").clean(e)
					}
					if (e === n) return;
					var u = t.trigger({
						phase: "before",
						target: this.name,
						type: "change",
						value_new: e,
						value_previous: n
					});
					if (u.isCancelled === true) {
						$(this).val(t.record[this.name]);
						return
					}
					var a = this.value;
					if (this.type == "select") a = this.value;
					if (this.type == "checkbox") a = this.checked ? true : false;
					if (this.type == "radio") {
						r.$el.each(function (e, t) {
							if (t.checked) a = t.value
						})
					}
					if (["int", "float", "percent", "money", "currency", "list", "combo", "enum", "file", "toggle"].indexOf(r.type) != -1) {
						a = e
					}
					if (["enum", "file"].indexOf(r.type) != -1) {
						if (a.length > 0) {
							var f = $(r.el).data("w2field").helpers.multi;
							$(f).removeClass("w2ui-error")
						}
					}
					if (a == "" || $.isArray(a) && a.length == 0 || $.isPlainObject(a) && $.isEmptyObject(a)) a = null;
					t.record[this.name] = a;
					t.trigger($.extend(u, {
						phase: "after"
					}))
				});
				if (i.required) {
					$(i.el).parent().parent().addClass("w2ui-required")
				} else {
					$(i.el).parent().parent().removeClass("w2ui-required")
				}
				if (i.disabled) {
					$(i.el).prop("readonly", true)
				} else {
					$(i.el).prop("readonly", false)
				}
				if (i.hidden) {
					$(i.el).parent().parent().hide()
				} else {
					$(i.el).parent().parent().show()
				}
			}
			$(this.box).find("button, input[type=button]").each(function (e, n) {
				$(n).off("click").on("click", function (e) {
					var n = this.value;
					if (this.id) n = this.id;
					if (this.name) n = this.name;
					t.action(n, e)
				})
			});
			for (var r = 0; r < this.fields.length; r++) {
				var i = this.fields[r];
				var o = typeof this.record[i.name] != "undefined" ? this.record[i.name] : "";
				if (!i.el) continue;
				i.type = String(i.type).toLowerCase();
				if (!i.options) i.options = {};
				switch (i.type) {
				case "text":
				case "textarea":
				case "email":
				case "pass":
				case "password":
					i.el.value = o;
					break;
				case "int":
				case "float":
				case "money":
				case "currency":
				case "percent":
					if (typeof o == "number") {
						i.el.value = w2utils.formatNumber(o, i.options.groupSymbol, i.options.decimalSymbol)
					} else {
						i.el.value = o
					}
					$(i.el).w2field($.extend({}, i.options, {
						type: i.type
					}));
					break;
				case "hex":
				case "alphanumeric":
				case "color":
				case "date":
				case "time":
					i.el.value = o;
					$(i.el).w2field($.extend({}, i.options, {
						type: i.type
					}));
					break;
				case "toggle":
					if (w2utils.isFloat(o)) o = parseFloat(o);
					$(i.el).prop("checked", o ? true : false);
					this.record[i.name] = o ? 1 : 0;
					break;
				case "list":
				case "combo":
					if (i.type == "list") {
						var u = $.isPlainObject(o) ? o.id : o;
						var a = i.options.items;
						if ($.isArray(a) && a.length > 0 && !$.isPlainObject(a[0])) {
							i.options.items = w2obj.field.prototype.normMenu(a)
						}
						for (var f = 0; f < i.options.items.length; f++) {
							var l = i.options.items[f];
							if (l.id == u) {
								o = $.extend(true, {}, l);
								t.record[i.name] = o;
								break
							}
						}
					} else if (i.type == "combo" && !$.isPlainObject(o)) {
						i.el.value = o
					} else if ($.isPlainObject(o) && typeof o.text != "undefined") {
						i.el.value = o.text
					} else {
						i.el.value = ""
					}
					if (!$.isPlainObject(o)) o = {};
					$(i.el).w2field($.extend({}, i.options, {
						type: i.type,
						selected: o
					}));
					break;
				case "enum":
				case "file":
					if (!$.isArray(o)) o = [];
					$(i.el).w2field($.extend({}, i.options, {
						type: i.type,
						selected: o
					}));
					break;
				case "select":
					var a = i.options.items;
					if (typeof a != "undefined" && a.length > 0) {
						a = w2obj.field.prototype.normMenu(a);
						$(i.el).html("");
						for (var c = 0; c < a.length; c++) {
							$(i.el).append('<option value="' + a[c].id + '">' + a[c].text + "</option")
						}
					}
					$(i.el).val(o);
					break;
				case "radio":
					$(i.$el).prop("checked", false).each(function (e, t) {
						if ($(t).val() == o) $(t).prop("checked", true)
					});
					break;
				case "checkbox":
					$(i.el).prop("checked", o ? true : false);
					break;
				default:
					$(i.el).w2field($.extend({}, i.options, {
						type: i.type
					}));
					break
				}
			}
			var s = $(this.box).find(".w2ui-page");
			for (var f = 0; f < s.length; f++) {
				if ($(s[f]).find("> *").length > 1) $(s[f]).wrapInner("<div></div>")
			}
			this.trigger($.extend(n, {
				phase: "after"
			}));
			this.resize();
			return (new Date).getTime() - e
		},
		render: function (e) {
			function o() {
				var e = $(n.box).find("input, select, textarea");
				if (e.length > n.focus) e[n.focus].focus()
			}
			var t = (new Date).getTime();
			var n = this;
			if (typeof e == "object") {
				if ($(this.box).find("#form_" + this.name + "_tabs").length > 0) {
					$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-form").html("")
				}
				this.box = e
			}
			if (!this.isGenerated) return;
			if (!this.box) return;
			var r = this.trigger({
				phase: "before",
				target: this.name,
				type: "render",
				box: typeof e != "undefined" ? e : this.box
			});
			if (r.isCancelled === true) return;
			if ($.isEmptyObject(this.original) && !$.isEmptyObject(this.record)) {
				this.original = $.extend(true, {}, this.record)
			}
			var i = "<div>" + (this.header != "" ? '<div class="w2ui-form-header">' + this.header + "</div>" : "") + '    <div id="form_' + this.name + '_toolbar" class="w2ui-form-toolbar"></div>' + '    <div id="form_' + this.name + '_tabs" class="w2ui-form-tabs"></div>' + this.formHTML + "</div>";
			$(this.box).attr("name", this.name).addClass("w2ui-reset w2ui-form").html(i);
			if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
			if (typeof this.toolbar.render !== "function") {
				this.toolbar = $().w2toolbar($.extend({}, this.toolbar, {
					name: this.name + "_toolbar",
					owner: this
				}));
				this.toolbar.on("click", function (e) {
					var t = n.trigger({
						phase: "before",
						type: "toolbar",
						target: e.target,
						originalEvent: e
					});
					if (t.isCancelled === true) return;
					n.trigger($.extend(t, {
						phase: "after"
					}))
				})
			}
			if (typeof this.toolbar == "object" && typeof this.toolbar.render == "function") {
				this.toolbar.render($("#form_" + this.name + "_toolbar")[0])
			}
			if (typeof this.tabs.render !== "function") {
				this.tabs = $().w2tabs($.extend({}, this.tabs, {
					name: this.name + "_tabs",
					owner: this
				}));
				this.tabs.on("click", function (e) {
					n.goto(this.get(e.target, true))
				})
			}
			if (typeof this.tabs == "object" && typeof this.tabs.render == "function") {
				this.tabs.render($("#form_" + this.name + "_tabs")[0])
			}
			this.trigger($.extend(r, {
				phase: "after"
			}));
			this.resize();
			var s = typeof this.url != "object" ? this.url : this.url.get;
			if (s && this.recid != 0 && this.recid != null) {
				this.request()
			} else {
				this.refresh()
			}
			if ($(".w2ui-layout").length == 0) {
				this.tmp_resize = function (e) {
					w2ui[n.name].resize()
				};
				$(window).off("resize", "body").on("resize", "body", this.tmp_resize)
			}
			setTimeout(function () {
				n.resize();
				n.refresh()
			}, 150);
			if (this.focus >= 0) setTimeout(o, 500);
			return (new Date).getTime() - t
		},
		destroy: function () {
			var e = this.trigger({
				phase: "before",
				target: this.name,
				type: "destroy"
			});
			if (e.isCancelled === true) return;
			if (typeof this.toolbar == "object" && this.toolbar.destroy) this.toolbar.destroy();
			if (typeof this.tabs == "object" && this.tabs.destroy) this.tabs.destroy();
			if ($(this.box).find("#form_" + this.name + "_tabs").length > 0) {
				$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-form").html("")
			}
			delete w2ui[this.name];
			this.trigger($.extend(e, {
				phase: "after"
			}));
			$(window).off("resize", "body")
		}
	};
	$.extend(w2form.prototype, w2utils.event);
	w2obj.form = w2form
})()