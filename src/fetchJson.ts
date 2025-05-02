let cachedData: Array<JSON> | null = null;

export async function getJsObjects() {
    if (cachedData) {
        return cachedData;
    }

    // Otherwise, fetch the data
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRk3QRWtJWFDCEtM-SEXBXBWU1iZJWSw27u6FYTjBR6oi6G3PDBjfQfFKTxE9v3N3PcfuXtmdaE10ni/pub?gid=684094629&single=true&output=tsv';

    const response = await fetch(url);

    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

    const data = await response.text();

    const lines = data.trim().split('\n');

    const config = JSON.parse(lines[0]);
    const editions = JSON.parse(lines[1]);
    const questions = JSON.parse(lines[2]);

    // Cache the data
    cachedData = [config, editions, questions];

    // Return the fetched data
    return cachedData;
}

