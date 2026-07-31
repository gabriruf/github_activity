export default function listEventNumbers(fData: any, fArrSize: number, fFieldName?: string): {[index: string]: number} {
    const numberOfEvents : {[index: string]: number} = {};
    const arrEvents : string[] = [];

    if (typeof fFieldName === 'undefined') {
        for (let i = 0; i < fArrSize; i++) {
            let type = fData[i].type;
            if (!arrEvents.includes(type)) {
                arrEvents.push(type);
                numberOfEvents[type] = 1;
            } else {
                numberOfEvents[type] = (numberOfEvents[type] ?? 0) + 1;
            }
        }
        return numberOfEvents;
    }
    for (let i = 0; i < fArrSize; i++) {
        if (fData[i].type === fFieldName) {
            numberOfEvents[fFieldName] = (numberOfEvents[fFieldName] ?? 0) + 1;
        }
    }
    return numberOfEvents;
}