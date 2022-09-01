export const loadStateOwnerSwitcher = () => {
    try {
        const serializedState = localStorage.getItem('ownerSwitcher');
        if (serializedState === null) {
            return 'all';
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
export const loadStateMinCards = () => {
    try {
        const serializedState = localStorage.getItem('minCards');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
export const loadStateMaxCards = () => {
    try {
        const serializedState = localStorage.getItem('maxCards');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: {
    queryParams: {
        min: number | undefined
        max: number | undefined
    },
    filters: {
        ownerSwitcher: string
    },
}) => {
    try {
        localStorage.setItem('ownerSwitcher', JSON.stringify(state.filters.ownerSwitcher));
        localStorage.setItem('minCards', JSON.stringify(state.queryParams.min));
        localStorage.setItem('maxCards', JSON.stringify(state.queryParams.max));
    } catch {
        throw new Error('Error save to Local Storage');
    }
};