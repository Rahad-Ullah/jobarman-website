export default function formatSalaryAmount(num: number | string, decimals: number = 0): string {
    const n = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;

    if (isNaN(n)) return '';

    if (Math.abs(n) >= 1_000_000) {
        const val = (n / 1_000_000).toFixed(decimals);
        return `${parseFloat(val)}M`;
    }

    if (Math.abs(n) >= 1_000) {
        const val = (n / 1_000).toFixed(decimals);
        return `${parseFloat(val)}k`;
    }

    return n.toString();
}