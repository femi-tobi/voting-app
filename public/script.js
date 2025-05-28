document.addEventListener("DOMContentLoaded", () => {
  const voteForm = document.getElementById("voteForm");
  const emailInput = document.getElementById("emailInput");
  const submitBtn = document.getElementById("submitBtn");
  const chartsContainer = document.getElementById("chartsContainer");

    const positions = {
    "Chairman": ["JIMOH ISIAKA", "EJIKI EBERECHI"],
    "Vice Chairman": ["GBEMINIYI TAIWO"],
    "General Secetary": ["ONI MARY", "ECHENINI EMMANUEL CHIDI"],
    "Ass General Secetary": ["AJADI WASIU"],
    "Treasurer": ["MAKINDE E.O", "OBIDEYI FUNMI"],
    "Finacial Secetary": ["NDUKWE EUCHARIA", "IKECHUKWU MORAH"],
    "Auditor": ["OJUGBELE OYEDE RONKE"]
  };

  for (const [position, candidates] of Object.entries(positions)) {
    const section = document.createElement("div");
    section.innerHTML = `<h3 class="font-semibold">${position}</h3>` +
      candidates.map(candidate => `
        <label class="block">
          <input type="radio" name="${position}" value="${candidate}" class="mr-2">
          ${candidate}
        </label>`).join("");
    voteForm.appendChild(section);
  }

  submitBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const votes = {};
    for (const position of Object.keys(positions)) {
      const selected = voteForm.querySelector(`input[name="${position}"]:checked`);
      if (selected) votes[position] = selected.value;
    }

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, votes })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) loadCharts();
  });

  async function loadCharts() {
    const res = await fetch("/api/results");
    const data = await res.json();
    chartsContainer.innerHTML = "";
    for (const [position, result] of Object.entries(data)) {
      // const canvas = document.createElement("canvas");
      const wrapper = document.createElement("div");
// Tailwind styles: fixed width and height for each chart
wrapper.className = "w-[300px] h-[200px] mx-auto bg-white p-4 rounded shadow";

const canvas = document.createElement("canvas");
wrapper.appendChild(canvas);
chartsContainer.appendChild(wrapper);

      
      // chartsContainer.appendChild(canvas);
      new Chart(canvas.getContext("2d"), {
  type: "bar",
  data: {
    labels: Object.keys(result),
    datasets: [{
      label: `Votes for ${position}`,
      data: Object.values(result),
      backgroundColor: "#60A5FA",
      borderColor: "#2563EB",
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: position
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
});

    }
  }

  loadCharts();
  setInterval(loadCharts, 3000);
});
