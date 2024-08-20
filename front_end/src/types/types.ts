export type List = {
  id: number;
  title: string;
  cost: number;
  child: List[];
};


export type ListState = {
  list: List,
  status: null | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

export type TodoSliceState = {
  list: ListState
}


// goods, product