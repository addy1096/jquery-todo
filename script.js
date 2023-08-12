$(document).ready(function() {
	// Load the existing to-do items from local storage, if any
	var existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

	// Render the existing to-do items
	for (var i = 0; i < existingTodos.length; i++) {
		renderTodoItem(existingTodos[i]);
	}

	// Add new to-do item
	$('#new-todo').keypress(function(e) {
		if (e.which == 13) {
			var newTodo = $('#new-todo').val().trim();
			if (newTodo !== '') {
				var todoItem = { text: newTodo };
				renderTodoItem(todoItem);
				saveTodoItem(todoItem);
				$('#new-todo').val('');
			}
		}
	});

	// Remove to-do item
	$('#todo-list').on('click', '.delete-button', function() {
		var todoItem = $(this).closest('li').data('todo');
		removeTodoItem(todoItem);
		$(this).closest('li').remove();
	});

	function renderTodoItem(todoItem) {
		var todoHtml = '<li data-todo=\'' + JSON.stringify(todoItem) + '\'>' +
			'<span class="todo-text">' + todoItem.text + '</span>' +
			'<button class="delete-button">Delete</button>' +
			'</li>';
		$('#todo-list').append(todoHtml);
	}

	function saveTodoItem(todoItem) {
		var existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
		existingTodos.push(todoItem);
		localStorage.setItem('todos', JSON.stringify(existingTodos));
	}

	function removeTodoItem(todoItem) {
		var existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
		for (var i = 0; i < existingTodos.length; i++) {
			if (JSON.stringify(existingTodos[i]) === JSON.stringify(todoItem)) {
				existingTodos.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('todos', JSON.stringify(existingTodos));
	}
});
