'use strict'

$(function() {

    var $template = $('#test').html();
    var content;
    var userAnswer;
    var objectToJson;
    var jsonToObject;
    var localStorageGetData;
    var rightAnswer = [];
    var $modal= $('.modal-container');
    var modalElement = document.querySelector('.modal-block');


    var infoObject = {
        questions: [{
            id: 'id1',
            question: 'Какое значение по-умолчанию для стиля position?',
            answers: ['static', 'none', 'inline'],
            correct: 0
        }, {
            id: 'id2',
            question: 'Какое свойство используют для отмены плавающих границ и восстановления потока после плавающего контента?',
            answers: ['content', 'position', 'clear'],
            correct: 2
        }, {
            id: 'id3',
            question: 'Какой тэг существовал до HTML 5?',
            answers: ['object', 'article', 'output'],
            correct: 1
        }]
    };

    function writeToStorage() {

        objectToJson = JSON.stringify(infoObject);

        localStorage.setItem('questionsList', objectToJson);

        localStorageGetData = localStorage.getItem('questionsList');

        jsonToObject = JSON.parse(localStorageGetData);

        content = tmpl($template, jsonToObject);

        $('body').append(content);
    };

    function checkResult() {
        for (var i = 0; i < infoObject.questions.length; i++) {
            for (var j = 0; j < infoObject.questions[i].answers.length; j++) {
                if (document.querySelector('#' + infoObject.questions[i].id + i + j).checked) {
                    if (infoObject.questions[i].correct === j) {
                        rightAnswer[i] = true;
                    } else rightAnswer[i] = false;
                    break;
                } else {
                    rightAnswer[i] = false;
                }
            }
        }
        modalBlock();
        console.log(rightAnswer);
    };

    function modalBlock() {
        var wrongAnswer = true;
        modalElement.innerHTML = ('<h1>Список верных ответов</h1>');
        for (var i = 0; i < jsonToObject.questions.length; i++) {
            if (rightAnswer[i]) {
                modalElement.innerHTML += '<p>' + jsonToObject.questions[i].question + '<br><b>' + jsonToObject.questions[i].answers[jsonToObject.questions[i].correct] + '</b></p>'
                wrongAnswer = false;
            }
        }
        if (wrongAnswer) modalElement.innerHTML = ('<h1>Верных ответов нет!</h1>');
        modalElement.innerHTML += '<button class="btn btn-modal">Начать тест снова</button>';
        $modal.css('display', 'block');

        document.querySelector('.btn-modal').onclick = hideModal;
    }

    function hideModal() {
        location.href = location.href;
    }

    writeToStorage();

    document.querySelector('.btn').onclick = checkResult;
});