let new_project = document.querySelector("#new_project");

function getTodoProject() {
  fetch("/get-todo-project", {
    method: "GET"
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {
      let showBody = JSON.parse(body);

      //console.log('body= ', showBody);
      let out = "";

      for (let i = 0; i < showBody.length; i++) {
        out += `<div class="todos" id="todos-${showBody[i]["id"]}">`;

        out += '<div class="todos-header">';
        out += `<div id="editor"><textarea data-edit_area_id="${
          showBody[i]["id"]
        }" name="textHeader" class="textarea-edit" cols="50" autofocus></textarea>`;
        out += `</div>`;
        out += `<h3>${showBody[i]["Name"]}</h3>`;
        out += `<ul class="hidden"><li><a class="todos-action-edit" href="#" data-edit_todo_id="${
          showBody[i]["id"]
        }" id="edit-${showBody[i]["id"]}" title="Edit">Edit</a></li>`;
        out += `<li><a class="todos-action-remove" data-delete_todo_id="${
          showBody[i]["id"]
        }" id="${
          showBody[i]["id"]
        }" href="#" title="Delete">Delete</a></li></ul>`;
        out += `</div>`;
        out += `<div class="todo-bar">`;
        out += `<div class="todo-bar-new">`;
        out += `<form data-action-form="${showBody[i]["id"]}" id="new-task">`;
        out += `<input name placeholder="Добавте задачу" type="text">`;
        out += `<button> Add Task </button>`;
        out += `</form></div></div>`;
        //console.log('showBody[i].task=', JSON.parse("[" + showBody[i].task + "]"));

        let showTask = JSON.parse("[" + showBody[i].task + "]");

        out += `<div class="todo-list">`;
        out += `<table><tbody>`;

        for (let j = 0; j < showTask.length; j++) {
          // console.log('showBody[j].Title===', showTask[j]);
          if (showTask[j]["project_id"] != null) {
            if (showTask[j]["status"] == "true") {
              out += `<tr data-task-id="${
                showTask[j]["tasksID"]
              }" class="completed-task">`;
              out += `<td class="todo-list-checkbox"><input type="checkbox" checked></td>`;
            } else {
              out += `<tr data-task-id="${showTask[j]["tasksID"]}" >`;
              out += `<td class="todo-list-checkbox"><input type="checkbox"></td>`;
            }
            out += `<td class="todo-list-divider">&nbsp;</td>`;
            out += `<td class="todo-list-task"><p>${
              showTask[j]["Title"]
            }</p></td>`;
            out += `<td class="todo-list-actions">`;
            out += `<ul class="hidden">`;
            out += `<li><a class="todo-list-task-sort" href="#">Sort</a></li>`;
            out += `<li><a class="todo-list-task-edit" href="#">Edit</a></li>`;
            out += `<li><a class="todo-list-task-delete" href="#">Delete</a></li>`;
            out += `</ul></td>`;
            out += `</tr>`;
          }
        }
        out += `</table></tbody>`;
        out += `</div>`;

        out += `</div>`;
      }
      document.querySelector(".content").innerHTML = out;
    });
}

new_project.onclick = newProject;

function newProject(event) {
  fetch("/new_project", {
    method: "POST"
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {});
      getTodoProject();
}

document.addEventListener("DOMContentLoaded", function() {
  window.onload = function() {
    $(".todos-action-remove").click(function() {
      let deleteTodoId = $(this).attr("id");
      console.log("deleteTodoId = ", deleteTodoId);
      $("#todos-" + deleteTodoId).addClass("none");
      $.ajax({
        url: "/delete-todo",
        type: "DELETE",

        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ key: deleteTodoId }),
        success: function(res) {
          //getTodoProject();
        }
      });
      return false;
    });
    ///////////
    $(".todos-action-edit").click(function() {
      let editTodoId = $(this).data("edit_todo_id");
      let editText = $(this)
        .parent()
        .parent()
        .prev();
      let editArea = editText.prev();
      let editTextNext = editArea.find("textarea");

      editText.hide();
      editArea.show();

      editTextNext.text(editText.text()).keypress(function(e) {
        if (e.which == 13) {
          editText.text(editTextNext.val());
          editText.show();
          editArea.hide();

          $.ajax({
            url: "/edit-todo",
            type: "PUT",

            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ key: editTodoId, text: editTextNext.val() }),
            success: function(res) {
              //getTodoProject();
            }
          });
        }
      });
      editTextNext.text(editText.text()).blur(function(e) {
        editText.text(editTextNext.val());
        editText.show();
        editArea.hide();

        $.ajax({
          url: "/edit-todo",
          type: "PUT",

          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ key: editTodoId, text: editTextNext.val() }),
          success: function(res) {
            //getTodoProject();
          }
        });
      });

      return false;
    });
    ///////////////

    $(".todos-header").mouseover(function() {
      //console.log($(this).find('.hidden'));
      $(this)
        .find(".hidden")
        .show();
    });
    $(".todos-header").mouseleave(function() {
      //console.log($(this).find('.hidden'));
      $(this)
        .find(".hidden")
        .hide();
    });
    $("tr").mouseover(function() {
      //console.log($(this).find('.hidden'));
      $(this).css("backgroundColor", "#fbfcd4", "cursor", "pointer");
      $(this).css("cursor", "pointer");
      $(this)
        .find(".hidden")
        .show();
    });
    $("tr").mouseleave(function() {
      //console.log($(this).find('.hidden'));
      $(this).css("backgroundColor", "white");
      $(this)
        .find(".hidden")
        .hide();
    });

    $("form > button").click(function() {
      let formActionId = $(this)
        .parent()
        .data("action-form");
      let areaTextTask = $(this)
        .parent()
        .find("input");
      console.log(formActionId, areaTextTask.val());

      $.ajax({
        url: "/todo/new-task",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ key: formActionId, Title: areaTextTask.val() }),
        success: function(body) {
          let out;
          out += `<tr data-task-id="${body}" >`;
          out += `<td class="todo-list-checkbox"><input type="checkbox"></td>`;
          out += `<td class="todo-list-divider">&nbsp;</td>`;
          out += `<td class="todo-list-task"><p>${areaTextTask.val()}</p></td>`;
          out += `<td class="todo-list-actions">`;
          out += `<ul class="hidden">`;
          out += `<li><a class="todo-list-task-sort" href="#">Sort</a></li>`;
          out += `<li><a class="todo-list-task-edit" href="#">Edit</a></li>`;
          out += `<li><a class="todo-list-task-delete" href="#">Delete</a></li>`;
          out += `</ul></td>`;
          out += `</tr>`;
          $(`#todos-${formActionId}`)
            .find("tbody")
            .append(out);
          //$(this).parent().find('input').val('');
          areaTextTask.val("");
          //cleareInput = '';
          //console.log('cleareInput', cleareInput.val())
        }
      });
      return false;
    });

    $(".todo-list-checkbox input").click(function() {
      let completeId = $(this)
        .parent()
        .parent()
        .data("task-id");
      console.log(completeId);
      if ($(this).is(":checked")) {
        $.ajax({
          url: "/todo/complete-task",
          type: "PUT",

          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ key: completeId, status: "true" }),
          success: function(data) {}
        });
        let checkboxTrue = $(this)
          .parent()
          .parent()
          .addClass("completed-task");
      } else if ($(this).is(":not(:checked)")) {
        let checkboxFalse = $(this)
          .parent()
          .parent()
          .removeClass("completed-task");
        $.ajax({
          url: "/todo/complete-task",
          type: "PUT",

          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ key: completeId, status: "false" }),
          success: function(data) {}
        });
      }
    });

    $(".todo-list-task-delete").click(function() {
      let deleteTasksId = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
      deleteTasksId.addClass("none");
      $.ajax({
        url: "/todo/delete-task",
        type: "DELETE",

        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ key: deleteTasksId.data("task-id") }),
        success: function(res) {
          //getTodoProject();
        }
      });
      return false;
    });
    $(".todo-list-task-edit").click(function() {
      let editTasksId = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
      let editTaskTitleMap = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find("p");
      let editTaskTitle = editTaskTitleMap.text();
      editTaskTitleMap.replaceWith(
        `<textarea class="textarea-edit-task" data-edit-area_task=${editTasksId.data(
          "task-id"
        )} autofocus>${editTaskTitle}</textarea>`
      );

      console.log(editTasksId.data("task-id"));

      $(".textarea-edit-task").keypress(function(e) {
        if (e.which == 13) {
          let editNewText = $(this).val();
          $(this).replaceWith(`<p>${editNewText}</p>`);
          $.ajax({
            url: "/todo/edite-task",
            type: "PUT",

            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({
              key: editTasksId.data("task-id"),
              Title: editNewText
            }),
            success: function(res) {}
          });
        }
      });
      $(".textarea-edit-task").blur(function() {
        let editNewText = $(this).val();
        $(this).replaceWith(`<p>${editNewText}</p>`);
        $.ajax({
          url: "/todo/edite-task",
          type: "PUT",

          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({
            key: editTasksId.data("task-id"),
            Title: editNewText
          }),
          success: function(res) {}
        });
      });
      return false;

    });
  };
});
getTodoProject();
