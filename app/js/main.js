'use strict';

(function($){
	$(document).ready(function() {
		// Code

		window.onload = function() {
			const table = document.getElementById('wordTable');
			const rows = table.getElementsByTagName('tr');
		
			for (let i = 1; i < rows.length; i++) {
				const cell = rows[i].getElementsByTagName('td')[0];
				let words = cell.innerText.split(/\s+/); // Разделяем строку по пробелам и любым разделителям
		
				// Убедимся, что строка содержит хотя бы одно слово для замены
				if (words.length > 1) {
					// Выбираем случайное слово для замены на input
					const randomIndex = Math.floor(Math.random() * words.length);
					const correctWord = words[randomIndex];
		
					// Создаем элемент input
					const input = document.createElement('input');
					input.type = 'text';
					input.size = correctWord.length;
					input.placeholder = '_'.repeat(correctWord.length); // Прочерки в инпуте
					input.dataset.correctWord = correctWord;
		
					// Отключаем автозаполнение и автокоррекцию для инпутов
					input.setAttribute('autocomplete', 'off');
					input.setAttribute('autocorrect', 'off');
					input.setAttribute('spellcheck', 'false');
		
					// Очищаем содержимое ячейки и вставляем слова заново
					cell.innerHTML = ''; // Очищаем ячейку
		
					words.forEach((word, index) => {
						if (index === randomIndex) {
							cell.appendChild(input); // Заменяем выбранное слово на input
						} else {
							const textNode = document.createTextNode(word + ' ');
							cell.appendChild(textNode); // Добавляем текст обратно
						}
					});
		
					// Явно добавляем фокус и задержку для предотвращения проблем с мобильными устройствами
					setTimeout(() => input.focus(), 100);
		
					// Добавляем событие на ввод текста
					input.addEventListener('input', handleInput);
					input.addEventListener('touchstart', handleInput); // Обработка на сенсорных устройствах
		
				} else {
					console.warn('Строка слишком короткая для замены:', cell.innerText);
				}
			}
		
			// Обработчик ввода
			function handleInput(event) {
				const input = event.target;
				const cell = input.parentNode;
		
				if (input.value === input.dataset.correctWord) {
					// Подсвечиваем ячейку при правильном вводе
					cell.classList.add('correct');
					input.disabled = true; // Отключаем input после правильного ответа
				} else {
					cell.classList.remove('correct');
				}
			}
		};
		
		
		
		
		
		
    


		
		
		
		
		
		
	});
})(jQuery);
