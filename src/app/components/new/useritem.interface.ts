
export interface IUserItem {
    active_tab: boolean;
    updated_by: string;
    updated_date: IUserItemUpdated;
}

export interface IUserItemUpdated {
    id: number;
    name: string;
}
