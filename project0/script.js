const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

todo_array = [];

function newTodo() {
  let task_name = prompt(
    "Hi, add a new To-Do task!",
    `to-do number ${parseInt(itemCountSpan.innerHTML) + 1}`
  );
  itemCountSpan.innerHTML++;
  todo_array.push({ id: itemCountSpan.innerHTML, description: task_name });
  const html_li = todo_array
    .map(
      (item) => `<li>
    <input class="todo-checkbox" type="checkbox">
      <label>${item.description}</label>
  </li>`
    )
    .join("");
  list.innerHTML = html_li;
}

/*

html obj-->


objeto lista--> 
[
  {
    id: int,
    description: string
  }
]
*/
