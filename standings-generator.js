const fs = require("fs-extra");

// Data dummy per event (bisa diubah nanti jadi real)
const events = [
  "Thailand", "Brazil", "Americas", "Spain", "France", "Catalunya",
  "Italy", "Hungary", "Czech", "Netherlands", "Germany", "UK",
  "Aragon", "San Marino", "Austria", "Japan", "Indonesia", "Australia",
  "Malaysia", "Qatar", "Portugal", "Valencia"
];

const riders = [
  "Edie O'Shea", "Joel Kelso", "Veda Pratama", "Zen Mitani", "Adrián Fernández",
  "Guido Pini", "Nicola Carraro", "Jesús Ríos", "Leo Rammerstorfer", "Casey O'Gorman",
  "Máximo Quiles", "Marco Morelli", "Adrián Cruces", "Scott Ogden", "Cormac Buchanan"
];

const pointsMap = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const output = [];

events.forEach((event, eventIndex) => {
  const standings = {};
  
  riders.forEach((rider, i) => {
    const pos = (i % 15) + 1;
    standings[rider] = pointsMap[pos - 1] || 0;
  });

  output.push({
    event: event,
    round: eventIndex + 1,
    standings: Object.keys(standings).map((rider, i) => ({
      pos: i + 1,
      rider: rider,
      points: standings[rider]
    }))
  });
});

fs.writeJsonSync("./standings.json", output, { spaces: 2 });
console.log(`✅ Standings per event berhasil dibuat (${events.length} event)`);
