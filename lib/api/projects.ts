import { api } from "../apiBase";

export function listProjects() {
    return api("projects/");
}

export function getProjectCount() {
    return api("projects/count/");
}

export function getProject(id: number) {
    return api(`projects/${id}/`);
}

export function createProject(body: any) {
    return api("projects/", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export function updateProject(id: number, body: any) {
    return api(`projects/${id}/`, {
        method: "PUT",
        body: JSON.stringify(body),
    });
}

export function deleteProject(id: number) {
    return api(`projects/${id}/`, {
        method: "DELETE",
    });
}

export function filterProjectsByStatus(status: string) {
    return api(`projects/by_status/?status=${status}`);
}

export function addProjectMember(projectId: number, userId: number) {
    return api(`projects/${projectId}/add_member/`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
    });
}
