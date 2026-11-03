# Calculateur de sous-réseaux et découpage VLSM

🇫🇷 [Français](#français) · 🇬🇧 [English](#english)

**Essayer l'outil :** https://valentin-auger-laboratoire.github.io/portfolio/outils/sous-reseaux/

---

## Français

### Ce que fait l'outil
Outil web d'adressage IPv4, en HTML / CSS / JavaScript pur (aucune bibliothèque, aucun serveur).

**Onglet « Découpage VLSM »** : on donne un réseau (ex. `172.16.0.0/24`) et la liste des sous-réseaux avec leur nombre d'hôtes. L'outil :
- trie les besoins du plus grand au plus petit et attribue à chacun le **plus petit bloc possible**, **aligné** sur sa taille et **sans chevauchement** ;
- affiche le plan complet : réseau, masque, passerelle (1ʳᵉ adresse), plage utilisable, broadcast, adresses utilisables et perdues ;
- montre la part du réseau encore libre et le prochain bloc disponible ;
- exporte le plan en **CSV** (séparateur `;`, ouvrable dans Excel).

Option : liens point à point en **/31** (RFC 3021) pour les besoins de 2 hôtes.

**Onglet « Analyser une adresse »** : pour une adresse avec préfixe (ex. `172.16.10.37/26`), réseau, masque, masque inverse (wildcard), broadcast, première et dernière adresse, nombre d'hôtes, classe, privée ou publique, et **vue binaire** (bits réseau / bits hôte).

### Fichiers
| Fichier | Rôle |
|---|---|
| `vlsm.js` | Moteur de calcul (aucune dépendance au navigateur, testable avec Node) |
| `index.html` | Interface, bilingue FR / EN |
| `tests/test.js` | Tests du moteur |

### Lancer les tests
```bash
node tests/test.js
```
Cas fixes (cas d'école /24, site Paris du [PoC réseau de téléradiologie](https://github.com/Valentin-Auger-Laboratoire/poc-reseau-teleradiologie)) et **3 000 découpages aléatoires** : chaque bloc est aligné, contenu dans le réseau de base, assez grand pour son besoin, et aucun ne chevauche un autre.

### Utiliser en local
Ouvrir `index.html` dans un navigateur. Rien n'est envoyé sur Internet.

---

## English

### What the tool does
IPv4 addressing web tool, in plain HTML / CSS / JavaScript (no library, no server).

**"VLSM planner" tab**: enter a network (e.g. `172.16.0.0/24`) and the list of subnets with their host count. The tool:
- sorts the needs from largest to smallest and gives each one the **smallest possible block**, **aligned** on its size and **with no overlap**;
- shows the full plan: network, mask, gateway (first address), usable range, broadcast, usable and wasted addresses;
- shows the share of the network still free and the next available block;
- exports the plan as **CSV** (`;` separator, opens in Excel).

Option: point-to-point links as **/31** (RFC 3021) for 2-host needs.

**"Analyse an address" tab**: for an address with a prefix (e.g. `172.16.10.37/26`): network, mask, wildcard, broadcast, first and last address, host count, class, private or public, and a **binary view** (network bits / host bits).

### Files
| File | Purpose |
|---|---|
| `vlsm.js` | Calculation engine (no browser dependency, testable with Node) |
| `index.html` | User interface, bilingual FR / EN |
| `tests/test.js` | Engine tests |

### Run the tests
```bash
node tests/test.js
```
Fixed cases (textbook /24, Paris site of the [teleradiology network PoC](https://github.com/Valentin-Auger-Laboratoire/poc-reseau-teleradiologie)) and **3,000 random splits**: every block is aligned, inside the base network, large enough for its need, and none overlaps another.

### Use locally
Open `index.html` in a browser. Nothing is sent over the Internet.
