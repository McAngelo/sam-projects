export interface User {
    id: any;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
}