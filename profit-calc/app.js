var Chart = require('chart.js');

function generate_data() {
    var SETUPCOST = 700000
    var UNITCOST = 110
    var CUSTOMERFALLOFF = 200
    var UNITSNUM = 70000
    var PRICEMAX = UNITSNUM
    var REVENUEPRICE = []
    var previous_revenue = -999999999999999
    var answer = 0
    var found = false
    var units_sold = 0
    var revenue = 0

    for (var i = 0; i < PRICEMAX; i++) {
        units_sold = UNITSNUM - CUSTOMERFALLOFF * i
        revenue = units_sold * i - units_sold * UNITCOST - SETUPCOST
        REVENUEPRICE.push({x:revenue,y:i})
        if (revenue < previous_revenue && !found) {
            answer = i - 1
            console.log(revenue)
            found = true
            var options = {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }],
                    xAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        } else {
            previous_revenue = revenue
        }
    }

    

    console.log(answer)
    console.log(REVENUEPRICE)
    generate_chart(REVENUEPRICE, options)
}

function generate_chart(data, options) {
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(
        ctx, {
            type: 'line',
            data: data
        }
    )
}