'use strict';

(function($) {
    $(document).ready(function() {
        const table = document.getElementById('wordTable');
        const toggleButton = document.getElementById('toggle-button');
        const shuffleToggle = document.getElementById('shuffle-toggle');

        if (!table) {
            console.warn('Таблица не найдена!');
            return;
        }

        const rows = Array.from(table.getElementsByTagName('tr'));

        if (rows.length === 0) {
            console.warn('Нет строк в таблице!');
            return;
        }

        // Восстановление состояния темного режима из localStorage
        if (localStorage.getItem('dark-mode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleButton.textContent = 'Heller Modus'; 
        }

        // Восстановление состояния тумблера перемешивания
        const isShuffleEnabled = localStorage.getItem('shuffle-mode') === 'enabled';
        shuffleToggle.checked = isShuffleEnabled;

        if (isShuffleEnabled) {
            renderTable(shuffleArray(rows));
        }

        // Перемешивание строк (исключая первый ряд)
        function shuffleArray(array) {
            const shuffled = array.slice(1); 
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return [array[0], ...shuffled];
        }

        // Обработчик нажатия кнопки темного режима
        toggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
            toggleButton.textContent = isDarkMode ? 'Heller Modus' : 'Dunkelmodus';
        });

        // Обработчик тумблера перемешивания
        shuffleToggle.addEventListener('change', () => {
            const shuffleRows = shuffleToggle.checked;
            localStorage.setItem('shuffle-mode', shuffleRows ? 'enabled' : 'disabled');

            if (shuffleRows) {
                renderTable(shuffleArray(rows));
            } else {
                renderTable(rows);
            }
        });

        // Рендеринг таблицы
        function renderTable(rows) {
            table.innerHTML = ''; 
            rows.forEach(row => {
                table.appendChild(row); 
            });
        }

        // Обработка строк таблицы
        rows.forEach((row, rowIndex) => {
            if (rowIndex === 0) return;

            const cells = row.getElementsByTagName('td');
            if (cells.length === 0) return;

            const cell = cells[0];
            const words = cell.textContent.trim().split(/\s+/);

            if (words.length > 1) {
                if (window.location.pathname.endsWith('Mila.html') && words.length >= 3) {
                    const randomIndexes = getRandomIndexes(words.length, 2);
                    const correctWords = [words[randomIndexes[0]], words[randomIndexes[1]]];

                    const input1 = createInput(correctWords[0]);
                    const input2 = createInput(correctWords[1]);

                    cell.innerHTML = '';

                    words.forEach((word, index) => {
                        if (index === randomIndexes[0]) {
                            cell.appendChild(input1);
                        } else if (index === randomIndexes[1]) {
                            cell.appendChild(input2);
                        } else {
                            cell.appendChild(document.createTextNode(word + ' '));
                        }
                    });

                    input1.addEventListener('input', function() {
                        handleInput(input1, cell);
                    });
                    input2.addEventListener('input', function() {
                        handleInput(input2, cell);
                    });

                    input1.addEventListener('mouseenter', function() {
                        showTooltip(input1, correctWords[0]);
                    });
                    input1.addEventListener('mouseleave', hideTooltip);
                    input2.addEventListener('mouseenter', function() {
                        showTooltip(input2, correctWords[1]);
                    });
                    input2.addEventListener('mouseleave', hideTooltip);
                } else {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const correctWord = words[randomIndex];

                    const input = createInput(correctWord);
                    cell.innerHTML = '';

                    words.forEach((word, index) => {
                        if (index === randomIndex) {
                            cell.appendChild(input);
                        } else {
                            cell.appendChild(document.createTextNode(word + ' '));
                        }
                    });

                    input.addEventListener('input', function() {
                        handleInput(input, cell);
                    });

                    input.addEventListener('mouseenter', function() {
                        showTooltip(input, correctWord);
                    });
                    input.addEventListener('mouseleave', hideTooltip);
                }
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
                input.disabled = true; 
            } else {
                cell.classList.remove('correct');
            }
        }

        function getRandomIndexes(max, count) {
            const indexes = [];
            while (indexes.length < count) {
                const randomIndex = Math.floor(Math.random() * max);
                if (!indexes.includes(randomIndex)) {
                    indexes.push(randomIndex);
                }
            }
            return indexes;
        }

// Функции для работы с подсказкой
function showTooltip(input, correctWord) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        document.body.appendChild(tooltip);
    }

    // Определяем задержку в зависимости от типа устройства
    const delay = window.innerWidth < 768 ? 10000 : 2000; // 2 секунды для мобильных и 1.5 секунды для ПК

    // Задержка перед показом подсказки
    setTimeout(() => {
        tooltip.textContent = `${correctWord}`;
        tooltip.style.position = 'absolute';

        // Проверяем, находится ли страница в темном режиме
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            // Стили для темного режима
            tooltip.style.backgroundColor = '#333';
            tooltip.style.color = '#fff';
            tooltip.style.border = '1px solid #555';
        } else {
            // Стили для светлого режима
            tooltip.style.backgroundColor = '#f9f9f9';
            tooltip.style.color = '#000';
            tooltip.style.border = '1px solid #ccc';
        }

        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.top = `${input.getBoundingClientRect().top - 30}px`;
        tooltip.style.left = `${input.getBoundingClientRect().right + 10}px`;
        tooltip.style.display = 'block';
    }, delay); // Задержка в зависимости от устройства
}


    
    

    function hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    });
})(jQuery);
