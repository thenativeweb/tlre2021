const defaultTextContext = {
  partyOverview: {
    loading: 'Lade Parties...',
    error: 'Fehler beim laden der Parties. Bitte versuchen Sie es später ernuet...',
    partyNumbers: (partiesNumber: number, guestNumber: number): string => ` Wir haben <strong>${partiesNumber} Parties</strong> mit insgesamt <strong>${guestNumber} Gästen</strong> für Dich!   
    `
  },
  addPartyForm: {
    hostNameInputLabel: 'Name des Gastgebers',
    descriptionLabel: 'Partybeschreibung',
    saveButtonLabel: 'Party speichern'
  },
  addGuestForm: {
    nameInputLabel: 'Name',
    costumeInputLabel: 'Kostüm',
    title: 'Zur Party anmelden:',
    saveButtonLabel: 'Speichern'
  },
  avatarSelect: {
    label: 'Avatar auswählen',
    nullOption: 'Kein Avatar'
  },
  guestList: {
    noGuests: 'Bisher haben sich noch keine Gäste angemeldet :(',
    withCostume: (costume: string): string => `kostümiert als ${costume}`,
    noCostum: 'kommt unverkleidet'
  },
  hostInfo: {
    avatarAltText: (name: string): string => `Avatar von ${name}`
  },
  partyDetails: {
    title: (hostName: string): string => `${hostName}s Halloween-Party`,
    hostTitle: 'Dein Gastgeber',
    descriptionTitle: 'Alles was du zur Party wissen musst:',
    guestHeadline: (guestNumber: number): string => `Auf diese ${guestNumber} Gäste darfst Du dich freuen`
  },
  partyList: {
    listLabel: 'Liste aller Parties'
  }

};

export {
  defaultTextContext
};
