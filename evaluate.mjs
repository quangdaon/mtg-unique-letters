import cards from './source/oracle-cards.json' assert { type: 'json' };
import { promises } from 'fs';
const { writeFile } = promises;

function evaulateCardName(name) {
  const letters = name.replace(/\W+/g, '');
  const letterCount = letters.length;
  const uniqueLetterCount = new Set([...letters.toUpperCase()]).size;

  return {
    name,
    letters,
    letterCount,
    uniqueLetterCount,
  };
}

function evaluateCard(card) {
  const { name, type_line, oracle_text, card_faces } = card;

  const {
    letterCount: fullLetterCount,
    uniqueLetterCount: fullUniqueLetterCount,
  } = evaulateCardName(name);

  const {
    letterCount: frontLetterCount,
    uniqueLetterCount: frontUniqueLetterCount,
  } = evaulateCardName(card_faces ? card_faces[0].name : name);

  const isCreature = type_line.includes('Creature');

  const isLegendaryCreature = isCreature && type_line.includes('Legendary');

  const isCommander =
    isLegendaryCreature ||
    (oracle_text?.includes('can be your commander.') ?? false);

  const isPartner =
    isCommander &&
    oracle_text?.split('[\n\r]+').some((e) => e.includes('Partner ('));

  return {
    name,
    fullLetterCount,
    fullUniqueLetterCount,
    frontLetterCount,
    frontUniqueLetterCount,
    isCreature,
    isLegendaryCreature,
    isCommander,
    isPartner,
  };
}

async function evaluateCards() {
  const results = [];

  for (const card of cards) {
    const result = evaluateCard(card);
    results.push(result);
  }

  return results;
}

function evaluatePartnerPairs(cards) {
  let partners = cards.filter((e) => e.isPartner);
  const results = [];

  while (partners.length > 1) {
    const partner = partners.shift();

    for (const candidate of partners) {
      const result = evaulateCardName(partner.name + candidate.name);
      results.push({
        names: [partner.name, candidate.name],
        letterCount: result.letterCount,
        uniqueLetterCount: result.uniqueLetterCount,
      });
    }
  }
  return results;
}

(async function main() {
  const results = await evaluateCards();
  const pairs = evaluatePartnerPairs(results);

  await writeFile(
    './results/cards.json',
    JSON.stringify(results, null, 4),
    'utf-8'
  );

  await writeFile(
    './results/partners.json',
    JSON.stringify(pairs, null, 4),
    'utf-8'
  );
})();
