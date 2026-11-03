// Tests du moteur VLSM : node tests/test.js
const assert = require('assert');
const V = require('../vlsm.js');
const s = (n) => V.ipStr(n);

// 1. Cas d'école : 192.168.1.0/24, besoins 50 / 20 / 10 / 2
let r = V.vlsm('192.168.1.0/24', [{ name: 'A', hosts: 50 }, { name: 'B', hosts: 20 }, { name: 'C', hosts: 10 }, { name: 'D', hosts: 2 }], {});
assert.deepStrictEqual(r.subnets.map((x) => s(x.network) + '/' + x.prefix), ['192.168.1.0/26', '192.168.1.64/27', '192.168.1.96/28', '192.168.1.112/30']);

// 2. Site Paris du PoC : 172.16.0.0/24
r = V.vlsm('172.16.0.0/24', [{ name: 'USERS', hosts: 50 }, { name: 'SERVEURS', hosts: 4 }, { name: 'ADMIN', hosts: 10 }, { name: 'IMAGERIE', hosts: 20 }], {});
assert.deepStrictEqual(r.subnets.map((x) => x.name + ' ' + s(x.network) + '/' + x.prefix),
  ['USERS 172.16.0.0/26', 'IMAGERIE 172.16.0.64/27', 'ADMIN 172.16.0.96/28', 'SERVEURS 172.16.0.112/29']);

// 3. Erreurs
assert.strictEqual(V.vlsm('192.168.1.0/30', [{ name: 'A', hosts: 10 }], {}).error, 'tooBig');
assert.strictEqual(V.vlsm('300.1.1.0/24', [{ name: 'A', hosts: 10 }], {}).error, 'cidr');

// 4. 3 000 découpages aléatoires valides : blocs alignés, dans le réseau de base, sans chevauchement, assez grands
let ok = 0;
for (let k = 0; ok < 3000; k++) {
  const prefix = 16 + Math.floor(Math.random() * 10);
  const needs = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, (_, i) => ({ name: 'N' + i, hosts: 1 + Math.floor(Math.random() * 500) }));
  const res = V.vlsm('10.' + Math.floor(Math.random() * 256) + '.0.0/' + prefix, needs, {});
  if (res.error) continue;
  const base = res.base;
  const blocks = res.subnets.map((x) => [x.network, x.network + x.size - 1, x]);
  for (const [a, b, x] of blocks) {
    assert.strictEqual(x.network % x.size, 0, 'bloc non aligné');
    assert.ok(a >= base.network && b <= base.network + base.size - 1, 'hors du réseau de base');
    assert.ok(x.usable >= x.hosts, 'bloc trop petit');
  }
  blocks.sort((p, q) => p[0] - q[0]);
  for (let i = 1; i < blocks.length; i++) assert.ok(blocks[i][0] > blocks[i - 1][1], 'chevauchement');
  ok++;
}
console.log('OK : cas fixes + ' + ok + ' découpages aléatoires valides');
