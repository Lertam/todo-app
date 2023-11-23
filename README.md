Необходимо создать приложение-задачник (ToDo list).  
Backend на Node.js (Express), frontend на React c использованием центрального хранилища (redux, mobx или context provider). База данных - любая реляционная. К дизайну особых требований нет, должно быть аккуратно.

Задачи состоят из:

- имени пользователя;
- е-mail;
- текста задачи;

Стартовая страница - список задач с возможностью сортировки по имени пользователя, email и статусу.

- Вывод задач нужно сделать страницами по 3 штуки (с пагинацией).
- Видеть список задач и создавать новые может любой посетитель без авторизации.

Сделайте вход для администратора (логин "admin", пароль "123").

- Администратор имеет возможность редактировать текст задачи и поставить галочку о выполнении.
- Выполненные задачи в общем списке выводятся с соответствующей отметкой.