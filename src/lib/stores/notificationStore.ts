import { writable, derived, type Writable, type Readable } from "svelte/store";

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    timeout: number;
}

type NotificationType = "default" | "warning"  | "success";

interface NotificationStore extends Readable<Notification[]> {
    send: (message: string, type?: NotificationType, timeout?: number) => void;
    default: (msg: string, timeout?: number) => void;
    warning: (msg: string, timeout?: number) => void;
    success: (msg: string, timeout?: number) => void;
}

const DEFAULT_TIMEOUT = 1500;

function createNotificationStore(defaultTimeout: number = DEFAULT_TIMEOUT): NotificationStore {
    const _notifications: Writable<Notification[]> = writable([]);

    function send(message: string, type: NotificationType = "default", timeout: number = defaultTimeout): void {
        _notifications.update(state => {
            return [...state, { id: generateId(), type, message, timeout }];
        });
    }

    const notifications = derived<Writable<Notification[]>, Notification[]>(
        _notifications,
        ($_notifications, set) => {
            set($_notifications);

            if ($_notifications.length > 0) {
                const timer = setTimeout(() => {
                    _notifications.update(state => {
                        state.shift();
                        return state;
                    });
                }, $_notifications[0].timeout);

                return () => {
                    clearTimeout(timer);
                };
            }
            return undefined;
        }
    );

    return {
        subscribe: notifications.subscribe,
        send,
        default: (msg: string, timeout?: number) => send(msg, "default", timeout),
        warning: (msg: string, timeout?: number) => send(msg, "warning", timeout),
        success: (msg: string, timeout?: number) => send(msg, "success", timeout),
    };
}

function generateId(): string {
    return '_' + Math.random().toString(36).substring(2, 9);
}

export const notifications = createNotificationStore();
