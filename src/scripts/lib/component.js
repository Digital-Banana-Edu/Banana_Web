(function(factory) {
  if (typeof exports !== 'undefined' ) {
    var $;
    try { $ = require('jquery'); } catch (e) {}
  }
  factory($, window)
}(function($, window) {
  var extend = function(Parent, proto) {
    var F = function() {
      return Parent.apply(this, arguments);
    }

    var _super = $.extend(true, {}, Parent.prototype);

    F.prototype = Object.create(_super);
    F.prototype.constructor = Parent;

    for (var key in proto) {
      var value = proto[key];

      if (typeof value !== 'function') continue;

      F.prototype[key] = _super[key] ? (function(key, value) {
        return function() {
          var args = arguments;

          this._super = function() {
            return _super[key].apply(this, args);
          };
          var result  = value.apply(this, args);
          delete this._super;
          return result;
        };
      })(key, value) : value;
    }

    var props = _extractProps(proto);

    if (_super._superProps) {
      _super._superProps = $.extend(true, {}, _super._superProps, props);
    } else {
      _super._superProps = props;
    }

    return F;
  };

  function _extractProps(object) {
    var props = {};

    for (var key in object) {
      var value = object[key];

      if ($.isFunction(value)) continue;

      props[key] = value;
    }

    return props;
  }

  var Registry = {
    components: {},
    mixins: {}
  }

  function Core($block, options) {
    $.extend(true, this, this._superProps, options);

    this.$block = $block;

    if (typeof this.prevent == 'function' && this.prevent()) {
      console.warn('Component %s is prevented.', this._namespace);
      return;
    }

    _bindEvents.call(this);

    this.mixins && this.mixins.forEach(function(mixin) {
      mixin.init && mixin.init.call(this);
    }, this);

    this.init();

    return this;
  }

  Core.prototype = {
    init: function() {},

    _elName: function(name) {
      return ['.js-', this._namespace, name[0].toUpperCase() + name.slice(1)].join('');
    },

    _componentName: function(name) {
      return '[data-component~="' + name + '"]';
    },

    trigger: function(event, data) {
      return this.$block.trigger(event, data);
    },

    $: function(selector, $context) {
      return ($context || this.$block).find(_replaceShortcuts.call(this, selector));
    }
  };

  function _bindEvents() {
    var $block = this.$block, events = this.events;

    for (var key in events) {
      var _self = this;
      var event = _parseEvent.call(this, $block, key, events[key]);

      (function(event) {
        var callback = function() {
          event.callback.apply(_self, [].concat([].slice.call(arguments), [$(this)]));
        };

        event.target.on(event.name, event.selector, callback);

        if (event.target[0] == window || event.target[0] == document) {
          _self.$block.on('remove', function() {
            event.target.off(event.name, callback);
          });
        }
      })(event);
    }

    this.$block.on('remove', this.remove);
  }

  function _replaceShortcuts(selector) {
    return selector ? selector
      .replace(/%%([\w\d-]+)/g, function(match, name) {
        return this._componentName(name);
      }.bind(this))
      .replace(/%([\w\d-]+)/g, function(match, name) {
        return this._elName(name);
      }.bind(this)) : null;
  }

  function _parseEvent($block, key, callback) {
    var event;
    key = key.split(' on ');

    if (key[1] && (key[1] == 'window' || key[1] == 'document')) {
      var target = key[1] == 'window' ? window : document;
      event = { target: $(target), selector: null, name: key[0] };
    } else if (key.length) {
      event = { target: $block, selector: key[1], name: key[0] };
    } else {
      event = { target: $block, selector: null, name: key };
    }

    event.selector = _replaceShortcuts.call(this, event.selector);

    if (typeof callback !== 'function') {
      if (!this[callback]) {
        throw new Error(['Method', callback, 'not defined'].join(' '))
      }

      event.callback = this[callback];
    } else {
      event.callback = callback;
    }

    return event;
  }

  function mixin(name, proto) {
    return Registry.mixins[name] = proto;
  }

  function define(name, parent, proto) {
    if (parent && proto) {
      parent = Registry.components[parent];
    }

    if (!proto) {
      proto  = parent;
      parent = Core;
    }

    proto._namespace = name;

    if (proto.mixins) {
      proto.mixins = proto.mixins.map(function(name) { return Registry.mixins[name] });

      proto = proto.mixins.concat([proto]).reduce(function(proto, mixin) {
        return $.extend(true, proto, mixin);
      }, {});
    }

    return Registry.components[name] = extend(parent, proto);
  }

  function attach(name, el, options) {
    if (component = Registry.components[name]) {
      console.log('Component %s is inited with options %O', name, options);
      return new component(el, options);
    } else {
      throw new Error(['Component', name, 'is not defined.'].join(' '));
    }
  }

  function vitalize(target) {
    var $target  = $(target || document);
    var selector = '[data-component]:not([data-component-ready])'

    $target
      .filter(selector)
      .add($target.find(selector))
      .each(function() {
        var $el        = $(this).attr('data-component-ready', true);
        var options    = $el.data('options') || {};
        var components = $el.data('component');

        components && components.split(' ').forEach(function(component) {
          attach(component, $el, options);
        });
      });

    $target.trigger('vitalized')
  }

  window.Component = {
    define: define,
    vitalize: vitalize,
    attach: attach,
    mixin: mixin
  };
}))
