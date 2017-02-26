import { AnonymousStream } from "../stream/AnonymousStream";
import { Scheduler } from "../core/Scheduler";
import { FromArrayStream } from "../stream/FromArrayStream";
import { FromPromiseStream } from "../stream/FromPromiseStream";
import { FromEventPatternStream } from "../stream/FromEventPatternStream";
import { IntervalStream } from "../stream/IntervalStream";
import { IntervalRequestStream } from "../stream/IntervalRequestStream";
import { TimeoutStream } from "../stream/TimeoutStream";
import { DeferStream } from "../stream/DeferStream";
export declare class Operator {
    static empty(): AnonymousStream;
    static createStream(subscribeFunc: any): AnonymousStream;
    static fromArray(array: Array<any>, scheduler?: Scheduler): FromArrayStream;
}
export declare var createStream: typeof Operator.createStream;
export declare var empty: typeof Operator.empty;
export declare var fromArray: typeof Operator.fromArray;
export declare var fromPromise: (promise: any, scheduler?: Scheduler) => FromPromiseStream;
export declare var fromEventPattern: (addHandler: Function, removeHandler: Function) => FromEventPatternStream;
export declare var interval: (interval: any, scheduler?: Scheduler) => IntervalStream;
export declare var intervalRequest: (scheduler?: Scheduler) => IntervalRequestStream;
export declare var timeout: (time: any, scheduler?: Scheduler) => TimeoutStream;
export declare var callFunc: (func: Function, context?: any) => AnonymousStream;
export declare var judge: (condition: Function, thenSource: Function, elseSource: Function) => any;
export declare var defer: (buildStreamFunc: Function) => DeferStream;
export declare var just: (returnValue: any) => AnonymousStream;
