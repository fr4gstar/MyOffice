-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Feb 2016 um 22:52
-- Server-Version: 10.1.8-MariaDB
-- PHP-Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `myoffice`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `note` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `contact`
--

INSERT INTO `contact` (`id`, `firstname`, `lastname`, `company`, `email`, `phonenumber`, `note`) VALUES
(1, 'Testname', 'Tester', 'Google', 'google@google.de', '1234234215', '- CEO'),
(54, 'Steve', 'Jobs', 'Apple Inc.', 'jobs@apple.com', '', ''),
(68, 'Anh', 'Le Hong', 'Inheco GmbH', 'ers', '', '<3'),
(84, 'Sergej', 'Bardin', 'Herr', 'sergej_bardin@yahoo.de', '', ''),
(85, 'Testkontakt', 'Keiner', 'testsgsg', '', '', ''),
(86, 'test', '', '', 'test', '', 'test'),
(87, 'sdfsgsd', 'gsdg', '', 'sdgsdg', 'sdgsd', ''),
(88, 'Tester', '', '', 'tester', '', ''),
(89, 'test', '', '', 'test', '', 'tets');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `event`
--

CREATE TABLE `event` (
  `id` int(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `startDate`, `endDate`) VALUES
(1, 'test', 'beschreibung lorum ipsum blab labl', '2016-02-14', '2016-02-14');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `note`
--

INSERT INTO `note` (`id`, `title`, `description`) VALUES
(11, 'Bei Real gibts Fisch', 'nur den einen 3'),
(13, 'Youtube Vids', 'so 2 dinger schauen'),
(14, 'Wichtige Notiz!', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'),
(15, 'Tolle Notiz!', 'Super wichtige Notiz'),
(16, 'Notiz', 'Note'),
(20, 'Test', 'tester'),
(21, 'Tester', 'test'),
(23, 'Viel Lesen', 'lesen ist gut! ... aber langsam anfangen ...'),
(24, 'test', 'test'),
(25, 'test', 'test');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rel_user_contact`
--

CREATE TABLE `rel_user_contact` (
  `id` int(255) NOT NULL,
  `uid` int(255) NOT NULL,
  `cid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rel_user_contact`
--

INSERT INTO `rel_user_contact` (`id`, `uid`, `cid`) VALUES
(1, 2, 1),
(2, 2, 1),
(58, 4, 54),
(72, 4, 68),
(88, 4, 84),
(89, 5, 85),
(90, 4, 86),
(91, 4, 87),
(92, 4, 88),
(93, 4, 89);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rel_user_event`
--

CREATE TABLE `rel_user_event` (
  `id` int(255) NOT NULL,
  `uid` int(255) NOT NULL,
  `eid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rel_user_event`
--

INSERT INTO `rel_user_event` (`id`, `uid`, `eid`) VALUES
(1, 4, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rel_user_note`
--

CREATE TABLE `rel_user_note` (
  `id` bigint(20) NOT NULL,
  `uid` int(20) NOT NULL,
  `nid` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rel_user_note`
--

INSERT INTO `rel_user_note` (`id`, `uid`, `nid`) VALUES
(11, 4, 11),
(13, 4, 13),
(14, 4, 14),
(15, 4, 15),
(16, 4, 16),
(20, 4, 20),
(21, 4, 21),
(23, 4, 23),
(24, 5, 24),
(25, 4, 25);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rel_user_task`
--

CREATE TABLE `rel_user_task` (
  `id` bigint(20) NOT NULL,
  `uid` int(20) NOT NULL,
  `tid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rel_user_task`
--

INSERT INTO `rel_user_task` (`id`, `uid`, `tid`) VALUES
(1, 4, 1),
(3, 4, 3),
(7, 4, 8),
(8, 4, 9),
(9, 4, 10),
(10, 4, 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `task`
--

CREATE TABLE `task` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `note` varchar(10000) NOT NULL,
  `elapsedTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `task`
--

INSERT INTO `task` (`id`, `title`, `description`, `note`, `elapsedTime`) VALUES
(1, 'Aufgabe 1', 'Aufgabe 1', '', '00:01:11'),
(3, 'fullcalender.io', 'Fullcalender in das MyOffice einbinden LFKjsülädkngsädölgnksälknvsölgse f cksndsd.l nx.,gnaslkdgfasxykh', '', '00:00:00'),
(6, '', '', '', '10:14:00'),
(8, 'Aufgbae 6', 'Beschreibung', 'war leicht', '00:00:04'),
(9, 'Titelösdlgk', 'beschreinugnsbgsökdgjsdg', '1. ', '00:00:10'),
(10, 'Titel', 'Beshclösgkjös', 'Notizjsdögl', '11:16:47'),
(11, 'Tester', 'sgsdgsgsg', '', '00:00:07');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `gender` char(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` text NOT NULL,
  `sid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `gender`, `password`, `email`, `country`, `sid`) VALUES
(2, 'Sergej', 'Bardin', 'm', '3c51c92e633cf19b0285ef739604cd8b', 'sergej.ba@googlemail.com', 'Deutschland', '56'),
(3, 'S', 'B', 'm', 'ed2b1f468c5f915f3f1cf75d7068baae', 'sergej_bardin1@yahoo.de', 'Deutschland', '56'),
(4, 'Sergej', 'Bardin', 'm', 'ed2b1f468c5f915f3f1cf75d7068baae', 'sergej_bardin@yahoo.de', 'Deutschland', '56cb7ad5664c6'),
(5, 'Siegfried', 'Schmall', 'm', 'ed2b1f468c5f915f3f1cf75d7068baae', 'siggix@yahoo.de', '?sterreich', '56c9d6a4bfb99');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rel_user_contact`
--
ALTER TABLE `rel_user_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `cid` (`cid`);

--
-- Indizes für die Tabelle `rel_user_event`
--
ALTER TABLE `rel_user_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `eid` (`eid`);

--
-- Indizes für die Tabelle `rel_user_note`
--
ALTER TABLE `rel_user_note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `nid` (`nid`);

--
-- Indizes für die Tabelle `rel_user_task`
--
ALTER TABLE `rel_user_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `tid` (`tid`);

--
-- Indizes für die Tabelle `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT für Tabelle `event`
--
ALTER TABLE `event`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT für Tabelle `rel_user_contact`
--
ALTER TABLE `rel_user_contact`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT für Tabelle `rel_user_event`
--
ALTER TABLE `rel_user_event`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `rel_user_note`
--
ALTER TABLE `rel_user_note`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT für Tabelle `rel_user_task`
--
ALTER TABLE `rel_user_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `task`
--
ALTER TABLE `task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `rel_user_contact`
--
ALTER TABLE `rel_user_contact`
  ADD CONSTRAINT `rel_user_contact_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rel_user_contact_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `contact` (`id`);

--
-- Constraints der Tabelle `rel_user_event`
--
ALTER TABLE `rel_user_event`
  ADD CONSTRAINT `rel_user_event_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rel_user_event_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `event` (`id`);

--
-- Constraints der Tabelle `rel_user_note`
--
ALTER TABLE `rel_user_note`
  ADD CONSTRAINT `rel_user_note_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rel_user_note_ibfk_2` FOREIGN KEY (`nid`) REFERENCES `note` (`id`);

--
-- Constraints der Tabelle `rel_user_task`
--
ALTER TABLE `rel_user_task`
  ADD CONSTRAINT `rel_user_task_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rel_user_task_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `task` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
