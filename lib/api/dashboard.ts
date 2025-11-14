import { api } from "../apiBase";
import { DashboardResponse } from "../types/dashboard";

export function getDashboard(): Promise<DashboardResponse> {
    return api("dashboard/");
}
