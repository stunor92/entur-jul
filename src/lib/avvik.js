// Dagens avviksmelding, vist med Linje-komponentene BannerAlertBox/SmallAlertBox.
// variant: 'information' | 'success' | 'warning' | 'negative'

// Én melding per dag 1.–24. desember.
export const DECEMBER = [
  { variant: 'success', title: 'Luke 1 er åpnet', text: 'Polarekspressen har forlatt perrongen. Neste stopp: julestemning.' },
  { variant: 'warning', title: 'Reinsdyr i sporet', text: 'Rudolf står på Nordlandsbanen og mener nesa hans er et grønt signal. Den er ikke det.' },
  { variant: 'information', title: 'Slede erstattes av buss', text: 'Nissen har kjøpt periodebillett i appen og lar sleden stå resten av uka.' },
  { variant: 'warning', title: 'Forsinkelse ved Nordpolen', text: 'En nisse spør etter sanntid på ønskelista. Vi jobber med saken.' },
  { variant: 'information', title: 'Ekstra bagasje', text: 'Reisende med mer enn ett helt verksted bes bruke bagasjevognen.' },
  { variant: 'negative', title: 'Trikken er innstilt', text: 'Pepperkakebygg i sporet ved Torget. Vi beklager den søte ulempen.' },
  { variant: 'information', title: 'Siste tog hjem', text: 'Rekk det og se Reisen til julestjernen. Overtid i desember anbefales ikke.' },
  { variant: 'warning', title: 'Billettkontroll', text: 'Reinsdyr som reiser på julestemning må vise den til konduktøren.' },
  { variant: 'success', title: 'To lys er tent', text: 'Adventsstaken går som normalt. Ingen forsinkelser på 2. søndag i advent.' },
  { variant: 'information', title: 'Endret rute for ferja', text: 'Ferja tar med seg et juletre på dekk. Passasjerer bes ikke pynte kapteinen.' },
  { variant: 'warning', title: 'Stor pågang', text: 'Ni reinsdyr har valgt kollektivt i rushtiden. Beregn ekstra tid.' },
  { variant: 'information', title: 'Feil i søket', text: 'Søker du på «risengrynsgrøt», får du forslag til Nisse ferdig. Vi retter det etter jul.' },
  { variant: 'success', title: 'Luciatoget er i rute', text: 'Santa Lucia går på T-banen i dag. Lyset er grønt, dørene lukkes.' },
  { variant: 'warning', title: 'Sporarbeid', text: 'Mellom Kontoret og Julaften erstattes toget av slede. Beregn tid til mandarinpause.' },
  { variant: 'information', title: 'Sju slag', text: 'I stedet for sju slag kaker tilbyr vi sju transportmidler i én reise.' },
  { variant: 'warning', title: 'Feil i sanntid', text: 'Det står «4 min» i appen, men det er bussen. Toget er allerede gått.' },
  { variant: 'information', title: 'Glemte gjenstander', text: 'Mange julestrømper er funnet på perrongene. Hentes i luka på Oslo S.' },
  { variant: 'success', title: 'Flere vogner', text: 'Vi setter inn ekstra vogner for alle som skal hjem til jul. Englene sitter bakerst.' },
  { variant: 'information', title: 'Strikkevogn', text: 'Vogn 3 er reservert for strikking. Rundpinner må holdes under 40 cm.' },
  { variant: 'negative', title: 'Studentrabatt avvist', text: 'Nissen har studert alle ønskelister, men har dessverre ikke gyldig studentbevis.' },
  { variant: 'information', title: 'Årets lengste natt', text: 'Nattoget går som planlagt. Nisselua kan brukes som sovemaske.' },
  { variant: 'warning', title: 'Pakketoget er fullt', text: 'Passasjerer med mer enn 40 pakker bes vente på neste avgang.' },
  { variant: 'negative', title: 'Mandel i sporet', text: 'Grøtekspressen står ved Lillejul stasjon. Den som finner mandelen, får marsipangris.' },
  { variant: 'success', title: 'Ankommet Julaften', text: 'Takk for reisen med Polarekspressen. God jul fra alle oss i Entur!' },
];

// Resten av året roterer disse, én per dag.
export const ALL_YEAR = [
  { variant: 'information', title: 'Julebordsesongen nærmer seg', text: 'Det blir økt pågang på nattbussene fra november. Husk å ta med reflekser og nissestemning.' },
  { variant: 'warning', title: 'Glatte perronger', text: 'Høstløv og tidlig frost. Julestemningen kan skli ut, så hold deg i rekkverket.' },
  { variant: 'information', title: 'Nissen på kurs', text: 'Julenissen tar Entur-appen-kurs denne uka. Bær over med ham i billettkøen.' },
  { variant: 'warning', title: 'Forsinket juleøl', text: 'Lasten fra bryggeriet står i kø ved Lysaker. Forventet ankomst i god tid før jul.' },
  { variant: 'information', title: 'Nye reinsdyr i trafikk', text: 'Tre nye reinsdyr er i opplæring på linje N1. De kan være litt ustødige i svingene.' },
  { variant: 'negative', title: 'Pepperkakebyen er stengt', text: 'Byggingen pågår fortsatt. Planlagt åpning første søndag i advent.' },
  { variant: 'success', title: 'Verkstedet er i rute', text: 'Nissene melder at gaveproduksjonen ligger foran skjema. Ingen forsinkelser ventet.' },
  { variant: 'information', title: 'Ønskelister mottatt', text: 'Postterminalen på Nordpolen har tatt imot rekordmange ønskelister. Behandlingstid: til julaften.' },
  { variant: 'warning', title: 'Tidlig julemusikk', text: 'Det er meldt om julesanger på Nationaltheatret stasjon. Det er fortsatt tidlig.' },
  { variant: 'information', title: 'Mørketid', text: 'Lysene i togvinduene er nå satt på kosemodus. Ta med en god bok.' },
  { variant: 'success', title: 'Sleden har bestått EU-kontroll', text: 'Bremsene, bjellene og nesa til Rudolf er godkjent for en ny sesong.' },
  { variant: 'warning', title: 'Snøfall på fjellet', text: 'Det er meldt snø på Bergensbanen. Nissen tar det som et godt tegn.' },
];

function dayOfYear(date) {
  return Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 1)) / 86400000);
}

export function getDailyAvvik(now) {
  if (now.getMonth() === 11 && now.getDate() <= 24) return DECEMBER[now.getDate() - 1];
  return ALL_YEAR[dayOfYear(now) % ALL_YEAR.length];
}
