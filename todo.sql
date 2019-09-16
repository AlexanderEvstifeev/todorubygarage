-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 16 2019 г., 13:17
-- Версия сервера: 5.7.25
-- Версия PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `todo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `Name`) VALUES
(1, 'первій таск'),
(2, 'kkkk'),
(3, 'Недвижимость'),
(4, 'New TODO LIST1568568805604'),
(5, 'New TODO LIST1568568818852'),
(6, 'New TODO LIST1568579784034'),
(7, ''),
(8, 'New TODO LIST1568580910818'),
(9, 'New TODO LIST1568581678100');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `tasksID` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `project_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`tasksID`, `Title`, `status`, `project_id`) VALUES
(1, 'хлеб', 'false', 1),
(2, 'соль', 'true', 1),
(3, 'вода', 'true', 2),
(4, 'ghj', 'false', 1),
(5, 'про', 'true', 2),
(6, 'купить хлеба и водки', 'true', 1),
(7, 'водку хлибній дар', 'false', 1),
(10, 'чуш', 'false', 1),
(11, 'чушка', 'false', 1),
(12, 'апрар', 'true', 1),
(13, 'drty', 'false', 1),
(14, 'квартира', 'true', 3),
(15, 'комната', 'false', 3),
(16, 'спальня', 'true', 3),
(17, 'кухня', 'false', 3),
(18, 'балкон', 'false', 3),
(32, '31аааааа', 'true', 1),
(33, 'ппп555', 'false', 1),
(34, 'заработало?', 'false', 1),
(35, 'всмісли оно заработало?', 'true', 4),
(36, 'как?', 'false', 4),
(37, 'не понимаю', 'false', 4),
(38, 'водичка', 'false', 1),
(39, '1123', 'false', 5),
(40, '456', 'false', 5),
(41, '456', 'false', 5),
(42, '48', 'false', 5),
(43, '456', 'false', 5),
(44, '67', 'false', 5),
(45, '556', 'false', 5),
(46, '556', 'false', 5),
(47, 'пр', 'false', 5),
(48, 'гге', 'true', 5),
(49, 'ggfh', 'true', 5),
(50, '6657', 'true', 5),
(51, 'опять не работает', 'true', 4),
(52, '', 'true', 4),
(53, ' ', 'true', 4),
(54, 'туалет', 'true', 3),
(55, 'диван', 'true', 3),
(56, 'шкаф', 'true', 3),
(57, 'к34', 'true', 2),
(58, 'щщз', 'true', 2),
(59, 'щщз', 'true', 2),
(60, 'ппппппп', 'true', 4),
(61, 'ууууу', 'true', 4),
(62, 'еее', 'true', 2),
(63, '4', 'true', 2),
(64, '6', 'true', 2),
(65, '98', 'true', 2),
(66, '4', 'true', 6),
(67, '18', 'true', 6),
(68, '18', 'true', 6),
(69, '6556', 'true', 6),
(70, '1', 'true', 6),
(71, 'е', 'true', 6),
(72, 'енг', 'true', 6),
(73, 'енг4', 'true', 6),
(74, '6', 'true', 6),
(75, '6', 'true', 6),
(76, '2', 'true', 7),
(77, 'еенг', 'true', 7),
(78, '456', 'true', 7),
(79, 'е', 'true', 7),
(80, '456456', 'true', 7),
(81, 'ггегеоо', 'true', 7),
(82, '6', 'true', 7),
(83, '7', 'true', 8),
(84, '68', 'true', 8),
(85, 'нннг', 'true', 8),
(86, '3,', 'true', 8),
(87, '3,', 'true', 8),
(88, 'ролрол', 'true', 8),
(89, 'нгенг', 'true', 9),
(90, 'нгш', 'true', 9);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`tasksID`),
  ADD KEY `project_id` (`project_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `tasksID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
