'use strict';

(function($) {
    $(document).ready(function() {
        window.onload = function() {
            const table = document.getElementById('wordTable');
            const rows = table.getElementsByTagName('tr');
        
            for (let i = 1; i < rows.length; i++) {
                const cell = rows[i].getElementsByTagName('td')[0];
                let words = cell.innerText.split(/\s+/); // Разделяем строку по пробелам
        
                if (words.length > 1) {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const correctWord = words[randomIndex];
        
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.size = correctWord.length;
                    input.placeholder = '*'.repeat(correctWord.length); // Прочерки в инпуте
                    input.dataset.correctWord = correctWord;

                    // Отключаем автозаполнение и автокоррекцию
                    input.setAttribute('autocomplete', 'off');
                    input.setAttribute('autocorrect', 'off');
                    input.setAttribute('spellcheck', 'false');
                    input.setAttribute('inputmode', 'text');
        
                    cell.innerHTML = ''; // Очищаем ячейку
        
                    words.forEach((word, index) => {
                        if (index === randomIndex) {
                            cell.appendChild(input);
                        } else {
                            const textNode = document.createTextNode(word + ' ');
                            cell.appendChild(textNode);
                        }
                    });
        
                    // Добавляем фокус с задержкой для мобильных устройств
                    setTimeout(() => input.focus(), 300);
        
                    // Обработчик ввода
                    input.addEventListener('input', handleInput);
                } else {
                    console.warn('Строка слишком короткая для замены:', cell.innerText);
                }
            }
        
            function handleInput(event) {
                const input = event.target;
                const cell = input.parentNode;
        
                if (input.value === input.dataset.correctWord) {
                    cell.classList.add('correct');
                    input.disabled = true; // Отключаем input после правильного ответа
                } else {
                    cell.classList.remove('correct');
                }
            }
        };
    });
})(jQuery);
