import {DateTime} from "luxon";

export const convertToIsraelTime = (dateString: string): Date => {
    return DateTime.fromISO(dateString, {zone: "utc"}) // input is UTC
        .setZone("Asia/Jerusalem") // convert to Israel time
        .toJSDate(); // back to JS Date object
};
