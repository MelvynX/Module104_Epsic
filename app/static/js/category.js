// on click button "edit" on the side of input name
function onEditName() {
  let name = $("#name");
  name.prop("disabled", false);
  $("#name-button-edit").hide();
  $("#name-button-save").show();
  name.focus();
}

// event focus out input name
function onSaveName(event) {
  // if save call by event
  if (event && event.key !== "Enter") return;

  let name = $("#name");

  if (name.val().length <= 2 || name.val().length >= 50) {
    toggleSnackbar("Name need to have between 2 and 50 caracters.", "danger");
    return;
  }

  name.prop("disabled", true);
  $("#name-button-edit").show();
  $("#name-button-save").hide();

  editCategory(API_CATEGORY_ID);
}

// on click button "edit" on the side of textarea description
function onEditDescription() {
  let description = $("#description");

  description.prop("disabled", false);
  $("#description-button-edit").hide();
  $("#description-button-save").show();
  description.focus();
}

// event focus out textarea description
function onSaveDescription(event) {
  // if save call by key event, do only if is enter key
  if (event && event.key !== "Enter") return;

  let description = $("#description");

  if (description.val().length < 5 || description.val().length >= 1000) {
    toggleSnackbar(
      "Description need to have between 5 and 1000 caracters.",
      "danger"
    );
    return;
  }
  description.prop("disabled", true);
  $("#description-button-edit").show();
  $("#description-button-save").hide();

  editCategory(API_CATEGORY_ID);
}

// idCategory: number, callback: Function
function editCategory(idCategory) {
  const description = $("#description").val();
  const name = $("#name").val();

  const newCategory = { category: { name: name, description: description } };
  const newCategoryJson = JSON.stringify(newCategory);

  $.ajax({
    url: `${API_URL}/categories/${idCategory}`,
    method: "PATCH",
    data: newCategoryJson,
    dataType: "json",
    contentType: "application/json",
    Accept: "application/json",
    success: (state) => {
      toggleSnackbar(state.status, state.state);
    },
    error: (result) => {
      console.warn(result.status);
      toggleSnackbar("Database has problem. Try an other time.", "danger");
    },
  });
}

// items - edit (id for know what input need to be changed)
function onEditItem(id) {
  $("#item-name-" + id)
    .prop("disabled", false)
    .focus();
  $("#item-description-" + id).prop("disabled", false);
  $(`#item-edit-${id}`).hide();
  $(`#item-save-${id}`).show();
}

function onSaveItem(id) {
  const name = $("#item-name-" + id);
  name.prop("disabled", true);
  const description = $("#item-description-" + id);
  description.prop("disabled", true);

  if (name.val().length <= 2 || name.val().length >= 50) {
    toggleSnackbar("Name need to have between 2 and 50 caracters.", "danger");
    return;
  }
  if (description.val().length < 5 || description.val().length >= 1000) {
    toggleSnackbar(
      "Description need to have between 5 and 1000 caracters.",
      "danger"
    );
    return;
  }

  $(`#item-edit-${id}`).show();
  $(`#item-save-${id}`).hide();
  updateItem(id);
}

// function to edit an item, API
function updateItem(idItem) {
  const name = $("#item-name-" + idItem).val();
  const description = $("#item-description-" + idItem).val();

  const newItem = { item: { name: name, description: description } };
  const newItemJson = JSON.stringify(newItem);

  $.ajax({
    url: `${API_URL}/items/${idItem}`,
    method: "PATCH",
    data: newItemJson,
    dataType: "json",
    contentType: "application/json",
    Accept: "application/json",
    success: (state) => {
      toggleSnackbar(state.status, state.state);
    },
    error: (result) => {
      console.warn("Request status :", result.status);
      toggleSnackbar("Database has problem. Try an other time.", "danger");
    },
  });
}

function displayCreateBox() {
  $("#box-hide-item").hide();
}

// for categories.html
// function to try if champs is correct on create new category
function onSubmitCategory() {
  let title = $("#name-category-new").val();

  if (title.length < 2 || title.length > 50) {
    toggleSnackbar("Title need to have between 3 and 49 caractes.", "danger");
    return;
  }

  $("#form-categories").submit();
}