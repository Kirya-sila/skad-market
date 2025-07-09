/*
 @example
 plural(42, ['товар', 'товара', 'товаров']);
 */
export const plural = (value: number, words: [string, string, string]) => {
    const integerValue = Math.abs(value) % 100;
    const num = integerValue % 10;

    if (integerValue > 10 && integerValue < 20) return words[2];

    if (num > 1 && num < 5) return words[1];

    if (num === 1) return words[0];

    return words[2];
};

export const truncate = (text: string, length: number) =>
    text.length > length ? text.slice(0, length).concat('...') : text;