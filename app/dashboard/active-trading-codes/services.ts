import {
    IActiveTradeDayWise,
} from "./types";

import { DataType, TransformedDataItem, PayloadType } from "./types"

export const removeKeyFromObjects = (data: any[], ignoreKey: string) => {
    return data.filter((item) => item.channel.trim() !== ignoreKey);
};


export function sortByMonthYearDescending(data: DataType[]) {
    // Create a function to map month names to numbers
    const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
    };

    // Sort the array by the specified field in descending order
    return data.sort((a, b) => {
        const [monthA, yearA] = a.tradingDate.split(" ");
        const [monthB, yearB] = b.tradingDate.split(" ");

        // Compare by year first
        if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
        }

        // If years are the same, compare by month
        return monthMap[monthA] - monthMap[monthB];
    });
}

export const transformData = (
    data: IActiveTradeDayWise[],
    key: string,
): TransformedDataItem[] => {
    const transformedData: TransformedDataItem[] = data.reduce(
        (acc: TransformedDataItem[], curr: IActiveTradeDayWise) => {
            const existingItemIndex = acc.findIndex(
                (item) => item.tradingDate === curr.tradingDate,
            );
            if (existingItemIndex !== -1) {
                // @ts-ignore
                acc[existingItemIndex][curr.channel.toLowerCase()] = curr[key];
            } else {
                acc.push({
                    tradingDate: curr.tradingDate,
                    // @ts-ignore
                    [curr.channel.toLowerCase()]: curr[key],
                    // @ts-ignore
                    dt: curr.channel.toLowerCase() === "dt" ? curr[key] : 0,
                    // @ts-ignore
                    internet: curr.channel.toLowerCase() === "internet" ? curr[key] : 0,
                });
            }
            return acc;
        },
        [],
    );

    return transformedData;
};

export const ratioMaker = (data: TransformedDataItem[]) => {
    return data.map((d) => {
        const total = d.dt + d.internet;
        return {
            ...d,
            dtRatio: Math.round((d.dt / total) * 100),
            internetRatio: Math.round((d.internet / total) * 100),
        };
    });
};

const parseDateOfMonthWise = (date: string) => {
    return date.slice(3);
};

export const ratioMakerMonthWise = (
    data: PayloadType[],
    dateParse: boolean = true,
) => {
    return data.map((d) => {
        const total = d.DT + d.INTERNET;
        return {
            dt: d.DT,
            internet: d.INTERNET,
            tradingDate: dateParse ? parseDateOfMonthWise(d.monthYear) : d.monthYear,
            dtRatio: Math.round((d.DT / total) * 100),
            internetRatio: Math.round((d.INTERNET / total) * 100),
        };
    });
};
