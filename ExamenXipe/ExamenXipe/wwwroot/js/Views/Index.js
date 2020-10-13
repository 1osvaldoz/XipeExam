var mail = {};
var indexFunction = {
    postAPI: function () {
        mostrarCargando();
        
        $.ajax({
            url: urlPost,
            crossDomain: true,
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(mail),
            success: function (respuesta) {

                //alert("Bienvenido " + respuesta.user.name)
                alert("Message send successfully!")
                ocultarCargando();


            },
            error: function (err, x, x2) {

                if (err.status == 202) {

                    alert("Message send successfully!")

                }
                else {
                    alert(err.responseText)

                }
                    ocultarCargando()
                    return false;

                }
            });
         
        return false;
    }
}

$(function () {
    $("#contactHead").empty();
    $("#contactHead").append(objForm.form_heading);
    var html = "";
    objForm.fields.map(function (item, i) {
        $("#formContainer").empty();

        var validations = "";
        Object.keys(item.input.validations).map(function (field, i) {
            validations += field+`="` + item.input.validations[field]+`" `;
        })

        switch (item.input.type) {
            case "textarea":
                html += ` 
                            <div class="col-md-12">

                                <div class="md-form">
                                    <textarea data-model="mail" data-prop="` + item.input.name + `" type="text" id="txtArea`+ i + `" name="` + item.name + `"   class="form-control md-textarea" ` + validations +`></textarea>
                                    <label for="` + item.input.name + `">`+item.label.text+`</label>
                                </div>
                        </div>`
                break;
            default:
                html += `<div class="col-md-6">
                            <div class="md-form mb-0">
                                <input  data-model="mail" data-prop="` + item.input.name + `" type="`+ item.input.type + `" id="txt` + i + `" name="` + item.input.name + `" class="form-control" ` + validations +`>
                                <label for="` + item.input.name + `" class="">`+ item.label.text +`</label>
                            </div>
                        </div>`
                break;
        }
    });
  html += ` 
                            <div class="col-md-12">

                                <div class="md-form">
                                   <button type="submit" class="btn btn-danger">`+ objForm.submit_button.text+`</button>
                                </div>
                        </div>`

    $("#formContainer").append(html);
    loadData()

})