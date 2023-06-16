# Unique Letters in MTG Card Names

Inspired by this post: https://www.reddit.com/r/mtg/comments/148layl/legendary_creature_with_the_most_amount_of_unique/

## Prerequisites

- [NodeJS](https://nodejs.org/en) >= v13.2 (or with flag prior to v12.7)
- [Git](https://git-scm.com/) (Optional)

## Installation

Clone this repo to your local drive or download it as a ZIP.

## Setup

### Download Card Data

1. Go to [Scryfall Bulk Data Files](https://scryfall.com/docs/api/bulk-data).
2. Download the "Oracle Cards" JSON file.
3. Save it to a new folder called "source" at the root of this repo.
4. Rename the file to `oracle-cards.json`.

## Usage

The results are already commited to this repo, but to re-evaluate the card names, run:

```
node evaluate.mjs
```

This generates the `cards.json` and `partners.json` files in the results folder. To analyze the results to find the legendary creatures with the most unique letters:

```
node analyze.mjs
```

This prints the record holders for each criteria as defined in `analyze.mjs`. The results as of 06/13/2023 are as follows:

```
Overall : 21
- Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental

Legendary Creature : 20
- Alrund, God of the Cosmos // Hakka, Whispering Raven
- A-Alrund, God of the Cosmos // A-Hakka, Whispering Raven
- Reidane, God of the Worthy // Valkmira, Protector's Shield

Legendary Creature Front Face : 17
- Mishra, Excavation Prodigy
- Bright-Palm, Soul Awakener

Commander : 20
- Alrund, God of the Cosmos // Hakka, Whispering Raven
- A-Alrund, God of the Cosmos // A-Hakka, Whispering Raven
- Reidane, God of the Worthy // Valkmira, Protector's Shield

Commander Front Face : 17
- Mishra, Excavation Prodigy
- Bright-Palm, Soul Awakener

Partner Pairing : 22
- Kydele, Chosen of Kruphix & Toggo, Goblin Weaponsmith
```