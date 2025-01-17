//
let setAgora = agoraStatesDiscussions;
if (localStorage.length === 0) {
  setLocal();
}
let saveGetLocal = localStorage.getItem("KEY");
let parsedLocal = JSON.parse(saveGetLocal);

setAgora = parsedLocal;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //객체를 매개변수로 받는다

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  //콘텐츠 영역
  const h_title = document.createElement("h2");
  h_title.className = "discussion__title";
  discussionContent.append(h_title);
  const anchor = document.createElement("a");
  anchor.href = obj.url;
  h_title.append(anchor);
  anchor.textContent = obj.title;

  //인포메이션 영역
  const information = document.createElement("div");
  information.className = "discussion__information";
  discussionContent.append(information);
  information.textContent = `${obj.author} 💕${obj.createdAt}`;
  //추가 질문지
  const btnParent = document.createElement("menu");
  btnParent.className = "parent";
  btnParent.id = parseInt(Math.random() * 100000);
  discussionContent.append(btnParent);
  const ask = document.createElement("textarea");
  ask.className = "asks";
  btnParent.append(ask);
  ask.textContent = obj.bodyHTML;
  const btn = document.createElement("button");
  btn.className = "click_button";
  btn.textContent = "클릭";
  btnParent.append(btn);

  //
  let toggle = false;
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    toggle = !toggle;
    toggle ? ask.classList.remove("asks") : ask.classList.add("asks");
  });
  //이미지영역
  const avatarImg = document.createElement("img");
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl; //obj.avatarUrl
  avatarImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);
  //체크박스영역
  const checked = document.createElement("p");
  discussionAnswered.append(checked);
  checked.textContent = checked.obj === null ? "❎" : "✅";

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

//
const submitHandler = document.querySelector(".form");
const setName = document.querySelector(".form__input--name #name");
const setTitle = document.querySelector(".form__input--title #name");
const setDiscussion = document.querySelector("#story");
//이벤트 발생할시 실행된다

submitHandler.addEventListener("submit", function (event) {
  event.preventDefault();
  const newSetName = setName.value;
  const newSetTitle = setTitle.value;
  const newSetDiscussion = setDiscussion.value;
  const newObj = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date(),
    title: newSetTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: newSetName,
    answer: null,
    bodyHTML: newSetDiscussion,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  };

  setAgora.unshift(newObj);
  setLocal();
  ul.prepend(convertToDiscussion(newObj));

  setName.value = "";
  setTitle.value = "";
  setDiscussion.value = "";
});

//localstorage 생성
function setLocal() {
  localStorage.setItem("KEY", JSON.stringify(setAgora));
}

//
const ul = document.querySelector("ul.discussions__container");
//ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 랜더링합니다
const render = (element) => {
  for (let i = 0; i < setAgora.length; i += 1) {
    //i 번째 요소를 convertToDiscussion() 전달후 ul 에 append
    element.append(convertToDiscussion(setAgora[i]));
  }
};

render(ul);
