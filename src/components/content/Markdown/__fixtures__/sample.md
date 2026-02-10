# Заголовок первого уровня

Обычный параграф с **жирным** и *курсивом*, а также `inline code`.

## Заголовок второго уровня

Список:

- Пункт один
- Пункт два
- Пункт три

Нумерованный список:

1. Первый
2. Второй
3. Третий

### Блок кода (TypeScript)

```typescript
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, {
    themes: { light: "github-light", dark: "github-dark" },
  })
  .use(rehypeStringify);
const html = await markdownProcessor.process(md);
```

### Цитата

> Цитата из какого-то источника.  
> Можно и на несколько строк.

Разделитель:

---

Таблица:

| Ячейка 1 | Ячейка 2 | Ячейка 3 |
|----------|----------|----------|
| A        | B        | C        |
| D        | E        | F        |

Ссылка: [Shiki](https://shiki.style/).
