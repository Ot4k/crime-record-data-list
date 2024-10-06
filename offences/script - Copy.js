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

  // Array to store criminal records
  let criminalRecords = [];

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
    const crime = document.getElementById("crime").value;

    if (!crime) {
      return false;
    }

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

    if (consequence === "0") {
      viewMessages.innerHTML = `The fine is $${fine.toLocaleString()}`;
      viewOthers.innerHTML =
        "Please do well to pay your fine on time to avoid going to jail.";
    } else if (consequence === "1") {
      viewMessages.innerHTML = `The jail time is ${jail.toFixed(1)} years`;
      viewOthers.innerHTML =
        "Please do well to remain well-behaved as you serve your sentence.";
    }

    viewNames.innerHTML = "Name: " + name;
    viewContacts.innerHTML = "Contact: " + contact;
    viewAddresss.innerHTML = "Address: " + address;
    return { fine, jail };
  }

  function validateForm() {
    const name = toString(document.getElementById("name").value);
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const crime = document.getElementById("crime").value.trim();

    if (!name || !age || !address || !contact) {
      alert("Please fill in all the required fields.");
      return false;
    } else if (age < 18) {
      alert("You are too young to be convicted of a crime");
      return false;
    } else if (contact.length < 11) {
      alert("Please enter a valid contact number");
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

    return true;
  }

  const criminalInfo = document.getElementById("form-container");
  document
    .querySelector(".btn")
    .addEventListener("click", function userInfo(event) {
      event.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const wrap = document.querySelector(".wrapper");

      if (user === "admin" && pass === "admin") {
        wrap.classList.add("hidden");
        criminalInfo.classList.remove("hidden");
      } else {
        alert("Enter the correct username and password.");
      }
    });

  document.querySelector(".btn4").addEventListener("click", (event) => {
    event.preventDefault();
    console.log(criminalInfo);

    if (validateForm()) {
      const criminalInfo = document.getElementById("form-container");
      const contain = document.getElementById("container");

      criminalInfo.classList.add("hidden");
      contain.classList.remove("hidden");
    }
  });

  document.getElementById("mainbtn").addEventListener("click", (event) => {
    event.preventDefault();

    if (validateForm()) {
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const address = document.getElementById("address").value;
      const contact = document.getElementById("contact").value;
      const crime = document.getElementById("crime").value;
      const consequence = document.getElementById("consequence").value;

      // Get fine and jail time from showConsequences
      const { fine, jail } = showConsequences();

      // Store data
      const newCriminalRecord = {
        name,
        age,
        address,
        contact,
        crime,
        consequence,
        fine,
        jail,
      };

      criminalRecords.push(newCriminalRecord);

      const contain = document.getElementById("container");
      const viewBoxx = document.getElementById("viewBox");

      if (jail) {
        contain.classList.add("hidden");
        viewBoxx.classList.remove("hidden");
      } else {
        alert("Please select a crime.");
      }
    }
  });

  document.getElementById("btnspecial").addEventListener("click", () => {
    const viewBoxx = document.getElementById("viewBox");
    const criminalInfo = document.getElementById("form-container");

    // Clear all input fields within the criminalInfo form
    const inputs = criminalInfo.querySelectorAll("input");
    inputs.forEach((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        input.type === "tel"
      ) {
        input.value = ""; // Clear text and number fields
      } else if (input.type === "radio" || input.type === "checkbox") {
        input.checked = false; // Uncheck radio and checkbox fields
      }
    });

    // Clear all select fields within the criminalInfo form
    const selects = criminalInfo.querySelectorAll("select");
    selects.forEach((select) => {
      select.selectedIndex = 0; // Reset select fields to the first option
    });

    // Clear the subcategories div
    const subcategoriesDiv = document.getElementById("subcategories");
    subcategoriesDiv.innerHTML = "";

    // Hide the viewBox and show the criminalInfo form
    viewBoxx.classList.add("hidden");
    criminalInfo.classList.remove("hidden");
  });

  document.getElementById("exitBtn").addEventListener("click", function () {
    const viewBoxx = document.getElementById("viewBox");
    const wrap = document.querySelector(".wrapper"); // Assuming .wrapper is the login page container

    // Clear all input fields within the login form (wrap)
    const wrapInputs = wrap.querySelectorAll("input");
    wrapInputs.forEach((input) => {
      if (input.type === "text" || input.type === "password") {
        input.value = ""; // Clear text and password fields
      }
    });

    // Hide the viewBox and show the login form (wrap)
    viewBoxx.classList.add("hidden");
    wrap.classList.remove("hidden");
  });

  // New Button to View All Records
  const viewAllBtn = document.createElement("button");
  viewAllBtn.textContent = "View All Records";
  viewAllBtn.classList.add("view-rec");
  document.body.appendChild(viewAllBtn);

  viewAllBtn.addEventListener("click", function () {
    const recordsPage = document.getElementById("recordsPage");
    const recordsList = document.getElementById("recordsList");

    recordsList.innerHTML = ""; // Clear previous records

    criminalRecords.forEach((record) => {
      const recordItem = document.createElement("li");
      recordItem.classList.add("rec-list")
      recordItem.innerHTML = `
          <span><strong>Name:</strong> ${record.name}</span>
      <span><strong>Age:</strong> ${record.age}</span>
      <span><strong>Address:</strong> ${record.address}</span>
      <span><strong>Contact:</strong> ${record.contact}</span>
      <span><strong>Crime:</strong> ${record.crime}</span>
      <span><strong>Fine:</strong> $${record.fine.toLocaleString()}</span>
      <span><strong>Jail Time:</strong> ${record.jail.toFixed(1)} years</span>
        `;

      // recordItem.innerHTML = `
      //     <li>Name: ${record.name}</li>
      //     <li>Age: ${record.age}</li>
      //     <li>Address: ${record.address}</li>
      //     <li>Contact: ${record.contact}</li>
      //     <li>Crime: ${record.crime}</li>
      //     <li>Consequence: ${record.consequence}</li>
      // `;

      recordsList.appendChild(recordItem);
    });

    criminalInfo.classList.add("hidden");
    recordsPage.classList.remove("hidden");
  });

  userInfo();
});

// HTML Structure for Viewing All Records
// Add this to your HTML file within the body tag

/*
<div id="recordsPage" class="hidden">
  <h2>Criminal Records</h2>
  <ul id="recordsList"></ul>
  <button id="backBtn">Back</button>
</div>
*/

// Back button functionality to return to the form
document.getElementById("backBtn").addEventListener("click", function () {
  const recordsPage = document.getElementById("recordsPage");
  const criminalInfo = document.getElementById("form-container");

  recordsPage.classList.add("hidden");
  criminalInfo.classList.remove("hidden");
});
