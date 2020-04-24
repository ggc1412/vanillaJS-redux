import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "add";
const MINUS = "minus";
// 오타가 났을 경우, 이를 확인하기 쉽게하기 위해 변수로 선언하여 사용한다.

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
// 가독성을 위해 일반적으로 if문보다 switch문을 사용한다.

const store = createStore(countModifier);
// store 안의 data를 변경하는 유일한 방법은 dispatch() 메서드를 사용하는 것이다.
// reducer는 현재 state에 주어진 action을 한 다음 state tree 값을 리턴하는 함수이다.

store.subscribe(() => (number.innerHTML = store.getState()));

const countAdd = () => {
  store.dispatch({ type: ADD });
};

const countMinus = () => {
  store.dispatch({ type: MINUS });
};

add.addEventListener("click", countAdd);
minus.addEventListener("click", countMinus);
number.innerHTML = store.getState();
