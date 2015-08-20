/// <reference path="../definitions.d.ts"/>
module dyRt{
    export var createStream = (subscribeFunc) => {
        return AnonymousStream.create(subscribeFunc);
    };

    export var fromArray = (array:Array<any>, scheduler = Scheduler.create()) =>{
        return FromArrayStream.create(array, scheduler);
    };

    export var fromPromise = (promise:any, scheduler = Scheduler.create()) =>{
        return FromPromiseStream.create(promise, scheduler);
    };

    export var fromEventPattern = (addHandler:Function, removeHandler:Function) =>{
        return FromEventPatternStream.create(addHandler, removeHandler);
    };

    export var interval = (interval, scheduler = Scheduler.create()) => {
        return IntervalStream.create(interval, scheduler);
    };

    export var intervalRequest = (scheduler = Scheduler.create()) => {
        return IntervalRequestStream.create(scheduler);
    };

    export var empty = () => {
        return createStream((observer:IObserver) =>{
            observer.completed();
        });
    };

    export var callFunc = (func:Function, context = root) => {
        return createStream((observer:IObserver) => {
            try{
                observer.next(func.call(context, null));
            }
            catch(e){
                observer.error(e);
            }

            observer.completed();
        })
    };

    export var judge = (condition:Function, thenSource:Stream, elseSource:Stream) => {
        return condition() ? thenSource : elseSource;
    };
}

