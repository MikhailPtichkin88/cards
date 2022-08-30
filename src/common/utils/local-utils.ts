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

export const saveState = (state: {
    filters: {
        ownerSwitcher: string
    },
}) => {
    try {
        localStorage.setItem('ownerSwitcher', JSON.stringify(state.filters.ownerSwitcher));
    } catch {
        throw new Error('Error save to Local Storage');
    }
};