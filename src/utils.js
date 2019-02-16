import moment from 'moment';

export const TOKEN_KEY = 'login_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getDateRange = (range = 1) => {
    const date = new Date();
    date.setMonth(date.getMonth() - range);
    return moment.utc(date).format('YYYY-MM-DD');
};

export const logOutUser = history => {
    localStorage.removeItem(TOKEN_KEY);
    history.push('/');
};

export const checkNested = (obj, ...args) => {
    let tempObj = obj;
    for (let i = 0; i < args.length; i++) {
        if (!tempObj || !tempObj.hasOwnProperty(args[i])) { return false; }
        tempObj = tempObj[args[i]];
    }
    return true;
};

export const getUniqueKey = () => `_${Math.random().toString(36).substr(2, 16)}`;

export const getColorFromHTTPCode = code => {
    switch (code) {
        case 200:
            return { backgroundColor: '#00e676', color: 'white' };
        case 401:
            return { backgroundColor: '#f44336', color: 'white' };
        case 403:
            return { backgroundColor: '#f44336', color: 'white' };
        case 404:
            return { backgroundColor: '#f44336', color: 'white' };
        case 422:
            return { backgroundColor: '#f44336', color: 'white' };
        case 500:
            return { backgroundColor: '#f44336', color: 'white' };
        default:
            return { backgroundColor: '#ccc', color: 'white' };
    }
};
