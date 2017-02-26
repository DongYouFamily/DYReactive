import { Scheduler } from "../core/Scheduler";
import { Record } from "./Record";
import { MockObserver } from "./MockObserver";
import { IObserver } from "../observer/IObserver";
import { Observer } from "../core/Observer";
import { TestStream } from "./TestStream";
import { MockPromise } from "./MockPromise";
export declare class TestScheduler extends Scheduler {
    static next(tick: any, value: any): Record;
    static error(tick: any, error: any): Record;
    static completed(tick: any): Record;
    static create(isReset?: boolean): TestScheduler;
    constructor(isReset: boolean);
    private _clock;
    clock: number;
    private _isReset;
    private _isDisposed;
    private _timerMap;
    private _streamMap;
    private _subscribedTime;
    private _disposedTime;
    private _observer;
    setStreamMap(observer: IObserver, messages: [Record]): void;
    remove(observer: Observer): void;
    publishRecursive(observer: MockObserver, initial: any, recursiveFunc: Function): void;
    publishInterval(observer: IObserver, initial: any, interval: number, action: Function): number;
    publishIntervalRequest(observer: IObserver, action: Function): number;
    publishTimeout(observer: IObserver, time: number, action: Function): number;
    private _setClock();
    startWithTime(create: Function, subscribedTime: number, disposedTime: number): MockObserver;
    startWithSubscribe(create: any, subscribedTime?: number): MockObserver;
    startWithDispose(create: any, disposedTime?: number): MockObserver;
    publicAbsolute(time: any, handler: any): void;
    start(): void;
    createStream(args: any): TestStream;
    createObserver(): MockObserver;
    createResolvedPromise(time: number, value: any): MockPromise;
    createRejectPromise(time: number, error: any): MockPromise;
    private _getMinAndMaxTime();
    private _exec(time, map);
    private _runStream(time);
    private _runAt(time, callback);
    private _tick(time);
}
