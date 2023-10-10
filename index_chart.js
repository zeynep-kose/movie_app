

$(function () {
    dataText();
    getCarbonEmissions();
    getBrentOilFutures();
    //GetLNGBotas();
    GetLNGBotasAndEgeGas();
    // GetLNGEgegas();




    GetTTFResult();
    GetTHEChart();
    GetZTPChart();
    GetCEGHChart();

    DailyMatchAmountService();
    GetGrfTurkeyGasService();
    GetHrfTurkeyGasService();
    GetMarketClearingPriceService();
});
$.date = function (dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};

var grafik = {};
var data_1 = [];
var dates_1 = [];
var tableRowData = {};
var TableData = [];
function dataText() {
    $.ajax({
        type: "POST",
        url: "/Landing/LandingGraphics",
        cache: false,
        dataType: "json",
        async: false,
        success: function (data) {
            grafik = data;
            $.each(grafik.brentResult.prices, function (index, value) {
                dates_1.push(value.date);
                data_1.push(Number(value.value));
            });
        },
    });

    return grafik;
}

function DailyMatchAmountService() {
    var formValues = "";
    $.post("/Landing/DailyMatchAmountService", formValues)
        .done(function (data) {
            GetDailyMatchAmount(data);
        })
        .fail(function (data) {
            alertThis("warning", null, data.responseText);
        });
}

function GetGrfTurkeyGasService() {
    var formValues = "";
    $.post("/Landing/GrfAmountService", formValues)
        .done(function (data) {
            GetGrfTurkeyGas(data);
        })
        .fail(function (data) {
            alertThis("warning", null, data.responseText);
        });
}

function GetMarketClearingPriceService() {
    var formValues = "";
    $.post("/Landing/MarketClearingPriceService", formValues)
        .done(function (data) {
            GetMarketClearingPrice(data);
        })
        .fail(function (data) {
            alertThis("warning", null, data.responseText);
        });
}
function GetHrfTurkeyGasService() {
    var formValues = "";
    $.post("/Landing/HrfAmountService", formValues)
        .done(function (data) {
            GetHrfTurkeyGas(data);
        })
        .fail(function (data) {
            alertThis("warning", null, data.responseText);
        });
}

var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function getCarbonEmissions() {
    var data = [];
    var dates = [];
    $.each(grafik.carbonEmission.prices, function (index, value) {
        dates.push(value.date);
        data.push(Number(value.price));
    });

    var label_1 = "Carbon Emissions";
    //var CarbonEmissionsChart = document.getElementById("CarbonEmissionsChart");
    var chart_value = $("#CarbonEmissionsChartvalue");
    var chart_carbon_currency = $("#CarbonEmissionsChartcurrency");
    chart_value.html(data[0]);
    chart_carbon_currency.html("Euro/MWh");
    //var chart_1 = new Chart(CarbonEmissionsChart, {
    //    type: "line",
    //    data: {
    //        labels: dates,
    //        datasets: [
    //            {
    //                label: label_1,
    //                data: data,
    //                backgroundColor: "#f2f5f7",
    //                hoverBackgroundColor: "#7E57C2",
    //                hoverBorderWidth: 2,
    //                borderWidth: 2,
    //                borderColor: "#2e5883",
    //            },
    //        ],
    //    },
    //    options: {
    //        animation: {
    //            duration: 10,
    //        },
    //        tooltips: {
    //            mode: "label",
    //            callbacks: {
    //                label: function (tooltipItem, data) {
    //                    return (
    //                        data.datasets[tooltipItem.datasetIndex].label +
    //                        ": " +
    //                        numberWithCommas(tooltipItem.yLabel)
    //                    );
    //                },
    //            },
    //        },
    //        scales: {
    //            xAxes: [
    //                {
    //                    gridLines: {
    //                        color: "rgba(200, 200, 200, 0.05)",
    //                        lineWidth: 2,
    //                        drawBorder: false,
    //                        display: false,
    //                        drawBorder: false,
    //                        showBorder: false,
    //                    },
    //                    ticks: {
    //                        fontSize: 10,
    //                        autoSkip: true,
    //                        maxRotation: 0,
    //                        minRotation: 0,
    //                    },
    //                },
    //            ],
    //            yAxes: [
    //                {
    //                    display: false,
    //                    ticks: {
    //                        beginAtZero: true,
    //                        position: "left",
    //                        min: 0,
    //                        steps: 150,
    //                        stepValue: 5,
    //                        max: 150,
    //                        callback: function (value) {
    //                            return numberWithCommas(value);
    //                        },
    //                    },
    //                },
    //            ],
    //        },
    //        legend: {
    //            display: false,
    //        },
    //    },
    //});
}

function getBrentOilFutures() {
    var data_1 = [];
    var dates_1 = [];
    $.each(grafik.brentResult.prices, function (index, value) {
        dates_1.push(value.date);
        data_1.push(Number((value.price).replace(",", ".")));
    });
    var label_2 = "Brent Oil";
    var CarbonEmissionsChart = document.getElementById("BrentOilFuturesChart");
    var chart_value = $("#BrentOilFuturesChartvalue");
    var brentoilsembol = $("#BrentOilsembol");
    var chart_percent = $("#BrentOilFuturesChartpercent");
    var chart_currency = $("#BrentOilFuturesChartcurrency");
    var todayvalue = $(data_1).get(-1);
    var Lastvalue = $(data_1).get(-2);
    var result = ((todayvalue - Lastvalue) / todayvalue) * 100;
    if (result > 0) {
        chart_percent.removeClass("down");
        chart_percent.removeClass("up");
        chart_percent.addClass("up");
        brentoilsembol.addClass("up");
    } else {
        chart_percent.removeClass("up");
        chart_percent.removeClass("down");
        chart_percent.addClass("down");
        brentoilsembol.addClass("down");
    }
    chart_percent.html("(" + result.toFixed(2) + "%)");
    chart_currency.html("Dolar/bbl");
    chart_value.html(todayvalue);
    //var chart_2 = new Chart(CarbonEmissionsChart, {
    //    type: "line",
    //    data: {
    //        labels: dates_1,
    //        datasets: [
    //            {
    //                label: label_2,
    //                data: data_1,
    //                backgroundColor: "#f2f5f7",
    //                hoverBackgroundColor: "#7E57C2",
    //                hoverBorderWidth: 2,
    //                borderWidth: 2,
    //                borderColor: "#2e5883",
    //            },
    //        ],
    //    },
    //    options: {
    //        animation: {
    //            duration: 10,
    //        },
    //        tooltips: {
    //            mode: "label",
    //            callbacks: {
    //                label: function (tooltipItem, data) {
    //                    return (
    //                        data.datasets[tooltipItem.datasetIndex].label +
    //                        ": " +
    //                        numberWithCommas(tooltipItem.yLabel)
    //                    );
    //                },
    //            },
    //        },
    //        scales: {
    //            xAxes: [
    //                {
    //                    gridLines: {
    //                        color: "rgba(200, 200, 200, 0.05)",
    //                        lineWidth: 2,
    //                        drawBorder: false,
    //                        display: false,
    //                        drawBorder: false,
    //                        showBorder: false,
    //                    },
    //                    ticks: {
    //                        fontSize: 10,
    //                        autoSkip: true,
    //                        maxRotation: 0,
    //                        minRotation: 0,
    //                    },
    //                },
    //            ],
    //            yAxes: [
    //                {
    //                    display: false,
    //                    ticks: {
    //                        beginAtZero: true,
    //                        position: "left",
    //                        min: 0,
    //                        steps: 150,
    //                        stepValue: 5,
    //                        max: 150,
    //                        callback: function (value) {
    //                            return numberWithCommas(value);
    //                        },
    //                    },
    //                },
    //            ],
    //        },
    //        legend: {
    //            display: false,
    //        },
    //    },
    //});
}

function GetTTFResult() {
    var data_1_deger = [];
    var data_1_gun = [];
    $.each(grafik.landingStatistics.ttf, function (k, v) {
        if (v.price != null) {
            data_1_deger.push(v.price);
        } else {
            data_1_deger.push(0);
        }

        var year = v.date.slice(0, 4);
        var month = v.date.slice(5, 7);
        var day = v.date.slice(8, 10);
        v.date = day + "." + month + "." + year;
        data_1_gun.push(v.date);
    });

    var SingleGrf = $(grafik.landingStatistics.ttf).get(-1);

    var yesterdayvalues = $(grafik.landingStatistics.ttf).get(-2);
    var theLanguage = $("html").attr("lang");
    if (SingleGrf !== undefined) {
        tableRowData = {
            Name: "TTF",
            Date: SingleGrf.date || "",
            price: SingleGrf.price || 0,
            dailyChange: `${(((SingleGrf.price / yesterdayvalues.price) * 100) - 100).toFixed(2)
                || 0}`

        };
        TableData.push(tableRowData);
        getDataTable();
    }


  
    var label_chart_list_1 = "TTF (€/MWh)";
    var NGTTFChart = document.getElementById("NGTTFChart");
    var NGTTFChart = new Chart(NGTTFChart, {
        type: "line",
        data: {
            labels: data_1_gun,
            datasets: [
                {
                    label: label_chart_list_1,
                    data: data_1_deger,
                    backgroundColor: "#f2f5f7",
                    hoverBackgroundColor: "#7E57C2",
                    hoverBorderWidth: 1,
                    borderWidth: 1,
                    borderColor: "#2e5883",
                },
            ],
        },
        options: {
            precision: 0,

            animation: {
                duration: 10,
            },
            tooltips: {
                mode: "label",
                callbacks: {
                    label: function (tooltipItem, data) {
                        return (
                            data.datasets[tooltipItem.datasetIndex].label +
                            ": " +
                            numberWithCommas(tooltipItem.yLabel)
                        );
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        drawBorder: false,
                        display: false,
                        drawBorder: false,
                        showBorder: false,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

function GetTHEChart() {
    var data_1_deger = [];
    var data_1_gun = [];
    $.each(grafik.landingStatistics.the, function (k, v) {
        if (v.price != null) {
            data_1_deger.push(v.price);
        } else {
            data_1_deger.push(0);
        }
        var year = v.date.slice(0, 4);
        var month = v.date.slice(5, 7);
        var day = v.date.slice(8, 10);
        v.date = day + "." + month + "." + year;
        data_1_gun.push(v.date);
    });

    var SingleGrf = $(grafik.landingStatistics.the).get(-1);
    var yesterdayvalues = $(grafik.landingStatistics.the).get(-2);
    if (SingleGrf !== undefined) {
        tableRowData = {
            Name: "THE",
            Date: SingleGrf.date || "",
            price: SingleGrf.price || 0,
            dailyChange: (((SingleGrf.price / yesterdayvalues.price) * 100)-100).toFixed(2) || 0,

        };
        TableData.push(tableRowData);
        getDataTable();
    }

 
    var label_chart_list_1 = "THE (€/MWh)";
    var NGNCGChart = document.getElementById("NGNCGChart");
    var NGNCGChart = new Chart(NGNCGChart, {
        type: "line",
        data: {
            labels: data_1_gun,
            datasets: [
                {
                    label: label_chart_list_1,
                    data: data_1_deger,
                    backgroundColor: "#f2f5f7",
                    hoverBackgroundColor: "#7E57C2",
                    hoverBorderWidth: 1,
                    borderWidth: 1,
                    borderColor: "#2e5883",
                },
            ],
        },
        options: {
            precision: 0,

            animation: {
                duration: 10,
            },
            tooltips: {
                mode: "label",
                callbacks: {
                    label: function (tooltipItem, data) {
                        return (
                            data.datasets[tooltipItem.datasetIndex].label +
                            ": " +
                            numberWithCommas(tooltipItem.yLabel)
                        );
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        drawBorder: false,
                        display: false,
                        drawBorder: false,
                        showBorder: false,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

function GetZTPChart() {
    var data_1_deger = [];
    var data_1_gun = [];
    $.each(grafik.landingStatistics.ztp, function (k, v) {
        if (v.price != null) {
            data_1_deger.push(v.price);
        } else {
            data_1_deger.push(0);
        }

        var year = v.date.slice(0, 4);
        var month = v.date.slice(5, 7);
        var day = v.date.slice(8, 10);
        v.date = day + "." + month + "." + year;
        data_1_gun.push(v.date);
    });

    var SingleGrf = $(grafik.landingStatistics.ztp).get(-1);
    var yesterdayvalues = $(grafik.landingStatistics.ztp).get(-2);
    var theLanguage = $("html").attr("lang");
    if (SingleGrf !== undefined) {
        tableRowData = {
            Name: "ZTP",
            Date: SingleGrf.date || "",
            price: SingleGrf.price || 0,
            dailyChange: (((SingleGrf.price / yesterdayvalues.price) * 100)-100).toFixed(2) || 0,
        };
        TableData.push(tableRowData);
        getDataTable();
    }

  
    var label_chart_list_1 = "Ztp (€/MWh)";
    var ZTPChart = document.getElementById("chart_list_3");
    var ZTPChart = new Chart(ZTPChart, {
        type: "line",
        data: {
            labels: data_1_gun,
            datasets: [
                {
                    label: label_chart_list_1,
                    data: data_1_deger,
                    backgroundColor: "#f2f5f7",
                    hoverBackgroundColor: "#7E57C2",
                    hoverBorderWidth: 1,
                    borderWidth: 1,
                    borderColor: "#2e5883",
                },
            ],
        },
        options: {
            precision: 0,

            animation: {
                duration: 10,
            },
            tooltips: {
                mode: "label",
                callbacks: {
                    label: function (tooltipItem, data) {
                        return (
                            data.datasets[tooltipItem.datasetIndex].label +
                            ": " +
                            numberWithCommas(tooltipItem.yLabel)
                        );
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        drawBorder: false,
                        display: false,
                        drawBorder: false,
                        showBorder: false,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

function GetCEGHChart() {
    var data_1_deger = [];
    var data_1_gun = [];
    $.each(grafik.landingStatistics.cegh, function (k, v) {
        if (v.price != null) {
            data_1_deger.push(v.price);
        } else {
            data_1_deger.push(0);
        }
        var year = v.date.slice(0, 4);
        var month = v.date.slice(5, 7);
        var day = v.date.slice(8, 10);
        v.date = day + "." + month + "." + year;
        data_1_gun.push(v.date);
    });

    var SingleGrf = $(grafik.landingStatistics.cegh).get(-1);
    var yesterdayvalues = $(grafik.landingStatistics.cegh).get(-2);
    var theLanguage = $("html").attr("lang");
    if (SingleGrf !== undefined) {
        tableRowData = {
            Name: "CEGH",
            Date: SingleGrf.date || "",
            price: SingleGrf.price || 0,
            dailyChange: (((SingleGrf.price / yesterdayvalues.price) * 100)-100).toFixed(2) || 0,
        };
        TableData.push(tableRowData);
        getDataTable();
    }

 
    var label_chart_list_1 = "Orta Avrupa Gaz Merkezi (€/MWh)";
    var CEGHChart = document.getElementById("chart_list_4");
    var CEGHChart = new Chart(CEGHChart, {
        type: "line",
        data: {
            labels: data_1_gun,
            datasets: [
                {
                    label: label_chart_list_1,
                    data: data_1_deger,
                    backgroundColor: "#f2f5f7",
                    hoverBackgroundColor: "#7E57C2",
                    hoverBorderWidth: 1,
                    borderWidth: 1,
                    borderColor: "#2e5883",
                },
            ],
        },
        options: {
            precision: 0,

            animation: {
                duration: 10,
            },
            tooltips: {
                mode: "label",
                callbacks: {
                    label: function (tooltipItem, data) {
                        return (
                            data.datasets[tooltipItem.datasetIndex].label +
                            ": " +
                            numberWithCommas(tooltipItem.yLabel)
                        );
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        drawBorder: false,
                        display: false,
                        drawBorder: false,
                        showBorder: false,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

function GetPower() {
    var chart_9 = $("#grf_Power1");
    var chart_9 = new Chart(chart_9, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: dates_1,
            datasets: [
                {
                    label: "TL / MWh",
                    backgroundColor: "transparent",
                    borderColor: "#33CC00",
                    borderWidth: 2,
                    data: data_3,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: "USD / MWh",
                    backgroundColor: "transparent",
                    borderColor: "#008FD1",
                    borderWidth: 2,
                    data: data_4,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: "EURO / MWh",
                    backgroundColor: "transparent",
                    borderColor: "#003366",
                    borderWidth: 2,
                    data: data_1,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

function GetDailyMatchAmount(data) {
    var dataset = [];
    var datagiem = [];
    var datalabels = [];
    $(data).each(function (i, el) {
        datalabels.push(el.kontrat);
        dataset.push(el.geem);
        datagiem.push(el.giem);
    });

    var NgDailyMatchAmountChart = $("#NgDailyMatchAmountChart");

    var theLanguage = $("html").attr("lang");

    var NgDailyMatchAmountChart = new Chart(NgDailyMatchAmountChart, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datalabels,
            datasets: [
                {
                    label:
                        theLanguage == "tr"
                            ? "Eşleştirme Miktarından Sonraki Gün"
                            : "Day After Matching Quantity",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#33CC00",
                    borderWidth: 2,
                    data: dataset,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                },
                {
                    label: theLanguage == "tr" ? "Sonraki Gün Fiyatı" : "Day After Price",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#d0021b",
                    borderWidth: 2,
                    data: datagiem,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

function GetHrfTurkeyGas(data) {
    var dataset = [];
    var datalabels = [];
    var datasetBotasss = [];

    $(data).each(function (i, el) {
        datalabels.push(el.gasDay);
        dataset.push(el.price);
    });

    var Nggrf_botasChart = $("#grf_botas1");

    var Nggrf_botasChart = new Chart(Nggrf_botasChart, {
        type: "line",
        data: {
            labels: datalabels,
            datasets: [
                {
                    label: "BOTAŞ Tariff",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#d0021b",
                    borderWidth: 2,
                    data: datasetBotasss,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

var yesterdayPriceValue = '';
var grfValue = '';

function setYesterdayPriceVal(price) {
    yesterdayPriceValue = price;
}
function setGrfPriceVal(price) {
    grfValue = price;
}

function GetGrfTurkeyGas(data) {

    var dataset = [];
    var datasetBotas1 = [];
    var datasetBotas2 = [];
    var datalabels = [];
    var SingleGrf;
    var s = 1;
    $(grafik.brentResult.prices).each(function (i, el) {

        var a = $(grafik.brentResult.prices).get(grafik.brentResult.prices.length - s);
        if (a.price != null) {
            SingleGrf = a;
            return;
        }
        s++;
    });


    var yesterdayvalues = $(data).get(-2);
    setYesterdayPriceVal(yesterdayvalues.price);
    var theLanguage = $("html").attr("lang");
    var grf = $(data).get(-1);
    setGrfPriceVal(grf.price)
    var dailyChangeIcon = (((grf.price / yesterdayvalues.price) * 100) - 100).toFixed(2) > yesterdayvalues.price
        ? "<i class='dailyChange_icon grennArrow'></i>"
        : "<i class='dailyChange_icon_down redArrow'></i>";





    tableRowData = {
        Name:
        theLanguage == "tr" ? "Günlük Referans Fiyat" : "Daily Reference Price",
        Date: grf.gasDayText || "",
        price: (grf.price || 0),
        dailyChange: (((grf.price / yesterdayvalues.price) * 100) - 100).toFixed(2) ,
    };

    TableData.push(tableRowData);
    getDataTable();
    $(JSON.parse(BotasData)).each(function (i, el) {
        var date = $.date(el.Date);
        datalabels.push(date);
        datasetBotas1.push(el.Value);
    });
    $(JSON.parse(BotasGasExceptorElectricityData)).each(function (i, el) {
        var date = $.date(el.Date);
        //datalabels.push(date);
        datasetBotas2.push(el.Value);
    });


    $(data).each(function (i, el) {
        datalabels.push(el.gasDayText);
        dataset.push(el.price);
    });

    var Nggrf_botasChart = $("#grf_botas");
    var Nggrf_botasChart = new Chart(Nggrf_botasChart, {
        type: "line",
        data: {
            labels: datalabels,
            datasets: [
                {
                    label: theLanguage == "tr" ? "GRF" : "DRP",
                    backgroundColor: "transparent",
                    borderColor: "green",
                    borderWidth: 2,
                    data: dataset,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: theLanguage == "tr" ? "Botaş - Elektrik Üretimi" : "Botaş - Power Production",
                    backgroundColor: "transparent",
                    borderColor: "orange",
                    borderWidth: 2,
                    data: datasetBotas1,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: theLanguage == "tr" ? "Botaş - Sanayi" : "Botaş - industry",
                    backgroundColor: "transparent",
                    borderColor: "darkblue",
                    borderWidth: 2,
                    data: datasetBotas2,
                    lineTension: 0.1,
                    lineColor: "#1A8CFE ",
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },

            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

function GetMarketClearingPrice(data) {
    var datalabels = [];
    var price = [];
    var priceUsd = [];
    var priceEur = [];
    $(data).each(function (i, el) {
        datalabels.push(el.date);
        price.push(el.price);
        priceUsd.push(el.priceUsd);
        priceEur.push(el.priceEur);
    });

    var grf_Power = $("#grf_Power1");

    var grf_Power = new Chart(grf_Power, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datalabels,
            datasets: [
                {
                    label: "TL/MWH",
                    backgroundColor: "rgba(0 ,0 ,0 ,0)",
                    borderColor: "#3c0",
                    borderWidth: 2,
                    data: price,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: "USD/MWH",
                    backgroundColor: "rgba(0 ,0 ,0 ,0)",
                    borderColor: "#0300cc",
                    borderWidth: 2,
                    data: priceUsd,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: "EURO/MWH",
                    backgroundColor: "rgba(0 ,0 ,0 ,0)",
                    borderColor: "#171e49",
                    borderWidth: 2,
                    data: priceEur,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

function getDataTable() {
    $("#AllDataTable").html("");
    $(TableData).each(function (i, el) {
        $("#AllDataTable tr").each(function (row) {
            var dailyChangeField = $(this).find('td:last-child')
            debugger
            var dailyChangePrice = dailyChangeField[0].innerHTML;
            var dailyChangeIcon = (((grfValue / yesterdayPriceValue) * 100) - 100).toFixed(2) > yesterdayPriceValue
                ? "<i class='dailyChange_icon grennArrow'></i>"
                : "<i class='dailyChange_icon_down redArrow'></i>";
            dailyChangeField[0].innerHTML = `${dailyChangeIcon} ${dailyChangePrice}`
            //console.log(dailyChangeField)
        })
        //$("#AllDataTable").append(
        //    "<tr><td>" +
        //    el.Name +
        //    "</td><td><em>" +
        //    el.Date +
        //    "</em></td><td>" +
        //    el.price +
        //    "</td><td>" +
        //    //"<i class='dailyChange_icon grennArrow'></i>" +
        //    // "<i class='dailyChange_icon_down redArrow'></i>" +
        //    el.dailyChange    
        //    + '%'+
        //    "</td></tr>"
        //);
        console.log('TR', $("#AllDataTable tr"))
    });
}

/*
function GetLNGBotas() {
    var dataset = [];
    var datalabels = [];

    $(JSON.parse(BotasData)).each(function (i, el) {
        console.log("Inside LOOP ::::::::::::");
        var date = $.date(el.Date);
        console.log("Date:::::" + el.date.toString());
        var dated = date.split("T");
        console.log(dated.toString());
        datalabels.push("Date Converted:::::" +dated[0]);
        dataset.push(el.Value);
    });

    var LngBotasLngChart = $("#BotasLngChart");

    var LngBotasLngChartresult = new Chart(LngBotasLngChart, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datalabels,
            datasets: [
                {
                    label: "BOTAŞ",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#33CC00",
                    borderWidth: 2,
                    data: dataset,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}
*/

function GetLNGBotasAndEgeGas() {
    var datasetBotasss = [];
    var datasetEge = [];
    var TheLanguage = $("html").attr("lang");

    var datalabels = [];

    var parseddata = JSON.parse(BotasData);

    $(parseddata).each(function (i, el) {
        var date = $.date(el.Date);
        var dated = date.split("T");
        datalabels.push(dated[0]);
        datasetBotasss.push(el.Value);
    });
    $(JSON.parse(EgeGasData)).each(function (i, el) {
        var date = $.date(el.Date);
        //datalabels.push(date);
        datasetEge.push(el.Value);
    });


    var LngBotasLngChart = $("#BotaşLngChart");
    var LngBotasLngChartresult = new Chart(LngBotasLngChart, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datalabels,
            datasets: [
                {
                    label:
                        TheLanguage == "tr"
                            ? "BOTAŞ Tariff"
                            : "BOTAŞ Tariff" + " (TRY/Ksm3)",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#3c0",
                    borderWidth: 2,
                    data: datasetBotasss,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
                {
                    label: "EGEGAZ",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#d0021b",
                    borderWidth: 2,
                    data: datasetEge,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },

                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}


function GetLNGEgegas() {
    var dataset = [];
    var datalabels = [];

    $(JSON.parse(EgeGasData)).each(function (i, el) {
        var date = $.date(el.Date);
        datalabels.push(date);
        dataset.push(el.Value);
    });

    var LngEgeGasLngChart = $("#EgeGasLngChart");

    var LngEgeGasLngChartresult = new Chart(LngEgeGasLngChart, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: datalabels,
            datasets: [
                {
                    label: "EGEGAZ",
                    backgroundColor: "rgba(111, 217, 115, 0.7)",
                    borderColor: "#33CC00",
                    borderWidth: 2,
                    data: dataset,
                    lineTension: 0.1,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255,255,255,1)",
                    pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: "rectRounded",
                },
            ],
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                        ticks: {},
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                        return "" + data["datasets"][0]["data"][tooltipItem["index"]];
                    },
                },
                backgroundColor: "#606060",
                titleFontSize: 14,
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                bodyFontSize: 18,
                displayColors: false,
            },
        },
    });
}

// var data_3 = [
//   1655, 11000, 10000, 14000, 11000, 17000, 14500, 18000, 12000, 23000, 17000,
//   23000,
// ];
// var data_4 = [
//   555, 14000, 10000, 14000, 11000, 17000, 14500, 40000, 9000, 20000, 14000,
//   50000,
// ];

// var dates_4 = [
//   2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
// ];
// var dates_3 = [
//   "Dec 14, 2020",
//   "Feb 8, 2021",
//   "Mar 8, 2021",
//   "Apr 5, 2021",
//   "May 3, 2021",
//   "May 4, 2021",
//   "May 4, 2021",
//   "May 6, 2021",
//   "May 6, 2021",
//   "May 8, 2021",
//   "May 9, 2021",
// ];
// var label_3 = "Gas Futures";

// var chart_4 = $("#grf_LNG");
// var chart_4 = new Chart(chart_4, {
//   // The type of chart we want to create
//   type: "line",

//   // The data for our dataset
//   data: {
//     labels: dates_3,
//     datasets: [
//       {
//         label: label_3,
//         backgroundColor: "rgba(241, 179, 187, 0.7)",
//         borderColor: "#d0021b",
//         borderWidth: 2,
//         data: data_3,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//       {
//         label: label_3,
//         backgroundColor: "rgba(111, 217, 115, 0.7)",
//         borderColor: "#33CC00",
//         borderWidth: 2,
//         data: data_4,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//     ],
//   },

//   // Configuration options go here
//   options: {
//     legend: {
//       display: true,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true,
//           },
//           ticks: {},
//         },
//       ],
//     },
//     tooltips: {
//       callbacks: {
//         title: function (tooltipItem, data) {
//           console.log(data);
//           console.log(tooltipItem);
//           return data["labels"][tooltipItem[0]["index"]];
//         },
//         label: function (tooltipItem, data) {
//           return "" + data["datasets"][0]["data"][tooltipItem["index"]];
//         },
//       },
//       backgroundColor: "#606060",
//       titleFontSize: 14,
//       titleFontColor: "#ffffff",
//       bodyFontColor: "#ffffff",
//       bodyFontSize: 18,
//       displayColors: false,
//     },
//   },
// });

// var data_5 = [
//   1655, 11000, 10000, 14000, 11000, 17000, 14500, 18000, 12000, 23000, 17000,
//   70000,
// ];

// var chart_5 = $("#grf_Power");
// var chart_5 = new Chart(chart_5, {
//   // The type of chart we want to create
//   type: "line",

//   // The data for our dataset
//   data: {
//     labels: dates_3,
//     datasets: [
//       {
//         label: label_3,
//         backgroundColor: "rgba(241, 179, 187, 0.7)",
//         borderColor: "#d0021b",
//         borderWidth: 2,
//         data: data_3,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//       {
//         label: label_3,
//         backgroundColor: "rgba(111, 217, 115, 0.7)",
//         borderColor: "#33CC00",
//         borderWidth: 2,
//         data: data_4,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//     ],
//   },

//   // Configuration options go here
//   options: {
//     legend: {
//       display: true,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true,
//           },
//           ticks: {},
//         },
//       ],
//     },
//     tooltips: {
//       callbacks: {
//         title: function (tooltipItem, data) {
//           console.log(data);
//           console.log(tooltipItem);
//           return data["labels"][tooltipItem[0]["index"]];
//         },
//         label: function (tooltipItem, data) {
//           return "" + data["datasets"][0]["data"][tooltipItem["index"]];
//         },
//       },
//       backgroundColor: "#606060",
//       titleFontSize: 14,
//       titleFontColor: "#ffffff",
//       bodyFontColor: "#ffffff",
//       bodyFontSize: 18,
//       displayColors: false,
//     },
//   },
// });

// var chart_7 = $("#grf_LNG1");
// var chart_7 = new Chart(chart_7, {
//   // The type of chart we want to create
//   type: "line",

//   // The data for our dataset
//   data: {
//     labels: dates_4,
//     datasets: [
//       {
//         label: "BOTAŞ",
//         backgroundColor: "rgba(111, 217, 115, 0.7)",
//         borderColor: "#33CC00",
//         borderWidth: 2,
//         data: data_4,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//     ],
//   },

//   // Configuration options go here
//   options: {
//     legend: {
//       display: true,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true,
//           },
//           ticks: {},
//         },
//       ],
//     },
//     tooltips: {
//       callbacks: {
//         title: function (tooltipItem, data) {
//           console.log(data);
//           console.log(tooltipItem);
//           return data["labels"][tooltipItem[0]["index"]];
//         },
//         label: function (tooltipItem, data) {
//           return "" + data["datasets"][0]["data"][tooltipItem["index"]];
//         },
//       },
//       backgroundColor: "#606060",
//       titleFontSize: 14,
//       titleFontColor: "#ffffff",
//       bodyFontColor: "#ffffff",
//       bodyFontSize: 18,
//       displayColors: false,
//     },
//   },
// });

// var chart_10 = $("#grf_Power2");
// var chart_10 = new Chart(chart_10, {
//   // The type of chart we want to create
//   type: "line",

//   // The data for our dataset
//   data: {
//     labels: dates_3,
//     datasets: [
//       {
//         label: label_3,
//         backgroundColor: "rgba(208, 2, 27, 0.3)",
//         borderColor: "#d0021b",
//         borderWidth: 2,
//         data: data_4,
//         lineTension: 0.1,
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(255,255,255,1)",
//         pointHoverBackgroundColor: "rgba(255,255,255,0.6)",
//         pointHoverRadius: 10,
//         pointHitRadius: 30,
//         pointBorderWidth: 2,
//         pointStyle: "rectRounded",
//       },
//     ],
//   },

//   // Configuration options go here
//   options: {
//     legend: {
//       display: true,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true,
//           },
//           ticks: {},
//         },
//       ],
//     },
//     tooltips: {
//       callbacks: {
//         title: function (tooltipItem, data) {
//           console.log(data);
//           console.log(tooltipItem);
//           return data["labels"][tooltipItem[0]["index"]];
//         },
//         label: function (tooltipItem, data) {
//           return "" + data["datasets"][0]["data"][tooltipItem["index"]];
//         },
//       },
//       backgroundColor: "#606060",
//       titleFontSize: 14,
//       titleFontColor: "#ffffff",
//       bodyFontColor: "#ffffff",
//       bodyFontSize: 18,
//       displayColors: false,
//     },
//   },
// });

// grafik servis null control ve tarih formatlama
// console grafik değişkenini ya da dataText(); çalıştırıp datayı görebilirsiniz.

var data_1_deger = [];
var data_1_gun = [];

$.each(grafik.eugashubResult, function (k, v) {
    if (grafik.eugashubResult[k].ceghix != null) {
        data_1_deger.push(grafik.eugashubResult[k].ceghix);
    }
    var year = grafik.eugashubResult[k].tradingDay.slice(0, 4);
    var mounth = grafik.eugashubResult[k].tradingDay.slice(4, 6);
    var day = grafik.eugashubResult[k].tradingDay.slice(6, 8);
    grafik.eugashubResult[k].tradingDay = day + "." + mounth + "." + year;
    data_1_gun.push(grafik.eugashubResult[k].tradingDay);
});

// $.ajax({
//   type: "GET",
//   url: "https://www.cmegroup.com/CmeWS/mvc/Quotes/Future/444/G",
//   success: function (response) {
//     console.log(response + " hello");
//   },
// }).done((data) => {
//   console.log(data);
//   var data_chart_list_4 = [];
//   var date_chart_list_4 = [];
//   const prices = data.quotes.splice(0, 6);
//   const dates = data.quotes.splice(0, 6).updated;
//   console.log(data.quotes.splice(0, 6).updated);
//   prices.forEach((element) => {
//     data_chart_list_4.push(element.last);
//   });

//   var dates_chart_list_4 = [
//     "Dec 14, 2020",
//     "Feb 8, 2021",
//     "Mar 8, 2021",
//     "Apr 5, 2021",
//     "May 9, 2021",
//     "May 18, 2021",
//   ];
//   var label_chart_list_4 = "CEGH";
//   var chart_chart_list_4 = document.getElementById("chart_list_4");
//   var chart_chart_list_4 = new Chart(chart_list_4, {
//     type: "line",
//     data: {
//       labels: dates_chart_list_4,
//       datasets: [
//         {
//           label: label_chart_list_4,
//           data: data_chart_list_4,
//           backgroundColor: "#f2f5f7",
//           hoverBackgroundColor: "#7E57C2",
//           hoverBorderWidth: 1,
//           borderWidth: 1,
//           borderColor: "#2e5883",
//         },
//       ],
//     },
//     options: {
//       animation: {
//         duration: 10,
//       },
//       tooltips: {
//         mode: "label",
//         callbacks: {
//           label: function (tooltipItem, data) {
//             return (
//               data.datasets[tooltipItem.datasetIndex].label +
//               ": " +
//               numberWithCommas(tooltipItem.yLabel)
//             );
//           },
//         },
//       },
//       scales: {
//         xAxes: [
//           {
//             display: false,
//           },
//         ],
//         yAxes: [
//           {
//             drawBorder: false,
//             display: false,
//             drawBorder: false,
//             showBorder: false,
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//       legend: {
//         display: false,
//       },
//     },
//   });
// });
