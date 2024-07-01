
/**
 * 指定したメッセージのダイジェスト(SHA-256によるハッシュ値)(で解決されるプロミス)を返す
 * https://developer.mozilla.org/ja/docs/Web/API/SubtleCrypto/digest
 * @param {string} message 
 * @returns {Promise<string>}
 */
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // (utf-8 の) Uint8Array にエンコードする
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // メッセージをハッシュする
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // バッファーをバイト列に変換する
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // バイト列を 16 進文字列に変換する
  return hashHex;
}

function log_hash(text) {
  digestMessage(text).then((digestHex) => console.log(digestHex));
}



// 使用例↓

const hashed_answers = [
  "2a2bf4ab39c1174cbbc5ceec198f7985749cba4376af4dac0f99d2b13a7f57c2", // "sample answer"
  "c3a57afaa51d985ac0b4117f509e2ce6dd94d520e441778736a945b4cb941755", // "secret value"
  "b3a6c221a71a952cb30b85cf2a0c2ec6ceb2d68b1df5cc0f1d3ffb37e5620419" // 解析不可能にできる
];

/**
 * 指定したテキストのハッシュが hashed_answers に含まれるかどうか(で解決されるプロミス)を返す
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
async function judge_answer (text) {
  let text_hash = await digestMessage(text);
  for (let i = 0; i < hashed_answers.length; i++) {
    if (text_hash === hashed_answers[i]) {
      return true;
    }
  }
  return false;
}

function log_judge_answer (text) {
  judge_answer(text).then((result) => console.log(result));
}

/**@type {HTMLInputElement} */
const input_text = document.getElementById("text");
/**@type {HTMLInputElement} */
const input_button = document.getElementById("button");
/**@type {HTMLSpanElement} */
const span_label = document.getElementById("label");

input_button.addEventListener("click", function (event) {
  let text = input_text.value;
  judge_answer(text).then((result) => {
    if (result) {
      span_label.innerText = "正解";
    }else{
      span_label.innerText = "不正解";
    }
  })
});
