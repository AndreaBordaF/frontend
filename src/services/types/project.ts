export interface Project{
    id: string;
    contract: string;
    name: string;
    clientName: string;
    status: boolean;
    date_create: string;
}

export interface Contract {
    contractNum: string;
}