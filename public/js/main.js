import { generateWeakPasswords } from './generator.js';

function renderPasswords(passwords) {
    const result = document.getElementById('result');
    result.replaceChildren();
    for (const password of passwords) {
        const line = document.createElement('div');
        line.className = 'password';
        line.textContent = password; // textContent avoids any HTML injection
        result.appendChild(line);
    }
}

function clearResult() {
    document.getElementById('result').replaceChildren();
}

function setAlert(message) {
    document.getElementById('alert').textContent = message;
}

function generatePasswords() {
    const input = document.getElementById('baseString');
    const baseString = input.value.trim();

    if (baseString === '') {
        setAlert('Error, you must provide a name.');
        input.style.borderColor = 'red';
        clearResult();
        document.getElementById('copyAll').style.visibility = 'hidden';
        return;
    }

    const weakPasswords = generateWeakPasswords(baseString);
    renderPasswords(weakPasswords);
    document.getElementById('copyAll').style.visibility = 'visible';
    setAlert('');
    input.style.borderColor = '';
}

async function copyPasswords() {
    const lines = Array.from(document.querySelectorAll('#result .password')).map(
        (el) => el.textContent
    );
    if (lines.length === 0) return;

    const button = document.getElementById('copyAll');
    const original = button.textContent;
    try {
        await navigator.clipboard.writeText(lines.join('\n'));
        button.textContent = 'Copied!';
    } catch {
        button.textContent = 'Copy failed';
    }
    setTimeout(() => {
        button.textContent = original;
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', generatePasswords);
    document.getElementById('copyAll').addEventListener('click', copyPasswords);
    document.getElementById('baseString').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            generatePasswords();
        }
    });
});
