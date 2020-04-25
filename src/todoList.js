import { createStore } from "redux";

const input = document.querySelector("#todo");
const form = document.querySelector("form");
const list = document.querySelector("ul");

const ADD = "ADD";
const DEL = "DEL";

// Reducer
const reducer = (todoList = [], action) => {
    switch(action.type){
        case ADD: return [{text:action.text, id:Date.now()}, ...todoList]
        case DEL: return todoList.filter( todo => todo.id !== action.id )
        default: return todoList
    }
};

// CreateStore
const listStore = createStore(reducer);

// Action Creator
const addList = (todo) => {
    return { type: ADD, text:todo }
}

const delList = (delId) => {
    return { type: DEL, id:delId }
}

// Dispatch
const dispatchAddList = (e) => {
    e.preventDefault();
    const todo = input.value;
    input.value = "";
    listStore.dispatch(addList(todo));
};

const dispatchDelList = (e) => {
    const delId = parseInt(e.target.parentElement.id,10);
    listStore.dispatch(delList(delId));
};

// Subscribe
const paintTodo = () => {
    list.innerHTML = "";
    const toDos = listStore.getState();
    toDos.forEach( todo => {
        const li = document.createElement("li");
        li.innerHTML = todo.text;
        li.id = todo.id;
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Del";
        delBtn.addEventListener("click", dispatchDelList);
        li.appendChild(delBtn);
        list.appendChild(li);        
    });
};

listStore.subscribe(paintTodo);

form.addEventListener("submit", dispatchAddList);