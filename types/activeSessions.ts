export type SessionItem = {
    id: string,
    device: string,
    location: string,
    current: boolean,
    time: string
};

export type SessionResultArray = SessionItem[] | null | undefined;