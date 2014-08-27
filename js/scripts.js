const RUTA_STATIC_BASE = "./";
var latitud, longitud, titulo, contentString, parametro_zoom, directionString, geocoder, map, mapa_inicializado, marker, autocomplete;
var latitudGenerica = 40.39641294387178;
var limiteCaracteres = 80;
var longitudGenerica = -3.7129999999999654;
var bordeRecorteImagen = 40;
var zoomRecorteImagen = 100;
var pageXBoton, pageXImagen, pageYImagen = 0;
var alturaProporcional, anchuraProporcional, alturaInicial, anchuraInicial, leftInicial, topInicial;
var imgCutWidth, imgCutHeight, imgOriginalWidth, imgOriginalHeight;
var imgPrevisualizacion;

$(document).ready(function() {
    alineacion_vertical();
    $(document).on("mousemove", draggable_boton_move);
    $(document).on("mousemove", draggable_imagen_move);
    $(document).on("mouseup", draggable_boton_off);
    $(document).on("mouseup", draggable_imagen_off);
    $('body, .campo-formulario-wrapper').on("click", combo_ocultar);
    $('#buscador-general-texto').on('blur', placeholder_general_mostrar);
    $('#buscador-general-texto').on('focus', placeholder_general_ocultar);
    $('#campo-direccion').on('blur', seleccionar_primera_opcion);
    $('#campo-direccion').on('focus', detectar_tecla);
    $('#campo-formulario-wrapper-activos').on("click", combo_activos_mostrar);
    $('#campo-formulario-lista-activos ul li').on("click", combo_activos_asignar);
    $('#campo-formulario-lista-activos ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-activos ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-estado').on("click", combo_estado_mostrar);
    $('#campo-formulario-lista-estado ul li').on("click", combo_estado_asignar);
    $('#campo-formulario-lista-estado ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-estado ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-estado-filtro').on("click", combo_estado_filtro_mostrar);
    $('#campo-formulario-lista-estado-filtro ul li').on("click", combo_estado_filtro_asignar);
    $('#campo-formulario-lista-estado-filtro ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-estado-filtro ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-provincia').on("click", combo_provincia_mostrar);
    $('#campo-formulario-lista-provincia ul li').on("click", combo_provincia_asignar);
    $('#campo-formulario-lista-provincia ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-provincia ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-provincia-local').on("click", combo_provincia_local_mostrar);
    $('#campo-formulario-lista-provincia-local ul li').on("click", combo_provincia_local_asignar);
    $('#campo-formulario-lista-provincia-local ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-provincia-local ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-tipo').on("click", combo_tipo_mostrar);
    $('#campo-formulario-lista-tipo ul li').on("click", combo_tipo_asignar);
    $('#campo-formulario-lista-tipo ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-tipo ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-tipo-filtro').on("click", combo_tipo_filtro_mostrar);
    $('#campo-formulario-lista-tipo-filtro ul li').on("click", combo_tipo_filtro_asignar);
    $('#campo-formulario-lista-tipo-filtro ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-tipo-filtro ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#campo-formulario-wrapper-precio').on("click", combo_precio_mostrar);
    $('#campo-formulario-lista-precio ul li').on("click", combo_precio_asignar);
    $('#campo-formulario-lista-precio ul li').on("mousemove", resaltado_combo_mostrar);
    $('#campo-formulario-lista-precio ul li').on("mouseleave", resaltado_combo_ocultar);
    $('#mask').on("click", modal_cerrar);
    $('#submit-formulario-contacto').on("click", validar_formulario);
    $('#submit-formulario-nuevo-usuario').on("click", validar_formulario);
    $('.barra-zoom').on("click", draggable_boton_click);
    $('.boton-barra-zoom').on("mousedown", draggable_boton_on);
    $('.botonAplicarModalBoxes').on("click", modal_recortar);
    $('.botonCancelarModalBoxes').on("click", modal_cerrar)
    $('.boton-submit').on("click", enviar_datos);
    $('.campo-formulario-wrapper-check').on("click", resaltado_check);
    $('.campo-formulario-wrapper-check').on("mouseenter", ayuda_icono_buscador_locales_mostrar);
    $('.campo-formulario-wrapper-check').on("mouseleave", ayuda_icono_buscador_locales_ocultar);
    $('.campo-formulario-wrapper-check-fila div.campo-formulario-wrapper').on("click", campo_formulario_check_resaltado);
    $('.campo-formulario-wrapper-check-fila div.campo-formulario-wrapper').on("mouseenter", campo_formulario_check_mostrar_info);
    $('.campo-formulario-wrapper-check-fila div.campo-formulario-wrapper').on("mouseleave", campo_formulario_check_ocultar_info);
    $('.cancelar-formulario-lista').on("click", formulario_lista_ocultar);
    $('.cancelar-resultado-lista').on("click", resultado_lista_ocultar);
    $('.cerrar-modalBoxes').on("click", modal_cerrar);
    $('.eliminar-foto').on("click", modal_eliminar);
    $('.enlace-ver-direccion').on("click", animacion_scroll_mapa);
    $('.foto-miniatura').on("mouseenter", foto_miniatura_hover);
    $('.foto-miniatura').on("mouseleave", foto_miniatura_unhover);
    $('.icono-evento').on("mouseenter", ayuda_icono_evento_mostrar);
    $('.icono-evento').on("mouseleave", ayuda_icono_evento_ocultar);
    $('.icono-instalaciones').on("mouseenter", ayuda_icono_instalaciones_mostrar);
    $('.icono-instalaciones').on("mouseleave", ayuda_icono_instalaciones_ocultar);
    $('.icono-instalaciones-resumen').on("mouseenter", ayuda_icono_instalaciones_resumen_mostrar);
    $('.icono-instalaciones-resumen').on("mouseleave", ayuda_icono_instalaciones_resumen_ocultar);
    $('.icono-informacion-adicional').on("mouseenter", ayuda_icono_informacion_adicional_mostrar);
    $('.icono-informacion-adicional').on("mouseleave", ayuda_icono_informacion_adicional_ocultar);
    $('.iconos-entrada-menu-eventos span').on("mouseenter", mostrar_tooltip);
    $('.iconos-entrada-menu-eventos span').on("mouseleave", ocultar_tooltip);
    $('.imagen-modalBoxes').on("mousedown", draggable_imagen_on);
    $('.limite-caracteres').on("keypress", limite_caracteres_comprobar);
    $('.limite-caracteres').on("keyup", limite_caracteres_actualizar);
    $('.menu-privado-lista-combo ul li').on("click", combo_privado_asignar);
    $('.menu-privado-lista-combo ul li').on("mousemove", resaltado_combo_mostrar);
    $('.menu-privado-lista-combo ul li').on("mouseleave", resaltado_combo_ocultar);
    $('.menu-privado-wrapper-combo').on("click", combo_privado_mostrar);
    $('.menu-privado-submit').on("click", validar_formulario_previo)
    $('.no-enlace').on("click", detener_enlace);
    $('.promociones-boton-lista').on("click", formulario_lista_mostrar);
    $('.seleccion-fichero').on("change", subir_fichero);
    //$('.subir-foto').on("click", seleccionar_fichero);
    $('.subir-foto').on("click", modal_abrir_localhost);
    $('.submit-formulario-lista').on("click", resultado_lista_mostrar);
    $('.submit-resultado-lista').on("click", resultado_lista_ocultar);
    $('#buscador-eventos-fecha, #buscador-eventos-fecha-final, #buscador-eventos-fecha-filtro, #buscador-eventos-fecha-final-filtro').datepicker({
        showOn: 'button',
        buttonImage: RUTA_STATIC_BASE + 'images/boton-transparente.png',
        dateFormat: "dd-mm-yy",
        beforeShow: function(input, inst) {
            setTimeout(function() {
                inst.dpDiv.css({
                    'border': 'solid 1px #ee9112'
                });
            }, 0);
        }
    });
    $('#buscador-eventos-fecha').datepicker("setDate", "Now");
    $('#buscador-eventos-fecha-filtro').datepicker("setDate", "Now");
    $('#buscador-eventos-fecha-final').datepicker("setDate", "Now");
    $('#buscador-eventos-fecha-final-filtro').datepicker("setDate", "Now");
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

function alineacion_vertical() {
    var altura_columna_izq = 0;
    var altura_columna_der = 0;
    var altura_parcial = 0;
    var margen_const = 16;
    if ($('.fotos-bloque-azul').length) {
        $('.separacion-contenedor-fotos').height($('#contenedor-fotos').height());
    };
    $('#columna-izquierda').children().each(function(index) {
        altura_parcial = parseInt($(this).css("margin-top"), 10) + parseInt($(this).css("padding-top"), 10) + parseInt($(this).css("height"), 10) + parseInt($(this).css("padding-bottom"), 10) + parseInt($(this).css("margin-bottom"), 10);
        if (altura_parcial < parseInt($('#columna-izquierda').css("height"), 10) && $(this).css("position") != "absolute") {
            altura_columna_izq += altura_parcial;
        }
    });
    $('#columna-derecha').children().each(function(index) {
        altura_parcial = parseInt($(this).css("margin-top"), 10) + parseInt($(this).css("padding-top"), 10) + parseInt($(this).css("height"), 10) + parseInt($(this).css("padding-bottom"), 10) + parseInt($(this).css("margin-bottom"), 10);
        if (altura_parcial < parseInt($('#columna-izquierda').css("height"), 10) && $(this).css("position") != "absolute") {
            altura_columna_der += altura_parcial;
        }
    });
    if (altura_columna_izq > altura_columna_der) {
        altura_columna_izq += margen_const;
        $('#columna-izquierda').css("min-height", "0");
        $('#columna-izquierda').css("height", altura_columna_izq + "px");
    } else {
        altura_columna_der += margen_const;
        $('#columna-izquierda').css("min-height", "0");
        $('#columna-izquierda').css("height", altura_columna_der + "px");
    };
}

function animacion_scroll_mapa(event) {
    $("html,body").animate({
        scrollTop: $("#map-canvas").offset().top
    }, 1000);
}

function ayuda_icono_buscador_locales_mostrar(event) {
    $(event.currentTarget).find('span.campo-formulario-check-icono').next().stop().animate({
        "right": "2px",
        "opacity": "1"
    }, 200).next().stop().animate({
        "opacity": "1"
    }, 500);
}

function ayuda_icono_buscador_locales_ocultar(event) {
    $(event.currentTarget).find('span.campo-formulario-check-icono').next().stop().animate({
        "right": "72px",
        "opacity": "0"
    }, 200).next().stop().animate({
        "opacity": "0"
    }, 200);
}

function ayuda_icono_evento_mostrar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "100px",
        "opacity": "1"
    }, 200).next().stop().animate({
        "opacity": "1"
    }, 500);
}

function ayuda_icono_evento_ocultar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "170px",
        "opacity": "0"
    }, 200).next().stop().animate({
        "opacity": "0"
    }, 200);
}

function ayuda_icono_informacion_adicional_mostrar(event) {
    $(event.currentTarget).next().stop().animate({
        "left": "0",
        "opacity": "1"
    }, 200).next().stop().animate({
        "opacity": "1"
    }, 500);
}

function ayuda_icono_informacion_adicional_ocultar(event)  {
    $(event.currentTarget).next().stop().animate({
        "left": "70px",
        "opacity": "0"
    }, 200).next().stop().animate({
        "opacity": "0"
    }, 200);
}

function ayuda_icono_instalaciones_mostrar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "30px",
        "opacity": "1"
    }, 200).next().stop().animate({
        "opacity": "1"
    }, 500);
}

function ayuda_icono_instalaciones_ocultar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "100px",
        "opacity": "0"
    }, 200).next().stop().animate({
        "opacity": "0"
    }, 200);
}

function ayuda_icono_instalaciones_resumen_mostrar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "118px",
        "opacity": "1"
    }, 200).next().stop().animate({
        "opacity": "1"
    }, 500);
}

function ayuda_icono_instalaciones_resumen_ocultar(event) {
    $(event.currentTarget).next().stop().animate({
        "right": "188px",
        "opacity": "0"
    }, 200).next().stop().animate({
        "opacity": "0"
    }, 200);
}

function buscar_combo(event) {
    var selector = event.data.selector;
    var letra = String.fromCharCode(event.keyCode);
    var opcombo = 0;
    var posibles = [];
    var posicion = 0;
    var encontrado = false;

    if (event.keyCode == 13) {
        if ($('.efecto').length == 1) {
            $('.efecto').click();
        };
        combo_ocultar();
    } else if (event.keyCode == 27) {
        combo_ocultar();
    } else {
        $(selector + ' ul li').each(function(index, value) {
            if (normalize($(value).text().substring(0, 1).toLowerCase()) == normalize(letra.toLowerCase())) {
                encontrado = true;
                posibles.push($(value));
            } else if (encontrado == true) {
                return true;
            }
        });
        if (encontrado == false) {
            return false;
        };
        encontrado = false;
        if (($('.efecto').length = 1) && ($('.efecto').text().substring(0, 1).toLowerCase() == letra.toLowerCase())) {
            for (var i = 0, j = posibles.length; i < j && encontrado == false; i++) {
                if (posibles[i].hasClass('efecto')) {
                    encontrado = true;
                    posicion = (i + 1) % posibles.length;
                }
            };
        }
        resaltado_combo_ocultar();
        posibles[posicion].addClass('efecto');
        if ((posibles[posicion].offset().top + posibles[posicion].height() >= posibles[posicion].parent().parent().offset().top + posibles[posicion].parent().parent().height()) || (posibles[posicion].offset().top <= posibles[posicion].parent().parent().offset().top)) {
            $(selector).scrollTop(posibles[posicion].offset().top - posibles[posicion].parent().offset().top);
        }
    }
    event.preventDefault();
}

function campo_formulario_check_mostrar_info() {
    $(this).parents('.menu-privado-parametro').find('p.menu-privado-label-explicacion').text($(this).find('.menu-privado-parametro-check-info').text());
}

function campo_formulario_check_ocultar_info() {
    $(this).parents('.menu-privado-parametro').find('p.menu-privado-label-explicacion').text('Pasa el ratón por encima para ver la descripción.');
}

function campo_formulario_check_resaltado() {
    if ($(this).hasClass('campo-formulario-wrapper-seleccionado')) {
        $(this).removeClass('campo-formulario-wrapper-seleccionado');
        $(this).find('input').val('0');
    } else {
        $(this).addClass('campo-formulario-wrapper-seleccionado');
        $(this).find('input').val('1');
    };
}

function combo_activos_asignar(event) {
    $('#buscador-locales-activos').val($(event.currentTarget).text());
}

function combo_activos_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-activos').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-activos').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-activos'
        }, buscar_combo);
    };
}

function combo_estado_asignar(event) {
    $('#buscador-eventos-estado').val($(event.currentTarget).text());
}

function combo_estado_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-estado').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-estado').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-estado'
        }, buscar_combo);
    };
}

function combo_estado_filtro_asignar(event) {
    $('#buscador-eventos-estado-filtro').val($(event.currentTarget).text());
}

function combo_estado_filtro_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-estado-filtro').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-estado-filtro').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-estado-filtro'
        }, buscar_combo);
    };
}

function combo_ocultar() {
    resaltado_combo_ocultar();
    $('.campo-formulario-lista').fadeOut(200);
    $(document).off("keyup");
}

function combo_precio_asignar(event) {
    $('#buscador-eventos-precio').val($(event.currentTarget).text());
}

function combo_precio_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-precio').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-precio').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-precio'
        }, buscar_combo);
    };
}
function combo_privado_asignar(event) {
    $(event.currentTarget).parents('div.menu-privado-wrapper-combo').find('input').val($(event.currentTarget).text());
}
function combo_privado_mostrar(event) {
    var visible = false;

    if ($(event.currentTarget).find('div.campo-formulario-lista').is(':hidden')) {
        visible = true;
        $(event.currentTarget).find('div.campo-formulario-lista').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': $(event.currentTarget).find('div.campo-formulario-lista')
        }, buscar_combo);
    };
}
function combo_provincia_asignar(event) {
    $('#buscador-eventos-provincia').val($(event.currentTarget).text());
}

function combo_provincia_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-provincia').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-provincia').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-provincia'
        }, buscar_combo);
    };
}

function combo_provincia_local_asignar(event) {
    $('#buscador-locales-provincia-local').val($(event.currentTarget).text());
}

function combo_provincia_local_mostrar(event) {
    var visible = false;

    if ($('#campo-formulario-lista-provincia-local').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-provincia-local').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-provincia-local'
        }, buscar_combo);
    };
}

function combo_tipo_asignar(event) {
    var color = $('.campo-formulario-icono-tipo').attr('class').match(/letra-co\S+/);
    var icono = $('.campo-formulario-icono-tipo').attr('class').match(/icon-\S+/);

    if (color != null && color.length > 0 && icono != null && icono.length > 0) {
        $('.campo-formulario-icono-tipo').removeClass(color[0]);
        $('.campo-formulario-icono-tipo').removeClass(icono[0]);

        switch ($(event.currentTarget).text()) {
            case 'Campeonato':
            $('.campo-formulario-icono-tipo').addClass('icon-campeonato');
            $('.campo-formulario-icono-tipo').addClass('letra-color-campeonato');
            break;
            case 'Cata':
            $('.campo-formulario-icono-tipo').addClass('icon-cata');
            $('.campo-formulario-icono-tipo').addClass('letra-color-cata');
            break;
            case 'Concierto':
            $('.campo-formulario-icono-tipo').addClass('icon-concierto');
            $('.campo-formulario-icono-tipo').addClass('letra-color-concierto');
            break;
            case 'Curso':
            $('.campo-formulario-icono-tipo').addClass('icon-curso');
            $('.campo-formulario-icono-tipo').addClass('letra-color-curso');
            break;
            case 'Danza':
            $('.campo-formulario-icono-tipo').addClass('icon-danza');
            $('.campo-formulario-icono-tipo').addClass('letra-color-danza');
            break;
            case 'Erasmus':
            $('.campo-formulario-icono-tipo').addClass('icon-erasmus');
            $('.campo-formulario-icono-tipo').addClass('letra-color-erasmus');
            break;
            case 'Exposición':
            $('.campo-formulario-icono-tipo').addClass('icon-exposicion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-exposicion');
            break;
            case 'Fiesta temática':
            $('.campo-formulario-icono-tipo').addClass('icon-fiesta');
            $('.campo-formulario-icono-tipo').addClass('letra-color-fiesta');
            break;
            case 'Inauguración':
            $('.campo-formulario-icono-tipo').addClass('icon-inauguracion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-inauguracion');
            break;
            case 'Karaoke':
            $('.campo-formulario-icono-tipo').addClass('icon-karaoke');
            $('.campo-formulario-icono-tipo').addClass('letra-color-karaoke');
            break;
            case 'Lectura':
            $('.campo-formulario-icono-tipo').addClass('icon-lectura');
            $('.campo-formulario-icono-tipo').addClass('letra-color-lectura');
            break;
            case 'Magia':
            $('.campo-formulario-icono-tipo').addClass('icon-magia');
            $('.campo-formulario-icono-tipo').addClass('letra-color-magia');
            break;
            case 'Monólogo':
            $('.campo-formulario-icono-tipo').addClass('icon-monologo');
            $('.campo-formulario-icono-tipo').addClass('letra-color-monologo');
            break;
            case 'Proyección':
            $('.campo-formulario-icono-tipo').addClass('icon-proyeccion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-proyeccion');
            break;
            case 'Retransmisión':
            $('.campo-formulario-icono-tipo').addClass('icon-retransmision');
            $('.campo-formulario-icono-tipo').addClass('letra-color-retransmision');
            break;
            case 'Tándem lingüístico':
            $('.campo-formulario-icono-tipo').addClass('icon-tandem');
            $('.campo-formulario-icono-tipo').addClass('letra-color-tandem');
            break;
            case 'Teatro':
            $('.campo-formulario-icono-tipo').addClass('icon-teatro');
            $('.campo-formulario-icono-tipo').addClass('letra-color-teatro');
            break;
            default:
            $('.campo-formulario-icono-tipo').addClass('icon-smile');
            $('.campo-formulario-icono-tipo').addClass('letra-color-smile');
            break;
        };
        $('#buscador-eventos-tipo').val($(event.currentTarget).text());
    };
}

function combo_tipo_mostrar(event) {
    var visible = false;
    if ($('#campo-formulario-lista-tipo').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-tipo').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-tipo'
        }, buscar_combo);
    };
}

function combo_tipo_filtro_asignar(event) {
    var color = $('.campo-formulario-icono-tipo').attr('class').match(/letra-co\S+/);
    var icono = $('.campo-formulario-icono-tipo').attr('class').match(/icon-\S+/);

    if (color != null && color.length > 0 && icono != null && icono.length > 0) {
        $('.campo-formulario-icono-tipo').removeClass(color[0]);
        $('.campo-formulario-icono-tipo').removeClass(icono[0]);

        switch ($(event.currentTarget).text()) {
            case 'Campeonato':
            $('.campo-formulario-icono-tipo').addClass('icon-campeonato');
            $('.campo-formulario-icono-tipo').addClass('letra-color-campeonato');
            break;
            case 'Cata':
            $('.campo-formulario-icono-tipo').addClass('icon-cata');
            $('.campo-formulario-icono-tipo').addClass('letra-color-cata');
            break;
            case 'Concierto':
            $('.campo-formulario-icono-tipo').addClass('icon-concierto');
            $('.campo-formulario-icono-tipo').addClass('letra-color-concierto');
            break;
            case 'Curso':
            $('.campo-formulario-icono-tipo').addClass('icon-curso');
            $('.campo-formulario-icono-tipo').addClass('letra-color-curso');
            break;
            case 'Danza':
            $('.campo-formulario-icono-tipo').addClass('icon-danza');
            $('.campo-formulario-icono-tipo').addClass('letra-color-danza');
            break;
            case 'Erasmus':
            $('.campo-formulario-icono-tipo').addClass('icon-erasmus');
            $('.campo-formulario-icono-tipo').addClass('letra-color-erasmus');
            break;
            case 'Exposición':
            $('.campo-formulario-icono-tipo').addClass('icon-exposicion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-exposicion');
            break;
            case 'Fiesta temática':
            $('.campo-formulario-icono-tipo').addClass('icon-fiesta');
            $('.campo-formulario-icono-tipo').addClass('letra-color-fiesta');
            break;
            case 'Inauguración':
            $('.campo-formulario-icono-tipo').addClass('icon-inauguracion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-inauguracion');
            break;
            case 'Karaoke':
            $('.campo-formulario-icono-tipo').addClass('icon-karaoke');
            $('.campo-formulario-icono-tipo').addClass('letra-color-karaoke');
            break;
            case 'Lectura':
            $('.campo-formulario-icono-tipo').addClass('icon-lectura');
            $('.campo-formulario-icono-tipo').addClass('letra-color-lectura');
            break;
            case 'Magia':
            $('.campo-formulario-icono-tipo').addClass('icon-magia');
            $('.campo-formulario-icono-tipo').addClass('letra-color-magia');
            break;
            case 'Monólogo':
            $('.campo-formulario-icono-tipo').addClass('icon-monologo');
            $('.campo-formulario-icono-tipo').addClass('letra-color-monologo');
            break;
            case 'Proyección':
            $('.campo-formulario-icono-tipo').addClass('icon-proyeccion');
            $('.campo-formulario-icono-tipo').addClass('letra-color-proyeccion');
            break;
            case 'Retransmisión':
            $('.campo-formulario-icono-tipo').addClass('icon-retransmision');
            $('.campo-formulario-icono-tipo').addClass('letra-color-retransmision');
            break;
            case 'Tándem lingüístico':
            $('.campo-formulario-icono-tipo').addClass('icon-tandem');
            $('.campo-formulario-icono-tipo').addClass('letra-color-tandem');
            break;
            case 'Teatro':
            $('.campo-formulario-icono-tipo').addClass('icon-teatro');
            $('.campo-formulario-icono-tipo').addClass('letra-color-teatro');
            break;
            default:
            $('.campo-formulario-icono-tipo').addClass('icon-smile');
            $('.campo-formulario-icono-tipo').addClass('letra-color-smile');
            break;
        };
        $('#buscador-eventos-tipo-filtro').val($(event.currentTarget).text());
    };
}

function combo_tipo_filtro_mostrar(event) {
    var visible = false;
    if ($('#campo-formulario-lista-tipo-filtro').is(':hidden')) {
        visible = true;
        $('#campo-formulario-lista-tipo-filtro').fadeIn(200);
    };
    event.stopImmediatePropagation();
    if (visible) {
        $(document).on("keyup", {
            'selector': '#campo-formulario-lista-tipo-filtro'
        }, buscar_combo);
    };
}

function detectar_tecla(event) {
    $(document).on('keypress', function(event) {
        if (event.which == 13) {
            seleccionar_primera_opcion(event);
        } else {
            $(".pac-container").css("visibility", "visible");
        }
    });
}

function detener_enlace(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
}

function draggable_boton_click(event) {
    var objeto_draggable = $(event.currentTarget).find('.boton-barra-zoom');
    var posicion = event.pageX - objeto_draggable.parent().offset().left - (objeto_draggable.width() / 2) - parseInt(objeto_draggable.css('border-left-width')) - parseInt(objeto_draggable.css('border-right-width'));
    var anchura_barra = objeto_draggable.parent().width() - objeto_draggable.width() - parseInt(objeto_draggable.css('border-left-width')) - parseInt(objeto_draggable.css('border-right-width'));
    var imagen = $('figure.imagen-modalBoxes img');

    anchuraInicial = imagen.width();
    alturaInicial = imagen.height();
    leftInicial = parseInt(imagen.css('left'));
    topInicial = parseInt(imagen.css('top'));

    if (posicion < 0) {
        posicion = 0;
    } else if (posicion > anchura_barra) {
        posicion = anchura_barra;
    };

    objeto_draggable.css('left', posicion);
    redimension_imagen(parseInt((posicion * zoomRecorteImagen) / anchura_barra));
}

function draggable_boton_move(event) {
    var posicion = event.pageX - pageXBoton;

    var objeto_draggable = $('.draggable-boton-on');
    var anchura_barra = objeto_draggable.parent().width() - objeto_draggable.width() - parseInt(objeto_draggable.css('border-left-width')) - parseInt(objeto_draggable.css('border-right-width'));
    if (objeto_draggable.length) {
        if (posicion < 0) {
            posicion = 0;
        } else if (posicion > anchura_barra) {
            posicion = anchura_barra;
        };
        objeto_draggable.css('left', posicion);
        redimension_imagen(parseInt((posicion * zoomRecorteImagen) / anchura_barra));
    }
}

function draggable_boton_off(event) {
    $('.draggable-boton-on').removeClass('draggable-boton-on');
    event.preventDefault();
}

function draggable_boton_on(event) {
    $(event.currentTarget).addClass('draggable-boton-on');
    pageXBoton = event.pageX - parseInt($(event.currentTarget).css('left'));
    var imagen = $('figure.imagen-modalBoxes img');
    anchuraInicial = imagen.width();
    alturaInicial = imagen.height();
    leftInicial = parseInt(imagen.css('left'));
    topInicial = parseInt(imagen.css('top'));
    event.preventDefault();
}

function draggable_imagen_move(event) {
    var posicionX = event.pageX - pageXImagen;
    var posicionY = event.pageY - pageYImagen;

    var objeto_draggable = $('.draggable-imagen-on');
    if (objeto_draggable.length) {
        if (posicionX > bordeRecorteImagen) {
            posicionX = bordeRecorteImagen
        };
        if (posicionY > bordeRecorteImagen) {
            posicionY = bordeRecorteImagen
        };
        if (posicionX < (objeto_draggable.parent().width() - objeto_draggable.width() - bordeRecorteImagen)) {
            posicionX = objeto_draggable.parent().width() - objeto_draggable.width() - bordeRecorteImagen
        };
        if (posicionY < (objeto_draggable.parent().height() - objeto_draggable.height() - bordeRecorteImagen)) {
            posicionY = objeto_draggable.parent().height() - objeto_draggable.height() - bordeRecorteImagen
        };
        objeto_draggable.css({
            'left': posicionX,
            'top': posicionY
        });
    };
}

function draggable_imagen_off(event) {
    $('.draggable-imagen-on').removeClass('draggable-imagen-on');
    event.preventDefault();
}

function draggable_imagen_on(event) {
    $(event.currentTarget).children().addClass('draggable-imagen-on');
    pageXImagen = event.pageX - parseInt($(event.currentTarget).children().css('left'));
    pageYImagen = event.pageY - parseInt($(event.currentTarget).children().css('top'));;
    event.preventDefault();
}

function enviar_datos(event) {
    $(event.currentTarget).parents('form').submit();
    event.preventDefault();
}

function formulario_lista_mostrar(event) {
    var altura_lista = $(event.currentTarget).parents('div.informacion-promocion').height();
    $(event.currentTarget).parents('div.informacion-promocion').animate({
        "opacity": "0"
    }, 500).hide().parent().children('form').css('display', 'inline-block').height(altura_lista).children('div.lista-parametro').css('margin-top', ((altura_lista - $(event.currentTarget).parents('div.informacion-promocion').parent().children('form').children('div.lista-parametro').height()) / 2)).parents('form').animate({
        "opacity": "1"
    }, 500).find('input').val('');
    event.preventDefault();
}

function formulario_lista_ocultar(event) {
    $(event.currentTarget).parents('form').animate({
        "opacity": "0"
    }, 500).hide().parent().children('div.informacion-promocion').css('display', 'inline-block').animate({
        "opacity": "1"
    }, 500);
    event.preventDefault();
}

function foto_miniatura_hover(event) {
    $(event.currentTarget).children('div').children('div').children('p').text($(event.currentTarget).attr('title')).parent().parent().show(200);
    $(event.currentTarget).attr('title', '');
}

function foto_miniatura_unhover(event) {
    $(event.currentTarget).attr('title', $(event.currentTarget).children('div').children('div').children('p').text());
    $(event.currentTarget).children('div').hide(200);
}

function initialize() {
    var posicion = new google.maps.LatLng(latitud, longitud);
    var mapOptions = {
        zoom: parametro_zoom,
        center: posicion,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    if ($('#campo-direccion').length > 0) {
        var input = document.getElementById('campo-direccion');
        var options = {
            componentRestrictions: {
                country: 'es'
            }
        };
        geocoder = new google.maps.Geocoder();
        autocomplete = new google.maps.places.Autocomplete(input, options);

        marker = new google.maps.Marker({
            position: posicion,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.setIcon(RUTA_STATIC_BASE + "images/ubicacion.png");
        marker.setMap(map);
        marker.setVisible(false);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(16);
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            map.setCenter(marker.getPosition());
            map.setZoom(16);
            geocoder.geocode({
                latLng: marker.getPosition()
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $('#campo-direccion').val(results[0].formatted_address);
                    $('#campo-provincia').val(results[0].address_components[2].long_name);
                };
            })
        });

        return;
    };

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker = new google.maps.Marker({
        position: posicion
    });
    marker.setIcon(RUTA_STATIC_BASE + "images/ubicacion.png");
    marker.setMap(map);

    infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
function initialize_wrapper(lat, lon, con, tit) {
    latitud = lat;
    longitud = lon;
    contentString = con;
    titulo = tit;

    if (latitud != null && longitud != null && contentString != null && titulo != null) {
        parametro_zoom = 16;
    } else {
        latitud = latitudGenerica;
        longitud = longitudGenerica;
        contentString = '';
        titulo = '';
        parametro_zoom = 5;
    }
    load_script();
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9])+$/;
    if (email.length > 0) 
    {
        return regex.test(email);
    }
    else
    {
        return true;
    }
}
function load_script() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3&libraries=places&key=AIzaSyC6w77fj8ANgFFe3xqD_rCHaPZrwa-9rIo&sensor=false&callback=initialize";
    document.body.appendChild(script);
}
function limite_caracteres_comprobar(event) {
    if (event.which == 13) {
        event.preventDefault();
    };
}
function limite_caracteres_actualizar(event) {
    var span = $(event.currentTarget).parents('.menu-privado-parametro').find('.menu-privado-label-explicacion span');
    var caracteresActuales = $(event.currentTarget).val().length;

    if (caracteresActuales <= limiteCaracteres) {
        span.text(limiteCaracteres - caracteresActuales);
    }
}
function modal_abrir(data) {
    $('#dialog').animate({
        opacity: '0'
    }, 500, null, function(data) {
        return function() {
            $('#dialog p.instrucciones-modalBoxes').text('Posiciona y redimensiona tu foto');
            $('#dialog div.loading').css('display', 'none');

            $('#dialog figure').css('width', (imgCutWidth + (bordeRecorteImagen * 2)) + 'px');
            $('#dialog figure').css('height', (imgCutHeight + (bordeRecorteImagen * 2)) + 'px');
            
            modal_abrir_redimension(parseInt(data.width), parseInt(data.height), data.urlTempImg);

            $('#dialog div.barra-zoom a.boton-barra-zoom').css('left', '0');
            $('#dialog div.barra-zoom').show(0);

            $('#dialog div.botoneraModalBoxes').show(0);

            $('#dialog').width($('#dialog figure').width() + parseInt($('#dialog figure').css('margin-left')) + parseInt($('#dialog figure').css('margin-right')));
            $('#dialog').css('top', parseInt($(window).scrollTop()) + 80);
            $('#dialog').css('left', ($(window).width() / 2) - $('#dialog').width() / 2);

            $('#dialog figure').css('display', 'inline-block');

            $('#dialog').animate({
                opacity: '1'
            }, 500);
        }
    }(data));
}
function modal_abrir_localhost(event) {
    event.preventDefault();
    imgCutHeight = parseInt($(event.currentTarget).attr('data-height'));
    imgCutWidth = parseInt($(event.currentTarget).attr('data-width'));
    imgOriginalHeight = parseInt($(event.currentTarget).attr('data-height-original'));
    imgOriginalWidth = parseInt($(event.currentTarget).attr('data-width-original'));

    imgPrevisualizacion = $(event.currentTarget).parents('div.menu-privado-parametro').find('div.campo-formulario-wrapper-foto');

    $('body').css('overflow', 'hidden');
    $('#dialog').hide(0);
    $('#dialog p.instrucciones-modalBoxes').text('Posiciona y redimensiona tu foto');
    $('#dialog div.loading').hide(0);
    $('#dialog div.barra-zoom').hide(0);
    $('#dialog div.botoneraModalBoxes').hide(0);
    $('#dialog figure').hide(0);
    $('#mask').hide(0);

    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight
    });
    $('#mask').fadeIn(200);
    $('#mask').fadeTo(300, 0.8);

    $('#dialog figure').css('width', (imgCutWidth + (bordeRecorteImagen * 2)) + 'px');
    $('#dialog figure').css('height', (imgCutHeight + (bordeRecorteImagen * 2)) + 'px');

    modal_abrir_redimension(1920,351,'./images/cabecera-generica.jpg');

    $('#dialog div.barra-zoom a.boton-barra-zoom').css('left', '0');
    $('#dialog div.barra-zoom').show(0);

    $('#dialog div.botoneraModalBoxes').show(0);

    $('#dialog').width($('#dialog figure').width() + parseInt($('#dialog figure').css('margin-left')) + parseInt($('#dialog figure').css('margin-right')));
    $('#dialog').css('top', parseInt($(window).scrollTop()) + 80);
    $('#dialog').css('left', (maskWidth / 2) - $('#dialog').width() / 2);

    $('#dialog figure').css('display', 'inline-block');

    $('#dialog').fadeIn(500);
}
function modal_abrir_redimension(widthImagen, heightImagen, urlImagen) {
    var posicionX = 0;
    var posicionY = 0;
    var imagen = $('#dialog figure.imagen-modalBoxes img');

    imagen.attr('src', urlImagen);
    imagen.attr('width', widthImagen);
    imagen.attr('height', heightImagen);

    if ((widthImagen/heightImagen) > (imgCutWidth/imgCutHeight)) {
        alturaProporcional = imgCutHeight;
        anchuraProporcional = Math.round((widthImagen * imgCutHeight) / heightImagen);

        posicionX = (parseInt(imagen.parent().css('width')) - anchuraProporcional) / 2;
        posicionY = bordeRecorteImagen;
    } else {
        anchuraProporcional = imgCutWidth;
        alturaProporcional = Math.round((heightImagen * imgCutWidth) / widthImagen);

        posicionX = bordeRecorteImagen;
        posicionY = (parseInt(imagen.parent().css('height')) - alturaProporcional) / 2;
    };

    imagen.width(anchuraProporcional);
    imagen.height(alturaProporcional);
    imagen.css({
        'left': posicionX,
        'top': posicionY
    });
}
function modal_cerrar(event) {
    event.preventDefault();
    $('#dialog').hide(0);
    $('#dialog div.loading').css('display', 'none');
    $('#dialog div.barra-zoom').hide(0);
    $('#dialog div.botoneraModalBoxes').hide(0);
    $('#dialog figure').css('display', 'none');
    $('#mask').fadeTo(0, 1);
    $('#mask').hide(0);
    $('body').css('overflow', 'scroll');
}
function modal_eliminar(event) {
    event.preventDefault();
    $(event.currentTarget).parents('.menu-privado-parametro').find('.campo-formulario-wrapper-foto').empty();
}
function modal_loading() {
    $('body').css('overflow', 'hidden');
    $('#dialog').hide(0);
    $('#dialog p.instrucciones-modalBoxes').text('Subiendo imagen');
    $('#dialog div.loading').hide(0);
    $('#dialog div.barra-zoom').hide(0);
    $('#dialog figure').hide(0);
    $('#mask').hide(0);

    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight
    });
    $('#mask').fadeIn(200);
    $('#mask').fadeTo(300, 0.8);

    $('#dialog div.loading').css('width', $('#dialog div.loading img').width() + 'px');
    $('#dialog div.loading').css('height', $('#dialog div.loading img').height() + 'px');
    $('#dialog div.loading').css('display', 'inline-block');

    $('#dialog').width($('#dialog div.loading').width() + parseInt($('#dialog div.loading').css('margin-left')) + parseInt($('#dialog div.loading').css('margin-right')));
    $('#dialog').css('top', parseInt($(window).scrollTop()) + 80);
    $('#dialog').css('left', ($(window).width() / 2) - $('#dialog').width() / 2);
    $('#dialog').fadeIn(500);
}
function modal_recortar(event)
{
    event.preventDefault();

    var imagenOriginal = $('#dialog figure img');
    
    var proporcion = parseInt(imagenOriginal.attr('width')) / parseInt(imagenOriginal.width());

    var x0 = (parseInt(imagenOriginal.css('left')) - bordeRecorteImagen) * -1;
    var x1 = x0 + imgCutWidth;
    var y0 = (parseInt(imagenOriginal.css('top')) - bordeRecorteImagen) * -1;
    var y1 = y0 + imgCutHeight;

    x0 = x0 * proporcion;
    x1 = x1 * proporcion;
    y0 = y0 * proporcion;
    y1 = y1 * proporcion;

    imgPrevisualizacion.html('<img src=' + imagenOriginal.attr('src') + ' />');
    modal_recortar_redimension((x1 - x0),(y1 - y0),x0,y0);
    modal_cerrar(event);
}
function modal_recortar_redimension(imgWidth, imgHeight, imgLeft, imgTop)
{
    var imagenOriginal = $('#dialog figure img');
    var imagenRecortada = imgPrevisualizacion.find('img');

    var anchuraImgPrevisualizacion = parseInt(imgPrevisualizacion.width());
    var alturaImgPrevisualizacion = parseInt(imgPrevisualizacion.height());

    if ((imgWidth/imgHeight) > (parseInt(imgPrevisualizacion.width())/parseInt(imgPrevisualizacion.height())))
    {
        alturaImgPrevisualizacion = parseInt(imgPrevisualizacion.height());
        anchuraImgPrevisualizacion = Math.round((imgWidth * parseInt(imgPrevisualizacion.height())) / imgHeight);
    } else
    {
        anchuraImgPrevisualizacion = parseInt(imgPrevisualizacion.width());
        alturaImgPrevisualizacion = Math.round((imgHeight * parseInt(imgPrevisualizacion.width())) / imgWidth);
    };
    console.log(imagenRecortada.width());
    console.log(imgPrevisualizacion.width());
    imagenRecortada.width((anchuraImgPrevisualizacion * parseInt(imagenOriginal.attr('width'))) / imgWidth);
    imagenRecortada.height((alturaImgPrevisualizacion * parseInt(imagenOriginal.attr('height'))) / imgHeight);
    imagenRecortada.css('left',(((-1 * anchuraImgPrevisualizacion * imgLeft) / imgWidth) - ((anchuraImgPrevisualizacion - parseInt(imgPrevisualizacion.width())) / 2)) + 'px');
    imagenRecortada.css('top',(((-1 * alturaImgPrevisualizacion * imgTop) / imgHeight) - ((alturaImgPrevisualizacion - parseInt(imgPrevisualizacion.height())) / 2)) + 'px');
}
function mostrar_tooltip()
{
    $('body').append('<span class="tooltip">'+$(this).attr('data-title')+'</span>');
    $('.tooltip').css('left',$(this).offset().left);
    $('.tooltip').fadeIn(300);
}
function ocultar_tooltip()
{
    $('.tooltip').fadeOut(300);
    $('.tooltip').remove();
}
function normalize(cadena) {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüû",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuu",
    mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);


    var ret = '';
    for (var i = 0, j = cadena.length; i < j; i++) {
        var caracter = cadena.charAt(i);
        if (mapping.hasOwnProperty(cadena.charAt(i)))
            ret += mapping[caracter];
        else
            ret += caracter;
    }
    return ret;
}

function placeholder_general_mostrar() {
    if ($('#buscador-general-texto').val() == "") {
        $('#buscador-general-texto').val("Buscar en ociopolis");
    };
}

function placeholder_general_ocultar() {
    if ($('#buscador-general-texto').val() == "Buscar en ociopolis") {
        $('#buscador-general-texto').val("");
    };
}

function redimension_imagen(porcentaje) {
    posicionX = 0;
    posicionY = 0;
    var imagen = $('figure.imagen-modalBoxes img');

    var proporcion_imagen = (porcentaje / 100) + 1;
    var anchura_imagen_nueva = anchuraProporcional * proporcion_imagen;
    var altura_imagen_nueva = alturaProporcional * proporcion_imagen;

    posicionX = (-1) * (anchura_imagen_nueva - anchuraInicial) / 2;
    posicionY = (-1) * (altura_imagen_nueva - alturaInicial) / 2;

    if ((posicionX + leftInicial) > bordeRecorteImagen) {
        posicionX = bordeRecorteImagen - leftInicial
    };
    if ((posicionY + topInicial) > bordeRecorteImagen) {
        posicionY = bordeRecorteImagen - topInicial
    };
    if ((posicionX + leftInicial) < (imagen.parent().width() - anchura_imagen_nueva - bordeRecorteImagen)) {
        posicionX = imagen.parent().width() - anchura_imagen_nueva - bordeRecorteImagen - leftInicial
    };
    if ((posicionY + topInicial) < (imagen.parent().height() - altura_imagen_nueva - bordeRecorteImagen)) {
        posicionY = imagen.parent().height() - altura_imagen_nueva - bordeRecorteImagen - topInicial
    };

    imagen.width(anchura_imagen_nueva);
    imagen.height(altura_imagen_nueva);
    imagen.css({
        'left': leftInicial + posicionX,
        'top': topInicial + posicionY
    });
}

function resaltado_check(event) {
    if ($(event.currentTarget).find('span.campo-formulario-check-icono').hasClass('campo-formulario-check-seleccionado')) {
        $(event.currentTarget).find('input').val('0').next().removeClass('campo-formulario-check-seleccionado');
    } else {
        $(event.currentTarget).find('input').val('1').next().addClass('campo-formulario-check-seleccionado');
    }
}

function resaltado_combo_mostrar(event) {
    resaltado_combo_ocultar();
    $(event.currentTarget).addClass('efecto');
}

function resaltado_combo_ocultar() {
    $('.efecto').removeClass('efecto');
}

function resultado_lista_mostrar(event) {
    var altura_lista = $(event.currentTarget).parents('form').height();
    $(event.currentTarget).parents('form').animate({
        "opacity": "0"
    }, 500).hide().parent().children('div.resultado-promocion').css('display', 'inline-block').height(altura_lista).children('p').css('margin-top', ((altura_lista - $(event.currentTarget).parents('form').parent().children('div.resultado-promocion').children('p').height()) / 2)).parents('div.resultado-promocion').animate({
        "opacity": "1"
    }, 500);
    event.preventDefault();
}

function resultado_lista_ocultar(event) {
    $(event.currentTarget).parents('div.resultado-promocion').animate({
        "opacity": "0"
    }, 500).hide().parent().children('div.informacion-promocion').css('display', 'inline-block').animate({
        "opacity": "1"
    }, 500);
    event.preventDefault();
}

function seleccionar_fichero(event) {
    imgCutHeight = parseInt($(event.currentTarget).attr('data-height'));
    imgCutWidth = parseInt($(event.currentTarget).attr('data-width'));
    imgOriginalHeight = parseInt($(event.currentTarget).attr('data-height-original'));
    imgOriginalWidth = parseInt($(event.currentTarget).attr('data-width-original'));
    imgPrevisualizacion = $(event.currentTarget).parents('div.menu-privado-parametro').find('div.campo-formulario-wrapper-foto');

    $(event.currentTarget).parents('section').find('input.seleccion-fichero').click();
    event.preventDefault();
}

function seleccionar_primera_opcion(event) {
    var posicion = null;
    var firstResult = $(".pac-container .pac-item:first span.pac-item-query").text() + ', ' + $(".pac-container .pac-item:first span.pac-item-query").next('span').text();
    geocoder.geocode({
        "address": firstResult
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            marker.setVisible(false);

            latitud = results[0].geometry.location.lat();
            longitud = results[0].geometry.location.lng();

            posicion = new google.maps.LatLng(latitud, longitud);

            $(".pac-container .pac-item:first").addClass("pac-selected");
            $(".pac-container").css("display", "none");
            $(".pac-container").css("visibility", "hidden");
            $("#campo-direccion").val(firstResult);
            $('#campo-provincia').val(results[0].address_components[2].long_name);

            marker.setPosition(posicion);
            marker.setVisible(true);
            map.setCenter(posicion);
            map.setZoom(16);
        } else {
            latitud = latitudGenerica;
            longitud = longitudGenerica;

            posicion = new google.maps.LatLng(latitud, longitud);

            marker.setVisible(false);
            map.setCenter(posicion);
            map.setZoom(5);
        }
    });
event.preventDefault;
event.stopImmediatePropagation;
}

function subir_fichero(event) {
    var formData = new FormData($(event.currentTarget).parent()[0]);
    var csrftoken = $.cookie('csrftoken');

    $.ajax({
        url: 'http://ociopolis.org/sube-imagen/',
        type: 'POST',
        cache: false,
        crossDomain: false,
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
            modal_loading();
        },
        success: modal_abrir
    });
}

function validar_formulario(event) {
    $('.campo-erroneo').each(function() {
        $(this).removeClass('campo-erroneo').parents('.wrapper-parametro-formulario').find('.error-parametro-formulario').css('opacity', '0').text('');
    });
    $('.campo-requerido').each(function() {
        if (!($(this).hasClass('campo-erroneo')) && ($(this).val().length <= 0)) {
            $(this).addClass('campo-erroneo').parents('.wrapper-parametro-formulario').find('.error-parametro-formulario').text('campo requerido').animate({
                opacity: '1'
            }, 200);
        }
    });
    $('.campo-email').each(function() {
        if (!($(this).hasClass('campo-erroneo')) && !(isEmail($(this).val()))) {
            $(this).addClass('campo-erroneo').parents('.wrapper-parametro-formulario').find('.error-parametro-formulario').text('correo inválido').animate({
                opacity: '1'
            }, 200);
        }
    });
    if (!($('.campo-password').hasClass('campo-erroneo')) && !($('.campo-password-replica').hasClass('campo-erroneo')) && ($('.campo-password').val() != $('.campo-password-replica').val())) {
        $('.campo-password-replica').addClass('campo-erroneo').parents('.wrapper-parametro-formulario').find('.error-parametro-formulario').text('no coinciden').animate({
            opacity: '1'
        }, 200);
    };
    if ($('.campo-erroneo').length > 0) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
    }
    else
    {
        return true;
    };
}
function validar_formulario_previo(event)
{
    if (!validar_formulario(event)) 
    {
        $(event.currentTarget).parent().find('.menu-privado-error').show(200);
        $('body, html').stop().animate({scrollTop: '0'}, 200);
    }
    else
    {
        $(event.currentTarget).parent().find('.menu-privado-form').submit();
    };
}
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1&appId=616624271723252";
    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
    p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
})(document, 'script', 'twitter-wjs');