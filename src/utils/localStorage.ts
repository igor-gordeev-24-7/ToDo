import type { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

export const getTodos = (): Todo[] => {
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved ? JSON.parse(saved) : []; 
};

export const saveTodos = (todos: Todo[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};