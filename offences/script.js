document.addEventListener("DOMContentLoaded", function () {
  const crimeSelect = document.getElementById("crime");
  const subcategoriesDiv = document.getElementById("subcategories");

  const subcategories = {
    embezzlement: [
      { id: "amountStolen", label: "Amount Stolen (in USD)", type: "input" },
      {
        id: "duration",
        label: "Duration",
        options: ["Less than 1 year", "1-5 years", "More than 5 years"],
      },
    ],
    bribery: [
      { id: "amountOfBribe", label: "Amount of Bribe (in USD)", type: "input" },
      {
        id: "purposeOfBribe",
        label: "Purpose of Bribe",
        options: ["Political Favors", "Contract Awarding", "Legal Outcomes"],
      },
    ],
    fraudulentcontracts: [
      {
        id: "contractValue",
        label: "Value of Contract (in USD)",
        type: "input",
      },
    ],
    "abuse-of-power": [
      {
        id: "positionHeld",
        label: "Position Held",
        options: ["High Official", "Middle Management", "Low Level"],
      },
      {
        id: "typeOfAbuse",
        label: "Type of Abuse",
        options: ["Discrimination", "Unfair Treatment"],
      },
    ],
    "money-laundering": [
      {
        id: "amountLaundered",
        label: "Amount Laundered (in USD)",
        type: "input",
      },
    ],
  };

  function updateSubcategories() {
    const crime = crimeSelect.value;
    subcategoriesDiv.innerHTML = "";

    if (crime && subcategories[crime]) {
      subcategories[crime].forEach((category) => {
        const label = document.createElement("label");
        label.textContent = category.label;
        subcategoriesDiv.appendChild(label);

        if (category.type === "input") {
          const input = document.createElement("input");
          input.type = "number";
          input.id = category.id;
          input.placeholder = "Enter value";
          subcategoriesDiv.appendChild(input);
        } else {
          const select = document.createElement("select");
          select.id = category.id;
          select.innerHTML = category.options
            .map((option) => `<option value="${option}">${option}</option>`)
            .join("");
          subcategoriesDiv.appendChild(select);
        }

        subcategoriesDiv.appendChild(document.createElement("br"));
      });
    }
  }

  crimeSelect.addEventListener("change", updateSubcategories);

  function showConsequences() {
    const consequence = document.getElementById("consequence").value;
    // if (!consequence) {
    //   alert("Please select a consequence.");
    //   return;
    // }

    let fine = 0;
    let jail = 0;

    switch (crime) {
      case "embezzlement":
        const amountStolen =
          document.getElementById("amountStolen").valueAsNumber || 0;
        const duration = document.getElementById("duration").value;

        fine = amountStolen * 2;
        if (duration === "Less than 1 year") {
          jail = 1 + amountStolen / 5000;
        } else if (duration === "1-5 years") {
          jail = 5 + amountStolen / 3000;
        } else if (duration === "More than 5 years") {
          jail = 10 + amountStolen / 1000;
        }
        break;

      case "bribery":
        const amountBribed =
          document.getElementById("amountOfBribe").valueAsNumber || 0;
        const purposeBribe = document.getElementById("purposeOfBribe").value;

        fine = amountBribed * 2;
        if (purposeBribe === "Political Favors") {
          jail = 5 + amountBribed / 10000;
        } else if (purposeBribe === "Contract Awarding") {
          jail = 3 + amountBribed / 8000;
        } else if (purposeBribe === "Legal Outcomes") {
          jail = 7 + amountBribed / 5000;
        }
        break;

      case "fraudulentcontracts":
        const contractValue =
          document.getElementById("contractValue").valueAsNumber || 0;
        fine = contractValue * 1.5;
        jail = contractValue / 20000;
        break;

      case "abuse-of-power":
        const positionHeld = document.getElementById("positionHeld")
          ? document.getElementById("positionHeld").value
          : "";
        const typeOfAbuse = document.getElementById("typeOfAbuse")
          ? document.getElementById("typeOfAbuse").value
          : "";

        if (positionHeld === "High Official") {
          fine = 100000;
          jail = typeOfAbuse === "Discrimination" ? 10 : 5;
        } else if (positionHeld === "Middle Management") {
          fine = 50000;
          jail = typeOfAbuse === "Discrimination" ? 5 : 2;
        } else if (positionHeld === "Low Level") {
          fine = 20000;
          jail = typeOfAbuse === "Discrimination" ? 3 : 1;
        }
        break;

      case "money-laundering":
        const amountLaundered =
          document.getElementById("amountLaundered").valueAsNumber || 0;
        fine = amountLaundered * 2;
        jail = amountLaundered / 10000;
        break;
    }

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const viewNames = document.getElementById("viewName");
    const viewAddresss = document.getElementById("viewAddress");
    const viewContacts = document.getElementById("viewContact");
    const viewMessages = document.getElementById("viewMessage");
    const viewOthers = document.getElementById("viewOther");

    viewNames.innerHTML = `Name: ${name}`;
    viewAddresss.innerHTML = `Address: ${address}`;
    viewContacts.innerHTML = `Contact: ${contact}`;

    if (consequence === "0") {
      viewMessages.innerHTML = `The fine is $${fine.toLocaleString()}`;
      viewOthers.innerHTML =
        "Please do well to pay your fine on time to avoid going to jail.";
    } else if (consequence === "1") {
      viewMessages.innerHTML = `The jail time is ${jail.toFixed(1)} years`;
      viewOthers.innerHTML =
        "Please do well to remain well-behaved as you serve your sentence.";
    }
  }

  function validateForm() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const crime = document.getElementById("crime").value;

    if (!crime) {
      alert("Please select a crime.");
      return false;
    }

    const subcategoryIds =
      subcategories[crime]?.map((category) => category.id) || [];
    for (let id of subcategoryIds) {
      const element = document.getElementById(id);
      if (element && !element.value) {
        alert(
          `Please fill in the ${element.previousElementSibling.textContent}.`
        );
        return false;
      }
    }

    // if (!name || !age || !address || !contact) {
    //   alert("Please fill in all the required fields.");
    //   return false;
    // }

    return true;
  }

  document
    .querySelector(".btn")
    .addEventListener("click", function userInfo(event) {
      event.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const wrap = document.querySelector(".wrapper");
      const criminalInfo = document.getElementById("form-container");

      if (user === "admin" && pass === "admin") {
        wrap.classList.add("hidden");
        criminalInfo.classList.remove("hidden");
      } else {
        alert("Enter the correct username and password.");
      }
    });

  document.querySelector(".btn4").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      const criminalInfo = document.getElementById("form-container");
      const contain = document.getElementById("container");

      criminalInfo.classList.add("hidden");
      contain.classList.remove("hidden");
    } else {
      alert("Please fill in all the required fields and select a crime.");
    }
  });

  document
    .getElementById("mainbtn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission
      if (validateForm()) {
        const viewBoxx = document.getElementById("viewBox");
        const contain = document.getElementById("container");

        contain.classList.add("hidden");
        viewBoxx.classList.remove("hidden");
        showConsequences();
      } else {
        alert("Please fill in all the required fields and select a crime.");
      }
    });
});
