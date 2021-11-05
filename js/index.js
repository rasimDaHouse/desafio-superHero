$(document).ready(function () {
  function getInfo() {
    let search = $("#search").val();
    let expresion = /^[0-9]+$/;

    if (expresion.test(search)) {
      getData(search);
    } else {
      alert("Ingrese solo numeros");
      $(".result").hide();
    }
  }

  function getData(id) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://www.superheroapi.com/api.php/3525635500807579/${id}`,
      success(data) {
        if (data.response === "error") {
          $(".result").hide();
          alert("El ID no se encuentra.");
          return;
        }
        showData(data);
        showChart(data);
      },
      error(error) {
        console.log(error);
        $(".result").hide();
        alert("Error al traer los datos.");
      },
    });
  }

  function showData(data) {
    $("#name").html(data.name);
    $("#connection").html(data.connections["group-affiliation"]);
    $("#published").html(data.biography.publisher);
    $("#ocupation").html(data.work.occupation);
    $("#firstin").html(data.biography["first-appearance"]);
    $("#height").html(data.appearance.height.join(" - "));
    $("#weight").html(data.appearance.weight.join(" - "));
    $("#allies").html(data.biography.aliases.join(" "));
    $("#avatar").attr("src", data.image.url);
    $(".result").show();
  }

  function showChart(data) {
    var chart = new CanvasJS.Chart("chart", {
      title: {
        text: `Estadísticas de poder para ${data.name}`,
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120,
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{indexLabel}",
          dataPoints: [
            { y: data.powerstats.intelligence, indexLabel: "Inteligencia" },
            { y: data.powerstats.strength, indexLabel: "Fuerza" },
            { y: data.powerstats.speed, indexLabel: "Velocidad" },
            { y: data.powerstats.durability, indexLabel: "Durabilidad" },
            { y: data.powerstats.power, indexLabel: "Poder" },
            { y: data.powerstats.combat, indexLabel: "Combate" },
          ],
        },
      ],
    });
    chart.render();
  }

  $("form").on("submit", function (event) {
    event.preventDefault();

    getInfo();
  });
});
