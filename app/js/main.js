'use strict';

(function($){
	$(document).ready(function() {
		// Code

		window.onload = function() {
			const table = document.getElementById('wordTable');
			const rows = table.getElementsByTagName('tr');
		
			for (let i = 1; i < rows.length; i++) {
				const cell = rows[i].getElementsByTagName('td')[0];
				let words = cell.innerText.split(/\s+/); // Разделяем строку на слова по пробелам или любым разделителям
		
				// Проверка, если в ячейке есть хотя бы одно слово
				if (words.length > 1) {
					// Выбираем случайное слово
					const randomIndex = Math.floor(Math.random() * words.length);
					const correctWord = words[randomIndex];
		
					// Создаем новый input элемент
					const input = document.createElement('input');
					input.type = 'text';
					input.size = correctWord.length;
					input.placeholder = '_'.repeat(correctWord.length); // Прочерки
					input.dataset.correctWord = correctWord;
		
					// Добавляем атрибуты для мобильных устройств
					input.setAttribute('autocomplete', 'off');
					input.setAttribute('autocorrect', 'off');
					input.setAttribute('spellcheck', 'false');
		
					// Очищаем содержимое ячейки и вставляем слова
					cell.innerHTML = ''; // Очищаем ячейку
		
					// Вставляем слова обратно, заменяя одно случайное слово на input
					words.forEach((word, index) => {
						if (index === randomIndex) {
							cell.appendChild(input); // Заменяем выбранное слово на input
						} else {
							const textNode = document.createTextNode(word + ' '); // Добавляем текст
							cell.appendChild(textNode);
						}
					});
		
					// Добавляем обработчик для проверки введённого слова
					input.addEventListener('input', function() {
						if (input.value === input.dataset.correctWord) {
							cell.classList.add('correct');
							input.disabled = true; // Отключаем input после правильного ввода
						} else {
							cell.classList.remove('correct');
						}
					});
				}
			}
		};
		
		
		
		
		
    


		
		
		
		
		
		
	});
})(jQuery);
