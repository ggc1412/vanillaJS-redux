import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  console.log(action);
  if (action.type === "add") {
    count++;
  } else if (action.type === "minus") {
    count--;
  }
  return count;
};

const store = createStore(countModifier);
// store 안의 data를 변경하는 유일한 방법은 dispatch() 메서드를 사용하는 것이다.
// reducer는 현재 state에 주어진 action을 한 다음 state tree 값을 리턴하는 함수이다.

store.subscribe(() => (number.innerHTML = store.getState()));

const countAdd = () => {
  store.dispatch({ type: "add" });
};

const countMinus = () => {
  store.dispatch({ type: "minus" });
};

add.addEventListener("click", countAdd);
minus.addEventListener("click", countMinus);
number.innerHTML = store.getState();
