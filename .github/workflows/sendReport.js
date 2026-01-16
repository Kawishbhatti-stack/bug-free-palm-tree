import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const data = req.body;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { email: "YOUR_VERIFIED_EMAIL@domain.com" }, 
        to: [{ email: "kawishbhatti@gmail.com" }], 
        subject: "Daily Calorie & BMI Report",
        htmlContent: `
          <h2>Daily Report</h2>
          <p>Date: ${data.date}</p>
          <p>Total Calories: ${data.totalCalories}</p>
          <p>Calories Left: ${data.caloriesLeft}</p>
          <p>BMI: ${data.bmi}</p>
          <p>Meals: ${data.meal1}, ${data.meal2}, ${data.meal3}, ${data.meal4}, ${data.meal5}</p>
          <p>Drink: ${data.drink}</p>
          <p>Extra: ${data.extra}</p>
        `
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}