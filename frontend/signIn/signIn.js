document
  .getElementById("signinForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    try {
      const response = await fetch("http://127.0.0.1:3000/user/sign-in-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        document.getElementById("signinMessage").classList.remove("hidden");
      } else {
        console.error("Error:", response.statusText);
        document
          .getElementById("error-message-connexion")
          .classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

document
  .querySelector(".forgot-password-link")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    localStorage.setItem('loginEmail', loginEmail);
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/user/forgot-pass-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: loginEmail }),
        }
      );
      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        document.getElementById("signinMessage").textContent =
          "password reset link was sent to the client via email";
        document.getElementById("signinMessage").classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
