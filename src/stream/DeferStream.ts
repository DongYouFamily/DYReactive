/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class DeferStream extends BaseStream{
        public static create(buildStreamFunc:Function) {
            var obj = new this(buildStreamFunc);

            return obj;
        }

        private _buildStreamFunc:Function = null;

        constructor(buildStreamFunc:Function){
            super(null);

            this._buildStreamFunc = buildStreamFunc;
        }

        public subscribeCore(observer:IObserver){
            var group = GroupDisposable.create();

            group.add(this._buildStreamFunc().buildStream(observer));

            return group;
        }
    }
}
