const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

askBtn.addEventListener("click", async () => {
  try {
    const question = questionInput.value;

    if (!question){
      answer.textContent = "Please enter a question.";
      return;
    }

     answer.textContent = "Thinking...";

    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    answer.textContent = data.answer;

  } catch (error) {
    console.error(error);
    answer.textContent = "Failed to get answer.";
  }
});