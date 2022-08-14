var r = Object.defineProperty;
var h = (n, e, s) => e in n ? r(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var t = (n, e, s) => (h(n, typeof e != "symbol" ? e + "" : e, s), s);
import a from "mitt";
function o(n) {
  return n == null;
}
class c {
  constructor(e) {
    t(this, "manager");
    t(this, "visible", !0);
    t(this, "key");
    t(this, "el");
    t(this, "position");
    t(this, "mask");
    t(this, "zIndex");
    t(this, "maskClosable");
    t(this, "controller");
    t(this, "state");
    t(this, "callbackWhen");
    t(this, "promise");
    t(this, "callbacks");
    t(this, "duration");
    t(this, "transition");
    t(this, "wrapClass");
    t(this, "contentClass");
    t(this, "maskClass");
    t(this, "keyboard");
    t(this, "event", a());
    t(this, "emitBack", () => {
      var e;
      (e = this.promise) == null || e.resolve();
    });
    t(this, "updateState", (e) => {
      this.state = e;
    });
    t(this, "updateVisible", (e) => {
      this.visible = e, this.emitChange();
    });
    t(this, "onClose", () => {
      var e, s;
      this.state !== "beforeUnmount" && ((s = (e = this.callbacks).onClose) == null || s.call(e), this.updateState("beforeUnmount"), this.updateVisible(!1), this.callbackWhen === "onClose" && this.emitBack());
    });
    t(this, "onClosed", () => {
      var e, s;
      (s = (e = this.callbacks).onClosed) == null || s.call(e), this.updateState("unmounted"), this.manager.destroy(this.key), this.callbackWhen === "onClosed" && this.emitBack();
    });
    t(this, "on", (e, s) => {
      this.event.on(e, s);
    });
    t(this, "off", (e, s) => {
      this.event.off(e, s);
    });
    t(this, "emitChange", () => {
      this.event.emit("change");
    });
    Object.assign(this, {
      ...e,
      position: e.position || "bottom",
      mask: o(e.mask) ? !0 : e.mask,
      zIndex: e.zIndex || 999,
      callbackWhen: e.callbackWhen || "onClose",
      maskClosable: o(e.maskClosable) ? !0 : e.maskClosable,
      keyboard: o(e.keyboard) ? !0 : e.keyboard,
      callbacks: e.callbacks || {}
    }), this.controller = {
      onlyClose: () => {
        this.emitBack = () => {
        }, this.onClose();
      },
      close: (s) => {
        s && s instanceof Error ? this.emitBack = () => {
          var i;
          return (i = this.promise) == null ? void 0 : i.reject(s);
        } : this.emitBack = () => {
          var i;
          return (i = this.promise) == null ? void 0 : i.resolve(s);
        }, this.onClose();
      }
    }, this.updateState("created");
  }
}
const u = typeof window < "u" && window.document;
class d {
  constructor() {
    t(this, "count", 0);
    t(this, "event", a());
    t(this, "popups", []);
    t(this, "getCurrentVisiblePopup", () => {
      if (this.popups.length !== 0)
        return this.popups.reduce((e, s) => s.zIndex > e.zIndex ? s : e, this.popups[this.popups.length - 1]);
    });
    t(this, "open", (e) => new Promise((s, i) => {
      if (e.key && this.includes(e.key))
        throw Error(`The key "${e.key}" already exists`);
      this.count++, this.popups.push(new c({
        manager: this,
        key: e.key || `oh-popup-item-id__${this.count}`,
        el: e.el,
        position: e.position,
        duration: e.duration,
        mask: e.mask,
        zIndex: e.zIndex,
        maskClosable: e.maskClosable,
        maskClass: e.maskClass,
        wrapClass: e.wrapClass,
        contentClass: e.contentClass,
        promise: {
          resolve: s,
          reject: i
        },
        callbackWhen: e.callbackWhen,
        callbacks: {
          onClose: e.onClose,
          onClosed: e.onClosed,
          onOpened: e.onOpened
        }
      })), this.emitChange();
    }));
    t(this, "close", (e, s) => {
      var i;
      (i = this.popups.find((l) => l.key === e)) == null || i.controller.close(s);
    });
    t(this, "closeAll", () => {
      this.popups.forEach((e) => e.controller.close());
    });
    t(this, "destroy", (e) => {
      let s = -1;
      for (let i = 0; i < this.popups.length; i++)
        if (this.popups[i].key === e) {
          s = i;
          break;
        }
      s !== -1 && (this.popups.splice(s, 1), this.emitChange());
    });
    t(this, "includes", (e) => {
      let s = -1;
      for (let i = 0; i < this.popups.length; i++)
        if (this.popups[i].key === e) {
          s = i;
          break;
        }
      return s !== -1;
    });
    t(this, "on", (e, s) => {
      this.event.on(e, s);
    });
    t(this, "off", (e, s) => {
      this.event.off(e, s);
    });
    t(this, "emitChange", () => {
      this.event.emit("change", this.popups);
    });
    u && window.document.addEventListener("keyup", (e) => {
      if (e.key !== "Escape")
        return;
      const s = this.getCurrentVisiblePopup();
      s != null && s.keyboard && this.close(s.key);
    });
  }
}
export {
  c as Popup,
  d as PopupManager
};
