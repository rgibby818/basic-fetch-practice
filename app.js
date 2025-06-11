const Options = {
  ALL: "all",
  UNDER_TEN_YEARS: "under_ten_years",
};
const getUsersButton = document.getElementById("get-all-users");
const getUsersUnderTenYearsButton = document.getElementById(
  "get-users-under-10-years"
);
const resetButton = document.getElementById("reset");

async function getUsers() {
  try {
    const response = await fetch(
      "https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json"
    );
    if (!response.ok) {
      throw new Error(`Unable to fetch url:\n\t ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

async function displayUsers(option) {
  const users = await getUsers();
  users.forEach((user) => {
    if (option == Options.ALL) {
      document.body.append(
        createUser(
          `${user.firstName} ${user.lastName}`,
          user.email,
          user.companyName,
          user.yearsEmployed
        )
      );
    } else {
      if (user.yearsEmployed < 10) {
        document.body.append(
          createUser(
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.companyName,
            user.yearsEmployed
          )
        );
      }
    }
  });
}

function createUser(name, email, company = "N/A", yearsEmployed) {
  const article = document.createElement("article");
  article.className = "user-container";

  const userName = document.createElement("p");
  userName.className = "item name";
  userName.textContent = name;

  const userEmail = document.createElement("p");
  userEmail.className = "item email";
  userEmail.textContent = email;

  const companyName = document.createElement("p");
  companyName.className = "item company";
  companyName.textContent = company;

  const years = document.createElement("p");
  years.className = "item years-employed";
  years.textContent = `Years Employed: ${yearsEmployed}`;

  article.append(userName, userEmail, companyName, years);
  return article;
}

function resetUsers() {
  const users = Array.from(document.getElementsByClassName("user-container"));
  users.forEach((user) => user.remove());
}

getUsersButton.addEventListener("click", () => {
  resetUsers();
  displayUsers(Options.ALL);
});

getUsersUnderTenYearsButton.addEventListener("click", () => {
  resetUsers();
  displayUsers(Options.UNDER_TEN_YEARS);
});

resetButton.addEventListener("click", () => {
  resetUsers();
});
