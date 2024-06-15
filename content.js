function toClipBoard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Текст скопирован в буфер обмена');
    }).catch(function(err) {
        console.error('Ошибка при копировании текста: ', err);
    });
}

async function getAnswer(text) {
    const url = 'https://87.251.86.97:1488/api/v1/getAnswer?text=' + encodeURIComponent(text);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.answer) {
            return data.answer;
        } else {
            throw new Error('No answer found in response');
        }
    } catch (error) {
        console.error('Fetch error: ', error);
        return null; // Или любое другое значение, указывающее на ошибку
    }
}

async function SelectRightAnswer(questionText){
    const rightAnswer = await getAnswer(questionText);

    if (rightAnswer === null) {
        console.error('Правильный ответ не найден');
    }

    // Получение всех элементов с ответами
    const answers = document.querySelectorAll('.answer .d-flex.w-auto');

    // Перебор всех элементов и проверка текста ответа
    answers.forEach(answerElem => {
        const answerText = answerElem.querySelector('.flex-fill').textContent.trim();

        if (answerText.includes(rightAnswer) || rightAnswer.includes(answerText))  {
            console.log(rightAnswer+" "+answerText)
            // Найден правильный ответ, кликаем на соответствующий радиокнопку
            const radioButton = answerElem.previousElementSibling;
            if (radioButton && radioButton.type === 'radio') {
                radioButton.click();
                console.log('Правильный ответ выбран:', answerText);
            }
        }
    });
}
var submitDiv = document.querySelector('div.submitbtns');
var submitInput = document.createElement('button');
var questionText = document.querySelector("div.formulation.clearfix").textContent
submitInput.type = 'button';
submitInput.innerHTML = "Скопировать вопрос"
submitInput.style = "color: #fff;background-color: #186bae;border-color: #186bae;border: 1px solid transparent;padding: 0.375rem 0.75rem;font-size: .9375rem;line-height: 1.5;border-radius: 0;margin-left: 15px;"
submitInput.onclick = function() {
    toClipBoard(questionText);
};
submitDiv.appendChild(submitInput);



var submitInput = document.createElement('button');
submitInput.type = 'button';
submitInput.innerHTML = "Получить ответ"
submitInput.style = "color: #fff;background-color: #186bae;border-color: #186bae;border: 1px solid transparent;padding: 0.375rem 0.75rem;font-size: .9375rem;line-height: 1.5;border-radius: 0;margin-left: 15px;"
submitInput.onclick = async function() {
    alert(await getAnswer(questionText))
};
submitDiv.appendChild(submitInput);


var submitInput = document.createElement('button');
submitInput.type = 'button';
submitInput.innerHTML = "Вставить ответ"
submitInput.style = "color: #fff;background-color: #186bae;border-color: #186bae;border: 1px solid transparent;padding: 0.375rem 0.75rem;font-size: .9375rem;line-height: 1.5;border-radius: 0;margin-left: 15px;"
submitInput.onclick = function() {
    SelectRightAnswer(questionText);
};
submitDiv.appendChild(submitInput);

