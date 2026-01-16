const fetch = require("node-fetch")

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    }
  }

  const data = JSON.parse(event.body)

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { email: "a03651001@smtp-brevo.com" },
        to: [{ email: "kawishbhatti@gmail.com" }],
        subject: "Daily Calorie Report",
        htmlContent: `
        <h3>Daily Calorie Report</h3>
        <p>Date: ${data.date}</p>
        <p>Total Calories: ${data.totalCalories}</p>
        <p>Calories Left: ${data.caloriesLeft}</p>
        <p>BMI: ${data.bmi}</p>
        <p>Meals: ${data.meals}</p>
        <p>Drink: ${data.drink}</p>
        <p>Extra: ${data.extra}</p>
        `
      })
    })

    const result = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
}
