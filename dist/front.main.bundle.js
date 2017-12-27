var app = function(exports) {
    "use strict";
    function content(parent, value, current) {
        var array, t = typeof value;
        if (current === value) ; else if ("string" === t) current = parent.innerText = value; else if ("number" === t || "boolean" === t) value = value.toString(), 
        current = parent.innerText = value; else if (null == value) clear(parent), current = ""; else if ("function" === t) S(function() {
            current = content(parent, value(), current);
        }); else if (value instanceof Node) Array.isArray(current) ? 0 === current.length ? parent.appendChild(value) : 1 === current.length ? parent.replaceChild(value, current[0]) : (clear(parent), 
        parent.appendChild(value)) : "" === current ? parent.appendChild(value) : parent.replaceChild(value, parent.firstChild), 
        current = value; else {
            if (!Array.isArray(value)) throw new Error("content must be Node, stringable, or array of same");
            0 === (array = normalizeIncomingArray([], value)).length ? clear(parent) : Array.isArray(current) ? 0 === current.length ? appendNodes(parent, array, 0, array.length) : reconcileArrays(parent, current, array) : "" === current ? appendNodes(parent, array, 0, array.length) : reconcileArrays(parent, [ parent.firstChild ], array), 
            current = array;
        }
        return current;
    }
    function reconcileArrays(parent, ns, us) {
        var i, j, k, ntext, src, utext, preserved, lcs, utexti, lcsj, ntextk, ulen = us.length, nmin = 0, nmax = ns.length - 1, umin = 0, umax = ulen - 1, n = ns[nmin], u = us[umin], nx = ns[nmax], ux = us[umax], ul = nx.nextSibling, loop = !0;
        fixes: for (;loop; ) {
            for (loop = !1; equable(u, n, umin, us); ) {
                if (nmin++, ++umin > umax || nmin > nmax) break fixes;
                u = us[umin], n = ns[nmin];
            }
            for (;equable(ux, nx, umax, us); ) {
                if (ul = nx, nmax--, umin > --umax || nmin > nmax) break fixes;
                ux = us[umax], nx = ns[nmax];
            }
            for (;equable(u, nx, umin, us); ) {
                if (loop = !0, parent.insertBefore(nx, n), nmax--, ++umin > umax || nmin > nmax) break fixes;
                u = us[umin], nx = ns[nmax];
            }
            for (;equable(ux, n, umax, us); ) {
                if (loop = !0, null === ul ? parent.appendChild(n) : parent.insertBefore(n, ul), 
                ul = n, nmin++, umin > --umax || nmin > nmax) break fixes;
                ux = us[umax], n = ns[nmin];
            }
        }
        if (umin > umax) for (;nmin <= nmax; ) parent.removeChild(ns[nmax]), nmax--; else if (nmin > nmax) for (;umin <= umax; ) insertOrAppend(parent, us[umin], ul, umin, us), 
        umin++; else {
            for (ntext = [], i = nmin, j = (nmin << RECONCILE_ARRAY_BITS) + (RECONCILE_ARRAY_BATCH = (RECONCILE_ARRAY_BATCH + 1) % RECONCILE_ARRAY_INC); i <= nmax; i++, 
            j += RECONCILE_ARRAY_INC) void 0 === (n = ns[i]).__surplus_order ? Object.defineProperty(n, "__surplus_order", {
                value: j,
                writable: !0
            }) : n.__surplus_order = j, n instanceof Text && ntext.push(i);
            for (src = new Array(umax - umin + 1), utext = [], preserved = 0, i = umin; i <= umax; i++) "string" == typeof (u = us[i]) ? (utext.push(i), 
            src[i - umin] = NOMATCH) : void 0 !== (j = u.__surplus_order) && (j & RECONCILE_ARRAY_MASK) === RECONCILE_ARRAY_BATCH ? (j >>= RECONCILE_ARRAY_BITS, 
            src[i - umin] = j, ns[j] = null, preserved++) : src[i - umin] = NOMATCH;
            if (0 !== preserved || 0 !== nmin || nmax !== ns.length - 1) {
                for (lcs = function(ns) {
                    var seq, is, l, pre, i, len, n, j;
                    for (seq = [], is = [], l = -1, pre = new Array(ns.length), i = 0, len = ns.length; i < len; i++) (n = ns[i]) < 0 || (-1 !== (j = findGreatestIndexLEQ(seq, n)) && (pre[i] = is[j]), 
                    j === l ? (seq[++l] = n, is[l] = i) : n < seq[j + 1] && (seq[j + 1] = n, is[j + 1] = i));
                    for (i = is[l]; l >= 0; i = pre[i], l--) seq[l] = i;
                    return seq;
                }(src), i = 0; i < lcs.length; i++) src[lcs[i]] = NOINSERT;
                for (utexti = 0, lcsj = 0, ntextk = 0, i = 0, j = 0, k = 0; i < utext.length; i++) {
                    for (utexti = utext[i]; j < lcs.length && (lcsj = lcs[j]) < utexti - umin; ) j++;
                    for (;k < ntext.length && (ntextk = ntext[k], 0 !== j) && ntextk < src[lcs[j - 1]]; ) k++;
                    k < ntext.length && (j === lcs.length || ntextk < src[lcsj]) ? (n = ns[ntextk], 
                    u = us[utexti], n.data !== u && (n.data = u), ns[ntextk] = null, us[utexti] = n, 
                    src[utexti] = NOINSERT, k++) : us[utexti] = document.createTextNode(us[utexti]);
                }
                for (;nmin <= nmax; ) null !== (n = ns[nmin]) && parent.removeChild(n), nmin++;
                for (;umin <= umax; ) ux = us[umax], src[umax - umin] !== NOINSERT && (null === ul ? parent.appendChild(ux) : parent.insertBefore(ux, ul)), 
                ul = ux, umax--;
            } else for (clear(parent); umin <= umax; ) insertOrAppend(parent, us[umin], null, umin, us), 
            umin++;
        }
    }
    function equable(u, n, i, us) {
        return u === n || "string" == typeof u && n instanceof Text && (n.data !== u && (n.data = u), 
        us[i] = n, !0);
    }
    function appendNodes(parent, array, i, end) {
        for (var node; i < end; i++) (node = array[i]) instanceof Node ? parent.appendChild(node) : (node = array[i] = document.createTextNode(node), 
        parent.appendChild(node));
    }
    function insertOrAppend(parent, node, marker, i, us) {
        "string" == typeof node && (node = us[i] = document.createTextNode(node)), null === marker ? parent.appendChild(node) : parent.insertBefore(node, marker);
    }
    function normalizeIncomingArray(normalized, array) {
        var i, len, item;
        for (i = 0, len = array.length; i < len; i++) (item = array[i]) instanceof Node ? normalized.push(item) : null == item || (Array.isArray(item) ? normalizeIncomingArray(normalized, item) : "string" == typeof item ? normalized.push(item) : normalized.push(item.toString()));
        return normalized;
    }
    function clear(node) {
        node.textContent = "";
    }
    function findGreatestIndexLEQ(seq, n) {
        var mid, lo = -1, hi = seq.length;
        if (hi > 0 && seq[hi - 1] <= n) return hi - 1;
        for (;hi - lo > 1; ) seq[mid = Math.floor((lo + hi) / 2)] > n ? hi = mid : lo = mid;
        return lo;
    }
    function createElement(tag, className, parent) {
        var el = document.createElement(tag);
        return className && (el.className = className), parent && parent.appendChild(el), 
        el;
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
    function _home_message_onclic() {
        vm.clic += 1, vm.message("Click me [" + vm.clic + "]");
    }
    var Clock, DataNode, ComputationNode, Log, Queue, NOTPENDING, CURRENT, STALE, RUNNING, RootClock, RunningClock, RunningNode, Owner, UNOWNED, vm, routes, _static, _dynamic, model = {}, NOMATCH = -1, NOINSERT = -2, RECONCILE_ARRAY_BATCH = 0, RECONCILE_ARRAY_BITS = 16, RECONCILE_ARRAY_INC = 1 << RECONCILE_ARRAY_BITS, RECONCILE_ARRAY_MASK = RECONCILE_ARRAY_INC - 1, S = function(fn, value) {
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
    return Object.defineProperty(S, "default", {
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
    vm = {
        clic: 0,
        route: "/",
        message: S.data("Click me"),
        views: {}
    }, routes = {
        home: function() {
            return function() {
                var __, __h11, __ul2;
                return __ = createElement("div", null, null), (__h11 = createElement("h1", null, __)).onclick = _home_message_onclic, 
                __ul2 = createElement("ul", null, __), S(function(__current) {
                    return content(__h11, vm.message(), __current);
                }, ""), S(function(__current) {
                    return content(__ul2, [ "a", "b" ].map(function(v_) {
                        return function() {
                            var __;
                            return content(__ = createElement("li", null, null), v_, ""), __;
                        }();
                    }), __current);
                }, ""), __;
            }();
        }
    }, _static = document.getElementById("app"), _dynamic = routes.home(), window.requestAnimationFrame(function() {
        _static.parentNode.replaceChild(_dynamic, _static), _static = void 0;
    }), exports.model = model, exports.routes = routes, exports.vm = vm, exports;
}({});
