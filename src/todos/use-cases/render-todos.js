import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element;
/**
 *
 * @param {String} elementId
 * @param {Todo} todos
 */
export const renderTodos = (elementId, todos = []) => {
    // Se busca el objeto HTML en que se renderizarán los TODOs, si no existe se busca.
    if (!element)
        element = document.querySelector(elementId);

    // En caso de no encontrarlo, se lanza error.
    if (!element)
        throw new Error(`${elementId} not found.`)

    // En caso de encontrarlo, se limpia, y se cargan los TODOs.
    element.innerHTML = '';

    todos.forEach(todo =>
        element.append(createTodoHTML(todo))
    );
}