jQuery(document).ready(function(){
  // init div container for overview
  jQuery("#overview").append("<div class='ov_header'>Demn&auml;chst anstehende Termine</div><div id='ov_events'></div><div class='ov_header'>Zuletzt hinzugef&uuml;gt ...</div><div id='ov_contacts' class='overview_line'>Kontakte</div><div id='ov_notes' class='overview_line'>Notizen</div><div id='ov_tasks' class='overview_line'>Aufgaben</div>");
  jQuery("#ov_contacts").append("<table id='ov_contactTable' href='#'><tr><th>Vorname</th><th>Nachname</th><th>Firma</th><th>Email</th><th>Telefonnummer</th></tr></table>");
  jQuery("#ov_notes").append("<table id='ov_noteTable' href='#'><tr><th>Titel</th><th>Beschreibung</th></tr></table>");
  jQuery("#ov_tasks").append("<table id='ov_taskTable' href='#'><tr><th>Titel</th><th>Beschreibung</th><th>Zeit</th></tr></table>");
  jQuery("#ov_events").append("<table id='ov_eventTable' href='#'><tr><th>Titel</th><th>Beschreibung</th><th>Start</th><th>Ende</th></tr></table>");
});