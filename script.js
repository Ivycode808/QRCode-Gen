//TEXT//
const dataInput = document.querySelector('#data');
//IMAGE FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked')
//COLORs//
const mainColor = document.querySelector('#color');
const mainColorValue = document.querySelector('#color-value');

const backGroundColor = document.querySelector('#bg-color');
const backgroundcolorValue = document.querySelector('#bg-color-value');


updateColor = e => {
    const value = e.target.value;
    mainColorValue.innerText = value;
}
updateBackgroundColor = e => {
    const value = e.target.value;
    backgroundcolorValue.innerText = value;
}
const addColoraddListeners = () => {
   backGroundColor.addEventListener('change', updateBackgroundColor);
   mainColor.addEventListener('change', updateColor);
}
  addColoraddListeners();

//SLIDERS//
const sizeSliding = document.querySelector('#size');
const marginSliding = document.querySelector('#margin');

const sizeSlidingValue = document.querySelector('#size-value');
const marginSlidingValue = document.querySelector('#margin-value');

updateSize = e => {
    const value = e.target.value;
    sizeSlidingValue.innerText = `${value} x ${value}`
}

updateMargin = e => {
    const value = e.target.value;
    marginSlidingValue.innerText = `${value} px`;
}
const addsliderEventListener = () => {
    sizeSliding.addEventListener('change', updateSize );
    marginSliding.addEventListener('change', updateMargin);

}
addsliderEventListener()
// DATA/SUBMIT 
const submitButton = document.querySelector('#cta');

const preparedParameters = params => 
    ({
        data : params.data,
        size: `${params.size} x ${params.size}`,
        color: params.color.replace('#',''),
        bgcolor: params.bgColor.replace('#',''),
        qzone: params.qZone,
        format: params.format,
    })

const settingsContainer = document.querySelector('#qr-code-settings')
const resultsContainer = document.querySelector('#qr-code-result')
const qrCodeImage = document.querySelector('#qr-code-image')



const displayQRCode = (imgURL) => {
    settingsContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgURL)
}

 getQRCode = (parameters) => {
    const urlParams = (new URLSearchParams(parameters).toString());
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';

    const fullUrl = `${baseUrl}?${urlParams}`;
   
    fetch(fullUrl).then(response => {
        if (response.status === 200){
            displayQRCode(fullUrl);
        }
    });
}

const dataINputaddListener = () => {
    dataInput.addEventListener('change', (e)=> {
        if(e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.addAttribute('disabled', true);
        }
    })
}
dataINputaddListener()


const showErrorInput = () => {
    dataInput.classList.add('error');}
const onSubmit = () => {
    console.log('here to rock');

    const data = dataInput.value;
    if(!data.length) {
       return showErrorInput();
    }
    const color = mainColor.value;
    const bgColor = backGroundColor.value;
    const size = sizeSliding.value;
    const qZone = marginSliding.value;
    const format = imageFormat.value;

const parameters = preparedParameters({data, color, bgColor, size, qZone, format});

    getQRCode(parameters)
}

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit)
}
addSubmitEventListener()
//EDIT BUTTON//

const editButton = document.querySelector('#edit')
const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
}

const addEditButtonEventListener = () => {
    editButton.addEventListener('click', onEdit)
}

addEditButtonEventListener()