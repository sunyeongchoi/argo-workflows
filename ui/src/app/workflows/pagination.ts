export interface WorkflowsPagination {
    wfOffset: string;
    archivedOffset: string;
    nextWfOffset: string;
    nextArchivedOffset: string;
    limit: number;
}

export function parseLimit(str: string) {
    const v = parseInt(str, 10);
    return !isNaN(v) ? v : null;
}
