"use server"


export const getSummary = async (branchId: string) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${branchId}`
    );
    const data = await response.json();
    return data;
}