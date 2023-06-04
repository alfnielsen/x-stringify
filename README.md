# x-stringify

Yet another replacement for Json.stringify (with maxDeth, circular ref prevention and other settings) 


## Why

Well, maybe there are another library that actually do this correct, 
but I counldn't find it. 

So I wrote this one, that includes both `maxDepth` and `circular ref prevention`.

## Usage

```ts
import { stringify } from 'x-stringify';

const obj = { a: 1, b: 2, c: 3 };
obj.c = obj;

const str = stringify(obj, { maxDepth: 2 });
console.log(str); // {"a":1,"b":2,"c":{"a":1,"b":2,"c":"[Circular]"}} 
```

## Options

```ts
    options?: {
        indent?: number; // default: '  '
        maxDepth?: number; // default: 4
        showUndefined?: boolean; // default: false
        showNull?: boolean; // default: true
        leadingComma?: boolean; // default: false (JSON object must normally not include leading comma)
    }
```