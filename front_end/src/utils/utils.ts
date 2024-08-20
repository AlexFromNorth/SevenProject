import { List } from "../types/types";

/**
 * Recursively searches for a list with the given ID within a nested list structure.
 * @param {List} list - The root list to start the search from.
 * @param {number} id - The ID of the list to find.
 * @returns {List|null} The list object if found, or null if not found.
 */
export function findFolderById(list: List, id: number): List | null {
    if (list.id === id) {
      return list;
    }
  
    if (list.child && list.child.length > 0) {
      for (const child of list.child) {
        const found = findFolderById(child, id);
  
        if (found) {
          return found;
        }
      }
    }
  
    return null;
  }

  
  export function createList(list: List, newItem: List): List | null {
    // доделать уникальность айди
    const uniqId = Math.random() * 1000;
    const parent = findFolderById(list, newItem.id); // Находим родителя по id
    if (parent && parent.child) {
        newItem.id = uniqId;
        parent.child.unshift(newItem); // Добавляем новый элемент в дочерние элементы
        return parent;
    }
    return null;
}

export function updateElement(list: List, title: string, cost: number, id: number): List | null {
  const elementToUpdate = findFolderById(list, id); 
  if (elementToUpdate) {
    elementToUpdate.title = title;
    elementToUpdate.cost = cost;
    return elementToUpdate;
  }
  return null;
}


  
  /**
   * Recursively searches for the parent list that contains a child list with the given ID.
   * @param {List} list - The root list to start the search from.
   * @param {number} id - The ID of the child list to find the parent for.
   * @returns {List|null} The parent list object if found, or null if not found.
   */
  export function findParentFolderById(list: List, id: number): List | null {
    if (list.child.some(child => child.id === id)) {
      return list;
    }
  
    if (list.child && list.child.length > 0) {
      for (const child of list.child) {
        const found = findParentFolderById(child, id)
  
        if (found) {
          return found;
        }
      }
    }
  
    return null;
  }
  
  /**
   * Removes a list with the given ID from the nested list structure.
   * @param {List} list - The root list to start the search from.
   * @param {number} id - The ID of the list to delete.
   * @returns {boolean} True if the list was found and deleted, false if not found.
   */
  export function deleteFolderById(list: List, id: number): Boolean {
    const parentFolder = findParentFolderById(list, id) 
    
    if(parentFolder) {
        parentFolder.child = parentFolder.child.filter((child: List) => {
            return child.id !== id
        })
    }
    return !!parentFolder
  }


  
  
