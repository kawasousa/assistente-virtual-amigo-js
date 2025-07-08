import { addFavicon, addOnChange, addOnClick, addOnSubmit, createElement, createQueryContainer, createResponseContainer, get } from "../../helpers/dom-helpers.js";
import { getMultimodalResponse } from "../../services/gemini-api-service.js";

addFavicon();
const inputTextField = get("input-text-field");
const inputAttachmentField = get("input-file-attachment");
const formInputField = get("form-input-field");

const divChatMessages = get("div-chat-messages");
const divAttachmentIcon = get("div-attachment-icon");

addOnSubmit(formInputField, submitQuery);
addOnChange(inputAttachmentField, addAttachmentIcon);
addOnClick(divAttachmentIcon, removeAttachmentIcon);

async function submitQuery(event) {
    event.preventDefault();
    window.scrollTo(0, document.body.scrollHeight);

    const queryText = inputTextField.value;
    const queryFiles = Array.from(inputAttachmentField.files);
    if (queryText === "" && queryFiles.length === 0) { return };
    inputTextField.value = "";
    // inputAttachmentField.files = [];
    
    const messageField = createQueryContainer(queryText, queryFiles);
    divChatMessages.appendChild(messageField);
    

    const response = await getMultimodalResponse(queryText, queryFiles);
    
    
    const responseField = createResponseContainer(response);

    divChatMessages.appendChild(responseField);
    formInputField.reset();
}

function addAttachmentIcon(event) {
    const files = event.target.files;

    for (const file of files) {
        const img = createElement("img");
        img.setAttribute("src", URL.createObjectURL(file));
        img.setAttribute("id", Math.random().toString().slice(2));
        divAttachmentIcon.appendChild(img);
    }
}

function removeAttachmentIcon(event) {
    const element = get(event.target.id);
    element.remove();
    inputAttachmentField.files = inputAttachmentField.files.filter((file) => file.id !== element.id);
}