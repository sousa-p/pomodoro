const storage = {
    get: () => {
        return JSON.parse(localStorage.getItem('tempos')) || [1500000, 300000, 900000];
    },

    set: (arr) => {
        localStorage.setItem('tempos', JSON.stringify(arr));
    }
}