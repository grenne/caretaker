/**
 * 				obter os dados
 */
//		
//		carrega carreiras
//
	/**
	 * 	carrega lista de carreiras
	 */
	var cy = "";
	rest_obterCarreiras(carregaCarreiras, cy)
		
	function carregaCarreiras (objJson, cy) {
		$("#qtdeObjetivos").html(objJson.length + " objetivos");
		$( ".carreira_theader" ).remove();

		var carreira_table_header =
				'<table id="carreira_list" class="carreira_theader footable table toggle-circle" data-sorting="true">' +
					'<thead>' +
						'<tr>' +
							'<th data-toggle="true" data-sort-initial="true"></th>' +
							'<th data-sort-ignore="true"></th>' +
							'<th data-sort-ignore="true"></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
							'<th data-hide="all" ></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody id="carreira_tbody">' +
					'</tbody>' +
					'<tfoot>' +
						'<tr>' +
							'<td colspan="5">' +
								'<div class="text-right">' +
									'<ul class="pagination"></ul>' +
								'</div>' +
							'</td>' +
						'</tr>' +
					'</tfoot>' +
				'</table>';
    	$( "#carreira_theader" ).append(carreira_table_header);

    	$( ".itemCarreira" ).remove();
        $.each(objJson, function (i, carreira) {
        	var habilidades = "";
        	$.each(carreira.arrayNecessarios, function (i, habilidade){
        		habilidades = habilidades +
				'<br class="habilidadeCarreira hide"><span class="panel-text habilidadeCarreira hide">- ' + habilidade.name + '</span>';
        	});
        	carreira_table_row = 
				'<tr class="itemCarreira">' +
					'<td id="nome_' + i + '"><span class="panel-label" data-tooltip="objetivo"></span>' + carreira.nome + '</td>' +
					'<td><a id="comparar_' + i + '" data-tooltip="comparar" class="icon-logo"><img src="img/icone-arvore.png" alt="compara" height="15" width="15"  class="icon-logo"></i></a></td>' +
					'<td><a id="queroAprender_' + i + '" data-tooltip="quero aprender"><i class="fa fa-thumbs-o-up"></i></a></td>' +
						'<td><span class="panel-label">OBJETIVO: </span><br>' +
						'<span class="panel-text">' + carreira.descricao + '</span></td>' +
						'<td><br><span class="panel-label">INDÚSTRIA: </span><br>' +
						'<span class="panel-text">' + carreira.industria + '</span></td>' +
						'<td><br><span class="panel-label">FUNÇÃO: </span><br>' +
						'<span class="panel-text">' + carreira.funcao + '</span></td>' +
						'<td><br><span class="panel-label">TAREFAS: </span><br>' +
						'<span class="panel-text">' + carreira.tarefas + '</span></td>' +
						'<td><br><button id="habilidadeCarreiraIn_' + i + '" class="panel-button-carreira habilidadeCarreiraIn"><i class="fa fa-chevron-down icon-check-carreira"></i><span>lista de habilidades</span></button>' +
						'<button id="habilidadeCarreiraOff_' + i + '" class="panel-button-carreira habilidadeCarreira hide"><i class="fa fa-chevron-up icon-check-carreira"></i><span>lista de habilidades</span></button></td>' +
						'<td>' + habilidades + '</td>' +
				'</tr>';
        	$("#carreira_tbody").append(carreira_table_row);
            $('#habilidadeCarreiraIn_' + i).bind('click', function () {
            	$(".habilidadeCarreira").removeClass("hide");
            	$(".habilidadeCarreiraIn").addClass("hide");
            });
            $('#habilidadeCarreiraOff_' + i).bind('click', function () {
            	$(".habilidadeCarreira").addClass("hide");
            	$(".habilidadeCarreiraIn").removeClass("hide");
            });
            $('#comparaCarreira' + i).bind('click', function () {
            	$("#labelYggmap").html("Montando carreira:" + carreira.nome + "...");
            	$("#labelYggmap").removeClass("text-success");
            	$("#labelYggmap").removeClass("text-warning");
            	$("#labelYggmap").addClass("text-primary");
            	comparaCarreira (cy, carreira);
            	$('.cursos').addClass('hide');
				$('.habilidade').addClass('hide');
            	$("#labelYggmap").html("Carreira:" + carreira.nome);
            	atualizaUserPerfil ("carreiras", carreira.nome);
            	atualizaUserPerfil ("tags", tagsString);
            });
            $('#acaoCarreiraInteresse_' + i).bind('click', function () {
            	atualizaUserPerfil ("carreiraInteresse", carreira.nome);
            	atualizaUserPerfil ("tags", tagsString);
            });
        });

        var carreira_table = $('#carreira_list');
		carreira_table.footable().trigger('footable_collapse_all');

		$('#carreira_theader_tab').on('shown.bs.tab', function (e) {
			carreira_table.footable().trigger('footable_collapse_all');
		});
		// Search input
		$('#searchCarreiras').on('input', function (e) {
			e.preventDefault();
			carreira_table.trigger('footable_filter', {filter: $(this).val()});
		});
	};
