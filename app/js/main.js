'use strict';

(function($) {
    $(document).ready(function() {
        const table = document.getElementById('wordTable');
        if (!table) {
            console.warn('Таблица не найдена!');
            return;
        }

        const rows = table.getElementsByTagName('tr');

        if (rows.length === 0) {
            console.warn('Нет строк в таблице!');
            return; // Выход, если нет строк
        }

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');

            if (cells.length === 0) {
                console.warn('Нет ячеек в строке:', i);
                continue; // Пропустить, если ячейки не найдены
            }

            const cell = cells[0]; // Получаем первую ячейку в строке
            let words = cell.textContent.trim().split(/\s+/); // Разделяем строку по пробелам

            // Проверка, есть ли слова в строке
            if (words.length > 1) {
                const randomIndex = Math.floor(Math.random() * words.length);
                const correctWord = words[randomIndex];

                // Создание инпута
                const input = document.createElement('input');
                input.type = 'text';
                input.size = correctWord.length;
                input.placeholder = ' '.repeat(correctWord.length);
                input.dataset.correctWord = correctWord;

                // Отключение автозаполнения
                input.setAttribute('autocomplete', 'off');
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('spellcheck', 'false');

                // Очистка содержимого ячейки и вставка слов
                cell.innerHTML = ''; // Очищаем ячейку

                words.forEach((word, index) => {
                    if (index === randomIndex) {
                        cell.appendChild(input); // Вставляем инпут вместо слова
                    } else {
                        cell.appendChild(document.createTextNode(word + ' ')); // Добавляем остальные слова
                    }
                });

                // Фокусировка на инпуте с небольшой задержкой
                setTimeout(() => {
                    input.focus();
                }, 100);

                // Обработчик ввода
                input.addEventListener('input', function() {
                    if (input.value.trim() === input.dataset.correctWord) {
                        cell.classList.add('correct');
                        input.disabled = true; // Отключаем инпут после правильного ввода
                    } else {
                        cell.classList.remove('correct');
                    }
                });

            } else {
                console.warn('Недостаточно слов в строке:', cell.textContent);
            }
        }
    });
})(jQuery);
