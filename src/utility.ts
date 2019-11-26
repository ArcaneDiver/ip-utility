export const subStringInArrOfStr = (arg: string[], toBeSearched: string): string[] => {
        const res: string[] = [];

        for (const e of arg) {
                if (e.search(toBeSearched) !== -1) {
                        res.push(e);
                }
        }

        return res;
};
