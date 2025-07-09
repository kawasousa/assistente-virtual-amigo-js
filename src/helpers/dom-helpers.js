export function get(id) {
    return document.getElementById(id);
}

export function createElement(tag, ...classes) {
    const element = document.createElement(tag);
    for (const className of classes) {
        element.classList.add(className);
    }

    return element;
}

export function addOnSubmit(element, listener) {
    element.addEventListener("submit", listener);
}

export function addOnChange(element, listener) {
    element.addEventListener("change", listener);
}

export function addOnClick(element, listener) {
    element.addEventListener("click", listener);
}

export function createQueryContainer(text, queryFiles) {
    const messageField = createElement("div", "div-message-field", "div-message-field-query");
    const message = createElement("div", "div-message", "div-message-query");
    const textField = createElement("p");
    const attachmentField = createElement("div", "div-message-query-attachment");

    for (const file of queryFiles) {
        const img = createElement("img");
        img.setAttribute("src", URL.createObjectURL(file));
        attachmentField.appendChild(img);
    }

    textField.textContent = text;
    message.appendChild(attachmentField);
    message.appendChild(textField);
    messageField.appendChild(message);

    return messageField;
}

export function createResponseContainer(text) {
    const messageField = createElement("div", "div-message-field", "div-message-field-response");
    const message = createElement("div", "div-message", "div-message-response");
    const iconField = createElement("div", "div-chat-icon");
    const icon = createElement("img");
    const textField = createElement("p");

    icon.src = "../../assets/imgs/favicon.png";
    textField.innerHTML = text;

    iconField.appendChild(icon);
    message.appendChild(textField);
    messageField.appendChild(iconField);
    messageField.appendChild(message);

    return messageField;
}

export function addFavicon() {
    const head = document.head;
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = '../../assets/imgs/favicon.png';
    faviconLink.type = 'image/png'

    head.append(faviconLink);
}