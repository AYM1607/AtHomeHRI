const url = "http://localhost:5050";

export async function stopRobot() {
  const response = await fetch(`${url}/stop`, {
    method: "POST",
  });
  return response.json();
}
