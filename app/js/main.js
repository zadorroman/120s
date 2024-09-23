'use strict';

(function($){
	$(document).ready(function() {
		// Code

		window.onload = function() {
			const table = document.getElementById('wordTable');
			const rows = table.getElementsByTagName('tr');
		
			for (let i = 1; i < rows.length; i++) {
				const cell = rows[i].getElementsByTagName('td')[0];
				let words = cell.innerText.split(' '); // Разделяем строку на слова
		
				// Выбираем случайное слово
				const randomIndex = Math.floor(Math.random() * words.length);
				const correctWord = words[randomIndex];
		
				// Создаем новый input элемент
				const input = document.createElement('input');
				input.type = 'text';
				input.size = correctWord.length;
				input.placeholder = ' '.repeat(correctWord.length); // Прочерки
				input.dataset.correctWord = correctWord;
		
				// Очищаем содержимое ячейки и вставляем каждое слово
				cell.innerHTML = ''; // Очищаем ячейку
		
				// Вставляем слова обратно, заменяя одно случайное слово на инпут
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
						// Подсвечиваем всю ячейку зелёным
						cell.classList.add('correct');
						input.disabled = true; // Отключаем input после правильного ввода
					} else {
						cell.classList.remove('correct');
					}
				});
			}
		};
		
		
    


		
		
		
		
		
		
	});
})(jQuery);
