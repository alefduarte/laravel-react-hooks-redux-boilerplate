const LocalStorage = {
    getItem: key => {
        try {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },

    setItem: (keyName, keyValue) => {
        try {
            localStorage.setItem(keyName, JSON.stringify(keyValue));
            return true;
        } catch (error) {
            return undefined;
        }
    },

    saveState: state => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState)
        } catch (err) {
            // ignore erros
        }
    },

    clear: () => {
        try {
            localStorage.clear()
        } catch (err) {
            return undefined;
        }
    }
}

export default LocalStorage;