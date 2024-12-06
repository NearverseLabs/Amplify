type OnStreamResult<T> = (result: T, final: boolean) => void;
type OnStreamError = (reason?: unknown) => void;
type OnStreamEnd = () => void;
type Subscription<T> = {
    onResult: OnStreamResult<T>;
    onError?: OnStreamError;
    onEnd?: OnStreamEnd;
};
export declare class Stream<T> {
    private subscribed;
    private onResult?;
    private onError?;
    private onEnd?;
    constructor(initialiser: (resolve: (val: T, final: boolean) => void, reject: (reason?: unknown) => void) => void);
    subscribe(subscription: Subscription<T>): void;
}
export {};
