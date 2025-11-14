import { api } from "../apiBase";

export function getDashboard() {
    return api("dashboard/");
}
