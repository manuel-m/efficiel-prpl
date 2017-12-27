!function() {
    "use strict";
    function insert(range, value) {
        function insertArray(array) {
            var i, len, value;
            for (i = 0, len = array.length; i < len; i++) value = array[i], good === range.end ? value instanceof Node ? good = range.end = good.nextSibling ? parent.insertBefore(value, good.nextSibling) : parent.appendChild(value) : value instanceof Array ? insertArray(value) : null !== value && void 0 !== value && (value = document.createTextNode(value.toString()), 
            good = range.end = good.nextSibling ? parent.insertBefore(value, good.nextSibling) : parent.appendChild(value)) : value instanceof Node ? (test !== value ? null === good ? (range.end === value && (range.end = value.previousSibling), 
            parent.replaceChild(value, test), range.start = value, range.end === test && (range.end = value), 
            test = value.nextSibling) : test.nextSibling === value && test !== value.nextSibling && test !== range.end ? (parent.removeChild(test), 
            test = value.nextSibling) : (range.end === value && (range.end = value.previousSibling), 
            parent.insertBefore(value, test)) : test = test.nextSibling, good = value) : value instanceof Array ? insertArray(value) : null !== value && void 0 !== value && (value = value.toString(), 
            test.nodeType === TEXT_NODE ? (test.data = value, null === good && (range.start = test), 
            test = (good = test).nextSibling) : (value = document.createTextNode(value), parent.insertBefore(value, test), 
            null === good && (range.start = value), good = value));
        }
        var parent = range.start.parentNode, test = range.start, good = null, t = typeof value;
        for ("string" === t || "number" === t || "boolean" === t ? (value = value.toString(), 
        test.nodeType === TEXT_NODE ? (test.data = value, good = test) : (value = document.createTextNode(value), 
        parent.replaceChild(value, test), range.end === test && (range.end = value), range.start = good = value)) : value instanceof Node ? (test !== value && (parent.replaceChild(value, test), 
        range.end === test && (range.end = value), range.start = value), good = value) : Array.isArray(value) ? insertArray(value) : value instanceof Function ? (S(function() {
            insert(range, value());
        }), good = range.end) : null !== value && void 0 !== value && (value = value.toString(), 
        test.nodeType === TEXT_NODE ? (test.data = value, good = test) : (value = document.createTextNode(value), 
        parent.replaceChild(value, test), range.end === test && (range.end = value), range.start = good = value)), 
        null === good && (range.start === parent.firstChild && range.end === parent.lastChild && range.start !== range.end ? (parent.textContent = "", 
        value = document.createTextNode(""), parent.appendChild(value), good = range.start = range.end = value) : test.nodeType === TEXT_NODE ? (test.data = "", 
        good = test) : (value = document.createTextNode(""), parent.replaceChild(value, test), 
        range.end === test && (range.end = value), range.start = good = value)); good !== range.end; ) test = range.end, 
        range.end = test.previousSibling, parent.removeChild(test);
        return range;
    }
    function createTextNode(text, parent) {
        var node = document.createTextNode(text);
        return parent.appendChild(node), node;
    }
    function logRead(from, to) {
        var fromslot, toslot = null === to.source1 ? -1 : null === to.sources ? 0 : to.sources.length;
        null === from.node1 ? (from.node1 = to, from.node1slot = toslot, fromslot = -1) : null === from.nodes ? (from.nodes = [ to ], 
        from.nodeslots = [ toslot ], fromslot = 0) : (fromslot = from.nodes.length, from.nodes.push(to), 
        from.nodeslots.push(toslot)), null === to.source1 ? (to.source1 = from, to.source1slot = fromslot) : null === to.sources ? (to.sources = [ from ], 
        to.sourceslots = [ fromslot ]) : (to.sources.push(from), to.sourceslots.push(fromslot));
    }
    function event() {
        var owner = Owner;
        RootClock.updates.reset(), RootClock.time++;
        try {
            run(RootClock);
        } finally {
            RunningClock = RunningNode = null, Owner = owner;
        }
    }
    function run(clock) {
        var running = RunningClock, count = 0;
        for (RunningClock = clock, clock.disposes.reset(); 0 !== clock.changes.count || 0 !== clock.updates.count || 0 !== clock.disposes.count; ) if (count > 0 && clock.time++, 
        clock.changes.run(applyDataChange), clock.updates.run(updateNode), clock.disposes.run(dispose), 
        count++ > 1e5) throw new Error("Runaway clock detected");
        RunningClock = running;
    }
    function applyDataChange(data) {
        data.value = data.pending, data.pending = NOTPENDING, data.log && markComputationsStale(data.log);
    }
    function markComputationsStale(log) {
        var i, len, node1 = log.node1, nodes = log.nodes;
        if (null !== node1 && markNodeStale(node1), null !== nodes) for (i = 0, len = nodes.length; i < len; i++) markNodeStale(nodes[i]);
    }
    function markNodeStale(node) {
        var time = RootClock.time;
        node.age < time && (node.age = time, node.state = STALE, RootClock.updates.add(node), 
        null !== node.owned && markOwnedNodesForDisposal(node.owned), null !== node.log && markComputationsStale(node.log));
    }
    function markOwnedNodesForDisposal(owned) {
        var i, child;
        for (i = 0; i < owned.length; i++) (child = owned[i]).age = RootClock.time, child.state = CURRENT, 
        null !== child.owned && markOwnedNodesForDisposal(child.owned);
    }
    function updateNode(node) {
        if (node.state === STALE) {
            var owner = Owner, running = RunningNode;
            Owner = RunningNode = node, node.state = RUNNING, cleanup(node, !1), node.value = node.fn(node.value), 
            node.state = CURRENT, Owner = owner, RunningNode = running;
        }
    }
    function cleanup(node, final) {
        var i, len, source1 = node.source1, sources = node.sources, sourceslots = node.sourceslots, cleanups = node.cleanups, owned = node.owned;
        if (null !== cleanups) {
            for (i = 0; i < cleanups.length; i++) cleanups[i](final);
            node.cleanups = null;
        }
        if (null !== owned) {
            for (i = 0; i < owned.length; i++) dispose(owned[i]);
            node.owned = null;
        }
        if (null !== source1 && (cleanupSource(source1, node.source1slot), node.source1 = null), 
        null !== sources) for (i = 0, len = sources.length; i < len; i++) cleanupSource(sources.pop(), sourceslots.pop());
    }
    function cleanupSource(source, slot) {
        var last, lastslot, nodes = source.nodes, nodeslots = source.nodeslots;
        -1 === slot ? source.node1 = null : (last = nodes.pop(), lastslot = nodeslots.pop(), 
        slot !== nodes.length && (nodes[slot] = last, nodeslots[slot] = lastslot, -1 === lastslot ? last.source1slot = slot : last.sourceslots[lastslot] = slot));
    }
    function dispose(node) {
        node.fn = null, node.log = null, cleanup(node, !0);
    }
    var Clock, DataNode, ComputationNode, Log, Queue, NOTPENDING, CURRENT, STALE, RUNNING, RootClock, RunningClock, RunningNode, Owner, UNOWNED, name, view, TEXT_NODE = 3, S = function(fn, value) {
        var node, owner = Owner, running = RunningNode;
        return null === owner && console.warn("computations created without a root or parent will never be disposed"), 
        node = new ComputationNode(fn, value), Owner = RunningNode = node, null === RunningClock ? function(node) {
            RunningClock = RootClock, RootClock.changes.reset(), RootClock.updates.reset();
            try {
                node.value = node.fn(node.value), (RootClock.changes.count > 0 || RootClock.updates.count > 0) && (RootClock.time++, 
                run(RootClock));
            } finally {
                RunningClock = Owner = RunningNode = null;
            }
        }(node) : node.value = node.fn(node.value), owner && owner !== UNOWNED && (null === owner.owned ? owner.owned = [ node ] : owner.owned.push(node)), 
        Owner = owner, RunningNode = running, function() {
            if (null !== RunningNode) {
                if (node.age === RootClock.time) {
                    if (node.state === RUNNING) throw new Error("circular dependency");
                    updateNode(node);
                }
                !function(node, to) {
                    null === node.log && (node.log = new Log()), logRead(node.log, to);
                }(node, RunningNode);
            }
            return node.value;
        };
    };
    Object.defineProperty(S, "default", {
        value: S
    }), S.root = function(fn) {
        var owner = Owner, root = 0 === fn.length ? UNOWNED : new ComputationNode(null, null), result = void 0, disposer = 0 === fn.length ? null : function() {
            null !== RunningClock ? RootClock.disposes.add(root) : dispose(root);
        };
        return Owner = root, null === RunningClock ? result = function(fn, disposer, owner) {
            try {
                return null === disposer ? fn() : fn(disposer);
            } finally {
                Owner = owner;
            }
        }(fn, disposer, owner) : (result = null === disposer ? fn() : fn(disposer), Owner = owner), 
        result;
    }, S.on = function(ev, fn, seed, onchanges) {
        function on(value) {
            var running = RunningNode;
            return ev(), onchanges ? onchanges = !1 : (RunningNode = null, value = fn(value), 
            RunningNode = running), value;
        }
        Array.isArray(ev) && (ss = ev, ev = function() {
            for (var i = 0; i < ss.length; i++) ss[i]();
        });
        var ss;
        return onchanges = !!onchanges, S(on, seed);
    }, S.data = function(value) {
        var node = new DataNode(value);
        return function(value) {
            if (arguments.length > 0) {
                if (null !== RunningClock) if (node.pending !== NOTPENDING) {
                    if (value !== node.pending) throw new Error("conflicting changes: " + value + " !== " + node.pending);
                } else node.pending = value, RootClock.changes.add(node); else null !== node.log ? (node.pending = value, 
                RootClock.changes.add(node), event()) : node.value = value;
                return value;
            }
            return null !== RunningNode && !function(data, to) {
                null === data.log && (data.log = new Log()), logRead(data.log, to);
            }(node, RunningNode), node.value;
        };
    }, S.value = function(current, eq) {
        var data = S.data(current), age = -1;
        return function(update) {
            var time;
            if (0 === arguments.length) return data();
            if (!(eq ? eq(current, update) : current === update)) {
                if (time = RootClock.time, age === time) throw new Error("conflicting values: " + update + " is not the same as " + current);
                age = time, current = update, data(update);
            }
            return update;
        };
    }, S.freeze = function(fn) {
        var result = void 0;
        if (null !== RunningClock) result = fn(); else {
            (RunningClock = RootClock).changes.reset();
            try {
                result = fn(), event();
            } finally {
                RunningClock = null;
            }
        }
        return result;
    }, S.sample = function(fn) {
        var result, running = RunningNode;
        return null !== running ? (RunningNode = null, result = fn(), RunningNode = running) : result = fn(), 
        result;
    }, S.cleanup = function(fn) {
        null !== Owner ? null === Owner.cleanups ? Owner.cleanups = [ fn ] : Owner.cleanups.push(fn) : console.warn("cleanups created without a root or parent will never be run");
    }, Clock = function() {
        return function() {
            this.time = 0, this.changes = new Queue(), this.updates = new Queue(), this.disposes = new Queue();
        };
    }(), DataNode = function() {
        return function(value) {
            this.value = value, this.pending = NOTPENDING, this.log = null;
        };
    }(), ComputationNode = function() {
        return function(fn, value) {
            this.fn = fn, this.value = value, this.state = CURRENT, this.source1 = null, this.source1slot = 0, 
            this.sources = null, this.sourceslots = null, this.log = null, this.owned = null, 
            this.cleanups = null, this.age = RootClock.time;
        };
    }(), Log = function() {
        return function() {
            this.node1 = null, this.node1slot = 0, this.nodes = null, this.nodeslots = null;
        };
    }(), Queue = function() {
        function Queue() {
            this.items = [], this.count = 0;
        }
        return Queue.prototype.reset = function() {
            this.count = 0;
        }, Queue.prototype.add = function(item) {
            this.items[this.count++] = item;
        }, Queue.prototype.run = function(fn) {
            var i, items = this.items;
            for (i = 0; i < this.count; i++) fn(items[i]), items[i] = null;
            this.count = 0;
        }, Queue;
    }(), NOTPENDING = {}, CURRENT = 0, STALE = 1, RUNNING = 2, RootClock = new Clock(), 
    RunningClock = null, RunningNode = null, Owner = null, UNOWNED = new ComputationNode(null, null), 
    name = S.data("world beta!!"), view = function() {
        var __, __insert2;
        return createTextNode("Hello ", __ = function(tag, className, parent) {
            var el = document.createElement(tag);
            return className && (el.className = className), parent && parent.appendChild(el), 
            el;
        }("h1", null, null)), __insert2 = createTextNode("", __), createTextNode("!", __), 
        S(function(__range) {
            return insert(__range, name());
        }, {
            start: __insert2,
            end: __insert2
        }), __;
    }(), document.body.appendChild(view);
}();
