export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const data = await req.json();

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
        <h2>Daily Report</h2>
        <p>Total Calories: ${data.totalCalories}</p>
        <p>Calories Left: ${data.caloriesLeft}</p>
        <p>BMI: ${data.bmi}</p>
      `
    })
  });

  const result = await response.text();
  return new Response(result, { status: 200 });
};
