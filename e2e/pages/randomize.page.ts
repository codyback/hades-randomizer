class RandomizePage {
  visit(waitForLoad = true) {
    if (waitForLoad) {
      cy.visit('/');
      return this.randomizeTitle().should('be.visible');
    }
    return cy.visit('/');
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
  filterHeatsExpansion() {
    return cy.get('[data-cy="filterExpansionHeats"]');
  }

  filterMirrorsExpansion() {
    return cy.get('[data-cy="filterExpansionMirrors"]');
  }

  filterKeepsakesExpansion() {
    return cy.get('[data-cy="filterExpansionKeepsakes"]');
  }

  filterCompanionsExpansion() {
    return cy.get('[data-cy="filterExpansionCompanions"]');
  }

  filterWeaponsExpansion() {
    return cy.get('[data-cy="filterExpansionWeapons"]');
  }

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

  randomizedMiscExpansion() {
    return cy.get('[data-cy="miscRandomizedExpansion"]');
  }

  randomizedCompanionItem() {
    return cy.get('[data-cy="companionRandomizedItem"]');
  }

  randomizedKeepsakeItem() {
    return cy.get('[data-cy="keepsakeRandomizedItem"]');
  }

  randomizedWeaponItem() {
    return cy.get('[data-cy="weaponRandomizedItem"]');
  }
}

export default new RandomizePage();
