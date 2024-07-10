import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * Se obtiene la cantidad de ToDos pendientes y mostrarlos en el campo de texto de pendientes. 
 * @param {String} elementId 
 */
export const renderPending = (elementId) => {
    if (!element) {
        element = document.querySelector(elementId);
    }
    if (!element) {
        throw new Error(`Element ${elementId} not found.`);
    }
    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}