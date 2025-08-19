document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatesContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_]{1,15}$/;
        const isMatching = regex.test(username);

        if (!isMatching) {
            alert("Invalid Usename")
        }
        return isMatching;
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`)
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data) {
        const totalQues = data.totalQuestion;
        const totalEasyQues = data.totalEasy;
        const totalHardQues = data.totalHard;
        const totalMediumQues = data.totalMedium;

        const SolvedTotalQues = data.totalSolved;
        const solvedTotalEasy = data.easySolved;
        const solvedTotalMedium = data.mediumSolved;
        const SolvedTotalHard = data.hardSolved;

        updateProgress(solvedTotalEasy, totalEasyQues, easyLabel, easyProgressCircle)
        updateProgress(solvedTotalMedium, totalMediumQues, mediumLabel, mediumProgressCircle)
        updateProgress(SolvedTotalHard, totalHardQues, hardLabel, hardProgressCircle)

        const cardsData = [
            { label: "Total Questions", value: data.totalQuestions},
            { label: "Total Solved", value: SolvedTotalQues },
            { label: "Acceptance Rate", value: data.acceptanceRate },
            { label: "Ranking", value: data.ranking },
            { label: "ContributionPoints", value: data.contributionPoints},
            { label: "Reputation", value: data.reputation}
        ];

        cardStatesContainer.innerHTML = cardsData.map((cardData) => {
            return `
              <div class='card'>
              <h4>${cardData.label}</h4>
              <p>${cardData.value}</p>
              </div>
            `;
        }).join("");
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`

        try {
            searchButton.textContent = "Searching..."
            searchButton.disabled = true;
            console.log("hello");
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("unable to fetch the user details")
            }
            const data = await response.json();
            console.log(data);

            displayUserData(data);
        }
        catch (error) {
            statsContainer.innerHTML = `<p>No data found</p>`
        }
        finally {
            searchButton.textContent = "Search"
            searchButton.disabled = false;
        }
    }


    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        const username = usernameInput.value;

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }


    })
});