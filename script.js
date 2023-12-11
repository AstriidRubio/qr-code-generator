// Text
const dataInput = document.querySelector('#data');

// Image Format
const imageFormat = document.querySelector('input[name="format"]:checked');

// Colors
const mainColorPicker = document.querySelector('#color');
const backgroundColorPicker = document.querySelector('#bg-color');

const mainColorValue = document.querySelector('#color-value');
const backgroundColorValue = document.querySelector('#bg-color-value');

const updateColor = (e) => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = (e) => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};

addColorPickerEventListeners();

// Sldes
const sizeSlider = document.querySelector('#size');
const marginSlider = document.querySelector('#margin');

const sizeValue = document.querySelector('#size-value');
const marginValue = document.querySelector('#margin-value');

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px ${value}`
};

const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListeners();

// Button
const submitButton = document.querySelector('#cta');

const showInputError = () => {
    dataInput.classList.add('error');
};

const dataInputEventListener = () => {
    dataInput.addEventListener('change', (e) => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        };
    });
};

dataInputEventListener();

const prepareParameters = (params) => {
    return {
        data: params.data,
        size: `${params.size} x ${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qzone,
        format: params.format,
    };
};

const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrcode = (imgUrl) => {
    settingsContainer.classList.add('flipped');
    resultContainer.classList.add('flipped');
    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = (parameters) => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;
    fetch(fullUrl).then(Response => {
        if (Response.status === 200) {
            displayQrcode(fullUrl);
        }
    });
}

const onSubmit = () => {
    const data = dataInput.value;
    if (!data.length) {
        return showInputError();
    }

    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qzone = marginSlider.value;
    const format = imageFormat.value;

    const parameters = prepareParameters({ data, color, bgColor, size, qzone, format });
    
    getQrCode(parameters);
};

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventListener();

const editButton = document.querySelector('#edit');

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultContainer.classList.remove('flipped');
};

const addEditButtonEventListener = () => {
    editButton.addEventListener('click', onEdit);
};

addEditButtonEventListener();