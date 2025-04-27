export interface Position {
    x: number;
    y: number;
}

export interface MenuItem {
    name: string;
    onClick?: () => void;
    displayText?: string;
    class?: string;
}