let cachedData: Array<JSON> | null = null;

export async function getJsObjects() {
    if (cachedData) {
        return cachedData;
    }

    // Otherwise, fetch the data
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_W_0tu-IvmSVS15-gxgAJ0Na11mUTKKsA1_SYE8RvEI9EJABuboTdUlmF-YbhEbdURRy2LvQVGeVH/pub?gid=684094629&single=true&output=tsv';

    const response = await fetch(url);

    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

    const data = await response.text();

    const lines = data.trim().split('\n');

    const config = JSON.parse(lines[0]);
    const editions = JSON.parse(lines[1]);
    const tresholds = JSON.parse(lines[2]);
    const questions = lines.slice(3).map(line => JSON.parse(line));

    // Cache the data
    cachedData = [config, editions, tresholds, questions];

    // Return the fetched data
    return cachedData;
}

