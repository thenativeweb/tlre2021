// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
const germanTranslations = {
  domain: {
    test: 'test'
  },
  partyNumbers: {
    party_one: 'eine Party',
    party_other: '{{count}} Partys',
    guest_one: 'einem Gast',
    guest_other: '{{ count }} Gästen',
    fullText_0: 'Aktuell sind keine Partys eingetragen.',
    fullText_other: 'Wir haben <1>{{ partyText }}</1> mit insgesamt <3>{{guestText}}</3> für Dich!'
  },
  partyOverview: {
    loading: 'Lade Parties...',
    error: 'Fehler beim laden der Parties. Bitte versuchen Sie es später ernuet...',
    addGuestError: 'Fehler beim Hinzufügen des Gastes. Bitte versuchen Sie es später erneut...',
    savePartyError: 'Fehler beim Speichern der Party. Bitte versuchen Sie es später erneut...'
  },
  partyEdit: {
    loading: 'Lade Party...',
    error: 'Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut...'
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
    withCostume: 'kostümiert als {{ guest.costume }}',
    noCostume: 'kommt unverkleidet'
  },
  hostInfo: {
    avatarAltText: 'Avatar von {{ name }}'
  },
  partyDetails: {
    title: '{{name}}s Halloween-Party',
    hostTitle: 'Dein Gastgeber',
    descriptionTitle: 'Alles was du zur Party wissen musst:',
    guestHeadline_0: 'Oh nein - noch keine Gäste',
    guestHeadline_one: 'Auf diesen {{ count }} Gast darfst Du dich freuen',
    guestHeadline_other: 'Auf diese {{ count }} Gäste darfst Du dich freuen'
  },
  partyList: {
    listLabel: 'Liste aller Parties'
  }
};

export {
  germanTranslations
};
