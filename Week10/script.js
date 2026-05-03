const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const dateText = document.getElementById("date");
const btn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

// ✅ 更多貨幣（加分）
const currencies = [
  "USD", "TWD", "JPY", "EUR", "GBP", "AUD", "CAD", "CNY", "HKD", "KRW"
];

// 動態生成選單
function loadCurrencies() {
  currencies.forEach(cur => {
    fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
    toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  });

  fromCurrency.value = "USD";
  toCurrency.value = "TWD";
}

loadCurrencies();

// 🔁 交換貨幣（加分）
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
});

// 點擊轉換
btn.addEventListener("click", convertCurrency);

async function convertCurrency() {
  const amount = amountInput.value.trim();
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // ✅ 輸入檢查（加分）
  if (amount === "") {
    result.textContent = "請輸入金額";
    return;
  }

  if (isNaN(amount)) {
    result.textContent = "請輸入數字";
    return;
  }

  if (amount <= 0) {
    result.textContent = "金額需大於 0";
    return;
  }

  result.textContent = "查詢中...";
  dateText.textContent = "";

  try {
    const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API 錯誤");
    }

    const data = await response.json();

    const rate = data.rate;
    const date = data.date;

    const converted = (amount * rate).toFixed(2);

    // ✅ 顯示結果 + 日期（加分）
    result.textContent = `${amount} ${from} = ${converted} ${to}`;
    dateText.textContent = `匯率日期：${date}`;

  } catch (error) {
    result.textContent = "查詢失敗";
    console.error(error);
  }
}