function* counter(init?: number, step?: number) {
    let i = init || 0;
    while (true) {
        yield i++;
    }
    return i
}
const c = counter()

type NotifyFn<T> = <T>(nyew: T, old: T, unsub: () => void) => any

type Subscribers<T> = {
    [key: string]: NotifyFn<T>
}

type Reactive<T> = {
    $: T,
    sub: (fn: NotifyFn<T>) => void
}

function reactive<T>(value: T): Reactive<T> {
    let v = value
    let subscribers: Subscribers<T> = {}
    return {
        get $() {
            return v
        },
        set $(n: T) {
            for (const [id, fn] of Object.entries(subscribers)) {
                (fn as NotifyFn<T>)(n, v, () => delete subscribers[id])
            }
            v = n
        },
        sub(fn: NotifyFn<T>) {
            subscribers[c.next().value] = fn
        }
    }
}

function erm<T>(strings: TemplateStringsArray, ...props: T[]) {
    return strings.flatMap((x, i) => [x, `${props[i]}`]).join('')
}

let name = reactive("oof");
let name2 = reactive("foor");
name.sub((x, y, unsub) => {
    console.log(`reaction: ${y} just became ${x}!`)
})

console.log(erm`hello ${name.$}! what brings ${name2.$} here?`)

name.$ = "foo";
name.$ = 'roof'

console.log(erm`hello ${name.$}! what brings ${name2.$} here?`)
