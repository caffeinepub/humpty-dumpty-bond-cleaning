import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enquiry {
    serviceType: ServiceType;
    name: string;
    email: string;
    message: string;
    submissionTime: bigint;
    phone: string;
}
export enum ServiceType {
    other = "other",
    marketing = "marketing",
    consulting = "consulting",
    design = "design",
    development = "development"
}
export interface backendInterface {
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getEnquiryByEmail(email: string): Promise<Enquiry>;
    submitEnquiry(name: string, phone: string, email: string, message: string, serviceType: ServiceType): Promise<void>;
}
