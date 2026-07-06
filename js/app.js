// js/app.js

const translations = window.translations || {};

 

let currentLang = new URLSearchParams(window.location.search).get('lang') || 'ja';

if (!translations[currentLang]) currentLang = 'ja';

 

document.addEventListener("DOMContentLoaded", () => {

    switchLanguage(currentLang);

});

 

function switchLanguage(lang) {

    if (!translations[lang]) lang = 'ja';

    currentLang = lang;

 

    document.querySelectorAll('[data-i18n]').forEach(element => {

        const key = element.getAttribute('data-i18n');

        if (translations[lang] && translations[lang][key] !== undefined) {

            const val = translations[lang][key];

            if (val.indexOf('\n') !== -1) {

                element.innerHTML = val.replace(/\n/g, '<br>');

            } else {

                element.textContent = val;

            }

        }

    });

 

    document.documentElement.setAttribute('lang', lang);

 

    document.querySelectorAll('.lang-selector button').forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.getElementById(`btn-${lang}`);

    if (activeBtn) activeBtn.classList.add('active');

 

    const url = new URL(window.location);

    url.searchParams.set('lang', lang);

    window.history.pushState({}, '', url);

}

 

function copyPassword(text, buttonElement) {

    navigator.clipboard.writeText(text).then(() => {

        const textSpan = buttonElement.querySelector('.copy-text');

        const originalText = translations[currentLang]['copy_text'] || 'コピー';

        const successText = translations[currentLang]['copy_success'] || '完了!';

        textSpan.textContent = successText;

        buttonElement.classList.add('success');

        setTimeout(() => {

            textSpan.textContent = originalText;

            buttonElement.classList.remove('success');

        }, 2000);

    }).catch(err => {

        console.error('Could not copy text: ', err);

    });

}

 

function openTab(tabId, event) {

    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

}

 