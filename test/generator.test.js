import { describe, it, expect } from 'vitest';
import {
    capitalizeFirstLetter,
    toPartialLeetSpeak,
    toFullLeetSpeak,
    commonYears,
    generateWeakPasswords,
} from '../public/js/generator.js';

describe('capitalizeFirstLetter', () => {
    it('capitalizes the first character', () => {
        expect(capitalizeFirstLetter('acme')).toBe('Acme');
    });

    it('is safe on an empty string', () => {
        expect(capitalizeFirstLetter('')).toBe('');
    });
});

describe('toPartialLeetSpeak', () => {
    it('replaces only the first convertible character', () => {
        expect(toPartialLeetSpeak('acme')).toBe('@cme');
    });

    it('returns null when nothing can be converted', () => {
        expect(toPartialLeetSpeak('bcdf')).toBeNull();
    });
});

describe('toFullLeetSpeak', () => {
    it('replaces every convertible character', () => {
        expect(toFullLeetSpeak('aeso')).toBe('@350');
    });

    it('returns null when nothing changes', () => {
        expect(toFullLeetSpeak('bcdf')).toBeNull();
    });
});

describe('commonYears', () => {
    it('returns previous, current and next year', () => {
        expect(commonYears(new Date('2025-06-01'))).toEqual([2024, 2025, 2026]);
    });
});

describe('generateWeakPasswords', () => {
    const now = new Date('2025-01-01');

    it('returns an empty list for blank input', () => {
        expect(generateWeakPasswords('', now)).toEqual([]);
        expect(generateWeakPasswords('   ', now)).toEqual([]);
    });

    it('includes the base word and common variations', () => {
        const result = generateWeakPasswords('Acme', now);
        expect(result).toContain('acme');
        expect(result).toContain('Acme');
        expect(result).toContain('acme!');
        expect(result).toContain('acme2025');
        expect(result).toContain('acme123');
    });

    it('includes leet variations', () => {
        const result = generateWeakPasswords('acme', now);
        expect(result).toContain('@cme'); // partial leet
        expect(result).toContain('@cm3'); // full leet
    });

    it('contains no duplicates', () => {
        const result = generateWeakPasswords('acme', now);
        expect(new Set(result).size).toBe(result.length);
    });

    it('trims surrounding whitespace', () => {
        expect(generateWeakPasswords('  acme  ', now)).toContain('acme');
    });
});
