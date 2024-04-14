const storeName = "tasks";
const dateIndexName = "by_date";
const completedIndexName = "by_completed";

let database;
function getDB() {
  try {
    if (database) {
      return database;
    }
    return new Promise((resolve) => {
      const request = indexedDB.open("tasklist");

      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore(storeName, { keyPath: "id" });
        store.createIndex(dateIndexName, "date");
        store.createIndex(completedIndexName, "completed");
      };

      request.onsuccess = () => {
        database = request.result;
        resolve(database);
      };
    });
  } catch (error) {
    throw new Error(`Error getting DB: ${error}`);
  }
}

export function fetchTasksFromStore() {
  try {
    return new Promise(async (resolve) => {
      const db = await getDB();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error}`);
  }
}

export function addTaskToStore(task) {
  try {
    return new Promise((resolve) => {
      task.id = Date.now();

      const tx = getDB().transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.add(task);

      request.onsuccess = () => {
        resolve(task);
      };
    });
  } catch (error) {
    throw new Error(`Error adding new task: ${error}`);
  }
}

export function deleteTaskInStore(id) {
  try {
    return new Promise((resolve) => {
      const tx = getDB().transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(id);
      };
    });
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}

export async function markAsCompletedInStore(id) {
  return await markTask(true, id);
}

export async function markAsUncompletedInStore(id) {
  return await markTask(false, id);
}

function markTask(valueToSet, id) {
  try {
    return new Promise(async (resolve) => {
      const tx = getDB().transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const task = await findTaskByID(store, id);
      task.completed = valueToSet;
      const request = store.put(task);

      request.onsuccess = () => {
        resolve(task);
      };
    });
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}

function findTaskByID(store, id) {
  try {
    return new Promise((resolve) => {
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}
