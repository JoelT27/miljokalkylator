const questions = [
    { question: "Hur ofta äter du kött eller köttprodukter?", options: ["Aldrig", "1-2 gånger/vecka", "3-4 gånger/vecka", "Dagligen"], scores: [0, 2, 4, 6], co2: [0, 50, 100, 150] },
    { question: "Hur ofta använder du miljövänliga transportmedel (cykel, gång, kollektivtrafik)?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 2, 4, 6], co2: [0, 50, 100, 200] },
    { question: "Hur många flygresor gör du per år?", options: ["Aldrig", "1-2 gånger/år", "3-5 gånger/år", "Fler än 5 gånger/år"], scores: [0, 3, 5, 7], co2: [0, 200, 500, 1000] },
    { question: "Hur ofta duschar du längre än 10 minuter?", options: ["Aldrig", "1-2 gånger/vecka", "3-4 gånger/vecka", "Dagligen"], scores: [0, 1, 3, 5], co2: [0, 20, 50, 100] },
    { question: "Hur ofta handlar du lokalt producerad mat?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta använder du plastpåsar?", options: ["Aldrig", "1-2 gånger/vecka", "3-4 gånger/vecka", "Dagligen"], scores: [0, 1, 3, 5], co2: [0, 5, 10, 20] },
    { question: "Hur ofta återvinner du papper och plast?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta använder du bil istället för kollektivtrafik?", options: ["Aldrig", "1-2 gånger/vecka", "3-4 gånger/vecka", "Dagligen"], scores: [0, 2, 4, 6], co2: [0, 100, 200, 300] },
    { question: "Hur ofta köper du kläder?", options: ["Sällan", "Några gånger/år", "Flera gånger/månaden", "Varje vecka"], scores: [0, 2, 4, 6], co2: [0, 50, 100, 200] },
    { question: "Hur ofta handlar du second-hand?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta reser du med tåg istället för flyg?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 20, 50, 100] },
    { question: "Hur ofta släcker du ljuset när du lämnar ett rum?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 2, 4], co2: [0, 5, 10, 20] },
    { question: "Hur ofta köper du energisnåla produkter?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 2, 4], co2: [0, 5, 10, 20] },
    { question: "Hur ofta renoverar du ditt hem?", options: ["Sällan", "1-2 gånger/år", "Flera gånger/år", "Varje månad"], scores: [0, 2, 4, 6], co2: [0, 100, 200, 300] },
    { question: "Hur ofta äter du på restaurang?", options: ["Aldrig", "1 gång/vecka", "2-3 gånger/vecka", "Dagligen"], scores: [0, 2, 4, 6], co2: [0, 20, 50, 100] },
    { question: "Hur ofta tvättar du kläder med full maskin?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta flyger du inrikes?", options: ["Aldrig", "1 gång/år", "2-3 gånger/år", "Flera gånger/år"], scores: [0, 1, 3, 5], co2: [0, 100, 300, 500] },
    { question: "Hur ofta komposterar du matavfall?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta cyklar eller går du till jobbet/skolan?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 10, 30, 50] },
    { question: "Hur ofta lagar du mat hemma?", options: ["Alltid", "Ofta", "Sällan", "Aldrig"], scores: [0, 1, 3, 5], co2: [0, 30, 60, 90] }
];

const europeanCountriesCO2 = {
    "Sweden": 8000,
    "Germany": 8500,
    "France": 5000,
    "Spain": 6000,
    "Italy": 7000
};

let currentQuestionIndex = 0;
let totalScore = 0;
let totalCO2 = 0;

window.onload = function () {
    createCountrySelector();
    showQuestion(currentQuestionIndex);
};

function createCountrySelector() {
    const selectorDiv = document.createElement('div');
    selectorDiv.id = 'countrySelector';
    selectorDiv.innerHTML = `
        <label for="country">Välj ett europeiskt land för jämförelse:</label>
        <select id="country">
            ${Object.keys(europeanCountriesCO2).map(country => `<option value="${country}">${country}</option>`).join('')}
        </select>
    `;
    document.getElementById('calculator-page').prepend(selectorDiv);
}

function showQuestion(index) {
    const quizContainer = document.getElementById('environmentQuiz');
    quizContainer.innerHTML = '';

    const currentQuestion = questions[index];
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${currentQuestion.question}</p>`;

    currentQuestion.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="question${index}" value="${currentQuestion.scores[i]}" data-co2="${currentQuestion.co2[i]}"> ${option}
        `;
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement('br'));
    });

    quizContainer.appendChild(questionDiv);

    if (index > 0) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Tillbaka';
        backButton.onclick = function () {
            goToPrevQuestion();
        };
        quizContainer.appendChild(backButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = index === questions.length - 1 ? 'Visa resultat' : 'Nästa fråga';
    nextButton.onclick = function () {
        goToNextQuestion();
    };
    quizContainer.appendChild(nextButton);
}

function goToNextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert("Välj ett svar innan du går vidare.");
        return;
    }

    totalScore += parseInt(selectedOption.value);
    totalCO2 += parseInt(selectedOption.getAttribute('data-co2'));

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showFinalScore();
    }
}

function goToPrevQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        totalScore -= parseInt(selectedOption.value);
        totalCO2 -= parseInt(selectedOption.getAttribute('data-co2'));
    }

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showFinalScore() {
    const quizContainer = document.getElementById('environmentQuiz');
    quizContainer.innerHTML = '';

    const selectedCountry = document.getElementById('country').value;
    const countryCO2 = europeanCountriesCO2[selectedCountry];

    const summary = document.createElement('div');
    summary.innerHTML = `
        <h2>Resultat</h2>
        <div>
            <h3>Din poäng</h3>
            <p><strong>Total poäng:</strong> ${totalScore}</p>
            <p><strong>Total CO₂-utsläpp:</strong> ${totalCO2} kg</p>
        </div>
        <div>
            <h3>Jämförelse med ${selectedCountry}</h3>
            <canvas id="co2Chart"></canvas>
        </div>
        <div>
            <h3>Förslag för att minska din miljöpåverkan</h3>
            <ul>
                <li>Ät mindre kött och välj vegetariska alternativ oftare.</li>
                <li>Använd kollektivtrafik, cykel eller gå istället för bil.</li>
                <li>Återvinn ditt avfall och sortera regelbundet.</li>
                <li>Byt till energisnåla lampor och apparater.</li>
            </ul>
        </div>
    `;

    quizContainer.appendChild(summary);

    // Skapa grafen
    const ctx = document.getElementById('co2Chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dina utsläpp', selectedCountry],
            datasets: [{
                label: 'CO₂-utsläpp (kg)',
                data: [totalCO2, countryCO2],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}