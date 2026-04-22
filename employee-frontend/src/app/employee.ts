import { Department } from "./department";

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    department: Department | null;
}
