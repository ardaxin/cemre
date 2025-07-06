export class DataSource {
    fetchData(source: string): Promise<any> {
        // Logic to fetch data from the specified source
        return new Promise((resolve, reject) => {
            // Simulated fetch operation
            setTimeout(() => {
                const data = {}; // Replace with actual data fetching logic
                resolve(data);
            }, 1000);
        });
    }

    validateData(data: any): boolean {
        // Logic to validate the fetched data
        return data !== null && typeof data === 'object'; // Basic validation
    }
}