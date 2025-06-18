export interface ITodo{

    id: string|number,
    text: string,
    isComplete: boolean
}

export interface ITodoState {
    todos: ITodo[]
  }