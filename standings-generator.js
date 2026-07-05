const fs = require("fs-extra");

// Data dummy per event (bisa diubah nanti jadi real)
const events = [
  "Thailand", "Brazil", "Americas", "Spain", "France", "Catalunya",
  "Italy", "Hungary", "Czech", "Netherlands", "Germany", "UK",
  "Aragon", "San Marino", "Austria", "Japan", "Indonesia", "Australia",
  "Malaysia", "Qatar", "Portugal", "Valencia"
];

// Rider Moto2 2026 (24 rider sesuai daftar final)
const riders = [
  "Izan Guevara", "Alberto Ferrández", "Arón Canet", "Deniz Öncü",
  "Celestino Vietti", "Luca Lunetta", "Jorge Navarro", "Álex Escrig",
  "David Alonso", "Daniel Holgado", "Barry Baltus", "Tony Arbolino",
  "Mario Aji", "Taiyo Furusato", "Sergio García", "Alonso López",
  "Daniel Muñoz", "Adrián Huertas", "Manuel González", "Senna Agius",
  "Filip Salač", "Joe Roberts", "Iván Ortolá", "Ángel Piqueras"
];

const pointsMap = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const output = [];

events.forEach((event, eventIndex) => {
  const standings = {};

  // Putar posisi setiap event agar bervariasi (tidak selalu urutan yang sama)
  riders.forEach((rider, i) => {
    const pos = ((i + eventIndex) % 15) + 1;
    standings[rider] = pointsMap[pos - 1] || 0;
  });

  // Ubah object menjadi array yang terurut berdasarkan posisi
  const standingsArray = Object.keys(standings).map((rider) => ({
    pos: standings[rider] > 0 ? Object.values(standings).indexOf(standings[rider]) + 1 : 16,
    rider: rider,
    points: standings[rider]
  }));

  // Urutkan berdasarkan poin (descending) agar posisi benar
  standingsArray.sort((a, b) => b.points - a.points);

  // Perbaiki posisi setelah sorting
  standingsArray.forEach((item, index) => {
    item.pos = index + 1;
  });

  output.push({
    event: event,
    round: eventIndex + 1,
    standings: standingsArray
  });
});

fs.writeJsonSync("./standings.json", output, { spaces: 2 });
console.log(`✅ Standings Moto2 per event berhasil dibuat (${events.length} event)`);
