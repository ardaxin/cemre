export interface DistributionSettings {
    retryAttempts: number;
    timeout: number;
}

export interface Data {
    id: string;
    payload: any;
}