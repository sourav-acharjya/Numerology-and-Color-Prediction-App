// app.js
document
  .getElementById("numerologyForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const birthPlace = document.getElementById("birthPlace").value.trim();

    if (!name || !dob || !birthPlace) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate numerology numbers
    const lifePathNumber = calculateLifePathNumber(dob);
    const destinyNumber = calculateDestinyNumber(name);

    // Calculate color
    const baseColor = getColorByNumber(lifePathNumber);
    const finalColor = adjustColorByLocation(baseColor, birthPlace);

    // Display results
    displayResults(lifePathNumber, destinyNumber, finalColor);
  });

function displayResults(lifePath, destiny, color) {
  document.getElementById("numerologyForm").classList.add("hidden");
  const resultCard = document.getElementById("result");

  document.getElementById("lifePathNumber").textContent = lifePath;
  document.getElementById("destinyNumber").textContent = destiny;
  document.getElementById("soulColor").textContent = color;
  document.getElementById("colorDisplay").style.backgroundColor = color;

  resultCard.classList.remove("hidden");
}
