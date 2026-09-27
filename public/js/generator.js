// Pure password-generation logic. No DOM access here so it stays easy to test.

const LEET_MAP = { e: '3', a: '@', s: '5', o: '0' };

/** Capitalize the first character of a string (safe on empty strings). */
export function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Replace only the first leet-convertible character.
 * Returns null when no character can be converted.
 */
export function toPartialLeetSpeak(str) {
    for (let i = 0; i < str.length; i++) {
        const leetChar = LEET_MAP[str[i]];
        if (leetChar !== undefined) {
            return str.substring(0, i) + leetChar + str.substring(i + 1);
        }
    }
    return null;
}

/**
 * Replace every leet-convertible character.
 * Returns null when nothing changes.
 */
export function toFullLeetSpeak(str) {
    const lower = str.toLowerCase();
    const full = lower
        .split('')
        .map((char) => LEET_MAP[char] || char)
        .join('');
    return full === lower ? null : full;
}

/** Years to append: previous, current and next, computed at call time. */
export function commonYears(now = new Date()) {
    const year = now.getFullYear();
    return [year - 1, year, year + 1];
}

const NUMERIC_SUFFIXES = ['123', '1234'];
const SPECIAL_SUFFIXES = ['', '!', '!!'];

/**
 * Generate a list of weak password variations for a base string.
 * Deterministic apart from the year, which can be injected for testing.
 */
export function generateWeakPasswords(baseString, now = new Date()) {
    const trimmed = String(baseString).trim().toLowerCase();
    if (!trimmed) return [];

    const suffixes = ['', ...commonYears(now).map(String), ...NUMERIC_SUFFIXES];
    const roots = [trimmed, toPartialLeetSpeak(trimmed), toFullLeetSpeak(trimmed)].filter(
        (root) => root != null
    );

    const variations = new Set();
    for (const root of roots) {
        for (const suffix of suffixes) {
            for (const special of SPECIAL_SUFFIXES) {
                variations.add(root + suffix + special);
            }
        }
    }

    const result = new Set();
    for (const variation of variations) {
        result.add(variation);
        result.add(capitalizeFirstLetter(variation));
    }

    return Array.from(result);
}
