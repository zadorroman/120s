'use strict';

(function($) {
    $(document).ready(function() {
        const table = document.getElementById('wordTable');
        const toggleButton = document.getElementById('toggle-button');

        if (!table) {
            console.warn('Таблица не найдена!');
            return;
        }

        const rows = table.getElementsByTagName('tr');

        if (rows.length === 0) {
            console.warn('Нет строк в таблице!');
            return; // Выход, если нет строк
        }

        // Восстановление состояния темного режима из localStorage
        if (localStorage.getItem('dark-mode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleButton.textContent = 'Heller Modus'; // Обновляем текст кнопки при загрузке
        }

        toggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            // Сохранение состояния в localStorage
            localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
            // Обновление текста кнопки
            toggleButton.textContent = isDarkMode ? 'Heller Modus' : 'Dunkelmodus';
        });

        Array.from(rows).forEach((row, rowIndex) => {
            const cells = row.getElementsByTagName('td');

            if (cells.length === 0) {
                console.warn('Нет ячеек в строке:', rowIndex);
                return; // Пропустить, если ячейки не найдены
            }

            const cell = cells[0]; // Получаем первую ячейку в строке
            const words = cell.textContent.trim().split(/\s+/); // Разделяем строку по пробелам

            // Проверка, есть ли слова в строке
            if (words.length > 1) {
                const randomIndex = Math.floor(Math.random() * words.length);
                const correctWord = words[randomIndex];

                // Создание инпута
                const input = createInput(correctWord);
                cell.innerHTML = ''; // Очищаем ячейку

                words.forEach((word, index) => {
                    if (index === randomIndex) {
                        cell.appendChild(input); // Вставляем инпут вместо слова
                    } else {
                        cell.appendChild(document.createTextNode(word + ' ')); // Добавляем остальные слова
                    }
                });

                // Фокусировка на инпуте с небольшой задержкой
                setTimeout(() => input.focus(), 100);

                // Обработчик ввода
                input.addEventListener('input', function() {
                    handleInput(input, cell);
                });
            } else {
                console.warn('Недостаточно слов в строке:', cell.textContent);
            }
        });

        function createInput(correctWord) {
            const input = document.createElement('input');
            input.type = 'text';
            input.size = correctWord.length;
            input.placeholder = ' '.repeat(correctWord.length);
            input.dataset.correctWord = correctWord;
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('autocorrect', 'off');
            input.setAttribute('spellcheck', 'false');
            return input;
        }

        function handleInput(input, cell) {
            if (input.value.trim() === input.dataset.correctWord) {
                cell.classList.add('correct');
                input.disabled = true; // Отключаем инпут после правильного ввода
            } else {
                cell.classList.remove('correct');
            }
        }
    });
})(jQuery);
