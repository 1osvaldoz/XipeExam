function loadData() {
    $("*[data-model]").on("change", function (e) {
        var key = $(e.target).data("prop");
        var model = $(e.target).data("model");

        if (window[model] == null) {
            window[model] == {}
        }

        if (key) {
            if ($(e.target).is("input[type='checkbox']")) {
                window[model][key] = $(e.target).prop("checked");
                return;

            } else if ($(e.target).hasClass("datepicker")) {

                var picker = $(e.target).pickadate('picker');


                window[model][key] = picker.get('select', 'yyyy-mm-dd');

            } else if ($(e.target).is("select")) {
                let textSelect = e.target.selectedOptions[0].text;
                try {
                    window[model][key] = Number($(e.target).val());

                }
                catch (e) {
                    window[model][key] = ($(e.target).val());

                }
                //if (textSelect) { 
                //    window[model][key] = e.target.selectedOptions[0].value;
                //}
            } else if ($(e.target).is("input[type='file']")) {

                if (this.files && this.files[0]) {

                    var FR = new FileReader();
                    var nombre = this.files[0].name;
                    FR.addEventListener("load", function (e) {
                        var valor = e.target.result;
                        window[model][key] = valor.substring(valor.indexOf("base64") + 7, valor.length);
                        window[model][key + "Nombre"] = nombre;
                    });

                    FR.readAsDataURL(this.files[0]);
                }

            }
            else {
                if ($(e.target).is("input[type='radio']")) {
                    window[model][key] = $(e.target).data("value")

                }
                else {
                    if ($(e.target).data("casesensitive") == 0) {
                        window[model][key] = String($(e.target).val());
                    }
                    else {
                        window[model][key] = String($(e.target).val()).toUpperCase();

                    }
                }
            }

        }
    });
}

var loading = [];
var histPage = [];
function mostrarCargando() {
    $("#loader").show();
    loading.push(1);

}

function ocultarCargando() {
    loading.pop();
    if (loading.length == 0)
        $("#loader").hide();
}
function mostrarCargandoSlow() {
    $("#loader").show("slow");
    loading.push(1);
}

function ocultarCargandoSlow() {
    loading.pop();
    if (loading.length == 0)
        $("#loader").hide("slow");
}