# ハッシュ値を用いた正誤判定
答えのハッシュ値を保管することにより、答えを解析されずに、解答の正誤判定をクライアントサイドのみでできます

## 使い方
### ①解答をハッシュ化する
次のコードをコンソールで実行し、ログをコピーする。
``` javascript
log_hash("答え");
```
コピーした文字を変数に保存しておく。
``` javascript
const hashed_answer = "3fa509879d6361f21739c0a9f7077af197fd375949da82dcdecbcbe2b1c92cd1";
```
### ②入力をハッシュ化し、比較する
``` javascript
digestMessage("入力された文字列")
.then((result) => console.log(result === hashed_answer));
```

クライアントサイドのコードのみで完結するため、静的サイト(GitHub Pages など)で使える。
javascript コードを覗かれても、答えのハッシュ値しかわからないため、解析できない。
