import cards from './results/cards.json' assert { type: 'json' };
import partners from './results/partners.json' assert { type: 'json' };

function analyzeDataset(sourceData, getName) {
  return (desc, sortBy, filterBy = () => true) => {
    const dataset = sourceData.filter(filterBy);
    const max = Math.max(...dataset.map(sortBy));
    const filtered = dataset.filter((e) => sortBy(e) === max);

    console.log(`${desc} : ${max}`);

    for (const card of filtered) {
      console.log(`- ${getName(card)}`);
    }

    console.log('');
  };
}

const analyzeCards = analyzeDataset(cards, (card) => card.name);
const analyzePartners = analyzeDataset(partners, (pair) =>
  pair.names.join(' & ')
);

(function main() {
  analyzeCards('Overall', (e) => e.fullUniqueLetterCount);

  analyzeCards(
    'Legendary Creature',
    (e) => e.fullUniqueLetterCount,
    (e) => e.isLegendaryCreature
  );

  analyzeCards(
    'Legendary Creature Front Face',
    (e) => e.frontUniqueLetterCount,
    (e) => e.isLegendaryCreature
  );

  analyzeCards(
    'Commander',
    (e) => e.fullUniqueLetterCount,
    (e) => e.isCommander
  );

  analyzeCards(
    'Commander Front Face',
    (e) => e.frontUniqueLetterCount,
    (e) => e.isCommander
  );

  analyzePartners('Partner Pairing', (e) => e.uniqueLetterCount);
})();
