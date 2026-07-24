export function generateSKU(): string {
    const num = Math.floor(100000 + Math.random() * 900000);
    return `PRD-${num}`;
}