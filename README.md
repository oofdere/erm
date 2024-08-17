# erm (embedded reactive macros)

an extremely low level frontend framework that's still high-level enough to be fun

goal: a frontend framework that's smaller than htmx when bundled

```ts
function helloComponent(name?: string) {
    let world = $state(name || 'world')
    return erm`hello, ${world}!`
}

const hello = helloComponent().renderToDOM('.hello'); // render into a css selector

hello.world = "oof"; // reactively update component instance
```
^ none of this is accurate lol

---

This project was created using `bun init` in bun v1.1.24. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
