'use strict';//厳格モードにする（より的確なエラーチェック）
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');//上四行はidを取得

assessmentButton.onclick = () => {//アロー関数が使われている、assessmentBottonに関数を指定
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = "";//ボタンが押された際に診断結果表示エリア内の内容を空にする動作
  const header = document.createElement('h3');//診断結果と表示されるh3タグを作る
  header.innerText = '診断結果';
  resultDivided.appendChild(header);//四行目のresultdivided,div要素に追加

  const paragraph = document.createElement('p');//pタグを作る
  const result = assessment(userName);
  paragraph.innerText = result;//pタグの中身(assessment関数で取得した戻り値)
  resultDivided.appendChild(paragraph);//四行目のresultdivided,div要素に追加

  // ツイートエリアの作成
  tweetDivided.innerText = "";//ボタンが押された際にツイートエリア内の内容を空にする動作
  const anchor = document.createElement('a');//aタグを作る
  const hrefValue =//aタグのhrefタグを操作
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +//エンコードとは情報をデータに置き換える
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);//hrefVale属性の追加
  anchor.className = 'twitter-hashtag-button';//classsの名前
  anchor.setAttribute('data-text', result);//result属性の追加
  anchor.innerText = 'Tweet #あなたのいいところ';//aタグの中身
  tweetDivided.appendChild(anchor);//五行目のtweetDivided,div要素に追加

  // widgets.js の設定
  const script = document.createElement('script');//scriptタグを作る
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');//srcに属性を追加
   tweetDivided.appendChild(script)//tweetDivided,div要素に追加
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {//assessment関数を作る
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {//userNameの長さ以下まで１ずつ足していく
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);//sumOfCharCodeにuserNameの文字コード分足していく
  }
    
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;//７２行目で出したsumOfCharCodeを診断結果の数で割っていって余りを出す
  let result = answers[index];//戻り値にする診断結果を決める

  result = result.replaceAll('{userName}', userName);//replaceAll関数で{userName}とuserNameを交換して診断結果の中にユーザーの名前を入れる
  return result;//結果を戻す
}

// テストコード
console.assert(//正しいか確かめる
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',//太郎と入力した際に診断結果に出てくるものとして正しいもの
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'//正しくない場合に表示される文章
);
console.assert(
  assessment('太郎') === assessment('太郎'),//入力する名前が同じ場合こうなる
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'//正しくない場合に表示される文章
);