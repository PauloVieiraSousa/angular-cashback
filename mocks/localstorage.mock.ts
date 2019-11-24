
const storage = {};

export const LocalStorageMock = {
  getItem: (key: string): string => {
    return key in storage ? storage[key] : null;
  },
  setItem: (key: string, value: string) => {
    storage[key] = `${value}`;
  },
  removeItem: ( key: string ) => {
    delete storage[key];
  }
};

