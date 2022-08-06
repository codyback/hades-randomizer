class RandomizePage {
  private url = '/';

  visit(waitForLoad = true) {
    if (waitForLoad) {
      cy.visit(this.url);
      return this.randomizeTitle().should('be.visible');
    }
    return cy.visit(this.url);
  }

  randomizeTitle() {
    return cy.get('[data-cy="randomizeTitle"]');
  }

  // RandomizeSettings component
  weightedRandomization() {
    return cy.get('[data-cy="weightedRandomizationToggle"]');
  }

  hellMode() {
    return cy.get('[data-cy="hellModeToggle"]');
  }

  heatLevel() {
    return cy.get('[data-cy="heatLevelSlider"]');
  }

  randomizeButton() {
    return cy.get('[data-cy="randomizeButton"]');
  }

  // RandomizeFilter component

  // RandomizedItems component
  randomizedHeatsExpansion() {
    return cy.get('[data-cy="heatsRandomizedExpansion"]');
  }

  randomizedHeatsList() {
    return cy.get('[data-cy="heatsRandomizedList"]');
  }

  randomizedMirrorsExpansion() {
    return cy.get('[data-cy="mirrorsRandomizedExpansion"]');
  }

  randomizedMirrorsList() {
    return cy.get('[data-cy="mirrorsRandomizedList"]');
  }
}

export default new RandomizePage();
