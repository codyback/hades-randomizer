import RandomizePage from '../pages/randomize.page';

describe('Randomize Page', () => {
  beforeEach(() => {
    RandomizePage.visit();
  });

  describe('Randomize Settings', () => {
    it('should render all settings', () => {
      RandomizePage.weightedRandomization().should('be.visible');
      RandomizePage.hellMode().should('be.visible');
      RandomizePage.heatLevel().should('be.visible');
    });
  });

  describe('Randomize Filter', () => {
    it('should render all filters', () => {
      RandomizePage.filterHeatsExpansion().should('be.visible');
      RandomizePage.filterMirrorsExpansion().should('be.visible');
      RandomizePage.filterKeepsakesExpansion().should('be.visible');
      RandomizePage.filterCompanionsExpansion().should('be.visible');
      RandomizePage.filterWeaponsExpansion().should('be.visible');
    });
  });

  describe('Randomized Items', () => {
    it('should render all randomized items', () => {
      RandomizePage.randomizedHeatsExpansion().should('be.visible');
      RandomizePage.randomizedHeatsList().should('be.visible');
      RandomizePage.randomizedMirrorsExpansion().should('be.visible');
      RandomizePage.randomizedMiscExpansion().should('be.visible');
    });
  });
});
