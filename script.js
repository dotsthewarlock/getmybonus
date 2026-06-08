/*
  First Get My Bonus MVP workflow.
  This script keeps the site static and GitHub Pages friendly: no frameworks,
  no build tools, and only getmybonus-specific localStorage keys.
*/
const DEFAULT_WEBSITE_URL = 'https://getmybonus.ca';
const WEBSITE_URL_STORAGE_KEY = 'getmybonus.websiteUrl';

const codeInput = document.querySelector('#code-input');
const generateButton = document.querySelector('#generate-links');
const generatedCodes = document.querySelector('#generated-codes');
const websiteForm = document.querySelector('#website-form');
const websiteUrlInput = document.querySelector('#website-url');
const resetWebsiteButton = document.querySelector('#reset-website');
const websiteFrame = document.querySelector('#website-frame');
const statusMessage = document.querySelector('#app-status');
const year = document.querySelector('#year');

function setStatus(message) {
  if (statusMessage) {
    statusMessage.textContent = message;
  }
}

function normalizeUrl(url) {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return DEFAULT_WEBSITE_URL;
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

function saveWebsiteUrl(url) {
  try {
    localStorage.setItem(WEBSITE_URL_STORAGE_KEY, url);
    return true;
  } catch (error) {
    return false;
  }
}

function loadWebsiteUrl() {
  try {
    return localStorage.getItem(WEBSITE_URL_STORAGE_KEY) || DEFAULT_WEBSITE_URL;
  } catch (error) {
    setStatus('Using the default website URL because saved storage is unavailable.');
    return DEFAULT_WEBSITE_URL;
  }
}

function updateWebsite(url) {
  const normalizedUrl = normalizeUrl(url);

  if (websiteUrlInput) {
    websiteUrlInput.value = normalizedUrl;
  }

  if (websiteFrame) {
    websiteFrame.src = normalizedUrl;
  }

  const saved = saveWebsiteUrl(normalizedUrl);
  setStatus(
    saved
      ? `Loaded ${normalizedUrl}`
      : `Loaded ${normalizedUrl}, but this browser could not save it.`
  );
}

function saveWebsiteInput() {
  if (!websiteUrlInput) {
    return;
  }

  const normalizedUrl = normalizeUrl(websiteUrlInput.value);
  websiteUrlInput.value = normalizedUrl;

  if (!saveWebsiteUrl(normalizedUrl)) {
    setStatus('This browser could not save the website URL.');
  }
}

async function copyCodeToClipboard(code) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(code);
    return;
  }

  const temporaryInput = document.createElement('textarea');
  temporaryInput.value = code;
  temporaryInput.setAttribute('readonly', '');
  temporaryInput.style.position = 'fixed';
  temporaryInput.style.opacity = '0';
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  const copied = document.execCommand('copy');
  temporaryInput.remove();

  if (!copied) {
    throw new Error('Clipboard copy failed.');
  }
}

function createCodeButton(code) {
  const button = document.createElement('button');
  button.className = 'code-button';
  button.type = 'button';
  button.textContent = code;
  button.dataset.code = code;
  button.setAttribute('aria-label', `Copy code ${code}`);
  button.setAttribute('aria-pressed', 'false');

  button.addEventListener('click', async () => {
    try {
      await copyCodeToClipboard(code);
      button.classList.add('is-processed');
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', `Copied code ${code}`);
      setStatus(`Copied code ${code}`);
    } catch (error) {
      setStatus('Unable to copy that code automatically. Select and copy it manually.');
    }
  });

  return button;
}

function generateCodeButtons() {
  if (!codeInput || !generatedCodes) {
    return;
  }

  const codes = codeInput.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  generatedCodes.replaceChildren();

  if (!codes.length) {
    setStatus('Paste at least one code or barcode before generating buttons.');
    return;
  }

  const fragment = document.createDocumentFragment();
  codes.forEach((code) => {
    fragment.appendChild(createCodeButton(code));
  });

  generatedCodes.appendChild(fragment);
  setStatus(`Generated ${codes.length} code button${codes.length === 1 ? '' : 's'}.`);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (generateButton) {
  generateButton.addEventListener('click', generateCodeButtons);
}

if (websiteForm) {
  websiteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateWebsite(websiteUrlInput ? websiteUrlInput.value : DEFAULT_WEBSITE_URL);
  });
}

if (websiteUrlInput) {
  websiteUrlInput.addEventListener('change', saveWebsiteInput);
}

if (resetWebsiteButton) {
  resetWebsiteButton.addEventListener('click', () => {
    updateWebsite(DEFAULT_WEBSITE_URL);
  });
}

updateWebsite(loadWebsiteUrl());
